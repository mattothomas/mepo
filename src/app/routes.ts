import { createBrowserRouter } from "react-router-dom"
import { createElement } from "react"
import Landing from "../screens/Landing"
import Login from "../screens/Login"
import AppShell from "../components/AppShell"
import MenteeDashboard from "../screens/MenteeDashboard"
import MentorDashboard from "../screens/MentorDashboard"
import AdminDashboard from "../screens/AdminDashboard"
import MentorReveal from "../screens/MentorReveal"
import MentorProfile from "../screens/MentorProfile"
import Calls from "../screens/Calls"
import AdminCalls from "../screens/AdminCalls"
import Attendance from "../screens/Attendance"
import AdminAttendance from "../screens/AdminAttendance"
import People from "../screens/People"
import Uploads from "../screens/Uploads"
import Settings from "../screens/Settings"
import RequireAuth from "../auth/RequireAuth"
import RequireRole from "../auth/RequireRole"

export const router = createBrowserRouter([
  { path: "/", Component: Landing },
  { path: "/login", Component: Login },
  {
    Component: RequireAuth,
    children: [
      {
        element: createElement(RequireRole, { allow: ["mentee"] }),
        children: [
          {
            Component: AppShell,
            children: [
              { path: "/mentee/dashboard", Component: MenteeDashboard },
              { path: "/mentee/mentor-reveal", Component: MentorReveal },
              { path: "/mentee/mentor/:id", Component: MentorProfile },
              { path: "/mentee/attendance", Component: Attendance },
              { path: "/mentee/settings", Component: Settings },
            ],
          },
        ],
      },
      {
        element: createElement(RequireRole, { allow: ["mentor"] }),
        children: [
          {
            Component: AppShell,
            children: [
              { path: "/mentor/dashboard", Component: MentorDashboard },
              { path: "/mentor/calls", Component: Calls },
              { path: "/mentor/attendance", Component: Attendance },
              { path: "/mentor/settings", Component: Settings },
            ],
          },
        ],
      },
      {
        element: createElement(RequireRole, {
          allow: ["coordinator", "admin"],
        }),
        children: [
          {
            Component: AppShell,
            children: [
              { path: "/admin/dashboard", Component: AdminDashboard },
              { path: "/admin/calls", Component: AdminCalls },
              { path: "/admin/attendance", Component: AdminAttendance },
              { path: "/admin/people", Component: People },
              { path: "/admin/uploads", Component: Uploads },
              { path: "/admin/settings", Component: Settings },
            ],
          },
        ],
      },
    ],
  },
])
