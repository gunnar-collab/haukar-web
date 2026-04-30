import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNextHomeGame } from '../utils/globalMatchUtils';

const formatMatchDate = (dateObj) => {
  const days = ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur'];
  const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
  
  const d = new Date(dateObj);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  const time = `${h}:${m}`;
  // If time is 00:00, KSÍ usually defaults it. We will just say 'Tími óstaðfestur' or fallback to 19:15.
  const timeStr = time === '00:00' ? '19:15' : time;
  
  return `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]} kl. ${timeStr}`;
};

export default function NextHomeGameWidget() {
  const [nextGame, setNextGame] = useState(null);

  useEffect(() => {
    // Fetch the single most immediate home game within 7 days
    const game = getNextHomeGame();
    setNextGame(game);
  }, []);

  if (!nextGame) return null; // Only render if there is an upcoming home game

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full"
      >
        <div className="bg-[#121c38] rounded-2xl p-5 md:p-6 shadow-[0_20px_50px_rgba(18,28,56,0.4)] flex flex-col relative h-full">
          
          {/* Top Info */}
          <div className="shrink-0">
            <p className="text-[11px] md:text-xs font-black uppercase tracking-[0.15em] text-[#D4AF37] leading-relaxed md:leading-normal">
              {nextGame.sportName} <span className="mx-1 opacity-70">•</span> {nextGame.competition}
            </p>
          </div>

          {/* Middle: Teams */}
          <div className="flex items-center justify-start my-auto py-6">
            <span className="text-3xl md:text-5xl font-black italic text-white drop-shadow-sm truncate">{nextGame.home}</span>
            <span className="text-xl md:text-2xl font-black italic text-[#D4AF37] mx-4 md:mx-6 shrink-0">vs</span>
            <span className="text-3xl md:text-5xl font-black italic text-white/70 drop-shadow-sm truncate">{nextGame.away}</span>
          </div>

          {/* Bottom: Info Pill & Button */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-auto gap-5">
            
            {/* Info Pill */}
            <div className="flex w-full md:w-auto items-center bg-[#232d4b] rounded-xl px-5 py-3">
              <div className="flex flex-col pr-5 border-r border-white/10">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Hvenær</span>
                <span className="text-[13px] font-bold text-white">{formatMatchDate(nextGame.parsedDate)}</span>
              </div>
              <div className="flex flex-col pl-5">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Hvar</span>
                <span className="text-[13px] font-bold text-white">{nextGame.venue}</span>
              </div>
            </div>

            {/* Button */}
            <a 
              href={nextGame.ticketLink || "https://stubb.is/haukar/tickets"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-center bg-[#c8102e] text-white hover:bg-[#a00d25] transition-colors duration-200 rounded-xl px-8 py-4 text-[12px] font-black uppercase tracking-widest shadow-md shrink-0"
            >
              Kaupa Miða <span className="material-symbols-outlined ml-3 text-[18px]">local_activity</span>
            </a>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
