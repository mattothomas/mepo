import { useState } from "react";

type Status = "Answered" | "No Answer" | "Voicemail" | "Pending" | "Escalated";

const rows: {
  mentee: string;
  major: string;
  mentor: string;
  att1: Status;
  att2: Status;
  att3: Status;
  overall: Status;
  flag: boolean;
}[] = [
  { mentee: "Jordan Lee", major: "Comp. Eng", mentor: "Alex Rivera", att1: "Answered", att2: "—" as Status, att3: "—" as Status, overall: "Answered", flag: false },
  { mentee: "Maya Patel", major: "Biology", mentor: "Alex Rivera", att1: "No Answer", att2: "No Answer", att3: "—" as Status, overall: "No Answer", flag: true },
  { mentee: "Tyler Brooks", major: "Business", mentor: "Alex Rivera", att1: "Voicemail", att2: "—" as Status, att3: "—" as Status, overall: "Voicemail", flag: false },
  { mentee: "Sofia Chen", major: "Psychology", mentor: "Alex Rivera", att1: "Answered", att2: "—" as Status, att3: "—" as Status, overall: "Answered", flag: false },
  { mentee: "DeShawn Morris", major: "Mech. Eng", mentor: "Alex Rivera", att1: "Pending", att2: "—" as Status, att3: "—" as Status, overall: "Pending", flag: false },
  { mentee: "Lena Kim", major: "Art History", mentor: "Priya Nair", att1: "No Answer", att2: "No Answer", att3: "No Answer", overall: "Escalated", flag: true },
  { mentee: "Omar Jackson", major: "Finance", mentor: "Carlos Vega", att1: "Voicemail", att2: "Answered", att3: "—" as Status, overall: "Answered", flag: false },
  { mentee: "Sasha Wang", major: "Statistics", mentor: "Jordan Hayes", att1: "Pending", att2: "—" as Status, att3: "—" as Status, overall: "Pending", flag: false },
  { mentee: "Brendan Fox", major: "Nursing", mentor: "Priya Nair", att1: "Answered", att2: "—" as Status, att3: "—" as Status, overall: "Answered", flag: false },
  { mentee: "Alicia Torres", major: "Education", mentor: "Marcus Webb", att1: "No Answer", att2: "Voicemail", att3: "Answered", overall: "Answered", flag: false },
];

function statusChip(s: Status | "—") {
  const map: Record<string, [string, string]> = {
    Answered: ["#DCFCE7", "#10B981"],
    "No Answer": ["#FEE2E2", "#EF4444"],
    Voicemail: ["#FEF9C3", "#CA8A04"],
    Pending: ["#F3F4F6", "#9CA3AF"],
    Escalated: ["#EDE9FE", "#7C3AED"],
    "—": ["transparent", "#D1D5DB"],
  };
  const [bg, color] = map[s] ?? ["#F3F4F6", "#9CA3AF"];
  return (
    <span className="text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: bg, color }}>
      {s}
    </span>
  );
}

export default function AdminCalls() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  const statuses = ["All", "Answered", "No Answer", "Voicemail", "Pending", "Escalated"];

  const filtered = rows.filter((r) => {
    const matchSearch =
      r.mentee.toLowerCase().includes(search.toLowerCase()) ||
      r.mentor.toLowerCase().includes(search.toLowerCase()) ||
      r.major.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || r.overall === filterStatus;
    return matchSearch && matchStatus;
  });

  const summary = {
    Answered: rows.filter((r) => r.overall === "Answered").length,
    "No Answer": rows.filter((r) => r.overall === "No Answer").length,
    Voicemail: rows.filter((r) => r.overall === "Voicemail").length,
    Pending: rows.filter((r) => r.overall === "Pending").length,
    Escalated: rows.filter((r) => r.overall === "Escalated").length,
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-700 text-[#1B3A5C] text-xl">Calls — Admin View</h2>
          <div className="text-gray-400 text-sm mt-0.5">{rows.length} total records · Fall 2026</div>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-sm font-600 text-white hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}>
          ⬇ Export CSV
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex gap-3 flex-wrap">
        {Object.entries(summary).map(([s, count]) => (
          <div
            key={s}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-sm cursor-pointer hover:shadow-md transition-all"
            onClick={() => setFilterStatus(s === filterStatus ? "All" : s)}
            style={{ outline: filterStatus === s ? "2px solid #4F7FFF" : "none" }}
          >
            {statusChip(s as Status)}
            <span className="font-display font-700 text-[#1B3A5C] text-sm">{count}</span>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by mentee, mentor, or major..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all bg-white"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] bg-white text-gray-600"
        >
          {statuses.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr style={{ background: "#F8F9FC" }} className="border-b border-gray-100">
              <th className="text-left px-5 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentee</th>
              <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentor</th>
              <th className="text-center px-3 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Att. 1</th>
              <th className="text-center px-3 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Att. 2</th>
              <th className="text-center px-3 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Att. 3</th>
              <th className="text-center px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Overall</th>
              <th className="text-center px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Flag</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, i) => (
              <tr
                key={r.mentee}
                className={`border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors ${i % 2 !== 0 ? "bg-gray-50/30" : ""}`}
              >
                <td className="px-5 py-3.5">
                  <div className="text-sm font-600 text-[#1B3A5C]">{r.mentee}</div>
                  <div className="text-xs text-gray-400">{r.major}</div>
                </td>
                <td className="px-4 py-3.5 text-sm text-gray-500">{r.mentor}</td>
                <td className="px-3 py-3.5 text-center">{statusChip(r.att1)}</td>
                <td className="px-3 py-3.5 text-center">{statusChip(r.att2)}</td>
                <td className="px-3 py-3.5 text-center">{statusChip(r.att3)}</td>
                <td className="px-4 py-3.5 text-center">{statusChip(r.overall)}</td>
                <td className="px-4 py-3.5 text-center">
                  {r.flag ? (
                    <span className="text-[#EF4444] text-sm">⚠</span>
                  ) : (
                    <span className="text-gray-200">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400 text-sm">No results match your search.</div>
        )}
      </div>

      <div className="text-xs text-gray-400 text-right">Showing {filtered.length} of {rows.length} records</div>
    </div>
  );
}
