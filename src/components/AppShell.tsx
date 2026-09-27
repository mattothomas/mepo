import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { useState } from "react"

import { useAuth } from "../auth/AuthProvider"

const menteeNav = [
  { label: "Dashboard", icon: "⊞", path: "/mentee/dashboard" },

  { label: "Mentor Reveal", icon: "✦", path: "/mentee/mentor-reveal" },

  { label: "Attendance", icon: "◎", path: "/mentee/attendance" },

  { label: "Settings", icon: "⚙", path: "/mentee/settings" },
]

const mentorNav = [
  { label: "Dashboard", icon: "⊞", path: "/mentor/dashboard" },

  { label: "My Calls", icon: "☏", path: "/mentor/calls" },

  { label: "Attendance", icon: "◎", path: "/mentor/attendance" },

  { label: "Settings", icon: "⚙", path: "/mentor/settings" },
]

const adminNav = [
  { label: "Dashboard", icon: "⊞", path: "/admin/dashboard" },

  { label: "Calls", icon: "☏", path: "/admin/calls" },

  { label: "Attendance", icon: "◎", path: "/admin/attendance" },

  { label: "People", icon: "◉", path: "/admin/people" },

  { label: "Uploads", icon: "↑", path: "/admin/uploads" },

  { label: "Settings", icon: "⚙", path: "/admin/settings" },
]

export default function AppShell() {
  const location = useLocation()

  const navigate = useNavigate()

  const auth = useAuth()

  const role = auth.role ?? "mentee"

  const nav =
    role === "admin" || role === "coordinator"
      ? adminNav
      : role === "mentor"
        ? mentorNav
        : menteeNav

  const [sidebarOpen, setSidebarOpen] = useState(true)

  const roleLabel =
    role === "admin"
      ? "Administrator"
      : role === "coordinator"
        ? "Coordinator"
        : role === "mentor"
          ? "Mentor"
          : "Mentee"

  const firstName = auth.profile?.first_name || "MEPO"

  const lastName = auth.profile?.last_name || "Member"

  const userName = `${firstName} ${lastName}`

  const initials = `${firstName[0] ?? "M"}${lastName[0] ?? ""}`.toUpperCase()

  const pageTitle =
    nav.find((n) => location.pathname.startsWith(n.path))?.label ?? "MEPO"

  return (
    <div className="flex h-full bg-[#F4F6F9]">
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 transition-all duration-300"
        style={{
          width: sidebarOpen ? 240 : 64,

          background: "linear-gradient(180deg, #1B3A5C 0%, #132A42 100%)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <div
            className="flex items-center justify-center rounded-xl font-display font-800 text-white text-sm shrink-0"
            style={{
              width: 36,

              height: 36,

              background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)",
            }}
          >
            M
          </div>
          {sidebarOpen && (
            <div>
              <div className="font-display font-700 text-white text-base leading-none">
                MEPO
              </div>
              <div className="text-white/50 text-xs mt-0.5">Penn State</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="ml-auto text-white/40 hover:text-white/80 transition-colors text-lg"
          >
            {sidebarOpen ? "‹" : "›"}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 flex flex-col gap-1 overflow-y-auto">
          {nav.map((item) => {
            const active = location.pathname.startsWith(item.path)

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all"
                style={{
                  background: active ? "rgba(79,127,255,0.18)" : "transparent",

                  color: active ? "#7BA7FF" : "rgba(255,255,255,0.6)",
                }}
              >
                <span className="text-base w-5 text-center shrink-0">
                  {item.icon}
                </span>
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {sidebarOpen && active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4F7FFF]" />
                )}
              </button>
            )
          })}
        </nav>

        {/* User */}
        <div
          className="flex items-center gap-3 mx-3 mb-4 px-3 py-3 rounded-xl"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="flex items-center justify-center rounded-full text-white text-xs font-600 shrink-0"
            style={{
              width: 32,

              height: 32,

              background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)",
            }}
          >
            {initials}
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <div className="text-white text-sm font-medium truncate">
                {userName}
              </div>
              <div className="text-white/40 text-xs">{roleLabel}</div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-gray-100 shrink-0">
          <div>
            <div className="font-display font-700 text-[#1B3A5C] text-lg leading-none">
              {pageTitle}
            </div>
            <div className="text-gray-400 text-xs mt-0.5">
              {roleLabel} View · Fall 2026
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-400">
              <span className="text-lg">🔔</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4F7FFF]" />
            </button>
            <button
              onClick={() =>
                void auth

                  .signOut()

                  .then(() => navigate("/login", { replace: true }))
              }
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              title="Sign out"
            >
              <div
                className="flex items-center justify-center rounded-full text-white text-xs font-600"
                style={{
                  width: 28,

                  height: 28,

                  background:
                    "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)",
                }}
              >
                {initials}
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {userName}
              </span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
