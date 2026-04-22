import { Link } from 'react-router-dom';
import Button from './Button.jsx';

export default function PlayerOfTheWeek() {
  const spotlightPlayer = {
    name: "Freyr Aronsson",
    number: "8",
    position: "Skytta",
    img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5308.jpg",
    sport: "handbolti",
    stats: {
      offensive: {
        gamesPlayed: 28,
        totalGoals: 180,
        totalShots: 272,
        shootingPercentage: "66.2%"
      },
      defensive: {
        legalStops: 116,
        steals: 20,
        blockedShots: 4
      }
    }
  };

  return (
    <section className="w-full bg-white py-24 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: The Portrait */}
          <div className="w-full md:w-1/2 lg:w-5/12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1c2c6c]/20 group">
              {/* Premium Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] to-transparent opacity-60 z-10"></div>
              
              <img 
                src={spotlightPlayer.img} 
                alt={spotlightPlayer.name} 
                className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2 inline-block shadow-sm">
                  Markakóngurinn
                </span>
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-md">
                  Leikmaður<br/>Vikunnar
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Stats */}
          <div className="w-full md:w-1/2 lg:w-7/12">
            <div className="mb-8">
              <span className="text-[#c8102e] text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                Í nærmynd
              </span>
              <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-none mb-5">
                Freyr <br className="hidden lg:block"/>
                <span className="text-[#c8102e]">Aronsson</span>
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm border-l-2 border-[#c8102e] pl-3">
                {spotlightPlayer.position} • Olís Deild Karla
              </p>
            </div>

            <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8 max-w-xl">
              Freyr hefur farið á kostum á tímabilinu og er markahæsti leikmaður liðsins með heil 180 mörk. Hann er óstöðvandi í sókninni og hefur sýnt ótrúlegan stöðugleika í öllum leikjum vetrarins.
            </p>

            {/* Stat Grid */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-10 max-w-lg">
              <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mörk</p>
                <p className="text-4xl font-black italic text-[#1c2c6c]">{spotlightPlayer.stats.offensive.totalGoals}</p>
              </div>
              <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stöðvanir</p>
                <p className="text-4xl font-black italic text-[#c8102e]">{spotlightPlayer.stats.defensive.legalStops}</p>
              </div>
              <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nýting</p>
                <p className="text-4xl font-black italic text-[#1c2c6c]">66%</p>
              </div>
            </div>

            {/* Fired up with the Global Button */}
            <Link to="/leikmenn/freyr-aronsson" state={{ player: spotlightPlayer }}>
              <Button variant="primary" icon="arrow_forward" iconPosition="right">
                Skoða leikmann
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}