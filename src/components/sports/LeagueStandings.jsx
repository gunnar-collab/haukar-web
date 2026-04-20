import { cn } from '../../lib/utils.js';

export default function LeagueStandings({ standings, loading, provider, title = "Staðan", isKarate = false }) {
  return (
    <div className="lg:col-span-1">
      <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase mb-8">{title}</h2>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative min-h-[300px]">
        {loading && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center">
            <span className="material-symbols-outlined animate-spin text-[#c8102e] text-4xl mb-4">sync</span>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1c2c6c]">Tengist {provider}...</span>
          </div>
        )}
        <div className="bg-gradient-to-r from-[#c8102e] to-[#a30d25] py-3 px-4 flex text-white/90 text-[10px] font-bold uppercase tracking-widest shadow-md">
          <span className="w-8 text-center">R</span>
          <span className="flex-grow ml-2">{isKarate ? 'Félag' : 'Lið'}</span>
          {isKarate ? (
            <span className="w-12 text-center text-yellow-300"><span className="material-symbols-outlined text-[16px] transform translate-y-0.5">workspace_premium</span></span>
          ) : (
            <span className="w-8 text-center">L</span>
          )}
          <span className={cn("text-center text-white", isKarate ? "w-10" : "w-8")}>Stig</span>
        </div>
        <div className="flex flex-col">
          {standings.map((row) => (
            <div key={row.rank} className={cn(
              "flex items-center py-3 px-4 border-b border-gray-50 last:border-0",
              row.team === 'Haukar' ? 'bg-[#c8102e]/5 border-l-4 border-l-[#c8102e]' : 'border-l-4 border-l-transparent'
            )}>
              <span className={cn("w-8 text-center font-bold text-sm", row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-gray-400')}>
                {row.rank}
              </span>
              <span className={cn("flex-grow ml-2 text-sm font-bold", row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-[#1c2c6c]')}>
                {row.team}
              </span>
              
              {isKarate ? (
                <span className="w-12 text-center text-gray-400 text-xs font-bold">{row.w}</span>
              ) : (
                <span className="w-8 text-center text-gray-400 text-xs">{row.played}</span>
              )}

              <span className={cn("text-center font-black text-sm", isKarate ? "w-10" : "w-8", row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-[#1c2c6c]')}>
                {row.pts}
              </span>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 text-center border-t border-gray-100 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">
            {isKarate ? `Opinberar tölur ${provider}` : `Lifandi gögn frá ${provider}`}
          </span>
        </div>
      </div>
    </div>
  );
}
