import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { Input } from "@/components/Input";
import { ListRow } from "@/components/ListRow";
import { Pill } from "@/components/Pill";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { reports } from "@/data/reports";
import { colors, spacing } from "@/theme";
import { formatDate } from "@/utils/format";

export default function UserDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { users, banUser, unbanUser } = useAuth();
  const { plans, transactions, payments, refundLastPayment } = useBilling();
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const target = users.find((u) => u.id === Number(id));
  if (!target) return <EmptyState message="User not found." />;

  const banned = target.status === "banned";
  const plan = plans.find((p) => p.id === target.planId);
  const credits = transactions
    .filter((t) => t.userId === target.id)
    .reduce((sum, t) => sum + t.amount, 0);
  const reportCount = reports.filter((r) => r.targetUserId === target.id).length;
  const canRefund = payments.some((p) => p.userId === target.id && p.status === "paid");

  const onBan = () => {
    if (!reason.trim()) {
      setError("Enter a reason. It is kept in the audit log.");
      return;
    }
    if (reason.trim().length < 5) {
      setError("Reason is too short. Describe why this user is being banned.");
      return;
    }
    banUser(target.id, reason.trim());
    setReason("");
    setError("");
  };

  return (
    <Screen>
      <Stack.Screen
        options={{
          title: "User detail",
          headerRight: () => (
            <View style={styles.status}>
              <Pill label={banned ? "Banned" : "Active"} dark={banned} />
            </View>
          ),
        }}
      />

      <View style={styles.head}>
        <Avatar name={target.name} size={48} />
        <View style={styles.headText}>
          <Text style={styles.name}>{target.name}</Text>
          <Text style={styles.email}>{target.email}</Text>
          <Pill label={plan?.name ?? "Free"} />
        </View>
      </View>

      <Card>
        <ListRow title="Joined" right={formatDate(target.joinedAt)} />
        <ListRow title="Credits" right={String(credits)} />
        <ListRow title="Reports against" right={String(reportCount)} />
      </Card>

      {banned ? (
        <Card>
          <Text style={styles.label}>BAN REASON</Text>
          <Text style={styles.reason}>{target.banReason}</Text>
        </Card>
      ) : (
        <View style={styles.reasonBox}>
          <Input
            label="BAN REASON"
            placeholder="Required. Shown in the audit log."
            multiline
            style={styles.multiline}
            value={reason}
            error={error}
            onChangeText={(text) => {
              setReason(text);
              setError("");
            }}
          />
        </View>
      )}

      {banned ? (
        <Button title="Unban user" onPress={() => unbanUser(target.id)} />
      ) : (
        <Button title="Ban user" onPress={onBan} />
      )}
      <Button
        title="Refund last payment"
        variant="outline"
        disabled={!canRefund}
        onPress={() => refundLastPayment(target.id)}
      />
      {canRefund ? null : <Text style={styles.note}>This user has no paid payment to refund.</Text>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  status: { alignSelf: "center", marginRight: spacing.sm },
  head: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  headText: { gap: 3 },
  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  email: { fontSize: 12, color: colors.muted },
  label: { fontSize: 11, fontWeight: "700", color: colors.muted },
  reason: { fontSize: 14, color: colors.text, marginTop: spacing.xs },
  reasonBox: { gap: spacing.sm },
  multiline: { height: 80, paddingTop: 12, textAlignVertical: "top" },
  note: { fontSize: 12, color: colors.faint, textAlign: "center" },
});
