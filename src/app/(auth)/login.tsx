import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { colors, font, radius, spacing } from "@/theme";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    setError("");
    if (!email.trim() || password.length < 8) {
      setError("Enter your email and a password of at least 8 characters.");
      return;
    }
    if (login(email.trim().toLowerCase(), password)) {
      router.replace("/chats");
    } else {
      setError("Wrong email or password, or the account is banned.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>E</Text>
        </View>
        <Text style={styles.title}>Enigmatix</Text>
        <Text style={styles.subtitle}>Messages that stay yours. Sign in to continue.</Text>

        <View style={styles.form}>
          <Input
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <Input
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <Button title="Log in" onPress={onSubmit} />
        </View>

        <Text style={styles.switch}>
          New here? <Link href="/signup" style={styles.link}>Create an account</Link>
        </Text>
      </View>
      <Text style={styles.footer}>Encrypted on your device before it is sent</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, padding: spacing.xl, paddingTop: spacing.xxl },
  logo: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: { color: colors.onPrimary, fontWeight: "700", fontSize: font.title },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: spacing.lg },
  subtitle: { fontSize: 13, color: colors.muted, marginTop: spacing.xs },
  form: { gap: spacing.lg, marginTop: spacing.xl },
  error: { fontSize: 13, color: colors.danger },
  switch: { fontSize: 13, color: colors.muted, textAlign: "center", marginTop: spacing.lg },
  link: { color: colors.text, fontWeight: "600", textDecorationLine: "underline" },
  footer: { fontSize: 11, color: colors.faint, textAlign: "center", paddingBottom: spacing.lg },
});
