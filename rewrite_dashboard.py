import os

with open('src/components/LeagueDashboard.jsx', 'r') as f:
    content = f.read()

# 1. State changes
content = content.replace(
    "const [showAllMatches, setShowAllMatches] = useState(false);",
    "const [activeTab, setActiveTab] = useState('stadan');"
)
content = content.replace(
    "const top3Played = playedMatches.slice(0, 3);\n  const remainingMatches = [...upcomingMatches, ...playedMatches.slice(3)];",
    ""
)

# 2. Find Standings Table
start_standings = content.find('<div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-2xl h-full flex flex-col transition-all hover:shadow-[#1c2c6c]/5">')
end_standings_marker = 'Uppfært rauntíma frá {providerName} Data Engine\n              </div>\n            </div>'
end_standings = content.find(end_standings_marker) + len(end_standings_marker)

standings_html = content[start_standings:end_standings]

# 3. Find Layout Block
start_layout = content.find('<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">')
end_layout = content.find('</div>\n      </div>\n\n      <MatchReportModal')

new_ui = """
        {/* Tabs Header */}
        <div className="flex justify-center mb-10">
          <div className="bg-gray-100 p-1.5 rounded-2xl inline-flex flex-wrap justify-center gap-1 shadow-inner">
            <button 
              onClick={() => setActiveTab('stadan')} 
              className={`px-6 md:px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'stadan' ? 'bg-white text-[#1c2c6c] shadow-sm' : 'text-gray-400 hover:text-[#1c2c6c]'}`}
            >
              Staðan í deildinni
            </button>
            <button 
              onClick={() => setActiveTab('leikir')} 
              className={`px-6 md:px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'leikir' ? 'bg-[#c8102e] text-white shadow-sm' : 'text-gray-400 hover:text-[#c8102e]'}`}
            >
              Leikjaplan
            </button>
            <button 
              onClick={() => setActiveTab('tolfraedi')} 
              className={`px-6 md:px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'tolfraedi' ? 'bg-[#1c2c6c] text-white shadow-sm' : 'text-gray-400 hover:text-[#1c2c6c]'}`}
            >
              Tölfræði
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Content Area (2/3 width) */}
          <div className="lg:col-span-2 h-[600px]">
            {activeTab === 'stadan' && (
              STANDINGS_PLACEHOLDER
            )}

            {activeTab === 'leikir' && (
              <div className="bg-[#c8102e] rounded-[2rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col h-full animate-[matchStagger_0.4s_ease-out_forwards]">
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
                                {match.score.replace(r'\(.*?\)', '').strip()}
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
              <div className="bg-gradient-to-br from-[#1c2c6c] to-[#0a1128] rounded-[2rem] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col h-full animate-[matchStagger_0.4s_ease-out_forwards]">
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
            <div className="bg-[#1c2c6c] rounded-[2rem] p-10 text-white shadow-2xl relative overflow-hidden group h-[600px] flex flex-col justify-center">
               {/* Animated Background Element */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#1c2c6c] to-[#2a3b7d] z-0"></div>
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#c8102e] rounded-full blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
               
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-[#D4AF37] text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-10 shadow-lg">
                    Næsti Heimaleikur
                  </div>
                  
                  <div className="flex items-center justify-center gap-6 mb-10 w-full">
                    <div className="flex-1 text-right min-w-0">
                      <p className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter truncate" title="Haukar">Haukar</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Heimalið</p>
                    </div>
                    <div className="text-[#D4AF37] font-black italic text-2xl animate-pulse shrink-0">VS</div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white/70 truncate" title={sport === 'handbolti' ? 'Valur' : 'Grindavík'}>
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
"""

new_ui = new_ui.replace("STANDINGS_PLACEHOLDER", standings_html)
# Because I used r'\(.*?\)' inside JS string replacement, let's fix it for React!
new_ui = new_ui.replace("match.score.replace(r'\\(.*?\\)', '').strip()", "match.score.replace(/\\(\\d+\\)/g, '').trim()")

content = content[:start_layout] + new_ui + '\n' + content[end_layout:]

with open('src/components/LeagueDashboard.jsx', 'w') as f:
    f.write(content)

