import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"mentee" | "mentor" | "admin">("mentee");

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (role === "admin") navigate("/admin/dashboard");
    else if (role === "mentor") navigate("/mentor/dashboard");
    else navigate("/mentee/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex">
      {/* Left panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-[440px] p-12 text-white"
        style={{ background: "linear-gradient(160deg, #1B3A5C 0%, #0F2238 100%)" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div
              className="flex items-center justify-center rounded-xl font-display font-800 text-white text-sm"
              style={{ width: 36, height: 36, background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
            >
              M
            </div>
            <span className="font-display font-700 text-xl">MEPO</span>
          </div>
          <h2 className="font-display font-700 text-4xl leading-tight mb-6">
            Welcome back to<br />
            <span style={{ color: "#7BA7FF" }}>your community.</span>
          </h2>
          <p className="text-white/50 leading-relaxed">
            MEPO connects Penn State freshmen with mentors who help navigate the transition to college life.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { emoji: "◉", text: "Matched with a real student mentor" },
            { emoji: "☏", text: "Three check-in calls before orientation" },
            { emoji: "◎", text: "Full attendance tracking built in" },
          ].map((item) => (
            <div key={item.text} className="flex items-center gap-3 text-white/60 text-sm">
              <span className="text-[#4F7FFF]">{item.emoji}</span>
              {item.text}
            </div>
          ))}
          <div className="pt-4 text-white/30 text-xs">© 2026 The Pennsylvania State University</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-sm p-10">
            {/* Back */}
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors mb-8"
            >
              ← Back to home
            </button>

            <h1 className="font-display font-700 text-[#1B3A5C] text-3xl mb-2">Sign In</h1>
            <p className="text-gray-400 text-sm mb-8">Use your Penn State email to continue.</p>

            {/* Role tabs */}
            <div className="flex bg-gray-50 rounded-xl p-1 mb-6">
              {(["mentee", "mentor", "admin"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className="flex-1 py-2 rounded-lg text-sm font-600 capitalize transition-all"
                  style={{
                    background: role === r ? "white" : "transparent",
                    color: role === r ? "#1B3A5C" : "#9CA3AF",
                    boxShadow: role === r ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-600 text-gray-500 mb-1.5 uppercase tracking-wide">
                  Penn State Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="xyz1234@psu.edu"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all placeholder-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-600 text-gray-500 mb-1.5 uppercase tracking-wide">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-800 focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all placeholder-gray-300"
                />
                <div className="flex justify-end mt-1.5">
                  <a href="#" className="text-xs text-[#4F7FFF] hover:underline">Forgot password?</a>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-sm font-700 text-white transition-all hover:opacity-90 active:scale-95 mt-2"
                style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
              >
                Sign In →
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Penn State SSO */}
            <button
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border-2 border-[#1E407C]/20 text-[#1E407C] text-sm font-600 hover:bg-[#1E407C]/5 transition-all"
            >
              <span className="text-base">🦁</span>
              Continue with Penn State SSO
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">
              Need access?{" "}
              <a href="#" className="text-[#4F7FFF] hover:underline">Contact your MEPO coordinator</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
