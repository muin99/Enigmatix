import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors } from "@/theme";
import { formatDate, formatMoney } from "@/utils/format";

export default function PaymentsScreen() {
  const { users } = useAuth();
  const { payments } = useBilling();

  const sorted = [...payments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const nameOf = (userId: number) => users.find((u) => u.id === userId)?.name ?? "Unknown";

  return (
    <Screen>
      <Stack.Screen options={{ title: "Payments" }} />
      {sorted.length === 0 && <EmptyState message="No payments yet." />}
      {sorted.map((p) => (
        <Card key={p.id} style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.name}>{nameOf(p.userId)}</Text>
            <Text style={styles.amount}>{formatMoney(p.amount)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.meta}>
              {p.item}, {formatDate(p.createdAt)}
            </Text>
            <Pill label={p.status === "paid" ? "Paid" : "Refunded"} dark={p.status === "refunded"} />
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { gap: 6 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  name: { fontSize: 15, fontWeight: "700", color: colors.text },
  amount: { fontSize: 15, fontWeight: "700", color: colors.text },
  meta: { fontSize: 13, color: colors.muted },
});
