import { useState, useEffect } from 'react';
import DivisionHero from '../components/sports/DivisionHero.jsx';
import MatchDashboard from '../components/sports/MatchDashboard.jsx';
import NewsSection from '../components/sports/NewsSection.jsx';
import RosterPreview from '../components/sports/RosterPreview.jsx';
import LeagueDashboard from '../components/LeagueDashboard';
import SocialWall from '../components/sports/SocialWall.jsx';

// Data imports
import { dataKarla, dataKvenna, footballNews, socialPosts } from '../data/fotboltiData.js';
import { getDynamicMatches } from '../utils/matchUtils.js';

export default function Fotbolti({ onOpenTickets }) {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  const handleGenderChange = (newGender) => {
    setLoading(true);
    setGender(newGender);
  };

  // Simulate an API call to KSÍ for the presentation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [gender]);

  const currentData = gender === 'karla' ? dataKarla : dataKvenna;
  const { lastMatch, nextMatch } = getDynamicMatches('fotbolti', gender);

  return (
    <div className="flex flex-col w-full bg-[#fafafa] selection:bg-[#1c2c6c] selection:text-white">
      <DivisionHero 
        sportName="Haukar Fótbolti"
        icon="sports_soccer"
        bgImage="/images/soccer/hero_bg.png"
        gender={gender}
        setGender={handleGenderChange}
      />

      <MatchDashboard 
        loading={loading}
        lastMatch={lastMatch}
        nextMatch={nextMatch}
        onOpenTickets={onOpenTickets}
        provider="KSÍ"
        statsIcon="open_in_new"
      />

      <NewsSection 
        title="Fréttir úr Fótboltanum"
        newsList={footballNews}
      />

      {/* Roster Preview - Key Players */}
      <RosterPreview 
        players={currentData.players}
        loading={loading}
        title="Leikmannahópur"
        subtitle={`Lykilleikmenn í Meistaraflokki ${gender === 'karla' ? 'Karla' : 'Kvenna'}`}
        sport="fotbolti"
      />

      {/* Real-time League Data Dashboard */}
      <LeagueDashboard gender={gender} onOpenTickets={onOpenTickets} sport="fotbolti" />

      <SocialWall 
        title="Haukar Fótbolti"
        socialPosts={socialPosts}
      />
    </div>
  );
}