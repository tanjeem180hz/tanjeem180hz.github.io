import React, { useEffect, useRef, useState } from "react";

// ── Scene Data ─────────────────────────────────────────────────────────────────
interface SceneData {
  id: number;
  clock: string;
  head: string;
  accentHead: string;
  sub: string;
}

const SCENES: SceneData[] = [
  { id: 1,  clock: "9:42 PM",  head: "Sleep on time. ",        accentHead: "Wake up on time.",      sub: "A student Android project that builds a real bedtime routine — scheduling, app blocking, and a smart alarm you can't sleep through." },
  { id: 2,  clock: "9:45 PM",  head: "A routine built ",       accentHead: "around you",             sub: "First launch walks through a short setup: sleep time, distracting apps, and how you want to wake up." },
  { id: 3,  clock: "10:15 PM", head: "One dashboard, ",        accentHead: "every setting",          sub: "Sleep time, wake time, blocked apps and reminders — all visible at a glance." },
  { id: 4,  clock: "10:16 PM", head: "Set your ",              accentHead: "sleep window",           sub: "Pick sleep and wake times, then choose which days the routine repeats." },
  { id: 5,  clock: "10:20 PM", head: "Choose what to ",        accentHead: "block",                  sub: "Social, video and games can be restricted automatically once sleep mode begins." },
  { id: 6,  clock: "10:30 PM", head: "A nudge ",               accentHead: "before bed",             sub: "A bedtime reminder arrives 30 minutes ahead, so wind-down isn't a surprise." },
  { id: 7,  clock: "11:00 PM", head: "Sleep mode ",            accentHead: "takes over",             sub: "At 11:00 PM, selected apps lock automatically — no manual step required." },
  { id: 8,  clock: "11:05 PM", head: "Can't uninstall ",       accentHead: "your way out",           sub: "Dead Sleep protects itself from being removed during scheduled sleep hours." },
  { id: 9,  clock: "11:10 PM", head: "Blocked apps ",          accentHead: "stay blocked",           sub: "Opening a restricted app shows the active sleep window instead." },
  { id: 10, clock: "7:00 AM",  head: "An alarm you'll actually ", accentHead: "hear",               sub: "Customizable sound, volume and snooze — built to be hard to ignore." },
  { id: 11, clock: "7:00 AM",  head: "Solve it to ",           accentHead: "silence it",             sub: "A quick math, memory or reaction challenge replaces the ordinary stop button." },
  { id: 12, clock: "7:02 AM",  head: "Built with ",            accentHead: "Java + OOP",             sub: "A student Android project, with statistics, more challenges and smarter routines on the way." },
];

// ── Phone Scenes with Professional Pop-up Animations ───────────────────────────
function Scene1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3.5 h-full">
      <div className="w-18 h-18 rounded-3xl bg-gradient-to-br from-[#212A4E] to-[#1A2140] border border-white/10 flex items-center justify-center shadow-[0_0_24px_rgba(140,124,251,0.2)] animate-pop-up" style={{ animationDelay: "0.08s" }}>
        <svg className="w-9 h-9" viewBox="0 0 24 24" fill="none">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="url(#mg1)"/>
          <defs>
            <linearGradient id="mg1" x1="0" y1="0" x2="24" y2="24">
              <stop stopColor="#8C7CFB"/>
              <stop offset="1" stopColor="#5B8CFF"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="animate-pop-up" style={{ animationDelay: "0.18s" }}>
        <div className="font-['Space_Grotesk'] text-[21px] font-bold tracking-wider text-white">DEAD SLEEP</div>
        <div className="text-[#8D93B8] text-[11.5px] mt-0.5">Sleep on time. Wake up on time.</div>
      </div>

      <button
        onClick={onNext}
        className="mt-1 inline-flex items-center justify-center bg-gradient-to-r from-[#8C7CFB] to-[#5B8CFF] hover:from-[#9D8FFA] hover:to-[#6E9BFF] text-white font-bold text-[11.5px] rounded-xl px-6 py-2.5 shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer animate-pop-up"
        style={{ animationDelay: "0.28s" }}
      >
        Get Started
      </button>
    </div>
  );
}

