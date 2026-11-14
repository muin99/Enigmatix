import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Screen } from "@/components/Screen";
import { RECALL_LABELS } from "@/constants/recall";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors, font, spacing } from "@/theme";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

export default function PlanDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { plans } = useBilling();

  const plan = plans.find((p) => p.id === Number(id));
  if (!plan) return <EmptyState message="Plan not found." />;

  const isCurrent = plan.id === user?.planId;
  const features = [
    `${plan.messageLimit ?? "Unlimited"} messages a month`,
    ...plan.modes.map((mode) => `Recall: ${RECALL_LABELS[mode]}`),
  ];

  return (
    <Screen>
      <Stack.Screen options={{ title: `${plan.name} plan` }} />

      <Text style={styles.price}>
        ${plan.priceMonthly}
        <Text style={styles.period}> /month</Text>
      </Text>

      <Card>
        {features.map((feature) => (
          <View key={feature} style={styles.featureRow}>
            <Ionicons name="checkmark" size={18} color={colors.primary} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </Card>

      <Card>
        <SummaryRow label="Billed today" value={`$${plan.priceMonthly.toFixed(2)}`} />
        <View style={styles.divider} />
        <SummaryRow label="Renews" value="Monthly" />
      </Card>

      <View style={styles.actions}>
        <Button
          title={isCurrent ? "Current plan" : `Subscribe to ${plan.name}`}
          disabled={isCurrent}
          onPress={() => router.push("/store/history")}
        />
        <Button title="Back to plans" variant="outline" onPress={() => router.back()} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  price: { fontSize: 36, fontWeight: "700", color: colors.text },
  period: { fontSize: font.body, fontWeight: "400", color: colors.muted },
  featureRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, paddingVertical: 6 },
  featureText: { fontSize: 14, color: colors.text },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  summaryLabel: { fontSize: 14, color: colors.text },
  summaryValue: { fontSize: 14, fontWeight: "700", color: colors.text },
  divider: { height: 1, backgroundColor: "#eeeeee", marginVertical: spacing.md },
  actions: { gap: spacing.md, marginTop: spacing.sm },
});
