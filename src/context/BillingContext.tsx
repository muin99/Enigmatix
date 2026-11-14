import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { packs as seedPacks, payments as seedPayments, plans as seedPlans, transactions as seedTransactions } from "@/data/billing";
import type { Pack, Payment, Plan, Transaction } from "@/types";

type BillingValue = {
  plans: Plan[];
  packs: Pack[];
  payments: Payment[];
  transactions: Transaction[];
  balance: number;
};

const BillingContext = createContext<BillingValue | null>(null);

export function BillingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plans] = useState<Plan[]>(seedPlans);
  const [packs] = useState<Pack[]>(seedPacks);
  const [payments] = useState<Payment[]>(seedPayments);
  const [transactions] = useState<Transaction[]>(seedTransactions);

  const balance = useMemo(
    () =>
      transactions
        .filter((t) => t.userId === user?.id)
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions, user]
  );

  return (
    <BillingContext.Provider value={{ plans, packs, payments, transactions, balance }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error("useBilling must be used inside BillingProvider");
  return ctx;
}
