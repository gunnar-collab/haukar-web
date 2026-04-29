import HeroBanner from '../components/HeroBanner';
import NextHomeGameWidget from '../components/NextHomeGameWidget';
import NewsGrid from '../components/NewsGrid';
import PlayerOfTheWeek from '../components/PlayerSpotlight'; 
import GrantBanner from '../components/GrantBanner';
import SkokkPromotion from '../components/SkokkPromotion';
import Veggurinn from '../components/Veggurinn';
import FanZone from '../components/FanZone';
import TrophyCabinet from '../components/TrophyCabinet';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      
      {/* 1. Cinematic Entry */}
      <HeroBanner />
      
      {/* 1.5 Smart Upselling Widget */}
      <NextHomeGameWidget />
      
      {/* 2. Latest Club News (Bento Grid) */}
      <div id="news">
        <NewsGrid />
      </div>

      {/* 3. Star Athlete Feature */}
      <PlayerOfTheWeek />

      {/* 4. Practical Information: Leisure Grant */}
      <GrantBanner />

      {/* 5. Jogging Community: Skokkhópur Hauka */}
      <SkokkPromotion />

      {/* 6. The Social Grid */}
      <Veggurinn />

      {/* 6. Supporters' Area: Go Bananas! */}
      <FanZone />

      {/* 7. Historical Anchor */}
      <TrophyCabinet />
      
    </div>
  );
}