export default function Footer() {
  return (
    <footer className="bg-asvellir-blue w-full py-12 text-white border-t-4 border-haukar-red">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="text-2xl font-black text-white font-headline tracking-tighter italic">HAUKAR</div>
          <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs">
            Knattspyrnufélagið Haukar er eitt sögufrægasta íþróttafélag landsins. Við leggjum metnað í öflugt barna- og unglingastarf ásamt afreksstarfi á hæsta stigi.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-haukar-red transition-colors" href="#"><span className="material-symbols-outlined text-sm">public</span></a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-haukar-red transition-colors" href="#"><span className="material-symbols-outlined text-sm">alternate_email</span></a>
            <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-haukar-red transition-colors" href="#"><span className="material-symbols-outlined text-sm">share</span></a>
          </div>
        </div>
        
        <div>
          <h4 className="font-headline font-bold text-lg mb-6 uppercase tracking-widest text-anniversary-gold">Flýtileiðir</h4>
          <ul className="space-y-4">
            <li><a className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-transform duration-200 block font-label text-sm" href="#">Stjórn og starfsfólk</a></li>
            <li><a className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-transform duration-200 block font-label text-sm" href="#">Persónuverndarstefna</a></li>
            <li><a className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-transform duration-200 block font-label text-sm" href="#">Hafa samband</a></li>
            <li><a className="text-blue-100/80 hover:text-white hover:translate-x-1 transition-transform duration-200 block font-label text-sm" href="#">Sækja um styrk</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-headline font-bold text-lg mb-6 uppercase tracking-widest text-anniversary-gold">Staðsetning</h4>
          <div className="space-y-4 text-blue-100/80 text-sm">
            <p className="flex items-start gap-3">
              <span className="material-symbols-outlined text-haukar-red">location_on</span>
              Ásvellir, 221 Hafnarfjörður
            </p>
            <p className="flex items-center gap-3">
              <span className="material-symbols-outlined text-haukar-red">phone</span>
              +354 525 2100
            </p>
            <p className="flex items-center gap-3">
              <span className="material-symbols-outlined text-haukar-red">mail</span>
              haukar@haukar.is
            </p>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 mt-12 pt-8 text-center px-8">
        <p className="text-blue-100/50 text-[10px] md:text-xs font-label uppercase tracking-[0.2em]">
          © 2026 Knattspyrnufélagið Haukar. Allur réttur áskilinn.
        </p>
      </div>
    </footer>
  );
}