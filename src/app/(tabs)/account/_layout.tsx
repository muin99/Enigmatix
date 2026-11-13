import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "left", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Account" }} />
    </Stack>
  );
}
