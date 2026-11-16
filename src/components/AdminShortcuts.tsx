import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button } from "@/components/Button";
import { spacing } from "@/theme";

const links = [
  { title: "Payments", href: "/admin/payments" },
  { title: "Plans", href: "/admin/plans" },
  { title: "Users", href: "/admin/users" },
  { title: "Reports", href: "/admin/reports" },
] as const;

export function AdminShortcuts() {
  const router = useRouter();

  return (
    <View style={styles.grid}>
      {links.map((link) => (
        <View key={link.href} style={styles.cell}>
          <Button title={link.title} variant="outline" onPress={() => router.push(link.href)} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.md },
  cell: { flexBasis: "47%", flexGrow: 1 },
});
