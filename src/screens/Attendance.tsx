import { useLocation } from "react-router-dom";

const events = [
  { phase: "Pre-MEPO", name: "Welcome Webinar", date: "Sept 2", status: "Attended", required: true },
  { phase: "Pre-MEPO", name: "Housing Q&A", date: "Sept 8", status: "Attended", required: true },
  { phase: "During MEPO", name: "Kickoff Keynote", date: "Sept 14", status: "Attended", required: true },
  { phase: "During MEPO", name: "Cohort Mixer", date: "Sept 14", status: "Missed", required: false },
  { phase: "During MEPO", name: "Career Pathways Panel", date: "Sept 15", status: "Attended", required: true },
  { phase: "During MEPO", name: "Campus Tour", date: "Sept 15", status: "Upcoming", required: true },
  { phase: "Post-MEPO", name: "Check-in Session 1", date: "Oct 3", status: "Upcoming", required: true },
  { phase: "Post-MEPO", name: "End-of-Semester Celebration", date: "Dec 10", status: "Upcoming", required: false },
];

const phases = ["Pre-MEPO", "During MEPO", "Post-MEPO"];

function statusChip(s: string) {
  const map: Record<string, [string, string]> = {
    Attended: ["#DCFCE7", "#10B981"],
    Missed: ["#FEE2E2", "#EF4444"],
    Upcoming: ["#EEF3FF", "#4F7FFF"],
  };
  const [bg, color] = map[s] ?? ["#F3F4F6", "#9CA3AF"];
  return (
    <span className="text-xs font-600 px-2.5 py-1 rounded-full" style={{ background: bg, color }}>
      {s}
    </span>
  );
}

export default function Attendance() {
  const location = useLocation();
  const isMentor = location.pathname.startsWith("/mentor");
  const name = isMentor ? "Alex Rivera" : "Jordan Lee";

  const attended = events.filter((e) => e.status === "Attended").length;
  const total = events.filter((e) => e.status !== "Upcoming").length;
  const pct = total > 0 ? Math.round((attended / total) * 100) : 0;

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h2 className="font-display font-700 text-[#1B3A5C] text-xl">Attendance</h2>
        <div className="text-gray-400 text-sm mt-0.5">{name} · Fall 2026</div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Overall", value: `${pct}%`, sub: `${attended}/${total} events`, color: "#4F7FFF" },
          { label: "Pre-MEPO", value: "100%", sub: "2 of 2 events", color: "#10B981" },
          { label: "During MEPO", value: "67%", sub: "2 of 3 events", color: "#F59E0B" },
          { label: "Post-MEPO", value: "—", sub: "Not started", color: "#9CA3AF" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs text-gray-400 mb-2">{s.label}</div>
            <div className="font-display font-700 text-2xl" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs text-gray-400 mt-1">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* By phase */}
      {phases.map((phase) => {
        const phaseEvents = events.filter((e) => e.phase === phase);
        const phaseAttended = phaseEvents.filter((e) => e.status === "Attended").length;
        const phaseTotal = phaseEvents.filter((e) => e.status !== "Upcoming").length;

        return (
          <div key={phase} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="text-sm font-600 text-[#1B3A5C]">{phase}</div>
              {phaseTotal > 0 && (
                <span className="text-xs text-gray-400">{phaseAttended}/{phaseTotal} attended</span>
              )}
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-50" style={{ background: "#F8F9FC" }}>
                  <th className="text-left px-5 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Event</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Required</th>
                  <th className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {phaseEvents.map((e) => (
                  <tr key={e.name} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/30 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-500 text-[#1B3A5C]">{e.name}</td>
                    <td className="px-4 py-3.5 text-sm text-gray-400">{e.date}</td>
                    <td className="px-4 py-3.5">
                      {e.required ? (
                        <span className="text-xs font-600 text-[#4F7FFF]">Required</span>
                      ) : (
                        <span className="text-xs text-gray-300">Optional</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5">{statusChip(e.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
