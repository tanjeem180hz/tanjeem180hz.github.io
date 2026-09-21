import React from "react";
import logoImg from "./logo.png";
import showcaseSvg from "./showcase.svg";

export default function App() {
  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden select-none">
      <style>{`
        /* Ultra-smooth, non-jumping light sweep animation */
        .brand-title {
          background: linear-gradient(
            120deg,
            #FFFFFF 15%,
            #DDD6FE 35%,
            #FFFFFF 50%,
            #A78BFA 70%,
            #FFFFFF 85%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: smoothShimmer 6s ease-in-out infinite;
          filter: drop-shadow(0 0 25px rgba(140, 124, 251, 0.45));
        }

        @keyframes smoothShimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>

      {/* Ambient Lighting Background */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#8C7CFB]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[650px] h-[400px] rounded-full bg-[#5B8CFF]/10 blur-[150px] pointer-events-none" />

      {/* Highlighted Logo & Large Name (Smooth & Non-Jumping) */}
      <header className="relative z-10 mb-4 sm:mb-6 flex flex-row items-center justify-center gap-4 sm:gap-5">
        {/* Highlighted Logo */}
        <div className="relative group shrink-0">
          <div className="absolute -inset-2.5 bg-gradient-to-r from-[#8C7CFB] via-[#6366F1] to-[#3B82F6] rounded-3xl blur-lg opacity-85 group-hover:opacity-100 group-hover:blur-xl transition duration-500 animate-pulse" />
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-white/25 shadow-[0_0_40px_rgba(140,124,251,0.5)] transition duration-300 transform group-hover:scale-105 bg-[#111731] flex items-center justify-center">
            <img
              src={logoImg}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Large Highlighted Name */}
        <div className="relative flex items-center">
          {/* Subtle Ambient Backlight Glow behind Name */}
          <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-violet-600/25 via-indigo-500/20 to-blue-500/25 blur-xl rounded-full pointer-events-none" />
          <h1 className="relative font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-wider select-none cursor-default brand-title">
            DEAD SLEEP
          </h1>
        </div>
      </header>

      {/* Directly Displayed SVG Showcase */}
      <main className="relative z-10 w-full max-w-[1150px] flex items-center justify-center">
        <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] bg-[#090B18]">
          <object
            data={showcaseSvg || "showcase.svg"}
            type="image/svg+xml"
            className="w-full h-full block"
          >
            <img
              src={showcaseSvg || "showcase.svg"}
              alt="Showcase"
              className="w-full h-full object-contain"
            />
          </object>
        </div>
      </main>
    </div>
  );
}
