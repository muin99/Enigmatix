import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "@/utils/api";
import type { User } from "@/types";

type AuthValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

// TEMP: auto sign in as this user until the real login is built. 1 = admin, 2 = Meraz.
const TEMP_USER_ID = 2;

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // TEMP: remove when login screen works
    api.get<User>(`/users/${TEMP_USER_ID}`).then(setUser).catch(() => setUser(null));
  }, []);

  const value: AuthValue = {
    user,
    login: async () => {
      throw new Error("TODO Mahfi: implement login");
    },
    signup: async () => {
      throw new Error("TODO Mahfi: implement signup");
    },
    logout: () => setUser(null),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
