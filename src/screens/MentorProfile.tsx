import { useNavigate } from "react-router-dom";

export default function MentorProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-4xl space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 text-sm hover:text-gray-600 transition-colors">
        ← Back
      </button>

      <div className="grid grid-cols-3 gap-6">
        {/* Profile card */}
        <div className="col-span-1 space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col items-center text-center gap-4">
            <div
              className="flex items-center justify-center rounded-3xl text-5xl relative"
              style={{ width: 100, height: 100, background: "linear-gradient(135deg, #EEF3FF 0%, #DBEAFE 100%)" }}
            >
              🧑‍💻
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10B981] border-2 border-white" />
            </div>
            <div>
              <h2 className="font-display font-700 text-[#1B3A5C] text-2xl">Alex Rivera</h2>
              <div className="text-gray-400 text-sm mt-1">Computer Science · Junior</div>
              <div className="text-[#4F7FFF] text-xs mt-1 font-600">GPA 3.7 · Dean's List</div>
            </div>
            <div className="flex gap-2">
              {["Mentor", "CS Tutor", "Hackathon Lead"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#EEF3FF] text-[#4F7FFF] font-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
            <div className="text-xs font-600 text-gray-400 uppercase tracking-wide">Contact</div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-300">📧</span>
                <span className="text-gray-600">arivera@psu.edu</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-300">📱</span>
                <span className="text-gray-600">(814) 555-0192</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-300">📍</span>
                <span className="text-gray-600">Eastview Residence Hall</span>
              </div>
            </div>
            <button className="w-full py-2.5 mt-2 rounded-xl text-sm font-600 text-white transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #4F7FFF 0%, #2563EB 100%)" }}>
              Send Message →
            </button>
          </div>

          {/* Interests */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-3">Interests</div>
            <div className="flex flex-wrap gap-2">
              {["Hackathons", "Rock climbing", "Anime", "Open source", "Photography", "Coffee"].map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-2 space-y-5">
          {/* Bio */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-3">About Alex</div>
            <p className="text-gray-600 leading-relaxed text-sm">
              Hey! I'm Alex, a junior from Philadelphia studying Computer Science with a minor in Data Science. I joined MEPO because my mentor in freshman year genuinely changed my trajectory here — helping me find my first research lab and connecting me to people who became my closest friends.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm mt-3">
              I love building things — apps, communities, ideas. Outside class, you'll find me at the Hackathon Club or scrambling up a rock wall at the rec center. I'm here to help you navigate your first year, whether that's course advice, dorm tips, or just having someone to talk to.
            </p>
          </div>

          {/* Fun fact */}
          <div className="bg-[#EEF3FF] rounded-2xl p-5 flex gap-4">
            <div className="text-2xl">💡</div>
            <div>
              <div className="font-600 text-[#1B3A5C] text-sm mb-1">Fun Fact</div>
              <div className="text-gray-600 text-sm leading-relaxed">
                I built an academic planner app during my sophomore year that's now used by over 500 Penn State students. Still maintaining it — and it's open source!
              </div>
            </div>
          </div>

          {/* Academic + extras */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-3">Academics</div>
              <div className="space-y-2">
                {[
                  { label: "Major", value: "Computer Science" },
                  { label: "Minor", value: "Data Science" },
                  { label: "Year", value: "Junior (3rd Year)" },
                  { label: "College", value: "College of Engineering" },
                  { label: "Hometown", value: "Philadelphia, PA" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-gray-400">{r.label}</span>
                    <span className="text-[#1B3A5C] font-500">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-3">Involvement</div>
              <div className="space-y-2.5">
                {[
                  { name: "MEPO Mentor", role: "2nd Year" },
                  { name: "PSU Hackathon Club", role: "President" },
                  { name: "CS Department TA", role: "CMPSC 221" },
                  { name: "Nittany AI Society", role: "Member" },
                ].map((a) => (
                  <div key={a.name} className="text-sm">
                    <div className="font-500 text-[#1B3A5C]">{a.name}</div>
                    <div className="text-xs text-gray-400">{a.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentoring status */}
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-600 text-gray-400 uppercase tracking-wide mb-3">Mentoring Status</div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Mentees Assigned", value: "5" },
                { label: "Calls Completed", value: "3/5" },
                { label: "Avg Engagement", value: "High" },
              ].map((s) => (
                <div key={s.label} className="text-center p-3 rounded-xl bg-[#F4F6F9]">
                  <div className="font-display font-700 text-[#1B3A5C] text-xl">{s.value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
