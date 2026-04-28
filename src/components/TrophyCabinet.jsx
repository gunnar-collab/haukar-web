import { Link } from 'react-router-dom';

export default function TrophyCabinet() {
  return (
    <section className="w-full bg-white py-10 md:py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-1">
              Stolt Félagsins
            </span>
            <h2 className="text-5xl font-black italic tracking-tighter text-[#c8102e]">
              Verðlaunin
            </h2>
          </div>
          <Link to="/sagan" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2">
            Öll sagan <span className="text-xl leading-none">&rsaquo;</span>
          </Link>
        </div>

        {/* The Display Cases (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Handbolti Cabinet */}
          <div className="group relative bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(200,16,46,0.12)] transition-all duration-500 flex flex-col h-full overflow-hidden pl-[30px] lg:pl-[38px]">
            {/* Animated Gold/Red Border */}
            <div className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-b from-[#D4AF37] via-[#c8102e] to-[#D4AF37] bg-[length:100%_200%] animate-gradient-y"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[150px] lg:text-[180px] text-gray-50 group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none transform -rotate-12 z-0">
              emoji_events
            </span>

            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#c8102e]/5 rounded-2xl flex items-center justify-center text-[#c8102e] border border-[#c8102e]/10 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px] lg:text-[28px]">sports_handball</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black italic text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">Handbolti</h3>
              </div>

              <div className="space-y-5 mt-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#D4AF37] text-[20px]">emoji_events</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Íslandsmeistarar</h4>
                    <span className="bg-[#c8102e] text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto shadow-sm">18x</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Karla: 11 titlar<br/>
                    Kvenna: 7 titlar
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">emoji_events</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-[#c8102e] text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto shadow-sm">13x</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Karla: 8 titlar<br/>
                    Kvenna: 5 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Körfubolti Cabinet */}
          <div className="group relative bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(200,16,46,0.12)] transition-all duration-500 flex flex-col h-full overflow-hidden pl-[30px] lg:pl-[38px]">
            {/* Animated Gold/Red Border */}
            <div className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-b from-[#D4AF37] via-[#c8102e] to-[#D4AF37] bg-[length:100%_200%] animate-gradient-y"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[150px] lg:text-[180px] text-gray-50 group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none transform -rotate-12 z-0">
              emoji_events
            </span>

            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#c8102e]/5 rounded-2xl flex items-center justify-center text-[#c8102e] border border-[#c8102e]/10 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px] lg:text-[28px]">sports_basketball</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black italic text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">Körfubolti</h3>
              </div>

              <div className="space-y-5 mt-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#D4AF37] text-[20px]">emoji_events</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Íslandsmeistarar</h4>
                    <span className="bg-[#c8102e] text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto shadow-sm">6x</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Karla: 1 titill<br/>
                    Kvenna: 5 titlar
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">emoji_events</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-[#c8102e] text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto shadow-sm">12x</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Karla: 3 titlar<br/>
                    Kvenna: 9 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fótbolti Cabinet */}
          <div className="group relative bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(200,16,46,0.12)] transition-all duration-500 flex flex-col h-full overflow-hidden pl-[30px] lg:pl-[38px]">
            {/* Animated Gold/Red Border */}
            <div className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-b from-[#D4AF37] via-[#c8102e] to-[#D4AF37] bg-[length:100%_200%] animate-gradient-y"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[150px] lg:text-[180px] text-gray-50 group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none transform -rotate-12 z-0">
              emoji_events
            </span>

            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#c8102e]/5 rounded-2xl flex items-center justify-center text-[#c8102e] border border-[#c8102e]/10 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px] lg:text-[28px]">sports_soccer</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black italic text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">Fótbolti</h3>
              </div>

              <div className="space-y-5 mt-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#D4AF37] text-[20px]">emoji_events</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Deildarmeistarar</h4>
                    <span className="bg-[#c8102e] text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto shadow-sm">5x</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Karla 1. deild: 2 titlar<br/>
                    Kvenna 1. & 2. deild: 3 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Aðrar greinar Cabinet */}
          <div className="group relative bg-white rounded-[2.5rem] p-6 lg:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(200,16,46,0.12)] transition-all duration-500 flex flex-col h-full overflow-hidden pl-[30px] lg:pl-[38px]">
            {/* Animated Gold/Red Border */}
            <div className="absolute top-0 left-0 w-[6px] h-full bg-gradient-to-b from-[#D4AF37] via-[#c8102e] to-[#D4AF37] bg-[length:100%_200%] animate-gradient-y"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[150px] lg:text-[180px] text-gray-50 group-hover:text-[#D4AF37]/10 transition-colors pointer-events-none transform -rotate-12 z-0">
              emoji_events
            </span>

            <div className="relative z-10 flex-grow flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#c8102e]/5 rounded-2xl flex items-center justify-center text-[#c8102e] border border-[#c8102e]/10 shadow-sm shrink-0">
                  <span className="material-symbols-outlined text-[24px] lg:text-[28px]">category</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-black italic text-[#1c2c6c] leading-tight group-hover:text-[#c8102e] transition-colors">Fleira</h3>
              </div>

              <div className="space-y-5 mt-auto">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">psychology</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Skák</h4>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Skákdeild Hauka er fyrrverandi Íslandsmeistari félagsliða.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-gray-400 text-[20px]">sports_martial_arts</span>
                    <h4 className="font-bold text-[#1c2c6c] text-base leading-none uppercase tracking-wider">Karate</h4>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed border-l-2 border-gray-100 pl-3 ml-2">
                    Fyrsti Íslandsmeistaratitillinn í liðakeppni vannst á 80 ára afmæli félagsins árið 2011.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}