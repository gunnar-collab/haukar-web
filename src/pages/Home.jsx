import HeroBanner from '../components/HeroBanner';
import NewsGrid from '../components/NewsGrid';
import PlayerOfTheWeek from '../components/PlayerSpotlight'; 
import Veggurinn from '../components/Veggurinn';
import TrophyCabinet from '../components/TrophyCabinet';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Cinematic Entry */}
      <HeroBanner />
      
      {/* 2. Latest Club News (Bento Grid) */}
      <div id="news">
        <NewsGrid />
      </div>

      {/* 3. Star Athlete Feature */}
      <PlayerOfTheWeek />

      {/* 4. The Social Grid */}
      <Veggurinn />

      {/* 5. Historical Anchor */}
      <TrophyCabinet />
      
    </div>
  );
}