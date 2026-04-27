import { useState, useEffect } from 'react';
import DivisionHero from '../components/sports/DivisionHero.jsx';
import MatchDashboard from '../components/sports/MatchDashboard.jsx';
import NewsSection from '../components/sports/NewsSection.jsx';
import RosterPreview from '../components/sports/RosterPreview.jsx';
import LeagueStandings from '../components/sports/LeagueStandings.jsx';
import SocialWall from '../components/sports/SocialWall.jsx';

// Data imports
import { dataKarla, dataKvenna, karateNews, socialPosts } from '../data/karateData.js';

export default function Karate() {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  const handleGenderChange = (newGender) => {
    setLoading(true);
    setGender(newGender);
  };

  // Simulate an API call to KAÍ (Karatesamband Íslands)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [gender]);

  const currentData = gender === 'karla' ? dataKarla : dataKvenna;

  return (
    <div className="flex flex-col w-full bg-white selection:bg-[#1c2c6c] selection:text-white">
      
      <DivisionHero 
        sportName="Haukar Karate"
        icon="sports_martial_arts"
        bgImage="/images/karate/hero_bg.png"
        gender={gender}
        setGender={handleGenderChange}
        isKarate={true}
      />

      {/* 2. QUICK ACTION BAR - KDH.is & Stundatafla */}
      <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-8 w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <a href="https://kdh.is/" target="_blank" rel="noreferrer" className="bg-[#1c2c6c] rounded-2xl shadow-xl p-5 md:p-6 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300 border border-[#1c2c6c] hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#c8102e] transition-colors border border-white/10">
                <span className="material-symbols-outlined text-[24px]">language</span>
              </div>
              <div>
                <p className="text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">Sérvefur Karatedeildar</p>
                <h3 className="font-black italic text-white uppercase tracking-tight text-lg md:text-xl">Fara á KDH.is</h3>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/30 group-hover:text-white transition-colors">open_in_new</span>
          </a>

          <a href="https://www.haukar.is/wp-content/uploads/2014/12/Stundatafla-21-22.pdf" target="_blank" rel="noreferrer" className="bg-white rounded-2xl shadow-xl p-5 md:p-6 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-[#c8102e]/30 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-full flex items-center justify-center text-[#c8102e] group-hover:bg-[#c8102e] group-hover:text-white transition-colors border border-gray-100">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
              <div>
                <p className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">Smelltu til að sækja PDF</p>
                <h3 className="font-black italic text-[#1c2c6c] uppercase tracking-tight text-lg md:text-xl group-hover:text-[#c8102e] transition-colors">Stundatafla Æfinga</h3>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-[#c8102e] transition-colors">download</span>
          </a>
        </div>
      </div>

      <MatchDashboard 
        loading={loading}
        lastMatch={currentData.lastMatch}
        nextMatch={currentData.nextMatch}
        provider="KAÍ"
        statsIcon="emoji_events"
        isTournament={true}
      />

      <NewsSection 
        title="Fréttir úr Karate"
        newsList={karateNews}
      />

      {/* 4. MODULAR PERFORMANCE CARDS (Full-Width Row) */}
      <div className="max-w-7xl mx-auto px-6 mb-20 w-full">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">Afrekshópur & Staðan</h2>
          <div className="flex items-center gap-2 text-[#1c2c6c] text-[10px] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Uppfært í dag
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Player 1 Card */}
          <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden group">
            <div className="relative flex-grow min-h-[520px]">
              <img 
                src={currentData.players[0].img} 
                alt={currentData.players[0].name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-top" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] via-transparent to-transparent opacity-90"></div>
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="text-[10px] font-black tracking-widest text-white uppercase">{currentData.players[0].number}</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-[#c8102e] font-bold text-[10px] uppercase tracking-widest mb-1">{currentData.players[0].position}</p>
                <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">{currentData.players[0].name}</h3>
              </div>
            </div>
          </div>

          {/* Player 2 Card */}
          <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden group">
            <div className="relative flex-grow min-h-[520px]">
              <img 
                src={currentData.players[1].img} 
                alt={currentData.players[1].name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-top" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] via-transparent to-transparent opacity-90"></div>
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="text-[10px] font-black tracking-widest text-white uppercase">{currentData.players[1].number}</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-[#c8102e] font-bold text-[10px] uppercase tracking-widest mb-1">{currentData.players[1].position}</p>
                <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">{currentData.players[1].name}</h3>
              </div>
            </div>
          </div>

          {/* Player 3 Card */}
          <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col overflow-hidden group">
            <div className="relative flex-grow min-h-[520px]">
              <img 
                src={currentData.players[2].img} 
                alt={currentData.players[2].name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-top" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] via-transparent to-transparent opacity-90"></div>
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                <span className="text-[10px] font-black tracking-widest text-white uppercase">{currentData.players[2].number}</span>
              </div>
              <div className="absolute bottom-8 left-8">
                <p className="text-[#c8102e] font-bold text-[10px] uppercase tracking-widest mb-1">{currentData.players[2].position}</p>
                <h3 className="text-white text-3xl font-black italic uppercase tracking-tighter leading-tight">{currentData.players[2].name}</h3>
              </div>
            </div>
          </div>

          {/* Standings Card */}
          <div className="bg-[#1c2c6c] rounded-[40px] shadow-xl p-8 flex flex-col min-h-[520px] text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110"></div>
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <h3 className="text-sm font-black italic uppercase tracking-tight text-white/50">Stigafjöldi KAÍ</h3>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/10">
                <span className="material-symbols-outlined text-[#c8102e] text-xl">leaderboard</span>
              </div>
            </div>
            <div className="flex-grow flex flex-col justify-between relative z-10">
              {currentData.standings.map((row, i) => (
                <div key={row.rank} className={`flex items-center py-4 ${i !== currentData.standings.length - 1 ? 'border-b border-white/10' : ''}`}>
                  <span className="w-6 text-[11px] font-bold text-white/40">{row.rank}</span>
                  <span className={`flex-grow text-sm font-bold ${row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-white'}`}>{row.team}</span>
                  <span className="text-sm font-black text-white">{row.pts}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest text-center">Gögnum streymt frá KAÍ.is</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. CONTACT BANNER (Full Width beneath) */}
      <div className="max-w-7xl mx-auto px-6 mb-24">
        <div className="bg-[#1c2c6c] rounded-[40px] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform group-hover:scale-110"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/10 shrink-0">
              <span className="material-symbols-outlined text-white text-3xl">contact_support</span>
            </div>
            <div>
              <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Breytingar á hóp?</h3>
              <p className="text-white/70 text-sm max-w-xl leading-relaxed">
                Ef þú ert í afrekshóp og vilt uppfæra upplýsingar eða mynd þá getur þú haft samband við deildarstjóra til að tryggja að allt sé rétt á vefnum.
              </p>
            </div>
          </div>

          <a 
            href="mailto:karate@haukar.is" 
            className="px-10 py-5 bg-white text-[#1c2c6c] rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-[#c8102e] hover:text-white transition-all shadow-xl flex items-center gap-3 relative z-10 whitespace-nowrap"
          >
            Hafa samband <span className="material-symbols-outlined text-[20px]">send</span>
          </a>
        </div>
      </div>

      <SocialWall 
        title="Haukar Karate"
        socialPosts={socialPosts}
      />
    </div>
  );
}