import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { newsArticles } from '../data/newsData';
import { cn } from '../lib/utils';

function NewsSlider({ images, title }) {
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

      {/* Manual Controls - Appear on Hover */}
      <button 
        onClick={(e) => { e.preventDefault(); setCurrentIndex((prev) => (prev - 1 + images.length) % images.length); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/30 border border-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 z-30 shadow-lg"
      >
        <span className="material-symbols-outlined text-2xl">chevron_left</span>
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); setCurrentIndex((prev) => (prev + 1) % images.length); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/30 border border-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover/slider:opacity-100 z-30 shadow-lg"
      >
        <span className="material-symbols-outlined text-2xl">chevron_right</span>
      </button>

      {/* Indicator Pill */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 px-4 py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-lg">
          {images.map((_, idx) => (
            <button 
              key={idx}
              onClick={(e) => { e.preventDefault(); setCurrentIndex(idx); }}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewsArticle() {
  const { slug } = useParams();
  const article = newsArticles.find(a => a.slug === slug) || newsArticles[0];
  const [copied, setCopied] = useState(false);

  // Always snap to the top when loading a new article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.lead,
          url: window.location.href,
        });
      } catch (err) {
        console.log('User cancelled share or share failed');
      }
    } else {
      // Fallback to copy link if native share isn't supported
      handleCopy();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!article) return null;

  return (
    <main className="w-full bg-white flex-grow pt-10 md:pt-16 pb-20">
      
      {/* 1. Article Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-6 pt-8 md:pt-12 mb-8">
        
        {/* Breadcrumbs & Meta */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="text-gray-400 hover:text-[#c8102e] transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Forsíða
          </Link>
          <span className="text-gray-200">/</span>
          <span className="bg-[#c8102e] text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
            {article.category}
          </span>
          <span className="text-gray-400 text-xs font-bold flex items-center gap-1 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {article.date}
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="text-4xl md:text-7xl font-black tracking-tight text-[#1c2c6c] leading-[1.1] mb-8">
          {article.title.split('\n').map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && (
                <>
                  <br className="md:hidden" />
                  <span className="hidden md:inline"> </span>
                </>
              )}
            </span>
          ))}
        </h1>
        
        {/* Subheadline / Lead Paragraph */}
        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          {article.lead}
        </p>
      </header>

      {/* 2. Cinematic Hero Image / Slider */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <div className="w-full aspect-video md:aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative group">
          {article.images && article.images.length > 1 ? (
            <div className="w-full h-full relative">
               <NewsSlider images={article.images} title={article.title} />
            </div>
          ) : (
            <img 
              src={article.image || (article.images && article.images[0])} 
              alt={article.title} 
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
          )}
          {/* Image Credit */}
          <div className="absolute bottom-4 right-4 text-white/60 text-[9px] font-bold uppercase tracking-[0.15em] drop-shadow-sm z-20">
            Mynd: Ljósmyndari Hauka
          </div>
        </div>
      </div>

      {/* 3. The Article Body */}
      <article 
        className="max-w-3xl mx-auto px-4 md:px-6 prose prose-lg md:prose-xl prose-headings:font-black prose-a:text-[#c8102e] news-article-body"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* 4. Social Share & Footer CTA */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Deila grein:</span>
          <button 
            onClick={handleShare}
            className="w-10 h-10 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-[#c8102e] hover:text-white transition-colors flex items-center justify-center shadow-sm hover:shadow-md"
            aria-label="Deila grein"
            title="Deila"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button 
            onClick={handleCopy}
            className={`w-10 h-10 rounded-full transition-all flex items-center justify-center shadow-sm hover:shadow-md ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-[#1c2c6c] hover:bg-[#c8102e] hover:text-white'}`}
            aria-label="Afrita hlekk"
            title="Afrita hlekk"
          >
            <span className="material-symbols-outlined text-[18px]">{copied ? 'check' : 'link'}</span>
          </button>
        </div>

        <Link to="/" className="text-sm font-bold text-[#1c2c6c] border-b-2 border-transparent hover:border-[#c8102e] uppercase tracking-wider transition-colors pb-1">
          Aftur á forsíðu
        </Link>

      </div>
    </main>
  );
}