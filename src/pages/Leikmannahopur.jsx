import { useState, useEffect } from 'react';

export default function Leikmannahopur() {
  const [activeTeam, setActiveTeam] = useState('karla'); // 'karla' or 'kvenna'

  // Snap to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Data: You can easily swap these out with real player photos and stats later!
  const players = [
    { id: 1, name: 'Grétar Ari Guðjónsson', number: '12', position: 'Markvörður', team: 'karla', stats: 'Varin skot: 184', img: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?q=80&w=1000&auto=format&fit=crop' },
    { id: 2, name: 'Tjörvi Þorgeirsson', number: '4', position: 'Leikstjórnandi', team: 'karla', stats: 'Mörk: 112', img: 'https://images.unsplash.com/photo-1519766304817-4f37bda74a26?q=80&w=1000&auto=format&fit=crop' },
    { id: 3, name: 'Ólafur Ægir Ólafsson', number: '10', position: 'Hægri Skytta', team: 'karla', stats: 'Mörk: 89', img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop' },
    { id: 4, name: 'Guðmundur Bragi', number: '15', position: 'Vinstri Skytta', team: 'karla', stats: 'Mörk: 95', img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop' },
    { id: 5, name: 'Elín Klara Þorkelsdóttir', number: '9', position: 'Leikstjórnandi', team: 'kvenna', stats: 'Mörk: 142', img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=1000&auto=format&fit=crop' },
    { id: 6, name: 'Berta Rut Harðardóttir', number: '7', position: 'Línumaður', team: 'kvenna', stats: 'Mörk: 67', img: 'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=1000&auto=format&fit=crop' },
    { id: 7, name: 'Ragnheiður Sveinsdóttir', number: '22', position: 'Vinstri Horn', team: 'kvenna', stats: 'Mörk: 81', img: 'https://images.unsplash.com/photo-1521572231666-4be9e46a788e?q=80&w=1000&auto=format&fit=crop' },
    { id: 8, name: 'Margrét Einarsdóttir', number: '16', position: 'Markvörður', team: 'kvenna', stats: 'Varin skot: 156', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop' },
  ];

  const filteredPlayers = players.filter(player => player.team === activeTeam);

  return (
    <main className="w-full bg-[#c8102e] min-h-screen pt-12 pb-24 font-sans selection:bg-[#1c2c6c] selection:text-white">
      
      {/* Header & Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div>
            <span className="text-[#1c2c6c] text-sm font-black uppercase tracking-widest mb-2 block drop-shadow-md">
              Handbolti
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
              Leikmannahópur
            </h1>
          </div>

          {/* Clean Toggle Switch - Inverted for Red Background */}
          <div className="flex bg-[#a30d25] p-1.5 rounded-xl shadow-inner">
            <button 
              onClick={() => setActiveTeam('karla')}
              className={`px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTeam === 'karla' ? 'bg-[#1c2c6c] text-white shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              Meistaraflokkur Karla
            </button>
            <button 
              onClick={() => setActiveTeam('kvenna')}
              className={`px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTeam === 'kvenna' ? 'bg-[#1c2c6c] text-white shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              Meistaraflokkur Kvenna
            </button>
          </div>

        </div>
      </div>

      {/* The Roster Grid */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <div 
              key={player.id} 
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#1c2c6c] shadow-xl cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            >
              
              {/* Giant Watermarked Number */}
              <div className="absolute top-0 right-0 p-4 z-0 pointer-events-none transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                <span className="text-[140px] font-black italic text-white/5 leading-none tracking-tighter">
                  {player.number}
                </span>
              </div>

              {/* Player Image with grayscale-to-color hover effect */}
              <img 
                src={player.img} 
                alt={player.name} 
                className="absolute inset-0 w-full h-full object-cover z-10 opacity-70 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500 ease-out"
              />

              {/* Navy Blue Gradient overlay so text is always readable */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#1c2c6c] via-[#1c2c6c]/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* Player Info */}
              <div className="absolute inset-0 z-30 p-6 flex flex-col justify-end">
                
                {/* Number Badge - Now White & Red to stand out from Navy Card */}
                <span className="w-10 h-10 bg-white text-[#c8102e] rounded-full flex items-center justify-center font-black italic text-lg shadow-md mb-auto transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {player.number}
                </span>

                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    {player.position}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-4">
                    {player.name}
                  </h3>
                  
                  {/* Hover Reveal Stats */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-out border-t border-white/20 pt-3">
                    <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-white">bar_chart</span>
                      {player.stats}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}