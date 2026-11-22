import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { colors, spacing } from "@/theme";

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = () => {
    setError("");
    if (!name.trim() || !email.trim()) {
      setError("Fill in your name and email.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (signup(name.trim(), email.trim().toLowerCase(), password)) {
      router.replace("/chats");
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.back}>‹ Back</Text>
        </Pressable>
        <Text style={styles.title}>Create your account</Text>
        <Text style={styles.subtitle}>Your keys are made on this device.</Text>

        <View style={styles.form}>
          <Input label="Name" placeholder="Your name" value={name} onChangeText={setName} />
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
          <Button title="Sign up" onPress={onSubmit} />
        </View>
      </View>
      <Text style={styles.footer}>
        Have an account? <Link href="/login" style={styles.link}>Log in</Link>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  body: { flex: 1, padding: spacing.xl },
  back: { fontSize: 13, color: colors.muted },
  title: { fontSize: 24, fontWeight: "700", color: colors.text, marginTop: spacing.xl },
  subtitle: { fontSize: 13, color: colors.muted, marginTop: spacing.xs },
  form: { gap: spacing.lg, marginTop: spacing.xl },
  error: { fontSize: 13, color: colors.danger },
  footer: { fontSize: 13, color: colors.muted, textAlign: "center", paddingBottom: spacing.lg },
  link: { color: colors.text, fontWeight: "600", textDecorationLine: "underline" },
});
