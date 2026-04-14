export default function Navbar() {
  return (
    <>
      <div className="bg-haukar-red text-white px-4 py-3 text-center sticky top-0 z-[60] shadow-md">
        <p className="font-headline font-bold text-sm md:text-base tracking-wide flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">warning</span>
          Tilkynning: Tryggjum öryggi allra á Ásvöllum.
        </p>
      </div>

      <header className="bg-white/95 backdrop-blur-xl w-full top-12 z-50 sticky shadow-xl shadow-asvellir-blue/5">
        <div className="bg-asvellir-blue py-2 px-8 overflow-hidden w-full">
          <div className="max-w-screen-2xl mx-auto flex flex-wrap justify-center items-center gap-8 md:gap-16 text-white text-[10px] md:text-xs font-label font-bold tracking-widest uppercase">
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-haukar-red rounded-full animate-pulse"></span> Handbolti: Haukar 28 - 24 FH (Leik lokið)</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-anniversary-gold rounded-full"></span> Körfubolti: Stjarnan vs Haukar - Í kvöld 19:15</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-haukar-red rounded-full"></span> Knattspyrna: Haukar 1 - 0 Þróttur R. (45')</span>
          </div>
        </div>

        <nav className="flex justify-between items-center w-full px-6 md:px-8 py-4 max-w-screen-2xl mx-auto">
          <div className="text-2xl font-black italic tracking-tighter text-asvellir-blue font-headline flex items-center gap-3">
            <div className="w-8 h-10 bg-asvellir-blue rounded-b-full relative flex items-center justify-center border-2 border-anniversary-gold">
              <div className="w-full h-1/2 bg-haukar-red absolute top-0 left-0 rounded-tl-sm z-0 clip-path-diagonal"></div>
            </div>
            HAUKAR
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <a className="text-haukar-red font-bold border-b-2 border-haukar-red pb-1 font-label" href="#">Handboltinn</a>
            <a className="text-asvellir-blue font-medium hover:text-haukar-red transition-colors font-label" href="#">Fótboltinn</a>
            <a className="text-asvellir-blue font-medium hover:text-haukar-red transition-colors font-label" href="#">Körfuboltinn</a>
            <a className="text-asvellir-blue font-medium hover:text-haukar-red transition-colors font-label" href="#">Saga Félagsins</a>
            <a className="text-asvellir-blue font-medium hover:text-haukar-red transition-colors font-label" href="#">Mótin</a>
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block bg-haukar-red text-white px-6 py-2 rounded-lg font-headline font-bold text-sm tracking-tight transition-transform hover:shadow-lg hover:-translate-y-0.5 active:scale-95">
              Kaupa Miða
            </button>
            <button className="lg:hidden text-asvellir-blue">
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}