import { useState, useEffect } from 'react';
import { cn } from '../../lib/utils.js';

export default function DivisionHero({ sportName, icon, bgImage, gender, setGender, isKarate = false }) {
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const hasSeenHint = sessionStorage.getItem('hasSeenGenderHint');
    if (!hasSeenHint) {
      const timer = setTimeout(() => {
        setShowHint(true);
        setTimeout(() => setShowHint(false), 6000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleGenderSelect = (g) => {
    setGender(g);
    setShowHint(false);
    sessionStorage.setItem('hasSeenGenderHint', 'true');
  };

  return (
    <div className="relative w-full h-[50svh] md:h-[45svh] min-h-[400px] flex items-end pb-14 md:pb-18 bg-[#c8102e] overflow-hidden">
      {/* Immersive Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 animate-pulse-slow"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#c8102e] via-[#c8102e]/60 to-transparent"></div>
      
      {/* Decorative Overlays */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.1),_transparent)]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col justify-end items-center md:items-end gap-4 md:gap-8 text-center md:text-left">
        
        {/* Badge & Title Section */}
        <div className="w-full">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-white bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-xl font-black tracking-[0.2em] uppercase text-[10px] mb-6 inline-flex items-center gap-2 border border-white/20 shadow-2xl">
              <span className="material-symbols-outlined text-[14px]">{icon}</span>
              {sportName}
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-[0_10px_25px_rgba(0,0,0,0.3)] leading-[0.9]">
              {isKarate
                ? (gender === 'karla' ? 'Keppnislið Karla' : 'Keppnislið Kvenna')
                : (gender === 'karla' ? 'M.fl. Karla' : 'M.fl. Kvenna')
              }
            </h1>
          </div>
        </div>

        {/* Mobile App-Style Segmented Control */}
        <div className="relative w-full md:w-auto mt-4">
          {showHint && (
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-max animate-bounce z-50">
              <div className="bg-[#fbbf24] text-[#1c2c6c] text-[10px] font-black px-4 py-2 rounded-2xl shadow-2xl relative flex items-center gap-2 border-2 border-white/20">
                <span className="material-symbols-outlined text-sm">swap_horiz</span>
                Skoðaðu bæði liðin okkar hér!
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#fbbf24] rotate-45"></div>
              </div>
            </div>
          )}

          <div className="w-full md:w-auto bg-black/20 backdrop-blur-2xl p-1.5 rounded-[2rem] flex gap-1 border border-white/10 shadow-2xl relative">
             {/* Slider Background (Only visible on MD+) */}
             <div className="hidden md:block absolute inset-1 w-[calc(50%-4px)] bg-[#1c2c6c] rounded-[1.5rem] transition-transform duration-500 ease-out shadow-xl"
                  style={{ transform: gender === 'kvenna' ? 'translateX(100%)' : 'translateX(0)' }}>
             </div>

            <button
              onClick={() => handleGenderSelect('karla')}
              className={cn(
                "flex-1 md:flex-none md:px-10 py-4 md:py-3 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 relative z-10",
                gender === 'karla' 
                  ? "bg-[#1c2c6c] md:bg-transparent text-white shadow-xl md:shadow-none" 
                  : "text-white/60 hover:text-white"
              )}
            >
              Karlar
            </button>
            <button
              onClick={() => handleGenderSelect('kvenna')}
              className={cn(
                "flex-1 md:flex-none md:px-10 py-4 md:py-3 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 relative z-10",
                gender === 'kvenna' 
                  ? "bg-[#1c2c6c] md:bg-transparent text-white shadow-xl md:shadow-none" 
                  : "text-white/60 hover:text-white"
              )}
            >
              Konur
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
