import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import { colors, radius } from "@/theme";

type Props = TextInputProps & { label?: string; error?: string };

export function Input({ label, error, style, ...rest }: Props) {
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.faint}
        style={[styles.input, error ? styles.inputError : null, style]}
        {...rest}
      />
      {error ? (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color={colors.danger} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
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
  inputError: { borderColor: colors.danger, backgroundColor: "#fdf7f8" },
  errorRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  errorText: { flex: 1, fontSize: 12, color: colors.danger },
});
