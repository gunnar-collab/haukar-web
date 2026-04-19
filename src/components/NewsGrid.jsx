import { Link } from 'react-router-dom';

export default function NewsGrid() {
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
          <Link to="/grein" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2">
            Sjá Allt <span className="text-xl leading-none">&rsaquo;</span>
          </Link>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Large Left Card: Player Portrait */}
          <Link to="/grein" className="lg:col-span-1 lg:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow min-h-[450px] lg:min-h-full flex flex-col justify-end p-6 bg-[#1c2c6c]">
             <img 
               src="/images/goalkeeper.png" 
               alt="Grétar Ari" 
               className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c]/90 via-[#1c2c6c]/20 to-transparent"></div>
             
             <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
               <span className="bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 inline-block shadow-sm">
                 Uppalinn í Haukum
               </span>
               <h3 className="text-3xl font-black text-white leading-tight drop-shadow-md">
                 Grétar Ari kominn heim
               </h3>
             </div>
          </Link>

          {/* Top Middle Card: Basketball */}
          <Link to="/grein" className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
              <img 
                src="/images/basketball-news.jpg" 
                alt="Basketball Action" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Körfubolti • 2 klst síðan
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Mikil spenna fyrir úrslitakeppninni í körfu
            </h3>
          </Link>

          {/* Top Right Card: Football */}
          <Link to="/grein" className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
              <img 
                src="/images/football-news.jpg" 
                alt="Football Pitch" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Fótbolti • Gær
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Undirbúningur í fullum gangi á Ásvöllum
            </h3>
          </Link>

          {/* Bottom Middle Card: Handball (RED Highlight Card) */}
          <Link to="/grein" className="bg-[#c8102e] rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-6 -mr-4 text-white/10 text-9xl font-black italic select-none">
              H
            </div>
            
            <div className="relative z-10 flex-grow">
              <span className="text-white/80 text-[10px] font-bold uppercase tracking-widest mb-3 block">
                Handbolti • 5 klst síðan
              </span>
              <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                Stelpurnar okkar mæta Val í undanúrslitum
              </h3>
              <p className="text-white/90 text-sm line-clamp-2">
                Eftir frábæran sigur í síðasta leik er ljóst að mikið verður undir á Ásvöllum.
              </p>
            </div>
            
            <div className="relative z-10 mt-4 flex items-center text-white text-sm font-bold">
              Lesa meira <span className="ml-1 text-lg leading-none group-hover:translate-x-1 transition-transform">&rsaquo;</span>
            </div>
          </Link>

          {/* Bottom Right Card: Club (Excerpt Card) */}
          <Link to="/grein" className="bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-3 block">
              Klúbburinn • Gær
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight mb-3">
              Bæjarstjóri heimsækir nýja knatthúsið
            </h3>
            <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-grow">
              Góður rómur var gerður að nýrri aðstöðu Hauka þegar bæjarstjórn mætti í kaffi á Ásvöllum í morgun til að ræða framtíðina.
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