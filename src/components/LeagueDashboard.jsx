import { useState } from 'react';
import leagueData from '../data/haukar_league_data.json';

export default function LeagueDashboard({ gender: propGender }) {
  const [internalGender, setInternalGender] = useState('karla');
  const activeGender = propGender || internalGender;

  const currentData = leagueData[activeGender];

  return (
    <section className="w-full py-24 bg-white font-sans selection:bg-[#1c2c6c] selection:text-white overflow-hidden">
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
              Fylgstu með gengi Hauka í Olís deildinni. Hér sérðu nýjustu úrslit, næstu leiki og stöðuna í deildinni í rauntíma.
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* 1. STANDINGS TABLE */}
          <div className="lg:col-span-2">
            <div className="bg-[#fafafa] rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-sm">
              <div className="bg-[#1c2c6c] p-6">
                <h3 className="text-white font-black uppercase tracking-widest text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#D4AF37]">leaderboard</span>
                  Staðan í deildinni
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Röð</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Lið</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">L</th>
                      <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Stig</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.standings.map((team, idx) => (
                      <tr 
                        key={idx} 
                        className={`border-b border-gray-100 transition-colors hover:bg-white ${
                          team.team.includes('Haukar') ? 'bg-[#c8102e]/5' : ''
                        }`}
                      >
                        <td className="px-8 py-5">
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black ${
                            team.rank <= 4 ? 'bg-[#D4AF37] text-white' : 'bg-gray-200 text-gray-500'
                          }`}>
                            {team.rank}
                          </span>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`font-black uppercase italic tracking-tight ${
                            team.team.includes('Haukar') ? 'text-[#c8102e]' : 'text-[#1c2c6c]'
                          }`}>
                            {team.team}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-center font-bold text-gray-400">{team.played}</td>
                        <td className="px-8 py-5 text-center font-black text-[#1c2c6c]">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] text-center border-t border-gray-100">
                Gögn uppfærð sjálfkrafa frá HBStatz
              </div>
            </div>
          </div>

          {/* 2. RECENT & NEXT MATCHES */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#c8102e] rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 transition-transform duration-700">
                <span className="material-symbols-outlined text-[160px]">sports_handball</span>
              </div>
              
              <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-8 relative z-10">Síðustu úrslit</h3>
              
              <div className="space-y-8 relative z-10">
                {currentData.matches.slice(0, 3).map((match, idx) => (
                  <div key={idx} className="border-l-2 border-white/20 pl-6 py-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{match.date}</span>
                      <span className="bg-white/10 text-[9px] font-black px-2 py-0.5 rounded uppercase">{match.competition}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-lg font-black italic uppercase tracking-tighter leading-none mb-1">{match.home}</p>
                        <p className="text-lg font-black italic uppercase tracking-tighter leading-none">{match.away}</p>
                      </div>
                      <div className="bg-white text-[#c8102e] px-4 py-2 rounded-xl font-black italic shadow-lg whitespace-nowrap">
                        {match.score.replace(/\(\d+\)/g, '').trim()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-12 w-full py-4 bg-white text-[#c8102e] font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-[#1c2c6c] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2">
                Allir leikir <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              </button>
            </div>

            {/* Next Match Teaser (Placeholder/Future logic) */}
            <div className="bg-[#1c2c6c] rounded-[2.5rem] p-8 text-white shadow-xl">
              <h3 className="text-sm font-black uppercase tracking-[0.3em] mb-6">Næsti leikur</h3>
              <div className="text-center py-4">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Tímabilið er í hámarki</p>
                <p className="text-2xl font-black italic uppercase">Úrslitakeppnin stendur yfir!</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
