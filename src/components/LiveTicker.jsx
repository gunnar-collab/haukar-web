import { Link, useLocation } from 'react-router-dom';
import { useMatch } from '../context/MatchContext';

export default function LiveTicker({ toggleDrawer, isOpen }) {
  // 1. We ask the engine: "Where are we right now?"
  const location = useLocation();
  const { minutes, seconds, haukarScore, fhScore } = useMatch();
  
  // 2. We build the logic: If we are on '/leikvakt', the link goes to '/' (Home). Otherwise, go to '/leikvakt'.
  const targetPath = location.pathname === '/leikvakt' ? '/' : '/leikvakt';

  return (
    <div className="bg-haukar-red text-white py-2 px-4 flex justify-center items-center shadow-md relative z-50 min-h-[48px]">
      
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* We pass our smart targetPath into the Link */}
        <Link to={targetPath} className="flex items-center gap-3 md:gap-6 hover:opacity-80 transition-opacity cursor-pointer group">
          
          <div className="flex items-center gap-2 font-black tracking-widest uppercase text-xs md:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-sm"></span>
            </span>
            Í BEINNI
          </div>

          <div className="font-headline font-black tracking-wide flex items-center gap-2 md:gap-4 text-sm md:text-lg">
            <span className="hidden sm:inline">HAUKAR</span>
            <span className="sm:hidden">HAU</span>
            <span className="bg-white text-haukar-red px-3 py-1 rounded shadow-inner text-base md:text-xl group-hover:scale-105 transition-transform min-w-[80px] text-center tabular-nums">
              {haukarScore} - {fhScore}
            </span>
            <span className="hidden sm:inline opacity-90">FH</span>
            <span className="sm:hidden opacity-90">FH</span>
          </div>

          <div className="font-body font-medium hidden md:block opacity-90 text-sm tabular-nums min-w-[55px]">
            ({minutes}:{seconds.toString().padStart(2, '0')})
          </div>
        </Link>
        
        <button 
          onClick={toggleDrawer}
          className="flex items-center gap-1 font-bold hover:text-anniversary-gold transition-colors group cursor-pointer border-l border-white/30 pl-4 md:pl-6"
        >
          <span className="hidden md:inline text-xs uppercase tracking-wider">Síðustu Leikir</span>
          <span className={`material-symbols-outlined text-base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

      </div>
    </div>
  );
}