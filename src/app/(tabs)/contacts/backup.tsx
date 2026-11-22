import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/AuthContext";
import { colors, radius, spacing } from "@/theme";

const WORDS = [
  "oven", "amber", "back", "seven", "cloud", "tree", "paper", "drawn", "green", "wolf",
  "maple", "dusk", "river", "stone", "lamp", "ember", "frost", "pearl", "tide", "cedar",
  "quill", "harbor", "violet", "orbit",
];

export default function KeyBackupScreen() {
  const router = useRouter();
  const { user, markBackedUp } = useAuth();
  const [restoring, setRestoring] = useState(false);
  const [typed, setTyped] = useState("");
  const [error, setError] = useState("");

  const seed = user?.id ?? 1;
  const phrase = Array.from({ length: 12 }, (_, i) => WORDS[(seed * 7 + i * 5) % WORDS.length]);

  const onSaved = () => {
    markBackedUp();
    router.back();
  };

  const onRestore = () => {
    const words = typed.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      setError("Enter the 12 words of your recovery phrase.");
      return;
    }
    if (words.length !== 12) {
      setError(`You entered ${words.length} words. The phrase has exactly 12.`);
      return;
    }
    if (words.join(" ") !== phrase.join(" ")) {
      setError("This phrase does not match your key. Check the words and their order.");
      return;
    }
    markBackedUp();
    router.back();
  };

  return (
    <Screen>
      <Text style={styles.intro}>
        Your private key lives only on this phone. If you lose the phone without a backup, your old
        messages cannot be read again.
      </Text>

      <Card>
        <Text style={styles.label}>RECOVERY PHRASE</Text>
        <View style={styles.grid}>
          {phrase.map((word, i) => (
            <View key={i} style={styles.word}>
              <Text style={styles.wordText}>
                <Text style={styles.index}>{i + 1} </Text>
                {word}
              </Text>
            </View>
          ))}
        </View>
      </Card>
      <Text style={styles.note}>Write these words on paper. Do not take a screenshot.</Text>

      {restoring ? (
        <View style={styles.restore}>
          <Input
            label="Enter your 12 words"
            placeholder="word1 word2 word3 ..."
            autoCapitalize="none"
            multiline
            style={styles.multiline}
            value={typed}
            error={error}
            onChangeText={(text) => {
              setTyped(text);
              setError("");
            }}
          />
          <Button title="Restore" onPress={onRestore} />
        </View>
      ) : null}

      <View style={styles.buttons}>
        <Button title="I saved it" onPress={onSaved} />
        <Button
          title="Restore from phrase"
          variant="outline"
          onPress={() => setRestoring(!restoring)}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  intro: { fontSize: 13, color: colors.muted, lineHeight: 19 },
  label: { fontSize: 11, fontWeight: "700", color: colors.muted, marginBottom: spacing.md },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  word: {
    flexBasis: "30%",
    flexGrow: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  wordText: { fontSize: 12, color: colors.text },
  index: { color: colors.faint },
  note: { fontSize: 12, color: colors.faint },
  restore: { gap: spacing.md },
  multiline: { height: 80, paddingTop: 12, textAlignVertical: "top" },
  buttons: { gap: spacing.md, marginTop: spacing.lg },
});
