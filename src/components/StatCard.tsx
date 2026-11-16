import { StyleSheet, Text } from "react-native";
import { Card } from "@/components/Card";
import { colors } from "@/theme";

type Props = { label: string; value: string; note?: string };

export function StatCard({ label, value, note }: Props) {
  return (
    <Card>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 11, fontWeight: "600", color: colors.muted },
  value: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: 4 },
  note: { fontSize: 11, color: colors.faint, marginTop: 2 },
});
