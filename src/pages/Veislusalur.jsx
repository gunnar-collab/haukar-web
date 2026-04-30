import { useEffect, useState } from 'react';
import Button from '../components/Button';

export default function Veislusalur() {
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [
    '/images/veislusalur-hero-1.jpg',
    '/images/veislusalur-hero-2.jpg'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nextHero = () => setCurrentHero((prev) => (prev + 1) % heroImages.length);
  const prevHero = () => setCurrentHero((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const amenities = [
    { icon: 'groups', title: 'Næg pláss', desc: 'Tekur allt að 150 manns í sæti eða 200 standandi.' },
    { icon: 'restaurant', title: 'Fullbúið eldhús', desc: 'Hentar fullkomlega fyrir veisluþjónustur og stærri eldamennsku.' },
    { icon: 'speaker', title: 'Hljóð & Mynd', desc: 'Öflugt hljóðkerfi, stór myndvarpi og þráðlaus hljóðnemi.' },
    { icon: 'local_parking', title: 'Góð bílastæði', desc: 'Næg ókeypis bílastæði beint fyrir utan Ásvelli.' },
  ];

  return (
    <main className="w-full bg-white min-h-screen pt-10 md:pt-16 pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-[#1c2c6c] rounded-3xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row min-h-[400px]">
          
          {/* Text Content */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative z-20">
            <span className="text-yellow-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 block drop-shadow-sm">
              Leiga á aðstöðu
            </span>
            <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white uppercase mb-6 leading-none">
              Veislusalur Hauka
            </h1>
            <p className="text-white/80 font-medium text-lg leading-relaxed mb-8">
              Glæsilegur og bjartur veislusalur á Ásvöllum sem hentar fullkomlega fyrir brúðkaup, fermingarveislur, afmæli og fyrirtækjaskemmtanir.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" className="shadow-lg hover:-translate-y-1" onClick={() => document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' })}>
                Bóka salinn
              </Button>
            </div>
          </div>

          {/* Image Side (Slider) */}
          <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c6c] via-[#1c2c6c]/20 to-transparent z-10 hidden md:block"></div>
            
            {/* Images */}
            {heroImages.map((img, idx) => (
              <img 
                key={img}
                src={img} 
                alt={`Veislusalur Hauka ${idx + 1}`} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${currentHero === idx ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 right-6 z-30 flex gap-3">
              <button 
                onClick={prevHero}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1c2c6c] transition-all"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button 
                onClick={nextHero}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#1c2c6c] transition-all"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-6 z-30 flex gap-2">
              {heroImages.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-500 ${currentHero === idx ? 'w-8 bg-yellow-500' : 'w-2 bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Gallery Bento Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[600px] md:h-[800px]">
          
          {/* Main Large Image */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl shadow-lg border border-white/20">
            <img 
              src="/images/veislusalur/IMG_4732.jpg" 
              alt="Veislusalur Hauka - Salurinn" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-bold text-xl italic uppercase tracking-tighter">Rúmgóður og bjartur salur</p>
            </div>
          </div>

          {/* Top Right Small */}
          <div className="md:col-span-2 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg border border-white/20">
            <img 
              src="/images/veislusalur/IMG_4736.jpg" 
              alt="Veislusalur Hauka - Uppsetning" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <p className="text-white font-bold text-lg italic uppercase tracking-tighter">Glæsileg borðuppsetning</p>
            </div>
          </div>

          {/* Bottom Middle Small */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg border border-white/20">
            <img 
              src="/images/veislusalur/IMG_4738.jpg" 
              alt="Veislusalur Hauka - Smáatriði" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 text-center justify-center">
              <p className="text-white font-bold text-sm italic uppercase tracking-tighter">Vandaður frágangur</p>
            </div>
          </div>

          {/* Bottom Right Small */}
          <div className="md:col-span-1 md:row-span-1 relative group overflow-hidden rounded-3xl shadow-lg border border-white/20">
            <img 
              src="/images/veislusalur/IMG_4739.jpg" 
              alt="Veislusalur Hauka - Stemning" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4 text-center justify-center">
              <p className="text-white font-bold text-sm italic uppercase tracking-tighter">Fullkomin lýsing</p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Amenities Grid */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
            Allt til alls fyrir þína veislu
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group">
              <div className="w-14 h-14 rounded-2xl bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] mb-6 group-hover:bg-[#c8102e] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
              </div>
              <h3 className="text-xl font-black text-[#1c2c6c] uppercase tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-gray-500 font-medium text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Booking Section (MVP Form / Future Calendar Slot) */}
      <div id="booking-section" className="max-w-5xl mx-auto px-6">
        <div className="bg-[#c8102e] rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 relative overflow-hidden">
          
          <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[200px] text-black/10 pointer-events-none transform -rotate-12">
            calendar_month
          </span>

          <div className="w-full md:w-5/12 text-white relative z-10">
            <h3 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter mb-4 leading-tight">
              Kanna lausa daga
            </h3>
            <p className="text-white/80 font-medium mb-8 leading-relaxed">
              Sendu okkur fyrirspurn með óskadagsetningu og við svörum um hæl með verðtilboði og staðfestingu á að salurinn sé laus. 
            </p>
            <div className="bg-black/20 p-6 rounded-2xl border border-white/10">
              <p className="font-bold uppercase tracking-widest text-[10px] text-white/70 mb-2">Verðskrá (Breytingum háð)</p>
              <ul className="space-y-3 font-medium">
                <li className="flex justify-between gap-4 border-b border-white/10 pb-2"><span>Föstudagar & Laugardagar</span> <strong className="whitespace-nowrap text-right">120.000 kr.</strong></li>
                <li className="flex justify-between gap-4 border-b border-white/10 pb-2"><span>Sunnudagar (Fermingar)</span> <strong className="whitespace-nowrap text-right">95.000 kr.</strong></li>
                <li className="flex justify-between gap-4"><span>Virkir dagar</span> <strong className="whitespace-nowrap text-right">Eftir samkomulagi</strong></li>
              </ul>
            </div>
          </div>

          <div className="w-full md:w-7/12 relative z-10">
            {/* Future Real-Time Calendar iframe goes here. For now, it's a premium form. */}
            <form className="bg-white rounded-2xl p-6 md:p-8 shadow-inner space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nafn / Fyrirtæki</label>
                  <input type="text" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all" placeholder="Þitt nafn" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Netfang</label>
                  <input type="email" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all" placeholder="netfang@netfang.is" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Óskadagsetning</label>
                  <input type="date" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all text-gray-700" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tegund veislu</label>
                  <select className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all text-gray-700">
                    <option>Brúðkaup</option>
                    <option>Ferming</option>
                    <option>Afmæli</option>
                    <option>Fyrirtækjaskemmtun</option>
                    <option>Annað</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Auka upplýsingar / Spurningar</label>
                <textarea rows="3" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#1c2c6c] focus:ring-1 focus:ring-[#1c2c6c] transition-all resize-none" placeholder="Hvað getum við aðstoðað þig með?"></textarea>
              </div>

              <Button variant="primary" className="w-full justify-center py-4 bg-[#1c2c6c] hover:bg-[#152052] border-none">
                Senda Fyrirspurn
              </Button>
            </form>
          </div>

        </div>
      </div>

    </main>
  );
}