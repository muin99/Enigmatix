export type RecallMode = "stays" | "once" | "timed" | "revoke";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string; // TEMP: plain text for json-server, remove with the real backend
  role: "user" | "admin";
  status: "active" | "banned";
  banReason?: string;
  publicKey: string;
  planId: number;
}

export interface Contact {
  id: number;
  ownerId: number;
  contactUserId: number;
  verified: boolean;
}

export interface Conversation {
  id: number;
  memberIds: number[];
}

export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  ciphertext: string;
  mode: RecallMode;
  ttlSeconds?: number;
  openedAt?: string;
  revoked: boolean;
  createdAt: string;
}

export interface KeyShare {
  id: number;
  messageId: number;
  userId: number;
  wrappedKey: string;
}

export interface Plan {
  id: number;
  name: string;
  priceMonthly: number;
  messageLimit: number | null;
  modes: RecallMode[];
}

export interface Subscription {
  id: number;
  userId: number;
  planId: number;
  startedAt: string;
  status: "active" | "cancelled";
}

export interface Transaction {
  id: number;
  userId: number;
  amount: number; // positive adds credits, negative spends
  reason: string;
  createdAt: string;
}

export interface Pack {
  id: number;
  name: string;
  credits: number;
  price: number;
}

export interface UserPack {
  id: number;
  userId: number;
  packId: number;
  createdAt: string;
}

export interface Payment {
  id: number;
  userId: number;
  amount: number;
  item: string;
  status: "paid" | "refunded";
  createdAt: string;
}

export interface Report {
  id: number;
  reporterId: number;
  targetUserId: number;
  reason: string;
  status: "open" | "dismissed" | "actioned";
  createdAt: string;
}

export interface Announcement {
  id: number;
  text: string;
  createdAt: string;
}

export interface AuditLog {
  id: number;
  adminId: number;
  action: string;
  createdAt: string;
}
