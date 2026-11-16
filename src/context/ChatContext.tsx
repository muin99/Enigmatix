import { createContext, ReactNode, useContext, useState } from "react";
import type { Conversation, Message } from "@/types";

type ChatValue = {
  conversations: Conversation[];
  messages: Message[];
};

const ChatContext = createContext<ChatValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations] = useState<Conversation[]>([]);
  const [messages] = useState<Message[]>([]);

  return (
    <ChatContext.Provider value={{ conversations, messages }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
}
