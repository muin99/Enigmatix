import { createContext, ReactNode, useContext, useState } from "react";
import type { Conversation, RecallMode } from "@/types";

type ChatValue = {
  conversations: Conversation[];
  refreshConversations: () => Promise<void>;
  sendMessage: (conversationId: number, plaintext: string, mode: RecallMode) => Promise<void>;
};

const ChatContext = createContext<ChatValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations] = useState<Conversation[]>([]);

  // TEMP: stubs, Muin implements these
  const value: ChatValue = {
    conversations,
    refreshConversations: async () => {},
    sendMessage: async () => {
      throw new Error("TODO Muin: implement sendMessage");
    },
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
