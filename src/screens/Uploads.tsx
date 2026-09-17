import { useState } from "react";

const recentUploads = [
  { name: "fall2026_mentee_roster.csv", uploaded: "Sept 4, 2026 · 10:22 AM", by: "Dr. Sarah Kim", rows: 2417, status: "Success", errors: 0 },
  { name: "mentor_assignments_v2.xlsx", uploaded: "Sept 3, 2026 · 3:44 PM", by: "Dr. Sarah Kim", rows: 381, status: "Success", errors: 0 },
  { name: "attendance_premepo.csv", uploaded: "Sept 2, 2026 · 8:11 AM", by: "Priya Nair", rows: 2200, status: "Warning", errors: 14 },
  { name: "fall2026_mentee_roster_v1.csv", uploaded: "Aug 28, 2026 · 2:00 PM", by: "Dr. Sarah Kim", rows: 2390, status: "Error", errors: 42 },
];

const validationErrors = [
  { row: 14, field: "Email", value: "jlee@gmail.com", message: "Must be a valid PSU email (@psu.edu)" },
  { row: 27, field: "Major", value: "", message: "Major is required" },
  { row: 31, field: "Mentor ID", value: "MTR-999", message: "Mentor ID not found in system" },
  { row: 88, field: "Phone", value: "5555555", message: "Invalid phone number format" },
];

const previewRows = [
  { psuId: "jl1234", name: "Jordan Lee", major: "Computer Engineering", email: "jl1234@psu.edu", mentor: "MTR-001", cohort: "Engineering A" },
  { psuId: "mp5678", name: "Maya Patel", major: "Biology", email: "mp5678@psu.edu", mentor: "MTR-001", cohort: "Science B" },
  { psuId: "tb9012", name: "Tyler Brooks", major: "Business", email: "tb9012@psu.edu", mentor: "MTR-001", cohort: "Business C" },
  { psuId: "sc3456", name: "Sofia Chen", major: "Psychology", email: "sc3456@psu.edu", mentor: "MTR-001", cohort: "Liberal Arts A" },
];

