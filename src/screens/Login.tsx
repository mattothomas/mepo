import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../auth/AuthProvider"
import { dashboardPathForRole } from "../auth/routeHelpers"

export default function Login() {
  const navigate = useNavigate()
  const auth = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSignIn(event: React.FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setFormError(null)
    try {
      const role = await auth.signIn(email.trim(), password)
      navigate(dashboardPathForRole(role), { replace: true })
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to sign in.",
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      <div
        className="hidden lg:flex flex-col justify-between w-[440px] p-12 text-white"
        style={{
          background: "linear-gradient(160deg, #1B3A5C 0%, #0F2238 100%)",
        }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div
              className="flex items-center justify-center rounded-xl font-display font-800 text-white text-sm"
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)",
              }}
            >
              M
            </div>
            <span className="font-display font-700 text-xl">MEPO</span>
          </div>
          <h2 className="font-display font-700 text-4xl leading-tight mb-6">
            Welcome back to
            <br />
            <span style={{ color: "#7BA7FF" }}>your community.</span>
          </h2>
          <p className="text-white/50 leading-relaxed">
            MEPO connects Penn State freshmen with mentors who help navigate the
            transition to college life.
          </p>
        </div>
        <div className="space-y-4 text-sm text-white/60">
          <div>Matched with a real student mentor</div>
          <div>Three check-in calls before orientation</div>
          <div>Full attendance tracking built in</div>
          <div className="pt-4 text-white/30 text-xs">
            © 2026 The Pennsylvania State University
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-sm p-10">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors mb-8"
            >
              ← Back to home
            </button>
            <h1 className="font-display font-700 text-[#1B3A5C] text-3xl mb-2">
              Sign In
            </h1>
            <p className="text-gray-400 text-sm mb-8">
              Use your approved MEPO account to continue.
            </p>

            <form onSubmit={handleSignIn} className="space-y-4">
              {!auth.configured && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-800">
                  Supabase is not configured yet. Copy <code>.env.example</code>{" "}
                  to <code>.env.local</code> and add the staging project values.
                </div>
              )}
              {(formError || auth.error) && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700"
                >
                  {formError ?? auth.error}
                </div>
              )}

              <div>
                <label
                  className="block text-xs font-600 text-gray-500 mb-1.5 uppercase tracking-wide"
                  htmlFor="email"
                >
                  Penn State Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="xyz1234@psu.edu"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all placeholder-gray-300"
                />
              </div>
              <div>
                <label
                  className="block text-xs font-600 text-gray-500 mb-1.5 uppercase tracking-wide"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all placeholder-gray-300"
                />
                <div className="flex justify-end mt-1.5">
                  <span className="text-xs text-gray-400">
                    Password reset is the next auth task.
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || !auth.configured}
                className="w-full py-3.5 rounded-xl text-sm font-700 text-white transition-all hover:opacity-90 active:scale-95 mt-2 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)",
                }}
              >
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <button
              type="button"
              disabled
              title="Penn State SSO will be enabled after the identity provider is approved and configured."
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-[#1E407C]/20 text-[#1E407C] text-sm font-600 opacity-50 cursor-not-allowed"
            >
              Penn State SSO - coming later
            </button>
            <p className="text-center text-xs text-gray-400 mt-6">
              Need access? Contact your MEPO coordinator.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
