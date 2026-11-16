import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { EmptyState } from "@/components/EmptyState";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useAuth } from "@/context/AuthContext";
import { useContacts } from "@/context/ContactsContext";
import { colors, spacing } from "@/theme";

export default function ContactsScreen() {
  const router = useRouter();
  const { user, users } = useAuth();
  const { contacts } = useContacts();

  const mine = contacts.filter((c) => c.ownerId === user?.id);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader
        title="Contacts"
        right={
          <Pressable style={styles.add} onPress={() => router.push("/contacts/add")}>
            <Ionicons name="add" size={20} color={colors.onPrimary} />
          </Pressable>
        }
      />
      {mine.length === 0 ? (
        <EmptyState message="No contacts yet. Tap + to add one." />
      ) : (
        <Screen>
          {mine.map((c) => {
            const person = users.find((u) => u.id === c.contactUserId);
            if (!person) return null;
            return (
              <Pressable
                key={c.id}
                style={styles.row}
                onPress={() => router.push(`/contacts/${c.id}`)}
              >
                <Avatar name={person.name} size={36} />
                <View style={styles.text}>
                  <Text style={styles.name}>{person.name}</Text>
                  <Text style={styles.email}>{person.email}</Text>
                </View>
                {c.verified ? <Pill label="Verified" /> : null}
              </Pressable>
            );
          })}
        </Screen>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  add: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  text: { flex: 1 },
  name: { fontSize: 14, fontWeight: "600", color: colors.text },
  email: { fontSize: 12, color: colors.faint, marginTop: 2 },
});
