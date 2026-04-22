import { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

/**
 * PlayerProfile - Sniðmát fyrir tölfræði leikmanna Hauka
 * Hannað fyrir tímabilið 2026 með gögnum frá HBStatz
 */
export default function PlayerProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  // Sjálfgefin gögn ef engin gögn berast
  const player = location.state?.player;

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
            <span className="material-symbols-outlined text-5xl">person_off</span>
          </div>
          <h1 className="text-2xl font-black italic text-[#1c2c6c] uppercase mb-4 tracking-tight">Leikmaður fannst ekki</h1>
          <p className="text-gray-500 text-sm mb-8 font-medium">Við fundum því miður ekki leikmanninn sem þú varst að leita að. Hann gæti hafa fært sig um set eða slóðin er röng.</p>
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-[#c8102e] text-white font-black py-4 rounded-2xl hover:bg-[#9b0c23] transition-all shadow-lg hover:shadow-[#c8102e]/30 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Fara til baka
          </button>
        </div>
      </div>
    );
  }

  const isGoalkeeper = player.position?.toLowerCase().includes('markmaður') || player.position?.toLowerCase().includes('markvörður');

  return (
    <main className="w-full min-h-screen bg-[#fafafa] font-sans pb-24 selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[55vh] min-h-[450px] bg-[#c8102e] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c6c] via-[#c8102e]/80 to-transparent z-10"></div>
        
        <img 
          src={player.img} 
          alt={player.name}
          className="absolute right-0 top-0 w-full md:w-3/5 h-full object-cover object-top z-0 opacity-40 md:opacity-100 mix-blend-luminosity md:mix-blend-normal grayscale md:grayscale-0"
        />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pb-12 flex flex-col md:flex-row items-end justify-between">
          <div className="w-full md:w-2/3">
            {/* Breadcrumbs & Back Button */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button 
                onClick={() => navigate(-1)} 
                className="text-white hover:bg-white/20 text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-all bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Til baka
              </button>
              
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60">
                <Link to="/" className="hover:text-white transition-colors">Heim</Link>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <Link to={`/${player.sport || 'handbolti'}`} className="hover:text-white transition-colors">{player.sport || 'Handbolti'}</Link>
                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                <span className="text-white">{player.name}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-white/40 text-7xl font-black italic tracking-tighter tabular-nums drop-shadow-sm">
                #{player.number || '--'}
              </span>
              <div className="h-12 w-1.5 bg-[#D4AF37] rounded-full"></div>
              <div>
                <span className="text-[#D4AF37] text-sm font-black uppercase tracking-[0.3em] block mb-1">
                  {player.position}
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none tracking-tighter">
                  {player.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STATISTICS GRID */}
      {player.stats ? (
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Sóknartölfræði - Sýnd fyrir alla leikmenn, en aðeins fyrir markmenn ef þeir hafa skorað/skotið */}
            {(!isGoalkeeper || (player.stats.offensive?.totalGoals > 0 || player.stats.offensive?.totalShots > 0)) && (
              <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#1c2c6c] p-6 flex justify-between items-center">
                  <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-white/80">sports_handball</span>
                    Sóknartölfræði
                  </h2>
                  <div className="bg-[#c8102e] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">Tímabilið 2026</div>
                </div>
                
                <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Leikir</span>
                    <span className="text-4xl font-black italic text-[#1c2c6c]">{player.stats.offensive?.gamesPlayed || player.stats.goalkeeper?.gamesPlayed || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Mörk</span>
                    <span className="text-4xl font-black italic text-[#c8102e]">{player.stats.offensive?.totalGoals || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Skot</span>
                    <span className="text-4xl font-black italic text-[#1c2c6c]">{player.stats.offensive?.totalShots || 0}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Nýting</span>
                    <span className="text-4xl font-black italic text-[#c8102e]">{player.stats.offensive?.shootingPercentage || '0%'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Varnartölfræði */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-[#c8102e] p-6 flex justify-between items-center">
                <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                  <span className="material-symbols-outlined text-white/80">shield</span>
                  Varnartölfræði
                </h2>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#c8102e]">
                    <span className="material-symbols-outlined">front_hand</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest block">Stöðvanir</span>
                    <span className="text-3xl font-black italic text-[#1c2c6c]">{player.stats.defensive?.legalStops || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#c8102e]">
                    <span className="material-symbols-outlined">pan_tool</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest block">Stolnir</span>
                    <span className="text-3xl font-black italic text-[#1c2c6c]">{player.stats.defensive?.steals || 0}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#c8102e]">
                    <span className="material-symbols-outlined">block</span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest block">Blokk</span>
                    <span className="text-3xl font-black italic text-[#1c2c6c]">{player.stats.defensive?.blockedShots || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Markvarsla */}
            {isGoalkeeper && player.stats.goalkeeper && (
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#D4AF37] p-6">
                  <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                    <span className="material-symbols-outlined text-white/80">sports_score</span>
                    Markvarsla
                  </h2>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Leikir</span>
                    <span className="text-5xl font-black italic text-[#1c2c6c]">{player.stats.goalkeeper.gamesPlayed || 0}</span>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center text-center p-6 bg-[#1c2c6c] rounded-3xl shadow-xl">
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Varin skot</span>
                    <span className="text-6xl font-black italic text-white drop-shadow-md">{player.stats.goalkeeper.totalSaves}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                    <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Prósenta</span>
                    <span className="text-5xl font-black italic text-[#c8102e]">{player.stats.goalkeeper.savePercentage || '0%'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-gray-200">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-4">info</span>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Engin leikjatölfræði skráð fyrir þennan prófíl</p>
          </div>
        </div>
      )}
    </main>
  );
}