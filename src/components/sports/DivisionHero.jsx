import { cn } from '../../lib/utils.js';

export default function DivisionHero({ sportName, icon, bgImage, gender, setGender, isKarate = false }) {
  return (
    <div className="relative w-full h-[45vh] min-h-[350px] flex items-end pb-12 bg-[#c8102e] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay"
        style={{ backgroundImage: `url('${bgImage}')` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#a30d25] via-[#c8102e]/80 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 pb-6">
        <div>
          <span className="text-[#1c2c6c] bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm font-bold tracking-widest uppercase text-xs mb-4 inline-flex items-center gap-2 border border-white/20 shadow-sm">
            <span className="material-symbols-outlined text-[16px]">{icon}</span>
            {sportName}
          </span>
          <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
            {isKarate 
              ? (gender === 'karla' ? 'Keppnislið Karla' : 'Keppnislið Kvenna')
              : (gender === 'karla' ? 'M.fl. Karla' : 'M.fl. Kvenna')
            }
          </h1>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl flex gap-1 border border-white/20 shadow-xl">
          <button 
            onClick={() => setGender('karla')} 
            className={cn(
              "px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300",
              gender === 'karla' ? "bg-[#1c2c6c] text-white shadow-lg scale-105" : "text-white/80 hover:text-white hover:bg-white/10"
            )}
            aria-label="Skipta yfir í Karlaflokk"
          >
            Karlar
          </button>
          <button 
            onClick={() => setGender('kvenna')} 
            className={cn(
              "px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300",
              gender === 'kvenna' ? "bg-[#1c2c6c] text-white shadow-lg scale-105" : "text-white/80 hover:text-white hover:bg-white/10"
            )}
            aria-label="Skipta yfir í Kvennaflokk"
          >
            Konur
          </button>
        </div>
      </div>
    </div>
  );
}
