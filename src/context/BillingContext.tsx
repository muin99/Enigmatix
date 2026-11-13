import { createContext, ReactNode, useContext, useState } from "react";
import type { Pack, Plan, Transaction } from "@/types";

type BillingValue = {
  plans: Plan[];
  packs: Pack[];
  transactions: Transaction[];
  balance: number;
  refreshBilling: () => Promise<void>;
  subscribe: (planId: number) => Promise<void>;
  buyPack: (packId: number) => Promise<void>;
  spendCredits: (amount: number, reason: string) => Promise<void>;
};

const BillingContext = createContext<BillingValue | null>(null);

export function BillingProvider({ children }: { children: ReactNode }) {
  const [plans] = useState<Plan[]>([]);
  const [packs] = useState<Pack[]>([]);
  const [transactions] = useState<Transaction[]>([]);

  // TEMP: stubs, filled in by the billing context phase
  const value: BillingValue = {
    plans,
    packs,
    transactions,
    balance: 0,
    refreshBilling: async () => {},
    subscribe: async () => {},
    buyPack: async () => {},
    spendCredits: async () => {},
  };

  return <BillingContext.Provider value={value}>{children}</BillingContext.Provider>;
}

export function useBilling() {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error("useBilling must be used inside BillingProvider");
  return ctx;
}
