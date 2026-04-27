import { cn } from '../../lib/utils.js';

export default function SocialWall({ title, socialPosts }) {
  return (
    <div className="w-full bg-gradient-to-br from-[#c8102e] to-[#9b0c23] py-12 md:py-24 mt-12 relative overflow-hidden">
      {/* Dynamic Background Patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1c2c6c]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#1c2c6c] bg-white px-3 py-1 rounded-full font-black tracking-widest uppercase text-[10px] shadow-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[14px]">share</span>
                Veggurinn
              </span>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                Uppfært í rauntíma
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-white uppercase drop-shadow-lg leading-none">
              {title}
            </h2>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <a href="#" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 backdrop-blur-md border border-white/10 shadow-xl">
              <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              Instagram
            </a>
            <a href="#" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#1c2c6c] hover:bg-[#1c2c6c]/80 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-xl">
              <span className="material-symbols-outlined text-[18px]">thumb_up</span>
              Facebook
            </a>
          </div>
        </div>

        {/* Mobile: Horizontal Snap Scroll | Desktop: Grid */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto md:overflow-visible pb-8 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {socialPosts.map((post, idx) => (
            <div 
              key={post.id} 
              className="min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center group bg-white rounded-[2rem] overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-2xl flex flex-col"
            >
              {/* Card Header (IG/FB Style) */}
              <div className="p-4 flex items-center justify-between border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full p-[2px] flex items-center justify-center",
                    post.platform === 'Instagram' ? "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" : "bg-[#1877F2]"
                  )}>
                    <div className="w-full h-full rounded-full bg-white p-[2px]">
                      <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                         <span className="material-symbols-outlined text-[16px] text-gray-400">person</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-tight text-gray-900 leading-none mb-0.5">{post.handle}</span>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{post.platform}</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-gray-300">more_horiz</span>
              </div>

              {/* Main Image */}
              <div className="relative aspect-square overflow-hidden">
                <img src={post.image} alt={post.text} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                
                {/* Platform Badge overlay */}
                <div className={cn(
                  "absolute top-4 right-4 w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-2xl backdrop-blur-md border border-white/20",
                  post.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-400/80 via-pink-500/80 to-purple-600/80' : 'bg-[#1877F2]/80'
                )}>
                  <span className="material-symbols-outlined text-[20px]">
                    {post.platform === 'Instagram' ? 'photo_camera' : 'thumb_up'}
                  </span>
                </div>
              </div>

              {/* Engagement & Caption */}
              <div className="p-6 flex flex-col bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-gray-900 text-[24px]">favorite</span>
                  <span className="material-symbols-outlined text-gray-900 text-[24px]">chat_bubble</span>
                  <span className="material-symbols-outlined text-gray-900 text-[24px]">send</span>
                  <div className="ml-auto flex items-center gap-1.5 px-3 py-1 bg-gray-50 rounded-full">
                     <span className="text-[10px] font-black text-gray-900 italic">{post.likes} likes</span>
                  </div>
                </div>
                
                <p className="text-gray-700 text-xs font-medium leading-relaxed line-clamp-3">
                  <span className="font-black mr-2 uppercase italic">{post.handle}</span>
                  {post.text}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                  <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Fyrir 2 klukkustundum</span>
                  <span className="text-[10px] font-black text-[#c8102e] uppercase italic tracking-tighter">Sjá færslu</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
