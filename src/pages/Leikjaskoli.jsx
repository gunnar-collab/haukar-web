import { useEffect } from 'react';

export default function Leikjaskoli() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white min-h-screen pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-br from-[#1c2c6c] to-[#2a4099] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -rotate-12">
          toys
        </span>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[#D4AF37] text-[18px]">family_restroom</span>
            <span className="text-white text-xs font-black uppercase tracking-widest">
              Fyrir yngstu börnin (2-5 ára)
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-tight">
            Leikjaskóli <br className="hidden md:block"/>
            <span className="text-[#D4AF37]">Barnanna</span>
          </h1>
          
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center mb-10">
            Fyrir þau allra yngstu (fædd 2021-2025). Öll börn, nær og fjær, eru hjartanlega velkomin til okkar á laugardagsmorgnum til að leika og læra í faðmi forráðamanna!
          </p>

          <a 
            href="https://www.abler.io/shop/haukar/leikjaskoli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-[#D4AF37] hover:bg-white text-[#1c2c6c] hover:text-[#D4AF37] px-10 py-5 rounded-[2rem] text-lg font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#D4AF37]/20 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out -translate-x-full"></div>
            Skráning í Sportabler
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        
        {/* 2. Quick Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1c2c6c] mb-6">
              <span className="material-symbols-outlined text-[32px]">schedule</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#1c2c6c] mb-3">Hvenær?</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Á laugardagsmorgnum kl. <strong className="text-gray-800">09:00 - 09:50</strong>. Börnum er skipt upp eftir aldri. Vorönn hefst laugardaginn 10. janúar 2026.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#c8102e] mb-6">
              <span className="material-symbols-outlined text-[32px]">location_on</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#1c2c6c] mb-3">Hvar?</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Kennslan fer fram í Handboltasal og Ólafssal inni á Ásvöllum. Fullkomin aðstaða til að hlaupa, leika og læra.
            </p>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#D4AF37] mb-6">
              <span className="material-symbols-outlined text-[32px]">payments</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#1c2c6c] mb-3">Verð & Skráning</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Vorönnin kostar <strong className="text-gray-800">17.000 kr.</strong> Öll skráning fer fram rafrænt í gegnum Sportabler kerfið okkar.
            </p>
          </div>
        </div>

        {/* 3. Markmið og Væntingar */}
        <section className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center bg-gray-50/50">
              <span className="text-[#c8102e] text-xs font-black uppercase tracking-[0.2em] mb-4 block">
                Fyrstu Skrefin Í Íþróttum
              </span>
              <h2 className="text-3xl md:text-4xl font-black italic text-[#1c2c6c] uppercase tracking-tighter mb-6">
                Samvera & Grunnhreyfingar
              </h2>
              <div className="space-y-4 text-gray-600 font-medium leading-relaxed">
                <p>
                  Markmið leikjaskólans er að kynna fyrir iðkendum íþróttasalinn og áhöldin sem þar eru. Þá er farið í grunn hinna ýmsu greina ásamt grunnhreyfingum barna.
                </p>
                <p>
                  Mikil áhersla er lögð á að iðkendur fái að njóta sín í faðmi forráðamanna sem eru með þeim <strong>allan tímann til halds og trausts</strong>. Börnin fá hér dýrmætan samverutíma í íþróttasölunum með forráðamönnum og undirbúningur fyrir skólavist er þá hafinn.
                </p>
                <p className="text-[#c8102e] font-bold italic mt-4 text-lg">
                  "Sjáumst hress í Leikjaskólanum og munum að hafa gaman og njóta samverunnar saman!"
                </p>
              </div>
            </div>
            
            <div className="bg-[#1c2c6c] p-10 md:p-16 text-white flex flex-col justify-center relative overflow-hidden">
              <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[200px] opacity-10 rotate-12">group</span>
              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-8 text-[#D4AF37]">Þjálfarar Okkar</h3>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <span className="material-symbols-outlined text-[32px] text-white">person</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Albert Magnússon</h4>
                      <p className="text-white/70 text-sm mt-1">Yfirþjálfari - Hefur þjálfað hjá félaginu í mörg ár.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                      <span className="material-symbols-outlined text-[32px] text-white">person</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold">Alexandra Hödd Harðardóttir</h4>
                      <p className="text-white/70 text-sm mt-1">Yfirþjálfari - Reyndur þjálfari hjá Haukum.</p>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <p className="text-white/80 font-medium italic text-sm">
                      Með þeim í teyminu eru einnig frábærir aðstoðarþjálfarar úr röðum Hauka.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
