import { StyleSheet, Text, View } from "react-native";
import { colors, radius } from "@/theme";

type Props = { label: string; dark?: boolean };

export function Pill({ label, dark = false }: Props) {
  return (
    <View style={[styles.base, dark ? styles.dark : styles.light]}>
      <Text style={[styles.text, dark && styles.textDark]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: radius.pill, alignSelf: "flex-start" },
  light: { borderWidth: 1, borderColor: colors.primary },
  dark: { backgroundColor: colors.primary },
  text: { fontSize: 11, fontWeight: "600", color: colors.text },
  textDark: { color: colors.onPrimary },
});
