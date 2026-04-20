import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PlayerProfile() {
  const location = useLocation();

  // Snap to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // We catch the player data from the Link click. 
  const player = location.state?.player || {
    name: 'Leikmaður',
    number: '00',
    position: 'Útileikmaður',
    img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=1000',
    deepStats: { leikir: 0, mork: 0, nytni: 0, sto: 0 }
  };

  const stats = player.deepStats || { leikir: '-', mork: '-', nytni: '-', sto: '-' };

  return (
    <main className="w-full min-h-screen bg-[#fafafa] font-sans pb-24 selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. CINEMATIC HERO SECTION (NOW HAUKAR RED!) */}
      <div className="relative w-full h-[60vh] min-h-[500px] bg-[#c8102e] flex items-end overflow-hidden">
        
        {/* Background elements - Red Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#a30d25] via-[#c8102e]/90 to-transparent z-10 hidden md:block"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#a30d25] via-[#c8102e]/70 to-transparent z-10 md:hidden"></div>
        
        {/* Player Image */}
        <img 
          src={player.img} 
          alt={player.name}
          className="absolute inset-0 md:inset-auto md:right-0 md:top-0 md:w-3/5 h-full object-cover object-top z-0 opacity-80 md:opacity-100 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
        />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-20 pb-16 flex flex-col md:flex-row items-end justify-between">
          <div className="w-full md:w-1/2">
            <Link to="/leikmannahopur" className="text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 flex items-center gap-2 transition-colors w-fit bg-black/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Aftur í hópinn
            </Link>
            
            <div className="flex items-center gap-4 mb-3">
              {/* Badge is now Navy Blue to pop off the Red background */}
              <span className="bg-[#1c2c6c] text-white text-[10px] font-bold px-4 py-1.5 rounded-md uppercase tracking-widest shadow-lg">
                {player.position}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none mb-2 drop-shadow-xl">
              {player.name}
            </h1>
          </div>

          {/* Huge Number Graphic */}
          {player.number && (
            <div className="hidden md:block">
              <span className="text-[12rem] font-black italic text-white/15 leading-none tracking-tighter drop-shadow-2xl">
                #{player.number}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 2. STATS & SPONSOR DASHBOARD */}
      <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* The HBStatz Numbers Box */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
              <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                {/* Titles are now Red */}
                <h2 className="text-2xl font-black italic text-[#c8102e] uppercase tracking-tight">Tölfræði Tímabilsins</h2>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-green-700 text-[9px] font-bold uppercase tracking-widest">HBStatz API Tengt</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                {/* Stat 1 */}
                <div className="flex flex-col">
                  <span className="text-[#1c2c6c] opacity-60 text-[10px] font-bold uppercase tracking-widest mb-1">Leikir Spilaðir</span>
                  <span className="text-5xl font-black italic text-[#c8102e]">{stats.leikir}</span>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col">
                  <span className="text-[#1c2c6c] opacity-60 text-[10px] font-bold uppercase tracking-widest mb-1">Mörk í Leik</span>
                  <span className="text-5xl font-black italic text-[#c8102e]">{stats.mork}</span>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col">
                  <span className="text-[#1c2c6c] opacity-60 text-[10px] font-bold uppercase tracking-widest mb-1">Skotnýting</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black italic text-[#c8102e]">{stats.nytni}</span>
                    <span className="text-2xl font-black italic text-[#c8102e]">%</span>
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="flex flex-col">
                  <span className="text-[#1c2c6c] opacity-60 text-[10px] font-bold uppercase tracking-widest mb-1">Stoðsendingar</span>
                  <span className="text-5xl font-black italic text-[#c8102e]">{stats.sto}</span>
                </div>

              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-black italic text-[#c8102e] uppercase tracking-tight mb-4">Um Leikmann</h2>
              <p className="text-[#1c2c6c]/80 leading-relaxed font-medium">
                {player.name} er einn af lykilleikmönnum Hauka á þessu tímabili. Með gríðarlegan sprengikraft og frábæra skotnýtingu hefur hann verið ómissandi í sóknarleik liðsins. Uppalinn í Haukum og spilar með miklu hjarta fyrir félagið.
              </p>
            </div>

          </div>

          {/* Sidebar Area */}
          <div className="space-y-8">
            
            {/* Player Sponsor - NOW BOLD HAUKAR RED */}
            <div className="bg-gradient-to-br from-[#c8102e] to-[#a30d25] rounded-3xl shadow-xl p-8 text-center relative overflow-hidden group border border-[#c8102e]">
              {/* Subtle Navy Blue accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-[#1c2c6c]"></div>
              
              <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest block mb-4">Einkastyrktaraðili</span>
              
              {/* Placeholder Sponsor Logo */}
              <div className="h-24 flex items-center justify-center mb-4 bg-white/10 rounded-xl mx-4 backdrop-blur-sm border border-white/20">
                 <h3 className="text-3xl font-black text-white tracking-widest uppercase drop-shadow-md">KFC</h3>
              </div>
              
              <p className="text-white/90 text-sm mb-6 font-medium">Stoltir bakhjarlar {player.name} á þessu tímabili.</p>
              
              <button className="w-full bg-[#1c2c6c] text-white font-bold uppercase tracking-widest text-xs py-4 rounded-xl hover:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Kíktu á KFC
              </button>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}