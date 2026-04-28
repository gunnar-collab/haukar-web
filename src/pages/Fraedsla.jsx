import Button from '../components/Button.jsx';

export default function Fraedsla() {
  const categories = [
    {
      title: "Kynferðisleg áreitni og ofbeldi",
      icon: "gavel",
      description: "Upplýsingar og leiðbeiningar um hvernig á að bregðast við og koma í veg fyrir kynferðislega áreitni.",
      link: "https://www.isi.is/fraedsla/fraedsluefni/kynferdisleg-areitni-og-ofbeldi"
    },
    {
      title: "Andleg heilsa",
      icon: "psychology",
      description: "Mikilvægi andlegrar heilsu í íþróttum og hvernig við styðjum við okkar fólk.",
      link: "https://www.isi.is/fraedsla/fraedsluefni/andleg-heilsa"
    },
    {
      title: "Forvarnir & Einelti",
      icon: "verified_user",
      description: "Stefna okkar gegn einelti og hvernig við tryggjum öruggt umhverfi fyrir alla.",
      link: "https://www.isi.is/fraedsla/fraedsluefni/forvarnir"
    },
    {
      title: "Næring",
      icon: "restaurant",
      description: "Fræðsla um rétta næringu fyrir íþróttafólk á öllum aldri.",
      link: "https://www.isi.is/fraedsla/fraedsluefni/naering"
    },
    {
      title: "Jafnréttismál",
      icon: "balance",
      description: "Jafnrétti er grundvallaratriði í starfi Hauka. Hér má finna ítarefni ÍSÍ.",
      link: "https://www.isi.is/fraedsla/fraedsluefni/jafnrettismal"
    },
    {
      title: "Lyfjaeftirlit",
      icon: "medical_services",
      description: "Upplýsingar um hrein íþróttamál og reglur lyfjaeftirlits.",
      link: "https://www.isi.is/fraedsla/fraedsluefni/lyfjaeftirlit"
    }
  ];

  return (
    <div className="w-full bg-white pb-24">
      {/* Hero Section */}
      <section className="bg-[#1c2c6c] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#c8102e] skew-x-[-20deg] translate-x-32"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-4 block drop-shadow-sm">Haukar • Fræðsla & Öryggi</span>
          <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white uppercase leading-none mb-6 drop-shadow-lg">
            Öruggt og faglegt <br /> <span className="text-[#D4AF37]">íþróttastarf</span>
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
            Hjá Haukum leggjum við ríka áherslu á að veita iðkendum, foreldrum og þjálfurum góða fræðslu. Við vinnum náið með ÍSÍ að því að tryggja faglegt og öruggt umhverfi á Ásvöllum.
          </p>
        </div>
      </section>

      {/* Intro Text & Response Team */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gray-50 p-10 rounded-3xl border border-gray-100 flex flex-col justify-center">
            <h2 className="text-2xl lg:text-3xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-6 leading-tight">
              Samskiptaráðgjafi <br /> 
              <span className="text-[#c8102e] text-lg lg:text-2xl tracking-normal whitespace-nowrap block mt-1">íþróttahreyfingarinnar</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Samskiptaráðgjafi íþróttahreyfingarinnar er óháður aðili sem styður við þolendur ofbeldis og annarra óviðeigandi samskipta. Allir geta leitað til hans án endurgjalds og í fullum trúnaði.
            </p>
            <a href="https://samskiptaradgjafi.is" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" icon="contact_support" className="w-full sm:w-auto">Hafa samband við ráðgjafa</Button>
            </a>
          </div>

          <div className="bg-white p-10 rounded-3xl border-2 border-[#1c2c6c]/5 shadow-sm">
            <h2 className="text-3xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-6 leading-none">Viðbragðsteymi <br /> <span className="text-[#c8102e]">Hauka</span></h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
              Viðbragðsteymi Hauka er virkt við óvæntum áföllum, grun um einelti, áreitni eða ofbeldi.
            </p>
            <div className="space-y-4">
              {[
                { title: "Skipan teymis", detail: "Formaður/Framkvæmdastjóri, Íþróttastjóri og fulltrúar deilda." },
                { title: "Trúnaður", detail: "Öll mál sem berast teyminu eru meðhöndluð sem algjör trúnaðarmál." },
                { title: "Viðbragð", detail: "Teymið vinnur samkvæmt 5-skrefa ferli ÍBH og ÍSÍ." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#c8102e] mt-2 shrink-0"></div>
                  <div>
                    <h5 className="font-bold text-[#1c2c6c] text-sm">{item.title}</h5>
                    <p className="text-gray-500 text-xs">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5-Step Process Section */}
        <div className="mb-24">
          <h3 className="text-4xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-12 text-center">Ferli <span className="text-[#c8102e]">tilkynninga</span></h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              { step: "01", title: "Tilkynning", desc: "Berst til formanns viðbragðsteymis." },
              { step: "02", stepLabel: "Köllun", desc: "Teymið er kallað saman strax." },
              { step: "03", stepLabel: "Trúnaður", desc: "Málið rætt í fyllsta trúnaði." },
              { step: "04", stepLabel: "Úrvinnsla", desc: "Leyst innan félags eða vísað áfram." },
              { step: "05", stepLabel: "Niðurstaða", desc: "Tilkynnt til allra hlutaðeigandi." }
            ].map((step, i) => (
              <div key={i} className="relative bg-white border border-gray-100 p-6 rounded-2xl text-center group hover:bg-gray-50 transition-colors">
                <span className="text-4xl font-black text-gray-100 group-hover:text-[#c8102e]/10 transition-colors absolute top-4 left-1/2 -translate-x-1/2">{step.step}</span>
                <div className="relative z-10 pt-8">
                  <h5 className="font-bold text-[#1c2c6c] text-sm mb-2">{step.stepLabel || step.title}</h5>
                  <p className="text-gray-400 text-[11px] leading-tight">{step.desc}</p>
                </div>
                {i < 4 && <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-20 text-[#c8102e]/20"><span className="material-symbols-outlined">chevron_right</span></div>}
              </div>
            ))}
          </div>
          <p className="text-center text-gray-400 text-xs mt-8">
            Málum getur verið vísað til: Samskiptaráðgjafa, Barnaverndar, Lögreglu eða 112.
          </p>
        </div>

        <h3 className="text-4xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-12 text-center">Fræðsluefni ÍSÍ</h3>
        
        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <div key={idx} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left flex flex-col h-full">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#c8102e] group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
              </div>
              <h4 className="text-xl font-bold text-[#1c2c6c] mb-3">{cat.title}</h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                {cat.description}
              </p>
              <a href={cat.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[#c8102e] font-bold text-sm hover:underline gap-1">
                Skoða nánar <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#c8102e] rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Ertu með spurningar?</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Við erum hér til að aðstoða. Ef þú hefur einhverjar athugasemdir eða spurningar varðandi barna- og unglingastarf okkar, ekki hika við að hafa samband.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" icon="mail">Senda póst á Hauka</Button>
              <Button variant="ghost" icon="phone">Hringja 525 8700</Button>
            </div>
          </div>
          {/* Subtle logo background */}
          <img src="/images/logo.png" alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[150%] opacity-5 pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
