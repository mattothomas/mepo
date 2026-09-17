import { useState } from "react";
import { useNavigate } from "react-router-dom";

type PersonType = "mentee" | "mentor";

const mentors = [
  { id: 1, name: "Alex Rivera", major: "Computer Science", year: "Junior", mentees: 5, calls: "3/5", engagement: "High", email: "arivera@psu.edu" },
  { id: 2, name: "Priya Nair", major: "Biomedical Engineering", year: "Senior", mentees: 5, calls: "4/5", engagement: "High", email: "pnair@psu.edu" },
  { id: 3, name: "Marcus Webb", major: "Communications", year: "Junior", mentees: 4, calls: "4/4", engagement: "High", email: "mwebb@psu.edu" },
  { id: 4, name: "Carlos Vega", major: "Finance", year: "Senior", mentees: 5, calls: "2/5", engagement: "Med", email: "cvega@psu.edu" },
  { id: 5, name: "Jordan Hayes", major: "Education", year: "Junior", mentees: 5, calls: "1/5", engagement: "Low", email: "jhayes@psu.edu" },
];

const mentees = [
  { id: 1, name: "Jordan Lee", major: "Computer Engineering", year: "Freshman", mentor: "Alex Rivera", attendance: 79, status: "Active" },
  { id: 2, name: "Maya Patel", major: "Biology", year: "Freshman", mentor: "Alex Rivera", attendance: 100, status: "Active" },
  { id: 3, name: "Tyler Brooks", major: "Business", year: "Freshman", mentor: "Alex Rivera", attendance: 50, status: "At Risk" },
  { id: 4, name: "Sofia Chen", major: "Psychology", year: "Freshman", mentor: "Alex Rivera", attendance: 100, status: "Active" },
  { id: 5, name: "DeShawn Morris", major: "Mechanical Engineering", year: "Freshman", mentor: "Alex Rivera", attendance: 0, status: "No Contact" },
  { id: 6, name: "Lena Kim", major: "Art History", year: "Freshman", mentor: "Priya Nair", attendance: 83, status: "Active" },
  { id: 7, name: "Omar Jackson", major: "Finance", year: "Freshman", mentor: "Carlos Vega", attendance: 100, status: "Active" },
];

function engBadge(e: string) {
  const colors: Record<string, [string, string]> = {
    High: ["#DCFCE7", "#10B981"],
    Med: ["#FEF9C3", "#CA8A04"],
    Low: ["#FEE2E2", "#EF4444"],
  };
  const [bg, color] = colors[e] ?? ["#F3F4F6", "#9CA3AF"];
  return <span className="text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: bg, color }}>{e}</span>;
}

function statusBadge(s: string) {
  const colors: Record<string, [string, string]> = {
    Active: ["#DCFCE7", "#10B981"],
    "At Risk": ["#FEF9C3", "#CA8A04"],
    "No Contact": ["#FEE2E2", "#EF4444"],
  };
  const [bg, color] = colors[s] ?? ["#F3F4F6", "#9CA3AF"];
  return <span className="text-xs font-600 px-2 py-0.5 rounded-full" style={{ background: bg, color }}>{s}</span>;
}

