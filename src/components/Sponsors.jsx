import { Link } from 'react-router-dom';
import Button from './Button.jsx';

export default function Sponsors() {
  const corporateSponsors = [
    { id: 1, name: "Bílaleiga Akureyrar", logo: "/images/sponsors/bilaleiga-akureyrar.jpg" },
    { id: 2, name: "Coke Zero", logo: "/images/sponsors/coke-zero.png" },
    { id: 3, name: "KFC", logo: "/images/sponsors/kfc.png" },
    { id: 4, name: "Rio Tinto", logo: "/images/sponsors/riotinto.jpeg" },
  ];

  return (
    <section className="w-full flex flex-col">
      
      {/* 1. HAUKAR Í HORNI - The Digital Wallet Teaser (Red Card Update) */}
      <div className="w-full bg-[#fafafa] py-24 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            
            {/* Left: The Digital Wallet Pass Graphic */}
            <div className="w-full lg:w-5/12 flex justify-center lg:justify-end relative">
              {/* Glowing background effect */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-[#c8102e]/20 to-[#1c2c6c]/20 blur-3xl rounded-full z-0"></div>
              
              {/* The Pass - NOW IN HAUKAR RED GADIENT */}
              <div className="relative z-10 w-72 h-[450px] bg-gradient-to-b from-[#c8102e] to-[#a30d25] rounded-[2.5rem] shadow-2xl border-4 border-gray-800/50 p-6 flex flex-col transform -rotate-6 hover:rotate-0 transition-all duration-500">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
                  <span className="text-white font-black italic text-xl tracking-tighter">HAUKAR</span>
                  <span className="material-symbols-outlined text-white/50 text-[32px]">contactless</span>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center text-center">
                  {/* Central Icon: White/Gold details for contrast */}
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-4 shadow-inner border-4 border-white/20 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-white text-[32px]">workspace_premium</span>
                  </div>
                  <h3 className="text-white text-2xl font-black uppercase italic tracking-widest mb-1">VIP Passi</h3>
                  {/* Subtitle updated to White for contrast */}
                  <p className="text-white text-xs font-bold uppercase tracking-widest">Haukar í Horni</p>
                </div>

                <div className="mt-auto bg-black/30 rounded-2xl p-4 flex justify-between items-center backdrop-blur-sm">
                  <div>
                    {/* Holder text updated to White/70 for contrast */}
                    <p className="text-white/70 text-[8px] uppercase tracking-widest mb-1">Korthafi</p>
                    <p className="text-white font-bold text-sm">Jón Jónsson</p>
                  </div>
                  <span className="material-symbols-outlined text-white/30">qr_code_2</span>
                </div>
              </div>
            </div>

            {/* Right: The Pitch & Call to Action */}
            <div className="w-full lg:w-7/12 text-center lg:text-left">
              <span className="text-[#c8102e] text-sm font-bold uppercase tracking-widest flex items-center justify-center lg:justify-start gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
                Stafræn Áskrift
              </span>
              <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-none mb-6">
                Framtíðin er <br/><span className="text-[#c8102e]">í símanum þínum</span>
              </h2>
              <p className="text-gray-600 font-medium text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                Við höfum tekið Hauka í horni inn í 21. öldina. Engin öpp til að hlaða niður, engin plastkort. Settu upp mánaðarlega áskrift með Stripe og fáðu VIP ársmiðann þinn beint í Apple Wallet eða Google Pay.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/bakhjarlar">
                  <Button variant="primary" icon="arrow_forward" iconPosition="right">
                    Kynna sér áskrift
                  </Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. CORPORATE SPONSORS - The Grayscale Grid */}
      <div className="w-full bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest block mb-2">
              Stoltir Styrktaraðilar
            </span>
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter text-[#1c2c6c] uppercase">
              Þeir sem gera þetta mögulegt
            </h2>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
            {corporateSponsors.map((sponsor) => (
              <div key={sponsor.id} className="group cursor-pointer">
                <img 
                  src={sponsor.logo} 
                  alt={sponsor.name} 
                  className="h-10 md:h-14 w-auto object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105 mix-blend-multiply"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}