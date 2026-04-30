import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUpcomingHomeMatches, getUpcomingMatches } from '../utils/globalMatchUtils';

const formatMatchDateShort = (dateObj) => {
  const d = new Date(dateObj);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  const time = `${h}:${m}`;
  const timeStr = time === '00:00' ? '19:15' : time;
  
  const dNum = d.getDate().toString().padStart(2, '0');
  const mNum = (d.getMonth() + 1).toString().padStart(2, '0');
  
  return `${dNum}.${mNum} - ${timeStr}`; // e.g., 01.05 - 19:15
};

export default function SecondNextGameWidget() {
  const [secondGame, setSecondGame] = useState(null);

  useEffect(() => {
    const homeGames = getUpcomingHomeMatches(1);
    const nextHome = homeGames.length > 0 ? homeGames[0] : null;

    const allGames = getUpcomingMatches(5);
    let gameToShow = null;
    
    for (const game of allGames) {
      const isSameAsNextHome = nextHome && 
        game.home === nextHome.home && 
        game.away === nextHome.away && 
        game.date === nextHome.date;
        
      if (!isSameAsNextHome) {
        gameToShow = game;
        break;
      }
    }

    if (gameToShow) {
      setSecondGame(gameToShow);
    }
  }, []);

  if (!secondGame) return null;

  const isHomeHaukar = secondGame.home && secondGame.home.includes('Haukar');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full"
      >
        <div className="bg-gradient-to-br from-[#1c2c6c] to-gray-900 text-white rounded-2xl shadow-xl p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4 h-full group/widget">
          
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest block">
            Næsti Leikur • {secondGame.competition || secondGame.sportName}
          </span>
          
          <div className="flex items-center justify-between my-auto text-[22px] sm:text-2xl lg:text-3xl xl:text-4xl font-black italic uppercase w-full">
            <span className={`truncate text-right flex-1 min-w-0 ${secondGame.home?.includes('Haukar') ? "text-white" : "text-white/70"}`}>
              {secondGame.home}
            </span>
            <span className="text-[#D4AF37] text-sm sm:text-xl lg:text-2xl px-3 shrink-0 opacity-80 font-black italic">
              VS
            </span>
            <span className={`truncate text-left flex-1 min-w-0 ${secondGame.away?.includes('Haukar') ? "text-white" : "text-white/70"}`}>
              {secondGame.away}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 mt-auto pt-4">
            <div className="flex items-center justify-between sm:justify-start gap-4 bg-white/10 rounded-xl px-4 py-2.5 sm:py-2 border border-white/5 shrink-0">
              <div className="text-left">
                <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvenær</span>
                <span className="font-bold text-[11px] sm:text-xs text-white whitespace-nowrap">{formatMatchDateShort(secondGame.parsedDate)}</span>
              </div>
              <div className="w-px h-6 bg-white/10"></div>
              <div className="text-left">
                <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvar</span>
                <span className="font-bold text-[11px] sm:text-xs text-white whitespace-nowrap">{secondGame.venue}</span>
              </div>
            </div>
            
            <Link 
              to="/dagatal"
              className="bg-[#c8102e] hover:bg-[#D4AF37] text-white font-bold uppercase tracking-widest text-[10px] sm:text-[11px] px-6 py-3.5 sm:py-3 rounded-xl shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group/btn"
            >
              Allt Dagatalið <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">calendar_month</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
