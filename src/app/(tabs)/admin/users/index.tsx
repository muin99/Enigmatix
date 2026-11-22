import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/Input";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors, spacing } from "@/theme";

export default function UsersScreen() {
  const router = useRouter();
  const { users } = useAuth();
  const { plans } = useBilling();
  const [query, setQuery] = useState("");

  const term = query.trim().toLowerCase();
  const list = users.filter(
    (u) =>
      u.role === "user" &&
      (u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)),
  );

  return (
    <Screen>
      <Input
        placeholder="Search users"
        autoCapitalize="none"
        value={query}
        onChangeText={setQuery}
      />
      {list.length === 0 ? <Text style={styles.empty}>No users found.</Text> : null}
      {list.map((u) => (
        <Pressable
          key={u.id}
          style={styles.row}
          onPress={() => router.push(`/admin/users/${u.id}`)}
        >
          <Avatar name={u.name} size={36} />
          <View style={styles.text}>
            <Text style={styles.name}>{u.name}</Text>
            <Text style={styles.plan}>{plans.find((p) => p.id === u.planId)?.name}</Text>
          </View>
          <Pill label={u.status === "banned" ? "Banned" : "Active"} dark={u.status === "banned"} />
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  empty: { fontSize: 13, color: colors.muted },
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
  plan: { fontSize: 12, color: colors.faint, marginTop: 2 },
});
