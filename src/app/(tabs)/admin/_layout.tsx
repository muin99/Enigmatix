import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "left", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Admin" }} />
      <Stack.Screen name="users/index" options={{ title: "Users" }} />
      <Stack.Screen name="users/[id]" options={{ title: "User detail" }} />
    </Stack>
  );
}
