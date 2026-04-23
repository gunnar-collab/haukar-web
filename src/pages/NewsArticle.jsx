import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { newsArticles } from '../data/newsData';

export default function NewsArticle() {
  const { slug } = useParams();
  const article = newsArticles.find(a => a.slug === slug) || newsArticles[0];

  // Always snap to the top when loading a new article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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
          {article.title}
        </h1>
        
        {/* Subheadline / Lead Paragraph */}
        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed max-w-3xl">
          {article.lead}
        </p>
      </header>

      {/* 2. Cinematic Hero Image */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <div className="w-full aspect-video md:aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative group">
          <img 
            src={article.image} 
            alt={article.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Image Credit */}
          <div className="absolute bottom-4 right-4 text-white/60 text-[9px] font-bold uppercase tracking-[0.15em] drop-shadow-sm">
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
          <button className="w-10 h-10 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-[#c8102e] hover:text-white transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-[#c8102e] hover:text-white transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">link</span>
          </button>
        </div>

        <Link to="/" className="text-sm font-bold text-[#1c2c6c] border-b-2 border-transparent hover:border-[#c8102e] uppercase tracking-wider transition-colors pb-1">
          Aftur á forsíðu
        </Link>

      </div>
    </main>
  );
}