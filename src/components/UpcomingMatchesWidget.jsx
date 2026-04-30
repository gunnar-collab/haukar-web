import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getUpcomingMatches } from '../utils/globalMatchUtils';

const formatMatchDateShort = (dateObj) => {
  const d = new Date(dateObj);
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  const time = `${h}:${m}`;
  const timeStr = time === '00:00' ? '19:15' : time;
  
  const months = ['jan', 'feb', 'mars', 'apr', 'maí', 'jún', 'júl', 'ágú', 'sep', 'okt', 'nóv', 'des'];
  const monthName = months[d.getMonth()];
  
  return `${d.getDate()}. ${monthName} kl. ${timeStr}`;
};

export default function UpcomingMatchesWidget() {
  const [upcomingGames, setUpcomingGames] = useState([]);

  useEffect(() => {
    // Fetch the next 2 matches
    const games = getUpcomingMatches(2);
    setUpcomingGames(games);
  }, []);

  if (!upcomingGames || upcomingGames.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-full"
      >
        <div className="bg-white rounded-[2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] h-full flex flex-col relative overflow-hidden group/widget">
          
          {/* Subtle background glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#c8102e] rounded-full blur-[60px] opacity-[0.03] pointer-events-none transition-all duration-700 group-hover/widget:opacity-10 group-hover/widget:scale-110"></div>
          
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#1c2c6c]/5 flex items-center justify-center">
                <span className="material-symbols-outlined text-[#1c2c6c] text-[16px]">calendar_month</span>
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1c2c6c]">Framundan</h3>
            </div>
            <Link to="/dagatal" className="text-[10px] font-black uppercase tracking-widest text-[#c8102e] hover:text-[#1c2c6c] transition-colors flex items-center gap-1 group/link bg-[#c8102e]/5 px-3 py-1.5 rounded-full">
              Sjá allt <span className="material-symbols-outlined text-[14px] group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>

          <div className="flex flex-col gap-3 flex-grow justify-center relative z-10">
            {upcomingGames.map((game, idx) => (
              <div key={idx} className="group/row flex items-center gap-4 bg-gray-50/50 hover:bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 rounded-2xl p-2.5 shadow-sm hover:shadow-md cursor-default">
                
                {/* Date Square Badge */}
                <div className="flex flex-col items-center justify-center bg-white border border-gray-100 rounded-xl w-[52px] h-[52px] shrink-0 shadow-sm group-hover/row:border-[#c8102e]/30 group-hover/row:bg-[#c8102e]/5 transition-colors">
                  <span className="text-[16px] font-black text-[#c8102e] leading-none mb-0.5">{formatMatchDateShort(game.parsedDate).split('.')[0]}</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500">{formatMatchDateShort(game.parsedDate).split(' kl.')[0].split(' ')[1]}</span>
                </div>
                
                {/* Match Info */}
                <div className="flex-1 min-w-0 pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-gray-200/50 px-1.5 py-0.5 rounded">{game.sportName.split(' ')[0]}</span>
                    {game.isHome ? <span className="text-[8px] font-black uppercase tracking-wider text-gray-400">Heima</span> : <span className="text-[8px] font-black uppercase tracking-wider text-[#c8102e]">Úti</span>}
                  </div>
                  <p className="text-[13px] font-black text-[#1c2c6c] truncate leading-tight">
                    {game.home} <span className="text-gray-300 mx-1 text-[10px] italic font-bold">vs</span> {game.away}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-[10px] font-bold text-gray-500">
                    <span className="material-symbols-outlined text-[12px] text-[#c8102e] opacity-80">schedule</span>
                    kl. {formatMatchDateShort(game.parsedDate).split(' kl. ')[1]}
                  </div>
                </div>
                
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
