import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { newsArticles } from '../data/newsData';

export default function Frettir() {
  const [filter, setFilter] = useState('Allar');
  const categories = ['Allar', ...new Set(newsArticles.map(a => a.category))];

  const filteredNews = filter === 'Allar' 
    ? newsArticles 
    : newsArticles.filter(a => a.category === filter);

  return (
    <div className="bg-[#fafafa] min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-[#c8102e] text-sm font-bold uppercase tracking-widest block mb-2">
            Haukar
          </span>
          <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-8">
            Fréttasafn
          </h1>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  filter === category
                    ? 'bg-[#c8102e] text-white shadow-md'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#c8102e] hover:text-[#c8102e]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <Link 
              key={article.slug} 
              to={`/frett/${article.slug}`} 
              className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group border border-gray-100"
            >
              <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100 relative">
                <img 
                  src={article.image || (article.images && article.images[0]?.src)} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
                {article.category} • {article.date}
              </span>
              <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors mb-3">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
                {article.lead}
              </p>
              <div className="mt-auto flex items-center text-[#c8102e] text-sm font-bold">
                Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
