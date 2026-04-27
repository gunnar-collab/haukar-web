import { useState } from 'react';
import { Link } from 'react-router-dom';
import leagueData from '../data/haukar_league_data.json';
import MatchReportModal from './sports/MatchReportModal';

export default function LeagueDashboard({ gender: propGender, onOpenTickets, sport = "handbolti" }) {
  const [internalGender, setInternalGender] = useState('karla');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showAllMatches, setShowAllMatches] = useState(false);

  const activeGender = propGender || internalGender;

  const activeKey = sport === 'handbolti' ? activeGender : `${sport}_${activeGender}`;
  const currentData = leagueData[activeKey];

  // Logic to separate played games from upcoming games
  const playedMatches = currentData.matches.filter(m => m.score !== 'Næsti leikur' && m.score !== '- - -');
  // Reverse upcoming so the closest future game is at the top
  const upcomingMatches = currentData.matches.filter(m => m.score === 'Næsti leikur' || m.score === '- - -').reverse();
  
  const top3Played = playedMatches.slice(0, 3);
  const remainingMatches = [...upcomingMatches, ...playedMatches.slice(3)];

  const leagueName = sport === 'handbolti' ? 'Olís deildinni' : sport === 'fotbolti' ? 'deildinni' : 'Bónusdeildinni';
  const providerName = sport === 'handbolti' ? 'HBStatz' : sport === 'fotbolti' ? 'KSÍ' : 'KKÍ';

  const handleOpenReport = (match) => {
    setSelectedMatch(match);
    setIsReportOpen(true);
  };

  const handballScorers = [
    { name: "Freyr Aronsson", goals: 180, rank: 1, slug: "freyr-aronsson", position: "Skytta" },
    { name: "Skarphéðinn Ívar", goals: 130, rank: 2, slug: "skarphedinn-ivar", position: "Skytta" },
    { name: "Össur Haraldsson", goals: 100, rank: 3, slug: "ossur-haraldsson", position: "Skytta" },
    { name: "Birkir Snær", goals: 91, rank: 4, slug: "birkir-snaer", position: "Hornamaður" },
    { name: "Hergeir Grímsson", goals: 82, rank: 5, slug: "hergeir-grimsson", position: "Skytta" }
  ];

  const footballScorers = [
    { name: "Kristín Lind", goals: 11, rank: 1, slug: "kristin-lind", position: "Sóknarmaður" },
    { name: "Birta Rós", goals: 4, rank: 2, slug: "birta-ros", position: "Miðjumaður" },
    { name: "Katrín María", goals: 3, rank: 3, slug: "katrin-maria", position: "Kantmaður" },
    { name: "Sigurður Hrannar", goals: 2, rank: 4, slug: "sigurdur-hrannar", position: "Sóknarmaður" },
    { name: "Daði Snær", goals: 1, rank: 5, slug: "dadi-snaer", position: "Sóknarmaður" }
  ];

  const basketballScorers = [
    { name: "Keira Robinson", goals: 22.4, rank: 1, slug: "keira-renee-robinson", position: "Bakvörður" },
    { name: "Everage Richardson", goals: 21.4, rank: 2, slug: "everage-richardson", position: "Bakvörður" },
    { name: "David Okeke", goals: 18.5, rank: 3, slug: "david-okeke", position: "Miðherji" },
    { name: "Krystal Freeman", goals: 16.8, rank: 4, slug: "krystal-jade-freeman", position: "Framherji" },
    { name: "Lore Devos", goals: 15.4, rank: 5, slug: "lore-devos", position: "Framherji" }
  ];

  const scorers = sport === 'handbolti' ? handballScorers : sport === 'fotbolti' ? footballScorers : basketballScorers;
  const pointType = sport === 'korfubolti' ? 'Stig' : 'Mörk';

  const getVenue = (homeTeam) => {
    if (homeTeam.includes('Haukar')) return 'Ásvellir';
    const venues = {
      'Grótta': 'Vivaldivöllurinn',
      'Víkingur Ó.': 'Ólafsvíkurvöllur',
      'Ægir': 'Þorlákshafnarvöllur',
      'Þróttur Vogum': 'Vogabæjarvöllur',
      'Kormákur/Hvöt': 'Hvammstangavöllur',
      'Dalvík/Reynir': 'Dalvíkurvöllur',
      'KFA': 'Fjarðabyggðarhöllin',
      'Kári': 'Akraneshöllin',
      'KFG': 'Samsung völlurinn',
      'Víðir': 'Nesfisk-völlurinn',
      'Höttur/Huginn': 'Vilhjálmsvöllur',
      'Selfoss': 'JÁVERK-völlurinn',
      'Víkingur R.': 'Víkingsvöllur',
      'Afturelding': 'Malbikstöðin að Varmá',
      'FHL': 'Fjarðabyggðarhöllin',
      'HK': 'Kórinn',
      'ÍR': 'ÍR-völlurinn',
      'Fram': 'Lambhagavöllurinn',
      'Valur': 'N1-völlurinn Hlíðarenda',
      'FH': 'Kaplakrikavöllur',
      'Stjarnan': 'Samsung völlurinn',
      'KA': 'Greifavöllurinn',
      'ÍBV': 'Hásteinsvöllur'
    };
    return venues[homeTeam] || 'Útivöllur';
  };

  return (
    <section className="w-full py-12 md:py-24 bg-white font-sans selection:bg-[#1c2c6c] selection:text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[#c8102e] text-sm font-black uppercase tracking-[0.3em] mb-3 block">
              Staðan & Leikir
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-[#1c2c6c] uppercase tracking-tighter italic leading-none mb-6">
              Deildin og úrslit
            </h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              Fylgstu með gengi Hauka í {leagueName}. Hér sérðu nýjustu úrslit, næstu leiki og stöðuna í deildinni í rauntíma.
            </p>
          </div>

          {/* Gender Toggle - Only show if not controlled by prop */}
          {!propGender && (
            <div className="flex bg-gray-100 p-1.5 rounded-2xl shadow-inner mb-2">
              <button 
                onClick={() => setInternalGender('karla')}
                className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeGender === 'karla' ? 'bg-[#1c2c6c] text-white shadow-lg' : 'text-gray-400 hover:text-[#1c2c6c]'
                }`}
              >
                M.fl. Karla
              </button>
              <button 
                onClick={() => setInternalGender('kvenna')}
                className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeGender === 'kvenna' ? 'bg-[#1c2c6c] text-white shadow-lg' : 'text-gray-400 hover:text-[#1c2c6c]'
                }`}
              >
                M.fl. Kvenna
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 1. STANDINGS TABLE - High Detail (2/3 width) */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-2xl h-full flex flex-col transition-all hover:shadow-[#1c2c6c]/5">
              <div className="bg-[#1c2c6c] p-7 flex justify-between items-center">
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#D4AF37] text-2xl">leaderboard</span>
                  Staðan í deildinni
                </h3>
                <div className="hidden md:flex gap-4">
                   <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Úrslitakeppni</span>
                   </div>
                </div>
              </div>
              <div className="overflow-x-auto flex-grow">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-4 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Röð</th>
                      <th className="px-4 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Lið</th>
                      <th className="px-4 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">L</th>
                      <th className="px-4 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">U</th>
                      <th className="px-4 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Stig</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.standings.map((team, idx) => (
                      <tr 
                        key={idx} 
                        className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${
                          team.team.includes('Haukar') ? 'bg-[#c8102e]/5' : ''
                        }`}
                      >
                        <td className="px-4 md:px-8 py-6">
                          <span className={`w-7 h-7 flex items-center justify-center rounded-full text-[11px] font-black ${
                            team.rank <= 4 ? 'bg-[#D4AF37] text-white shadow-sm' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {team.rank}
                          </span>
                        </td>
                        <td className="px-4 md:px-8 py-6">
                          <div className="flex items-center gap-3">
                            {team.team.includes('Haukar') && (
                              <img src="/images/logo.png" alt="" className="w-6 h-6 object-contain" />
                            )}
                            <span className={`font-black uppercase italic tracking-tight text-sm md:text-base ${
                              team.team.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]'
                            }`}>
                              {team.team}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 md:px-8 py-6 text-center font-bold text-gray-400">{team.played}</td>
                        <td className="px-4 md:px-8 py-6 text-center font-bold text-gray-400">{team.wins ?? 0}</td>
                        <td className="px-4 md:px-8 py-6 text-center">
                          <span className="font-black text-[#1c2c6c] text-lg bg-gray-100 px-4 py-1.5 rounded-xl shadow-inner inline-block min-w-[50px]">
                            {team.points}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center border-t border-gray-100 italic">
                Uppfært rauntíma frá {providerName} Data Engine
              </div>
            </div>
          </div>

          {/* 2. SIDEBAR - Stacked Boxes (1/3 width) */}
          <div className="lg:col-span-1 flex flex-col gap-6 h-full">
            
            {/* Recent Results */}
            <div className="bg-[#c8102e] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group flex-1 flex flex-col justify-between">
              <div className="absolute -top-12 -right-12 opacity-10 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-1000">
                <span className="material-symbols-outlined text-[180px]">history</span>
              </div>
              
              <div className="relative z-10 flex-grow">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em]">Nýjustu Úrslit</h3>
                  <span className="bg-white/10 text-[9px] font-black px-2 py-1 rounded uppercase backdrop-blur-sm">
                    {showAllMatches ? 'Allt Tímabilið' : 'Seinustu 3'}
                  </span>
                </div>
                
                {/* The Visible Matches (Always Top 3 Played) */}
                <div className="space-y-6 relative z-10">
                  {top3Played.map((match, idx) => (
                    <div 
                      key={idx} 
                      className="group/match cursor-pointer"
                      onClick={() => handleOpenReport(match)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{match.date}</span>
                          <span className="w-1 h-1 rounded-full bg-white/20"></span>
                          <span className="text-[9px] font-black text-white/40 uppercase">Sjá skýrslu</span>
                        </div>
                        <span className="text-[9px] font-black text-[#D4AF37] uppercase">{match.competition}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 min-w-0 pr-2">
                          <p className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight truncate ${match.home === 'Haukar' ? 'text-white' : 'text-white/70'}`} title={match.home}>{match.home}</p>
                          <p className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight truncate ${match.away === 'Haukar' ? 'text-white' : 'text-white/70'}`} title={match.away}>{match.away}</p>
                        </div>
                        <div className="bg-white text-[#c8102e] px-4 py-2 rounded-2xl font-black italic shadow-xl text-base group-hover/match:scale-110 transition-transform min-w-[75px] text-center shrink-0">
                          {match.score.replace(/\(\d+\)/g, '').trim()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* The Expanding Accordion for the Rest of the Season (Upcoming + History) */}
                <div className="relative">
                  <div className={`accordion-content ${showAllMatches ? 'expanded mt-8' : ''}`}>
                    <div className={`accordion-inner space-y-10 pb-10 max-h-[700px] overflow-y-auto pr-3 match-scrollbar overscroll-contain`}>
                      
                      {/* Section: Upcoming Matches */}
                      {upcomingMatches.length > 0 && (
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 px-1 border-l-2 border-[#D4AF37] ml-1">Næstu Leikir</h4>
                          <div className="space-y-6">
                            {upcomingMatches.map((match) => (
                              <div 
                                key={`${match.date}-${match.home}-upcoming`} 
                                className="group/match cursor-pointer opacity-0 match-item-enter"
                                onClick={() => handleOpenReport(match)}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{match.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span className="text-[9px] font-black text-white/40 uppercase">Leikvöllur</span>
                                  </div>
                                  <span className="text-[9px] font-black text-[#D4AF37] uppercase">{match.competition}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex-1 min-w-0 pr-2">
                                    <p className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight truncate ${match.home === 'Haukar' ? 'text-white' : 'text-white/70'}`}>{match.home}</p>
                                    <p className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight truncate ${match.away === 'Haukar' ? 'text-white' : 'text-white/70'}`}>{match.away}</p>
                                  </div>
                                  <a 
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(getVenue(match.home) + ', Iceland')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex items-center gap-1.5 text-white/40 hover:text-white transition-all cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[14px]">{match.home.includes('Haukar') ? 'home' : 'location_on'}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest underline decoration-transparent hover:decoration-white/30">{getVenue(match.home)}</span>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section: Past Matches (History) */}
                      {playedMatches.slice(3).length > 0 && (
                        <div>
                          <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40 mb-4 px-1 border-l-2 border-white/20 ml-1">Fyrri Leikir</h4>
                          <div className="space-y-6">
                            {playedMatches.slice(3).map((match) => (
                              <div 
                                key={`${match.date}-${match.home}-past`} 
                                className="group/match cursor-pointer opacity-0 match-item-enter"
                                onClick={() => handleOpenReport(match)}
                              >
                                <div className="flex justify-between items-center mb-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{match.date}</span>
                                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                    <span className="text-[9px] font-black text-white/40 uppercase">Sjá skýrslu</span>
                                  </div>
                                  <span className="text-[9px] font-black text-white/40 uppercase">{match.competition}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="flex-1 min-w-0 pr-2">
                                    <p className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight truncate ${match.home === 'Haukar' ? 'text-white' : 'text-white/70'}`}>{match.home}</p>
                                    <p className={`text-sm md:text-base font-black italic uppercase tracking-tighter leading-tight truncate ${match.away === 'Haukar' ? 'text-white' : 'text-white/70'}`}>{match.away}</p>
                                  </div>
                                  <div className="bg-white/10 text-white px-4 py-2 rounded-2xl font-black italic shadow-xl text-base group-hover/match:scale-105 transition-transform min-w-[75px] text-center border border-white/5">
                                    {match.score.replace(/\(\d+\)/g, '').trim()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowAllMatches(!showAllMatches)}
                  className="mt-8 w-full py-4 bg-white/10 hover:bg-white text-white hover:text-[#c8102e] border border-white/20 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {showAllMatches ? 'Sjá Minna' : 'Sjá alla leikjadagskrá'} 
                  <span className="material-symbols-outlined text-sm">{showAllMatches ? 'expand_less' : 'expand_more'}</span>
                </button>

                {/* Surprise: Top Scorers Widget */}
                <div className="mt-10 pt-8 border-t border-white/10">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-5 text-white/60 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    Markahæstu Haukar
                  </h4>
                  <div className="space-y-3">
                    {scorers.map((player, pIdx) => (
                      <Link 
                        to={`/leikmenn/${player.slug}`} 
                        key={pIdx} 
                        className={`flex items-center justify-between p-3 rounded-2xl border transition-all group/player ${
                          pIdx === 0 ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:translate-x-1' : 'hover:translate-x-1 border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1 mr-4">
                          <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg ${
                            pIdx === 0 ? 'bg-[#D4AF37]' : 'bg-white/5 text-white/50'
                          }`}>
                            {player.rank}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black uppercase italic tracking-tight group-hover/player:text-[#D4AF37] transition-colors truncate" title={player.name}>{player.name}</p>
                            <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest truncate">{player.position}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-black italic">{player.goals}</p>
                          <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{pointType}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Match Highlight */}
            <div className="bg-[#1c2c6c] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group">
               {/* Animated Background Element */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#1c2c6c] to-[#2a3b7d] z-0"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c8102e] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-[#D4AF37] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-10 shadow-lg">
                    Næsti Heimaleikur
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mb-10">
                    <div className="text-right">
                      <p className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">Haukar</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Heimalið</p>
                    </div>
                    <div className="text-[#D4AF37] font-black italic text-2xl animate-pulse">VS</div>
                    <div className="text-left">
                      <p className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white/70">
                        {sport === 'handbolti' ? 'Valur' : 'Grindavík'}
                      </p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Gestir</p>
                    </div>
                  </div>

                  <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 mb-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-[#D4AF37] text-sm">event</span>
                      <p className="text-xs font-black uppercase tracking-[0.2em]">
                        {sport === 'handbolti' ? 'Mánudagur 27. Apríl' : 'Laugardagur 2. Maí'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-[#D4AF37] text-sm">schedule</span>
                      <p className="text-xl font-black italic uppercase tracking-tighter">Kl. 19:15 • Ásvellir</p>
                    </div>
                  </div>

                  <button 
                    onClick={onOpenTickets}
                    className="w-full py-5 bg-[#c8102e] hover:bg-[#D4AF37] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl hover:shadow-[#D4AF37]/30 flex items-center justify-center gap-2 group/btn"
                  >
                    Saman á Ásvelli <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">confirmation_number</span>
                  </button>
               </div>
            </div>

          </div>

        </div>
      </div>

      <MatchReportModal 
        isOpen={isReportOpen} 
        onClose={() => setIsReportOpen(false)} 
        match={selectedMatch} 
      />
    </section>
  );
}
