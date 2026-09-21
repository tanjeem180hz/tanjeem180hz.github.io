import React, { useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Scene {
  id: number;
  tag: string;
  clock: string;
  head: string;
  accentHead: string;
  sub: string;
  icon: string;
}

// ── Sound Synthesizer (Native Web Audio API, 100% Offline) ─────────────────────
class SoundFX {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.15, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } catch {}
  }

  playAlarmChime() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [659.25, 880, 659.25, 987.77].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.1, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.3);
      });
    } catch {}
  }
}

const sfx = new SoundFX();

// ── Scene Data ─────────────────────────────────────────────────────────────────
const SCENES: Scene[] = [
  { id: 1,  tag: "Welcome",    icon: "🌙", clock: "9:42 PM",  head: "Sleep on time. ",        accentHead: "Wake up on time.",      sub: "A student Android project that builds a real bedtime routine — scheduling, app blocking, and a smart alarm you can't sleep through." },
  { id: 2,  tag: "Onboarding", icon: "✨", clock: "9:45 PM",  head: "A routine built ",       accentHead: "around you",             sub: "First launch walks through a fast 3-step configuration: sleep target, distracting apps, and wake challenge." },
  { id: 3,  tag: "Dashboard",  icon: "📊", clock: "10:15 PM", head: "One dashboard, ",        accentHead: "every setting",          sub: "Sleep window, wake time, locked apps, and upcoming notifications — visible at a single glance." },
  { id: 4,  tag: "Schedule",   icon: "🕒", clock: "10:16 PM", head: "Set your personal ",     accentHead: "sleep window",           sub: "Choose your target bedtime and wake hour, then configure which days of the week the cycle repeats." },
  { id: 5,  tag: "App Lock",   icon: "🚫", clock: "10:20 PM", head: "Choose what to ",        accentHead: "block",                  sub: "Social media, endless video feeds, and games lock down automatically once sleep mode begins." },
  { id: 6,  tag: "Nudge",      icon: "🔔", clock: "10:30 PM", head: "A gentle nudge ",        accentHead: "before bed",             sub: "A polite reminder arrives 30 minutes ahead of sleep time so wind-down never catches you off guard." },
  { id: 7,  tag: "Sleep Mode", icon: "🔒", clock: "11:00 PM", head: "Sleep mode ",            accentHead: "takes over",             sub: "At 11:00 PM, selected apps lock automatically — zero manual intervention or willpower required." },
  { id: 8,  tag: "Anti-Delete",icon: "🛡️", clock: "11:05 PM", head: "Can't uninstall ",       accentHead: "your way out",           sub: "Dead Sleep self-protects itself from being deleted or uninstalled during scheduled sleep hours." },
  { id: 9,  tag: "Restricted", icon: "⛔", clock: "11:10 PM", head: "Blocked apps ",          accentHead: "stay blocked",           sub: "Opening a restricted app intercepts the launch and displays the active bedtime countdown instead." },
  { id: 10, tag: "Smart Alarm",icon: "⏰", clock: "7:00 AM",  head: "An alarm you'll actually ", accentHead: "hear",               sub: "Engineered audio ramp with custom chimes, volume overrides, and disabled snooze to get you out of bed." },
  { id: 11, tag: "Challenge",  icon: "🧩", clock: "7:00 AM",  head: "Solve it to ",           accentHead: "silence it",             sub: "An interactive math puzzle or memory challenge replaces the ordinary stop button to wake your brain up." },
  { id: 12, tag: "Overview",   icon: "🚀", clock: "7:02 AM",  head: "Engineered with ",       accentHead: "Java + OOP",             sub: "A clean Object-Oriented Architecture with statistics, smarter routines, and custom challenges." },
];

