import { useState } from "react";

type AttemptStatus = "Answered" | "No Answer" | "Voicemail" | "—";

const mentees = [
  {
    name: "Jordan Lee",
    major: "Computer Engineering",
    phone: "(484) 555-0123",
    attempt1: "Answered" as AttemptStatus,
    attempt2: "—" as AttemptStatus,
    attempt3: "—" as AttemptStatus,
    notes: "Confirmed attendance, very excited. Will attend Day 1 + 2.",
    followUp: false,
    status: "Complete",
  },
  {
    name: "Maya Patel",
    major: "Biology",
    phone: "(717) 555-0198",
    attempt1: "No Answer" as AttemptStatus,
    attempt2: "No Answer" as AttemptStatus,
    attempt3: "—" as AttemptStatus,
    notes: "Tried cell and home number. No callback received yet.",
    followUp: true,
    status: "In Progress",
  },
  {
    name: "Tyler Brooks",
    major: "Business",
    phone: "(610) 555-0441",
    attempt1: "Voicemail" as AttemptStatus,
    attempt2: "—" as AttemptStatus,
    attempt3: "—" as AttemptStatus,
    notes: "Left detailed voicemail. Awaiting return call.",
    followUp: true,
    status: "In Progress",
  },
  {
    name: "Sofia Chen",
    major: "Psychology",
    phone: "(215) 555-0307",
    attempt1: "Answered" as AttemptStatus,
    attempt2: "—" as AttemptStatus,
    attempt3: "—" as AttemptStatus,
    notes: "Spoke for 15 min. She has roommate concerns, referred to RA.",
    followUp: false,
    status: "Complete",
  },
  {
    name: "DeShawn Morris",
    major: "Mechanical Engineering",
    phone: "(570) 555-0882",
    attempt1: "—" as AttemptStatus,
    attempt2: "—" as AttemptStatus,
    attempt3: "—" as AttemptStatus,
    notes: "",
    followUp: false,
    status: "Pending",
  },
];

function attemptCell(status: AttemptStatus) {
  const map: Record<AttemptStatus, [string, string, string]> = {
    Answered: ["#DCFCE7", "#10B981", "✓"],
    "No Answer": ["#FEE2E2", "#EF4444", "✗"],
    Voicemail: ["#FEF9C3", "#CA8A04", "VM"],
    "—": ["#F3F4F6", "#D1D5DB", "—"],
  };
  const [bg, color, label] = map[status];
  return (
    <span
      className="inline-flex items-center justify-center text-xs font-700 rounded-lg px-2.5 py-1"
      style={{ background: bg, color }}
    >
      {label}
    </span>
  );
}

export default function Calls() {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-700 text-[#1B3A5C] text-xl">My Call Log</h2>
          <div className="text-gray-400 text-sm mt-0.5">3 of 5 mentees reached · Deadline Sept 10</div>
        </div>
        <div className="flex gap-3">
          <div className="flex gap-2">
            {[
              { label: "Complete", color: "#10B981", bg: "#DCFCE7" },
              { label: "In Progress", color: "#F59E0B", bg: "#FEF9C3" },
              { label: "Pending", color: "#9CA3AF", bg: "#F3F4F6" },
            ].map((l) => (
              <span key={l.label} className="text-xs px-2.5 py-1 rounded-full font-600" style={{ background: l.bg, color: l.color }}>
                {l.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-600 text-[#1B3A5C]">Overall Progress</div>
          <div className="text-sm font-600 text-[#4F7FFF]">3/5 Complete</div>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full">
          <div className="h-full rounded-full bg-[#4F7FFF]" style={{ width: "60%" }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>2 mentees still need a call</span>
          <span>Deadline: Sept 10, 2026</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ background: "#F8F9FC" }} className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentee</th>
              <th className="text-center px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Call 1</th>
              <th className="text-center px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Call 2</th>
              <th className="text-center px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Call 3</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Status</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Follow-up</th>
              <th className="px-4 py-3.5" />
            </tr>
          </thead>
          <tbody>
            {mentees.map((m) => (
              <>
                <tr
                  key={m.name}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => setExpandedRow(expandedRow === m.name ? null : m.name)}
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center rounded-full text-white text-xs font-700 shrink-0"
                        style={{ width: 34, height: 34, background: `hsl(${m.name.charCodeAt(0) * 10}, 50%, 45%)` }}
                      >
                        {m.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-600 text-[#1B3A5C]">{m.name}</div>
                        <div className="text-xs text-gray-400">{m.major}</div>
                        <div className="text-xs text-gray-300 font-mono">{m.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">{attemptCell(m.attempt1)}</td>
                  <td className="px-4 py-4 text-center">{attemptCell(m.attempt2)}</td>
                  <td className="px-4 py-4 text-center">{attemptCell(m.attempt3)}</td>
                  <td className="px-4 py-4">
                    <span
                      className="text-xs font-600 px-2.5 py-1 rounded-full"
                      style={{
                        background: m.status === "Complete" ? "#DCFCE7" : m.status === "In Progress" ? "#FEF9C3" : "#F3F4F6",
                        color: m.status === "Complete" ? "#10B981" : m.status === "In Progress" ? "#CA8A04" : "#9CA3AF",
                      }}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {m.followUp ? (
                      <span className="text-xs font-600 px-2 py-1 rounded-full bg-[#FEE2E2] text-[#EF4444]">⚠ Needed</span>
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right text-gray-400 text-xs">
                    {expandedRow === m.name ? "▲" : "▼"}
                  </td>
                </tr>
                {expandedRow === m.name && (
                  <tr className="bg-[#F8F9FC]">
                    <td colSpan={7} className="px-5 py-4">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-2">Notes</div>
                          <div className="text-sm text-gray-600">
                            {m.notes || <span className="italic text-gray-300">No notes yet</span>}
                          </div>
                        </div>
                        <div className="flex gap-3 items-start">
                          <button className="px-4 py-2 rounded-lg text-xs font-600 text-[#4F7FFF] border border-[#4F7FFF]/30 hover:bg-[#EEF3FF] transition-all">
                            ✏ Edit Notes
                          </button>
                          <button className="px-4 py-2 rounded-lg text-xs font-600 text-white transition-all hover:opacity-90"
                            style={{ background: "#4F7FFF" }}>
                            + Log Call
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tips */}
      <div className="bg-[#EEF3FF] rounded-2xl p-5">
        <div className="text-sm font-600 text-[#1B3A5C] mb-3">Call Guidelines</div>
        <div className="grid grid-cols-3 gap-4 text-xs text-gray-600">
          <div className="flex gap-2">
            <span className="text-[#4F7FFF]">1.</span>
            Make 3 attempts across different times of day (morning, afternoon, evening).
          </div>
          <div className="flex gap-2">
            <span className="text-[#4F7FFF]">2.</span>
            Leave a voicemail on each missed call — introduce yourself and explain MEPO.
          </div>
          <div className="flex gap-2">
            <span className="text-[#4F7FFF]">3.</span>
            Flag follow-ups if a mentee has a concern that needs admin attention.
          </div>
        </div>
      </div>
    </div>
  );
}
