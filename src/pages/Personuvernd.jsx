import { useEffect } from 'react';

export default function Personuvernd() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#fafafa] flex-grow pb-20">
      
      {/* 1. Hero Section */}
      <div className="bg-[#1c2c6c] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        
        {/* Subtle Background Icon */}
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          security
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-[#c8102e] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block">
            Öryggi & Trúnaður
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Persónuverndarstefna
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Hjá Haukum leggjum við ríka áherslu á að tryggja öryggi og trúnað þeirra persónuupplýsinga sem við vinnum með.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 prose prose-slate max-w-none">
          
          <section className="mb-12">
            <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-6 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] text-lg">1</span>
              Almennt
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Knattspyrnufélagið Haukar („Haukar“) hefur einsett sér að tryggja trúnað, áreiðanleika og tiltækileika persónuupplýsinga í hvívetna. 
              Í persónuverndarstefnu þessari er því lýst hvernig félagið vinnur með persónuupplýsingar. Öll vinnsla Hauka fer fram á grundvelli laga nr. 90/2018 um persónuvernd og vinnslu persónuupplýsinga („persónuverndarlög“).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-6 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] text-lg">2</span>
              Ábyrgðaraðili
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Ábyrgðaraðili við vinnslu persónuupplýsinga er sá aðili sem ákveður tilgang og aðferðir við vinnsluna. Haukar er ábyrgðaraðili á vinnslu persónuupplýsinga hjá félaginu.
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-2">
              <p className="font-bold text-[#1c2c6c]">Knattspyrnufélagið Haukar</p>
              <p className="text-gray-500">Ásvöllum, 221 Hafnarfjörður</p>
              <p className="text-gray-500">Sími: 525 8700</p>
              <p className="text-gray-500">Netfang: <a href="mailto:haukar@haukar.is" className="text-[#c8102e] hover:underline">haukar@haukar.is</a></p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-6 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] text-lg">3</span>
              Hvaða upplýsingar vinna Haukar og hvers vegna?
            </h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-black text-[#1c2c6c] uppercase mb-3">Skráning í íþróttastarf</h3>
                <p className="text-gray-600 mb-4">Haukar bjóða upp á ýmis konar íþróttastarf fyrir börn. Forráðamenn skrá upplýsingar um iðkanda í gegnum Sportabler. Félagið vinnur með eftirfarandi upplýsingar:</p>
                <ul className="list-disc pl-6 text-gray-500 space-y-2">
                  <li>Tengiliðaupplýsingar forráðamanna (nafn, kennitala, heimilisfang, netfang, símanúmer).</li>
                  <li>Tengiliðaupplýsingar barns (nafn, kennitala).</li>
                  <li>Upplýsingar um námskeið og greiðslumáta.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#1c2c6c] uppercase mb-3">Myndir af iðkendum</h3>
                <p className="text-gray-600 mb-4">Haukar taka myndir af iðkendum og deila á samfélagsmiðla og heimasíðu, að því gefnu að foreldrar hafi veitt upplýst samþykki fyrir því.</p>
              </div>

              <div>
                <h3 className="text-xl font-black text-[#1c2c6c] uppercase mb-3">Eftirlitsmyndavélar</h3>
                <p className="text-gray-600 mb-4">Í og við húsakynni Hauka er að finna eftirlitsmyndavélar í öryggis- og eignavörsluskyni. Myndefnið geymist allajafna í 60 daga en að hámarki í 90 daga.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-6 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] text-lg">4</span>
              Miðlun til þriðja aðila
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Haukar notast við rafrænar lausnir frá þriðja aðila (t.d. Sportabler) sem auðvelda félaginu að halda utan um upplýsingar. 
              Félagið gerir ávallt vinnslusamning við viðkomandi þjónustuaðila til að tryggja öryggi og trúnað upplýsinga.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-black italic text-[#1c2c6c] uppercase mb-6 tracking-tight flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-[#c8102e]/10 flex items-center justify-center text-[#c8102e] text-lg">5</span>
              Réttindi þín
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">Þú nýtur ákveðinna réttinda samkvæmt persónuverndarlögum, þar á meðal:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-bold text-[#1c2c6c] mb-1">Réttur til aðgangs</p>
                <p className="text-xs text-gray-500">Fá afrit af þínum persónuupplýsingum.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-bold text-[#1c2c6c] mb-1">Réttur til leiðréttingar</p>
                <p className="text-xs text-gray-500">Láta leiðrétta rangar upplýsingar um þig.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-bold text-[#1c2c6c] mb-1">Réttur til eyðingar</p>
                <p className="text-xs text-gray-500">Í ákveðnum tilfellum getur þú beðið um að gögnum sé eytt.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="font-bold text-[#1c2c6c] mb-1">Réttur til að andmæla</p>
                <p className="text-xs text-gray-500">Andmæla vinnslu ef hún byggir á lögmætum hagsmunum.</p>
              </div>
            </div>
            <p className="text-gray-600 italic">Hafðu samband á <a href="mailto:haukar@haukar.is" className="text-[#c8102e] font-bold">haukar@haukar.is</a> til að nýta réttindi þín.</p>
          </section>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center text-gray-400 text-sm">
            Persónuverndarstefna þessi var síðast uppfærð: Ágúst 2021
          </div>

        </div>
      </div>
    </main>
  );
}
