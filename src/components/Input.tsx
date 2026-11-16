import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radius } from "@/theme";

type Props = TextInputProps & { label?: string };

export function Input({ label, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.faint}
        style={[styles.input, style]}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 6 },
  label: { fontSize: 13, fontWeight: "600", color: colors.text },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#d4d4d4",
    borderRadius: radius.md,
    paddingHorizontal: 14,
    fontSize: 15,
    color: colors.text,
  },
});
