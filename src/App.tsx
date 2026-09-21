import React from "react";
import logoImg from "./logo.png";
import showcaseSvg from "./showcase.svg";

export default function App() {
  const letters = ["D", "E", "A", "D", " ", "S", "L", "E", "E", "P"];

  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden select-none">
      <style>{`
        @keyframes letterWave {
          0%, 100% {
            transform: translateY(0px) scale(1);
            color: #FFFFFF;
            text-shadow: 0 0 14px rgba(140, 124, 251, 0.45), 0 0 28px rgba(91, 140, 255, 0.25);
          }
          50% {
            transform: translateY(-8px) scale(1.08);
            color: #DDD6FE;
            text-shadow: 0 0 22px rgba(140, 124, 251, 0.95), 0 0 45px rgba(91, 140, 255, 0.8), 0 0 65px rgba(140, 124, 251, 0.5);
          }
        }

        .letter-motion {
          display: inline-block;
          animation: letterWave 2.2s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          transition: transform 0.25s ease;
        }

        .letter-motion:hover {
          transform: translateY(-12px) scale(1.2) !important;
          color: #C4B5FD !important;
        }
      `}</style>

      {/* Ambient Background Lighting */}
      <div className="absolute top-[6%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#8C7CFB]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-[650px] h-[400px] rounded-full bg-[#5B8CFF]/10 blur-[150px] pointer-events-none" />

      {/* Highlighted Logo & Large Animated Brand Name */}
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

        {/* Large Animated Name with Letter Motion */}
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold tracking-wider flex items-center select-none cursor-default">
          {letters.map((char, i) =>
            char === " " ? (
              <span key={i} className="inline-block w-2.5 sm:w-4" />
            ) : (
              <span
                key={i}
                className="letter-motion"
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {char}
              </span>
            )
          )}
        </h1>
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
