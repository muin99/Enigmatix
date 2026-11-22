import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { ListRow } from "@/components/ListRow";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors, radius, spacing } from "@/theme";
import { formatCredits, formatDate } from "@/utils/format";

export default function WalletScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { transactions, balance } = useBilling();

  const recent = transactions
    .filter((t) => t.userId === user?.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  return (
    <Screen>
      <Stack.Screen options={{ title: "Credit wallet" }} />

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>BALANCE</Text>
        <Text style={styles.balanceValue}>{balance}</Text>
        <Text style={styles.balanceUnit}>credits</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button title="Buy credits" onPress={() => router.push("/store/packs")} />
        </View>
        <View style={styles.button}>
          <Button title="History" variant="outline" onPress={() => router.push("/store/history")} />
        </View>
      </View>

      <Text style={styles.section}>RECENT</Text>
      <View>
        {recent.map((t) => (
          <ListRow
            key={t.id}
            title={t.reason}
            subtitle={formatDate(t.createdAt)}
            right={formatCredits(t.amount)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.xl,
  },
  balanceLabel: { fontSize: 12, color: colors.onPrimary, opacity: 0.7 },
  balanceValue: { fontSize: 40, fontWeight: "700", color: colors.onPrimary, marginTop: spacing.xs },
  balanceUnit: { fontSize: 12, color: colors.onPrimary, opacity: 0.7 },
  buttons: { flexDirection: "row", gap: spacing.md },
  button: { flex: 1 },
  section: { fontSize: 13, fontWeight: "700", color: colors.muted, marginTop: spacing.md },
});
