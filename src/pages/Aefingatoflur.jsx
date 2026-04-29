import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Aefingatoflur() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const schedules = [
    { name: 'Leikskólabörn', icon: 'toys', link: '/leikjaskoli' },
    { name: 'Handbolti - Stelpur', icon: 'sports_handball', link: '/aefingatoflur/handbolti-stelpur' },
    { name: 'Handbolti - Strákar', icon: 'sports_handball', link: '/aefingatoflur/handbolti-strakar' },
    { name: 'Körfubolti', icon: 'sports_basketball', link: '/aefingatoflur/korfubolti' },
    { name: 'Fótbolti', icon: 'sports_soccer', link: '/aefingatoflur/fotbolti' },
    { name: 'Karate', icon: 'sports_martial_arts', link: '/aefingatoflur/karate' },
    { name: 'Skák', icon: 'psychology', link: '/aefingatoflur/skak' },
    { name: 'Rafíþróttir', icon: 'sports_esports', link: '/aefingatoflur/rafithrottir' }
  ];

  return (
    <main className="w-full bg-white min-h-screen pt-10 md:pt-16 pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-[#1c2c6c] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -rotate-12">
          calendar_month
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#c8102e] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block">
            Barnastarf & Yngri Flokkar
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Æfingatöflur
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Hér finnur þú yfirlit yfir æfingatíma í öllum deildum Hauka. Smellið á viðeigandi flokk til að sjá stundaskrána.
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
              Komið að prófa!
            </h2>
            <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
              <p>
                Það er hjartanlega velkomið að prófa að mæta á æfingar áður en barn er skráð í félagið. 
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Hafa samband:</strong> Best er að hafa samband við þjálfara flokksins eða senda póst á <strong>haukar@haukar.is</strong> áður en barn mætir á prufuæfingar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Mæta á staðinn:</strong> Einnig er velkomið að mæta með barninu ef kostur er og er þá nóg að ræða við þjálfara þegar komið er á staðinn.</span>
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
                Bardzo mile widziane jest przybycie do Haukar i wypróbowanie, zanim Twoje dzieci zostaną zarejestrowane w klubie.
              </p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1c2c6c] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Kontakt:</strong> Najlepiej skontaktować się z trenerem lub wysłać maila na adres <strong>haukar@haukar.is</strong> zanim dziecko przyjedzie na pierwszy trening.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#1c2c6c] text-[20px] shrink-0">check_circle</span>
                  <span><strong>Na miejscu:</strong> Rodzice są również mile widziani w Haukar przed rozpoczęciem treningu, a wtedy wystarczy, że porozmawiają z trenerem.</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* 3. The Schedules Grid */}
        <div>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
              Veldu Deild
            </h2>
            <p className="text-gray-500 font-medium mt-2">Smelltu á viðeigandi flokk til að opna æfingatöflu.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {schedules.map((schedule, idx) => (
              <Link 
                key={idx} 
                to={schedule.link} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 hover:border-[#c8102e]/30 transition-all duration-300 group flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#c8102e] transition-colors">
                  <span className="material-symbols-outlined text-[32px] text-[#1c2c6c] group-hover:text-white transition-colors">
                    {schedule.icon}
                  </span>
                </div>
                <h3 className="text-xl font-black text-[#1c2c6c] uppercase tracking-tight mb-4 group-hover:text-[#c8102e] transition-colors">
                  {schedule.name}
                </h3>
                <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#c8102e] transition-colors">
                  Opna töflu <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
