import { Stack } from "expo-router";

export default function ChatsLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "left", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Chats" }} />
    </Stack>
  );
}
