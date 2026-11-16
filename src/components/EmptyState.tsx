import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

export function EmptyState({ message }: { message: string }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32 },
  text: { fontSize: 14, color: colors.muted, textAlign: "center" },
});
