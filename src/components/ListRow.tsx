import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "@/theme";

type Props = {
  title: string;
  subtitle?: string;
  right?: string;
  onPress?: () => void;
};

export function ListRow({ title, subtitle, right, onPress }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} style={styles.row}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right ? <Text style={styles.right}>{right}</Text> : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  text: { flex: 1 },
  title: { fontSize: 14, fontWeight: "600", color: colors.text },
  subtitle: { fontSize: 12, color: colors.faint, marginTop: 2 },
  right: { fontSize: 15, fontWeight: "700", color: colors.text },
});
