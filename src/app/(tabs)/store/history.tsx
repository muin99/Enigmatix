import { Stack } from "expo-router";
import { View } from "react-native";
import { EmptyState } from "@/components/EmptyState";
import { ListRow } from "@/components/ListRow";
import { Screen } from "@/components/Screen";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { formatDate, formatMoney } from "@/utils/format";

export default function HistoryScreen() {
  const { user } = useAuth();
  const { payments } = useBilling();

  const mine = payments
    .filter((p) => p.userId === user?.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <Screen>
      <Stack.Screen options={{ title: "Purchase history" }} />
      {mine.length === 0 && <EmptyState message="No purchases yet." />}
      <View>
        {mine.map((p) => (
          <ListRow
            key={p.id}
            title={p.item}
            subtitle={`${formatDate(p.createdAt)}${p.status === "refunded" ? ", Refunded" : ""}`}
            right={formatMoney(p.amount)}
          />
        ))}
      </View>
    </Screen>
  );
}
