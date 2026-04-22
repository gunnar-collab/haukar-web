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
    <div className="flex flex-col w-full bg-[#fafafa] selection:bg-[#1c2c6c] selection:text-white">
      
      <DivisionHero 
        sportName="Haukar Karate"
        icon="sports_martial_arts"
        bgImage="https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2000"
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

      <div className="max-w-7xl mx-auto px-6 py-12 w-full bg-white rounded-3xl shadow-xl border border-gray-100 mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#c8102e]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
          <RosterPreview 
            players={currentData.players}
            loading={loading}
            title="Afrekshópur"
            subtitle="Keppendur okkar í fremstu röð"
            isKarate={true}
          />
          <LeagueStandings 
            standings={currentData.standings}
            loading={loading}
            provider="KAÍ"
            title="Stigafjöldi KAÍ"
            isKarate={true}
          />
        </div>
      </div>

      <SocialWall 
        title="Haukar Karate"
        socialPosts={socialPosts}
      />
    </div>
  );
}