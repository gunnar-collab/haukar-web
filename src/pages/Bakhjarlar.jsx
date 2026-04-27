import { useState, useEffect } from 'react';
import Button from '../components/Button';
import BakhjarlModal from '../components/BakhjarlModal';

export default function Bakhjarlar() {
  const [activeTab, setActiveTab] = useState('einstaklingur');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preSelectedTier, setPreSelectedTier] = useState('gull');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openModalWithTier = (tier) => {
    setPreSelectedTier(tier);
    setIsModalOpen(true);
  };

  const corporateTiers = [
    {
      name: 'Brons', price: 'Fyrirtækjaklúbbur', color: 'bg-orange-700', textColor: 'text-orange-700',
      features: ['Merki á heimasíðu Hauka', 'Nafnbirting á samfélagsmiðlum', '2 ársmiðar á heimaleiki', 'Aðgangur að tengslaneti'],
    },
    {
      name: 'Silfur', price: 'Skiltastyrktaraðili', color: 'bg-gray-400', textColor: 'text-gray-500', isPopular: true,
      features: ['Auglýsingaskilti á Ásvöllum', 'Merki á heimasíðu og skjám', '4 VIP ársmiðar', 'Sérstök kynning á leikdögum', 'Aðgangur að VIP stúku'],
    },
    {
      name: 'Gull', price: 'Aðalstyrktaraðili', color: 'bg-yellow-500', textColor: 'text-yellow-600',
      features: ['Merki á keppnistreyjum', 'Risa skilti í keppnishöll', '10 VIP ársmiðar & veitingar', 'Einkaviðburðir', 'Frátekin bílastæði'],
    }
  ];

  return (
    // FIXED: Removed pt-10 md:pt-16 so the hero snaps directly against the navbar!
    <main className="w-full bg-[#fafafa] flex-grow pb-20 font-sans">
      
      {/* Universal Hero Section - NOW IN HAUKAR RED WITH NAVY ACCENTS */}
      <div className="bg-[#c8102e] text-white py-24 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          favorite
        </span>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[#1c2c6c] text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 block shadow-sm bg-white px-3 py-1 rounded-full">
            Styðjum starfið
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-none">
            Vertu Með í Liðinu
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-2xl leading-relaxed max-w-3xl text-center mb-12">
            Hvort sem þú ert harður stuðningsmaður eða fyrirtæki sem vill styðja við bakið á öflugu æskulýðsstarfi, þá er pláss fyrir þig.
          </p>

          {/* THE TOGGLE */}
          <div className="flex bg-[#a30d25] p-1.5 rounded-2xl shadow-inner border border-white/10">
            <button 
              onClick={() => setActiveTab('einstaklingur')}
              className={`px-6 md:px-10 py-3.5 rounded-xl text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'einstaklingur' ? 'bg-[#1c2c6c] text-white shadow-lg scale-105' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              Einstaklingar
            </button>
            <button 
              onClick={() => setActiveTab('fyrirtaeki')}
              className={`px-6 md:px-10 py-3.5 rounded-xl text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'fyrirtaeki' ? 'bg-[#1c2c6c] text-white shadow-lg scale-105' : 'text-white/70 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">domain</span>
              Fyrirtæki
            </button>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* FLOW A: EINSTAKLINGAR (Haukar í Horni) */}
      {/* ========================================= */}
      {activeTab === 'einstaklingur' && (
        <div className="max-w-6xl mx-auto px-6 py-24 animate-fade-in">
          <div className="bg-white rounded-[3rem] shadow-2xl p-8 lg:p-12 border border-gray-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl -z-0 transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>

            {/* Left: Visual Phone Frame */}
            <div className="w-full lg:w-2/5 flex justify-center relative z-10 lg:order-1 scale-90 md:scale-100">
               <div className="w-[280px] h-[540px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl relative flex justify-center p-3">
                  <div className="absolute top-0 w-28 h-5 bg-gray-800 rounded-b-xl z-20"></div>
                  <div className="w-full h-full bg-gray-100 rounded-[2.2rem] overflow-hidden flex flex-col pt-10 px-3 pb-3">
                    <h4 className="text-center font-bold text-gray-400 uppercase tracking-widest text-[9px] mb-3">Google Wallet</h4>
                    <div className="w-full bg-gradient-to-br from-[#c8102e] to-[#8a0a1e] rounded-[1.5rem] p-4 shadow-xl relative overflow-hidden flex flex-col mb-4">
                      <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-white/10 text-[180px] rotate-12">workspace_premium</span>
                      <div className="relative z-10">
                        <p className="text-white/70 text-[9px] uppercase font-bold tracking-widest mb-1">Bakhjarl</p>
                        <h3 className="text-white font-black italic text-xl uppercase tracking-tighter mb-6">Haukar í Horni</h3>
                        <div className="bg-white/10 rounded-xl p-3 backdrop-blur-md mb-4">
                           <p className="text-white text-[10px] font-bold mb-0.5">Meðlimur:</p>
                           <p className="text-white/90 text-[11px] font-black uppercase italic">Gullfélagi</p>
                        </div>
                      </div>
                      <div className="mt-auto relative z-10 bg-white rounded-lg p-2 text-center flex items-center justify-center">
                        <div className="w-24 h-24 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDRoOHY4SDR6TTEyIDEyaDh2OEgxMnpNMjAgMjBoOHY4SDIwek0yOCA4aDh2OEgyOHpNOCAyOGg4djhIOHoiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] bg-repeat opacity-80"></div>
                      </div>
                    </div>

                    <button className="w-full bg-black text-white rounded-lg py-2 text-[10px] font-bold flex items-center justify-center gap-1.5 shadow-md">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                        <path d="M21 18v-7h-2v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-3-11V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H3v2h18V7h-3zM8 5h8v2H8V5z" />
                      </svg>
                      Add to Google Wallet
                    </button>
                  </div>
               </div>
            </div>

            {/* Right: The New VIP Pricing Grid */}
            <div className="w-full lg:w-3/5 relative z-10 lg:order-2 flex flex-col pt-8">
              <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">Áskriftarleiðir</span>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-4">
                Haukar í <span className="text-[#c8102e]">Horni</span>
              </h2>
              <p className="text-gray-500 font-medium mb-8 text-sm md:text-base">
                Ársmiði á alla deildarleiki í fótbolta, handbolta og körfubolta beint í símann. <br className="hidden md:block"/>
                <span className="text-gray-400 text-xs mt-1 block">* Gildir ekki á bikarleiki, evrópuleiki og oddaleiki í úrslitakeppni.</span>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SILFUR CARD */}
                <div className="border border-gray-200 rounded-3xl p-6 bg-gray-50 hover:border-[#1c2c6c]/30 transition-colors flex flex-col">
                  <h3 className="text-2xl font-black italic uppercase text-gray-400 mb-4 drop-shadow-sm">Silfurfélagi</h3>
                  <div className="mb-6">
                    <p className="text-3xl font-black text-[#1c2c6c]">2.990 kr <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">/ mán</span></p>
                    <p className="text-xs font-bold text-[#c8102e] mt-1 bg-red-50 inline-block px-2 py-1 rounded">Hjón: 4.900 kr / mán</p>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm font-medium text-gray-600 flex-grow">
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-gray-400 text-[18px]">meeting_room</span> VIP herbergi & léttar veitingar</li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-gray-400 text-[18px]">forum</span> Þjálfaraspjall fyrir leik & í hálfleik</li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-gray-400 text-[18px]">mail</span> Reglulegur tölvupóstur um starfið</li>
                  </ul>
                  <Button variant="outline" className="w-full justify-center" onClick={() => openModalWithTier('silfur')}>Velja Silfur</Button>
                </div>

                {/* GULL CARD */}
                <div className="border-2 border-[#c8102e] rounded-3xl p-6 bg-white shadow-xl relative transform md:-translate-y-4 flex flex-col">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#c8102e] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                    Vinsælast
                  </div>
                  <h3 className="text-2xl font-black italic uppercase text-yellow-500 drop-shadow-sm mb-4">Gullfélagi</h3>
                  <div className="mb-6">
                    <p className="text-3xl font-black text-[#1c2c6c]">3.900 kr <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">/ mán</span></p>
                    <p className="text-xs font-bold text-[#c8102e] mt-1 bg-red-50 inline-block px-2 py-1 rounded">Hjón: 6.490 kr / mán</p>
                  </div>
                  <ul className="space-y-3 mb-8 text-sm font-medium text-gray-600 flex-grow">
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-[#c8102e] text-[18px]">check_circle</span> Allt sem fylgir Silfurfélaga</li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-yellow-500 text-[18px]">star</span> Merkt sæti í stúku</li>
                    <li className="flex items-start gap-2"><span className="material-symbols-outlined text-yellow-500 text-[18px]">footprint</span> Eða skófar á gólfi</li>
                  </ul>
                  {/* ✨ THE VIP GLOW BUTTON IS HERE ✨ */}
                  <Button variant="glow" className="w-full justify-center" onClick={() => openModalWithTier('gull')}>Velja Gull</Button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* FLOW B: FYRIRTÆKI (Corporate Sponsorships) */}
      {/* ========================================= */}
      {activeTab === 'fyrirtaeki' && (
        <div className="animate-fade-in">
          {/* Tiers Grid */}
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block">
                Veldu þína leið
              </span>
              <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
                Styrktarleiðir
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              {corporateTiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`bg-white rounded-3xl p-8 relative flex flex-col ${
                    tier.isPopular ? 'border-2 border-[#1c2c6c] shadow-2xl scale-105 z-10' : 'border border-gray-200 shadow-lg mt-0 md:mt-6'
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#1c2c6c] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-md">
                      Vinsælast
                    </div>
                  )}
                  
                  <div className={`w-16 h-16 rounded-full ${tier.color} flex items-center justify-center mb-6 shadow-inner text-white`}>
                    <span className="material-symbols-outlined text-[32px]">workspace_premium</span>
                  </div>
                  
                  <h3 className={`text-3xl font-black uppercase italic tracking-tighter mb-1 ${tier.textColor}`}>
                    {tier.name}
                  </h3>
                  <p className="text-[#1c2c6c] font-bold text-lg mb-8 uppercase tracking-wide">
                    {tier.price}
                  </p>

                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-gray-600 font-medium">
                        <span className="material-symbols-outlined text-[#c8102e] text-[20px] shrink-0">check_circle</span>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant={tier.isPopular ? 'primary' : 'secondary'} className="w-full justify-center">
                    Viltu vita meira?
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* The Apple Pay / Stripe Modal is rendered here! */}
      <BakhjarlModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialTier={preSelectedTier} 
      />

    </main>
  );
}