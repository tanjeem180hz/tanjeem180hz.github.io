import React from "react";
import logoImg from "./logo.png";
import showcaseSvg from "./showcase.svg";

export default function App() {
  return (
    <div className="min-h-screen bg-[#070913] text-white flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 relative overflow-hidden select-none">
      {/* Ambient Lighting Background */}
      <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#8C7CFB]/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[650px] h-[400px] rounded-full bg-[#5B8CFF]/10 blur-[150px] pointer-events-none" />

      {/* Highlighted Logo */}
      <header className="relative z-10 mb-4 sm:mb-6 flex flex-col items-center">
        <div className="relative group">
          {/* Glowing Aura Highlight */}
          <div className="absolute -inset-2.5 bg-gradient-to-r from-[#8C7CFB] via-[#6366F1] to-[#3B82F6] rounded-3xl blur-lg opacity-85 group-hover:opacity-100 group-hover:blur-xl transition duration-500 animate-pulse" />
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/25 shadow-[0_0_40px_rgba(140,124,251,0.5)] transition duration-300 transform group-hover:scale-105 bg-[#111731] flex items-center justify-center">
            <img
              src={logoImg}
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>
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
