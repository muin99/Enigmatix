import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { colors, spacing } from "@/theme";
import { isEmail } from "@/utils/validate";

type Errors = { name: string; email: string; password: string };
const noErrors: Errors = { name: "", email: "", password: "" };

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>(noErrors);

  const clear = (field: keyof Errors) => setErrors((prev) => ({ ...prev, [field]: "" }));

  const onSubmit = () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const next: Errors = {
      name: !cleanName ? "Enter your name." : cleanName.length < 2 ? "Name is too short." : "",
      email: !cleanEmail
        ? "Enter your email."
        : !isEmail(cleanEmail)
          ? "Enter a valid email like you@example.com."
          : "",
      password: !password
        ? "Choose a password."
        : password.length < 8
          ? "Password must be at least 8 characters."
          : "",
    };
    setErrors(next);
    if (next.name || next.email || next.password) return;

    if (signup(cleanName, cleanEmail, password)) {
      router.replace("/chats");
    } else {
      setErrors({ ...noErrors, email: "An account with this email already exists. Try logging in." });
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
          <Input
            label="Name"
            placeholder="Your name"
            value={name}
            error={errors.name}
            onChangeText={(text) => {
              setName(text);
              clear("name");
            }}
          />
          <Input
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            error={errors.email}
            onChangeText={(text) => {
              setEmail(text);
              clear("email");
            }}
          />
          <Input
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry
            value={password}
            error={errors.password}
            onChangeText={(text) => {
              setPassword(text);
              clear("password");
            }}
          />
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
  footer: { fontSize: 13, color: colors.muted, textAlign: "center", paddingBottom: spacing.lg },
  link: { color: colors.text, fontWeight: "600", textDecorationLine: "underline" },
});
