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
          {/* Changed <a> to <Link> */}
          <Link to="/grein" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2">
            Sjá Allt <span className="text-xl leading-none">&rsaquo;</span>
          </Link>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Large Left Card: Player Portrait */}
          <Link to="/grein" className="lg:col-span-1 lg:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow min-h-[450px] lg:min-h-full flex flex-col justify-end p-6 bg-[#1c2c6c]">
             
             {/* The Goalkeeper Image (Fixed the line break typo here!) */}
             <img 
               src="/images/goalkeeper.png" 
               alt="Grétar Ari" 
               className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
             />

             {/* Dark Gradient Overlay for Text Readability */}
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

          {/* Bottom Middle Card: Handball */}
          <Link to="/grein" className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-end min-h-[220px]">
            <div className="flex-grow"></div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Handbolti • 5 klst síðan
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Stelpurnar okkar mæta Val í undanúrslitum
            </h3>
          </Link>

          {/* Bottom Right Card: Club */}
          <Link to="/grein" className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-end min-h-[220px]">
            <div className="flex-grow"></div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Klúbburinn • Gær
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Bæjarstjóri heimsækir nýja félagsmiðstöð
            </h3>
          </Link>

        </div>
      </div>
    </section>
  );
}