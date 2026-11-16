import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { RECALL_LABELS } from "@/constants/recall";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors, font, radius, spacing } from "@/theme";

export default function PlansScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { plans, balance } = useBilling();

  const openPlan = (id: number) =>
    router.push({ pathname: "/store/[id]", params: { id: String(id) } });

  return (
    <Screen>
      <View style={styles.top}>
        <Text style={styles.intro}>Pick the plan that fits you.</Text>
        <Pressable style={styles.chip} onPress={() => router.push("/store/wallet")}>
          <Text style={styles.chipText}>{balance} credits</Text>
        </Pressable>
      </View>

      {plans.map((plan) => {
        const isCurrent = plan.id === user?.planId;
        return (
          <Pressable key={plan.id} onPress={() => openPlan(plan.id)}>
            <Card style={isCurrent && styles.currentCard}>
              <View style={styles.row}>
                <Text style={styles.name}>{plan.name}</Text>
                {isCurrent && <Pill label="Current" dark />}
              </View>
              <Text style={styles.price}>
                ${plan.priceMonthly}
                <Text style={styles.period}> /month</Text>
              </Text>
              <Text style={styles.feature}>
                {plan.messageLimit ?? "Unlimited"} messages a month
              </Text>
              <Text style={styles.feature}>
                Recall: {plan.modes.map((mode) => RECALL_LABELS[mode]).join(", ")}
              </Text>
            </Card>
          </Pressable>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  intro: { fontSize: font.body, color: colors.muted },
  chip: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  chipText: { fontSize: 13, fontWeight: "600", color: colors.text },
  currentCard: { borderWidth: 2, borderColor: colors.primary },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  name: { fontSize: font.title, fontWeight: "700", color: colors.text },
  price: { fontSize: 26, fontWeight: "700", color: colors.text, marginTop: spacing.xs },
  period: { fontSize: 13, fontWeight: "400", color: colors.muted },
  feature: { fontSize: 13, color: "#444444", marginTop: 6 },
});
