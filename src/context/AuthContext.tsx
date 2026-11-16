import { users as seedUsers } from "@/data/users";
import type { User } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type AuthValue = {
  user: User | null;
  users: User[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>(seedUsers);
  // Starts signed in as the first regular user so every screen has a current user.
  const [user, setUser] = useState<User | null>(seedUsers[1]);

  const login = (email: string, password: string) => {
    const match = users.find(
      (u) =>
        u.email === email && u.password === password && u.status === "active",
    );
    if (!match) return false;
    setUser(match);
    return true;
  };

  const signup = (name: string, email: string, password: string) => {
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
    };
    setUsers([...users, created]);
    setUser(created);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, users, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
