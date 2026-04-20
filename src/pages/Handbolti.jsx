import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function Handbolti({ onOpenTickets }) {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  // Simulate an API call to HBStatz for the presentation
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [gender]);

  // --- MOCK API DATA: KARLA (MEN) ---
  const dataKarla = {
    standings: [
      { rank: 1, team: 'Valur', played: 22, w: 16, d: 2, l: 4, pts: 34 },
      { rank: 2, team: 'FH', played: 22, w: 15, d: 1, l: 6, pts: 31 },
      { rank: 3, team: 'Haukar', played: 22, w: 14, d: 2, l: 6, pts: 30 },
      { rank: 4, team: 'Afturelding', played: 22, w: 12, d: 3, l: 7, pts: 27 },
      { rank: 5, team: 'ÍBV', played: 22, w: 11, d: 1, l: 10, pts: 23 },
    ],
    nextMatch: {
      competition: 'Úrslitakeppni Olís deild karla',
      home: 'Haukar',
      away: 'FH',
      date: 'Fim 23. Apríl • 19:30',
      venue: 'Ásvellir',
    },
    lastMatch: {
      competition: 'Úrslitakeppni Olís deild karla',
      home: 'FH',
      away: 'Haukar',
      homeScore: 36,
      awayScore: 35,
      statsLink: 'https://hbstatz.is/OlisDeildKarlaLeikur.php?ID=12905'
    },
    players: [
      { number: "27", slug: "aron-rafn", name: "Aron Rafn", position: "Markvörður", deepStats: { leikir: 29, mork: 0.1, nytni: 100, sto: 4 }, img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5515.jpg" },
      { number: "3", slug: "hergeir-grimsson", name: "Hergeir", position: "Leikstjórnandi", deepStats: { leikir: 28, mork: 2.9, nytni: 62.1, sto: 1.6 }, img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5461.jpg" },
      { number: "4", slug: "adam-haukur", name: "Adam Haukur", position: "Skytta", deepStats: { leikir: 25, mork: 1.0, nytni: 61.5, sto: 0.4 }, img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5260.jpg" }
    ]
  };

  // --- MOCK API DATA: KVENNA (WOMEN) ---
  const dataKvenna = {
    standings: [
      { rank: 1, team: 'Valur', played: 21, w: 18, d: 1, l: 2, pts: 37 },
      { rank: 2, team: 'Fram', played: 21, w: 16, d: 2, l: 3, pts: 34 },
      { rank: 3, team: 'Haukar', played: 21, w: 14, d: 1, l: 6, pts: 29 },
      { rank: 4, team: 'ÍBV', played: 21, w: 12, d: 2, l: 7, pts: 26 },
      { rank: 5, team: 'Stjarnan', played: 21, w: 8, d: 3, l: 10, pts: 19 },
    ],
    nextMatch: {
      competition: 'Úrslitakeppni Olís deild kvenna',
      home: 'KA/Þór',
      away: 'Haukar',
      date: 'Lau 25. Apríl • 16:00',
      venue: 'KA-heimilið',
    },
    lastMatch: {
      competition: 'Úrslitakeppni Olís deild kvenna',
      home: 'Haukar',
      away: 'KA/Þór',
      homeScore: 28,
      awayScore: 23,
      statsLink: 'https://hbstatz.is/OlisDeildKvennaTolfraedi.php'
    },
    players: [
      { number: "1", slug: "elisa-helga", name: "Elísa Helga", position: "Markvörður", deepStats: { leikir: 21, mork: 0.5, nytni: 50.0, sto: 2 }, img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5999.jpg" },
      { number: "4", slug: "sara-sif", name: "Sara Sif", position: "Útileikmaður", deepStats: { leikir: 21, mork: 4.8, nytni: 63.4, sto: 3.2 }, img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6121.jpg" },
      { number: "12", slug: "erla", name: "Erla", position: "Markvörður", deepStats: { leikir: 21, mork: 0.2, nytni: 33.3, sto: 1 }, img: "https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF6033.jpg" }
    ]
  };

  const currentData = gender === 'karla' ? dataKarla : dataKvenna;

  const handballNews = [
    { id: 1, category: "Meistaraflokkur Karla", title: "Haukar tryggja sér sigur á lokasekúndunum gegn FH", date: "18. Apríl", image: "https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&q=80&w=800" },
    { id: 2, category: "Meistaraflokkur Kvenna", title: "Frábær varnarleikur skóp sigurinn á Ásvöllum", date: "16. Apríl", image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=800" },
    { id: 3, category: "Unglingaráð", title: "Skráning hafin á sumarnámskeið handboltans", date: "14. Apríl", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800" },
  ];

  const socialPosts = [
    { id: 1, platform: 'Instagram', handle: '@haukar_topphandbolti', image: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5461.jpg', text: 'Mæting á Ásvelli á morgun! Við þurfum ykkar stuðning í stúkunni ❤️🖤 #haukar #handbolti', likes: '342' },
    { id: 2, platform: 'Facebook', handle: 'Haukar Topphandbolti', image: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5999.jpg', text: 'Sigurhátíð eftir frábæran leik hjá stelpunum í kvöld. Áfram Haukar!', likes: '512' },
    { id: 3, platform: 'Instagram', handle: '@haukar_topphandbolti', image: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5515.jpg', text: 'Vegurinn í úrslitin. Aron Rafn lokaði markinu í gær 🧱🔥', likes: '489' },
    { id: 4, platform: 'Facebook', handle: 'Haukar Topphandbolti', image: 'https://www.haukar.is/wp-content/uploads/2014/12/Ernir20250922_DSF5260.jpg', text: 'Viðtal við Adam Hauk eftir stórsigur gærkvöldsins er komið inn á síðuna.', likes: '280' },
  ];

  return (
    <div className="flex flex-col w-full bg-[#fafafa] selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. DIVISION HERO */}
      <div className="relative w-full h-[45vh] min-h-[350px] flex items-end pb-12 bg-[#c8102e] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1589801258579-18e091f4ca26?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#a30d25] via-[#c8102e]/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <span className="text-[#1c2c6c] bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm font-bold tracking-widest uppercase text-xs mb-4 inline-flex items-center gap-2 border border-white/20 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">sports_handball</span>
              Haukar Handbolti
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
              {gender === 'karla' ? 'Karlar' : 'Konur'}
            </h1>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl flex gap-1 border border-white/20 shadow-xl">
            <button 
              onClick={() => setGender('karla')} 
              className={`px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300 ${gender === 'karla' ? 'bg-[#1c2c6c] text-white shadow-lg scale-105' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              Karlar
            </button>
            <button 
              onClick={() => setGender('kvenna')} 
              className={`px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all duration-300 ${gender === 'kvenna' ? 'bg-[#1c2c6c] text-white shadow-lg scale-105' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
            >
              Konur
            </button>
          </div>
        </div>
      </div>

      {/* 2. LIVE MATCH DASHBOARD - MOBILE OPTIMIZED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 -mt-8 w-full mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* LATEST MATCH */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4">
            {loading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1c2c6c]">Sæki Gögn...</span>
              </div>
            )}
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block">
              Síðasti Leikur • {currentData.lastMatch.competition}
            </span>
            
            <div className="flex items-center justify-between my-auto w-full">
              <span className={`text-lg sm:text-xl md:text-2xl font-black italic uppercase truncate w-[35%] text-left ${currentData.lastMatch.homeScore > currentData.lastMatch.awayScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                {currentData.lastMatch.home}
              </span>
              <div className="bg-gray-50 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-lg sm:text-xl md:text-2xl font-black italic border border-gray-100 shadow-sm shrink-0">
                <span className={currentData.lastMatch.homeScore > currentData.lastMatch.awayScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}>{currentData.lastMatch.homeScore}</span>
                <span className="mx-1.5 md:mx-2 text-gray-300">-</span>
                <span className={currentData.lastMatch.awayScore > currentData.lastMatch.homeScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}>{currentData.lastMatch.awayScore}</span>
              </div>
              <span className={`text-lg sm:text-xl md:text-2xl font-black italic uppercase truncate w-[35%] text-right ${currentData.lastMatch.awayScore > currentData.lastMatch.homeScore ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                {currentData.lastMatch.away}
              </span>
            </div>
            
            <a href={currentData.lastMatch.statsLink} target="_blank" rel="noreferrer" className="w-full bg-[#1c2c6c] hover:bg-black text-white py-3 md:py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-[10px] sm:text-[11px] font-bold uppercase tracking-widest shadow-md">
              <span className="material-symbols-outlined text-[16px]">bar_chart</span>
              Skoða Tölfræði á HBStatz
            </a>
          </div>

          {/* NEXT MATCH */}
          <div className="bg-gradient-to-br from-[#1c2c6c] to-gray-900 text-white rounded-2xl shadow-xl p-5 md:p-6 lg:py-6 lg:px-8 flex flex-col justify-between relative overflow-hidden min-h-[180px] gap-4">
            {loading && (
              <div className="absolute inset-0 bg-[#1c2c6c]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sæki leikjaplan...</span>
              </div>
            )}
            <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest block">
              Næsti Leikur • {currentData.nextMatch.competition}
            </span>
            
            <div className="flex items-center justify-between my-auto text-lg sm:text-xl md:text-2xl font-black italic uppercase w-full">
              <span className="truncate w-[40%] text-left">{currentData.nextMatch.home}</span>
              <span className="text-white/30 text-xs sm:text-sm font-normal not-italic px-2 shrink-0">VS</span>
              <span className="truncate w-[40%] text-right">{currentData.nextMatch.away}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
              <div className="flex items-center justify-between sm:justify-start gap-4 bg-white/10 rounded-xl px-4 py-2.5 sm:py-2 border border-white/5">
                <div className="text-left">
                  <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvenær</span>
                  <span className="font-bold text-[11px] sm:text-xs">{currentData.nextMatch.date}</span>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="text-left">
                  <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvar</span>
                  <span className="font-bold text-[11px] sm:text-xs">{currentData.nextMatch.venue}</span>
                </div>
              </div>
              <button 
                onClick={onOpenTickets}
                className="bg-[#c8102e] text-white font-bold uppercase tracking-widest text-[10px] px-5 py-3.5 sm:py-3 rounded-xl shadow-lg hover:scale-105 hover:bg-[#a30d25] transition-all flex items-center justify-center gap-2"
              >
                Kaupa Miða <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 3. FRÉTTIR ÚR HANDBOLTANUM */}
      <div className="max-w-7xl mx-auto px-6 mb-20 w-full">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">Fréttir úr handboltanum</h2>
          <Link to="/frettir" className="text-[#1c2c6c] text-sm font-bold uppercase tracking-widest hover:text-[#c8102e] transition-colors flex items-center gap-1">
            Allar fréttir <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {handballNews.map((news) => (
            <Link to="/grein" key={news.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#c8102e]/30">
              <div className="relative h-48 overflow-hidden">
                <img src={news.image} alt={news.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-[#1c2c6c] text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest z-10 shadow-md">
                  {news.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                  {news.date}
                </span>
                <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">
                  {news.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. LEIKMANNAHÓPUR & STAÐAN */}
      <div className="max-w-7xl mx-auto px-6 py-12 w-full bg-white rounded-3xl shadow-xl border border-gray-100 mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#c8102e]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
          
          {/* Left Side: Roster Preview */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">Leikmannahópur</h2>
                <p className="text-gray-500 text-sm mt-1">Lykilleikmenn í Meistaraflokki {gender === 'karla' ? 'Karla' : 'Kvenna'}</p>
              </div>
              <Link to="/leikmannahopur" className="text-[#1c2c6c] text-sm font-bold uppercase tracking-widest hover:text-[#c8102e] transition-colors flex items-center gap-1 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
                Sjá alla <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10"></div>
              )}
              {currentData.players.map((player) => (
                <Link 
                  to={`/leikmenn/${player.slug}`} 
                  state={{ player }}
                  key={player.number} 
                  className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/4] cursor-pointer shadow-lg block border border-transparent hover:border-[#c8102e]/50"
                >
                  <img src={player.img} alt={player.name} className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 object-top" />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] via-[#1c2c6c]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-4xl font-black italic tracking-tighter text-white/30 group-hover:text-[#c8102e] transition-colors duration-300 drop-shadow-md">
                      {player.number}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#1c2c6c] bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2 inline-block shadow-sm">{player.position}</p>
                    <h3 className="text-white text-xl font-black italic tracking-tight uppercase drop-shadow-md">{player.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side: League Standings */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase mb-8">Staðan</h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative min-h-[300px]">
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined animate-spin text-[#c8102e] text-4xl mb-4">sync</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1c2c6c]">Tengist HSÍ...</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-[#c8102e] to-[#a30d25] py-3 px-4 flex text-white/90 text-[10px] font-bold uppercase tracking-widest shadow-md">
                <span className="w-8 text-center">R</span>
                <span className="flex-grow ml-2">Lið</span>
                <span className="w-8 text-center">L</span>
                <span className="w-8 text-center text-white">Stig</span>
              </div>
              <div className="flex flex-col">
                {currentData.standings.map((row) => (
                  <div key={row.rank} className={`flex items-center py-3 px-4 border-b border-gray-50 last:border-0 ${row.team === 'Haukar' ? 'bg-[#c8102e]/5 border-l-4 border-l-[#c8102e]' : 'border-l-4 border-l-transparent'}`}>
                    <span className={`w-8 text-center font-bold text-sm ${row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-gray-400'}`}>
                      {row.rank}
                    </span>
                    <span className={`flex-grow ml-2 text-sm font-bold ${row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                      {row.team}
                    </span>
                    <span className="w-8 text-center text-gray-400 text-xs">{row.played}</span>
                    <span className={`w-8 text-center font-black text-sm ${row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                      {row.pts}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 text-center border-t border-gray-100 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Lifandi gögn frá HBStatz</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. TOPPHANDBOLTI SOCIAL WALL */}
      <div className="w-full bg-gradient-to-br from-[#c8102e] to-[#9b0c23] py-24 mt-12 relative overflow-hidden border-t-8 border-[#1c2c6c]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[#1c2c6c] bg-white/90 px-3 py-1 rounded-full font-bold tracking-widest uppercase text-[10px] mb-4 inline-flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined text-[14px]">share</span>
                Veggurinn
              </span>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
                Haukar Topphandbolti
              </h2>
            </div>
            <div className="flex gap-4">
              <a href="#" className="flex items-center gap-2 bg-white/10 hover:bg-[#1c2c6c] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl">
                Instagram
              </a>
              <a href="#" className="flex items-center gap-2 bg-white/10 hover:bg-[#1c2c6c] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl">
                Facebook
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPosts.map((post) => (
              <a href="#" key={post.id} className="group bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 backdrop-blur-md flex flex-col shadow-xl hover:shadow-2xl">
                <div className="relative aspect-square overflow-hidden">
                  <img src={post.image} alt="Social Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20 ${post.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-[#1877F2]'}`}>
                    <span className="material-symbols-outlined text-[16px]">
                      {post.platform === 'Instagram' ? 'photo_camera' : 'thumb_up'}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-transparent to-black/20">
                  <span className="text-white/70 text-[10px] font-bold tracking-widest mb-2 block">{post.handle}</span>
                  <p className="text-white text-sm font-medium leading-relaxed mb-4 flex-grow line-clamp-3">
                    {post.text}
                  </p>
                  <div className="flex items-center gap-1 text-white/90 mt-auto bg-black/20 w-fit px-2 py-1 rounded-md">
                    <span className="material-symbols-outlined text-[14px] text-pink-400">favorite</span>
                    <span className="text-xs font-bold">{post.likes}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}