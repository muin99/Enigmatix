import type { Pack, Payment, Plan, Transaction } from "@/types";

export const plans: Plan[] = [
  { id: 1, name: "Free", priceMonthly: 0, messageLimit: 50, modes: ["stays"] },
  { id: 2, name: "Plus", priceMonthly: 4, messageLimit: 500, modes: ["stays", "once", "timed"] },
  { id: 3, name: "Pro", priceMonthly: 9, messageLimit: null, modes: ["stays", "once", "timed", "revoke"] },
];

export const packs: Pack[] = [
  { id: 1, name: "Small", credits: 100, price: 2 },
  { id: 2, name: "Medium", credits: 350, price: 6 },
  { id: 3, name: "Large", credits: 900, price: 12 },
];

export const transactions: Transaction[] = [
  { id: 1, userId: 2, amount: 65, reason: "Signup bonus", createdAt: "2026-11-01T10:00:00Z" },
  { id: 2, userId: 2, amount: -5, reason: "Revoke message", createdAt: "2026-11-06T09:30:00Z" },
  { id: 3, userId: 2, amount: 100, reason: "Credit pack Small", createdAt: "2026-11-08T14:15:00Z" },
  { id: 4, userId: 2, amount: -40, reason: "Message credits used", createdAt: "2026-11-10T18:45:00Z" },
];

export const payments: Payment[] = [
  { id: 1, userId: 4, amount: 4, item: "Plus plan", status: "paid", createdAt: "2026-11-10T08:00:00Z" },
  { id: 2, userId: 3, amount: 12, item: "Pack Large", status: "paid", createdAt: "2026-11-09T12:20:00Z" },
  { id: 3, userId: 2, amount: 2, item: "Pack Small", status: "paid", createdAt: "2026-11-08T14:15:00Z" },
  { id: 4, userId: 3, amount: 6, item: "Pack Medium", status: "refunded", createdAt: "2026-11-06T16:40:00Z" },
  { id: 5, userId: 2, amount: 6, item: "Pack Medium", status: "paid", createdAt: "2026-10-21T11:05:00Z" },
  { id: 6, userId: 4, amount: 4, item: "Plus plan", status: "paid", createdAt: "2026-10-10T08:00:00Z" },
];
