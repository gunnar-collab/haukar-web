import { useState, useEffect } from 'react';
import DivisionHero from '../components/sports/DivisionHero.jsx';
import MatchDashboard from '../components/sports/MatchDashboard.jsx';
import NewsSection from '../components/sports/NewsSection.jsx';
import RosterPreview from '../components/sports/RosterPreview.jsx';
import LeagueDashboard from '../components/LeagueDashboard';
import SocialWall from '../components/sports/SocialWall.jsx';

// Data imports
import { dataKarla, dataKvenna, basketballNews, socialPosts } from '../data/korfuboltiData.js';
import { getDynamicMatches } from '../utils/matchUtils.js';

export default function Korfubolti({ onOpenTickets }) {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  const handleGenderChange = (newGender) => {
    setLoading(true);
    setGender(newGender);
  };

  // Simulate an API call to KKÍ for the presentation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [gender]);

  const currentData = gender === 'karla' ? dataKarla : dataKvenna;
  const { lastMatch, nextMatch } = getDynamicMatches('korfubolti', gender);

  return (
    <div className="flex flex-col w-full bg-white selection:bg-[#c8102e] selection:text-white">
      <DivisionHero 
        sportName="Haukar Körfubolti"
        icon="sports_basketball"
        bgImage="/images/basketball/hero_bg.png"
        gender={gender}
        setGender={handleGenderChange}
      />

      <MatchDashboard 
        loading={loading}
        lastMatch={[...currentData.playoffs.schedule].reverse().find(m => m.result) || currentData.playoffs.schedule[0]}
        nextMatch={currentData.playoffs.schedule.find(m => !m.result) || currentData.playoffs.schedule[currentData.playoffs.schedule.length - 1]}
        onOpenTickets={onOpenTickets}
        provider="KKÍ"
        statsIcon="analytics"
      />

      <NewsSection 
        title="Fréttir úr Körfunni"
        newsList={basketballNews}
      />

      <RosterPreview 
        players={currentData.players}
        loading={loading}
        title="Leikmannahópur"
        subtitle={`Lykilleikmenn í Meistaraflokki ${gender === 'karla' ? 'Karla' : 'Kvenna'}`}
        sport="korfubolti"
      />

      <LeagueDashboard gender={gender} onOpenTickets={onOpenTickets} sport="korfubolti" />

      <SocialWall 
        title="Haukar Körfubolti"
        socialPosts={socialPosts}
      />
    </div>
  );
}