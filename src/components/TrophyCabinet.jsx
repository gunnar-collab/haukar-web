import { Link } from 'react-router-dom';

export default function TrophyCabinet() {
  return (
    <section className="w-full bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-1">
              Stolt Félagsins
            </span>
            {/* FIXED: Removed rogue font-headline, added tracking-tighter to match NewsGrid perfectly */}
            <h2 className="text-5xl font-black italic tracking-tighter text-[#c8102e]">
              Bikararnir
            </h2>
          </div>
          <Link to="/sagan" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2">
            Öll sagan <span className="text-xl leading-none">&rsaquo;</span>
          </Link>
        </div>

        {/* The Display Cases (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Handbolti Cabinet - FIXED: Swapped to Haukar Red */}
          <div className="bg-[#c8102e] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] text-black/10 group-hover:text-black/15 transition-colors pointer-events-none transform -rotate-12">
              emoji_events
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                {/* Inverted to white background with red icon for contrast */}
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#c8102e] shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sports_handball</span>
                </div>
                {/* FIXED: Typography matches PlayerSpotlight exactly */}
                <h3 className="text-3xl font-black italic text-white leading-tight">Handbolti</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Íslandsmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">18x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Karla: 11 titlar<br/>
                    Kvenna: 7 titlar
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-white/90 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">11x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Karla: 7 titlar<br/>
                    Kvenna: 4 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Körfubolti Cabinet - FIXED: Swapped to Haukar Red */}
          <div className="bg-[#c8102e] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] text-black/10 group-hover:text-black/15 transition-colors pointer-events-none transform -rotate-12">
              emoji_events
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#c8102e] shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sports_basketball</span>
                </div>
                <h3 className="text-3xl font-black italic text-white leading-tight">Körfubolti</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Íslandsmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">4x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Kvenna: 4 titlar<br/>
                    <span className="text-transparent selection:bg-transparent">_</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-white/90 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">10x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Karla: 3 titlar<br/>
                    Kvenna: 7 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fótbolti Cabinet - FIXED: Swapped to Haukar Red */}
          <div className="bg-[#c8102e] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] text-black/10 group-hover:text-black/15 transition-colors pointer-events-none transform -rotate-12">
              emoji_events
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#c8102e] shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sports_soccer</span>
                </div>
                <h3 className="text-3xl font-black italic text-white leading-tight">Fótbolti</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Deildarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">4x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    1. deild karla: 3 titlar<br/>
                    2. deild karla: 1 titill
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-white/90 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">1x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Bikar kvenna (Neðri deildir)<br/>
                    <span className="text-transparent selection:bg-transparent">_</span>
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