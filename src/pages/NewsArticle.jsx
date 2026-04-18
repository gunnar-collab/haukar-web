import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NewsArticle() {
  // Always snap to the top when loading a new article
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-white flex-grow pt-10 md:pt-16 pb-20">
      
      {/* 1. Article Header */}
      <header className="max-w-4xl mx-auto px-4 md:px-6 pt-8 md:pt-12 mb-8">
        
        {/* Breadcrumbs & Meta */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/" className="text-gray-400 hover:text-[#1c2c6c] transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Forsíða
          </Link>
          <span className="text-gray-300">/</span>
          <span className="bg-[#c8102e] text-white px-3 py-1 text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-sm shadow-sm">
            Handbolti
          </span>
          <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">schedule</span>
            17. apríl 2026
          </span>
        </div>

        {/* Massive Editorial Headline */}
        <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-[0.95] mb-6">
          Stórsigur á Ásvöllum: Haukar tryggja sér sæti í úrslitum
        </h1>
        
        {/* Subheadline / Lead Paragraph */}
        <p className="text-xl md:text-2xl text-gray-500 font-medium leading-snug">
          Eftir gríðarlega spennandi og kaflaskiptan leik tókst okkar mönnum að brjóta ísinn á lokamínútunum. Stúkan ætlaði um koll að keyra þegar flautað var til leiksloka.
        </p>
      </header>

      {/* 2. Cinematic Hero Image */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
        <div className="w-full aspect-video md:aspect-[21/9] bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative group">
          {/* Placeholder Image - You can swap this with a real action shot later */}
          <img 
            src="https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=2069&auto=format&fit=crop" 
            alt="Handbolta leikur" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Image Credit */}
          <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-md text-white/80 text-[10px] px-2 py-1 rounded uppercase tracking-wider font-bold">
            Mynd: Ljósmyndari Hauka
          </div>
        </div>
      </div>

      {/* 3. The Article Body */}
      <article className="max-w-3xl mx-auto px-4 md:px-6 prose prose-lg md:prose-xl prose-headings:font-black prose-headings:italic prose-headings:text-[#1c2c6c] prose-headings:uppercase prose-headings:tracking-tighter prose-a:text-[#c8102e] prose-p:text-gray-700 prose-p:leading-relaxed">
        
        <p className="first-letter:text-7xl first-letter:font-black first-letter:text-[#c8102e] first-letter:mr-3 first-letter:float-left first-letter:italic">
          Það var rafmögnuð stemning á Ásvöllum í gærkvöldi þegar Haukar tóku á móti sínum helstu keppinautum í oddaleik um sæti í úrslitaeinvíginu. Fyrirfram var búist við hörkuleik og liðin stóðu sannarlega undir þeim væntingum.
        </p>

        <p>
          Leikurinn fór rólega af stað þar sem bæði lið spiluðu sterkan varnarleik. Markverðir beggja liða voru í ham og vörðu hvert dauðafærið á fætur öðru. Í hálfleik var staðan jöfn, 12-12, og ljóst að seinni hálfleikur yrði æsispennandi.
        </p>

        <h2>Þröskuldurinn brotinn</h2>
        
        <p>
          Í byrjun síðari hálfleiks komu Haukar mun ákveðnari til leiks. Vörnin small saman og hraðaupphlaupin fóru að rúlla. Þegar um 10 mínútur voru eftir af leiknum náðu okkar menn þriggja marka forskoti, 22-19. 
        </p>

        {/* Premium Pull Quote */}
        <blockquote className="my-10 border-l-4 border-[#c8102e] pl-6 py-2 bg-gray-50/50 rounded-r-2xl italic">
          <p className="text-2xl md:text-3xl font-bold text-[#1c2c6c] leading-tight mb-4">
            „Stúkan var okkar áttundi maður í dag. Þegar lætin byrjuðu í trommunum, þá fann maður hvernig öll þreita hvarf úr löppunum.“
          </p>
          <footer className="text-sm font-bold text-[#c8102e] uppercase tracking-widest not-italic">
            — Fyrirliði Hauka eftir leik
          </footer>
        </blockquote>

        <p>
          Gestirnir reyndu hvað þeir gátu til að minnka muninn, en vörn Hauka hélt vatni og vindum. Á lokamínútunum var sigurinn aldrei í hættu og lokatölur urðu 28-24. 
        </p>

        <h2>Framundan</h2>

        <p>
          Með þessum sigri hafa Haukar tryggt sér sæti í úrslitaeinvíginu um Íslandsmeistaratitilinn. Fyrsti leikurinn fer fram á heimavelli okkar á Ásvöllum næsta sunnudag kl. 19:30. Við hvetjum alla Hauka til að mæta í rauðu, fylla stúkuna og styðja strákana til sigurs!
        </p>

      </article>

      {/* 4. Social Share & Footer CTA */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 mt-16 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Deila grein:</span>
          <button className="w-10 h-10 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-[#c8102e] hover:text-white transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">share</span>
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-[#c8102e] hover:text-white transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">link</span>
          </button>
        </div>

        <Link to="/" className="text-sm font-bold text-[#1c2c6c] border-b-2 border-transparent hover:border-[#c8102e] uppercase tracking-wider transition-colors pb-1">
          Aftur á forsíðu
        </Link>

      </div>
    </main>
  );
}