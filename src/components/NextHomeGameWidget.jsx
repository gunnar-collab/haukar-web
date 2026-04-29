import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNextHomeGame } from '../utils/globalMatchUtils';

const formatMatchDate = (dateObj) => {
  const days = ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur'];
  const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
  
  const d = new Date(dateObj);
  const time = d.toLocaleTimeString('is-IS', { hour: '2-digit', minute: '2-digit' });
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
        className="w-full max-w-[1440px] mx-auto px-6 pt-4 z-10 relative"
      >
        <div className="bg-haukar-red text-white rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 overflow-hidden relative">
          
          {/* Subtle background pattern/glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

          {/* Match Info */}
          <div className="flex flex-col flex-1 z-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="material-symbols-outlined text-2xl opacity-80">event</span>
              <span className="text-xs uppercase font-bold tracking-wider text-white/80">{nextGame.sportName} • {nextGame.competition}</span>
            </div>
            <h3 className="text-2xl font-black italic tracking-tight mb-1">Næsti Heimaleikur</h3>
            <p className="text-base opacity-90">
              <span className="font-bold">{nextGame.home}</span> vs <span className="font-bold">{nextGame.away}</span>
            </p>
            <p className="text-sm opacity-75 flex items-center justify-center md:justify-start gap-1 mt-1">
              <span className="material-symbols-outlined text-lg">location_on</span>
              {nextGame.venue} • {formatMatchDate(nextGame.parsedDate)}
            </p>
          </div>

          {/* Call to Action */}
          <div className="z-10 w-full md:w-auto mt-4 md:mt-0">
            <a 
              href={nextGame.ticketLink || "https://stubb.is/haukar/tickets"} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center justify-center bg-white text-haukar-red hover:bg-gray-100 transition-colors rounded-full px-8 py-3 text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transform hover:scale-105 duration-200"
            >
              <span className="material-symbols-outlined mr-2">local_activity</span>
              Kaupa Miða
            </a>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
