import { Stack } from "expo-router";

export default function ContactsLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "left", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="add" options={{ title: "Add contact" }} />
      <Stack.Screen name="[id]" options={{ title: "Contact" }} />
      <Stack.Screen name="backup" options={{ title: "Key backup" }} />
    </Stack>
  );
}
