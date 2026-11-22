import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Pill } from "@/components/Pill";
import { useAuth } from "@/context/AuthContext";
import { useContacts } from "@/context/ContactsContext";
import { colors, radius, spacing } from "@/theme";

export default function AddContactScreen() {
  const router = useRouter();
  const { user, users } = useAuth();
  const { contacts, addContact } = useContacts();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const term = query.trim().toLowerCase();
  const taken = contacts.filter((c) => c.ownerId === user?.id).map((c) => c.contactUserId);
  const results =
    term === ""
      ? []
      : users.filter(
          (u) =>
            u.id !== user?.id &&
            u.status === "active" &&
            !taken.includes(u.id) &&
            (u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)),
        );

  const matches = users.filter(
    (u) => u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term),
  );
  let searchError = "";
  if (term !== "" && results.length === 0) {
    if (matches.some((u) => u.id === user?.id)) {
      searchError = "That is your own account.";
    } else if (matches.some((u) => taken.includes(u.id))) {
      searchError = "This person is already in your contacts.";
    } else {
      searchError = `No user matches "${query.trim()}". Check the spelling and try again.`;
    }
  }

  const onAdd = () => {
    if (selectedId === null) return;
    addContact(selectedId);
    router.back();
  };

  return (
    <View style={styles.page}>
      <View style={styles.body}>
        <Input
          label="Email or username"
          placeholder="Search a user"
          autoCapitalize="none"
          value={query}
          error={searchError}
          onChangeText={(text) => {
            setQuery(text);
            setSelectedId(null);
          }}
        />
        {results.map((u) => (
          <Pressable
            key={u.id}
            style={[styles.result, selectedId === u.id && styles.resultActive]}
            onPress={() => setSelectedId(u.id)}
          >
            <Avatar name={u.name} size={32} />
            <View style={styles.text}>
              <Text style={styles.name}>{u.name}</Text>
              <Text style={styles.email}>{u.email}</Text>
            </View>
            <Pill label="Found" />
          </Pressable>
        ))}
        <Text style={styles.hint}>
          After adding, compare the key fingerprint in person to confirm this is the right person.
        </Text>
      </View>
      <View style={styles.footer}>
        <Button title="Add to contacts" onPress={onAdd} disabled={selectedId === null} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, padding: spacing.lg, gap: spacing.md },
  result: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
  },
  resultActive: { borderColor: colors.primary },
  text: { flex: 1 },
  name: { fontSize: 14, fontWeight: "600", color: colors.text },
  email: { fontSize: 11, color: colors.faint, marginTop: 2 },
  hint: { fontSize: 12, color: colors.faint },
  footer: { padding: spacing.lg },
});
