import { useEffect, useRef, useState } from "react";

// ── types ─────────────────────────────────────────────────────────────────────
interface Scene {
  id: number;
  clock: string;
  head: string;
  accentHead: string;
  sub: string;
}

// ── scene data ────────────────────────────────────────────────────────────────
const SCENES: Scene[] = [
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

// ── Phone scenes ──────────────────────────────────────────────────────────────
function Scene1() {
  return (
    <div className="scene-inner flex flex-col items-center justify-center text-center gap-4">
      <div style={{
        width:76,height:76,borderRadius:24,
        background:"linear-gradient(150deg,#212A4E,#1A2140)",
        border:"1px solid rgba(255,255,255,0.08)",
        display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 0 0 10px rgba(140,124,251,0.07)"
      }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="url(#mg1)"/>
          <defs><linearGradient id="mg1" x1="0" y1="0" x2="24" y2="24">
            <stop stopColor="#8C7CFB"/><stop offset="1" stopColor="#5B8CFF"/>
          </linearGradient></defs>
        </svg>
      </div>
      <div style={{fontFamily:"'Space Grotesk'",fontSize:22,fontWeight:700,letterSpacing:"0.03em"}}>DEAD SLEEP</div>
      <div style={{color:"#8D93B8",fontSize:12}}>Sleep on time. Wake up on time.</div>
      <div style={{
        marginTop:8,display:"inline-flex",alignItems:"center",justifyContent:"center",
        background:"linear-gradient(135deg,#8C7CFB,#5B8CFF)",
        color:"#fff",fontWeight:700,fontSize:12,
        borderRadius:12,padding:"10px 24px",
        boxShadow:"0 8px 20px rgba(91,140,255,0.28)"
      }}>Get Started</div>
    </div>
  );
}

function Scene2() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
        <span style={{fontSize:12.5,fontWeight:700}}>Quick setup</span>
        <span style={{display:"inline-flex",alignItems:"center",gap:6,background:"#212A4E",borderRadius:20,padding:"5px 11px",fontSize:11,color:"#8D93B8"}}>2 / 6</span>
      </div>
      {[
        {q:"What time do you usually sleep?", opts:["10 PM","11 PM","12 AM"], picked:[1]},
        {q:"Which apps distract you?", opts:["Social","Video","Games"], picked:[0,2]},
        {q:"Want a smart wake-up challenge?", opts:["Yes, math puzzle"], picked:[0]},
      ].map((item, gi) => (
        <div key={gi} style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"11px 13px"}}>
          <div style={{fontSize:11.5,color:"#8D93B8",marginBottom:8}}>{item.q}</div>
          <div style={{display:"flex",gap:7}}>
            {item.opts.map((o,oi)=>(
              <div key={oi} style={{
                flex:1,textAlign:"center",padding:"7px 5px",borderRadius:9,fontSize:11,
                background: item.picked.includes(oi) ? "linear-gradient(135deg,rgba(140,124,251,.28),rgba(91,140,255,.22))" : "#212A4E",
                color: item.picked.includes(oi) ? "#F2F3FC" : "#8D93B8",
                border: item.picked.includes(oi) ? "1px solid #8C7CFB" : "1px solid rgba(255,255,255,0.08)",
              }}>{o}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Scene3() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{fontSize:12,color:"#8D93B8"}}>Tonight's routine</div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        {[{val:"11:00",unit:"PM",lab:"Sleep"},{val:"7:00",unit:"AM",lab:"Wake"}].map((s,i)=>(
          <div key={i} style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"11px 18px",textAlign:"center",flex:1,margin:i===0?"0 6px 0 0":"0"}}>
            <div style={{fontFamily:"'Space Grotesk'",fontSize:22,fontWeight:600}}>{s.val}<span style={{fontSize:11}}>{s.unit}</span></div>
            <div style={{fontSize:10,color:"#8D93B8",marginTop:2}}>{s.lab}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"12px 14px",display:"flex",flexDirection:"column",gap:9}}>
        {[["Sleep mode","Scheduled","#F4C77B"],["Next reminder","10:30 PM","#F2F3FC"],["Blocked apps","3 selected","#F2F3FC"]].map(([k,v,c],i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:12}}>
            <span style={{color:"#8D93B8"}}>{k}</span>
            <span style={{fontWeight:700,color:c}}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,marginTop:2}}>
        {["Edit Schedule","Blocked Apps"].map((t,i)=>(
          <div key={i} style={{flex:1,textAlign:"center",background:"#212A4E",border:"1px solid rgba(255,255,255,0.08)",borderRadius:10,padding:"9px 6px",fontSize:11,fontWeight:700,color:"#F2F3FC"}}>{t}</div>
        ))}
      </div>
    </div>
  );
}