function Scene2() {
  return (
    <div className="flex flex-col gap-2.5 h-full text-left">
      <div className="flex items-center justify-between mb-0.5 animate-pop-up" style={{ animationDelay: "0.05s" }}>
        <span className="text-[12px] font-bold text-white">Quick setup</span>
        <span className="inline-flex items-center gap-1.5 bg-[#212A4E] rounded-full px-2.5 py-0.5 text-[10px] text-[#8D93B8] font-medium">2 / 6</span>
      </div>

      {[
        { q: "What time do you usually sleep?", opts: ["10 PM", "11 PM", "12 AM"], picked: [1] },
        { q: "Which apps distract you?", opts: ["Social", "Video", "Games"], picked: [0, 2] },
        { q: "Want a smart wake-up challenge?", opts: ["Yes, math puzzle"], picked: [0] },
      ].map((item, gi) => (
        <div
          key={gi}
          className="bg-[#1A2140] border border-white/10 rounded-xl p-2.5 animate-pop-up"
          style={{ animationDelay: `${0.12 + gi * 0.1}s` }}
        >
          <div className="text-[11px] text-[#8D93B8] mb-1.5 font-medium">{item.q}</div>
          <div className="flex gap-1.5">
            {item.opts.map((o, oi) => {
              const active = item.picked.includes(oi);
              return (
                <div
                  key={oi}
                  className={`flex-1 text-center py-1.5 px-1 rounded-lg text-[10.5px] font-semibold transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#8C7CFB]/30 to-[#5B8CFF]/30 text-white border border-[#8C7CFB] shadow-sm"
                      : "bg-[#212A4E] text-[#8D93B8] border border-white/5"
                  }`}
                >
                  {o}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function Scene3() {
  return (
    <div className="flex flex-col gap-2.5 h-full text-left">
      <div className="text-[11.5px] text-[#8D93B8] font-medium animate-pop-up" style={{ animationDelay: "0.05s" }}>Tonight's routine</div>
      
      <div className="flex justify-between gap-2 animate-pop-up" style={{ animationDelay: "0.12s" }}>
        {[
          { val: "11:00", unit: "PM", lab: "Sleep" },
          { val: "7:00",  unit: "AM", lab: "Wake" }
        ].map((s, i) => (
          <div key={i} className="flex-1 bg-[#1A2140] border border-white/10 rounded-xl py-2.5 px-3 text-center">
            <div className="font-['Space_Grotesk'] text-[21px] font-bold text-white leading-tight">
              {s.val}<span className="text-[11px] text-violet-300 ml-0.5">{s.unit}</span>
            </div>
            <div className="text-[10px] text-[#8D93B8] mt-0.5">{s.lab}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A2140] border border-white/10 rounded-xl p-3 flex flex-col gap-2 animate-pop-up" style={{ animationDelay: "0.22s" }}>
        {[
          ["Sleep mode", "Scheduled", "#F4C77B"],
          ["Next reminder", "10:30 PM", "#F2F3FC"],
          ["Blocked apps", "3 selected", "#F2F3FC"]
        ].map(([k, v, c], i) => (
          <div key={i} className="flex justify-between items-center text-[11.5px]">
            <span className="text-[#8D93B8]">{k}</span>
            <span className="font-bold" style={{ color: c }}>{v}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto animate-pop-up" style={{ animationDelay: "0.3s" }}>
        {["Edit Schedule", "Blocked Apps"].map((t, i) => (
          <div key={i} className="flex-1 text-center bg-[#212A4E] border border-white/10 rounded-lg py-2 text-[11px] font-bold text-[#F2F3FC]">
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function Scene4() {
  return (
    <div className="flex flex-col gap-2.5 h-full text-left">
      <div className="text-[12px] font-bold text-white animate-pop-up" style={{ animationDelay: "0.05s" }}>Sleep schedule</div>
      
      <div className="flex gap-2 animate-pop-up" style={{ animationDelay: "0.12s" }}>
        {[
          { lab: "SLEEP", val: "11:00 PM" },
          { lab: "WAKE", val: "7:00 AM" }
        ].map((t, i) => (
          <div key={i} className="flex-1 bg-[#1A2140] border border-white/10 rounded-xl py-2.5 px-3 text-center">
            <div className="text-[9.5px] text-[#8D93B8] tracking-wider font-semibold">{t.lab}</div>
            <div className="font-['Space_Grotesk'] text-[17px] font-bold text-white mt-1">{t.val}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A2140] border border-white/10 rounded-xl p-3 animate-pop-up" style={{ animationDelay: "0.22s" }}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11.5px] text-white">Repeat weekly</span>
          <span className="bg-[#8C7CFB] text-white rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm">On</span>
        </div>
        <div className="flex justify-between">
          {["S", "S", "M", "T", "W", "T", "F"].map((d, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold animate-pop-up ${
                i !== 6
                  ? "bg-gradient-to-r from-[#8C7CFB] to-[#5B8CFF] text-white shadow-sm"
                  : "bg-[#212A4E] text-[#8D93B8]"
              }`}
              style={{ animationDelay: `${0.26 + i * 0.04}s` }}
            >
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene5() {
  const apps = [
    { name: "Social Media", bg: "from-[#8C7CFB] to-[#5B8CFF]", checked: true },
    { name: "Video", bg: "from-[#F4C77B] to-[#e0a94f]", checked: true },
    { name: "Games", bg: "from-[#5B8CFF] to-[#8C7CFB]", checked: true },
    { name: "Browser", bg: "#212A4E", checked: false },
  ];

  return (
    <div className="flex flex-col gap-2 h-full text-left">
      <div className="flex justify-between items-center mb-0.5 animate-pop-up" style={{ animationDelay: "0.05s" }}>
        <span className="text-[12px] font-bold text-white">Select apps to block</span>
        <span className="bg-[#212A4E] text-[#8D93B8] rounded-full px-2.5 py-0.5 text-[10px] font-semibold">3 selected</span>
      </div>

      {apps.map((a, i) => (
        <div
          key={i}
          className="bg-[#1A2140] border border-white/10 rounded-xl p-2 flex items-center gap-2.5 animate-pop-up"
          style={{ animationDelay: `${0.1 + i * 0.08}s` }}
        >
          <div className={`w-7 h-7 rounded-lg ${a.bg.startsWith("from") ? `bg-gradient-to-r ${a.bg}` : "bg-[#212A4E]"} shrink-0 shadow-sm`} />
          <span className="flex-1 text-[12px] text-slate-200 font-medium">{a.name}</span>
          <div className={`w-4 h-4 rounded flex items-center justify-center text-[10px] font-bold ${
            a.checked ? "bg-[#8C7CFB] text-white shadow-sm" : "border border-[#5A6088]"
          }`}>
            {a.checked && "✓"}
          </div>
        </div>
      ))}

      <div className="bg-[#1A2140] border border-white/10 rounded-xl p-2.5 text-[10.5px] text-[#8D93B8] mt-auto animate-pop-up" style={{ animationDelay: "0.42s" }}>
        Apps will be restricted during sleep time.
      </div>
    </div>
  );
}

function Scene6() {
  return (
    <div className="flex flex-col justify-center h-full text-left">
      <div className="bg-[#1A2140] border border-white/10 rounded-2xl p-3.5 flex gap-3 shadow-2xl animate-pop-down">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-[#F4C77B] to-[#e0a94f] shrink-0 flex items-center justify-center text-base shadow-md">
          🌙
        </div>
        <div>
          <div className="text-[12px] font-bold text-white flex items-center gap-1.5">
            Bedtime Reminder
            <span className="text-[9px] bg-amber-400/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded">30m</span>
          </div>
          <div className="text-[11px] text-[#8D93B8] mt-1 leading-relaxed">
            Your sleep time starts in 30 minutes.<br/>Time to finish your screen time.
          </div>
        </div>
      </div>
    </div>
  );
}

function Scene7() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full">
      <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/50 flex items-center justify-center shadow-lg shadow-violet-500/20 animate-pop-badge">
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="#8C7CFB"/>
        </svg>
      </div>

      <div className="animate-pop-up" style={{ animationDelay: "0.15s" }}>
        <div className="font-['Space_Grotesk'] text-[15px] font-bold tracking-wider text-white">SLEEP MODE ACTIVE</div>
        <div className="text-[11px] text-[#8D93B8] mt-0.5">Selected apps are now restricted</div>
      </div>

      <div className="flex gap-2.5 mt-1">
        {[
          "from-[#8C7CFB] to-[#5B8CFF]",
          "from-[#F4C77B] to-[#e0a94f]",
          "from-[#5B8CFF] to-[#8C7CFB]",
        ].map((bg, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-xl bg-gradient-to-r ${bg} relative flex items-center justify-center text-sm shadow-md animate-pop-up`}
            style={{ animationDelay: `${0.22 + i * 0.08}s` }}
          >
            <div className="absolute inset-0 bg-[#0A0C1A]/70 rounded-xl flex items-center justify-center text-xs">
              🔒
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#8C7CFB]/15 border border-[#8C7CFB]/30 rounded-xl px-4 py-1.5 text-[11px] text-[#8C7CFB] font-bold animate-pop-up" style={{ animationDelay: "0.45s" }}>
        11:00 PM – 7:00 AM
      </div>
    </div>
  );
}

function Scene8() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3.5 h-full">
      <div className="flex items-center gap-2 text-[#8D93B8] text-[12.5px] animate-pop-up" style={{ animationDelay: "0.08s" }}>
        <span>🗑️</span><span>Uninstall Dead Sleep</span>
      </div>

      <div className="bg-rose-500/15 border border-rose-500/40 text-[#FF7A85] px-4 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 shadow-sm animate-pop-badge" style={{ animationDelay: "0.18s" }}>
        🔒 Sleep Protection Active
      </div>

      <div className="text-[11.5px] text-[#8D93B8] max-w-[200px] leading-relaxed animate-pop-up" style={{ animationDelay: "0.28s" }}>
        Dead Sleep can't be deleted during scheduled sleep time.
      </div>
    </div>
  );
}

function Scene9() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full">
      <div className="w-14 h-14 rounded-full bg-[#212A4E] border border-white/10 flex items-center justify-center text-2xl shadow-inner animate-pop-badge">
        🔒
      </div>

      <div className="animate-pop-up" style={{ animationDelay: "0.15s" }}>
        <div className="font-['Space_Grotesk'] text-[16px] font-bold text-white">App Locked</div>
        <div className="text-[11.5px] text-[#8D93B8] mt-0.5">Sleep time is active.</div>
      </div>

      <div className="font-['Space_Grotesk'] text-[13.5px] text-[#8D93B8] bg-[#212A4E] border border-white/10 rounded-full px-4 py-1.5 animate-pop-up" style={{ animationDelay: "0.25s" }}>
        11:00 PM — 7:00 AM
      </div>
    </div>
  );
}

function Scene10() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2.5 h-full">
      <div className="text-[11px] text-[#8D93B8] tracking-widest font-semibold uppercase animate-pop-up" style={{ animationDelay: "0.05s" }}>GOOD MORNING</div>
      <div className="font-['Space_Grotesk'] text-[46px] font-extrabold text-white leading-none my-1 animate-pop-badge" style={{ animationDelay: "0.12s" }}>7:00</div>

      <div className="flex items-end gap-1 h-7 my-1 animate-pop-up" style={{ animationDelay: "0.2s" }}>
        {[10, 22, 14, 28, 12, 20, 9].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-[#F4C77B] to-[#8C7CFB] rounded-full"
            style={{
              height: `${h}px`,
              animation: `wave 0.9s ${i * 0.08}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center mt-2 animate-pop-up" style={{ animationDelay: "0.3s" }}>
        {["Sound: Chime", "Volume: High", "Snooze: Off"].map((t, i) => (
          <span key={i} className="bg-[#212A4E] text-[#8D93B8] rounded-full px-2.5 py-0.5 text-[10px] font-medium border border-white/5">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Scene11() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full">
      <div className="text-[11.5px] text-[#8D93B8] font-medium animate-pop-up" style={{ animationDelay: "0.08s" }}>Solve to stop the alarm</div>
      <div className="font-['Space_Grotesk'] text-[28px] font-bold text-white tracking-wide animate-pop-up" style={{ animationDelay: "0.16s" }}>17 × 8 = ?</div>
      
      <div className="w-18 h-10 rounded-xl bg-[#212A4E] border border-white/10 flex items-center justify-center font-['Space_Grotesk'] text-[17px] font-bold text-white shadow-md animate-pop-badge" style={{ animationDelay: "0.28s" }}>
        136
      </div>

      <div className="text-[12px] font-bold text-[#F4C77B] flex items-center gap-1.5 animate-pop-badge" style={{ animationDelay: "0.4s" }}>
        <span>✓</span> Challenge Completed — Alarm Stopped
      </div>
    </div>
  );
}

function Scene12() {
  return (
    <div className="flex flex-col gap-2.5 h-full text-left">
      <div className="text-center text-[12.5px] font-bold text-white mb-0.5 animate-pop-up" style={{ animationDelay: "0.05s" }}>Coming soon</div>
      
      <div className="grid grid-cols-2 gap-2">
        {[
          ["📊", "Sleep statistics"],
          ["📈", "Weekly progress"],
          ["🧩", "More challenges"],
          ["✨", "Smarter routines"]
        ].map(([ic, lab], i) => (
          <div
            key={i}
            className="bg-[#1A2140] border border-white/10 rounded-xl p-2.5 flex flex-col gap-1 shadow-sm animate-pop-up"
            style={{ animationDelay: `${0.12 + i * 0.08}s` }}
          >
            <span className="text-base">{ic}</span>
            <span className="text-[11px] text-[#8D93B8] font-medium">{lab}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 justify-center mt-auto animate-pop-up" style={{ animationDelay: "0.45s" }}>
        {["Java", "Android", "OOP"].map((t, i) => (
          <span key={i} className="text-[10px] text-[#8D93B8] border border-white/10 rounded-full px-2.5 py-0.5 bg-[#1A2140]">
            {t}
          </span>
        ))}
      </div>
      <div className="text-center text-[11px] text-[#5A6088] font-medium animate-pop-up" style={{ animationDelay: "0.52s" }}>Student Team Project</div>
    </div>
  );
}

// ── Phone Frame Component ──────────────────────────────────────────────────────
function Phone({ sceneIdx, onNext }: { sceneIdx: number; onNext: () => void }) {
  const sceneList = [
    <Scene1 onNext={onNext} />,
    <Scene2 />,
    <Scene3 />,
    <Scene4 />,
    <Scene5 />,
    <Scene6 />,
    <Scene7 />,
    <Scene8 />,
    <Scene9 />,
    <Scene10 />,
    <Scene11 />,
    <Scene12 />,
  ];

  return (
    <div className="relative shrink-0 filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]">
      <div className="w-[284px] h-[580px] bg-gradient-to-b from-[#161C38] to-[#0D1128] rounded-[42px] p-3 border border-white/10 relative">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[20px] bg-[#0A0E1F] rounded-xl z-20" />

        {/* Screen */}
        <div className="w-full h-full bg-gradient-to-b from-[#111731] to-[#0B0F26] rounded-[32px] overflow-hidden relative flex flex-col">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-5 pt-4 pb-1 text-[12px] font-semibold text-[#F2F3FC] z-10 select-none">
            <span>{SCENES[sceneIdx].clock}</span>
            <span className="text-[10px] text-[#8D93B8] tracking-widest">●●● LTE ▮▮▮</span>
          </div>

          {/* Scene Content (Key triggers re-mount for crisp pop-up animation on each step) */}
          <div key={sceneIdx} className="relative flex-1 p-4 overflow-hidden">
            {sceneList[sceneIdx]}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Background Particles ───────────────────────────────────────────────────────
function Particles() {
  const items = Array.from({ length: 16 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map(i => {
        const size = 3 + (i * 7 % 5);
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              background: "radial-gradient(circle, rgba(140,124,251,0.55), transparent 70%)",
              filter: "blur(1px)",
              left: `${(i * 17 + 5) % 100}vw`,
              top: `${(i * 13 + 7) % 100}vh`,
              animation: `drift ${10 + (i % 10)}s ${(i * 0.7) % 6}s ease-in-out infinite alternate`
            }}
          />
        );
      })}
    </div>
  );
}

// ── Main App Component (Clean, Simple, Professional) ───────────────────────────
export default function App() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSceneIdx(p => (p + 1) % SCENES.length);
    }, 2800);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleDotClick = (idx: number) => {
    setSceneIdx(idx);
    resetTimer();
  };

  const handleNext = () => {
    setSceneIdx(p => (p + 1) % SCENES.length);
    resetTimer();
  };

  const scene = SCENES[sceneIdx];

  return (
    <div className="min-h-screen bg-[#0A0E1F] text-[#F2F3FC] font-['Plus_Jakarta_Sans',system-ui,sans-serif] flex items-center justify-center p-6 relative overflow-hidden select-none">
      <style>{`
        /* Smooth Pop-up Animations */
        @keyframes popUp {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(14px);
          }
          65% {
            opacity: 1;
            transform: scale(1.03) translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes popBadge {
          0% {
            opacity: 0;
            transform: scale(0.65);
          }
          60% {
            opacity: 1;
            transform: scale(1.12);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes popDown {
          0% {
            opacity: 0;
            transform: translateY(-28px) scale(0.92);
          }
          65% {
            opacity: 1;
            transform: translateY(3px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes drift {
          0% { transform: translateY(0) translateX(0); opacity: 0.35; }
          100% { transform: translateY(-22px) translateX(10px); opacity: 0.75; }
        }

        @keyframes wave {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1.1); }
        }

        .animate-pop-up {
          animation: popUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-pop-badge {
          animation: popBadge 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }

        .animate-pop-down {
          animation: popDown 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        html, body {
          height: 100%;
          margin: 0;
          background: #0A0E1F;
        }
      `}</style>

      {/* Ambient background glows */}
      <div className="absolute top-[15%] left-[15%] w-[420px] h-[420px] rounded-full bg-[#8C7CFB]/15 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[15%] w-[420px] h-[420px] rounded-full bg-[#5B8CFF]/12 blur-[110px] pointer-events-none" />

      <Particles />

      {/* ── Main Stage (Simple, Clean, Focused) ── */}
      <div className="relative z-10 w-full max-w-[1050px] flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-20">
        
        {/* Left: Sidecopy info */}
        <div className="w-full max-w-[320px] flex flex-col gap-4 text-left">
          {/* Brandmark */}
          <div className="flex items-center gap-2.5 text-[#8D93B8] text-[13px] tracking-wide">
            <div className="w-2 h-2 rounded-full bg-[#F4C77B] shadow-[0_0_10px_#F4C77B]" />
            DEAD SLEEP · Android Demo
          </div>

          {/* Headline (re-mounts with crisp pop-up animation on change) */}
          <div key={`h-${sceneIdx}`} className="font-['Space_Grotesk'] text-3xl sm:text-[32px] font-bold leading-tight tracking-tight text-white animate-pop-up">
            {scene.head}<span className="text-[#8C7CFB]">{scene.accentHead}</span>
          </div>

          {/* Subline */}
          <div key={`s-${sceneIdx}`} className="text-[#8D93B8] text-[14.5px] leading-relaxed min-h-[70px] animate-pop-up" style={{ animationDelay: "0.08s" }}>
            {scene.sub}
          </div>

          {/* Scene Dots */}
          <div className="flex flex-wrap gap-1.5 max-w-[300px] my-1">
            {SCENES.map((_, i) => (
              <div
                key={i}
                onClick={() => handleDotClick(i)}
                style={{
                  width: i === sceneIdx ? "32px" : "20px",
                  background: i === sceneIdx ? "linear-gradient(90deg, #8C7CFB, #5B8CFF)" : "#212A4E",
                }}
                className="h-1 rounded-full cursor-pointer transition-all duration-400 hover:opacity-80"
              />
            ))}
          </div>

          {/* Tech Pills */}
          <div className="flex gap-2 mt-2">
            {["Java", "Android SDK", "OOP"].map(t => (
              <span key={t} className="text-[11px] text-[#5A6088] border border-white/10 px-2.5 py-1 rounded-full tracking-wide">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Phone Simulator */}
        <Phone sceneIdx={sceneIdx} onNext={handleNext} />

      </div>
    </div>
  );
}
