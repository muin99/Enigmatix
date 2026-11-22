import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { colors, radius, spacing } from "@/theme";

export function FormError({ message }: { message: string }) {
  return (
    <View style={styles.box}>
      <Ionicons name="alert-circle" size={18} color={colors.danger} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: "#f3c5cc",
    borderRadius: radius.md,
    backgroundColor: "#fdf0f2",
  },
  text: { flex: 1, fontSize: 13, color: colors.danger },
});
