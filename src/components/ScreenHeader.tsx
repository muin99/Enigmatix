import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, font, spacing } from "@/theme";

type Props = { title: string; right?: ReactNode };

export function ScreenHeader({ title, right }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.title}>{title}</Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
  },
  title: { fontSize: font.heading, fontWeight: "700", color: colors.text },
});