// ── Phone Scenes ───────────────────────────────────────────────────────────────
function Scene1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 h-full animate-fade-in">
      <div className="relative group">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#212A4E] to-[#1A2140] border border-white/10 flex items-center justify-center shadow-xl shadow-violet-500/10 transition-transform duration-500 group-hover:scale-105">
          <div className="absolute inset-0 rounded-3xl bg-violet-500/20 blur-xl animate-pulse" />
          <svg className="w-10 h-10 relative z-10" viewBox="0 0 24 24" fill="none">
            <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="url(#p-glow)" />
            <defs>
              <linearGradient id="p-glow" x1="0" y1="0" x2="24" y2="24">
                <stop stopColor="#8C7CFB" />
                <stop offset="1" stopColor="#5B8CFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div>
        <div className="font-['Space_Grotesk'] text-2xl font-bold tracking-wider text-white">DEAD SLEEP</div>
        <div className="text-xs text-slate-400 mt-1">Sleep on time. Wake up on time.</div>
      </div>
      <button
        onClick={() => { sfx.playClick(); onNext(); }}
        className="mt-2 inline-flex items-center gap-2 bg-gradient-to-r from-[#8C7CFB] to-[#5B8CFF] hover:from-[#9D8FFA] hover:to-[#6E9BFF] text-white font-bold text-xs rounded-xl px-6 py-2.5 shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span>Get Started</span>
        <span>→</span>
      </button>
    </div>
  );
}

