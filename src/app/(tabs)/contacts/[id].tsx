import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { ListRow } from "@/components/ListRow";
import { Screen } from "@/components/Screen";
import { RECALL_LABELS } from "@/constants/recall";
import { useAuth } from "@/context/AuthContext";
import { useContacts } from "@/context/ContactsContext";
import { colors, spacing } from "@/theme";

function fingerprint(key: string) {
  let hash = 0;
  for (const ch of key) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  const hex = (hash.toString(16).padStart(8, "0") + (hash * 7).toString(16).padStart(8, "0"))
    .slice(0, 16)
    .toUpperCase();
  return hex.match(/.{4}/g)?.join(" ") ?? hex;
}

export default function ContactDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { users } = useAuth();
  const { contacts, toggleVerified } = useContacts();
  const [reported, setReported] = useState(false);

  const contact = contacts.find((c) => c.id === Number(id));
  const person = users.find((u) => u.id === contact?.contactUserId);

  if (!contact || !person) return <EmptyState message="Contact not found." />;

  return (
    <Screen>
      <View style={styles.head}>
        <Avatar name={person.name} size={72} />
        <Text style={styles.name}>{person.name}</Text>
        <Text style={styles.email}>{person.email}</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.label}>KEY FINGERPRINT</Text>
        <Text style={styles.fingerprint}>{fingerprint(person.publicKey)}</Text>
        <Text style={styles.hint}>
          Compare this with {person.name} in person to confirm it really is them.
        </Text>
      </Card>

      <Card>
        <ListRow title="Default Recall" right={RECALL_LABELS.stays} />
        <ListRow
          title="Verified"
          right={contact.verified ? "Yes" : "No"}
          onPress={() => toggleVerified(contact.id)}
        />
      </Card>

      {reported ? <Text style={styles.reported}>Report sent to the admins.</Text> : null}

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Message" onPress={() => router.push("/chats/new")} />
        </View>
        <View style={styles.button}>
          <Button
            title={reported ? "Reported" : "Report"}
            variant="outline"
            disabled={reported}
            onPress={() => setReported(true)}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: { alignItems: "center", gap: spacing.xs, paddingVertical: spacing.lg },
  name: { fontSize: 20, fontWeight: "700", color: colors.text, marginTop: spacing.sm },
  email: { fontSize: 12, color: colors.muted },
  card: { gap: spacing.xs },
  label: { fontSize: 11, fontWeight: "700", color: colors.muted },
  fingerprint: { fontSize: 15, fontWeight: "700", color: colors.text, fontVariant: ["tabular-nums"] },
  hint: { fontSize: 12, color: colors.faint },
  reported: { fontSize: 12, color: colors.muted, textAlign: "center" },
  buttons: { flexDirection: "row", gap: spacing.md },
  button: { flex: 1 },
});
