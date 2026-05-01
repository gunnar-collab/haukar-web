import { cn } from '../lib/utils.js';

export default function Veggurinn() {
  const posts = [
    {
      id: 1,
      user: 'Haukar Handbolti',
      handle: '@haukar_handbolti',
      platform: 'Instagram',
      content: 'Stórleikur í kvöld! Strákarnir tilbúnir í slaginn gegn FH. Sjáumst í stúkunni! 🔴⚪️ #handbolti #áframhaukar',
      image: '/images/social/handball_post.png',
      time: '2 klst síðan',
      likes: '524'
    },
    {
      id: 2,
      user: 'Haukar Fótbolti',
      handle: 'Haukar Fótbolti',
      platform: 'Facebook',
      content: 'Frábær sigur hjá stelpunum okkar í dag! Samheldni og barátta skilaði 3 mikilvægum stigum. ⚽️💪 #fotbolti #haukarstúlkur',
      image: '/images/social/football_post.png',
      time: '4 klst síðan',
      likes: '312'
    },
    {
      id: 3,
      user: 'Haukar Karfa',
      handle: '@haukar_karfa',
      platform: 'Instagram',
      content: 'Ekkert stöðvar okkur! Troðsla kvöldsins á Ásvöllum. Stemningin var ólýsanleg! 🏀🔥 #haukarkarfa #dunk',
      image: '/images/social/basketball_post.png',
      time: '6 klst síðan',
      likes: '842'
    },
    {
      id: 4,
      user: 'Haukar Karate',
      handle: 'Haukar Karate',
      platform: 'Facebook',
      content: 'Fókus og agi. Flott frammistaða hjá okkar fólki á Íslandsmótinu um helgina. Til hamingju öll! 🥋✨ #karate #haukar',
      image: '/images/social/karate_post.png',
      time: 'Í gær',
      likes: '156'
    }
  ];

  return (
    <section className="relative w-full py-8 md:py-16 bg-white font-sans selection:bg-[#1c2c6c] selection:text-white overflow-hidden border-t border-gray-100">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_#1c2c6c_1px,_transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1c2c6c]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Minimalist Header Section (Uniform with NewsGrid & TrophyCabinet) */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#1c2c6c] text-xs font-bold uppercase tracking-widest block mb-1">
              #ÁframHaukar
            </span>
            <h2 className="text-5xl md:text-6xl font-black italic tracking-normal text-[#c8102e] drop-shadow-sm">
              Veggurinn á Ásvöllum
            </h2>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex font-bold text-[#1c2c6c] hover:text-[#c8102e] transition-colors items-center gap-1 mb-2 text-sm uppercase tracking-widest">
            Fylgjast Með <span className="text-xl leading-none">&rsaquo;</span>
          </a>
        </div>
        
        {/* Mobile Link placed below title for better flow */}
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="md:hidden font-bold text-[#1c2c6c] hover:text-[#c8102e] transition-colors flex items-center gap-1 mb-8 text-sm uppercase tracking-widest">
          Fylgjast Með <span className="text-xl leading-none">&rsaquo;</span>
        </a>

        {/* Mobile: Horizontal Snap Scroll | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto md:overflow-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center group bg-white rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col"
            >
              {/* Header */}
              <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1c2c6c] font-black text-xs italic">
                  {post.user.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gray-900 leading-none mb-1">{post.user}</span>
                  <span className="text-[9px] font-medium text-gray-400 tracking-widest">{post.handle}</span>
                </div>
              </div>

              {/* Media */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img 
                  src={post.image} 
                  alt="Social post" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" 
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col bg-white">
                <p className="text-gray-600 text-xs font-medium leading-relaxed line-clamp-3 mb-4">
                  <span className="font-bold mr-2 text-[#1c2c6c]">{post.user}</span>
                  {post.content}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-1.5 text-gray-400">
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                    <span className="text-[11px] font-bold">{post.likes}</span>
                  </div>
                  <span className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">{post.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}