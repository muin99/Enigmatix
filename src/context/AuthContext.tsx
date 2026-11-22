import { users as seedUsers } from "@/data/users";
import type { User } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthValue = {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => "ok" | "invalid" | "banned";
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  banUser: (id: number, reason: string) => void;
  unbanUser: (id: number) => void;
  backedUp: boolean;
  markBackedUp: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  const [user, setUser] = useState<User | null>(null);
  const [backedUp, setBackedUp] = useState(false);

  const login = (email: string, password: string) => {
    const match = users.find((u) => u.email === email && u.password === password);
    if (!match) return "invalid";
    if (match.status === "banned") return "banned";
    setUser(match);
    return "ok";
  };

  const signup = (name: string, email: string, password: string) => {
    if (users.some((u) => u.email === email)) return false;
    const id = users.length + 1;
    const created: User = {
      id,
      name,
      email,
      password,
      role: "user",
      status: "active",
      publicKey: `key-${id}`,
      planId: 1,
      joinedAt: new Date().toISOString(),
    };
    setUsers([...users, created]);
    setUser(created);
    return true;
  };

  const logout = () => setUser(null);

  const banUser = (id: number, reason: string) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: "banned", banReason: reason } : u)),
    );
  };

  const unbanUser = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: "active", banReason: undefined } : u,
      ),
    );
  };

  const markBackedUp = () => setBackedUp(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        signup,
        logout,
        banUser,
        unbanUser,
        backedUp,
        markBackedUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
