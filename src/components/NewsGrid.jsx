export default function NewsGrid() {
  return (
    <section className="bg-surface-alt py-16 md:py-24 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-haukar-red font-label font-bold tracking-[0.3em] uppercase text-xs">Fréttasafn</span>
            <h2 className="font-headline text-4xl md:text-5xl font-black text-asvellir-blue tracking-tight italic">Nýjustu Fréttir</h2>
          </div>
          <a className="flex items-center gap-2 text-asvellir-blue font-label font-bold hover:gap-4 transition-all" href="#">
            Sjá Allt <span className="material-symbols-outlined">chevron_right</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1 */}
          <div className="lg:col-span-1 group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xl shadow-asvellir-blue/10 transition-transform duration-500 hover:-translate-y-2 border border-gray-100 h-full min-h-[500px]">
            <div className="h-full relative overflow-hidden">
              <img alt="Grétar Ari player portrait" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://placehold.co/600x800/eeeeee/1E3A8A?text=Player+Portrait" />
              <div className="absolute inset-0 bg-gradient-to-t from-asvellir-blue/90 via-asvellir-blue/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-haukar-red text-white text-[10px] font-black uppercase px-2 py-1 rounded-sm mb-3 inline-block">Uppalinn Hauki</span>
                <h3 className="font-headline text-3xl font-extrabold text-white leading-tight drop-shadow-md">Grétar Ari kominn heim</h3>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="grid grid-rows-2 gap-8 h-full min-h-[500px]">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-asvellir-blue/5 group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden shrink-0">
                <img alt="Basketball training" className="absolute inset-0 w-full h-full object-cover" src="https://placehold.co/600x400/eeeeee/1E3A8A?text=Basketball+Action" />
              </div>
              <div className="mt-auto">
                <span className="text-gray-400 font-label text-xs font-bold uppercase tracking-widest">Körfubolti • 2 klst síðan</span>
                <h3 className="font-headline text-lg font-bold text-asvellir-blue mt-2 group-hover:text-haukar-red transition-colors line-clamp-2">Mikil spenna fyrir úrslitakeppninni í körfu</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-asvellir-blue/5 group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full justify-center">
              <span className="text-gray-400 font-label text-xs font-bold uppercase tracking-widest">Handbolti • 5 klst síðan</span>
              <h3 className="font-headline text-lg font-bold text-asvellir-blue mt-2 group-hover:text-haukar-red transition-colors">Stelpurnar okkar mæta Val í undanúrslitum</h3>
            </div>
          </div>

          {/* Column 3 */}
          <div className="grid grid-rows-2 gap-8 h-full min-h-[500px]">
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-asvellir-blue/5 group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
              <div className="relative w-full h-40 mb-4 rounded-xl overflow-hidden shrink-0">
                <img alt="Football field" className="absolute inset-0 w-full h-full object-cover" src="https://placehold.co/600x400/eeeeee/1E3A8A?text=Football+Pitch" />
              </div>
              <div className="mt-auto">
                <span className="text-gray-400 font-label text-xs font-bold uppercase tracking-widest">Fótbolti • Gær</span>
                <h3 className="font-headline text-lg font-bold text-asvellir-blue mt-2 group-hover:text-haukar-red transition-colors line-clamp-2">Undirbúningur í fullum gangi á Ásvöllum</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-asvellir-blue/5 group hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full justify-center">
              <span className="text-gray-400 font-label text-xs font-bold uppercase tracking-widest">Klúbburinn • Gær</span>
              <h3 className="font-headline text-lg font-bold text-asvellir-blue mt-2 group-hover:text-haukar-red transition-colors">Borgarstjóri heimsækir nýja félagsmiðstöð</h3>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}