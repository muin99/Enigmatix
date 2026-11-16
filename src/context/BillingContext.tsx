import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  packs as seedPacks,
  payments as seedPayments,
  plans as seedPlans,
  transactions as seedTransactions,
} from "@/data/billing";
import type { Pack, Payment, Plan, Transaction } from "@/types";

export type PlanInput = {
  id?: number;
  name: string;
  priceMonthly: number;
  messageLimit: number | null;
};

type BillingValue = {
  plans: Plan[];
  packs: Pack[];
  payments: Payment[];
  transactions: Transaction[];
  balance: number;
  savePlan: (input: PlanInput) => void;
};

const BillingContext = createContext<BillingValue | null>(null);

export function BillingProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [plans, setPlans] = useState<Plan[]>(seedPlans);
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

  const savePlan = (input: PlanInput) => {
    if (input.id) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === input.id
            ? { ...p, name: input.name, priceMonthly: input.priceMonthly, messageLimit: input.messageLimit }
            : p
        )
      );
      return;
    }
    const created: Plan = {
      id: plans.length + 1,
      name: input.name,
      priceMonthly: input.priceMonthly,
      messageLimit: input.messageLimit,
      modes: ["stays"],
    };
    setPlans((prev) => [...prev, created]);
  };

  return (
    <BillingContext.Provider value={{ plans, packs, payments, transactions, balance, savePlan }}>
      {children}
    </BillingContext.Provider>
  );
}

export function useBilling() {
  const ctx = useContext(BillingContext);
  if (!ctx) throw new Error("useBilling must be used inside BillingProvider");
  return ctx;
}