function Scene4() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",gap:12}}>
      <div style={{fontSize:12.5,fontWeight:700}}>Sleep schedule</div>
      <div style={{display:"flex",gap:10}}>
        {[{lab:"SLEEP",val:"11:00 PM"},{lab:"WAKE",val:"7:00 AM"}].map((t,i)=>(
          <div key={i} style={{flex:1,background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"11px 12px",textAlign:"center"}}>
            <div style={{fontSize:9.5,color:"#8D93B8",letterSpacing:"0.06em"}}>{t.lab}</div>
            <div style={{fontFamily:"'Space Grotesk'",fontSize:17,fontWeight:600,marginTop:4}}>{t.val}</div>
          </div>
        ))}
      </div>
      <div style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <span style={{fontSize:12}}>Repeat weekly</span>
          <span style={{background:"#8C7CFB",color:"#fff",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:700}}>On</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          {["S","S","M","T","W","T","F"].map((d,i)=>(
            <div key={i} style={{
              width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,
              background: i!==6 ? "linear-gradient(135deg,#8C7CFB,#5B8CFF)" : "#212A4E",
              color: i!==6 ? "#fff" : "#8D93B8",
            }}>{d}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Scene5() {
  const apps = [
    {name:"Social Media",bg:"linear-gradient(135deg,#8C7CFB,#5B8CFF)",checked:true},
    {name:"Video",bg:"linear-gradient(135deg,#F4C77B,#e0a94f)",checked:true},
    {name:"Games",bg:"linear-gradient(135deg,#5B8CFF,#8C7CFB)",checked:true},
    {name:"Browser",bg:"#212A4E",checked:false},
  ];
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",gap:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:12.5,fontWeight:700}}>Select apps to block</span>
        <span style={{background:"#212A4E",borderRadius:20,padding:"5px 11px",fontSize:11,color:"#8D93B8"}}>3 selected</span>
      </div>
      {apps.map((a,i)=>(
        <div key={i} style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,padding:"9px 12px",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:30,height:30,borderRadius:9,background:a.bg,flexShrink:0}}/>
          <span style={{flex:1,fontSize:12.5}}>{a.name}</span>
          <div style={{
            width:18,height:18,borderRadius:6,flexShrink:0,
            background: a.checked ? "#8C7CFB" : "transparent",
            border: a.checked ? "1px solid #8C7CFB" : "1.5px solid #5A6088",
            display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#fff"
          }}>{a.checked && "✓"}</div>
        </div>
      ))}
      <div style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:13,padding:"9px 12px",fontSize:11,color:"#8D93B8"}}>Apps will be restricted during sleep time.</div>
    </div>
  );
}

