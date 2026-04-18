import { useState } from 'react';
import Button from './Button.jsx';
import BakhjarlModal from './BakhjarlModal.jsx';

export default function Sponsors() {
  // FIXED: State to control our new slide-over VIP Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const corporateSponsors = [
    { id: 1, name: "Bílaleiga Akureyrar", logo: "/images/sponsors/bilaleiga-akureyrar.jpg" },
    { id: 2, name: "Coke Zero", logo: "/images/sponsors/coke-zero.png" },
    { id: 3, name: "KFC", logo: "/images/sponsors/kfc.png" },
    { id: 4, name: "Rio Tinto", logo: "/images/sponsors/riotinto.jpeg" },
  ];

  const haukurIHorni = [
    "Jón Jónsson", "Guðrún Jónsdóttir", "Sigurður Sigurðsson", 
    "Anna Pétursdóttir", "Kristján Kristjánsson", "María Guðmundsdóttir",
    "Fjölskyldan Ásvöllum", "Gunnar Gunnarsson", "Haukar Aðdáendaklúbbur",
    "Hafnarfjarðarbær", "Ólafur Ólafsson", "Helga Helgadóttir"
  ];

  return (
    <section className="w-full bg-white border-t border-gray-100">
      
      {/* 1. CORPORATE SPONSORS (The Grayscale Grid) */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">
            Stoltir Styrktaraðilar
          </span>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase">
            Þeir sem gera þetta mögulegt
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
          {corporateSponsors.map((sponsor) => (
            <div key={sponsor.id} className="group cursor-pointer">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name} 
                className="h-12 md:h-16 w-auto object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105 mix-blend-multiply"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. HAUKUR Í HORNI (The VIP Text Grid & CTA) */}
      <div className="w-full bg-white py-20 relative overflow-hidden border-t border-gray-50">
        
        {/* Subtle Background Watermark Icon in Soft Grey */}
        <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 pointer-events-none z-0">
          <span className="material-symbols-outlined text-[500px] text-gray-50 rotate-12">workspace_premium</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            
            {/* The Pitch */}
            <div className="max-w-xl">
              <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">
                Styðjum Starfið
              </span>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-6">
                Haukar í <span className="text-[#c8102e]">Horni</span>
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8">
                Haukar í horni er bakhjarlaklúbbur Hauka. Með því að gerast Haukur í horni tryggir þú öflugt barna- og unglingastarf og styður við afreksfólk framtíðarinnar. Vertu með í liðinu!
              </p>
              
              <div className="flex gap-4">
                {/* FIXED: Hooked up the state trigger to open the modal! */}
                <Button variant="primary" icon="favorite" onClick={() => setIsModalOpen(true)}>
                  Gerast Bakhjarl
                </Button>
                <Button variant="outline">
                  Sjá fríðindi
                </Button>
              </div>
            </div>

            {/* The Clean Name Grid - Premium Light Theme */}
            <div className="w-full lg:w-1/2 bg-white shadow-2xl shadow-gray-200/50 border border-gray-100 rounded-3xl p-8 relative overflow-hidden">
              
              {/* Premium Gradient Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c8102e] to-[#1c2c6c]"></div>

              <h3 className="text-[#1c2c6c] font-black italic uppercase tracking-widest text-lg mb-6 border-b border-gray-100 pb-4">
                Nýjustu bakhjarlar
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                {haukurIHorni.map((name, index) => (
                  <div key={index} className="flex items-center gap-2 group cursor-default">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#c8102e] transition-colors"></span>
                    <span className="text-gray-500 text-sm font-bold group-hover:text-[#1c2c6c] transition-colors truncate">
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center border-t border-gray-100 pt-5">
                <a href="#" className="text-gray-400 hover:text-[#c8102e] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1">
                  Sjá alla Haukana <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. The VIP Checkout Modal */}
      <BakhjarlModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </section>
  );
}