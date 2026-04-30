import { useEffect } from 'react';

export default function Sumarskoli() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scheduleData = [
    { week: "9. - 13. júní", days: "5 dagar", fjol: "09:00 - 12:00", leik: "13:00 - 16:00", fot: "09:00 - 12:00", korf: "09:00 - 12:00", hand: "09:00 - 12:00" },
    { week: "16. - 20. júní", days: "4 dagar", fjol: "09:00 - 12:00", leik: "13:00 - 16:00", fot: "09:00 - 12:00", korf: "09:00 - 12:00", hand: "09:00 - 12:00" },
    { week: "23. - 27. júní", days: "5 dagar", fjol: "09:00 - 12:00", leik: "13:00 - 16:00", fot: "09:00 - 12:00", korf: "-", hand: "-" },
    { week: "30. júní - 4. júlí", days: "5 dagar", fjol: "-", leik: "09:00 - 12:00", fot: "-", korf: "-", hand: "-" },
    { week: "7. - 11. júlí", days: "5 dagar", fjol: "-", leik: "09:00 - 12:00", fot: "-", korf: "-", hand: "-" },
    { week: "14. - 18. júlí", days: "5 dagar", fjol: "-", leik: "09:00 - 12:00", fot: "-", korf: "-", hand: "-" },
    { week: "21. - 25. júlí", days: "LOKAÐ", isClosed: true },
    { week: "28. júlí - 1. ágúst", days: "LOKAÐ", isClosed: true },
    { week: "5. - 8. ágúst", days: "4 dagar", fjol: "09:00 - 12:00", leik: "13:00 - 16:00", fot: "09:00 - 12:00", korf: "09:00 - 12:00", hand: "09:00 - 12:00" },
    { week: "11. - 14. ágúst", days: "4 dagar", fjol: "09:00 - 12:00", leik: "13:00 - 16:00", fot: "09:00 - 12:00", korf: "09:00 - 12:00", hand: "09:00 - 12:00" },
  ];

  return (
    <main className="w-full bg-white min-h-screen pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className="bg-gradient-to-br from-[#1c2c6c] to-[#2a4099] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -rotate-12">
          wb_sunny
        </span>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 mb-6 shadow-sm">
            <span className="material-symbols-outlined text-[#D4AF37] text-[18px]">child_care</span>
            <span className="text-white text-xs font-black uppercase tracking-widest">
              Fyrir börn fædd 2013-2018
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-tight">
            Sumar <br />
            <span className="text-[#c8102e]">Íþróttaskóli</span>
          </h1>
          
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center mb-10">
            Fjölbreytt hreyfing, þjálfun og námskeið við allra hæfi. Leyfðu barninu þínu að kynnast sem flestum íþróttagreinum undir handleiðslu reynslumikilla þjálfara í sumar!
          </p>

          <a 
            href="https://www.sportabler.com/shop/haukar/sumarskoli" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative bg-[#c8102e] hover:bg-white text-white hover:text-[#c8102e] px-10 py-5 rounded-[2rem] text-lg font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl shadow-[#c8102e]/30 hover:shadow-2xl hover:shadow-white/20 hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-out -translate-x-full"></div>
            Skráning í Sportabler
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">arrow_forward</span>
          </a>
          <p className="text-xs font-bold text-white/60 uppercase tracking-widest mt-4">
            Opnar 28. apríl
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        
        {/* 2. Hvernig Virkar Þetta? (Quick Overview) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1c2c6c] mb-6">
              <span className="material-symbols-outlined text-[32px]">schedule</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#1c2c6c] mb-3">Tímasetningar</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Morgunnámskeið hefjast <strong className="text-gray-800">09:00</strong>. Gæsla í boði frá kl. 8:00 í Handboltasal. Seinni parts námskeið hefjast <strong className="text-gray-800">13:00</strong>.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-[#c8102e] mb-6">
              <span className="material-symbols-outlined text-[32px]">restaurant</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#1c2c6c] mb-3">Matur & Nesti</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Heitur hádegismatur frá Skólamat í boði. Mikilvægt er að senda börn ávallt með nesti fyrir hlé kl 10:15 og 14:15.
            </p>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center text-green-600 mb-6">
              <span className="material-symbols-outlined text-[32px]">location_on</span>
            </div>
            <h3 className="text-xl font-black uppercase tracking-tight text-[#1c2c6c] mb-3">Móttaka</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              Börnin mæta við aðalinngang Ásvalla (eða í samkomusal kl 13) þar sem starfsfólk vísar þeim á réttan stað.
            </p>
          </div>
        </div>

        {/* 3. Námskeiðin Okkar (The Camps) */}
        <section>
          <div className="text-center mb-12">
            <span className="text-[#c8102e] text-xs font-black uppercase tracking-[0.2em] mb-2 block">
              Veldu Það Sem Hentar
            </span>
            <h2 className="text-4xl md:text-5xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
              Námskeiðin Okkar
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Fjölgreinaskóli */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-8 border-[#1c2c6c] flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#1c2c6c]/5 flex items-center justify-center text-[#1c2c6c] mb-6 shrink-0">
                <span className="material-symbols-outlined text-[28px]">sports_gymnastics</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#1c2c6c] mb-4">Fjölgreinaskóli</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-6 flex-grow">
                Hugsað fyrir þá iðkendur sem vilja prófa marga mismunandi hluti. Kynning á fjölmörgum íþróttum innan félagsins í bland við skemmtilega leiki. Markmiðið er að allir finni eitthvað við sitt hæfi og eignist vini.
              </p>
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mt-auto">
                <span className="material-symbols-outlined text-[16px]">schedule</span> 09:00 - 12:00
              </div>
            </div>

            {/* Boltaskólar */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-8 border-[#c8102e] flex flex-col">
              <div className="flex gap-2 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#c8102e]/5 flex items-center justify-center text-[#c8102e]">
                  <span className="material-symbols-outlined text-[24px]">sports_soccer</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#c8102e]/5 flex items-center justify-center text-[#c8102e]">
                  <span className="material-symbols-outlined text-[24px]">sports_basketball</span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#c8102e]/5 flex items-center justify-center text-[#c8102e]">
                  <span className="material-symbols-outlined text-[24px]">sports_handball</span>
                </div>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#1c2c6c] mb-4">Boltaskólar</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-6 flex-grow">
                Fótbolta-, Körfubolta- og Handboltaskólar fyrir byrjendur jafnt sem lengra komna. Áhersla á að auka boltafærni í gegnum fjölbreyttar æfingar og spil.
              </p>
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2 mt-auto">
                <span className="material-symbols-outlined text-[16px]">schedule</span> 09:00 - 12:00
              </div>
            </div>

            {/* Leikjaskóli */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-t-8 border-[#D4AF37] flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 shrink-0">
                <span className="material-symbols-outlined text-[28px]">toys_and_games</span>
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tight text-[#1c2c6c] mb-4">Leikjaskóli</h3>
              <p className="text-gray-500 font-medium leading-relaxed mb-6 flex-grow">
                Áhersla lögð á að hafa gaman! Farið verður í sundferðir, hjólatúra, ratleiki og tarzanleiki. Einnig mun hið fræga og sívinsæla <strong>Draugahús Hauka</strong> opna nokkra daga yfir sumarið.
              </p>
              <div className="bg-gray-50 rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center justify-between mt-auto">
                <span className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">schedule</span> 13:00 - 16:00</span>
                <span className="text-[9px] text-[#c8102e]">*Undantekningar til</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Dagskráin (Schedule Table) */}
        <section>
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black italic text-[#1c2c6c] uppercase tracking-tighter">
                  Dagskrá Sumarsins 2025
                </h2>
                <p className="text-gray-400 text-sm font-medium mt-1">Öll námskeið eru vikunámskeið fyrir börn fædd 2013-2018.</p>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  Fyrir Hádegi
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  Eftir Hádegi
                </span>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="p-5 text-xs font-black text-[#1c2c6c] uppercase tracking-widest w-48">Dagsetning</th>
                    <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Fjölgreinaskóli</th>
                    <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Leikjaskóli</th>
                    <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Fótbolti</th>
                    <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Körfubolti</th>
                    <th className="p-5 text-xs font-black text-gray-400 uppercase tracking-widest">Handbolti</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {scheduleData.map((row, index) => (
                    <tr key={index} className={`hover:bg-gray-50/50 transition-colors ${row.isClosed ? 'bg-gray-100 hover:bg-gray-100' : ''}`}>
                      <td className="p-5">
                        <div className="font-bold text-[#1c2c6c]">{row.week}</div>
                        <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-1">{row.days}</div>
                      </td>
                      
                      {row.isClosed ? (
                        <td colSpan="5" className="p-5 text-center">
                          <span className="inline-block px-4 py-1.5 bg-gray-200 text-gray-500 rounded-full text-xs font-black uppercase tracking-widest">
                            Lokað / Frí
                          </span>
                        </td>
                      ) : (
                        <>
                          <td className="p-5">
                            {row.fjol !== '-' ? <span className="inline-block px-3 py-1 bg-[#1c2c6c]/10 text-[#1c2c6c] rounded-md text-[11px] font-bold">{row.fjol}</span> : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="p-5">
                            {row.leik !== '-' ? <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#967716] rounded-md text-[11px] font-bold">{row.leik}</span> : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="p-5">
                            {row.fot !== '-' ? <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-md text-[11px] font-bold">{row.fot}</span> : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="p-5">
                            {row.korf !== '-' ? <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-md text-[11px] font-bold">{row.korf}</span> : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="p-5">
                            {row.hand !== '-' ? <span className="inline-block px-3 py-1 bg-[#c8102e]/10 text-[#c8102e] rounded-md text-[11px] font-bold">{row.hand}</span> : <span className="text-gray-300">-</span>}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. Verðskrá & Upplýsingar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div className="bg-[#1c2c6c] text-white rounded-[2.5rem] p-8 shadow-lg relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[150px] opacity-10 rotate-12">payments</span>
            <div className="relative z-10">
              <h3 className="text-2xl font-black uppercase tracking-tight mb-6">Verðskrá</h3>
              <ul className="space-y-4">
                <li className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="font-medium text-white/90">Hálfur dagur (Fyrir/Eftir hádegi)</span>
                  <span className="font-black text-xl text-[#D4AF37]">8.000 kr.</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="font-medium text-white/90">Heill dagur (09:00 - 16:00)</span>
                  <span className="font-black text-xl text-[#D4AF37]">14.000 kr.</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/10 pb-4">
                  <div>
                    <span className="font-medium text-white/90 block">Hádegismatur (Vika)</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Frá Skólamat</span>
                  </div>
                  <span className="font-black text-xl text-[#D4AF37]">7.000 kr.</span>
                </li>
              </ul>
              <div className="mt-6 bg-white/10 rounded-xl p-4 text-sm font-medium text-white/80">
                Kaupa þarf sérstaklega hádegismatinn í Sportabler. Matur er í boði dagana 9-27. júní og 5-14. ágúst.
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#1c2c6c] mb-6">Hafa Samband</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                  <span className="material-symbols-outlined">person</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Umsjónarmaður</div>
                  <div className="font-bold text-[#1c2c6c] text-lg">Aron Rafn</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#c8102e]">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Netfang</div>
                  <a href="mailto:aronrafn@haukar.is" className="font-bold text-[#1c2c6c] text-lg hover:text-[#c8102e] transition-colors">aronrafn@haukar.is</a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#1c2c6c]">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Sími Íþróttaskóla</div>
                  <a href="tel:7889200" className="font-bold text-[#1c2c6c] text-lg hover:text-[#c8102e] transition-colors">788 9200</a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  );
}
