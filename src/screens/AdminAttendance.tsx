import { useState } from "react";

const students = [
  { name: "Jordan Lee", mentor: "Alex Rivera", major: "Comp. Eng", preMepo: 100, during: 75, postMepo: 0, overall: 79 },
  { name: "Maya Patel", mentor: "Alex Rivera", major: "Biology", preMepo: 100, during: 100, postMepo: 0, overall: 100 },
  { name: "Tyler Brooks", mentor: "Alex Rivera", major: "Business", preMepo: 50, during: 50, postMepo: 0, overall: 50 },
  { name: "Sofia Chen", mentor: "Alex Rivera", major: "Psychology", preMepo: 100, during: 100, postMepo: 0, overall: 100 },
  { name: "DeShawn Morris", mentor: "Alex Rivera", major: "Mech. Eng", preMepo: 0, during: 0, postMepo: 0, overall: 0 },
  { name: "Lena Kim", mentor: "Priya Nair", major: "Art History", preMepo: 100, during: 75, postMepo: 0, overall: 83 },
  { name: "Omar Jackson", mentor: "Carlos Vega", major: "Finance", preMepo: 100, during: 100, postMepo: 0, overall: 100 },
  { name: "Sasha Wang", mentor: "Jordan Hayes", major: "Statistics", preMepo: 50, during: 25, postMepo: 0, overall: 33 },
  { name: "Brendan Fox", mentor: "Priya Nair", major: "Nursing", preMepo: 100, during: 100, postMepo: 0, overall: 100 },
  { name: "Alicia Torres", mentor: "Marcus Webb", major: "Education", preMepo: 100, during: 75, postMepo: 0, overall: 83 },
];

function pctCell(pct: number) {
  const color = pct >= 90 ? "#10B981" : pct >= 60 ? "#F59E0B" : pct > 0 ? "#EF4444" : "#9CA3AF";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-16">
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="text-xs font-600 w-8 text-right" style={{ color }}>
        {pct > 0 ? `${pct}%` : "—"}
      </span>
    </div>
  );
}

export default function AdminAttendance() {
  const [search, setSearch] = useState("");
  const [phase, setPhase] = useState<"All" | "Pre-MEPO" | "During" | "Post-MEPO">("All");

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.mentor.toLowerCase().includes(search.toLowerCase())
  );

  const avgOverall = Math.round(students.reduce((a, s) => a + s.overall, 0) / students.length);

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-700 text-[#1B3A5C] text-xl">Attendance — Admin View</h2>
          <div className="text-gray-400 text-sm mt-0.5">{students.length} students · Fall 2026</div>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-sm font-600 text-white hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}>
          ⬇ Export
        </button>
      </div>

      {/* Phase summary */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Pre-MEPO Avg", value: "91%", target: "≥95%", on: true },
          { label: "During MEPO Avg", value: "78%", target: "≥90%", on: false },
          { label: "Post-MEPO Avg", value: "—", target: "≥80%", on: false },
          { label: "Overall Avg", value: `${avgOverall}%`, target: "≥90%", on: avgOverall >= 90 },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs text-gray-400 mb-1">{s.label}</div>
            <div className={`font-display font-700 text-2xl ${s.on ? "text-[#10B981]" : "text-[#F59E0B]"}`}>{s.value}</div>
            <div className="text-xs text-gray-300 mt-1">Target: {s.target}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or mentor..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] bg-white"
          />
        </div>
        <div className="flex bg-gray-50 rounded-xl p-1">
          {(["All", "Pre-MEPO", "During", "Post-MEPO"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPhase(p)}
              className="px-3 py-1.5 rounded-lg text-xs font-600 transition-all"
              style={{
                background: phase === p ? "white" : "transparent",
                color: phase === p ? "#1B3A5C" : "#9CA3AF",
                boxShadow: phase === p ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ background: "#F8F9FC" }} className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Student</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentor</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide w-32">Pre-MEPO</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide w-32">During</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide w-32">Post-MEPO</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide w-32">Overall</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={s.name} className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/20" : ""}`}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-600 shrink-0"
                      style={{ background: `hsl(${s.name.charCodeAt(0) * 12}, 45%, 45%)` }}>
                      {s.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-600 text-[#1B3A5C]">{s.name}</div>
                      <div className="text-xs text-gray-400">{s.major}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-500">{s.mentor}</td>
                <td className="px-4 py-3.5">{pctCell(s.preMepo)}</td>
                <td className="px-4 py-3.5">{pctCell(s.during)}</td>
                <td className="px-4 py-3.5">{pctCell(s.postMepo)}</td>
                <td className="px-4 py-3.5">{pctCell(s.overall)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-xs text-gray-400 text-right">Showing {filtered.length} of {students.length} students</div>
    </div>
  );
}
