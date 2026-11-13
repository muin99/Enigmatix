import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { BillingProvider } from "@/context/BillingContext";
import { ChatProvider } from "@/context/ChatContext";
import { ContactsProvider } from "@/context/ContactsContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <ContactsProvider>
        <ChatProvider>
          <BillingProvider>
            <Stack screenOptions={{ headerShown: false }} />
          </BillingProvider>
        </ChatProvider>
      </ContactsProvider>
    </AuthProvider>
  );
}
