import { useEffect } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function HafaSamband() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Board Members Data
  const boardMembers = [
    { role: 'Formaður', name: 'Jón Jónsson', email: 'formadur@haukar.is' },
    { role: 'Varaformaður', name: 'Guðrún Pálsdóttir', email: 'varaformadur@haukar.is' },
    { role: 'Gjaldkeri', name: 'Pétur Pétursson', email: 'gjaldkeri@haukar.is' },
    { role: 'Ritari', name: 'Sigríður Sigurðardóttir', email: 'ritari@haukar.is' },
    { role: 'Meðstjórnandi', name: 'Bjarni Bjarnason', email: 'bjarni@haukar.is' },
    { role: 'Meðstjórnandi', name: 'Anna Jónsdóttir', email: 'anna@haukar.is' }
  ];

  return (
    <main className="w-full bg-[#fafafa] flex-grow pt-10 md:pt-16 pb-20">
      
      {/* 1. Hero Section - Now Dominant Haukar Red */}
      <div className="bg-[#c8102e] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        
        {/* Subtle Background Icon */}
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          contact_support
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#1c2c6c] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block">
            Skrifstofa & Stjórn
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Hafa Samband
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Við erum alltaf til taks. Hér finnur þú allar helstu upplýsingar um skrifstofu Hauka og aðalstjórn félagsins.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* 2. Top Row: Office Info & Form (Perfect 50/50 Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
           
           {/* Office Info */}
           <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col justify-center">
              <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-8 tracking-tight">Skrifstofa Hauka</h2>
              
              <div className="space-y-8">
                 <div className="flex items-start gap-5">
                   <div className="w-14 h-14 rounded-full bg-[#1c2c6c]/5 flex items-center justify-center text-[#c8102e] shrink-0">
                     <span className="material-symbols-outlined text-[28px]">location_on</span>
                   </div>
                   <div>
                     <p className="text-xl font-black text-[#1c2c6c] uppercase tracking-wide mb-1">Ásvellir</p>
                     <p className="text-gray-500 font-medium text-lg">Íþróttamiðstöð, 221 Hafnarfjörður</p>
                   </div>
                 </div>
                 
                 <div className="flex items-start gap-5">
                   <div className="w-14 h-14 rounded-full bg-[#1c2c6c]/5 flex items-center justify-center text-[#c8102e] shrink-0">
                     <span className="material-symbols-outlined text-[28px]">call</span>
                   </div>
                   <div>
                     <p className="text-xl font-black text-[#1c2c6c] uppercase tracking-wide mb-1">Sími: 555-1234</p>
                     <p className="text-gray-500 font-medium text-lg">Opið 09:00 - 16:00 (Mán-Fös)</p>
                   </div>
                 </div>

                 <div className="flex items-start gap-5">
                   <div className="w-14 h-14 rounded-full bg-[#1c2c6c]/5 flex items-center justify-center text-[#c8102e] shrink-0">
                     <span className="material-symbols-outlined text-[28px]">mail</span>
                   </div>
                   <div>
                     <p className="text-xl font-black text-[#1c2c6c] uppercase tracking-wide mb-1">Netfang</p>
                     <a href="mailto:haukar@haukar.is" className="text-gray-500 font-medium text-lg hover:text-[#c8102e] transition-colors">haukar@haukar.is</a>
                   </div>
                 </div>
              </div>
           </div>

           {/* Quick Contact Form */}
           <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-gray-100">
             <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-8 tracking-tight">Senda Fyrirspurn</h2>
             <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nafn</label>
                    <input type="text" className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base font-medium focus:outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all" placeholder="Þitt nafn" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Netfang</label>
                    <input type="email" className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base font-medium focus:outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all" placeholder="Þitt netfang" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Skilaboð</label>
                  <textarea rows="5" className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 text-base font-medium focus:outline-none focus:border-[#c8102e] focus:ring-1 focus:ring-[#c8102e] transition-all resize-none" placeholder="Hvernig getum við aðstoðað?"></textarea>
                </div>
                <Button variant="primary" className="w-full justify-center py-5 text-lg">
                  Senda Skilaboð
                </Button>
             </form>
           </div>

        </div>

        {/* 3. Bottom Row: Board Directory (Full Width, 3-Column Grid) */}
        <div>
          <div className="mb-10 text-center">
            <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block drop-shadow-md">
              Lykilfólk
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">Aðalstjórn Hauka</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {boardMembers.map((member, idx) => (
               <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center">
                 <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#c8102e]/10 transition-colors">
                    <span className="material-symbols-outlined text-[32px] text-gray-300 group-hover:text-[#c8102e] transition-colors">person</span>
                 </div>
                 <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                   {member.role}
                 </span>
                 <h3 className="text-2xl font-black text-[#1c2c6c] mb-6 uppercase tracking-tight">
                   {member.name}
                 </h3>
                 <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#c8102e] bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-xl transition-colors mt-auto w-full justify-center">
                   <span className="material-symbols-outlined text-[18px]">mail</span>
                   Senda Póst
                 </a>
               </div>
             ))}
          </div>
        </div>

        {/* 4. The Rethink: Clean Divisions Routing Strip */}
        <div className="bg-[#1c2c6c] rounded-3xl p-8 md:p-12 text-center shadow-lg">
           <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white mb-4">Ertu að leita að stjórn ákveðinnar deildar?</h3>
           <p className="text-white/70 font-medium mb-8 max-w-2xl mx-auto">
             Hver íþróttadeild ber ábyrgð á sínu eigin starfi. Smelltu á viðeigandi deild til að finna tengiliði, þjálfara og stjórnarmenn.
           </p>
           <div className="flex flex-wrap justify-center gap-4">
              {['Handbolti', 'Fótbolti', 'Körfubolti', 'Karaté', 'Skíði'].map(sport => (
                <Link key={sport} to="#" className="bg-white/10 hover:bg-[#c8102e] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors shadow-sm">
                  {sport}
                </Link>
              ))}
           </div>
        </div>

      </div>
    </main>
  );
}