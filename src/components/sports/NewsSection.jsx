import { Link } from 'react-router-dom';

export default function NewsSection({ title, newsList }) {
  return (
    <div className="max-w-7xl mx-auto px-6 mb-20 w-full">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">{title}</h2>
        <Link to="/frettir" className="text-[#1c2c6c] text-sm font-bold uppercase tracking-widest hover:text-[#c8102e] transition-colors flex items-center gap-1" aria-label={`Sjá allar fréttir um ${title}`}>
          Allar fréttir <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newsList.map((news) => (
          <Link to={`/frett/${news.slug}`} key={news.id} aria-label={`Lesa grein: ${news.title}`} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#c8102e]/30">
            <div className="relative h-48 overflow-hidden">
              <img src={news.image} alt={news.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-[#1c2c6c] text-white text-[9px] font-bold px-3 py-1 rounded-sm uppercase tracking-widest z-10 shadow-md">
                {news.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]" aria-hidden="true">calendar_today</span>
                {news.date}
              </span>
              <h3 className="text-xl font-bold text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">
                {news.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
