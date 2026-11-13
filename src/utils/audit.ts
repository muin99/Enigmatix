import { api } from "./api";
import type { AuditLog } from "@/types";

// Every admin action calls this so the audit log screen has data.
export function logAdminAction(adminId: number, action: string) {
  return api.post<AuditLog>("/auditLogs", {
    adminId,
    action,
    createdAt: new Date().toISOString(),
  });
}
