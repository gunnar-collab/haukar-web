import { cn } from '../../lib/utils.js';

export default function SocialWall({ title, socialPosts }) {
  return (
    <div className="w-full bg-gradient-to-br from-[#c8102e] to-[#9b0c23] py-24 mt-12 relative overflow-hidden">
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
              {title}
            </h2>
          </div>
          <div className="flex gap-4">
            <a href="#" className="flex items-center gap-2 bg-white/10 hover:bg-[#1c2c6c] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl" aria-label={`Skoða ${title} á Instagram`}>
              Instagram
            </a>
            <a href="#" className="flex items-center gap-2 bg-white/10 hover:bg-[#1c2c6c] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl" aria-label={`Skoða ${title} á Facebook`}>
              Facebook
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post) => (
            <a href="#" key={post.id} className="group bg-white/10 border border-white/20 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 backdrop-blur-md flex flex-col shadow-xl hover:shadow-2xl">
              <div className="relative aspect-square overflow-hidden">
                <img src={post.image} alt={`Mynd frá færslu eftir ${post.handle}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className={cn(
                  "absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg border border-white/20",
                  post.platform === 'Instagram' ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-[#1877F2]'
                )}>
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
  );
}
