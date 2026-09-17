import { useNavigate } from "react-router-dom";

const steps = [
  { num: "01", title: "Get Matched", desc: "Incoming freshmen are paired with an experienced Penn State student mentor based on major and interests." },
  { num: "02", title: "Connect Early", desc: "Your mentor reaches out over the summer — three call attempts to break the ice before you even arrive on campus." },
  { num: "03", title: "Attend MEPO", desc: "Join orientation events, meet your cohort, and build the community that will carry you through your first year." },
  { num: "04", title: "Stay Connected", desc: "Track attendance, check in with your mentor, and stay plugged into the resources that matter." },
];

const stats = [
  { value: "2,400+", label: "Freshmen Onboarded" },
  { value: "94%", label: "Attendance Rate" },
  { value: "380", label: "Active Mentors" },
  { value: "12", label: "Orientation Events" },
];

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-body">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-xl font-display font-800 text-white text-sm"
            style={{ width: 36, height: 36, background: "linear-gradient(135deg, #4F7FFF 0%, #1B3A5C 100%)" }}
          >
            M
          </div>
          <span className="font-display font-700 text-[#1B3A5C] text-xl">MEPO</span>
          <span className="text-gray-300 mx-2">|</span>
          <span className="text-sm text-gray-400">Penn State</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#how" className="text-sm text-gray-500 hover:text-[#1B3A5C] transition-colors">How It Works</a>
          <a href="#why" className="text-sm text-gray-500 hover:text-[#1B3A5C] transition-colors">Why It Matters</a>
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2.5 rounded-xl text-sm font-600 text-white transition-all hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #0F2238 60%, #1B3A5C 100%)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, #4F7FFF 0%, transparent 50%), radial-gradient(circle at 80% 20%, #2563EB 0%, transparent 40%)"
        }} />
        <div className="relative max-w-5xl mx-auto px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-600 mb-8"
            style={{ background: "rgba(79,127,255,0.15)", color: "#7BA7FF", border: "1px solid rgba(79,127,255,0.2)" }}>
            ✦ Fall 2026 Cohort Now Forming
          </div>
          <h1 className="font-display font-800 text-white text-6xl leading-tight mb-6">
            Your Penn State journey<br />
            <span style={{ color: "#7BA7FF" }}>starts with a mentor.</span>
          </h1>
          <p className="text-white/60 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            MEPO connects every incoming freshman with a student mentor who's been in your shoes — making orientation not just an event, but a relationship that lasts.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 rounded-xl text-base font-700 text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
            >
              Access Your Portal →
            </button>
            <a href="#how" className="px-8 py-4 rounded-xl text-base font-600 text-white/70 hover:text-white transition-colors border border-white/20 hover:border-white/40">
              Learn More
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-8 py-8 grid grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display font-800 text-white text-3xl">{s.value}</div>
                <div className="text-white/40 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="max-w-5xl mx-auto px-8 py-20">
        <div className="text-center mb-14">
          <div className="text-[#4F7FFF] text-sm font-600 uppercase tracking-widest mb-3">The Process</div>
          <h2 className="font-display font-700 text-[#1B3A5C] text-4xl">How MEPO Works</h2>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:border-[#4F7FFF]/30 hover:shadow-md transition-all group">
              <div
                className="font-display font-800 text-2xl shrink-0"
                style={{ color: "rgba(79,127,255,0.25)" }}
              >
                {s.num}
              </div>
              <div>
                <h3 className="font-display font-700 text-[#1B3A5C] text-lg mb-2 group-hover:text-[#4F7FFF] transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section id="why" className="bg-[#F4F6F9]">
        <div className="max-w-5xl mx-auto px-8 py-20">
          <div className="grid grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-[#4F7FFF] text-sm font-600 uppercase tracking-widest mb-3">Why It Matters</div>
              <h2 className="font-display font-700 text-[#1B3A5C] text-4xl mb-6 leading-tight">
                First-year success starts with connection.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Research shows students who feel connected in their first six weeks are significantly more likely to persist, graduate on time, and report higher satisfaction with their university experience.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                MEPO is Penn State's structured answer to that gap — pairing every freshman with a mentor who knows the ropes, and giving them tools to track, communicate, and thrive.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-600 text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
              >
                Get Started →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Mentor Connects", value: "3 calls", sub: "Before you arrive" },
                { label: "Events Covered", value: "12", sub: "Pre, during, post MEPO" },
                { label: "Match Rate", value: "100%", sub: "Every freshman matched" },
                { label: "Retention Lift", value: "+18%", sub: "Year-over-year" },
              ].map((c) => (
                <div key={c.label} className="bg-white rounded-2xl p-5 shadow-sm">
                  <div className="text-gray-400 text-xs mb-2">{c.label}</div>
                  <div className="font-display font-700 text-[#1B3A5C] text-2xl">{c.value}</div>
                  <div className="text-gray-400 text-xs mt-1">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-8 py-20 text-center">
        <h2 className="font-display font-700 text-[#1B3A5C] text-4xl mb-4">Ready to get started?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">Sign in to access your MEPO dashboard and connect with your mentor, mentees, or program data.</p>
        <button
          onClick={() => navigate("/login")}
          className="px-10 py-4 rounded-xl text-base font-700 text-white transition-all hover:opacity-90 active:scale-95"
          style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #1B3A5C 100%)" }}
        >
          Sign In to MEPO
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-8 py-8 flex items-center justify-between text-gray-400 text-sm">
        <div className="flex items-center gap-3">
          <div className="font-display font-700 text-[#1B3A5C]">MEPO</div>
          <span>·</span>
          <span>Penn State Mentoring & Orientation</span>
        </div>
        <div>© 2026 The Pennsylvania State University</div>
      </footer>
    </div>
  );
}
