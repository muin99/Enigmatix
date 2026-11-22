import { Stack } from "expo-router";

export default function StoreLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "left", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Store" }} />
    </Stack>
  );
}
