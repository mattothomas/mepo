import type { ProgramRole } from "../types/database.types"

export function dashboardPathForRole(role: ProgramRole) {
  if (role === "admin" || role === "coordinator") return "/admin/dashboard"
  if (role === "mentor") return "/mentor/dashboard"
  return "/mentee/dashboard"
}
