export default function TrophyCabinet() {
  return (
    <section className="bg-white py-16 md:py-20 px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl font-black text-asvellir-blue italic tracking-tight uppercase">Bikaraskápurinn</h2>
          <div className="h-1.5 w-16 bg-anniversary-gold mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-alt flex items-center justify-center shadow-md group-hover:shadow-anniversary-gold/40 transition-all group-hover:-translate-y-2 border border-gray-100">
              <span className="material-symbols-outlined text-3xl md:text-4xl text-anniversary-gold" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
            </div>
            <span className="font-headline font-bold text-asvellir-blue text-[10px] md:text-xs uppercase tracking-tighter">Íslandsmeist.</span>
          </div>
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-alt flex items-center justify-center shadow-md group-hover:shadow-anniversary-gold/40 transition-all group-hover:-translate-y-2 border border-gray-100">
              <span className="material-symbols-outlined text-3xl md:text-4xl text-anniversary-gold" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
            </div>
            <span className="font-headline font-bold text-asvellir-blue text-[10px] md:text-xs uppercase tracking-tighter">Bikarmeist.</span>
          </div>
          <div className="flex flex-col items-center gap-4 group">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-alt flex items-center justify-center shadow-md group-hover:shadow-anniversary-gold/40 transition-all group-hover:-translate-y-2 border border-gray-100">
              <span className="material-symbols-outlined text-3xl md:text-4xl text-anniversary-gold" style={{ fontVariationSettings: "'FILL' 1" }}>trophy</span>
            </div>
            <span className="font-headline font-bold text-asvellir-blue text-[10px] md:text-xs uppercase tracking-tighter">Deildarmeist.</span>
          </div>
        </div>
      </div>
    </section>
  );
}