export default function People() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<PersonType>("mentee");
  const [search, setSearch] = useState("");
  const [preview, setPreview] = useState<number | null>(1);

  const filteredMentors = mentors.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.major.toLowerCase().includes(search.toLowerCase())
  );
  const filteredMentees = mentees.filter(
    (m) => m.name.toLowerCase().includes(search.toLowerCase()) || m.major.toLowerCase().includes(search.toLowerCase())
  );

  const selectedMentee = mentees.find((m) => m.id === preview);
  const selectedMentor = mentors.find((m) => m.id === preview);

  return (
    <div className="p-6 space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-700 text-[#1B3A5C] text-xl">People</h2>
          <div className="text-gray-400 text-sm mt-0.5">
            {mentees.length} mentees · {mentors.length} mentors · Fall 2026
          </div>
        </div>
        <button className="px-4 py-2.5 rounded-xl text-sm font-600 text-white hover:opacity-90 transition-all"
          style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}>
          ⬇ Export
        </button>
      </div>

      {/* Tabs + Search */}
      <div className="flex gap-4 items-center">
        <div className="flex bg-gray-100 rounded-xl p-1">
          {(["mentee", "mentor"] as PersonType[]).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPreview(t === "mentee" ? 1 : 1); }}
              className="px-5 py-2 rounded-lg text-sm font-600 capitalize transition-all"
              style={{
                background: tab === t ? "white" : "transparent",
                color: tab === t ? "#1B3A5C" : "#9CA3AF",
                boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t === "mentee" ? `Mentees (${mentees.length})` : `Mentors (${mentors.length})`}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${tab}s by name or major...`}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Table */}
        <div className="col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          {tab === "mentee" ? (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F8F9FC" }} className="border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Student</th>
                  <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentor</th>
                  <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Attendance</th>
                  <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentees.map((m, i) => (
                  <tr
                    key={m.id}
                    onClick={() => setPreview(m.id)}
                    className={`border-b border-gray-50 last:border-0 cursor-pointer transition-all ${preview === m.id ? "bg-[#EEF3FF]" : i % 2 !== 0 ? "bg-gray-50/20 hover:bg-gray-50" : "hover:bg-gray-50/50"}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700 shrink-0"
                          style={{ background: `hsl(${m.name.charCodeAt(0) * 12}, 45%, 45%)` }}>
                          {m.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-600 text-[#1B3A5C]">{m.name}</div>
                          <div className="text-xs text-gray-400">{m.major}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500">{m.mentor}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 bg-gray-100 rounded-full">
                          <div className="h-full rounded-full"
                            style={{ width: `${m.attendance}%`, background: m.attendance >= 80 ? "#10B981" : m.attendance >= 50 ? "#F59E0B" : "#EF4444" }} />
                        </div>
                        <span className="text-xs font-600 text-gray-500">{m.attendance > 0 ? `${m.attendance}%` : "—"}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">{statusBadge(m.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F8F9FC" }} className="border-b border-gray-100">
                  <th className="text-left px-5 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentor</th>
                  <th className="text-center px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Mentees</th>
                  <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Calls</th>
                  <th className="text-left px-4 py-3.5 text-xs font-600 text-gray-400 uppercase tracking-wide">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentors.map((m, i) => (
                  <tr
                    key={m.id}
                    onClick={() => setPreview(m.id)}
                    className={`border-b border-gray-50 last:border-0 cursor-pointer transition-all ${preview === m.id ? "bg-[#EEF3FF]" : i % 2 !== 0 ? "bg-gray-50/20 hover:bg-gray-50" : "hover:bg-gray-50/50"}`}
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-700 shrink-0"
                          style={{ background: `hsl(${m.name.charCodeAt(0) * 12}, 45%, 45%)` }}>
                          {m.name[0]}
                        </div>
                        <div>
                          <div className="text-sm font-600 text-[#1B3A5C]">{m.name}</div>
                          <div className="text-xs text-gray-400">{m.major} · {m.year}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-center text-sm font-600 text-[#1B3A5C]">{m.mentees}</td>
                    <td className="px-4 py-3.5 text-sm font-600 text-[#4F7FFF]">{m.calls}</td>
                    <td className="px-4 py-3.5">{engBadge(m.engagement)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Profile preview */}
        <div className="col-span-1">
          {tab === "mentee" && selectedMentee && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5 sticky top-0">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-700"
                  style={{ background: `hsl(${selectedMentee.name.charCodeAt(0) * 12}, 45%, 45%)` }}>
                  {selectedMentee.name[0]}
                </div>
                <div>
                  <div className="font-display font-700 text-[#1B3A5C] text-lg">{selectedMentee.name}</div>
                  <div className="text-gray-400 text-sm">{selectedMentee.major}</div>
                </div>
                {statusBadge(selectedMentee.status)}
              </div>
              <div className="space-y-3">
                {[
                  { label: "Year", value: selectedMentee.year },
                  { label: "Mentor", value: selectedMentee.mentor },
                  { label: "Attendance", value: `${selectedMentee.attendance}%` },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{r.label}</span>
                    <span className="text-[#1B3A5C] font-500">{r.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate(`/mentee/mentor/1`)}
                className="w-full py-2.5 rounded-xl text-sm font-600 text-[#4F7FFF] border border-[#4F7FFF]/20 hover:bg-[#EEF3FF] transition-all"
              >
                View Full Profile →
              </button>
            </div>
          )}
          {tab === "mentor" && selectedMentor && (
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5 sticky top-0">
              <div className="flex flex-col items-center text-center gap-3">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-700"
                  style={{ background: `hsl(${selectedMentor.name.charCodeAt(0) * 12}, 45%, 45%)` }}>
                  {selectedMentor.name[0]}
                </div>
                <div>
                  <div className="font-display font-700 text-[#1B3A5C] text-lg">{selectedMentor.name}</div>
                  <div className="text-gray-400 text-sm">{selectedMentor.major} · {selectedMentor.year}</div>
                </div>
                {engBadge(selectedMentor.engagement)}
              </div>
              <div className="space-y-3">
                {[
                  { label: "Mentees", value: String(selectedMentor.mentees) },
                  { label: "Calls Progress", value: selectedMentor.calls },
                  { label: "Email", value: selectedMentor.email },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{r.label}</span>
                    <span className="text-[#1B3A5C] font-500 truncate ml-2">{r.value}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate(`/mentee/mentor/1`)}
                className="w-full py-2.5 rounded-xl text-sm font-600 text-[#4F7FFF] border border-[#4F7FFF]/20 hover:bg-[#EEF3FF] transition-all"
              >
                View Full Profile →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
