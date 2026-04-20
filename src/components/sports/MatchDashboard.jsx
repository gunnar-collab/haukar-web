import { cn } from '../../lib/utils.js';

export default function MatchDashboard({ 
  loading, 
  lastMatch, 
  nextMatch, 
  onOpenTickets, 
  provider, 
  isTournament = false,
  statsIcon = "leaderboard"
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-8 w-full mb-20">
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
          
          <div className="flex items-center justify-between my-auto w-full">
            <span className={cn(
              "text-lg sm:text-xl md:text-2xl font-black italic uppercase truncate text-left",
              isTournament ? "w-auto text-[#c8102e]" : (lastMatch.homeScore > lastMatch.awayScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]', "w-[35%]")
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
                  <span className={lastMatch.homeScore > lastMatch.awayScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}>{lastMatch.homeScore}</span>
                  <span className="mx-1.5 md:mx-2 text-gray-300">-</span>
                  <span className={lastMatch.awayScore > lastMatch.homeScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}>{lastMatch.awayScore}</span>
                </>
              )}
            </div>
            {!isTournament && (
              <span className={cn(
                "text-lg sm:text-xl md:text-2xl font-black italic uppercase truncate w-[35%] text-right",
                lastMatch.awayScore > lastMatch.homeScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'
              )}>
                {lastMatch.away}
              </span>
            )}
          </div>
          
          <a href={lastMatch.statsLink} target="_blank" rel="noreferrer" className="w-full bg-[#1c2c6c] hover:bg-black text-white py-3 md:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-md">
            <span className="material-symbols-outlined text-[16px]">{statsIcon}</span>
            Skoða {isTournament ? 'Úrslit' : 'Tölfræði/Skýrslu'} á {provider}
          </a>
        </div>

        {/* NEXT MATCH */}
        <div className="bg-gradient-to-br from-[#1c2c6c] to-gray-900 text-white rounded-2xl shadow-xl p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4">
          {loading && (
            <div className="absolute inset-0 bg-[#1c2c6c]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sæki leikjaplan...</span>
            </div>
          )}
          <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest block">
            Næsti {isTournament ? 'Mót' : 'Leikur'} • {nextMatch.competition}
          </span>
          
          <div className="flex items-center justify-between my-auto text-lg sm:text-xl md:text-2xl font-black italic uppercase w-full">
            <span className={cn("truncate text-left", isTournament ? "" : "w-[40%]")}>{nextMatch.home}</span>
            <span className={cn("text-white/30 text-xs sm:text-sm px-2 shrink-0", isTournament ? "material-symbols-outlined" : "font-normal not-italic")}>
              {isTournament ? 'arrow_forward' : 'VS'}
            </span>
            <span className={cn("truncate text-right", isTournament ? "" : "w-[40%]")}>{nextMatch.away}</span>
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
                className="bg-[#c8102e] text-white font-bold uppercase tracking-widest text-[10px] px-5 py-3.5 sm:py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-[#a30d25] transition-all flex items-center justify-center gap-2"
                aria-label="Kaupa miða"
              >
                Kaupa Miða <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
