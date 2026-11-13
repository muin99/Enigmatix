import { Stack } from "expo-router";

export default function ContactsLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: "left", headerShadowVisible: false }}>
      <Stack.Screen name="index" options={{ title: "Contacts" }} />
    </Stack>
  );
}
