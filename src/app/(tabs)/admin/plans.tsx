import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { Screen } from "@/components/Screen";
import { useBilling } from "@/context/BillingContext";
import { colors, font, spacing } from "@/theme";
import type { Plan } from "@/types";

type Draft = { id?: number; name: string; price: string; limit: string };

const emptyDraft: Draft = { name: "", price: "", limit: "" };

export default function PlansManagerScreen() {
  const { plans, savePlan } = useBilling();
  const [draft, setDraft] = useState<Draft | null>(null);

  const startEdit = (plan: Plan) =>
    setDraft({
      id: plan.id,
      name: plan.name,
      price: String(plan.priceMonthly),
      limit: plan.messageLimit === null ? "" : String(plan.messageLimit),
    });

  const isNumber = (value: string) => value.trim() !== "" && !Number.isNaN(Number(value));
  const canSave =
    draft !== null &&
    draft.name.trim() !== "" &&
    isNumber(draft.price) &&
    (draft.limit.trim() === "" || isNumber(draft.limit));

  const save = () => {
    if (!draft || !canSave) return;
    savePlan({
      id: draft.id,
      name: draft.name.trim(),
      priceMonthly: Number(draft.price),
      messageLimit: draft.limit.trim() === "" ? null : Number(draft.limit),
    });
    setDraft(null);
  };

  if (draft) {
    return (
      <Screen>
        <Stack.Screen options={{ title: draft.id ? "Edit plan" : "New plan" }} />
        <Input label="Name" value={draft.name} onChangeText={(name) => setDraft({ ...draft, name })} />
        <Input
          label="Price per month"
          keyboardType="numeric"
          value={draft.price}
          onChangeText={(price) => setDraft({ ...draft, price })}
        />
        <Input
          label="Message limit (empty for unlimited)"
          keyboardType="numeric"
          value={draft.limit}
          onChangeText={(limit) => setDraft({ ...draft, limit })}
        />
        <View style={styles.actions}>
          <Button title="Save" disabled={!canSave} onPress={save} />
          <Button title="Cancel" variant="outline" onPress={() => setDraft(null)} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <Stack.Screen options={{ title: "Plans manager" }} />
      {plans.map((plan) => (
        <Card key={plan.id} style={styles.card}>
          <View>
            <Text style={styles.name}>{plan.name}</Text>
            <Text style={styles.meta}>
              ${plan.priceMonthly} a month, {plan.messageLimit ?? "Unlimited"} messages
            </Text>
          </View>
          <View style={styles.edit}>
            <Button title="Edit" variant="outline" onPress={() => startEdit(plan)} />
          </View>
        </Card>
      ))}
      <Button title="Add plan" onPress={() => setDraft(emptyDraft)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  name: { fontSize: font.title, fontWeight: "700", color: colors.text },
  meta: { fontSize: 13, color: colors.muted, marginTop: 2 },
  edit: { width: 84 },
  actions: { gap: spacing.md, marginTop: spacing.sm },
});
