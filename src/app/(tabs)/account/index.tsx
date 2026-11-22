import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ListRow } from "@/components/ListRow";
import { Screen } from "@/components/Screen";
import { ScreenHeader } from "@/components/ScreenHeader";
import { useAuth } from "@/context/AuthContext";
import { useBilling } from "@/context/BillingContext";
import { colors, spacing } from "@/theme";

export default function AccountScreen() {
  const router = useRouter();
  const { user, logout, backedUp } = useAuth();
  const { plans, balance } = useBilling();

  const plan = plans.find((p) => p.id === user?.planId);

  const onLogout = () => {
    logout();
    router.replace("/login");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScreenHeader title="Account" />
      <Screen>
        <View style={styles.profile}>
          <Avatar name={user?.name ?? "?"} size={56} />
          <View>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </View>

        <Card>
          <ListRow title="Plan" right={plan?.name ?? "Free"} />
          <ListRow title="Credits" right={String(balance)} />
          <ListRow title="Key backup" right={backedUp ? "Done" : "Pending"} />
        </Card>

        <Button title="Manage plan" onPress={() => router.push("/store")} />
        <Button title="Credit wallet" variant="outline" onPress={() => router.push("/store/wallet")} />
        <Button title="Key backup" variant="outline" onPress={() => router.push("/contacts/backup")} />
        <Button title="Log out" variant="outline" onPress={onLogout} />
      </Screen>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  profile: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  name: { fontSize: 16, fontWeight: "700", color: colors.text },
  email: { fontSize: 12, color: colors.muted, marginTop: 2 },
});
