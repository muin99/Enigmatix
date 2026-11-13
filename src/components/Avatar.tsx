import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

type Props = { name: string; size?: number };

export function Avatar({ name, size = 44 }: Props) {
  return (
    <View style={[styles.base, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size / 3 }]}>{name.charAt(0).toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#dddddd",
    alignItems: "center",
    justifyContent: "center",
  },
  text: { fontWeight: "700", color: colors.text },
});
