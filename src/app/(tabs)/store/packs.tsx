import { Stack, useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Screen } from "@/components/Screen";
import { useBilling } from "@/context/BillingContext";
import { colors, font } from "@/theme";

export default function PacksScreen() {
  const router = useRouter();
  const { packs } = useBilling();

  return (
    <Screen>
      <Stack.Screen options={{ title: "Credit packs" }} />
      {packs.map((pack) => (
        <Card key={pack.id} style={styles.card}>
          <View>
            <Text style={styles.name}>{pack.name}</Text>
            <Text style={styles.credits}>{pack.credits} credits</Text>
          </View>
          <View style={styles.buy}>
            <Button title={`$${pack.price}`} onPress={() => router.push("/store/history")} />
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  name: { fontSize: font.title, fontWeight: "700", color: colors.text },
  credits: { fontSize: 13, color: colors.muted, marginTop: 2 },
  buy: { width: 84 },
});
