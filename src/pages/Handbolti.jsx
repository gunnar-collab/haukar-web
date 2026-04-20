import { useState, useEffect } from 'react';
import DivisionHero from '../components/sports/DivisionHero.jsx';
import MatchDashboard from '../components/sports/MatchDashboard.jsx';
import NewsSection from '../components/sports/NewsSection.jsx';
import RosterPreview from '../components/sports/RosterPreview.jsx';
import LeagueStandings from '../components/sports/LeagueStandings.jsx';
import SocialWall from '../components/sports/SocialWall.jsx';

// Data imports
import { dataKarla, dataKvenna, handballNews, socialPosts } from '../data/handboltiData.js';

export default function Handbolti({ onOpenTickets }) {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  const handleGenderChange = (newGender) => {
    setLoading(true);
    setGender(newGender);
  };

  // Simulate an API call to HBStatz for the presentation
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
        sportName="Haukar Handbolti"
        icon="sports_handball"
        bgImage="https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&q=80&w=2000"
        gender={gender}
        setGender={handleGenderChange}
      />

      <MatchDashboard 
        loading={loading}
        lastMatch={currentData.lastMatch}
        nextMatch={currentData.nextMatch}
        onOpenTickets={onOpenTickets}
        provider="HBStatz"
        statsIcon="bar_chart"
      />

      <NewsSection 
        title="Fréttir úr Handboltanum"
        newsList={handballNews}
      />

      <div className="max-w-7xl mx-auto px-6 py-12 w-full bg-white rounded-3xl shadow-xl border border-gray-100 mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#c8102e]"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
          <RosterPreview 
            players={currentData.players}
            loading={loading}
            title="Leikmannahópur"
            subtitle={`Lykilleikmenn í Meistaraflokki ${gender === 'karla' ? 'Karla' : 'Kvenna'}`}
          />
          <LeagueStandings 
            standings={currentData.standings}
            loading={loading}
            provider="HSÍ"
          />
        </div>
      </div>

      <SocialWall 
        title="Haukar Topphandbolti"
        socialPosts={socialPosts}
      />
    </div>
  );
}