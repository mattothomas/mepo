import { useNavigate } from "react-router-dom";

const tasks = [
  { label: "Complete housing survey", due: "Aug 30", done: true },
  { label: "Watch MEPO welcome video", due: "Sep 2", done: true },
  { label: "Schedule intro call with mentor", due: "Sep 5", done: false },
  { label: "Register for orientation session", due: "Sep 8", done: false },
  { label: "Upload student photo", due: "Sep 10", done: false },
];

const announcements = [
  { title: "Mentor Reveal This Friday!", time: "2 hours ago", tag: "🎉 Exciting" },
  { title: "MEPO Kickoff Event — Sept 14", time: "Yesterday", tag: "📅 Event" },
  { title: "Update your profile by Sept 10", time: "3 days ago", tag: "⚠️ Action" },
];

const schedule = [
  { event: "Mentor Intro Call", date: "Sep 5", time: "3:00 PM", status: "Upcoming" },
  { event: "Pre-MEPO Webinar", date: "Sep 8", time: "6:00 PM", status: "Registered" },
  { event: "MEPO Kickoff Day 1", date: "Sep 14", time: "9:00 AM", status: "Registered" },
  { event: "MEPO Kickoff Day 2", date: "Sep 15", time: "9:00 AM", status: "Upcoming" },
];

export default function MenteeDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* Welcome */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #2563EB 100%)" }}
      >
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 100% 50%, #7BA7FF 0%, transparent 60%)"
        }} />
        <div className="text-white/60 text-sm mb-1">Good morning,</div>
        <h1 className="font-display font-800 text-3xl mb-2">Jordan Lee 👋</h1>
        <p className="text-white/60 text-sm max-w-md">
          Your mentor reveal is coming up this Friday. Make sure your profile is complete before then!
        </p>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate("/mentee/mentor-reveal")}
            className="px-5 py-2.5 rounded-xl text-sm font-600 bg-white text-[#1B3A5C] hover:opacity-90 transition-all"
          >
            ✦ Mentor Reveal →
          </button>
          <button
            onClick={() => navigate("/mentee/settings")}
            className="px-5 py-2.5 rounded-xl text-sm font-600 text-white/80 border border-white/20 hover:bg-white/10 transition-all"
          >
            Complete Profile
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Mentor card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm col-span-1 flex flex-col gap-4">
          <div className="text-xs font-600 text-gray-400 uppercase tracking-wide">Your Mentor</div>
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center rounded-2xl text-2xl"
              style={{ width: 64, height: 64, background: "linear-gradient(135deg, #EEF3FF 0%, #DBEAFE 100%)" }}
            >
              🧑‍💻
            </div>
            <div>
              <div className="font-display font-700 text-[#1B3A5C] text-base">Alex Rivera</div>
              <div className="text-gray-400 text-sm">Computer Science, Junior</div>
              <div className="text-[#4F7FFF] text-xs mt-1 font-500">Revealed in 3 days ✦</div>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Call Attempts</span>
              <div className="flex gap-1">
                {[1, 2, 3].map((n) => (
                  <span key={n} className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-600
                    ${n <= 1 ? "bg-[#10B981] text-white" : "bg-gray-100 text-gray-400"}`}>
                    {n}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Status</span>
              <span className="text-[#F59E0B] font-600 text-xs">Awaiting call back</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/mentee/mentor/1")}
            className="w-full py-2.5 rounded-xl text-sm font-600 text-[#4F7FFF] border border-[#4F7FFF]/20 hover:bg-[#EEF3FF] transition-all"
          >
            View Profile →
          </button>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-2xl p-5 shadow-sm col-span-1">
          <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-4">Attendance</div>
          <div className="space-y-3">
            {[
              { phase: "Pre-MEPO", pct: 100, color: "#10B981" },
              { phase: "During MEPO", pct: 75, color: "#F59E0B" },
              { phase: "Post-MEPO", pct: 0, color: "#E5E7EB" },
            ].map((a) => (
              <div key={a.phase}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{a.phase}</span>
                  <span className="font-600" style={{ color: a.color === "#E5E7EB" ? "#9CA3AF" : a.color }}>
                    {a.pct > 0 ? `${a.pct}%` : "—"}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${a.pct}%`, background: a.color }} />
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/mentee/attendance")}
            className="mt-4 text-sm text-[#4F7FFF] hover:underline"
          >
            View full attendance →
          </button>
        </div>

        {/* MEPO Info */}
        <div className="bg-white rounded-2xl p-5 shadow-sm col-span-1">
          <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-4">MEPO Program</div>
          <div className="space-y-3">
            {[
              { label: "Your Cohort", value: "Engineering A" },
              { label: "Coordinator", value: "Dr. Sarah Kim" },
              { label: "Program Year", value: "Fall 2026" },
              { label: "Your Status", value: "Active ✓" },
            ].map((info) => (
              <div key={info.label} className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{info.label}</span>
                <span className="text-[#1B3A5C] font-500">{info.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-[#EEF3FF]">
            <div className="text-xs font-600 text-[#4F7FFF] mb-1">MEPO Dates</div>
            <div className="text-xs text-gray-500">Sept 14–15 · University Park</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Schedule */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-4">Upcoming Schedule</div>
          <div className="space-y-3">
            {schedule.map((s) => (
              <div key={s.event} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="text-sm font-500 text-[#1B3A5C]">{s.event}</div>
                  <div className="text-xs text-gray-400">{s.date} · {s.time}</div>
                </div>
                <span
                  className="text-xs font-600 px-2.5 py-1 rounded-full"
                  style={{
                    background: s.status === "Registered" ? "#DCFCE7" : "#EEF3FF",
                    color: s.status === "Registered" ? "#10B981" : "#4F7FFF",
                  }}
                >
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Tasks */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-600 text-gray-400 uppercase tracking-wide">Tasks</div>
              <span className="text-xs text-[#4F7FFF] font-600">
                {tasks.filter((t) => t.done).length}/{tasks.length} done
              </span>
            </div>
            <div className="space-y-2">
              {tasks.map((task) => (
                <div key={task.label} className="flex items-center gap-3 py-1.5">
                  <div
                    className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0"
                    style={{
                      borderColor: task.done ? "#10B981" : "#D1D5DB",
                      background: task.done ? "#10B981" : "transparent",
                    }}
                  >
                    {task.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm flex-1 ${task.done ? "line-through text-gray-300" : "text-gray-700"}`}>
                    {task.label}
                  </span>
                  <span className="text-xs text-gray-300">{task.due}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-4">Announcements</div>
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.title} className="flex items-start gap-3 py-1.5 border-b border-gray-50 last:border-0">
                  <div className="flex-1">
                    <div className="text-sm font-500 text-[#1B3A5C]">{a.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                  </div>
                  <span className="text-xs bg-gray-50 px-2 py-1 rounded-full text-gray-500 whitespace-nowrap">{a.tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
