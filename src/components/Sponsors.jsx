import { Link } from 'react-router-dom';
import Button from './Button.jsx';

export default function Sponsors() {
  const corporateSponsors = [
    { id: 1, name: "Nano Banana", logo: "/images/sponsors/nanobanana.png" },
    { id: 2, name: "Bílaleiga Akureyrar", logo: "/images/sponsors/bilaleiga-akureyrar.jpg" },
    { id: 3, name: "Coke Zero", logo: "/images/sponsors/coke-zero.png" },
    { id: 4, name: "KFC", logo: "/images/sponsors/kfc.png" },
    { id: 5, name: "Rio Tinto", logo: "/images/sponsors/riotinto.jpeg" },
  ];

  return (
    <section className="w-full flex flex-col selection:bg-[#1c2c6c] selection:text-white">
      
      {/* 1. HAUKAR Í HORNI - The Digital Wallet Teaser */}
      <div className="w-full bg-white py-12 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: The Digital Wallet Pass Graphic */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end relative group cursor-pointer">
              {/* Removed glowing background to keep pure white minimalism */}
              {/* The Pass - HAUKAR RED GRADIENT */}
              <div className="relative z-10 w-72 h-[450px] bg-gradient-to-br from-[#c8102e] to-[#9b0c23] rounded-[2.5rem] shadow-2xl border-4 border-gray-900/10 p-6 flex flex-col transform -rotate-6 group-hover:rotate-0 group-hover:-translate-y-4 transition-all duration-500">
                
                <div className="flex justify-between items-center mb-8 border-b border-white/20 pb-4">
                  <span className="text-white font-black italic text-xl tracking-tighter">HAUKAR</span>
                  <span className="material-symbols-outlined text-white/70 text-[32px]">contactless</span>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 shadow-inner border border-white/30 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-yellow-400 text-[40px] drop-shadow-md">workspace_premium</span>
                  </div>
                  <h3 className="text-white text-3xl font-black uppercase italic tracking-widest mb-1 drop-shadow-md">VIP Passi</h3>
                  <p className="text-white/90 text-[10px] font-bold uppercase tracking-widest">Haukar í Horni</p>
                </div>

                <div className="mt-auto bg-black/40 rounded-2xl p-4 flex justify-between items-center backdrop-blur-md border border-white/10">
                  <div>
                    <p className="text-white/60 text-[8px] uppercase tracking-widest mb-0.5">Korthafi</p>
                    <p className="text-white font-bold text-sm tracking-wide">Jón Jónsson</p>
                  </div>
                  <span className="material-symbols-outlined text-white/50 text-[28px]">qr_code_2</span>
                </div>
              </div>
            </div>

            {/* Right: The Pitch & Call to Action */}
            <div className="w-full lg:w-7/12 text-center lg:text-left">
              <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2 mb-4 drop-shadow-sm">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Stafræn Áskrift
              </span>
              <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-none mb-6">
                Framtíðin er <br/>
                <span className="text-[#c8102e]">í símanum þínum</span>
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                Við höfum tekið bakhjarlakerfið inn í 21. öldina. Engin öpp til að hlaða niður, engin plastkort. Settu upp mánaðarlega áskrift og fáðu VIP ársmiðann þinn beint í Apple Wallet eða Google Pay.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/bakhjarlar">
                  <Button variant="primary" icon="arrow_forward" iconPosition="right" className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                    Kynna sér áskrift
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. CORPORATE SPONSORS - The Grayscale Grid */}
      <div className="w-full bg-white py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest block mb-2">
              Stoltir Styrktaraðilar
            </span>
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter text-[#1c2c6c] uppercase">
              Þeir sem gera þetta mögulegt
            </h2>
          </div>

          <div className="relative w-full overflow-hidden mt-6">
            {/* Fade Gradients to hide the edges seamlessly */}
            <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            {/* The Infinite Scrolling Track */}
            <div className="flex w-max animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused] items-center gap-16 md:gap-24 pl-16 md:pl-24">
              {[...corporateSponsors, ...corporateSponsors, ...corporateSponsors].map((sponsor, idx) => (
                <div key={`${sponsor.id}-${idx}`} className="group cursor-pointer shrink-0">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name} 
                    className="h-10 md:h-14 w-auto max-w-[150px] object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}