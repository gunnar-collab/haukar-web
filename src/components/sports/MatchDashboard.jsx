import { cn } from '../../lib/utils.js';
import { useMatch } from '../../context/MatchContext';
import matchReports from '../../data/match_reports.json';

export default function MatchDashboard({ 
  loading, 
  lastMatch, 
  nextMatch, 
  onOpenTickets, 
  provider, 
  isTournament = false,
  statsIcon = "leaderboard"
}) {
  const { openReport } = useMatch();
  
  const hasLocalReport = lastMatch?.id && matchReports[lastMatch.id] && (matchReports[lastMatch.id].events?.length > 0 || matchReports[lastMatch.id].lineup);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-8 w-full pb-8 md:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        
        {/* LATEST MATCH */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4">
          {loading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1c2c6c]">Sæki Gögn...</span>
            </div>
          )}
          <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block">
            Síðasti {isTournament ? 'Mót' : 'Leikur'} • {lastMatch.competition}
          </span>
          
          <div className="flex items-center justify-between my-auto w-full gap-2">
            <span className={cn(
              "text-lg sm:text-xl md:text-2xl font-black italic uppercase truncate text-left",
              isTournament ? "w-auto text-[#c8102e]" : (lastMatch.home?.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]')
            )}>
              {isTournament ? 'Afrek Hauka' : lastMatch.home}
            </span>
            <div className={cn("bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl border border-gray-100 shadow-sm shrink-0 flex items-center gap-4", isTournament ? "text-xl font-black italic" : "text-lg sm:text-xl md:text-2xl font-black italic")}>
              {isTournament ? (
                <>
                  <div className="flex items-center gap-1" title="Gullverðlaun">
                    <span className="text-yellow-500 material-symbols-outlined text-[24px]">workspace_premium</span>
                    <span className="text-[#1c2c6c]">{lastMatch.homeScore}</span>
                  </div>
                  <div className="flex items-center gap-1" title="Silfurverðlaun">
                    <span className="text-gray-400 material-symbols-outlined text-[24px]">workspace_premium</span>
                    <span className="text-[#1c2c6c]">{lastMatch.awayScore}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2 md:gap-4">
                      <span className={lastMatch.home?.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}>{lastMatch.homeScore}</span>
                      <span className="text-gray-300">-</span>
                      <span className={lastMatch.away?.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}>{lastMatch.awayScore}</span>
                    </div>
                    {lastMatch.penaltyInfo && (
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 mt-1 not-italic tracking-wider uppercase">
                        ({lastMatch.penaltyInfo})
                      </span>
                    )}
                  </div>
                </>
              )}
            </div>
            {!isTournament && (
              <span className={cn(
                "text-lg sm:text-xl md:text-2xl font-black italic uppercase truncate text-right",
                lastMatch.away?.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]'
              )}>
                {lastMatch.away}
              </span>
            )}
          </div>
          
          {hasLocalReport ? (
            <button 
              onClick={() => openReport(lastMatch)}
              className="w-full bg-[#1c2c6c] hover:bg-black text-white py-3 md:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">{statsIcon}</span>
              Skoða {isTournament ? 'Úrslit' : 'Tölfræði/Skýrslu'} á {provider}
            </button>
          ) : (
            <a 
              href={lastMatch.statsLink || (provider === 'HBStatz' ? 'https://hbstatz.is' : 'https://ksi.is')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1c2c6c] hover:bg-black text-white py-3 md:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-md"
            >
              <span className="material-symbols-outlined text-[16px]">{statsIcon}</span>
              Skoða {isTournament ? 'Úrslit' : 'Tölfræði/Skýrslu'} á {provider} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          )}
        </div>

        {/* NEXT MATCH */}
        <div className="bg-gradient-to-br from-[#1c2c6c] to-gray-900 text-white rounded-2xl shadow-xl p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4">
          {loading && (
            <div className="absolute inset-0 bg-[#1c2c6c]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sæki leikjaplan...</span>
            </div>
          )}
          <span className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest block">
            Næsti {isTournament ? 'Mót' : 'Leikur'} • {nextMatch.competition}
          </span>
          
          <div className="flex items-center justify-between my-auto text-lg sm:text-xl md:text-2xl font-black italic uppercase w-full">
            <span className={cn(
              "truncate text-left", 
              isTournament ? "" : (nextMatch.home?.includes('Haukar') ? "w-[40%] text-white" : "w-[40%] text-white/70")
            )}>
              {nextMatch.home}
            </span>
            <span className={cn("text-[#D4AF37] text-sm sm:text-lg px-2 shrink-0 opacity-70", isTournament ? "material-symbols-outlined" : "font-black italic")}>
              {isTournament ? 'arrow_forward' : 'VS'}
            </span>
            <span className={cn(
              "truncate text-right", 
              isTournament ? "" : (nextMatch.away?.includes('Haukar') ? "w-[40%] text-white" : "w-[40%] text-white/70")
            )}>
              {nextMatch.away}
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center justify-between sm:justify-start gap-4 bg-white/10 rounded-xl px-4 py-2.5 sm:py-2 border border-white/5">
              <div className="text-left">
                <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvenær</span>
                <span className="font-bold text-[11px] sm:text-xs">{nextMatch.date}</span>
              </div>
              <div className="w-px h-6 bg-white/10"></div>
              <div className="text-left">
                <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvar</span>
                <span className="font-bold text-[11px] sm:text-xs">{nextMatch.venue}</span>
              </div>
            </div>
            {!isTournament && (
              <button 
                onClick={onOpenTickets}
                className="bg-[#c8102e] hover:bg-[#D4AF37] text-white font-bold uppercase tracking-widest text-[10px] px-5 py-3.5 sm:py-3 rounded-xl shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group/btn"
                aria-label="Kaupa miða"
              >
                Kaupa Miða <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">confirmation_number</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
