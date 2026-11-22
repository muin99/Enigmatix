import type { RecallMode } from "@/types";

export const RECALL_LABELS: Record<RecallMode, string> = {
  stays: "Stays",
  once: "View once",
  timed: "Timed",
  revoke: "Revoke later",
};

export const RECALL_ORDER: RecallMode[] = ["stays", "once", "timed", "revoke"];
