import { useState } from 'react';
import { Link } from 'react-router-dom';
import leagueData from '../data/haukar_league_data.json';
import MatchReportModal from './sports/MatchReportModal';
import { getAllPlayers, matchPlayerName } from '../lib/playerUtils';
import { parseMatchDate } from '../utils/globalMatchUtils';

export default function LeagueDashboard({ gender: propGender, onOpenTickets, sport = "handbolti" }) {
  const [internalGender, setInternalGender] = useState('karla');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('stadan');

  const activeGender = propGender || internalGender;

  const activeKey = sport === 'handbolti' ? activeGender : `${sport}_${activeGender}`;
  const currentData = leagueData[activeKey];

  const isMeistaraflokkur = (match) => {
    return !(/\d\.\s*flokkur|U\d{2}/i.test(match.competition || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.home || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.away || ''));
  };

  const seniorMatches = currentData?.matches ? currentData.matches.filter(isMeistaraflokkur) : [];

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  // Logic to separate played games from upcoming games
  const playedMatches = seniorMatches.filter(m => m.score && m.score !== 'Næsti leikur' && m.score !== '- - -' && m.score !== '-');
  
  const upcomingMatches = seniorMatches.filter(m => {
    const matchDate = parseMatchDate(m.date);
    return (m.score === 'Næsti leikur' || m.score === '- - -' || m.score === '-' || !m.score) && matchDate >= now;
  }).sort((a, b) => parseMatchDate(a.date) - parseMatchDate(b.date));

  const nextHomeMatch = upcomingMatches.find(m => m.home.includes('Haukar')) || upcomingMatches[0];
  console.log('LeagueDashboard DEBUG: ' + JSON.stringify({ activeKey, sport, activeGender, seniorMatchesCount: seniorMatches.length, upcomingMatchesCount: upcomingMatches.length, nextHomeMatch }));

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

  let scorers = sport === 'handbolti' ? handballScorers : sport === 'fotbolti' ? footballScorers : basketballScorers;
  const pointType = sport === 'korfubolti' ? 'Stig' : 'Mörk';

  if (currentData && currentData.player_stats && currentData.player_stats.length > 0) {
      const sortedStats = [...currentData.player_stats].sort((a, b) => {
          const goalsA = sport === 'handbolti' ? (a.stats?.offensive?.totalGoals || 0) : (sport === 'korfubolti' ? (a.stats?.pts || 0) : (a.stats?.goals || 0));
          const goalsB = sport === 'handbolti' ? (b.stats?.offensive?.totalGoals || 0) : (sport === 'korfubolti' ? (b.stats?.pts || 0) : (b.stats?.goals || 0));
          return goalsB - goalsA;
      });
      
      const topScorers = [];
      let rank = 1;
      const allPlayers = getAllPlayers();
      
      for (const stat of sortedStats) {
          if (topScorers.length >= 5) break;
          const goals = sport === 'handbolti' ? (stat.stats?.offensive?.totalGoals || 0) : (sport === 'korfubolti' ? (stat.stats?.pts || 0) : (stat.stats?.goals || 0));
          if (goals === 0) continue; 
          const matchedPlayer = allPlayers.find(p => p.sport === sport && p.gender === activeGender && matchPlayerName(p.name, stat.name));
          topScorers.push({
              name: matchedPlayer ? matchedPlayer.name : stat.name,
              goals: goals,
              rank: rank++,
              slug: matchedPlayer ? matchedPlayer.slug : stat.name.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
              position: matchedPlayer ? matchedPlayer.position : (sport === 'korfubolti' ? "Leikmaður" : "Útileikmaður"),
              fullPlayer: matchedPlayer ? { ...matchedPlayer, sport } : null
          });
      }
      
      if (topScorers.length > 0) {
          scorers = topScorers;
      }
  }

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

  const formatFullDate = (dateObj) => {
    if (!dateObj) return '';
    const days = ['Sunnudagur', 'Mánudagur', 'Þriðjudagur', 'Miðvikudagur', 'Fimmtudagur', 'Föstudagur', 'Laugardagur'];
    const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
    return `${days[dateObj.getDay()]} ${dateObj.getDate()}. ${months[dateObj.getMonth()]}`;
  };

  const formatTime = (dateObj) => {
    if (!dateObj) return '';
    const h = dateObj.getHours().toString().padStart(2, '0');
    const m = dateObj.getMinutes().toString().padStart(2, '0');
    return h === '00' && m === '00' ? '19:15' : `${h}:${m}`;
  };

  const formatShortDate = (dateObj) => {
    if (!dateObj) return '';
    const days = ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'];
    const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
    const time = formatTime(dateObj);
    return `${days[dateObj.getDay()]} ${dateObj.getDate()}. ${months[dateObj.getMonth()]} • ${time}`;
  };

  return (
    <section className="w-full py-8 md:py-16 bg-white font-sans selection:bg-[#1c2c6c] selection:text-white overflow-hidden">
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

        
        {/* Tabs Header */}
        <div className="flex justify-center mb-10 w-full overflow-hidden">
          <div className="w-full overflow-x-auto pb-4 -mb-4 hide-scrollbar flex justify-start md:justify-center">
            <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex flex-nowrap shrink-0 gap-1 shadow-inner mx-auto">
              <button 
                onClick={() => setActiveTab('leikir')} 
                className={`px-4 sm:px-6 md:px-8 py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'leikir' ? 'bg-[#c8102e] text-white shadow-sm' : 'text-gray-400 hover:text-[#c8102e]'}`}
              >
                Leikjaplan
              </button>
              <button 
                onClick={() => setActiveTab('stadan')} 
                className={`px-4 sm:px-6 md:px-8 py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'stadan' ? 'bg-white text-[#1c2c6c] shadow-sm' : 'text-gray-400 hover:text-[#1c2c6c]'}`}
              >
                Staðan í deildinni
              </button>
              <button 
                onClick={() => setActiveTab('tolfraedi')} 
                className={`px-4 sm:px-6 md:px-8 py-3 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === 'tolfraedi' ? 'bg-[#1c2c6c] text-white shadow-sm' : 'text-gray-400 hover:text-[#1c2c6c]'}`}
              >
                Tölfræði
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Area (2/3 width) */}
          <div className="lg:col-span-2 h-[600px]">
            {activeTab === 'stadan' && (
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-2xl h-full flex flex-col transition-all hover:shadow-[#1c2c6c]/5">
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
                <table className="w-full text-left min-w-[320px]">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-2 sm:px-4 md:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">Röð</th>
                      <th className="px-2 sm:px-4 md:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400">Lið</th>
                      <th className="px-2 sm:px-4 md:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">L</th>
                      <th className="px-2 sm:px-4 md:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">U</th>
                      <th className="px-2 sm:px-4 md:px-8 py-4 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Stig</th>
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
                        <td className="px-2 sm:px-4 md:px-8 py-4 sm:py-5">
                          <span className={`w-5 h-5 sm:w-7 sm:h-7 flex items-center justify-center rounded-full text-[9px] sm:text-[11px] font-black ${
                            team.rank <= 4 ? 'bg-[#D4AF37] text-white shadow-sm' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {team.rank}
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 md:px-8 py-4 sm:py-5">
                          <div className="flex items-center gap-2 sm:gap-3">
                            {team.team.includes('Haukar') && (
                              <img src="/images/logo.png" alt="" className="w-4 h-4 sm:w-6 sm:h-6 object-contain shrink-0" />
                            )}
                            <span className={`font-black uppercase italic tracking-tight text-[11px] sm:text-sm md:text-base whitespace-nowrap ${
                              team.team.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]'
                            }`}>
                              {team.team}
                            </span>
                          </div>
                        </td>
                        <td className="px-2 sm:px-4 md:px-8 py-4 sm:py-5 text-center font-bold text-gray-400 text-[11px] sm:text-sm">{team.played}</td>
                        <td className="px-2 sm:px-4 md:px-8 py-4 sm:py-5 text-center font-bold text-gray-400 text-[11px] sm:text-sm">{team.wins ?? 0}</td>
                        <td className="px-2 sm:px-4 md:px-8 py-4 sm:py-5 text-center">
                          <span className="font-black text-[#1c2c6c] text-[11px] sm:text-lg bg-gray-100 px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg sm:rounded-xl shadow-inner inline-block min-w-[35px] sm:min-w-[50px]">
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
            )}

            {activeTab === 'leikir' && (
              <div className="bg-[#c8102e] rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col h-full animate-[matchStagger_0.4s_ease-out_forwards]">
                <div className="absolute -top-12 -right-12 opacity-10 transform rotate-12 transition-all duration-1000">
                  <span className="material-symbols-outlined text-[180px]">history</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight italic mb-8 relative z-10 border-b border-white/20 pb-4">
                  Leikjaplan & Úrslit
                </h3>

                <div className="overflow-y-auto flex-grow match-scrollbar pr-4 relative z-10 space-y-10">
                  {/* Section: Upcoming Matches */}
                  {upcomingMatches.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-4 px-1 border-l-2 border-[#D4AF37] ml-1">Næstu Leikir</h4>
                      <div className="space-y-4">
                        {upcomingMatches.map((match) => (
                          <div 
                            key={`${match.date}-${match.home}-upcoming`} 
                            className="group/match cursor-pointer opacity-100"
                            onClick={() => handleOpenReport(match)}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{formatShortDate(parseMatchDate(match.date))}</span>
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
                                className="flex items-center gap-1.5 text-white/40 hover:text-white transition-all cursor-pointer bg-white/5 px-3 py-2 rounded-xl"
                              >
                                <span className="material-symbols-outlined text-[14px]">{match.home.includes('Haukar') ? 'home' : 'location_on'}</span>
                                <span className="text-[9px] font-bold uppercase tracking-widest">{getVenue(match.home)}</span>
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Section: Past Matches (History) */}
                  {playedMatches.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-4 px-1 border-l-2 border-white/20 ml-1">Fyrri Leikir</h4>
                      <div className="space-y-4">
                        {playedMatches.map((match) => (
                          <div 
                            key={`${match.date}-${match.home}-past`} 
                            className="group/match cursor-pointer opacity-100"
                            onClick={() => handleOpenReport(match)}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">{formatShortDate(parseMatchDate(match.date))}</span>
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
            )}

            {activeTab === 'tolfraedi' && (
              <div className="bg-gradient-to-br from-[#1c2c6c] to-[#0a1128] rounded-2xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col h-full animate-[matchStagger_0.4s_ease-out_forwards]">
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <span className="material-symbols-outlined text-[180px]">workspace_premium</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight italic mb-8 relative z-10 border-b border-white/20 pb-4">
                  Markahæstu Leikmenn
                </h3>
                
                <div className="space-y-4 relative z-10 overflow-y-auto match-scrollbar pr-2 flex-grow">
                  {scorers.map((player, pIdx) => (
                    <Link 
                      to={`/leikmenn/${player.slug}`} 
                      state={player.fullPlayer ? { player: player.fullPlayer } : undefined}
                      key={pIdx} 
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all group/player ${
                        pIdx === 0 ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:translate-x-1 shadow-lg' : 'bg-white/5 border-white/5 hover:translate-x-1 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0 flex-1 mr-4">
                        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg ${
                          pIdx === 0 ? 'bg-[#D4AF37]' : 'bg-[#1c2c6c]/50 text-white/70'
                        }`}>
                          {player.rank}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm md:text-base font-black uppercase italic tracking-tight transition-colors truncate ${pIdx === 0 ? 'text-[#D4AF37]' : 'group-hover/player:text-[#D4AF37]'}`} title={player.name}>{player.name}</p>
                          <p className="text-[9px] md:text-[10px] font-bold text-white/50 uppercase tracking-widest truncate">{player.position}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`text-lg md:text-xl font-black italic ${pIdx === 0 ? 'text-white' : 'text-white/90'}`}>{player.goals}</p>
                        <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{pointType}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Area (1/3 width) */}
          <div className="lg:col-span-1 flex flex-col h-full">
            {/* Next Match Highlight */}
            <div className="bg-[#1c2c6c] rounded-2xl p-6 lg:p-8 text-white shadow-2xl relative overflow-hidden group min-h-[400px] lg:h-[600px] flex flex-col justify-center">
               {/* Animated Background Element */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#1c2c6c] to-[#2a3b7d] z-0"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c8102e] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-[#D4AF37] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-10 shadow-lg">
                    {nextHomeMatch?.home?.includes('Haukar') ? 'Næsti Heimaleikur' : 'Næsti Leikur'}
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 lg:gap-4 mb-10 w-full px-2">
                    <div className="text-right shrink-0">
                      <p className={`text-2xl md:text-3xl lg:text-xl xl:text-2xl font-black italic uppercase tracking-tighter pr-1 ${nextHomeMatch?.home?.includes('Haukar') ? '' : 'text-white/70'}`} title={nextHomeMatch?.home || "Haukar"}>{nextHomeMatch?.home || "Haukar"}</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest pr-1">Heimalið</p>
                    </div>
                    <div className="text-[#D4AF37] font-black italic text-xl md:text-2xl animate-pulse shrink-0 px-1">VS</div>
                    <div className="text-left min-w-0 shrink">
                      <p className={`text-2xl md:text-3xl lg:text-xl xl:text-2xl font-black italic uppercase tracking-tighter truncate pr-2 ${nextHomeMatch?.away?.includes('Haukar') ? 'text-white' : 'text-white/70'}`} title={nextHomeMatch?.away || "Óstaðfestur"}>
                        {nextHomeMatch?.away || "Óstaðfestur"}
                      </p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Gestir</p>
                    </div>
                  </div>

                  <div className="w-full bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 mb-10">
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-[#D4AF37] text-sm">event</span>
                      <p className="text-xs font-black uppercase tracking-[0.2em]">
                        {nextHomeMatch && nextHomeMatch.date ? formatFullDate(parseMatchDate(nextHomeMatch.date)) : 'Dagsetning óstaðfest'}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className="material-symbols-outlined text-[#D4AF37] text-sm">schedule</span>
                      <p className="text-xl font-black italic uppercase tracking-tighter">{nextHomeMatch && nextHomeMatch.date ? `Kl. ${formatTime(parseMatchDate(nextHomeMatch.date))}` : 'Tími óstaðfestur'} • {nextHomeMatch ? getVenue(nextHomeMatch.home) : 'Ásvellir'}</p>
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
