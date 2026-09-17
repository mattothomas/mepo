import { useState } from "react";
import { useNavigate } from "react-router-dom";

const mentorCards = [
  {
    id: 1,
    name: "Alex Rivera",
    major: "Computer Science",
    year: "Junior",
    emoji: "🧑‍💻",
    tagline: "Code, coffee, and late-night study sessions.",
    interests: ["Hackathons", "Rock climbing", "Anime"],
    funFact: "Built an app used by 500+ PSU students",
    color: "#4F7FFF",
  },
  {
    id: 2,
    name: "Priya Nair",
    major: "Biomedical Engineering",
    year: "Senior",
    emoji: "🔬",
    tagline: "Science nerd by day, salsa dancer by night.",
    interests: ["Research", "Dance", "Cooking"],
    funFact: "Published in a peer-reviewed journal at 20",
    color: "#8B5CF6",
  },
  {
    id: 3,
    name: "Marcus Webb",
    major: "Communications",
    year: "Junior",
    emoji: "🎙️",
    tagline: "Your hype person for the next four years.",
    interests: ["Podcasting", "Football", "Volunteering"],
    funFact: "Hosts a Penn State sports podcast with 2K listeners",
    color: "#10B981",
  },
];

export default function MentorReveal() {
  const navigate = useNavigate();
  const [revealed, setRevealed] = useState(false);
  const [days] = useState(3);
  const [hours] = useState(14);
  const [mins] = useState(27);

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      {/* Hero banner */}
      <div
        className="rounded-3xl p-10 text-white text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1B3A5C 0%, #0F2238 70%, #2563EB 100%)" }}
      >
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 50% 0%, #4F7FFF 0%, transparent 60%), radial-gradient(circle at 20% 100%, #8B5CF6 0%, transparent 50%)"
        }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-600 mb-6"
            style={{ background: "rgba(79,127,255,0.2)", border: "1px solid rgba(79,127,255,0.3)" }}>
            ✦ MEPO Fall 2026 · Mentor Reveal
          </div>
          <h1 className="font-display font-800 text-5xl mb-3">Meet Your Mentor</h1>
          <p className="text-white/60 text-lg max-w-md mx-auto">
            Your match has been made. The reveal drops in…
          </p>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-6 mt-8 mb-8">
            {[
              { val: days, label: "Days" },
              { val: hours, label: "Hours" },
              { val: mins, label: "Minutes" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <div
                  className="font-display font-800 text-5xl w-24 h-20 flex items-center justify-center rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                  {String(val).padStart(2, "0")}
                </div>
                <div className="text-white/40 text-sm mt-2 uppercase tracking-widest text-xs">{label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setRevealed(!revealed)}
            className="px-10 py-4 rounded-2xl text-base font-700 text-[#1B3A5C] bg-white hover:opacity-90 transition-all active:scale-95"
          >
            {revealed ? "Hide Preview" : "✦ Preview Your Mentor (Demo)"}
          </button>
        </div>
      </div>

      {/* Mentor cards — revealed or blurred */}
      {revealed ? (
        <div>
          <div className="text-center mb-6">
            <div className="text-[#4F7FFF] text-sm font-600 uppercase tracking-widest mb-2">Your Match</div>
            <h2 className="font-display font-700 text-[#1B3A5C] text-3xl">🎉 Alex Rivera is your mentor!</h2>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
              You've been matched based on your major, interests, and goals. Say hi!
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {mentorCards.map((m, i) => (
              <div
                key={m.id}
                onClick={() => navigate(`/mentee/mentor/${m.id}`)}
                className={`bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition-all hover:-translate-y-1 relative overflow-hidden ${i !== 0 ? "opacity-40 grayscale" : "ring-2 ring-[#4F7FFF]/30"}`}
              >
                {i === 0 && (
                  <div className="absolute top-3 right-3 text-xs font-700 px-2.5 py-1 rounded-full text-white" style={{ background: "#4F7FFF" }}>
                    Your Mentor ✦
                  </div>
                )}
                <div className="flex flex-col items-center text-center gap-3">
                  <div
                    className="flex items-center justify-center rounded-3xl text-4xl"
                    style={{ width: 80, height: 80, background: `${m.color}15` }}
                  >
                    {m.emoji}
                  </div>
                  <div>
                    <div className="font-display font-700 text-[#1B3A5C] text-lg">{m.name}</div>
                    <div className="text-gray-400 text-sm">{m.major} · {m.year}</div>
                  </div>
                  <p className="text-gray-500 text-xs italic">"{m.tagline}"</p>
                  <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                    {m.interests.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${m.color}15`, color: m.color }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-gray-100 w-full text-xs text-gray-400 italic">
                    💡 {m.funFact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-6 text-gray-400 text-sm">
            Your mentor will be revealed in {days}d {hours}h {mins}m — check back soon!
          </div>
          <div className="grid grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-3xl bg-gray-100 animate-pulse" />
                  <div className="space-y-2 w-full">
                    <div className="h-4 bg-gray-100 rounded-lg animate-pulse" />
                    <div className="h-3 bg-gray-100 rounded-lg w-3/4 mx-auto animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note */}
      <div className="bg-[#EEF3FF] rounded-2xl p-5 flex gap-4 items-start">
        <div className="text-2xl">📬</div>
        <div>
          <div className="font-600 text-[#1B3A5C] text-sm mb-1">What happens next?</div>
          <div className="text-gray-500 text-sm leading-relaxed">
            Your mentor will reach out within the next 3 days to schedule an intro call. You'll receive a notification here and via your PSU email. You can also view their full profile and contact info after the reveal.
          </div>
        </div>
      </div>
    </div>
  );
}
