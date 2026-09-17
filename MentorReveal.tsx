import { useNavigate } from "react-router-dom";

const recentActivity = [
  { who: "Alex Rivera", action: "Logged call attempt 2 for Tyler Brooks", time: "10 min ago" },
  { who: "Priya Nair", action: "Uploaded mentee roster — 47 records", time: "1 hour ago" },
  { who: "Jordan Lee", action: "Updated attendance: Pre-MEPO ✓", time: "2 hours ago" },
  { who: "Marcus Webb", action: "Completed all 3 call attempts", time: "3 hours ago" },
  { who: "System", action: "Mentor Reveal countdown updated to 3 days", time: "5 hours ago" },
];

const needsAttention = [
  { name: "Tyler Brooks", mentor: "Alex Rivera", issue: "Missed 2 calls — no contact", severity: "High" },
  { name: "Lena Kim", mentor: "Priya Nair", issue: "No attendance registered", severity: "High" },
  { name: "Omar Jackson", mentor: "Carlos Vega", issue: "Engagement flagged Low", severity: "Med" },
  { name: "Sasha Wang", mentor: "Jordan Hayes", issue: "Profile incomplete", severity: "Low" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      {/* Header strip */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-700 text-[#1B3A5C] text-2xl">Program Overview</h1>
          <div className="text-gray-400 text-sm mt-0.5">Fall 2026 · Live as of Sept 4, 2026</div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/admin/uploads")}
            className="px-4 py-2.5 rounded-xl text-sm font-600 text-[#4F7FFF] border border-[#4F7FFF]/30 hover:bg-[#EEF3FF] transition-all"
          >
            ↑ Upload Roster
          </button>
          <button
            className="px-4 py-2.5 rounded-xl text-sm font-600 text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
          >
            ⬇ Export Report
          </button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Total Freshmen", value: "2,417", delta: "+12 this week", up: true },
          { label: "Active Mentors", value: "381", delta: "100% matched", up: true },
          { label: "Calls Completed", value: "68%", delta: "1,643 of 2,417", up: true },
          { label: "Avg Attendance", value: "79%", delta: "-4% vs target", up: false },
          { label: "Needs Attention", value: "47", delta: "Critical: 12", up: false },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs text-gray-400 mb-2">{stat.label}</div>
            <div className="font-display font-700 text-[#1B3A5C] text-2xl">{stat.value}</div>
            <div className={`text-xs mt-1 font-500 ${stat.up ? "text-[#10B981]" : "text-[#EF4444]"}`}>
              {stat.up ? "▲" : "▼"} {stat.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Calls + Attendance side by side */}
      <div className="grid grid-cols-2 gap-6">
        {/* Calls status */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-600 text-[#1B3A5C]">Call Status Overview</div>
            <button onClick={() => navigate("/admin/calls")} className="text-xs text-[#4F7FFF] hover:underline">
              View all →
            </button>
          </div>
          <div className="space-y-3">
            {[
              { label: "Answered (1st attempt)", count: 843, total: 2417, color: "#10B981" },
              { label: "Answered (2nd attempt)", count: 421, total: 2417, color: "#4F7FFF" },
              { label: "Answered (3rd attempt)", count: 379, total: 2417, color: "#8B5CF6" },
              { label: "No contact after 3 attempts", count: 298, total: 2417, color: "#EF4444" },
              { label: "Not yet attempted", count: 476, total: 2417, color: "#E5E7EB" },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-600 text-gray-700">{row.count.toLocaleString()}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(row.count / row.total) * 100}%`, background: row.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance by phase */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-600 text-[#1B3A5C]">Attendance by Phase</div>
            <button onClick={() => navigate("/admin/attendance")} className="text-xs text-[#4F7FFF] hover:underline">
              View table →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { phase: "Pre-MEPO", pct: 91, target: 95, events: "2 of 2 events" },
              { phase: "During MEPO", pct: 78, target: 90, events: "Day 1 complete" },
              { phase: "Post-MEPO", pct: 0, target: 80, events: "Not started" },
              { phase: "Overall", pct: 79, target: 90, events: "All events" },
            ].map((a) => (
              <div key={a.phase} className="p-4 rounded-xl bg-[#F4F6F9]">
                <div className="text-xs text-gray-400 mb-1">{a.phase}</div>
                <div className="font-display font-700 text-[#1B3A5C] text-2xl mb-1">
                  {a.pct > 0 ? `${a.pct}%` : "—"}
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full mb-1">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${a.pct}%`,
                      background: a.pct >= a.target ? "#10B981" : a.pct > 0 ? "#F59E0B" : "#E5E7EB",
                    }}
                  />
                </div>
                <div className="text-xs text-gray-400">{a.events}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Needs attention */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="text-sm font-600 text-[#1B3A5C]">Students Needing Attention</div>
            <span className="text-xs bg-[#FEE2E2] text-[#EF4444] px-2 py-0.5 rounded-full font-600">
              {needsAttention.filter((n) => n.severity === "High").length} critical
            </span>
          </div>
          <div className="divide-y divide-gray-50">
            {needsAttention.map((item) => (
              <div key={item.name} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50/50 transition-colors">
                <div
                  className="w-2 h-8 rounded-full shrink-0"
                  style={{
                    background: item.severity === "High" ? "#EF4444" : item.severity === "Med" ? "#F59E0B" : "#10B981",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-600 text-[#1B3A5C]">{item.name}</div>
                  <div className="text-xs text-gray-400 truncate">{item.issue}</div>
                  <div className="text-xs text-gray-300">Mentor: {item.mentor}</div>
                </div>
                <span
                  className="text-xs font-600 px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: item.severity === "High" ? "#FEE2E2" : item.severity === "Med" ? "#FEF9C3" : "#DCFCE7",
                    color: item.severity === "High" ? "#EF4444" : item.severity === "Med" ? "#CA8A04" : "#10B981",
                  }}
                >
                  {item.severity}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-gray-100">
            <button onClick={() => navigate("/admin/people")} className="text-xs text-[#4F7FFF] hover:underline">
              View all in People →
            </button>
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-600 text-[#1B3A5C] mb-4">Recent Activity</div>
          <div className="space-y-4">
            {recentActivity.map((a) => (
              <div key={a.action} className="flex gap-3">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-600 shrink-0 mt-0.5"
                  style={{
                    background: a.who === "System"
                      ? "linear-gradient(135deg, #8B5CF6, #6D28D9)"
                      : `hsl(${a.who.charCodeAt(0) * 15}, 50%, 45%)`,
                  }}
                >
                  {a.who[0]}
                </div>
                <div>
                  <div className="text-sm text-gray-700">
                    <span className="font-600 text-[#1B3A5C]">{a.who}</span>{" "}
                    {a.action}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick upload */}
      <div
        className="rounded-2xl p-6 border-2 border-dashed border-[#4F7FFF]/30 hover:border-[#4F7FFF]/60 hover:bg-[#EEF3FF]/30 transition-all cursor-pointer text-center"
        onClick={() => navigate("/admin/uploads")}
      >
        <div className="text-3xl mb-2">📊</div>
        <div className="font-600 text-[#1B3A5C] text-sm">Upload a Roster or Attendance Sheet</div>
        <div className="text-gray-400 text-xs mt-1">CSV or XLSX · Click to go to Uploads →</div>
      </div>
    </div>
  );
}
