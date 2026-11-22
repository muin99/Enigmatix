import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@/components/Button";
import { FormError } from "@/components/FormError";
import { Input } from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { colors, font, radius, spacing } from "@/theme";
import { isEmail } from "@/utils/validate";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formError, setFormError] = useState("");

  const onSubmit = () => {
    const cleanEmail = email.trim().toLowerCase();
    const nextEmailError = !cleanEmail
      ? "Enter your email."
      : !isEmail(cleanEmail)
        ? "Enter a valid email like you@example.com."
        : "";
    const nextPasswordError = !password
      ? "Enter your password."
      : password.length < 8
        ? "Password must be at least 8 characters."
        : "";
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setFormError("");
    if (nextEmailError || nextPasswordError) return;

    const result = login(cleanEmail, password);
    if (result === "ok") {
      router.replace("/chats");
    } else if (result === "banned") {
      setFormError("This account has been banned. Contact support if you think this is a mistake.");
    } else {
      setFormError("Wrong email or password. Check them and try again.");
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
          {formError ? <FormError message={formError} /> : null}
          <Input
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            error={emailError}
            onChangeText={(text) => {
              setEmail(text);
              setEmailError("");
              setFormError("");
            }}
          />
          <Input
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry
            value={password}
            error={passwordError}
            onChangeText={(text) => {
              setPassword(text);
              setPasswordError("");
              setFormError("");
            }}
          />
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
  switch: { fontSize: 13, color: colors.muted, textAlign: "center", marginTop: spacing.lg },
  link: { color: colors.text, fontWeight: "600", textDecorationLine: "underline" },
  footer: { fontSize: 11, color: colors.faint, textAlign: "center", paddingBottom: spacing.lg },
});
