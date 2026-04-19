import { useState, useEffect } from 'react';

export default function Leikmannahopur() {
  const [activeTeam, setActiveTeam] = useState('karla'); // 'karla' or 'kvenna'

  // Snap to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Real data with live image links for BOTH teams!
  const players = [
    // --- MEISTARAFLOKKUR KARLA ---
    { id: 1, name: 'Grétar Ari', number: '1', position: 'Markvörður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/gretar-fb.png' },
    { id: 2, name: 'Hergeir', number: '3', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5461.jpg' },
    { id: 3, name: 'Adam Haukur', number: '4', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5260.jpg' },
    { id: 4, name: 'Brynjólfur Snær', number: '6', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5247.jpg' },
    { id: 5, name: 'Freyr', number: '8', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5308.jpg' },
    { id: 6, name: 'Sigurður Snær', number: '9', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5278.jpg' },
    { id: 7, name: 'Birkir Snær', number: '11', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5368.jpg' },
    { id: 8, name: 'Darri', number: '13', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5321.jpg' },
    { id: 9, name: 'Össur', number: '14', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5201.jpg' },
    { id: 10, name: 'Magnús Gunnar', number: '16', position: 'Markvörður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5426.jpg' },
    { id: 11, name: 'Skarphéðinn', number: '17', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5273.jpg' },
    { id: 12, name: 'Ari Dignus', number: '19', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5448.jpg' },
    { id: 13, name: 'Ásgeir Bragi', number: '20', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5345.jpg' },
    { id: 14, name: 'Ólafur Ægir', number: '24', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5229.jpg' },
    { id: 15, name: 'Egill', number: '25', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5373.jpg' },
    { id: 16, name: 'Aron Rafn', number: '27', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5515.jpg' },
    { id: 17, name: 'Jón Ómar', number: '47', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/jonomar.png' },
    { id: 18, name: 'Þráinn Orri', number: '55', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5213.jpg' },
    { id: 19, name: 'Jón Karl', number: '77', position: 'Útileikmaður', team: 'karla', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5404.jpg' },
    
    // STAFF KARLA
    { id: 20, name: 'Gunnar', number: '', position: 'Þjálfari', team: 'karla', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5499.jpg' },
    { id: 21, name: 'Bjarni Gunnar', number: '', position: 'Þjálfari', team: 'karla', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5486.jpg' },
    { id: 22, name: 'Hörður Davíð', number: '', position: 'Liðstjóri', team: 'karla', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5551.jpg' },
    { id: 23, name: 'Ellert Ingi', number: '', position: 'Sjúkraþjálfari', team: 'karla', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5539.jpg' },

    // --- MEISTARAFLOKKUR KVENNA ---
    { id: 24, name: 'Elísa Helga', number: '1', position: 'Markvörður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5999.jpg' },
    { id: 25, name: 'Sara Sif', number: '4', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6121.jpg' },
    { id: 26, name: 'Ragnheiður', number: '5', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5800.jpg' },
    { id: 27, name: 'Sonja Lind', number: '6', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5754.jpg' },
    { id: 28, name: 'Rakel Oddný', number: '7', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5780.jpg' },
    { id: 29, name: 'Roksana', number: '8', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6013.jpg' },
    { id: 30, name: 'Inga Dís', number: '9', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5908.jpg' },
    { id: 31, name: 'Thelma Melsted', number: '10', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5837.jpg' },
    { id: 32, name: 'Erla', number: '12', position: 'Markvörður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6033.jpg' },
    { id: 33, name: 'Ebba Guðríður', number: '15', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5916.jpg' },
    { id: 34, name: 'Aníta Eik', number: '16', position: 'Markvörður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5859.jpg' },
    { id: 35, name: 'Þóra', number: '18', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5960.jpg' },
    { id: 36, name: 'Birta Lind', number: '19', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5888.jpg' },
    { id: 37, name: 'Alexandra Líf', number: '22', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6158.jpg' },
    { id: 38, name: 'Rut Arnfjörð', number: '25', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5927.jpg' },
    { id: 39, name: 'Ragnheiður S', number: '32', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5827.jpg' },
    { id: 40, name: 'Embla', number: '35', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5873.jpg' },
    { id: 41, name: 'Sara Odden', number: '60', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5948.jpg' },
    { id: 42, name: 'Ester Amíra', number: '66', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5989.jpg' },
    { id: 43, name: 'Jóhanna Margrét', number: '91', position: 'Útileikmaður', team: 'kvenna', stats: 'Leikmaður', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5741.jpg' },
    
    // STAFF KVENNA
    { id: 44, name: 'Stefán', number: '', position: 'Þjálfari', team: 'kvenna', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6143.jpg' },
    { id: 45, name: 'Díana', number: '', position: 'Þjálfari', team: 'kvenna', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6138.jpg' },
    { id: 46, name: 'Alexandra Hödd', number: '', position: 'Liðstjóri', team: 'kvenna', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5721.jpg' },
    { id: 47, name: 'Harpa Melsted', number: '', position: 'Sjúkraþjálfari', team: 'kvenna', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5974.jpg' },
    { id: 48, name: 'Magnús Ingi', number: '', position: 'Markmannsþjálfari', team: 'kvenna', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5732.jpg' },
    { id: 49, name: 'Friðrik Benóný', number: '', position: 'Styrktarþjálfari', team: 'kvenna', stats: 'Starfslið', img: 'https://www.haukar.is/wp-content/uploads/2014/12/haukar_mfl_kvk-25.jpg' },
  ];

  const filteredPlayers = players.filter(player => player.team === activeTeam);

  return (
    <main className="w-full bg-[#c8102e] min-h-screen pt-12 pb-24 font-sans selection:bg-[#1c2c6c] selection:text-white">
      
      {/* Header & Filters */}
      <div className="max-w-[1600px] mx-auto px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          
          <div>
            <span className="text-[#1c2c6c] text-sm font-black uppercase tracking-widest mb-2 block drop-shadow-md">
              Handbolti
            </span>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
              Hópurinn
            </h1>
          </div>

          {/* Clean Toggle Switch */}
          <div className="flex bg-[#a30d25] p-1.5 rounded-xl shadow-inner">
            <button 
              onClick={() => setActiveTeam('karla')}
              className={`px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTeam === 'karla' ? 'bg-[#1c2c6c] text-white shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              M.fl. Karla
            </button>
            <button 
              onClick={() => setActiveTeam('kvenna')}
              className={`px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTeam === 'kvenna' ? 'bg-[#1c2c6c] text-white shadow-md' : 'text-white/70 hover:text-white'
              }`}
            >
              M.fl Kvenna
            </button>
          </div>

        </div>
      </div>

      {/* The Roster Grid */}
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredPlayers.map((player) => (
            <div 
              key={player.id} 
              className="group relative rounded-3xl overflow-hidden aspect-[3/4] bg-[#1c2c6c] shadow-xl cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              
              {/* Player Image (Now Full Color & 100% visible) */}
              <img 
                src={player.img} 
                alt={player.name} 
                className="absolute inset-0 w-full h-full object-cover object-top z-10 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Navy Blue Gradient overlay (Now only on the bottom half for text readability) */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 z-20 bg-gradient-to-t from-[#1c2c6c] via-[#1c2c6c]/80 to-transparent"></div>

              {/* Haukar Red Slide-Up Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#c8102e] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-40"></div>

              {/* Player Info */}
              <div className="absolute inset-x-0 bottom-0 z-30 p-6 flex flex-col justify-end h-full">
                
                {/* Number Badge (Only shows if player has a number) */}
                {player.number ? (
                  <span className="w-10 h-10 bg-white text-[#c8102e] rounded-full flex items-center justify-center font-black italic text-lg shadow-md mb-auto transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {player.number}
                  </span>
                ) : (
                  <div className="mb-auto"></div> // Spacer for staff so layout doesn't break
                )}

                <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-1 block">
                    {player.position}
                  </span>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight leading-none mb-4">
                    {player.name}
                  </h3>
                  
                  {/* Hover Reveal Stats */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 ease-out border-t border-white/20 pt-3">
                    <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-[#c8102e]">bar_chart</span>
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