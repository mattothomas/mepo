import { useNavigate } from "react-router-dom";

const mentees = [
  { name: "Jordan Lee", major: "Computer Engineering", callStatus: "Answered", callNum: 1, engagement: "High" },
  { name: "Maya Patel", major: "Biology", callStatus: "No Answer", callNum: 2, engagement: "Med" },
  { name: "Tyler Brooks", major: "Business", callStatus: "Voicemail", callNum: 1, engagement: "Low" },
  { name: "Sofia Chen", major: "Psychology", callStatus: "Answered", callNum: 1, engagement: "High" },
  { name: "DeShawn Morris", major: "Mechanical Eng.", callStatus: "Pending", callNum: 0, engagement: "—" },
];

const callSchedule = [
  { mentee: "Maya Patel", date: "Sept 5", time: "2:00 PM", attempt: 3, note: "Try cell number this time" },
  { mentee: "Tyler Brooks", date: "Sept 6", time: "4:00 PM", attempt: 2, note: "" },
  { mentee: "DeShawn Morris", date: "Sept 7", time: "11:00 AM", attempt: 1, note: "First contact" },
];

function engBadge(e: string) {
  const map: Record<string, [string, string]> = {
    High: ["#DCFCE7", "#10B981"],
    Med: ["#FEF9C3", "#CA8A04"],
    Low: ["#FEE2E2", "#EF4444"],
    "—": ["#F3F4F6", "#9CA3AF"],
  };
  const [bg, color] = map[e] ?? ["#F3F4F6", "#9CA3AF"];
  return (
    <span className="text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: bg, color }}>
      {e}
    </span>
  );
}

function callBadge(s: string) {
  const map: Record<string, [string, string]> = {
    Answered: ["#DCFCE7", "#10B981"],
    "No Answer": ["#FEE2E2", "#EF4444"],
    Voicemail: ["#FEF9C3", "#CA8A04"],
    Pending: ["#F3F4F6", "#9CA3AF"],
  };
  const [bg, color] = map[s] ?? ["#F3F4F6", "#9CA3AF"];
  return (
    <span className="text-xs font-600 px-2.5 py-1 rounded-full" style={{ background: bg, color }}>
      {s}
    </span>
  );
}

export default function MentorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* Welcome */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #132A42 100%)" }}
      >
        <div className="absolute right-8 top-8 text-6xl opacity-10">☏</div>
        <div className="text-white/50 text-sm mb-1">Welcome back,</div>
        <h1 className="font-display font-800 text-3xl mb-2">Alex Rivera</h1>
        <p className="text-white/60 text-sm max-w-lg">
          You have 2 mentees who haven't answered yet. Try reaching them again before the Sept 10 deadline.
        </p>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => navigate("/mentor/calls")}
            className="px-5 py-2.5 rounded-xl text-sm font-600 bg-white text-[#1B3A5C] hover:opacity-90 transition-all"
          >
            ☏ View My Calls
          </button>
          <button
            onClick={() => navigate("/mentor/attendance")}
            className="px-5 py-2.5 rounded-xl text-sm font-600 text-white/70 border border-white/20 hover:bg-white/10 transition-all"
          >
            Attendance Log
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Assigned Mentees", value: "5", sub: "Your cohort" },
          { label: "Calls Completed", value: "3/5", sub: "2 remaining" },
          { label: "Answered", value: "2", sub: "40% connect rate" },
          { label: "Engagement Avg", value: "Med", sub: "Across all mentees" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
            <div className="font-display font-700 text-[#1B3A5C] text-2xl">{stat.value}</div>
            <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Mentees table */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="text-sm font-600 text-[#1B3A5C]">My Mentees</div>
            <button
              onClick={() => navigate("/mentor/calls")}
              className="text-xs text-[#4F7FFF] hover:underline"
            >
              View all calls →
            </button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="text-left px-5 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentee</th>
                <th className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Call</th>
                <th className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Attempts</th>
                <th className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {mentees.map((m, i) => (
                <tr key={m.name} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full text-white text-xs font-600 shrink-0"
                        style={{
                          width: 32,
                          height: 32,
                          background: `hsl(${m.name.charCodeAt(0) * 10}, 50%, 45%)`,
                        }}
                      >
                        {m.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-500 text-[#1B3A5C]">{m.name}</div>
                        <div className="text-xs text-gray-400">{m.major}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">{callBadge(m.callStatus)}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex gap-1">
                      {[1, 2, 3].map((n) => (
                        <span key={n} className={`w-5 h-5 rounded-full text-xs font-600 flex items-center justify-center
                          ${n <= m.callNum ? "bg-[#4F7FFF] text-white" : "bg-gray-100 text-gray-400"}`}>
                          {n}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">{engBadge(m.engagement)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Weekly calls schedule */}
        <div className="col-span-1 bg-white rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-600 text-[#1B3A5C] mb-4">Upcoming Calls</div>
          <div className="space-y-4">
            {callSchedule.map((c) => (
              <div key={c.mentee} className="p-3 rounded-xl bg-[#F4F6F9] hover:bg-[#EEF3FF] transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-600 text-[#1B3A5C]">{c.mentee}</div>
                  <span className="text-xs font-600 px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#4F7FFF]">
                    Attempt {c.attempt}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mb-1">{c.date} · {c.time}</div>
                {c.note && <div className="text-xs text-gray-500 italic">{c.note}</div>}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/mentor/calls")}
            className="mt-4 w-full py-2.5 rounded-xl text-sm font-600 text-[#4F7FFF] border border-[#4F7FFF]/20 hover:bg-[#EEF3FF] transition-all"
          >
            Open Call Log →
          </button>
        </div>
      </div>

      {/* Engagement + Tips */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-600 text-[#1B3A5C] mb-4">Mentee Engagement</div>
          <div className="space-y-3">
            {mentees.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <div className="text-sm text-gray-500 w-28 truncate">{m.name.split(" ")[0]}</div>
                <div className="flex-1 h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: m.engagement === "High" ? "80%" : m.engagement === "Med" ? "50%" : m.engagement === "Low" ? "20%" : "0%",
                      background: m.engagement === "High" ? "#10B981" : m.engagement === "Med" ? "#F59E0B" : m.engagement === "Low" ? "#EF4444" : "#E5E7EB",
                    }}
                  />
                </div>
                <div className="w-8 text-xs text-gray-400 text-right">{m.engagement === "—" ? "—" : ""}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-600 text-[#1B3A5C] mb-4">Mentor Tips</div>
          <div className="space-y-3">
            {[
              { icon: "💬", tip: "Text before calling — a heads up improves answer rates by 40%." },
              { icon: "📝", tip: "Log notes after each call so you don't lose context between attempts." },
              { icon: "🎯", tip: "Focus on low-engagement mentees this week — deadline is Sept 10." },
            ].map((t) => (
              <div key={t.tip} className="flex gap-3 p-3 rounded-xl bg-[#F4F6F9]">
                <span className="text-lg shrink-0">{t.icon}</span>
                <p className="text-xs text-gray-500 leading-relaxed">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
