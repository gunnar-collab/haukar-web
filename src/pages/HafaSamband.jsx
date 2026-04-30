import { useEffect, useState } from 'react';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

export default function HafaSamband() {
  const [activeTab, setActiveTab] = useState('adalstjorn');

  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const divisionsBoard = {
    adalstjorn: {
      title: 'Aðalstjórn Hauka',
      members: [
        { role: 'Formaður aðalstjórnar', name: 'Magnús Gunnarsson', email: 'magnus@haukar.is', phone: '665-8910' },
        { role: 'Varaform. aðalstjórnar', name: 'Valgerður Sigurðardóttir', email: 'skjalavala@simnet.is', phone: '896-3122' },
        { role: 'Gjaldkeri', name: 'Guðborg Halldórsdóttir', email: 'gudborg@haukar.is', phone: '665-8919' },
        { role: 'Meðstjórnandi', name: 'Elva Guðmundsdóttir', email: 'efamile@isl.is', phone: '690-7920' },
        { role: 'Meðstjórnandi', name: 'Ingimar Haraldsson', email: 'ingihalla@gmail.com', phone: '820-6804' },
        { role: 'Meðstjórnandi', name: 'Eiríkur Svanur Sigfússon', email: 'eirikur@as.is', phone: '862-3377' },
        { role: 'Meðstjórnandi', name: 'Oddný Sófusdóttir', email: 'oddny@distica.is', phone: '665-7518' },
        { role: 'Meðstjórnandi', name: 'Brynjar Þór Þorsteinsson', email: 'brynjar15@gmail.com', phone: '898-2575' },
        { role: 'Meðstjórnandi', name: 'Andri Már Ólafsson', email: 'andri@haukar.is', phone: '895-5594' },
        { role: 'Meðstjórnandi', name: 'Brynjar Örn Steingrímsson', email: 'brynjarorn@simnet.is', phone: '892-9901' },
        { role: 'Meðstjórnandi', name: 'Halldór Jón Garðarsson', email: 'halldor@origo.is', phone: '898-5738' },
        { role: 'Meðstjórnandi', name: 'Kristján Ó Davíðsson', email: 'kriodav@gmail.com', phone: '823-0782' }
      ]
    },
    starfsfolk: {
      title: 'Starfsfólk Hauka',
      members: [
        { role: 'Framkvæmdastjóri', name: 'Magnús Gunnarsson', email: 'magnus@haukar.is', phone: '665-8910' },
        { role: 'Innkaupastjóri', name: 'Ásdís (Dísa) Þórðardóttir', email: 'asdis@haukar.is', phone: '848-0417' },
        { role: 'Íþróttastjóri Handbolta', name: 'Aron Kristjánsson', email: 'aron@haukar.is', phone: '857-3322' },
        { role: 'Skrifstofustj. Handbolta', name: 'Aron Rafn Eðvaldsson', email: 'aronrafn@haukar.is', phone: '846-2436' },
        { role: 'Íþróttastjóri Körfubolta', name: 'Stefán Þór Borgþórsson', email: 'stefanb@haukar.is', phone: '697-3960' },
        { role: 'Húsvörður Ásvöllum', name: 'Ármann Ingólfsson', email: 'armanith3rd@gmail.com', phone: '525-8700' },
        { role: 'Húsvörður Ásvöllum', name: 'Guðrún Sigurðardóttir', email: 'afgreidsla@haukar.is', phone: '525-8700' },
        { role: 'Húsvörður Ásvöllum', name: 'Anna Hlöðversdóttir', email: 'afgreidsla@haukar.is', phone: '525-8700' },
        { role: 'Húsvörður Ásvöllum', name: 'Petr Baumruk', email: 'afgreidsla@haukar.is', phone: '525-8700' },
        { role: 'Húsvörður Ásvöllum', name: 'Sigtryggur Ásgrímsson', email: 'afgreidsla@haukar.is', phone: '525-8700' },
        { role: 'Húsvörður Ásvöllum', name: 'Freyja Aðalsteinsdóttir', email: 'afgreidsla@haukar.is', phone: '525-8700' },
        { role: 'Húsvörður Knatthús', name: 'Guðni Indriðason', email: 'gudni@haukar.is', phone: '615-6383' },
        { role: 'Húsvörður Knatthús', name: 'Ómar Tómasson', email: 'omar@haukar.is', phone: '892-8424' },
        { role: 'Húsvörður Knatthús', name: 'Steinunn Ólafsdóttir', email: 'afgreidsla@haukar.is', phone: '525-8700' },
        { role: 'Vallarstjóri', name: 'Gaui Már Þorsteinsson', email: 'gaui@haukar.is', phone: '858-1704' }
      ]
    },
    handbolti: {
      title: 'Handknattleiksdeild',
      members: [
        { role: 'Formaður', name: 'Andri Már Ólafsson', email: 'andri@haukar.is', phone: '895-5594' },
        { role: 'Framkvæmdarstjóri', name: 'Aron Kristjánsson', email: 'aron@haukar.is', phone: '857-3322' },
        { role: 'Skrifstofustjóri', name: 'Aron Rafn Eðvarsson', email: 'aronrafn@haukar.is', phone: '525-8700' },
        { role: 'Meðstjórnandi', name: 'Ásdís Geirsdóttir', email: 'haukar1310@gmail.com', phone: '698-7182' },
        { role: 'Meðstjórnandi', name: 'Áslaug Þorgeirsdóttir', email: 'aslaugt@haukar.is', phone: '866-9626' },
        { role: 'Meðstjórnandi', name: 'Ásmundur Jónsson', email: 'asi@internet.is', phone: '618-8222' },
        { role: 'Meðstjórnandi', name: 'Ásta Ármannsdóttir', email: 'astad@live.com', phone: '863-0214' },
        { role: 'Meðstjórnandi', name: 'Elva Guðmundsdóttir', email: 'efamile@isl.is', phone: '690-7920' },
        { role: 'Meðstjórnandi', name: 'Gísli Arnar Skúlason', email: 'gisliskula@gmail.com', phone: '788-2495' },
        { role: 'Meðstjórnandi', name: 'Guðborg Halldórsdóttir', email: 'gudborg@haukar.is', phone: '665-8919' },
        { role: 'Meðstjórnandi', name: 'Guðjón Sigurðarson', email: 'gudjon@nyform.is', phone: '824-0032' },
        { role: 'Meðstjórnandi', name: 'Gunnhildur Pétursdóttir', email: 'gunpet27@gmail.com', phone: '774-6076' },
        { role: 'Meðstjórnandi', name: 'Haukur Haraldsson', email: 'Haukur.haraldsson44@gmail.com', phone: '693-7100' },
        { role: 'Meðstjórnandi', name: 'Ingimar Haraldsson', email: 'ingihalla@gmail.com', phone: '820-6804' }
      ]
    },
    korfubolti: {
      title: 'Körfuknattleiksdeild - Stjórn',
      members: [
        { role: 'Formaður', name: 'Brynjar Þór Þorsteinsson', email: 'brynjar15@gmail.com', phone: '898-2575' },
        { role: 'Meðstjórnandi', name: 'Baldur Óli Sigurðsson', email: 'balduroli@simnet.is', phone: '897-4143' },
        { role: 'Meðstjórnandi', name: 'Benedikt S Benónýsson', email: 'b.steinar@gmail.com', phone: '860-6172' },
        { role: 'Meðstjórnandi', name: 'Brynjar Örn Steingrímsson', email: 'Brynjarorn85@gmail.com', phone: '892-9901' },
        { role: 'Meðstjórnandi', name: 'Friðleifur Kristjánsson', email: 'fridleifur@gmail.com', phone: '698-3118' },
        { role: 'Meðstjórnandi', name: 'Hafsteinn Eyland', email: 'hafsteinn.eyland@gmail.com', phone: '867-3448' },
        { role: 'Meðstjórnandi', name: 'Haraldur Örn Sturluson', email: 'hallister@gmail.com', phone: '864-2122' },
        { role: 'Meðstjórnandi', name: 'Helena Sverrisdóttir', email: 'sverrisdottir4@gmail.com', phone: '778-6822' },
        { role: 'Meðstjórnandi', name: 'Ingi Björn Jónsson', email: 'ingi.jonsson@gmail.com', phone: '840-5525' },
        { role: 'Meðstjórnandi', name: 'Kristinn Loftur Einarsson', email: 'kristinnl@oryggi.is', phone: '820-2479' },
        { role: 'Meðstjórnandi', name: 'Sara Pálmadóttir', email: 'sara.palmadottir@gmail.com', phone: '866-8509' },
        { role: 'Meðstjórnandi', name: 'Sigríður Dúna Þórðardóttir', email: 'sduna88@gmail.com', phone: '696-0862' },
        { role: 'Meðstjórnandi', name: 'Þorsteinn Þorsteinsson', email: 'thor.thorsteinsson@gmail.com', phone: '820-4204' }
      ]
    },
    korfubolti_unglingarad: {
      title: 'Körfubolti - Barna- og unglingaráð',
      members: [
        { role: 'Meðstjórnandi', name: 'Ingi Þór Rúnarsson', email: 'ingi.runarsson@gmail.com', phone: '844-4123' },
        { role: 'Meðstjórnandi', name: 'Logi Sigurjónsson', email: 'logisig@gmail.com', phone: '843-1329' },
        { role: 'Meðstjórnandi', name: 'Magnús Björnsson', email: 'maggibjoss77@gmail.com', phone: '821-5628' },
        { role: 'Meðstjórnandi', name: 'Sigríður Dúna Þórðardóttir', email: 'sduna88@gmail.com', phone: '696-0862' },
        { role: 'Meðstjórnandi', name: 'Sigrún Fjeldsted', email: 'sigrunfjeldsted@gmail.com', phone: '824-4714' },
        { role: 'Meðstjórnandi', name: 'Thelma Þorbergsdóttir', email: 'thelma.thorbergs@gmail.com', phone: '698-7429' },
        { role: 'Meðstjórnandi', name: 'Valgarður Ragnarsson', email: 'vallilax@gmail.com', phone: '770-6040' },
        { role: 'Meðstjórnandi', name: 'Vera Dögg Höskuldsdóttir', email: 'veradogg@simnet.is', phone: '865-8445' }
      ]
    },
    karate: {
      title: 'Karatedeild - Stjórn',
      members: [
        { role: 'Formaður', name: 'Kristján Ó. Davíðsson', email: 'kriodav@gmail.com', phone: '823-0782' },
        { role: 'Varaformaður', name: 'Gunnlaugur Sigurðsson', email: 'gunnlaugursig@gmail.com', phone: '896-7963' },
        { role: 'Gjaldkeri', name: 'Helgi Kuldeep Kumar', email: 'kumarhelgi@gmail.com', phone: '868-0984' },
        { role: 'Ritari', name: 'Eva Ósk Gunnarsdóttir', email: 'evaoskg@gmail.com', phone: '661-3313' },
        { role: 'Meðstjórnandi', name: 'Ana Maria Brasoveanua', email: 'brasoveanua1@gmail.com', phone: '847-4858' },
        { role: 'Varamaður', name: 'Eugen Schuldeis', email: 'eugenschuldeis@gmail.com', phone: '844-9717' },
        { role: 'Varamaður', name: 'Hjördís Helga Ægisdóttir', email: 'hjordishelga@gmail.com', phone: '775-3276' }
      ]
    }
  };

  return (
    <main className="w-full bg-white flex-grow pb-20">
      
      {/* 1. Hero Section */}
      <div className="bg-[#c8102e] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          contact_support
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#D4AF37] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block drop-shadow-sm">
            Skrifstofa & Stjórnir
          </span>
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Hafa Samband
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Hér finnur þú allar helstu upplýsingar um skrifstofu Hauka og stjórnir einstakra deilda félagsins.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        
        {/* 2. Office Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                     <p className="text-xl font-black text-[#1c2c6c] uppercase tracking-wide mb-1">Sími: 525-8700</p>
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

        {/* 3. Board Directory with Tabs */}
        <div className="space-y-12">
          <div className="text-center">
            <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block">
              Stjórnir og Ráð
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter mb-8">Lykilfólk Deilda</h2>
            
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto md:flex-wrap justify-start md:justify-center gap-3 md:gap-4 mb-12 pb-4 px-2 w-full max-w-full scrollbar-hide snap-x snap-mandatory">
              {Object.keys(divisionsBoard).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 snap-center ${
                    activeTab === key 
                      ? 'bg-[#c8102e] text-white shadow-lg scale-105' 
                      : 'bg-white text-gray-400 hover:text-[#1c2c6c] hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  {divisionsBoard[key].title.split(' - ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tab Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
             {divisionsBoard[activeTab].members.map((member, idx) => (
               <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col items-center text-center animate-fadeIn">
                 <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#c8102e]/10 transition-colors">
                    <span className="material-symbols-outlined text-[32px] text-gray-300 group-hover:text-[#c8102e] transition-colors">person</span>
                 </div>
                 <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-widest mb-2 block">
                   {member.role}
                 </span>
                 <h3 className="text-2xl font-black text-[#1c2c6c] mb-2 uppercase tracking-tight">
                   {member.name}
                 </h3>
                 {member.phone && (
                   <p className="text-gray-400 text-sm font-bold mb-6">{member.phone}</p>
                 )}
                 <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#c8102e] bg-gray-50 hover:bg-gray-100 px-6 py-3 rounded-xl transition-colors mt-auto w-full justify-center">
                   <span className="material-symbols-outlined text-[18px]">mail</span>
                   Senda Póst
                 </a>
               </div>
             ))}
          </div>
        </div>

        {/* 4. Organizational Chart (Skipulag) - NEW Interactive Version */}
        <div className="pt-10">
          <div className="mb-12 text-center">
            <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block drop-shadow-md">
              Stjórnskipulag
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">Skipulag Félagsins</h2>
          </div>

          <div className="flex flex-col items-center gap-8 md:gap-12 relative">
            
            {/* Level 0: Top Authority */}
            <div className="bg-[#c8102e] text-white p-6 md:p-8 rounded-3xl shadow-xl border-4 border-white w-full max-w-xl text-center relative z-10 group hover:scale-105 transition-transform duration-500">
               <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tight mb-2">Aðalfundur / Aðalstjórn</h3>
               <p className="text-white/80 text-sm font-bold uppercase tracking-widest">Æðsta vald félagsins</p>
               
               {/* Connector Line Down */}
               <div className="absolute top-full left-1/2 w-1 h-12 bg-gray-200 -translate-x-1/2 hidden md:block"></div>
            </div>

            {/* Level 1: Primary Branches */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative">
               
               {/* Vertical Connectors for Tablet/Desktop */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[66%] h-px bg-gray-200 -translate-y-6 hidden md:block"></div>
               
               {/* Left Branch: Rekstrarfélag */}
               <div className="flex flex-col items-center">
                  <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-md w-full text-center hover:border-[#1c2c6c] transition-colors group">
                    <h4 className="text-lg font-black text-[#1c2c6c] uppercase mb-2">Rekstrarfélag Hauka</h4>
                    <ul className="text-xs text-gray-400 font-bold uppercase tracking-tighter space-y-1">
                      <li>Markaðsmál</li>
                      <li>VSK Umhverfi</li>
                    </ul>
                    <div className="w-px h-8 bg-gray-100 mx-auto mt-4"></div>
                    <div className="bg-gray-50 p-4 rounded-xl text-center">
                      <p className="text-sm font-bold text-[#c8102e] uppercase italic">Félagsdeildir</p>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Meistaraflokksráð</p>
                    </div>
                  </div>
               </div>

               {/* Center Branch: Framkvæmdastjóri (The Main Operational Hub) */}
               <div className="flex flex-col items-center">
                  <div className="bg-[#1c2c6c] p-6 rounded-2xl shadow-lg w-full text-center group hover:scale-105 transition-transform duration-300">
                    <h4 className="text-lg font-black text-white uppercase mb-2">Framkvæmdastjóri</h4>
                    <ul className="text-xs text-white/70 font-bold uppercase tracking-tighter space-y-1">
                      <li>Starfsmannamál</li>
                      <li>Samræming / Skipulag</li>
                    </ul>
                  </div>
                  
                  {/* The Linear Operational Chain */}
                  <div className="w-px h-6 bg-[#1c2c6c]/20"></div>
                  <div className="bg-white border border-gray-100 p-3 px-6 rounded-xl shadow-sm text-center w-4/5 hover:bg-gray-50 transition-colors">
                    <p className="text-xs font-black text-[#1c2c6c] uppercase">Fasteignir</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Íþróttahús / Útisvæði</p>
                  </div>
                  <div className="w-px h-6 bg-[#1c2c6c]/20"></div>
                  <div className="bg-white border border-gray-100 p-3 px-6 rounded-xl shadow-sm text-center w-3/4 hover:bg-gray-50 transition-colors">
                    <p className="text-xs font-black text-[#1c2c6c] uppercase">Skrifstofa</p>
                  </div>
                  <div className="w-px h-6 bg-[#1c2c6c]/20"></div>
                  <div className="bg-white border border-gray-100 p-3 px-6 rounded-xl shadow-sm text-center w-4/5 hover:bg-gray-50 transition-colors">
                    <p className="text-xs font-black text-[#1c2c6c] uppercase">Íþróttastjórar</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase">Umsjón með barna- og unglingastarfi</p>
                  </div>
                  <div className="w-px h-6 bg-[#1c2c6c]/20"></div>
                  <div className="bg-gray-50 p-4 rounded-xl text-center border-b-2 border-[#1c2c6c]">
                    <p className="text-sm font-bold text-[#c8102e] uppercase italic">Félagsdeildir</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Barna- og unglingaráð</p>
                  </div>
               </div>

               {/* Right Branch: Haukavellir ehf. */}
               <div className="flex flex-col items-center">
                  <div className="bg-white border-2 border-gray-100 p-6 rounded-2xl shadow-md w-full text-center hover:border-[#1c2c6c] transition-colors group">
                    <h4 className="text-lg font-black text-[#1c2c6c] uppercase mb-2">Haukavellir EHF.</h4>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Byggingaframkvæmdir</p>
                  </div>
               </div>

            </div>
          </div>
        </div>

        {/* 5. Transparency Section - Annual Reports Link */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#c8102e]/30 transition-all">
          <div className="flex items-center gap-6 text-center md:text-left flex-col md:flex-row">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-[#c8102e] group-hover:bg-[#c8102e]/10 transition-colors">
              <span className="material-symbols-outlined text-[40px]">bar_chart</span>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-black italic text-[#1c2c6c] uppercase tracking-tighter mb-2">Gagnsæi og Ársskýrslur</h3>
              <p className="text-gray-500 font-medium max-w-lg">Hér getur þú nálgast allar opinberar ársskýrslur félagsins síðustu ár í PDF formi.</p>
            </div>
          </div>
          <Link to="/arsskyrslur" className="bg-[#1c2c6c] hover:bg-[#c8102e] text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all shadow-lg hover:scale-105">
            Skoða Skýrslur
          </Link>
        </div>

        {/* 6. Division Links */}
        <div className="bg-[#1c2c6c] rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-[#c8102e]/20 rounded-full blur-3xl"></div>
           <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white mb-4 relative z-10">Vantar þig meiri upplýsingar?</h3>
           <p className="text-white/70 font-medium mb-8 max-w-2xl mx-auto relative z-10">
             Hver íþróttadeild ber ábyrgð á sínu eigin starfi. Þú getur einnig fundið sértækar upplýsingar á síðum hverrar deildar fyrir sig.
           </p>
           <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {[
                { name: 'Handbolti', path: '/handbolti' },
                { name: 'Fótbolti', path: '/fotbolti' },
                { name: 'Körfubolti', path: '/korfubolti' },
                { name: 'Karate', path: '/karate' }
              ].map(sport => (
                <Link key={sport.name} to={sport.path} className="bg-white/10 hover:bg-[#c8102e] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-colors shadow-sm">
                  {sport.name}
                </Link>
              ))}
           </div>
        </div>

      </div>
    </main>
  );
}