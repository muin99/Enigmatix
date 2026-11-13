import { StyleSheet, View, ViewProps } from "react-native";
import { colors, radius, spacing } from "@/theme";

export function Card({ style, ...rest }: ViewProps) {
  return <View style={[styles.card, style]} {...rest} />;
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    backgroundColor: colors.bg,
  },
});
