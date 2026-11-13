import type { Plan, RecallMode } from "@/types";

// Plan gating: the Recall chip in the chat room uses this to lock modes.
export function canUseMode(plan: Plan | undefined, mode: RecallMode): boolean {
  if (!plan) return mode === "stays";
  return plan.modes.includes(mode);
}
