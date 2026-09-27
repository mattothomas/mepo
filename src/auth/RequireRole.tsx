import { Navigate, Outlet } from "react-router-dom"
import type { ProgramRole } from "../types/database.types"
import { useAuth } from "./AuthProvider"
import { dashboardPathForRole } from "./routeHelpers"

export default function RequireRole({ allow }: { allow: ProgramRole[] }) {
  const { role } = useAuth()
  if (!role) return <Navigate to="/login" replace />
  if (!allow.includes(role))
    return <Navigate to={dashboardPathForRole(role)} replace />
  return <Outlet />
}
