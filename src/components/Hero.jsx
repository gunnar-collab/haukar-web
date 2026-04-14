export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:h-[800px] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-asvellir-blue/95 via-asvellir-blue/80 to-asvellir-blue/30 z-10"></div>
        <img alt="Athletic stadium background" className="w-full h-full object-cover" src="https://images.unsplash.com/photo-1574629810360-7efbb6b69da8?auto=format&fit=crop&q=80" />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-8 w-full mt-12 md:mt-0">
        <div className="max-w-5xl space-y-6">
          <span className="inline-block px-4 py-1.5 bg-anniversary-gold text-asvellir-blue font-label font-black text-xs tracking-[0.2em] uppercase rounded-full shadow-lg">
            Saga og Sigur
          </span>
          <h1 className="font-headline font-black text-[clamp(2rem,5.5vw,105px)] tracking-tighter leading-none italic metallic-gold drop-shadow-2xl pr-8 md:pr-12">
            BIKARMEISTARAR<br/>2026
          </h1>
          
          <p className="font-headline text-lg md:text-2xl lg:text-3xl text-white/90 font-light tracking-wide">
            95 Years of Excellence
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button className="bg-haukar-red text-white py-4 w-full sm:w-[280px] rounded-xl font-headline font-extrabold text-lg flex items-center justify-center gap-3 hover:bg-red-700 transition-all active:scale-95 shadow-xl shadow-haukar-red/30">
              Skoða Bikartilboð
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            
            <button className="bg-white/10 border-2 border-white text-white py-4 w-full sm:w-[280px] rounded-xl font-headline font-extrabold text-lg flex items-center justify-center gap-3 hover:bg-white/20 backdrop-blur-md transition-all active:scale-95">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
              Spila Myndband
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
        <span className="material-symbols-outlined text-white text-4xl font-thin">keyboard_double_arrow_down</span>
      </div>
    </section>
  );
}