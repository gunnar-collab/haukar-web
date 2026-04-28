import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/newsData';
import { cn } from '../lib/utils';

function NewsCardSlider({ images, title }) {
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
    <div className="absolute inset-0 w-full h-full">
      {images.map((img, idx) => (
        <img 
          key={typeof img === 'string' ? img : img.src}
          src={typeof img === 'string' ? img : img.src} 
          alt={`${title} - ${idx + 1}`} 
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
            idx === currentIndex ? "opacity-100 scale-105" : "opacity-0"
          )}
          style={{ objectPosition: typeof img === 'string' ? 'center' : (img.position || 'center') }}
        />
      ))}
      {/* Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-6 z-30 flex gap-1.5">
          {images.map((_, idx) => (
            <div 
              key={idx}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                idx === currentIndex ? "w-4 bg-white" : "w-1.5 bg-white/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewsGrid() {
  // Sort by date (assuming ISO format or descending order in array)
  // For now we just use the order in newsArticles
  const anniversary = newsArticles.find(a => a.slug === 'afmaeli-hauka-95-ara');
  const hjortur = newsArticles.find(a => a.slug === 'hjortur-ingi-snyr-heim');
  const nano = newsArticles.find(a => a.slug === 'nano-banana-ny-orka');
  const basket = newsArticles.find(a => a.slug === 'urslitakeppni-korfu');
  const football = newsArticles.find(a => a.slug === 'haukar-bikar-sigur-olafsvik') || newsArticles.find(a => a.slug === 'undirbuningsmot-fotbolti');
  const featured = anniversary || newsArticles[0];

  return (
    <section className="w-full bg-white py-10 md:py-16 border-b border-gray-100">
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
          
          {/* Large Left Card: Anniversary Featured Slider */}
          <Link to={`/frett/${featured.slug}`} className="lg:col-span-1 lg:row-span-2 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 min-h-[450px] lg:min-h-full flex flex-col justify-end p-6 bg-black">
             {featured.images ? (
               <NewsCardSlider images={featured.images} title={featured.title} />
             ) : (
               <img 
                 src={featured.image} 
                 alt={featured.title} 
                 className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
               />
             )}
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
             
             <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
               <span className="bg-[#D4AF37] text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded mb-3 inline-block shadow-sm">
                 95 Ára Afmæli
               </span>
               <h2 className="text-3xl font-black text-white leading-tight drop-shadow-md">
                 {featured.title}
               </h2>
             </div>
          </Link>

          {/* Top Middle Card: Basketball */}
          <Link to={`/frett/${basket.slug}`} className="bg-white rounded-[2.5rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col group">
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
            <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">
              {basket.title}
            </h3>
          </Link>

          {/* Top Right Card: Football */}
          <Link to={`/frett/${football.slug}`} className="bg-white rounded-[2.5rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col group">
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
            <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">
              {football.title}
            </h3>
          </Link>

          {/* Bottom Middle Card: Hjörtur Ingi (Clean White Highlight Card) */}
          <Link to={`/frett/${hjortur.slug}`} className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(200,16,46,0.12)] border-t-[6px] border-[#c8102e] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-6 -mr-4 text-[#c8102e]/5 text-9xl font-black italic select-none group-hover:text-[#c8102e]/10 transition-colors">
              H
            </div>
            
            <div className="relative z-10 flex-grow">
              <span className="text-[#c8102e] bg-[#c8102e]/10 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 inline-block">
                {hjortur.category} • {hjortur.date}
              </span>
              <h3 className="text-2xl font-bold text-[#1c2c6c] leading-tight mb-3 group-hover:text-[#c8102e] transition-colors">
                {hjortur.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                {hjortur.lead}
              </p>
            </div>
            
            <div className="relative z-10 mt-4 flex items-center text-[#c8102e] text-sm font-bold">
              Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
            </div>
          </Link>

          {/* Bottom Right Card: Nano Banana */}
          <Link to={`/frett/${nano.slug}`} className="bg-white rounded-[2.5rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-500 cursor-pointer flex flex-col group">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
              {nano.category} • Nýtt
            </span>
            <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight mb-3 group-hover:text-[#c8102e] transition-colors">
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