import { Link } from 'react-router-dom';
import { newsArticles } from '../data/newsData';

export default function NewsGrid() {
  // We'll take the first few articles from our data
  // 1. Featured (Nano Banana)
  // 2. Basketball
  // 3. Football
  // 4. Handball (The red card)
  // 5. Club/General
  
  const featured = newsArticles.find(a => a.slug === 'storsigur-asvollum') || newsArticles[0];
  const nano = newsArticles.find(a => a.slug === 'nano-banana-ny-orka') || newsArticles[1];
  const basket = newsArticles.find(a => a.slug === 'urslitakeppni-korfu') || newsArticles[2];
  const football = newsArticles.find(a => a.slug === 'undirbuningsmot-fotbolti') || newsArticles[3];

  return (
    <section className="w-full bg-[#fafafa] py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-1">
              Fréttasafn
            </span>
            <h2 className="text-5xl font-black italic tracking-normal text-[#c8102e]">
              Nýjustu Fréttir
            </h2>
          </div>
          <Link to="/dagatal" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2 text-sm uppercase tracking-widest">
            Sjá Allt <span className="text-xl leading-none">&rsaquo;</span>
          </Link>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Large Left Card: Nano Banana Featured */}
          <Link to={`/frett/${nano.slug}`} className="lg:col-span-1 lg:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow min-h-[450px] lg:min-h-full flex flex-col justify-end p-6 bg-black">
             <img 
               src={nano.image} 
               alt={nano.title} 
               className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
             
             <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
               <span className="bg-[#fbbf24] text-black text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded mb-3 inline-block shadow-sm">
                 Nýr Samstarfsaðili
               </span>
               <h3 className="text-3xl font-black text-white leading-tight drop-shadow-md">
                 {nano.title}
               </h3>
             </div>
          </Link>

          {/* Top Middle Card: Basketball */}
          <Link to={`/frett/${basket.slug}`} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
              <img 
                src={basket.image} 
                alt={basket.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              {basket.category} • {basket.date}
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight group-hover:text-[#1c2c6c] transition-colors">
              {basket.title}
            </h3>
          </Link>

          {/* Top Right Card: Football */}
          <Link to={`/frett/${football.slug}`} className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
              <img 
                src={football.image} 
                alt={football.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              {football.category} • {football.date}
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight group-hover:text-[#1c2c6c] transition-colors">
              {football.title}
            </h3>
          </Link>

          {/* Bottom Middle Card: Handball (RED Highlight Card) */}
          <Link to={`/frett/${featured.slug}`} className="bg-[#c8102e] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-6 -mr-4 text-white/10 text-9xl font-black italic select-none">
              H
            </div>
            
            <div className="relative z-10 flex-grow">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                {featured.category} • {featured.date}
              </span>
              <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                {featured.title}
              </h3>
              <p className="text-white/90 text-sm line-clamp-2">
                {featured.lead}
              </p>
            </div>
            
            <div className="relative z-10 mt-4 flex items-center text-white text-sm font-bold">
              Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
            </div>
          </Link>

          {/* Bottom Right Card: Club (Excerpt Card) - Reuse Nano or another */}
          <Link to={`/frett/${nano.slug}`} className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
              {nano.category} • Nýtt
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight mb-3">
              {nano.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
              {nano.lead}
            </p>
            <div className="mt-auto flex items-center text-[#c8102e] text-sm font-bold">
              Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}