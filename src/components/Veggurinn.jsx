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
    <section className="w-full bg-gradient-to-br from-[#c8102e] to-[#9b0c23] py-16 md:py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1c2c6c]/20 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#1c2c6c] bg-white px-3 py-1 rounded-full font-black tracking-widest uppercase text-[10px] shadow-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">public</span>
                Haukar á samfélagsmiðlum
              </span>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                #ÁframHaukar
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase drop-shadow-2xl leading-none">
              Veggurinn á Ásvöllum
            </h2>
            <p className="text-white/80 text-sm font-medium mt-6 leading-relaxed">
              Taktu þátt í stemningunni! Merktu myndirnar þínar með <strong className="text-white font-black underline decoration-[#1c2c6c] decoration-4 underline-offset-4">#ÁframHaukar</strong> til að birtast á veggnum.
            </p>
          </div>

          <div className="flex gap-4 w-full md:w-auto">
             <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white text-[#c8102e] px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl hover:scale-105 active:scale-95">
               Fylgjast með
             </button>
          </div>
        </div>

        {/* Mobile: Horizontal Snap Scroll | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 overflow-x-auto md:overflow-visible pb-12 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center group bg-white rounded-[2.5rem] overflow-hidden hover:-translate-y-3 transition-all duration-500 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-12 h-12 rounded-full p-[2px] flex items-center justify-center shadow-inner",
                    post.platform === 'Instagram' ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" : "bg-[#1877F2]"
                  )}>
                    <div className="w-full h-full rounded-full bg-white p-[2px]">
                      <div className="w-full h-full rounded-full bg-[#1c2c6c] flex items-center justify-center text-white font-black text-xs italic">
                        {post.user.charAt(0)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[12px] font-black uppercase tracking-tight text-gray-900 leading-none mb-1">{post.user}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{post.handle}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-200">verified</span>
              </div>

              {/* Media */}
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Social post" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out" 
                />
                <div className={cn(
                  "absolute top-5 right-5 w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-2xl backdrop-blur-md border border-white/20",
                  post.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-400/80 via-pink-500/80 to-purple-600/80' : 'bg-[#1877F2]/80'
                )}>
                  <span className="material-symbols-outlined text-[20px]">
                    {post.platform === 'Instagram' ? 'photo_camera' : 'thumb_up'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col bg-white">
                <div className="flex items-center gap-5 mb-5">
                  <span className="material-symbols-outlined text-gray-900 text-[28px] hover:text-[#c8102e] cursor-pointer transition-colors">favorite</span>
                  <span className="material-symbols-outlined text-gray-900 text-[28px] hover:text-[#1c2c6c] cursor-pointer transition-colors">chat_bubble</span>
                  <span className="material-symbols-outlined text-gray-900 text-[28px] hover:text-[#1c2c6c] cursor-pointer transition-colors">send</span>
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full">
                     <span className="text-[11px] font-black text-gray-900 italic">{post.likes} likes</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-[13px] font-medium leading-relaxed line-clamp-3">
                  <span className="font-black mr-2 uppercase italic text-[#1c2c6c]">{post.user}</span>
                  {post.content}
                </p>
                
                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{post.time}</span>
                  <span className="text-[11px] font-black text-[#c8102e] uppercase italic tracking-tighter border-b-2 border-[#c8102e]">Sjá færslu</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}