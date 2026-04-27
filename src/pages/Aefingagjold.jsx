import { useEffect } from 'react';

export default function Aefingagjold() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // THE SMART FIX: Deep-linking straight to the specific Abler sub-shops
  const sports = [
    { name: 'Handbolti', icon: 'sports_handball', link: 'https://www.abler.io/shop/haukar/handbolti' },
    { name: 'Fótbolti', icon: 'sports_soccer', link: 'https://www.abler.io/shop/haukar/fotbolti' },
    { name: 'Körfubolti', icon: 'sports_basketball', link: 'https://www.abler.io/shop/haukar/korfubolti' },
    { name: 'Leikjaskóli', icon: 'toys', link: 'https://www.abler.io/shop/haukar/leikjaskoli' },
    { name: 'Rafíþróttir', icon: 'sports_esports', link: 'https://www.abler.io/shop/haukar/rafithrottir' },
    { name: 'Karate', icon: 'sports_martial_arts', link: 'https://www.abler.io/shop/haukar/karate' }
  ];

  return (
    <main className="w-full bg-white min-h-screen pt-10 md:pt-16 pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-[#1c2c6c] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none rotate-12">
          payments
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#c8102e] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block">
            Barnastarf & Skráning
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Æfingagjöld
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Öll skráning og greiðsla æfingagjalda fer fram í gegnum Abler. Hér finnur þú allar upplýsingar um ferlið, niðurgreiðslur og frístundastyrki.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* 2. Information Cards (Side by Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Icelandic Instructions */}
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <div className="w-14 h-14 rounded-2xl bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] mb-6">
              <span className="material-symbols-outlined text-[28px]">info</span>
            </div>
            <h2 className="text-2xl font-black italic text-[#1c2c6c] uppercase mb-4 tracking-tight">
              Hvernig skrái ég mig?
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                Skráning fer alfarið fram í gegnum greiðslukerfi Abler (áður Sportabler). Þar er hægt að ganga frá greiðslum eða skipta þeim niður í mánaðarlegar greiðslur.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Frístundastyrkur:</strong> Í Abler getur þú hakað við að nýta frístundastyrk Hafnarfjarðarbæjar eða annarra sveitarfélaga við skráningu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Systkinaafsláttur:</strong> Reiknast sjálfkrafa í greiðsluferlinu í Abler ef börn eru skráð undir sömu fjölskyldu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Sérstakur styrkur:</strong> Hægt er að nýta sérstakan frístundastyrk fyrir tekjulægri heimili í kerfinu ef við á.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Polish Translation (Inclusive UX) */}
          <div className="bg-gray-50 p-8 rounded-3xl shadow-inner border border-gray-200">
            <div className="w-14 h-14 rounded-2xl bg-[#1c2c6c]/10 flex items-center justify-center text-[#1c2c6c] mb-6">
              <span className="material-symbols-outlined text-[28px]">translate</span>
            </div>
            <h2 className="text-2xl font-black italic text-[#1c2c6c] uppercase mb-4 tracking-tight">
              Informacje po polsku
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                Rejestracja i opłaty za treningi odbywają się wyłącznie przez system Abler (dawniej Sportabler).
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1c2c6c] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Dotacja na zajęcia (Frístundastyrkur):</strong> Podczas rejestracji w Abler możesz użyć dofinansowania z miasta Hafnarfjörður.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1c2c6c] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Zniżka dla rodzeństwa:</strong> System oblicza ją automatycznie, jeśli dzieci są zarejestrowane w tej samej rodzinie.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1c2c6c] text-[20px] shrink-0">check_circle</span>
                  <span>Możesz skorzystać ze specjalnego dofinansowania dla rodzin o niskich dochodach.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* 3. The Sports Grid -> Linking to Abler Sub-shops */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
              Veldu Deild
            </h2>
            <p className="text-gray-500 font-medium mt-2">Smelltu á viðeigandi deild til að sjá verðskrá og ganga frá skráningu í Abler.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sports.map((sport, idx) => (
              <a 
                key={idx} 
                href={sport.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-[#c8102e]/30 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#c8102e] transition-colors">
                  <span className="material-symbols-outlined text-[32px] text-[#1c2c6c] group-hover:text-white transition-colors">
                    {sport.icon}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-[#1c2c6c] uppercase tracking-tight mb-4 group-hover:text-[#c8102e] transition-colors">
                  {sport.name}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-sm font-bold text-gray-400 group-hover:text-[#c8102e] transition-colors">
                  Opna í Abler <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}