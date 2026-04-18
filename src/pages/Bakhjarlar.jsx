import { useEffect } from 'react';
import Button from '../components/Button';

export default function Bakhjarlar() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = [
    {
      name: 'Brons',
      price: 'Fyrirtækjaklúbbur',
      color: 'bg-orange-700',
      textColor: 'text-orange-700',
      features: ['Merki á heimasíðu Hauka', 'Nafnbirting á samfélagsmiðlum', '2 ársmiðar á heimaleiki', 'Aðgangur að tengslaneti'],
    },
    {
      name: 'Silfur',
      price: 'Skiltastyrktaraðili',
      color: 'bg-gray-400',
      textColor: 'text-gray-500',
      features: ['Auglýsingaskilti á Ásvöllum', 'Merki á heimasíðu og skjám', '4 VIP ársmiðar', 'Sérstök kynning á leikdögum', 'Aðgangur að VIP stúku'],
      isPopular: true,
    },
    {
      name: 'Gull',
      price: 'Aðalstyrktaraðili',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
      features: ['Merki á keppnistreyjum', 'Risa skilti í keppnishöll', '10 VIP ársmiðar & veitingar', 'Einkaviðburðir með meistaraflokkum', 'Bílastæði frátekin á leikdögum'],
    }
  ];

  return (
    <main className="w-full bg-[#fafafa] flex-grow pt-10 md:pt-16 pb-20 font-sans">
      
      {/* 1. Hero Section - Corporate Navy Blue */}
      <div className="bg-[#1c2c6c] text-white py-24 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[400px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none rotate-12">
          handshake
        </span>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 block shadow-sm">
            Fjárfesting í framtíðinni
          </span>
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-none">
            Gerast Bakhjarl
          </h1>
          <p className="text-white/80 font-medium text-lg md:text-2xl leading-relaxed max-w-3xl text-center">
            Haukar eru stolt Hafnarfjarðar. Taktu þátt í að byggja upp öflugt íþrótta- og æskulýðsstarf um leið og þú eykur sýnileika þíns fyrirtækis á landsvísu.
          </p>
        </div>
      </div>

      {/* 2. Value Proposition Strip */}
      <div className="bg-[#c8102e] text-white py-12 px-6 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[40px] mb-3 text-white/80">groups</span>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">2.500+ Iðkendur</h3>
            <p className="text-white/80 font-medium text-sm">Við erum eitt stærsta íþróttafélag landsins með gríðarlegt grasrótarstarf.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[40px] mb-3 text-white/80">visibility</span>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Mikið Áhorf</h3>
            <p className="text-white/80 font-medium text-sm">Leikir okkar eru í beinni útsendingu og fjallað um þá í öllum helstu fjölmiðlum.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-[40px] mb-3 text-white/80">handshake</span>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-2">Sterkt Tengslanet</h3>
            <p className="text-white/80 font-medium text-sm">Fyrirtækjaklúbbur Hauka er vettvangur fyrir öflug viðskiptatengsl.</p>
          </div>
        </div>
      </div>

      {/* 3. Sponsorship Tiers (Pricing Grid) */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block">
            Veldu þína leið
          </span>
          <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
            Styrktarleiðir
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {tiers.map((tier, idx) => (
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

      {/* 4. Contact / Lead Gen Form */}
      <div className="max-w-4xl mx-auto px-6 mb-20">
        <div className="bg-[#1c2c6c] rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 text-white">
            <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
              Tökum kaffibolla og ræðum málin.
            </h3>
            <p className="text-white/70 font-medium mb-6">
              Skildu eftir upplýsingar og markaðsteymi Hauka mun hafa samband við þig innan sólarhrings með sérsniðið tilboð fyrir þitt fyrirtæki.
            </p>
            <div className="flex items-center gap-4 text-white/90 font-bold">
              <span className="material-symbols-outlined text-[#c8102e]">call</span>
              Sími: 555-1234
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white rounded-2xl p-6 shadow-inner">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Fyrirtæki</label>
                <input type="text" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all" placeholder="Nafn fyrirtækis" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tengiliður & Netfang</label>
                <input type="email" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all" placeholder="Jón Jónsson - jon@fyrirtaeki.is" />
              </div>
              <Button variant="primary" className="w-full justify-center py-4 mt-2">
                Senda Fyrirspurn
              </Button>
            </form>
          </div>
        </div>
      </div>

    </main>
  );
}