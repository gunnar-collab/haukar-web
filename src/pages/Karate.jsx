import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function Karate() {
  const [gender, setGender] = useState('karla'); // 'karla' | 'kvenna'
  const [loading, setLoading] = useState(true);

  // Simulate an API call to KAÍ (Karatésamband Íslands)
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
      { rank: 1, team: 'Fylkir', played: 5, w: 12, d: 8, l: 4, pts: 120 },
      { rank: 2, team: 'Haukar', played: 5, w: 10, d: 6, l: 3, pts: 95 },
      { rank: 3, team: 'Breiðablik', played: 5, w: 8, d: 5, l: 6, pts: 82 },
      { rank: 4, team: 'Þór', played: 5, w: 5, d: 7, l: 4, pts: 65 },
      { rank: 5, team: 'Afturelding', played: 5, w: 3, d: 4, l: 8, pts: 40 },
    ],
    nextMatch: {
      competition: 'Íslandsmeistaramót í Kumite',
      home: 'Allir flokkar',
      away: 'Fjölnishöll',
      date: 'Lau 22. Okt • 09:00',
      venue: 'Fjölnishöllin',
    },
    lastMatch: {
      competition: 'Bikarmót KAÍ - 2. mót',
      home: 'Haukar',
      away: 'Verðlaun',
      homeScore: 4, // Gold
      awayScore: 2, // Silver
      statsLink: 'https://kai.is/'
    },
    players: [
      { number: "1. Dan", slug: "jon-sveinsson", name: "Jón Sveinsson", position: "Svart Belti", deepStats: { leikir: 8, mork: 4, nytni: 2, sto: 1 }, img: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800" },
      { number: "1. Kyu", slug: "sigurdur-pall", name: "Sigurður Páll", position: "Brúnt Belti", deepStats: { leikir: 6, mork: 2, nytni: 3, sto: 2 }, img: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800" },
      { number: "2. Dan", slug: "kristjan-orn", name: "Kristján Örn", position: "Svart Belti", deepStats: { leikir: 10, mork: 7, nytni: 1, sto: 0 }, img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=800" }
    ]
  };

  // --- MOCK API DATA: KVENNA (WOMEN) ---
  const dataKvenna = {
    standings: [
      { rank: 1, team: 'Haukar', played: 5, w: 14, d: 5, l: 2, pts: 135 },
      { rank: 2, team: 'Fylkir', played: 5, w: 11, d: 4, l: 3, pts: 105 },
      { rank: 3, team: 'Breiðablik', played: 5, w: 7, d: 6, l: 5, pts: 78 },
      { rank: 4, team: 'KFR', played: 5, w: 6, d: 3, l: 4, pts: 60 },
      { rank: 5, team: 'Afturelding', played: 5, w: 4, d: 2, l: 5, pts: 45 },
    ],
    nextMatch: {
      competition: 'Íslandsmeistaramót í Kumite',
      home: 'Allir flokkar',
      away: 'Fjölnishöll',
      date: 'Lau 22. Okt • 09:00',
      venue: 'Fjölnishöllin',
    },
    lastMatch: {
      competition: 'Bikarmót KAÍ - 2. mót',
      home: 'Haukar',
      away: 'Verðlaun',
      homeScore: 5, // Gold
      awayScore: 3, // Silver
      statsLink: 'https://kai.is/'
    },
    players: [
      { number: "2. Dan", slug: "anna-maria", name: "Anna María", position: "Svart Belti", deepStats: { leikir: 9, mork: 6, nytni: 2, sto: 0 }, img: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800" },
      { number: "1. Dan", slug: "maria-gudmunds", name: "María Guðmunds", position: "Svart Belti", deepStats: { leikir: 7, mork: 3, nytni: 4, sto: 1 }, img: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&q=80&w=800" },
      { number: "1. Kyu", slug: "sara-dis", name: "Sara Dís", position: "Brúnt Belti", deepStats: { leikir: 5, mork: 1, nytni: 2, sto: 3 }, img: "https://images.unsplash.com/photo-1550091873-1025a1768822?auto=format&fit=crop&q=80&w=800" }
    ]
  };

  const currentData = gender === 'karla' ? dataKarla : dataKvenna;

  // --- KARATE SPECIFIC NEWS ---
  const karateNews = [
    { id: 1, category: "Afreksstarf", title: "Fimm Haukar valdir í landsliðshóp KAÍ", date: "12. Okt", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800" },
    { id: 2, category: "Mótamál", title: "Frábær árangur á Bikarmóti í Kumite", date: "5. Okt", image: "https://images.unsplash.com/photo-1544365558-35aa4afcf11f?auto=format&fit=crop&q=80&w=800" },
    { id: 3, category: "Beltapróf", title: "Haust-beltapróf verða haldin í lok nóvember", date: "1. Okt", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800" },
  ];

  // --- HAUKAR KARATE SOCIAL POSTS ---
  const socialPosts = [
    { id: 1, platform: 'Instagram', handle: '@haukar_karate', image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800', text: 'Gull, silfur og brons! Stórkostleg helgi að baki á Bikarmótinu. 🥇🥈🥉 #haukar #karate', likes: '215' },
    { id: 2, platform: 'Facebook', handle: 'Haukar Karaté', image: 'https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&q=80&w=800', text: 'Minnum á skráningu á byrjendanámskeið barna. Örfá pláss laus í 6-8 ára hópnum!', likes: '142' },
    { id: 3, platform: 'Instagram', handle: '@haukar_karate', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=800', text: 'Fókus og yfirvegun. Undirbúningur fyrir Íslandsmeistaramótið í fullum gangi. 🥋🔥', likes: '308' },
    { id: 4, platform: 'Facebook', handle: 'Haukar Karaté', image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=800', text: 'Til hamingju með svarta beltið! Frábær árangur hjá okkar fólki í dag.', likes: '456' },
  ];

  return (
    <div className="flex flex-col w-full bg-[#fafafa] selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. DIVISION HERO */}
      <div className="relative w-full h-[45vh] min-h-[350px] flex items-end pb-12 bg-[#c8102e] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#a30d25] via-[#c8102e]/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col md:flex-row justify-between items-end gap-6 pb-6">
          <div>
            <span className="text-[#1c2c6c] bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm font-bold tracking-widest uppercase text-xs mb-4 inline-flex items-center gap-2 border border-white/20 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">sports_martial_arts</span>
              Haukar Karaté
            </span>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg">
              {gender === 'karla' ? 'Keppnislið Karla' : 'Keppnislið Kvenna'}
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

      {/* 2. QUICK ACTION BAR - KDH.is & Stundatafla */}
      <div className="max-w-7xl mx-auto px-6 relative z-30 -mt-8 w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* KDH.is Link */}
          <a href="https://kdh.is/" target="_blank" rel="noreferrer" className="bg-[#1c2c6c] rounded-2xl shadow-xl p-5 md:p-6 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300 border border-[#1c2c6c] hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white/10 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:bg-[#c8102e] transition-colors border border-white/10">
                <span className="material-symbols-outlined text-[24px]">language</span>
              </div>
              <div>
                <p className="text-white/60 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">Sérvefur Karatedeildar</p>
                <h3 className="font-black italic text-white uppercase tracking-tight text-lg md:text-xl">Fara á KDH.is</h3>
              </div>
            </div>
            <span className="material-symbols-outlined text-white/30 group-hover:text-white transition-colors">open_in_new</span>
          </a>

          {/* Stundatafla Link */}
          <a href="https://www.haukar.is/wp-content/uploads/2014/12/Stundatafla-21-22.pdf" target="_blank" rel="noreferrer" className="bg-white rounded-2xl shadow-xl p-5 md:p-6 flex items-center justify-between group hover:-translate-y-1 transition-all duration-300 border border-gray-100 hover:border-[#c8102e]/30 hover:shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-50 rounded-full flex items-center justify-center text-[#c8102e] group-hover:bg-[#c8102e] group-hover:text-white transition-colors border border-gray-100">
                <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              </div>
              <div>
                <p className="text-gray-400 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5">Smelltu til að sækja PDF</p>
                <h3 className="font-black italic text-[#1c2c6c] uppercase tracking-tight text-lg md:text-xl group-hover:text-[#c8102e] transition-colors">Stundatafla Æfinga</h3>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-300 group-hover:text-[#c8102e] transition-colors">download</span>
          </a>

        </div>
      </div>

      {/* 3. LIVE DASHBOARD - Adapted for Tournaments */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LATEST TOURNAMENT */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 py-6 px-8 flex flex-col justify-between relative overflow-hidden h-[180px]">
            {loading && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1c2c6c]">Sæki KAÍ Gögn...</span>
              </div>
            )}
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest block">Síðasta Mót • {currentData.lastMatch.competition}</span>
            <div className="flex items-center justify-between my-auto">
              <span className="text-2xl font-black italic uppercase text-[#c8102e]">Afrek Hauka</span>
              <div className="bg-gray-50 px-4 py-2 rounded-xl text-xl font-black italic border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="flex items-center gap-1" title="Gullverðlaun"><span className="text-yellow-500 material-symbols-outlined text-[24px]">workspace_premium</span><span className="text-[#1c2c6c]">{currentData.lastMatch.homeScore}</span></div>
                <div className="flex items-center gap-1" title="Silfurverðlaun"><span className="text-gray-400 material-symbols-outlined text-[24px]">workspace_premium</span><span className="text-[#1c2c6c]">{currentData.lastMatch.awayScore}</span></div>
              </div>
            </div>
            <a href={currentData.lastMatch.statsLink} target="_blank" rel="noreferrer" className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-[#1c2c6c] py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-[11px] font-bold uppercase tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-[16px]">emoji_events</span>
              Skoða Úrslit á KAÍ
            </a>
          </div>

          {/* NEXT TOURNAMENT */}
          <div className="bg-gradient-to-br from-[#1c2c6c] to-gray-900 text-white rounded-2xl shadow-md py-6 px-8 flex flex-col justify-between relative overflow-hidden h-[180px]">
            {loading && (
              <div className="absolute inset-0 bg-[#1c2c6c]/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
                <span className="material-symbols-outlined animate-spin text-[#c8102e] text-3xl mb-2">sync</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white">Sæki mótaplan...</span>
              </div>
            )}
            <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest block">Næsta Mót • {currentData.nextMatch.competition}</span>
            <div className="flex items-center justify-between my-auto text-xl font-black italic uppercase">
              <span>{currentData.nextMatch.home}</span>
              <span className="text-white/30 text-sm font-normal not-italic px-4 material-symbols-outlined">arrow_forward</span>
              <span>{currentData.nextMatch.away}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 bg-white/10 rounded-xl px-4 py-2 border border-white/5">
                <div className="text-left">
                  <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Hvenær</span>
                  <span className="font-bold text-xs">{currentData.nextMatch.date}</span>
                </div>
                <div className="w-px h-6 bg-white/10"></div>
                <div className="text-left">
                  <span className="block text-white/50 text-[9px] uppercase tracking-widest mb-0.5">Staðsetning</span>
                  <span className="font-bold text-xs">{currentData.nextMatch.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. FRÉTTIR ÚR KARATÉ */}
      <div className="max-w-7xl mx-auto px-6 mb-20 w-full">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">Fréttir úr Karaté</h2>
          <Link to="/frettir" className="text-[#1c2c6c] text-sm font-bold uppercase tracking-widest hover:text-[#c8102e] transition-colors flex items-center gap-1">
            Allar fréttir <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {karateNews.map((news) => (
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

      {/* 5. AFREKSHÓPUR & STIGATAFLA */}
      <div className="max-w-7xl mx-auto px-6 py-12 w-full bg-white rounded-3xl shadow-xl border border-gray-100 mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#c8102e]"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative z-10">
          
          {/* Left Side: Elite Roster */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">Afrekshópur</h2>
                <p className="text-gray-500 text-sm mt-1">Keppendur okkar í fremstu röð</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {loading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10"></div>
              )}
              {currentData.players.map((player) => (
                <div 
                  key={player.slug} 
                  className="group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/4] cursor-pointer shadow-lg block border border-transparent hover:border-[#c8102e]/50"
                >
                  <img src={player.img} alt={player.name} className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] via-[#1c2c6c]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                  
                  {/* Belt Badge instead of Number */}
                  <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded border border-white/20 shadow-md">
                    <span className="text-xs font-black italic tracking-widest text-white drop-shadow-md">
                      {player.number}
                    </span>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-[#1c2c6c] bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2 inline-block shadow-sm">{player.position}</p>
                    <h3 className="text-white text-xl font-black italic tracking-tight uppercase drop-shadow-md">{player.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Club Rankings KAÍ */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase mb-8">Stigafjöldi KAÍ</h2>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden relative min-h-[300px]">
              {loading && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-10 flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined animate-spin text-[#c8102e] text-4xl mb-4">sync</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#1c2c6c]">Tengist KAÍ...</span>
                </div>
              )}
              <div className="bg-gradient-to-r from-[#c8102e] to-[#a30d25] py-3 px-4 flex text-white/90 text-[10px] font-bold uppercase tracking-widest shadow-md">
                <span className="w-8 text-center">R</span>
                <span className="flex-grow ml-2">Félag</span>
                <span className="w-12 text-center text-yellow-300"><span className="material-symbols-outlined text-[16px] transform translate-y-0.5">workspace_premium</span></span>
                <span className="w-10 text-center text-white">Stig</span>
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
                    <span className="w-12 text-center text-gray-400 text-xs font-bold">{row.w}</span>
                    <span className={`w-10 text-center font-black text-sm ${row.team === 'Haukar' ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                      {row.pts}
                    </span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-gray-50 text-center border-t border-gray-100 flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-gray-400 text-[9px] font-bold uppercase tracking-widest">Opinberar tölur KAÍ</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. KARATE SOCIAL WALL */}
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
                Haukar Karaté
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