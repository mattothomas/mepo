import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Settings() {
  const location = useLocation();
  const role = location.pathname.startsWith("/admin") ? "admin" : location.pathname.startsWith("/mentor") ? "mentor" : "mentee";

  const [firstName, setFirstName] = useState(role === "admin" ? "Sarah" : role === "mentor" ? "Alex" : "Jordan");
  const [lastName, setLastName] = useState(role === "admin" ? "Kim" : role === "mentor" ? "Rivera" : "Lee");
  const [email] = useState(role === "admin" ? "skim@psu.edu" : role === "mentor" ? "arivera@psu.edu" : "jl1234@psu.edu");
  const [phone, setPhone] = useState(role === "mentor" ? "(814) 555-0192" : "(610) 555-0123");
  const [bio, setBio] = useState(role === "mentor" ? "Junior CS major and MEPO mentor. Love hackathons, rock climbing, and helping freshmen thrive." : "");
  const [saved, setSaved] = useState(false);

  const [notif, setNotif] = useState({
    callReminders: true,
    attendanceAlerts: true,
    announcements: true,
    weeklyDigest: false,
    emailNotifs: true,
  });

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h2 className="font-display font-700 text-[#1B3A5C] text-xl">Settings</h2>
        <div className="text-gray-400 text-sm mt-0.5">Manage your profile and preferences</div>
      </div>

      {/* Profile photo */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="text-sm font-600 text-[#1B3A5C] mb-5">Profile Photo</div>
        <div className="flex items-center gap-6">
          <div
            className="flex items-center justify-center rounded-3xl text-white text-3xl font-700 shrink-0"
            style={{
              width: 80,
              height: 80,
              background: "linear-gradient(135deg, #4F7FFF 0%, #1B3A5C 100%)",
            }}
          >
            {firstName[0]}{lastName[0]}
          </div>
          <div>
            <div className="text-sm text-gray-600 mb-3">
              Upload a photo to personalize your profile. JPG, PNG, or GIF — max 5 MB.
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 rounded-xl text-sm font-600 text-white hover:opacity-90 transition-all"
                style={{ background: "#4F7FFF" }}>
                Upload Photo
              </button>
              <button className="px-4 py-2 rounded-xl text-sm font-600 text-gray-400 border border-gray-200 hover:bg-gray-50 transition-all">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
        <div className="text-sm font-600 text-[#1B3A5C]">Personal Information</div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">First Name</label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">Last Name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">PSU Email</label>
            <input
              value={email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
            />
            <div className="text-xs text-gray-300 mt-1">Email is managed by Penn State SSO</div>
          </div>
          <div>
            <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">Phone</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all"
            />
          </div>
        </div>

        {role === "mentor" && (
          <div>
            <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">
              Bio <span className="normal-case font-400">(visible to mentees)</span>
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] focus:ring-2 focus:ring-[#4F7FFF]/10 transition-all resize-none"
              placeholder="Tell your mentees a bit about yourself..."
            />
          </div>
        )}

        {role !== "mentee" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">Major</label>
              <input
                defaultValue={role === "mentor" ? "Computer Science" : ""}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">
                {role === "mentor" ? "Year" : "Title"}
              </label>
              <input
                defaultValue={role === "mentor" ? "Junior" : "Program Coordinator"}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] transition-all"
              />
            </div>
          </div>
        )}

        {role === "mentor" && (
          <div>
            <label className="block text-xs font-600 text-gray-400 uppercase tracking-wide mb-1.5">Fun Fact</label>
            <input
              defaultValue="Built an app used by 500+ PSU students"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#4F7FFF] transition-all"
            />
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="text-sm font-600 text-[#1B3A5C]">Notifications</div>
        <div className="space-y-3">
          {[
            { key: "callReminders" as const, label: "Call Reminders", desc: "Get reminded about scheduled and upcoming mentee calls" },
            { key: "attendanceAlerts" as const, label: "Attendance Alerts", desc: "Notifications when attendance is recorded or missing" },
            { key: "announcements" as const, label: "Announcements", desc: "Program updates, events, and news from MEPO admin" },
            { key: "weeklyDigest" as const, label: "Weekly Digest", desc: "A summary of your mentees' progress each Sunday" },
            { key: "emailNotifs" as const, label: "Email Notifications", desc: "Also send notifications to your PSU email inbox" },
          ].map((n) => (
            <div key={n.key} className="flex items-center justify-between py-2">
              <div>
                <div className="text-sm font-500 text-[#1B3A5C]">{n.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{n.desc}</div>
              </div>
              <button
                onClick={() => setNotif({ ...notif, [n.key]: !notif[n.key] })}
                className="shrink-0 w-11 h-6 rounded-full relative transition-colors"
                style={{ background: notif[n.key] ? "#4F7FFF" : "#E5E7EB" }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all"
                  style={{ left: notif[n.key] ? "calc(100% - 22px)" : "2px" }}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <div className="text-sm font-600 text-[#1B3A5C]">Account</div>
        <div className="flex items-center justify-between py-2 border-b border-gray-100">
          <div>
            <div className="text-sm font-500 text-gray-600">Password</div>
            <div className="text-xs text-gray-400">Managed via Penn State SSO</div>
          </div>
          <button className="text-sm text-[#4F7FFF] hover:underline">Change via PSU →</button>
        </div>
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="text-sm font-500 text-gray-600">Sign Out</div>
            <div className="text-xs text-gray-400">End your current session</div>
          </div>
          <button className="px-4 py-2 rounded-lg text-xs font-600 text-[#EF4444] border border-[#EF4444]/20 hover:bg-[#FEE2E2] transition-all">
            Sign Out
          </button>
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center justify-between">
        {saved && (
          <span className="text-sm text-[#10B981] font-600 flex items-center gap-2">
            ✓ Changes saved successfully
          </span>
        )}
        <div className="ml-auto flex gap-3">
          <button className="px-5 py-2.5 rounded-xl text-sm font-600 text-gray-400 border border-gray-200 hover:bg-gray-50 transition-all">
            Discard
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-sm font-700 text-white hover:opacity-90 transition-all"
            style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