function Scene6({ active }: { active: boolean }) {
  return (
    <div className="scene-inner" style={{paddingTop:30}}>
      <div style={{
        background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:16,padding:"12px 14px",display:"flex",gap:10,
        transform: active ? "translateY(0)" : "translateY(-28px)",
        opacity: active ? 1 : 0,
        transition:"transform 0.65s 0.25s ease, opacity 0.65s 0.25s ease"
      }}>
        <div style={{width:32,height:32,borderRadius:9,background:"linear-gradient(135deg,#F4C77B,#e0a94f)",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🌙</div>
        <div>
          <div style={{fontSize:12,fontWeight:700}}>Bedtime Reminder</div>
          <div style={{fontSize:11.5,color:"#8D93B8",marginTop:3,lineHeight:1.45}}>Your sleep time starts in 30 minutes.<br/>Time to finish your screen time.</div>
        </div>
      </div>
    </div>
  );
}

function Scene7({ active }: { active: boolean }) {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:10,paddingTop:20}}>
      <div style={{
        width:64,height:64,borderRadius:"50%",
        background:"radial-gradient(circle, rgba(140,124,251,.38), transparent 70%)",
        border:"1px solid rgba(140,124,251,.55)",
        display:"flex",alignItems:"center",justifyContent:"center"
      }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" fill="#8C7CFB"/>
        </svg>
      </div>
      <div style={{fontFamily:"'Space Grotesk'",fontSize:15,fontWeight:600,letterSpacing:"0.03em"}}>SLEEP MODE ACTIVE</div>
      <div style={{fontSize:11,color:"#8D93B8"}}>Selected apps are now restricted</div>
      <div style={{display:"flex",gap:10,marginTop:6}}>
        {[
          "linear-gradient(135deg,#8C7CFB,#5B8CFF)",
          "linear-gradient(135deg,#F4C77B,#e0a94f)",
          "linear-gradient(135deg,#5B8CFF,#8C7CFB)",
        ].map((bg,i)=>(
          <div key={i} style={{position:"relative",width:40,height:40,borderRadius:12,background:bg}}>
            <div style={{
              position:"absolute",inset:0,borderRadius:12,
              background:"rgba(10,12,26,0.72)",
              display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,
              opacity: active ? 1 : 0,
              transition:`opacity 0.4s ${0.3+i*0.12}s ease`
            }}>🔒</div>
          </div>
        ))}
      </div>
      <div style={{marginTop:8,background:"rgba(140,124,251,0.12)",border:"1px solid rgba(140,124,251,0.3)",borderRadius:12,padding:"8px 16px",fontSize:11,color:"#8C7CFB",fontWeight:600}}>11:00 PM – 7:00 AM</div>
    </div>
  );
}

function Scene8() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:14,paddingTop:28}}>
      <div style={{display:"flex",alignItems:"center",gap:8,color:"#8D93B8",fontSize:13}}>
        <span>🗑️</span><span>Uninstall Dead Sleep</span>
      </div>
      <div style={{height:1,width:"80%",background:"rgba(255,255,255,0.06)"}}/>
      <div style={{display:"flex",alignItems:"center",gap:8,background:"rgba(255,122,133,0.12)",border:"1px solid rgba(255,122,133,0.4)",color:"#FF7A85",padding:"10px 16px",borderRadius:13,fontSize:12.5,fontWeight:700}}>
        🔒 Sleep Protection Active
      </div>
      <div style={{fontSize:11.5,color:"#8D93B8",maxWidth:190,lineHeight:1.55}}>Dead Sleep can't be deleted during scheduled sleep time.</div>
    </div>
  );
}

function Scene9() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:10,paddingTop:36}}>
      <div style={{width:54,height:54,borderRadius:"50%",background:"#212A4E",border:"1px solid rgba(255,255,255,0.08)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🔒</div>
      <div style={{fontFamily:"'Space Grotesk'",fontSize:16,fontWeight:600}}>App Locked</div>
      <div style={{fontSize:11.5,color:"#8D93B8"}}>Sleep time is active.</div>
      <div style={{marginTop:4,fontFamily:"'Space Grotesk'",fontSize:14,color:"#8D93B8",background:"#212A4E",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"7px 18px"}}>11:00 PM — 7:00 AM</div>
    </div>
  );
}

