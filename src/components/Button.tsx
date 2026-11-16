import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "@/theme";

type Props = {
  title: string;
  onPress: () => void;
  variant?: "solid" | "outline";
  disabled?: boolean;
};

export function Button({ title, onPress, variant = "solid", disabled = false }: Props) {
  const solid = variant === "solid";
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.base, solid ? styles.solid : styles.outline, disabled && styles.disabled]}
    >
      <Text style={[styles.text, solid ? styles.textSolid : styles.textOutline]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { height: 48, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  solid: { backgroundColor: colors.primary },
  outline: { borderWidth: 1, borderColor: colors.primary },
  disabled: { opacity: 0.4 },
  text: { fontSize: 15, fontWeight: "600" },
  textSolid: { color: colors.onPrimary },
  textOutline: { color: colors.primary },
});
