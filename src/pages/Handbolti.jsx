import { useState, useEffect } from 'react';
import DivisionHero from '../components/sports/DivisionHero.jsx';
import MatchDashboard from '../components/sports/MatchDashboard.jsx';
import NewsSection from '../components/sports/NewsSection.jsx';
import RosterPreview from '../components/sports/RosterPreview.jsx';
import SocialWall from '../components/sports/SocialWall.jsx';
import LeagueDashboard from '../components/LeagueDashboard';

// Data imports
import { dataKarla, dataKvenna, handballNews, socialPosts } from '../data/handboltiData.js';
import { getDynamicMatches } from '../utils/matchUtils.js';
import haukarStats from '../data/haukar_player_stats.json';
import haukarWomenStats from '../data/haukar_women_player_stats.json';

// Full list of players with images for both teams to pick Top 5 from
const allHandballPlayers = [
    // KARLA
    { id: 1, slug: 'gretar-ari', name: 'Grétar Ari', number: '1', position: 'Markvörður', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/gretar-fb.png' },
    { id: 2, slug: 'hergeir-grimsson', name: 'Hergeir', number: '3', position: 'Skytta', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5461.jpg' },
    { id: 3, slug: 'adam-haukur', name: 'Adam Haukur', number: '4', position: 'Skytta', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5260.jpg' },
    { id: 4, slug: 'brynjolfur-snaer', name: 'Brynjólfur Snær', number: '6', position: 'Útileikmaður', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5247.jpg' },
    { id: 5, slug: 'freyr-aronsson', name: 'Freyr', number: '8', position: 'Skytta', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5308.jpg' },
    { id: 6, slug: 'sigurdur-snaer', name: 'Sigurður Snær', number: '9', position: 'Lína', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5278.jpg' },
    { id: 7, slug: 'birkir-snaer', name: 'Birkir Snær', number: '11', position: 'Hornamaður', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5368.jpg' },
    { id: 11, slug: 'skarphedinn-ivar', name: 'Skarphéðinn', number: '17', position: 'Skytta', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5273.jpg' },
    { id: 14, slug: 'olafur-aegir', name: 'Ólafur Ægir', number: '24', position: 'Skytta', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5229.jpg' },
    { id: 16, slug: 'aron-rafn', name: 'Aron Rafn', number: '27', position: 'Markvörður', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5515.jpg' },
    { id: 17, slug: 'jon-omar', name: 'Jón Ómar', number: '47', position: 'Hornamaður', team: 'karla', img: '/images/players/jon_omar.jpg' },
    { id: 18, slug: 'thrainn-orri', name: 'Þráinn Orri', number: '55', position: 'Lína', team: 'karla', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5213.jpg' },
    
    // KVENNA
    { id: 24, slug: 'elisa-helga', name: 'Elísa Helga', number: '1', position: 'Markvörður', team: 'kvenna', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5999.jpg' },
    { id: 25, slug: 'sara-sif', name: 'Sara Sif', number: '4', position: 'Skytta', team: 'kvenna', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6121.jpg' },
    { id: 26, slug: 'ragnheidur-5', name: 'Ragnheiður', number: '5', position: 'Hornamaður', team: 'kvenna', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5800.jpg' },
    { id: 28, slug: 'rakel-oddny', name: 'Rakel Oddný', number: '7', position: 'Skytta', team: 'kvenna', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5780.jpg' },
    { id: 33, slug: 'ebba-gudridur', name: 'Ebba Guðríður', number: '15', position: 'Lína', team: 'kvenna', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5916.jpg' },
    { id: 43, slug: 'johanna-margret', name: 'Jóhanna Margrét', number: '91', position: 'Skytta', team: 'kvenna', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5741.jpg' },
];

export default function Handbolti({ onOpenTickets }) {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  const handleGenderChange = (newGender) => {
    setLoading(true);
    setGender(newGender);
  };

  // Merge statistics from HBStatz
  const basePlayers = allHandballPlayers.filter(p => p.team === gender);
  const statsSource = gender === 'karla' ? haukarStats : haukarWomenStats;

  const enrichedPlayers = basePlayers.map(p => {
    const scrapedData = statsSource.find(s => s.name.includes(p.name) || p.name.includes(s.name));
    return {
      ...p,
      stats: scrapedData?.stats || null
    };
  });

  // Sort by "Star Power" (Total Goals for players, Total Saves for GKs)
  // Sort by "Star Power" but only allow ONE Goalkeeper in the Top 5
  const goalkeepers = [...enrichedPlayers]
    .filter(p => p.position === "Markvörður")
    .sort((a, b) => (b.stats?.goalkeeper?.totalSaves || 0) - (a.stats?.goalkeeper?.totalSaves || 0));
  
  const fieldPlayers = [...enrichedPlayers]
    .filter(p => p.position !== "Markvörður")
    .sort((a, b) => (b.stats?.offensive?.totalGoals || 0) - (a.stats?.offensive?.totalGoals || 0));

  const topPlayers = [
    ...(goalkeepers.slice(0, 1)), // Only the top GK
    ...(fieldPlayers.slice(0, 4))  // Top 4 field players
  ].sort((a, b) => {
    const aVal = (parseInt(a.stats?.offensive?.totalGoals) || 0) + (parseInt(a.stats?.goalkeeper?.totalSaves) || 0);
    const bVal = (parseInt(b.stats?.offensive?.totalGoals) || 0) + (parseInt(b.stats?.goalkeeper?.totalSaves) || 0);
    return bVal - aVal;
  });

  // Simulate an API call
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [gender]);

  const currentData = gender === 'karla' ? dataKarla : dataKvenna;
  const { lastMatch, nextMatch } = getDynamicMatches('handbolti', gender);

  return (
    <div className="flex flex-col w-full bg-white selection:bg-[#1c2c6c] selection:text-white">
      <DivisionHero 
        sportName="Haukar Handbolti"
        icon="sports_handball"
        bgImage="/images/handball/hero_bg.png"
        gender={gender}
        setGender={handleGenderChange}
      />

      <MatchDashboard 
        loading={loading}
        lastMatch={lastMatch}
        nextMatch={nextMatch}
        onOpenTickets={onOpenTickets}
        provider="HBStatz"
        statsIcon="bar_chart"
      />

      <NewsSection 
        title="Fréttir úr Handboltanum"
        newsList={handballNews}
      />

      {/* Roster Preview - Key Players (Top 5 Performers) */}
      <RosterPreview 
        players={topPlayers}
        loading={loading}
        title="Leikmannahópur"
        subtitle={`Topp 5 leikmenn byggt á tölfræði í Meistaraflokki ${gender === 'karla' ? 'Karla' : 'Kvenna'}`}
      />

      {/* Real-time League Data Dashboard */}
      <LeagueDashboard gender={gender} onOpenTickets={onOpenTickets} />

      <SocialWall 
        title="Haukar Topphandbolti"
        socialPosts={socialPosts}
      />
    </div>
  );
}