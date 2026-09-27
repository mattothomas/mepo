import { Navigate, Outlet, useLocation } from "react-router-dom"

import { useAuth } from "./AuthProvider"

export default function RequireAuth() {
  const auth = useAuth()

  const location = useLocation()

  if (auth.loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F4F6F9] text-[#1B3A5C]">
        Loading your MEPO account...
      </div>
    )
  }

  if (!auth.session)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />

  if (!auth.membership) {
    return (
      <div className="min-h-screen grid place-items-center bg-[#F4F6F9] p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-700 text-[#1B3A5C]">
            MEPO access is not assigned yet
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Your account is signed in, but a coordinator must add it to an
            active program.
          </p>
          <button
            onClick={() => void auth.signOut()}
            className="mt-6 rounded-xl bg-[#1B3A5C] px-5 py-2.5 text-sm font-600 text-white"
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }

  return <Outlet />
}
