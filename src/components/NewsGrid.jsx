import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/newsData';
import { cn } from '../lib/utils';

function GlassNewsSlider({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden group/slider">
      {images.map((img, idx) => {
        const imgSrc = typeof img === 'string' ? img : img.src;
        return (
          <div
            key={imgSrc}
            className={cn(
              "absolute inset-0 w-full h-full transition-opacity duration-1000",
              idx === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            )}
          >
            {/* Blurred Background */}
            <img 
              src={imgSrc} 
              alt="" 
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-70" 
              aria-hidden="true"
            />
            {/* Subtle Dark Glass Overlay */}
            <div className="absolute inset-0 bg-[#1c2c6c]/20 mix-blend-overlay"></div>
            
            {/* Foreground Uncropped Image */}
            <img 
              src={imgSrc} 
              alt={`${title} - ${idx + 1}`} 
              className={cn(
                "absolute inset-0 w-full h-full object-contain transition-transform duration-1000",
                idx === currentIndex ? "scale-100" : "scale-95"
              )}
            />
          </div>
        );
      })}

      {/* Glass Gallery Badge */}
      <div className="absolute top-6 left-6 z-30 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-lg">
        <span className="material-symbols-outlined text-white text-[14px]">photo_library</span>
        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Myndasyrpa</span>
      </div>

      {/* Manual Controls - Appear on Hover */}
      <button 
        onClick={(e) => { e.preventDefault(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/30 border border-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 z-30"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); setCurrentIndex((prev) => (prev + 1) % images.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/30 border border-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 z-30"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      {/* Indicator Pill */}
      {images.length > 1 && (
        <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 z-30 flex gap-1.5 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {images.map((_, idx) => (
            <button 
              key={idx}
              onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewsGrid() {
  // Dynamically get the featured article and the 4 latest articles for the grid
  const featured = newsArticles.find(a => a.featured) || newsArticles[0];
  const gridArticles = newsArticles.filter(a => a.slug !== featured.slug).slice(0, 4);
  
  const [card1, card2, card3, card4] = gridArticles;

  return (
    <section className="w-full bg-white py-8 md:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#1c2c6c] text-xs font-bold uppercase tracking-widest block mb-1">
              Fréttasafn
            </span>
            <h2 className="text-5xl font-black italic tracking-normal text-[#c8102e]">
              Nýjustu Fréttir
            </h2>
          </div>
          <Link to="/frettir" className="font-bold text-[#1c2c6c] hover:text-[#c8102e] transition-colors flex items-center gap-1 mb-2 text-sm uppercase tracking-widest">
            Sjá Allt <span className="text-xl leading-none">&rsaquo;</span>
          </Link>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Large Left Card: Featured Slider / Image */}
          <Link to={`/frett/${featured.slug}`} className="lg:col-span-1 lg:row-span-2 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 min-h-[450px] lg:min-h-full flex flex-col justify-end p-6 bg-black">
             {(featured.images && featured.images.length > 1) ? (
               <GlassNewsSlider images={featured.images} title={featured.title} />
             ) : (
               <img 
                 src={(featured.images && featured.images.length > 0) ? featured.images[0] : featured.image} 
                 alt={featured.title} 
                 className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
             
             <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
               <span className="bg-[#D4AF37] text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded mb-3 inline-block shadow-sm">
                 {featured.category}
               </span>
               <h2 className="text-3xl font-black text-white leading-tight drop-shadow-md">
                 {featured.title}
               </h2>
             </div>
          </Link>

          {/* Top Middle Card */}
          {card1 && (
            <Link to={`/frett/${card1.slug}`} className="bg-white rounded-[2.5rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col group">
              <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
                <img 
                  src={card1.image || (card1.images && card1.images[0]?.src)} 
                  alt={card1.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                {card1.category} • {card1.date}
              </span>
              <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">
                {card1.title}
              </h3>
            </Link>
          )}

          {/* Top Right Card */}
          {card2 && (
            <Link to={`/frett/${card2.slug}`} className="bg-white rounded-[2.5rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col group">
              <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
                <img 
                  src={card2.image || (card2.images && card2.images[0]?.src)} 
                  alt={card2.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                {card2.category} • {card2.date}
              </span>
              <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">
                {card2.title}
              </h3>
            </Link>
          )}

          {/* Bottom Middle Card: Clean White Highlight Card */}
          {card3 && (
            <Link to={`/frett/${card3.slug}`} className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(200,16,46,0.12)] border-t-[6px] border-[#c8102e] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-6 -mr-4 text-[#c8102e]/5 text-9xl font-black italic select-none group-hover:text-[#c8102e]/10 transition-colors">
                H
              </div>
              
              <div className="relative z-10 flex-grow">
                <span className="text-[#c8102e] bg-[#c8102e]/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                  {card3.category} • {card3.date}
                </span>
                <h3 className="text-2xl font-bold text-[#1c2c6c] leading-tight mb-3 group-hover:text-[#c8102e] transition-colors">
                  {card3.title}
                </h3>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {card3.lead}
                </p>
              </div>
              
              <div className="relative z-10 mt-4 flex items-center text-[#c8102e] text-sm font-bold">
                Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
              </div>
            </Link>
          )}

          {/* Bottom Right Card: Gold Highlight Card */}
          {card4 && (
            <Link to={`/frett/${card4.slug}`} className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(212,175,55,0.12)] border-t-[6px] border-[#D4AF37] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden group">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                {card4.category} • Nýtt
              </span>
              <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight mb-3 group-hover:text-[#c8102e] transition-colors">
                {card4.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                {card4.lead}
              </p>
              <div className="mt-auto flex items-center text-[#c8102e] text-sm font-bold">
                Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
              </div>
            </Link>
          )}

        </div>
      </div>
    </section>
  );
}