export default function Uploads() {
  const [dragging, setDragging] = useState(false);
  const [uploadState, setUploadState] = useState<"idle" | "preview" | "done">("idle");

  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div>
        <h2 className="font-display font-700 text-[#1B3A5C] text-xl">Uploads</h2>
        <div className="text-gray-400 text-sm mt-0.5">Import rosters, assignments, and attendance data</div>
      </div>

      {/* Upload type selector */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { type: "Mentee Roster", icon: "👥", desc: "CSV/XLSX with PSU ID, name, major, cohort" },
          { type: "Mentor Assignments", icon: "🔗", desc: "Map mentor IDs to mentee PSU IDs" },
          { type: "Attendance Sheet", icon: "◎", desc: "Event attendance by student ID and phase" },
        ].map((t) => (
          <button
            key={t.type}
            className="p-5 rounded-2xl bg-white shadow-sm border-2 hover:border-[#4F7FFF]/40 hover:shadow-md transition-all text-left"
            style={{ borderColor: t.type === "Mentee Roster" ? "#4F7FFF" : "transparent" }}
          >
            <div className="text-2xl mb-2">{t.icon}</div>
            <div className="font-600 text-[#1B3A5C] text-sm">{t.type}</div>
            <div className="text-xs text-gray-400 mt-1">{t.desc}</div>
          </button>
        ))}
      </div>

      {/* Drop zone */}
      <div
        className="rounded-2xl border-2 border-dashed transition-all cursor-pointer p-10 text-center"
        style={{
          borderColor: dragging ? "#4F7FFF" : "#D1D5DB",
          background: dragging ? "#EEF3FF" : "#FAFAFA",
        }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); setUploadState("preview"); }}
        onClick={() => uploadState === "idle" && setUploadState("preview")}
      >
        <div className="text-4xl mb-3">📂</div>
        <div className="font-display font-700 text-[#1B3A5C] text-lg mb-1">
          {dragging ? "Drop to upload" : "Drag & drop your file here"}
        </div>
        <div className="text-gray-400 text-sm mb-4">Supports CSV and XLSX · Max 10 MB</div>
        <button className="px-5 py-2.5 rounded-xl text-sm font-600 text-white transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}>
          Browse Files
        </button>
      </div>

      {/* Preview table */}
      {uploadState === "preview" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div>
              <div className="text-sm font-600 text-[#1B3A5C]">Preview — fall2026_mentee_roster.csv</div>
              <div className="text-xs text-gray-400 mt-0.5">Showing 4 of 2,417 rows · 4 validation issues found</div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setUploadState("idle")}
                className="px-4 py-2 rounded-xl text-xs font-600 text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setUploadState("done")}
                className="px-4 py-2 rounded-xl text-xs font-600 text-white hover:opacity-90 transition-all"
                style={{ background: "#4F7FFF" }}
              >
                Confirm Import →
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F8F9FC" }} className="border-b border-gray-100">
                  {["PSU ID", "Name", "Major", "Email", "Mentor ID", "Cohort"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-600 text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.map((r, i) => (
                  <tr key={r.psuId} className={`border-b border-gray-50 text-sm ${i % 2 !== 0 ? "bg-gray-50/20" : ""}`}>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{r.psuId}</td>
                    <td className="px-4 py-3 text-[#1B3A5C] font-500">{r.name}</td>
                    <td className="px-4 py-3 text-gray-500">{r.major}</td>
                    <td className="px-4 py-3 text-gray-500">{r.email}</td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">{r.mentor}</td>
                    <td className="px-4 py-3 text-gray-500">{r.cohort}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Validation errors */}
          <div className="border-t border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#F59E0B] text-sm">⚠</span>
              <div className="text-sm font-600 text-[#1B3A5C]">Validation Issues ({validationErrors.length})</div>
              <div className="text-xs text-gray-400">These rows will be skipped unless corrected</div>
            </div>
            <div className="space-y-2">
              {validationErrors.map((e) => (
                <div key={e.row} className="flex items-start gap-3 text-xs p-3 rounded-xl bg-[#FEF9C3]">
                  <span className="font-mono text-gray-400 shrink-0">Row {e.row}</span>
                  <span className="font-600 text-[#CA8A04] shrink-0">{e.field}</span>
                  <span className="text-gray-500 flex-1">{e.message}</span>
                  {e.value && <span className="font-mono text-gray-400 shrink-0">"{e.value}"</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success banner */}
      {uploadState === "done" && (
        <div className="p-5 rounded-2xl bg-[#DCFCE7] border border-[#10B981]/20 flex items-center gap-4">
          <span className="text-2xl">✅</span>
          <div>
            <div className="font-600 text-[#059669] text-sm">Import successful — 2,413 records added</div>
            <div className="text-xs text-[#059669]/70 mt-0.5">4 rows skipped due to validation errors</div>
          </div>
          <button onClick={() => setUploadState("idle")} className="ml-auto text-xs text-[#059669] hover:underline">
            Upload another →
          </button>
        </div>
      )}

      {/* Recent uploads */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="text-sm font-600 text-[#1B3A5C]">Recent Uploads</div>
        </div>
        <div className="divide-y divide-gray-50">
          {recentUploads.map((u) => (
            <div key={u.name} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="text-xl">📄</div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-600 text-[#1B3A5C] truncate">{u.name}</div>
                <div className="text-xs text-gray-400">{u.uploaded} · {u.by} · {u.rows.toLocaleString()} rows</div>
              </div>
              <div className="flex items-center gap-3">
                {u.errors > 0 && (
                  <span className="text-xs text-[#F59E0B] font-600">{u.errors} issues</span>
                )}
                <span
                  className="text-xs font-600 px-2.5 py-1 rounded-full"
                  style={{
                    background: u.status === "Success" ? "#DCFCE7" : u.status === "Warning" ? "#FEF9C3" : "#FEE2E2",
                    color: u.status === "Success" ? "#10B981" : u.status === "Warning" ? "#CA8A04" : "#EF4444",
                  }}
                >
                  {u.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
