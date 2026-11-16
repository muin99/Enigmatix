import { StyleSheet, Text, View } from "react-native";
import { AdminShortcuts } from "@/components/AdminShortcuts";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { StatCard } from "@/components/StatCard";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors, spacing } from "@/theme";
import { formatMoney } from "@/utils/format";

export default function AdminDashboardScreen() {
  const { users } = useAuth();
  const { payments } = useBilling();

  const paid = payments.filter((p) => p.status === "paid");
  const revenue = paid.reduce((sum, p) => sum + p.amount, 0);
  const refunds = payments.filter((p) => p.status === "refunded").length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const paidPlans = users.filter((u) => u.role === "user" && u.planId !== 1).length;

  const recent = [...paid]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(-6);
  const max = Math.max(...recent.map((p) => p.amount), 1);

  return (
    <Screen>
      <View style={styles.grid}>
        <View style={styles.cell}>
          <StatCard label="REVENUE" value={formatMoney(revenue)} note="Paid payments" />
        </View>
        <View style={styles.cell}>
          <StatCard label="ACTIVE USERS" value={String(activeUsers)} note="Not banned" />
        </View>
        <View style={styles.cell}>
          <StatCard label="PAID PLANS" value={String(paidPlans)} note="Plus and Pro users" />
        </View>
        <View style={styles.cell}>
          <StatCard label="REFUNDS" value={String(refunds)} note="Refunded payments" />
        </View>
      </View>

      <Card>
        <Text style={styles.chartTitle}>RECENT PAYMENTS</Text>
        <View style={styles.bars}>
          {recent.map((p) => (
            <View key={p.id} style={[styles.bar, { height: (p.amount / max) * 90 }]} />
          ))}
        </View>
      </Card>
      <AdminShortcuts />
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  cell: { flexBasis: "47%", flexGrow: 1 },
  chartTitle: { fontSize: 12, fontWeight: "700", color: colors.muted },
  bars: { flexDirection: "row", alignItems: "flex-end", gap: spacing.sm, height: 90, marginTop: spacing.md },
  bar: { flex: 1, backgroundColor: colors.primary, borderTopLeftRadius: 3, borderTopRightRadius: 3 },
});