function Scene10() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:6,paddingTop:26}}>
      <div style={{fontSize:11,color:"#8D93B8",letterSpacing:"0.06em"}}>GOOD MORNING</div>
      <div style={{fontFamily:"'Space Grotesk'",fontSize:46,fontWeight:700,margin:"2px 0 8px",lineHeight:1}}>7:00</div>
      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:28}}>
        {[10,22,14,28,12,20,9].map((h,i)=>(
          <div key={i} style={{
            width:4,borderRadius:3,
            background:"linear-gradient(180deg,#F4C77B,#8C7CFB)",
            height:h,
            animation:`wave 1s ${i*0.1}s ease-in-out infinite`
          }}/>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginTop:14}}>
        {["Sound: Chime","Volume: High","Snooze: Off"].map((t,i)=>(
          <span key={i} style={{display:"inline-flex",alignItems:"center",gap:6,background:"#212A4E",borderRadius:20,padding:"6px 12px",fontSize:11,color:"#8D93B8"}}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Scene11({ active }: { active: boolean }) {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:12,paddingTop:30}}>
      <div style={{fontSize:11.5,color:"#8D93B8"}}>Solve to stop the alarm</div>
      <div style={{fontFamily:"'Space Grotesk'",fontSize:28,fontWeight:600,letterSpacing:"0.02em"}}>17 × 8 = ?</div>
      <div style={{
        width:72,height:42,borderRadius:11,background:"#212A4E",
        border:"1px solid rgba(255,255,255,0.08)",
        display:"flex",alignItems:"center",justifyContent:"center",
        fontFamily:"'Space Grotesk'",fontSize:18,
        opacity: active ? 1 : 0,
        transition:"opacity 0.3s 0.9s ease"
      }}>136</div>
      <div style={{
        display:"flex",alignItems:"center",gap:6,color:"#F4C77B",fontSize:12.5,fontWeight:700,
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(8px)",
        transition:"opacity 0.5s 1.5s ease, transform 0.5s 1.5s ease"
      }}>✓ Challenge Completed — Alarm Stopped</div>
    </div>
  );
}

function Scene12() {
  return (
    <div className="scene-inner" style={{display:"flex",flexDirection:"column",gap:12,paddingTop:24}}>
      <div style={{textAlign:"center",fontSize:12.5,fontWeight:700}}>Coming soon</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[["📊","Sleep statistics"],["📈","Weekly progress"],["🧩","More challenges"],["✨","Smarter routines"]].map(([ic,lab],i)=>(
          <div key={i} style={{background:"#1A2140",border:"1px solid rgba(255,255,255,0.08)",borderRadius:14,padding:"11px 12px",display:"flex",flexDirection:"column",gap:6}}>
            <span style={{fontSize:16}}>{ic}</span>
            <span style={{fontSize:10.5,color:"#8D93B8",lineHeight:1.35}}>{lab}</span>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:4}}>
        {["Java","Android","OOP"].map((t,i)=>(
          <span key={i} style={{fontSize:10,color:"#8D93B8",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"4px 10px"}}>{t}</span>
        ))}
      </div>
      <div style={{textAlign:"center",fontSize:11,color:"#5A6088"}}>Student Team Project</div>
    </div>
  );
}

// ── Phone shell ───────────────────────────────────────────────────────────────
function Phone({ sceneIdx }: { sceneIdx: number }) {
  const scenes = [
    <Scene1/>,
    <Scene2/>,
    <Scene3/>,
    <Scene4/>,
    <Scene5/>,
    <Scene6 active={sceneIdx===5}/>,
    <Scene7 active={sceneIdx===6}/>,
    <Scene8/>,
    <Scene9/>,
    <Scene10/>,
    <Scene11 active={sceneIdx===10}/>,
    <Scene12/>,
  ];
  return (
    <div style={{
      width:284,height:580,
      background:"linear-gradient(180deg,#161C38,#0D1128)",
      borderRadius:42,padding:12,
      border:"1px solid rgba(255,255,255,0.08)",
      filter:"drop-shadow(0 30px 60px rgba(0,0,0,0.55))",
      position:"relative",flexShrink:0
    }}>
      {/* notch */}
      <div style={{position:"absolute",top:12,left:"50%",transform:"translateX(-50%)",width:90,height:20,background:"#0A0E1F",borderRadius:12,zIndex:5}}/>
      {/* screen */}
      <div style={{width:"100%",height:"100%",background:"linear-gradient(165deg,#111731,#0B0F26 70%)",borderRadius:32,overflow:"hidden",position:"relative"}}>
        {/* status bar */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px 4px",fontSize:12,fontWeight:600,color:"#F2F3FC",position:"relative",zIndex:4}}>
          <span>{SCENES[sceneIdx].clock}</span>
          <span style={{color:"#8D93B8",fontSize:10}}>●●● LTE ▮▮▮</span>
        </div>
        {/* scenes */}
        <div style={{position:"relative",height:"calc(100% - 40px)"}}>
          {scenes.map((sc, i) => (
            <div key={i} style={{
              position:"absolute",inset:0,
              padding:"8px 18px 20px",
              opacity: i===sceneIdx ? 1 : 0,
              transform: i===sceneIdx ? "translateY(0) scale(1)" : "translateY(14px) scale(0.985)",
              pointerEvents: i===sceneIdx ? "auto" : "none",
              transition:"opacity 0.55s ease, transform 0.55s ease",
              overflow:"hidden"
            }}>
              {sc}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── README Section ────────────────────────────────────────────────────────────
function Badge({ label, color, logo }: { label: string; color: string; logo?: string }) {
  return (
    <span style={{
      display:"inline-flex",alignItems:"center",gap:5,
      background: color,
      color:"#fff",fontSize:11,fontWeight:600,
      borderRadius:5,padding:"4px 10px",letterSpacing:"0.02em"
    }}>
      {logo && <span style={{fontSize:13}}>{logo}</span>}
      {label}
    </span>
  );
}

const modules = [
  { name: "User Setup",       desc: "First-time onboarding and preference collection" },
  { name: "Sleep Schedule",   desc: "Sleep/wake time selection and weekly repeat rules" },
  { name: "App Restriction",  desc: "Selecting and locking distracting apps during sleep" },
  { name: "Reminder System",  desc: "Bedtime notifications ahead of scheduled sleep" },
  { name: "Smart Alarm",      desc: "Wake-up alarm with sound, volume, and snooze settings" },
  { name: "Challenge System", desc: "Puzzle / math / game challenge required to stop alarm" },
  { name: "Settings",         desc: "App-wide configuration and personalization" },
];

const features = [
  "Set a personal sleep and wake-up schedule.",
  "Get a reminder before sleep time.",
  "Automatically start sleep mode at the scheduled time.",
  "Keep selected distracting apps restricted during sleep time.",
  "The Dead Sleep app cannot be deleted during the scheduled sleep time.",
  "Show a smart alarm at wake-up time.",
  "Stop the alarm only after completing a puzzle, math problem, game, or other challenge.",
  "Allow users to customize their alarm settings.",
];

const future = [
  "Add more types of alarm challenges.",
  "Add weekly sleep statistics and progress.",
  "Give better routine suggestions based on user habits.",
  "Add more flexible app restriction options.",
  "Improve the UI and personalization.",
  "Add more smart reminder options.",
];

function ReadmeSection() {
  return (
    <section style={{
      width:"100%",maxWidth:860,margin:"0 auto",
      padding:"60px 24px 80px",
      fontFamily:"'Plus Jakarta Sans', system-ui, sans-serif",
      color:"#F2F3FC"
    }}>

      {/* ── separator ── */}
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:52}}>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.08))"}}/>
        <span style={{fontSize:12,color:"#5A6088",letterSpacing:"0.08em",fontWeight:600}}>README.md</span>
        <div style={{flex:1,height:1,background:"linear-gradient(90deg,rgba(255,255,255,0.08),transparent)"}}/>
      </div>

      {/* ── header block ── */}
      <div style={{
        background:"#111731",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,
        padding:"36px 40px",marginBottom:32,
        position:"relative",overflow:"hidden"
      }}>
        {/* decorative glow */}
        <div style={{position:"absolute",top:-60,right:-60,width:220,height:220,borderRadius:"50%",background:"radial-gradient(circle,rgba(140,124,251,0.15),transparent 70%)",pointerEvents:"none"}}/>
        
        {/* filename chip */}
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"#212A4E",borderRadius:8,padding:"5px 12px",fontSize:11.5,color:"#8D93B8",fontFamily:"'Fira Code',monospace",marginBottom:20}}>
          <span style={{color:"#F4C77B"}}>📄</span> README.md
        </div>

        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:6}}>
          <div style={{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#8C7CFB,#5B8CFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🌙</div>
          <h1 style={{fontFamily:"'Space Grotesk'",fontSize:"clamp(26px,4vw,36px)",fontWeight:700,margin:0,letterSpacing:"-0.01em"}}>Dead Sleep</h1>
        </div>

        <p style={{fontSize:15,color:"#8D93B8",margin:"0 0 20px",fontStyle:"italic"}}>Sleep on time. Wake up on time.</p>

        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          <Badge label="Java" color="#ED8B00" logo="☕"/>
          <Badge label="Android" color="#3DDC84" logo="🤖"/>
          <Badge label="Object-Oriented Design" color="#8C7CFB"/>
          <Badge label="Student Project" color="#5B8CFF"/>
        </div>
      </div>

      {/* ── About ── */}
      <ReadmeBlock icon="📖" title="About">
        <p style={{fontSize:14,color:"#8D93B8",lineHeight:1.75,margin:0}}>
          Dead Sleep is a Java-based Android project made to help users sleep on time, wake up on time,
          and reduce unnecessary phone distractions during their sleeping hours.
          The idea is simple: the user sets a sleep schedule, chooses distracting apps, and the app
          helps them stay away from those apps during that time.
        </p>
      </ReadmeBlock>

      {/* ── Features ── */}
      <ReadmeBlock icon="⚡" title="Main Features">
        <ul style={{margin:0,padding:0,listStyle:"none",display:"flex",flexDirection:"column",gap:9}}>
          {features.map((f,i)=>(
            <li key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:13.5,color:"#8D93B8",lineHeight:1.6}}>
              <span style={{color:"#8C7CFB",fontWeight:700,marginTop:1,flexShrink:0}}>›</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </ReadmeBlock>

      {/* ── Modules Table ── */}
      <ReadmeBlock icon="🗂️" title="Main Modules">
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
            <thead>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                <th style={{textAlign:"left",padding:"8px 16px 10px 0",color:"#5A6088",fontWeight:600,fontSize:11,letterSpacing:"0.05em",width:"36%"}}>MODULE</th>
                <th style={{textAlign:"left",padding:"8px 0 10px",color:"#5A6088",fontWeight:600,fontSize:11,letterSpacing:"0.05em"}}>RESPONSIBILITY</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m,i)=>(
                <tr key={i} style={{borderBottom: i<modules.length-1 ? "1px solid rgba(255,255,255,0.05)" : "none"}}>
                  <td style={{padding:"10px 16px 10px 0",verticalAlign:"top"}}>
                    <span style={{
                      display:"inline-block",
                      background:"rgba(140,124,251,0.12)",border:"1px solid rgba(140,124,251,0.25)",
                      color:"#8C7CFB",borderRadius:7,padding:"3px 10px",fontSize:12,fontWeight:700,
                      fontFamily:"'Fira Code',monospace"
                    }}>{m.name}</span>
                  </td>
                  <td style={{padding:"10px 0",color:"#8D93B8",lineHeight:1.6,verticalAlign:"middle"}}>{m.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ReadmeBlock>

      {/* ── Tech Stack ── */}
      <ReadmeBlock icon="🛠️" title="Tech Stack">
        <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
          {[
            {label:"Language",val:"Java",icon:"☕",color:"rgba(237,139,0,0.15)",border:"rgba(237,139,0,0.3)",text:"#F4C77B"},
            {label:"Platform",val:"Android",icon:"🤖",color:"rgba(61,220,132,0.1)",border:"rgba(61,220,132,0.3)",text:"#3DDC84"},
            {label:"Architecture",val:"OOP",icon:"🧱",color:"rgba(140,124,251,0.12)",border:"rgba(140,124,251,0.3)",text:"#8C7CFB"},
          ].map((t,i)=>(
            <div key={i} style={{
              background:t.color,border:`1px solid ${t.border}`,
              borderRadius:14,padding:"14px 20px",minWidth:140,flex:1
            }}>
              <div style={{fontSize:20,marginBottom:6}}>{t.icon}</div>
              <div style={{fontSize:11,color:"#5A6088",marginBottom:3,letterSpacing:"0.04em"}}>{t.label}</div>
              <div style={{fontSize:15,fontWeight:700,color:t.text,fontFamily:"'Space Grotesk'"}}>{t.val}</div>
            </div>
          ))}
        </div>
      </ReadmeBlock>

      {/* ── Future ── */}
      <ReadmeBlock icon="🚀" title="Future Improvements">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:10}}>
          {future.map((f,i)=>(
            <div key={i} style={{
              background:"#212A4E",border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:12,padding:"11px 14px",
              display:"flex",gap:9,alignItems:"flex-start"
            }}>
              <span style={{color:"#F4C77B",fontSize:13,marginTop:1,flexShrink:0}}>○</span>
              <span style={{fontSize:12.5,color:"#8D93B8",lineHeight:1.55}}>{f}</span>
            </div>
          ))}
        </div>
      </ReadmeBlock>

      {/* ── Team ── */}
      <ReadmeBlock icon="👥" title="Team">
        <div style={{
          display:"flex",alignItems:"center",gap:14,
          background:"linear-gradient(135deg,rgba(140,124,251,0.1),rgba(91,140,255,0.08))",
          border:"1px solid rgba(140,124,251,0.25)",
          borderRadius:14,padding:"16px 20px"
        }}>
          <div style={{width:44,height:44,borderRadius:13,background:"linear-gradient(135deg,#8C7CFB,#5B8CFF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>🎓</div>
          <div>
            <div style={{fontWeight:700,fontSize:14}}>Student Team Project</div>
            <div style={{fontSize:12.5,color:"#8D93B8",marginTop:3}}>Built as part of an Android application development course.</div>
          </div>
        </div>
      </ReadmeBlock>

    </section>
  );
}

function ReadmeBlock({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{marginBottom:28}}>
      {/* section heading */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
        <span style={{fontSize:16}}>{icon}</span>
        <h2 style={{fontFamily:"'Space Grotesk'",fontSize:18,fontWeight:600,margin:0,letterSpacing:"-0.005em"}}>{title}</h2>
        <div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)",marginLeft:6}}/>
      </div>
      <div style={{
        background:"#111731",border:"1px solid rgba(255,255,255,0.08)",
        borderRadius:16,padding:"20px 24px"
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Floating particles (canvas-free) ─────────────────────────────────────────
function Particles() {
  const items = Array.from({length:16},(_,i)=>i);
  return (
    <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
      {items.map(i=>{
        const size = 3 + (i*7%5);
        return (
          <div key={i} style={{
            position:"absolute",borderRadius:"50%",
            width:size,height:size,
            background:"radial-gradient(circle, rgba(140,124,251,0.55), transparent 70%)",
            filter:"blur(1px)",
            left: `${(i*17+5)%100}vw`,
            top:  `${(i*13+7)%100}vh`,
            animation:`drift ${10+i%10}s ${(i*0.7)%6}s ease-in-out infinite`
          }}/>
        );
      })}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSceneIdx(prev => (prev + 1) % SCENES.length);
    }, 2700);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const scene = SCENES[sceneIdx];

  return (
    <>
      <style>{`
        @keyframes drift {
          0%,100%{ transform:translateY(0) translateX(0); opacity:.35; }
          50%{ transform:translateY(-22px) translateX(10px); opacity:.75; }
        }
        @keyframes wave {
          0%,100%{ transform:scaleY(.5); }
          50%{ transform:scaleY(1); }
        }
        .scene-inner { height:100%; }
        * { box-sizing:border-box; }
        html,body,#root { height:100%; margin:0; }
        body {
          background:
            radial-gradient(60% 50% at 18% 12%, rgba(140,124,251,0.16), transparent 60%),
            radial-gradient(55% 45% at 85% 85%, rgba(91,140,255,0.14), transparent 60%),
            #0A0E1F;
          color:#F2F3FC;
          font-family:'Plus Jakarta Sans', system-ui, sans-serif;
          overflow-x:hidden;
        }
        ::-webkit-scrollbar{ width:6px; }
        ::-webkit-scrollbar-track{ background:transparent; }
        ::-webkit-scrollbar-thumb{ background:rgba(140,124,251,0.3); border-radius:3px; }
      `}</style>

      <Particles/>

      {/* ── Hero / Demo section ── */}
      <div style={{
        position:"relative",zIndex:1,
        minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",
        padding:"40px 24px"
      }}>
        <div style={{
          width:"100%",maxWidth:1100,
          display:"flex",alignItems:"center",justifyContent:"center",
          gap:"clamp(32px,6vw,80px)",
          flexWrap:"wrap"
        }}>
          {/* ── side copy ── */}
          <div style={{width:300,display:"flex",flexDirection:"column",gap:18,flexShrink:0}}>
            {/* brandmark */}
            <div style={{display:"flex",alignItems:"center",gap:10,color:"#8D93B8",fontSize:13,letterSpacing:"0.02em"}}>
              <div style={{width:7,height:7,borderRadius:"50%",background:"#F4C77B",boxShadow:"0 0 10px #F4C77B"}}/>
              DEAD SLEEP · Android Demo
            </div>

            {/* headline */}
            <div style={{fontFamily:"'Space Grotesk'",fontSize:"clamp(24px,3vw,34px)",fontWeight:600,lineHeight:1.18,letterSpacing:"-0.01em"}}>
              {scene.head}<span style={{color:"#8C7CFB"}}>{scene.accentHead}</span>
            </div>

            {/* subline */}
            <div style={{color:"#8D93B8",fontSize:15,lineHeight:1.65,minHeight:72,transition:"opacity 0.3s ease"}}>
              {scene.sub}
            </div>

            {/* scene dots */}
            <div style={{display:"flex",flexWrap:"wrap",gap:7,maxWidth:300}}>
              {SCENES.map((_,i)=>(
                <div
                  key={i}
                  onClick={()=>{
                    setSceneIdx(i);
                    if(timerRef.current) clearInterval(timerRef.current);
                    timerRef.current = setInterval(()=>setSceneIdx(p=>(p+1)%SCENES.length),2700);
                  }}
                  style={{
                    height:4,borderRadius:3,cursor:"pointer",
                    width: i===sceneIdx ? 30 : 20,
                    background: i===sceneIdx
                      ? "linear-gradient(90deg,#8C7CFB,#5B8CFF)"
                      : "#212A4E",
                    transition:"background 0.4s ease, width 0.4s ease"
                  }}
                />
              ))}
            </div>

            {/* tech pills */}
            <div style={{display:"flex",gap:8,marginTop:"auto",flexWrap:"wrap"}}>
              {["Java","Android SDK","OOP"].map(t=>(
                <span key={t} style={{fontSize:11,color:"#5A6088",border:"1px solid rgba(255,255,255,0.08)",padding:"5px 10px",borderRadius:20,letterSpacing:"0.02em"}}>{t}</span>
              ))}
            </div>
          </div>

          {/* ── phone ── */}
          <Phone sceneIdx={sceneIdx}/>
        </div>
      </div>

      {/* ── README section ── */}
      <div style={{position:"relative",zIndex:1,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
        <ReadmeSection/>
      </div>

      {/* ── Footer ── */}
      <div style={{
        position:"relative",zIndex:1,
        borderTop:"1px solid rgba(255,255,255,0.06)",
        padding:"24px",textAlign:"center",
        fontSize:12,color:"#5A6088"
      }}>
        🌙 Dead Sleep — Student Android Project &nbsp;·&nbsp; Java · Android SDK · OOP
      </div>
    </>
  );
}
