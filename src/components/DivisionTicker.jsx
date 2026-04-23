import { Link } from 'react-router-dom';

export default function DivisionTicker({ isOpen }) {
  return (
    <div 
      className={`bg-gray-900 text-white shadow-inner w-full relative z-40 transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-16 py-2 opacity-100 border-b border-gray-800' : 'max-h-0 py-0 opacity-0 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto flex items-center gap-10 md:justify-center text-[10px] md:text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-90 py-1">
        
        <Link to="/handbolti" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all cursor-pointer group">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] shadow-[0_0_6px_#c8102e] group-hover:animate-pulse"></span>
          <span>Handbolti: Haukar 35 - 36 FH</span>
        </Link>

        <Link to="/korfubolti" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all cursor-pointer group">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] shadow-[0_0_6px_#c8102e] group-hover:animate-pulse"></span>
          <span>Körfubolti: Haukar 85 - 82 Stjarnan</span>
        </Link>

        <Link to="/fotbolti" className="flex items-center gap-2 text-gray-300 hover:text-white transition-all cursor-pointer group">
          <span className="w-1.5 h-1.5 rounded-full bg-[#c8102e] shadow-[0_0_6px_#c8102e] group-hover:animate-pulse"></span>
          <span>Fótbolti: Þróttur R. 0 - 1 Haukar</span>
        </Link>

      </div>
    </div>
  );
}