function Scene2() {
  const [answers, setAnswers] = useState<Record<number, number>>({ 0: 1, 1: 0, 2: 0 });
  const questions = [
    { q: "What time do you usually sleep?", opts: ["10 PM", "11 PM", "12 AM"] },
    { q: "Distracting apps to restrict?", opts: ["Social", "Video", "Games"] },
    { q: "Wake-up challenge type?", opts: ["Math Puzzle", "Pattern"] },
  ];

  const toggle = (qIdx: number, optIdx: number) => {
    sfx.playClick();
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  return (
    <div className="flex flex-col gap-2.5 h-full animate-fade-in text-left">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-white">Quick Setup</span>
        <span className="inline-flex items-center gap-1.5 bg-[#212A4E] rounded-full px-2.5 py-0.5 text-[10px] text-slate-400 font-medium">Step 2 / 3</span>
      </div>
      {questions.map((item, qIdx) => (
        <div key={qIdx} className="bg-[#1A2140] border border-white/10 rounded-xl p-2.5 transition-colors hover:border-violet-500/30">
          <div className="text-[11px] text-slate-400 mb-2 font-medium">{item.q}</div>
          <div className="flex gap-1.5">
            {item.opts.map((opt, optIdx) => {
              const active = answers[qIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => toggle(qIdx, optIdx)}
                  className={`flex-1 text-center py-1.5 px-1 rounded-lg text-[10.5px] font-semibold transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-gradient-to-r from-violet-600/30 to-blue-600/30 text-white border border-violet-400 shadow-sm"
                      : "bg-[#212A4E] text-slate-400 border border-white/5 hover:text-slate-200"
                  }`}
                >
                  {opt}
                </button>
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
    <div className="flex flex-col gap-2.5 h-full animate-fade-in text-left">
      <div className="text-[11px] text-slate-400 font-medium">Tonight's Routine Status</div>
      <div className="flex gap-2">
        {[
          { val: "11:00", unit: "PM", lab: "Bedtime Target", color: "text-amber-300" },
          { val: "07:00", unit: "AM", lab: "Wake Target", color: "text-blue-300" }
        ].map((s, i) => (
          <div key={i} className="flex-1 bg-[#1A2140] border border-white/10 rounded-xl p-2.5 text-center transition-all hover:border-white/20">
            <div className="font-['Space_Grotesk'] text-xl font-bold text-white">
              {s.val}<span className={`text-[10px] ml-1 font-semibold ${s.color}`}>{s.unit}</span>
            </div>
            <div className="text-[9.5px] text-slate-400 mt-0.5">{s.lab}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#1A2140] border border-white/10 rounded-xl p-3 flex flex-col gap-2">
        {[
          ["Sleep Mode", "Active Scheduled", "text-amber-400", "🌙"],
          ["Bedtime Alert", "10:30 PM (30m)", "text-slate-200", "🔔"],
          ["Blocked Apps", "3 Apps Selected", "text-violet-300", "🔒"],
        ].map(([k, v, c, ic], i) => (
          <div key={i} className="flex justify-between items-center text-[11px]">
            <span className="text-slate-400 flex items-center gap-1.5"><span>{ic}</span>{k}</span>
            <span className={`font-semibold ${c}`}>{v}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-auto">
        {["Edit Window", "App Rules"].map((btn, i) => (
          <button
            key={i}
            onClick={() => sfx.playClick()}
            className="flex-1 text-center bg-[#212A4E] hover:bg-[#2A3562] border border-white/10 rounded-lg py-2 text-[10.5px] font-semibold text-slate-200 transition-all cursor-pointer"
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

function Scene4() {
  const [days, setDays] = useState([true, true, true, true, true, true, false]);
  const toggleDay = (idx: number) => {
    sfx.playClick();
    setDays(d => d.map((v, i) => (i === idx ? !v : v)));
  };

  return (
    <div className="flex flex-col gap-2.5 h-full animate-fade-in text-left">
      <div className="text-xs font-bold text-white">Sleep Schedule & Days</div>
      <div className="flex gap-2">
        <div className="flex-1 bg-[#1A2140] border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Sleep Time</div>
          <div className="font-['Space_Grotesk'] text-base font-bold text-white mt-0.5">11:00 PM</div>
        </div>
        <div className="flex-1 bg-[#1A2140] border border-white/10 rounded-xl p-2.5 text-center">
          <div className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold">Wake Time</div>
          <div className="font-['Space_Grotesk'] text-base font-bold text-white mt-0.5">07:00 AM</div>
        </div>
      </div>

      <div className="bg-[#1A2140] border border-white/10 rounded-xl p-3">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11.5px] text-white font-medium">Recurring Weekly</span>
          <span className="bg-violet-600/40 text-violet-300 border border-violet-500/50 rounded-full px-2 py-0.5 text-[9.5px] font-bold">ACTIVE</span>
        </div>
        <div className="flex justify-between gap-1">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-200 cursor-pointer ${
                days[i]
                  ? "bg-gradient-to-tr from-violet-500 to-blue-500 text-white shadow-sm shadow-violet-500/40"
                  : "bg-[#212A4E] text-slate-400 border border-white/5"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="text-[10px] text-slate-400 bg-[#1A2140]/60 rounded-lg p-2 border border-white/5 mt-auto">
        💡 8 hours sleep cycle recommended for peak cognitive focus.
      </div>
    </div>
  );
}

function Scene5() {
  const [selectedApps, setSelectedApps] = useState<Record<string, boolean>>({
    "Social Media": true,
    "Short Videos": true,
    "Mobile Games": true,
    "Web Browser": false,
  });

  const toggle = (name: string) => {
    sfx.playClick();
    setSelectedApps(p => ({ ...p, [name]: !p[name] }));
  };

  const apps = [
    { name: "Social Media", icon: "💬", color: "from-purple-500 to-indigo-500" },
    { name: "Short Videos", icon: "🎬", color: "from-amber-500 to-orange-500" },
    { name: "Mobile Games", icon: "🎮", color: "from-blue-500 to-cyan-500" },
    { name: "Web Browser",  icon: "🌐", color: "from-emerald-500 to-teal-500" },
  ];

  const count = Object.values(selectedApps).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-2 h-full animate-fade-in text-left">
      <div className="flex justify-between items-center mb-0.5">
        <span className="text-xs font-bold text-white">Select Apps to Block</span>
        <span className="bg-[#212A4E] text-slate-300 rounded-full px-2 py-0.5 text-[10px] font-semibold">{count} blocked</span>
      </div>
      {apps.map((a, i) => {
        const checked = selectedApps[a.name];
        return (
          <div
            key={i}
            onClick={() => toggle(a.name)}
            className="bg-[#1A2140] border border-white/10 hover:border-violet-400/40 rounded-xl p-2 flex items-center gap-2.5 transition-all cursor-pointer"
          >
            <div className={`w-7 h-7 rounded-lg bg-gradient-to-tr ${a.color} flex items-center justify-center text-xs shadow-md`}>
              {a.icon}
            </div>
            <span className="flex-1 text-xs text-slate-200 font-medium">{a.name}</span>
            <div className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-bold transition-all ${
              checked ? "bg-violet-500 text-white shadow-sm shadow-violet-500/50" : "border border-slate-600"
            }`}>
              {checked && "✓"}
            </div>
          </div>
        );
      })}
      <div className="bg-[#1A2140]/70 border border-white/5 rounded-lg p-2 text-[10px] text-slate-400 mt-auto">
        🔒 Apps locked down automatically during sleep schedule.
      </div>
    </div>
  );
}

function Scene6({ active }: { active: boolean }) {
  return (
    <div className="flex flex-col justify-center h-full animate-fade-in text-left">
      <div className={`bg-gradient-to-br from-[#1E274A] to-[#141A33] border border-white/15 rounded-2xl p-3.5 shadow-2xl transition-all duration-700 ${
        active ? "translate-y-0 opacity-100 scale-100" : "-translate-y-6 opacity-0 scale-95"
      }`}>
        <div className="flex gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-lg shadow-amber-500/20 shrink-0">
            🌙
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              Bedtime Reminder
              <span className="text-[9px] bg-amber-400/20 text-amber-300 font-semibold px-1.5 py-0.2 rounded">30m left</span>
            </div>
            <div className="text-[11px] text-slate-300 mt-1 leading-relaxed">
              Your sleep window starts in 30 minutes (11:00 PM). Time to wrap up screen time and wind down.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Scene7() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-violet-500/20 blur-xl animate-ping" />
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-600/30 to-blue-600/20 border border-violet-500/50 flex items-center justify-center shadow-lg shadow-violet-500/20">
          <span className="text-2xl animate-bounce">🔒</span>
        </div>
      </div>
      <div>
        <div className="font-['Space_Grotesk'] text-sm font-bold tracking-widest text-violet-300 uppercase">Sleep Mode Active</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Selected distracting apps restricted</div>
      </div>
      <div className="flex gap-2 mt-1">
        {["💬", "🎬", "🎮"].map((ic, i) => (
          <div key={i} className="w-9 h-9 rounded-xl bg-[#1A2140] border border-violet-500/40 flex items-center justify-center text-sm shadow-inner relative">
            <span>{ic}</span>
            <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500/90 rounded-full text-[8px] flex items-center justify-center font-bold text-white">✕</div>
          </div>
        ))}
      </div>
      <div className="bg-violet-950/60 border border-violet-500/30 rounded-full px-3 py-1 text-[10px] text-violet-300 font-semibold">
        11:00 PM → 07:00 AM
      </div>
    </div>
  );
}

function Scene8() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-xl text-rose-400">
        🛡️
      </div>
      <div className="bg-rose-500/15 border border-rose-500/40 text-rose-300 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide flex items-center gap-1.5">
        <span>🔒</span> Sleep Protection Armed
      </div>
      <div className="text-[11px] text-slate-300 max-w-[200px] leading-relaxed">
        Dead Sleep cannot be uninstalled or disabled during scheduled bedtime hours.
      </div>
      <div className="bg-[#1A2140] border border-white/5 rounded-lg p-2 text-[10px] text-slate-400">
        Device Admin Protection · Zero Cheating
      </div>
    </div>
  );
}

function Scene9() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full animate-fade-in">
      <div className="w-14 h-14 rounded-full bg-[#212A4E] border border-white/10 flex items-center justify-center text-2xl shadow-inner">
        ⛔
      </div>
      <div>
        <div className="font-['Space_Grotesk'] text-base font-bold text-white">App Access Locked</div>
        <div className="text-[11px] text-slate-400 mt-0.5">Active sleep window is currently running.</div>
      </div>
      <div className="bg-[#212A4E] border border-white/10 rounded-full px-4 py-1.5 text-xs font-semibold text-slate-200">
        Sleep Target: 11:00 PM – 7:00 AM
      </div>
      <div className="text-[10px] text-slate-400 italic">Put the phone down & rest your eyes.</div>
    </div>
  );
}

function Scene10() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 h-full animate-fade-in">
      <div className="text-[10px] text-amber-300 tracking-widest uppercase font-bold">Rise and Shine</div>
      <div className="font-['Space_Grotesk'] text-5xl font-extrabold text-white tracking-tight my-1">07:00</div>
      <div className="flex items-end gap-1 h-7 my-1">
        {[8, 20, 12, 26, 10, 18, 9, 22, 14, 24, 11].map((h, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-amber-400 to-violet-400 rounded-full"
            style={{
              height: `${h}px`,
              animation: `wave 0.8s ${i * 0.08}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center mt-2">
        {["Chime Sound", "Max Volume", "Snooze Blocked"].map((t, i) => (
          <span key={i} className="bg-[#212A4E] text-slate-300 rounded-full px-2.5 py-0.5 text-[9.5px] font-medium border border-white/5">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Scene11({ active }: { active: boolean }) {
  const [solved, setSolved] = useState(false);

  const handleSolve = () => {
    sfx.playSuccess();
    setSolved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center text-center gap-3 h-full animate-fade-in">
      <div className="text-[11px] text-slate-400 font-medium">Solve to dismiss the alarm</div>
      <div className="font-['Space_Grotesk'] text-3xl font-bold tracking-wider text-white">17 × 8 = ?</div>
      <button
        onClick={handleSolve}
        className={`w-20 h-10 rounded-xl font-['Space_Grotesk'] text-base font-bold flex items-center justify-center transition-all cursor-pointer ${
          solved
            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105"
            : "bg-[#212A4E] text-white border border-white/10 hover:border-violet-400 hover:scale-105"
        }`}
      >
        {solved ? "136" : "Solve"}
      </button>

      {solved ? (
        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-bounce">
          <span>✓</span> Challenge Completed! Alarm Silenced
        </div>
      ) : (
        <div className="text-[10.5px] text-slate-400">
          Tap <b>Solve</b> to simulate challenge completion
        </div>
      )}
    </div>
  );
}

function Scene12() {
  return (
    <div className="flex flex-col gap-2 h-full animate-fade-in text-left">
      <div className="text-center text-xs font-bold text-white mb-0.5">Project Overview</div>
      <div className="grid grid-cols-2 gap-1.5">
        {[
          ["📊", "Sleep Analytics", "Weekly tracking"],
          ["📈", "Consistency Score", "Sleep quality"],
          ["🧩", "Smart Puzzles", "Math & memory"],
          ["⚡", "Battery Friendly", "Zero background drain"]
        ].map(([ic, tit, desc], i) => (
          <div key={i} className="bg-[#1A2140] border border-white/10 rounded-xl p-2 flex flex-col gap-0.5">
            <span className="text-sm">{ic}</span>
            <span className="text-[11px] font-bold text-white">{tit}</span>
            <span className="text-[9px] text-slate-400">{desc}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 justify-center mt-auto">
        {["Java", "Android SDK", "OOP Architecture"].map((t, i) => (
          <span key={i} className="text-[9.5px] text-slate-400 border border-white/10 rounded-full px-2 py-0.5 bg-[#1A2140]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Phone Mockup Frame ─────────────────────────────────────────────────────────
function Phone({ sceneIdx, onNext }: { sceneIdx: number; onNext: () => void }) {
  const sceneList = [
    <Scene1 onNext={onNext} />,
    <Scene2 />,
    <Scene3 />,
    <Scene4 />,
    <Scene5 />,
    <Scene6 active={sceneIdx === 5} />,
    <Scene7 />,
    <Scene8 />,
    <Scene9 />,
    <Scene10 />,
    <Scene11 active={sceneIdx === 10} />,
    <Scene12 />,
  ];

  return (
    <div className="relative group">
      {/* Device Ambient Glow */}
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-blue-600/30 rounded-[50px] blur-2xl opacity-60 group-hover:opacity-80 transition duration-700 pointer-events-none" />

      {/* Titanium Frame */}
      <div className="relative w-[288px] h-[588px] bg-gradient-to-b from-[#252C4D] via-[#161C38] to-[#0D1128] rounded-[44px] p-3 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-1">
        {/* Subtle Hardware Buttons */}
        <div className="absolute -left-[3px] top-24 w-[3px] h-9 bg-slate-600 rounded-l-sm" />
        <div className="absolute -left-[3px] top-36 w-[3px] h-9 bg-slate-600 rounded-l-sm" />
        <div className="absolute -right-[3px] top-28 w-[3px] h-14 bg-slate-600 rounded-r-sm" />

        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0A0E1F] rounded-full z-20 flex items-center justify-between px-2.5 shadow-md border border-white/5">
          <div className="w-2 h-2 rounded-full bg-slate-800" />
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        {/* Screen Bezel */}
        <div className="w-full h-full bg-gradient-to-b from-[#111731] to-[#0A0E1F] rounded-[34px] overflow-hidden relative flex flex-col border border-white/5 shadow-inner">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-5 pt-3.5 pb-1 text-[11px] font-semibold text-slate-300 z-10 select-none">
            <span>{SCENES[sceneIdx].clock}</span>
            <span className="flex items-center gap-1 text-[9px] text-slate-400">
              <span>5G</span>
              <span>100%</span>
            </span>
          </div>

          {/* Scene Viewport */}
          <div className="relative flex-1 p-3.5 overflow-hidden">
            {sceneList[sceneIdx]}
          </div>

          {/* Home Bar Indicator */}
          <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mb-2" />
        </div>
      </div>
    </div>
  );
}

// ── Interactive Bedtime Calculator ─────────────────────────────────────────────
function SleepCalculator() {
  const [wakeHour, setWakeHour] = useState(7);
  const [wakeMinute, setWakeMinute] = useState(0);

  // Calculates 90-minute REM cycles backwards
  const calcTimes = () => {
    const cycles = [
      { count: 6, hours: 9, label: "6 Cycles (9h 00m) — Peak Recovery", recommended: true },
      { count: 5, hours: 7.5, label: "5 Cycles (7h 30m) — Optimal Student Sleep", recommended: false },
      { count: 4, hours: 6, label: "4 Cycles (6h 00m) — Minimum Healthy Rest", recommended: false },
    ];

    return cycles.map(c => {
      let totalMin = wakeHour * 60 + wakeMinute - c.hours * 60;
      if (totalMin < 0) totalMin += 24 * 60;
      const h = Math.floor(totalMin / 60);
      const m = totalMin % 60;
      const ampm = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m < 10 ? `0${m}` : m;
      return { ...c, timeStr: `${displayH}:${displayM} ${ampm}` };
    });
  };

  const results = calcTimes();

  return (
    <div className="bg-[#111731]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">🌙</span>
        <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white">Interactive Sleep Cycle Calculator</h3>
      </div>
      <p className="text-xs text-slate-400 mb-5">
        Sleep consists of 90-minute REM cycles. Waking up in the middle of a cycle makes you feel groggy; waking up between cycles makes you feel refreshed!
      </p>

      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs font-semibold text-slate-300">Target Wake-Up Time:</span>
        <select
          value={wakeHour}
          onChange={e => { sfx.playClick(); setWakeHour(Number(e.target.value)); }}
          className="bg-[#1A2140] text-white border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none focus:border-violet-500 cursor-pointer"
        >
          {[5, 6, 7, 8, 9, 10].map(h => (
            <option key={h} value={h}>{h}:00 AM</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {results.map((r, i) => (
          <div
            key={i}
            className={`p-4 rounded-xl border transition-all ${
              r.recommended
                ? "bg-gradient-to-br from-violet-900/30 to-blue-900/20 border-violet-500 shadow-md shadow-violet-500/10"
                : "bg-[#1A2140] border-white/5"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-slate-300">{r.count} Cycles</span>
              {r.recommended && (
                <span className="bg-violet-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">BEST</span>
              )}
            </div>
            <div className="font-['Space_Grotesk'] text-xl font-bold text-white my-1">{r.timeStr}</div>
            <div className="text-[10px] text-slate-400">{r.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Background Floating Particles ──────────────────────────────────────────────
function AmbientCanvas() {
  const particles = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Aurora Glow Orbs */}
      <div className="absolute top-[5%] left-[10%] w-[450px] h-[450px] rounded-full bg-violet-600/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[130px] animate-pulse" style={{ animationDelay: "2s" }} />

      {particles.map(i => {
        const size = 2 + (i % 4);
        return (
          <div
            key={i}
            className="absolute rounded-full bg-violet-400/40 blur-[0.5px]"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${(i * 19 + 7) % 100}vw`,
              top: `${(i * 17 + 11) % 100}vh`,
              animation: `drift ${12 + (i % 8)}s ${(i * 0.7) % 5}s ease-in-out infinite alternate`,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Main Web App ───────────────────────────────────────────────────────────────
export default function App() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [soundOn, setSoundOn] = useState(false);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const SCENE_DURATION = 2800; // ms

  // Sound Toggle Handler
  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    sfx.enabled = next;
    if (next) sfx.playClick();
  };

  // Scene advance logic
  const nextScene = () => {
    sfx.playClick();
    setSceneIdx(p => (p + 1) % SCENES.length);
    startTimeRef.current = Date.now();
  };

  const prevScene = () => {
    sfx.playClick();
    setSceneIdx(p => (p - 1 + SCENES.length) % SCENES.length);
    startTimeRef.current = Date.now();
  };

  const jumpToScene = (idx: number) => {
    sfx.playClick();
    setSceneIdx(idx);
    startTimeRef.current = Date.now();
  };

  // Play / Pause timer
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setSceneIdx(p => (p + 1) % SCENES.length);
      startTimeRef.current = Date.now();
    }, SCENE_DURATION);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Smooth progress bar animation
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(100, (elapsed / SCENE_DURATION) * 100);
      setProgress(pct);
      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, sceneIdx]);

  const activeScene = SCENES[sceneIdx];

  return (
    <div className="min-h-screen bg-[#0A0E1F] text-[#F2F3FC] font-['Plus_Jakarta_Sans',system-ui,sans-serif] relative overflow-x-hidden selection:bg-violet-500/30">
      <style>{`
        @keyframes drift {
          0% { transform: translateY(0) translateX(0); opacity: 0.25; }
          100% { transform: translateY(-24px) translateX(12px); opacity: 0.75; }
        }
        @keyframes wave {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1.1); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>

      <AmbientCanvas />

      {/* ── Navigation Bar ── */}
      <nav className="sticky top-0 z-50 bg-[#0A0E1F]/75 backdrop-blur-md border-b border-white/10 px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 flex items-center justify-center text-base shadow-lg shadow-violet-500/20">
              🌙
            </div>
            <span className="font-['Space_Grotesk'] text-lg font-bold tracking-tight text-white">Dead Sleep</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-violet-500/10 border border-violet-500/30 text-violet-300 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              v1.0 Live Demo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleSound}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                soundOn
                  ? "bg-violet-600/30 border-violet-400 text-violet-200"
                  : "bg-[#1A2140] border-white/10 text-slate-400 hover:text-white"
              }`}
            >
              <span>{soundOn ? "🔊" : "🔇"}</span>
              <span className="hidden sm:inline">{soundOn ? "Sound On" : "Muted"}</span>
            </button>

            <a
              href="https://github.com/tanjeem180hz/tanjeem180hz.github.io"
              target="_blank"
              rel="noreferrer"
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <span>⭐</span>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero / Interactive Simulator Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-10 pb-16 min-h-[calc(100vh-70px)] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Headline & Live Scene Metadata */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-indigo-500/10 border border-violet-500/30 rounded-full px-3.5 py-1 text-xs text-violet-300 w-fit">
              <span>{activeScene.icon}</span>
              <span className="font-semibold uppercase tracking-wider text-[10px]">Scene {activeScene.id} of 12 · {activeScene.tag}</span>
            </div>

            <h1 className="font-['Space_Grotesk'] text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              {activeScene.head}
              <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
                {activeScene.accentHead}
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed min-h-[72px]">
              {activeScene.sub}
            </p>

            {/* Controller Toolbar */}
            <div className="bg-[#111731]/90 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevScene}
                    className="w-8 h-8 rounded-lg bg-[#1A2140] hover:bg-[#252F5A] text-slate-200 flex items-center justify-center text-xs font-bold transition cursor-pointer border border-white/5"
                    title="Previous Scene"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white flex items-center gap-1.5 text-xs font-bold transition shadow-md shadow-violet-500/20 cursor-pointer"
                  >
                    <span>{isPlaying ? "⏸" : "▶"}</span>
                    <span>{isPlaying ? "Pause" : "Play"}</span>
                  </button>
                  <button
                    onClick={nextScene}
                    className="w-8 h-8 rounded-lg bg-[#1A2140] hover:bg-[#252F5A] text-slate-200 flex items-center justify-center text-xs font-bold transition cursor-pointer border border-white/5"
                    title="Next Scene"
                  >
                    ▶
                  </button>
                </div>

                <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                  Auto-Advance
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-violet-500 to-blue-400 h-full rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Scene Pill Scrubber */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {SCENES.map((sc, i) => (
                  <button
                    key={i}
                    onClick={() => jumpToScene(i)}
                    className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all cursor-pointer ${
                      i === sceneIdx
                        ? "bg-violet-500 text-white shadow-sm shadow-violet-500/40"
                        : "bg-[#1A2140] text-slate-400 hover:text-slate-200 hover:bg-[#212A4E]"
                    }`}
                  >
                    {sc.id}. {sc.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Tech Badges */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">ENGINE:</span>
              <span className="bg-[#1A2140] border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-medium">Java (Android SDK)</span>
              <span className="bg-[#1A2140] border border-white/10 px-2.5 py-1 rounded-lg text-slate-300 font-medium">OOP Architecture</span>
            </div>
          </div>

          {/* Right: Phone Simulator */}
          <div className="lg:col-span-6 flex justify-center items-center">
            <Phone sceneIdx={sceneIdx} onNext={nextScene} />
          </div>

        </div>
      </section>

      {/* ── Sleep Architect Calculator Section ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <SleepCalculator />
      </section>

      {/* ── Feature Bento Grid Section ── */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-violet-400 text-xs font-bold tracking-widest uppercase mb-1">Engineered For Students</div>
          <h2 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-extrabold text-white">Why Ordinary Alarms Fail</h2>
          <p className="text-slate-400 text-sm mt-2">
            Most people easily snooze regular alarms and scroll social media until 2 AM. Dead Sleep eliminates both loopholes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: "🚫",
              title: "Automatic Lockdown",
              desc: "Restricts Instagram, TikTok, YouTube, and games as soon as the sleep window triggers. No willpower required.",
              tag: "App Restriction"
            },
            {
              icon: "🛡️",
              title: "Tamper Protection",
              desc: "Employs Android Device Admin protections to block uninstall attempts during active bedtime hours.",
              tag: "Zero Cheating"
            },
            {
              icon: "🧩",
              title: "Puzzle Alarm",
              desc: "Ordinary alarms allow mindless tap-to-dismiss. Dead Sleep demands solving cognitive challenges to stop ringing.",
              tag: "Smart Awaken"
            },
            {
              icon: "🔔",
              title: "Pre-Sleep Nudge",
              desc: "Sends a polite proactive alert 30 minutes in advance so you can save your work and wind down smoothly.",
              tag: "Routine Builder"
            },
            {
              icon: "🔋",
              title: "Battery & Offline Friendly",
              desc: "Zero tracking, zero battery drain, and 100% offline. All scheduling runs locally via Android AlarmManager.",
              tag: "Privacy First"
            },
            {
              icon: "🧱",
              title: "Pure OOP Structure",
              desc: "Built with clean object-oriented architecture: modular services, encapsulated controllers, and scalable listeners.",
              tag: "Java / OOP"
            },
          ].map((card, i) => (
            <div
              key={i}
              className="group bg-[#111731]/80 backdrop-blur-md border border-white/10 hover:border-violet-500/40 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl p-2 bg-[#1A2140] rounded-xl border border-white/5">{card.icon}</span>
                  <span className="text-[10px] font-bold text-violet-300 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">{card.tag}</span>
                </div>
                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Architecture & Technical Overview ── */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <div className="bg-[#111731] border border-white/10 rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-lg">
              🧱
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-xl font-bold text-white">Object-Oriented Architecture (OOP)</h3>
              <p className="text-xs text-slate-400">Class hierarchy & separation of concerns</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { mod: "UserSetup", desc: "First-run onboarding & user sleep preference validation" },
              { mod: "SleepSchedule", desc: "Encapsulates bedtime windows, repeats & calendar rules" },
              { mod: "AppRestriction", desc: "Monitors foreground packages & enforces access blocks" },
              { mod: "ReminderSystem", desc: "Proactive notifications using Android NotificationManager" },
              { mod: "SmartAlarm", desc: "Audio focus management, ringtone ramp & snooze limits" },
              { mod: "ChallengeSystem", desc: "Math, memory & logic verification before alarm disarm" },
            ].map((m, i) => (
              <div key={i} className="bg-[#1A2140] border border-white/5 rounded-xl p-3.5 flex flex-col gap-1">
                <div className="font-['Fira_Code',monospace] text-xs font-bold text-violet-300 flex items-center gap-1.5">
                  <span className="text-slate-500">class</span> {m.mod}
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/10 py-10 px-6 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400 font-semibold">
            <span>🌙</span>
            <span>Dead Sleep — Student Android Project</span>
          </div>
          <div>Java · Android SDK · Object-Oriented Programming (OOP)</div>
          <a
            href="https://tanjeem180hz.github.io/"
            className="text-violet-400 hover:text-violet-300 font-medium transition"
          >
            https://tanjeem180hz.github.io
          </a>
        </div>
      </footer>
    </div>
  );
}
