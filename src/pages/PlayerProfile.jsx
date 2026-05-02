import { useEffect } from 'react';
import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { findPlayerBySlug, matchPlayerName } from '../lib/playerUtils';
import PlayerSpiderChart from '../components/sports/PlayerSpiderChart';
import leagueData from '../data/haukar_league_data.json';

/**
 * PlayerProfile - Sniðmát fyrir tölfræði leikmanna Hauka
 * Hannað fyrir tímabilið 2026 með gögnum frá HBStatz
 */
export default function PlayerProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();

  // Sjálfgefin gögn ef engin gögn berast
  let player = location.state?.player;
  if (!player || !player.sport || !player.gender) {
    const fullPlayer = findPlayerBySlug(slug);
    if (fullPlayer) {
        player = player ? { ...fullPlayer, ...player } : fullPlayer;
    }
  }

  // Try to auto-fetch from league data to override mock data
  if (player) {
    if (player.sport === 'handbolti' || player.sport === 'fotbolti') {
        const teamKey = player.team || player.gender || 'karla';
        const statsSource = player.sport === 'handbolti'
            ? (teamKey === 'karla' ? leagueData.karla?.player_stats : leagueData.kvenna?.player_stats)
            : (teamKey === 'karla' ? leagueData.fotbolti_karla?.player_stats : leagueData.fotbolti_kvenna?.player_stats);

        if (statsSource) {
            const match = statsSource.find(stat => matchPlayerName(stat.name, player.name));
            if (match && match.stats) {
                player = { ...player, stats: { ...match.stats } };
                player.stats.gamesPlayed = match.gamesPlayed !== undefined ? match.gamesPlayed : match.stats.gamesPlayed; 
            }
        }
    }
  }

  if (!player) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
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
  const isFootball = player.stats?.sport === 'fotbolti' || player.sport === 'fotbolti';
  const isBasketball = player.stats?.sport === 'korfubolti' || player.sport === 'korfubolti';

  return (
    <main className="w-full min-h-screen bg-white font-sans pb-24 selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[55vh] min-h-[450px] bg-[#c8102e] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c6c] via-[#c8102e]/80 to-transparent z-10"></div>
        
        <img 
          src={player.img} 
          alt={player.name}
          className="absolute right-0 top-0 w-full md:w-3/5 h-full object-cover object-top z-0 opacity-100"
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
                <Link to={`/leikmannahopur?sport=${player.sport || 'handbolti'}&gender=${player.team || player.gender || 'karla'}`} className="hover:text-white transition-colors">Hópurinn</Link>
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
            
            {/* --- KÖRFUBOLTI TÖLFRÆÐI --- */}
            {isBasketball ? (
              <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-[#1c2c6c] p-8 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#c8102e] rounded-2xl flex items-center justify-center shadow-lg transform -rotate-6">
                      <span className="material-symbols-outlined text-white text-3xl">sports_basketball</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-tight">Leikgreining</h2>
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">2025-2026 | KKÍ Live</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 text-center">
                      <span className="block text-white/40 text-[9px] font-black uppercase mb-1">Framlag (EFF)</span>
                      <span className="text-2xl font-black italic text-[#D4AF37]">{player.stats.eff || '--'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-10 grid grid-cols-2 md:grid-cols-4 gap-12">
                  <div className="flex flex-col items-center justify-center text-center group">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 group-hover:text-[#c8102e] transition-colors">Stig í leik</span>
                    <div className="relative">
                      <span className="text-6xl font-black italic text-[#1c2c6c] tabular-nums leading-none">{player.stats.pts || 0}</span>
                      <div className="absolute -right-4 -top-2 w-3 h-3 bg-[#c8102e] rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center group">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 group-hover:text-[#c8102e] transition-colors">Fráköst</span>
                    <span className="text-6xl font-black italic text-[#c8102e] tabular-nums leading-none">{player.stats.reb || 0}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center group">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 group-hover:text-[#c8102e] transition-colors">Stoðsendingar</span>
                    <span className="text-6xl font-black italic text-[#1c2c6c] tabular-nums leading-none">{player.stats.ast || 0}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center group">
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em] mb-3 group-hover:text-[#c8102e] transition-colors">Mínútur</span>
                    <span className="text-6xl font-black italic text-[#c8102e] tabular-nums leading-none">{player.stats.mpg || '--'}</span>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-center">
                   <p className="text-gray-400 text-[10px] font-bold italic uppercase tracking-widest">Gögnum streymt frá KKÍ.is • Uppfært í dag</p>
                </div>
              </div>
            ) : isFootball ? (
              /* --- FÓTBOLTI TÖLFRÆÐI --- */
              <>
                {/* Spil & Sókn */}
                {(!isGoalkeeper || (player.stats.goals > 0)) && (
                  <div className="lg:col-span-1 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="bg-[#1c2c6c] p-6 flex justify-between items-center">
                      <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-white/80">sports_soccer</span>
                        Tölfræði
                      </h2>
                      <div className="bg-[#c8102e] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">2026 Season</div>
                    </div>
                    
                    <div className="flex-1 p-8 grid grid-cols-3 gap-4 items-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Leikir</span>
                        <span className="text-5xl font-black italic text-[#1c2c6c]">{player.stats.gamesPlayed || 0}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center border-x border-gray-100 h-full">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Byrjunarlið</span>
                        <span className="text-5xl font-black italic text-[#1c2c6c]">{player.stats.starts || 0}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Mörk</span>
                        <span className="text-5xl font-black italic text-[#c8102e]">{player.stats.goals || 0}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Agabrot */}
                {!isGoalkeeper && (
                  <div className="lg:col-span-1 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden flex flex-col h-full">
                    <div className="bg-[#c8102e] p-6 flex justify-between items-center">
                      <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-white/80">style</span>
                        Agabrot
                      </h2>
                    </div>
                    
                    <div className="flex-1 p-8 grid grid-cols-2 gap-4 items-center">
                      <div className="flex flex-col items-center justify-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Gul spjöld</span>
                        <span className="text-5xl font-black italic text-[#FAC83C]">{player.stats.yellowCards || 0}</span>
                      </div>

                      <div className="flex flex-col items-center justify-center text-center border-l border-gray-100 h-full">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Rauð spjöld</span>
                        <span className="text-5xl font-black italic text-[#D80707]">{player.stats.redCards || 0}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Markvarsla (Fótbolti) */}
                {isGoalkeeper && (
                  <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-[#D4AF37] p-6">
                      <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-white/80">sports_score</span>
                        Markvarsla
                      </h2>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-50 rounded-3xl border border-gray-100">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Leikir spilaðir</span>
                        <span className="text-5xl font-black italic text-[#1c2c6c]">{player.stats.gamesPlayed || 0}</span>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center text-center p-6 bg-[#1c2c6c] rounded-3xl shadow-xl">
                        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">Haldið hreinu (Clean Sheets)</span>
                        <span className="text-6xl font-black italic text-white drop-shadow-md">{player.stats.cleanSheets || 0}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* --- HANDBOLTI TÖLFRÆÐI --- */
              <>
                {/* Sóknartölfræði */}
                {!isGoalkeeper && (
                  <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="bg-[#1c2c6c] p-6 flex justify-between items-center">
                      <h2 className="text-xl font-black italic text-white uppercase tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-white/80">sports_handball</span>
                        Sóknartölfræði
                      </h2>
                      <div className="bg-[#c8102e] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">2026</div>
                    </div>
                    
                    <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="flex flex-col items-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Leikir</span>
                        <span className="text-4xl font-black italic text-[#1c2c6c]">{player.stats.offensive?.gamesPlayed || player.stats.goalkeeper?.gamesPlayed || 0}</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Mörk</span>
                        <span className="text-4xl font-black italic text-[#c8102e]">{player.stats.offensive?.totalGoals || 0}</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Skot</span>
                        <span className="text-4xl font-black italic text-[#1c2c6c]">{player.stats.offensive?.totalShots || 0}</span>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">Nýting</span>
                        <span className="text-4xl font-black italic text-[#c8102e]">{player.stats.offensive?.shootingPercentage || '0%'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Varnartölfræði */}
                {!isGoalkeeper && (
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
                )}

                {/* Markvarsla (Handbolti) */}
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
              </>
            )}
          </div>
        </div>
      ) : null}

      {/* 2.5 PLAYER BIO & INSIGHTS */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bio Text */}
          <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-[#c8102e] text-3xl">history_edu</span>
              <h3 className="text-2xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">Saga & Ferill</h3>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg font-medium mb-6">
                {player.bio || `${player.name} er einn af lykilmönnum Hauka á yfirstandandi tímabili. Með gífurlega reynslu og leikskilning hefur ${player.name.split(' ')[0]} sýnt mikla leiðtogahæfileika bæði innan sem utan vallar. Uppalin(n) í félaginu og hefur ávallt lagt metnað sinn í að bera merki Hauka með stolti.`}
              </p>
              <p className="text-gray-500 leading-relaxed italic">
                „Metnaður, vinnusemi og liðsheild eru gildi sem ég legg áherslu á í hverjum einasta leik hér á Ásvöllum.“
              </p>
            </div>
          </div>

          {/* Pro Insight / Fun Fact */}
          <div className="bg-[#1c2c6c] rounded-[2.5rem] p-10 shadow-xl text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-[#c8102e] rounded-xl flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined">insights</span>
                </div>
                <h4 className="text-xl font-bold uppercase tracking-widest">Leikgreining</h4>
              </div>
              
              {!player.stats ? (
                <div className="mt-8 flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                  <span className="material-symbols-outlined text-white/30 text-5xl mb-4">query_stats</span>
                  <p className="text-white/60 font-medium italic text-sm">Tölfræði er í vinnslu eða ekki aðgengileg fyrir yfirstandandi mót.</p>
                </div>
              ) : !isFootball ? (
                <div className="-mx-6">
                  <PlayerSpiderChart player={player} />
                </div>
              ) : (
                <div className="space-y-6 mt-6">
                  <div>
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Styrkleikar</p>
                    <p className="text-sm font-medium">Framúrskarandi {player.position?.toLowerCase()} með mikla yfirsýn og öryggi í sínum aðgerðum.</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Tölfræði moli</p>
                    <p className="text-sm font-medium">Hefur tekið þátt í {player.gamesPlayed || player.stats?.gamesPlayed || player.stats?.offensive?.gamesPlayed || player.stats?.goalkeeper?.gamesPlayed || 0} leikjum og er mikilvægur hlekkur í liðinu.</p>
                  </div>
                </div>
              )}
            </div>
            {/* Background design */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#c8102e] rounded-full blur-3xl opacity-20"></div>
          </div>
        </div>
      </section>

      {/* 3. SPONSOR CTA (Domino's) */}
      <section className="max-w-7xl mx-auto px-6 mt-16">
        <div className="bg-[#006491] rounded-[3rem] p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/4 h-full bg-[#E31937] skew-x-[-15deg] translate-x-12 opacity-20"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
            <div className="w-40 h-24 flex items-center justify-center p-2">
              <img 
                src="/images/sponsors/dominos-logo.svg" 
                alt="Domino's Logo" 
                className="w-full h-auto"
              />
            </div>
            <div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-[0.2em] mb-2">Bakhjarl leikmanns</p>
              <h3 className="text-3xl lg:text-4xl font-black italic text-white uppercase tracking-tighter leading-none mb-2">
                Leikmaðurinn er í <br className="hidden md:block" /> boði <span className="text-[#E31937]">Domino's</span>
              </h3>
              <p className="text-white/70 text-sm font-medium">Uppáhalds matur okkar eftir leik! Notaðu afsláttarkóðann þinn í Abler.</p>
            </div>
          </div>

          <div className="relative z-10">
            <a href="https://www.dominos.is" target="_blank" rel="noopener noreferrer">
              <button className="bg-[#E31937] text-white font-black px-10 py-5 rounded-2xl hover:bg-red-700 transition-all shadow-xl hover:shadow-[#E31937]/40 uppercase tracking-widest flex items-center gap-3 active:scale-95 group">
                <span className="material-symbols-outlined group-hover:rotate-12 transition-transform">local_pizza</span>
                Panta pizzu
              </button>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}