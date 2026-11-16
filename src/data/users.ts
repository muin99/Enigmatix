import type { User } from "@/types";

export const users: User[] = [
  { id: 1, name: "Admin", email: "admin@enigmatix.app", password: "admin123", role: "admin", status: "active", publicKey: "key-1", planId: 3 },
  { id: 2, name: "Meraz", email: "meraz@enigmatix.app", password: "pass1234", role: "user", status: "active", publicKey: "key-2", planId: 1 },
  { id: 3, name: "Muin", email: "muin@enigmatix.app", password: "pass1234", role: "user", status: "active", publicKey: "key-3", planId: 1 },
  { id: 4, name: "Mahfi", email: "mahfi@enigmatix.app", password: "pass1234", role: "user", status: "active", publicKey: "key-4", planId: 2 },
];
