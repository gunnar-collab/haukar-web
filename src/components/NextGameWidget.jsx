import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getUpcomingHomeMatches } from '../utils/globalMatchUtils';

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

export default function NextGameWidget() {
  const [nextGame, setNextGame] = useState(null);

  useEffect(() => {
    // Fetch the single most immediate home game
    const games = getUpcomingHomeMatches(1);
    if (games.length > 0) {
      setNextGame(games[0]);
    }
  }, []);

  if (!nextGame) return null; // Only render if there is an upcoming game

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4 h-full group/widget">
          
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block">
            Næsti Heimaleikur • {nextGame.competition || nextGame.sportName}
          </span>
          
          <div className="flex items-center justify-between my-auto text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl font-black italic uppercase w-full">
            <span className={`truncate text-right flex-1 min-w-0 ${nextGame.home?.includes('Haukar') ? "text-[#c8102e]" : "text-[#1c2c6c]"}`}>
              {nextGame.home}
            </span>
            <span className="text-[#1c2c6c] text-sm sm:text-xl lg:text-2xl px-3 shrink-0 opacity-70 font-black italic">
              VS
            </span>
            <span className={`truncate text-left flex-1 min-w-0 ${nextGame.away?.includes('Haukar') ? "text-[#c8102e]" : "text-[#1c2c6c]"}`}>
              {nextGame.away}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-auto pt-4">
            <div className="flex items-center justify-between sm:justify-start gap-4 bg-gray-50 rounded-xl px-4 py-2.5 sm:py-2 border border-gray-100 shrink-0">
              <div className="text-left">
                <span className="block text-gray-400 text-[9px] uppercase tracking-widest mb-0.5">Hvenær</span>
                <span className="font-bold text-[11px] sm:text-xs text-[#1c2c6c] whitespace-nowrap">{formatMatchDate(nextGame.parsedDate)}</span>
              </div>
              <div className="w-px h-6 bg-gray-200"></div>
              <div className="text-left">
                <span className="block text-gray-400 text-[9px] uppercase tracking-widest mb-0.5">Hvar</span>
                <span className="font-bold text-[11px] sm:text-xs text-[#1c2c6c] whitespace-nowrap">{nextGame.venue}</span>
              </div>
            </div>
            
            <a 
              href={nextGame.ticketLink || "https://stubb.is/haukar/tickets"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#1c2c6c] hover:bg-black text-white font-bold uppercase tracking-widest text-[10px] sm:text-[11px] px-6 py-3.5 sm:py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group/btn"
            >
              Kaupa Miða <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">confirmation_number</span>
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
