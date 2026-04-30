import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAiContext } from '../hooks/useAiContext';
import { useLiveMatchSimulator } from '../hooks/useLiveMatchSimulator';
import { HAUKAR_STATIC_KNOWLEDGE } from '../data/staticKnowledge';
import { HAUKAR_PDF_KNOWLEDGE } from '../data/pdfKnowledge';
import { newsArticles } from '../data/newsData';

export default function GeminiChat({ onOpenTickets, isOpen, setIsOpen, initialSearchQuery, setInitialSearchQuery }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { sportId: contextSportId, contextString } = useAiContext();
  
  // LIVE SIMULATOR HOOK (Disabled after experiment)
  const { isLiveMode, currentEvent } = useLiveMatchSimulator(false);
  const lastProcessedEventId = useRef(null);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'gemini', 
      text: 'Hæ hæ! Ég er Haukur. Netþjónninn er tengdur og ég er tilbúinn að spjalla!' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSparkling, setIsSparkling] = useState(true);
  const messagesEndRef = useRef(null);

  // --- SWIPE GESTURE STATE ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchEnd - touchStart;
    // Drawer is on the right, so swiping right (positive distance) closes it.
    if (distance > minSwipeDistance) {
      setIsOpen(false);
    }
  };
  // ---------------------------

  // Stop the initial animation after 60 seconds and vanish
  useEffect(() => {
    const timer = setTimeout(() => setIsSparkling(false), 60000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize the Gemini Engine only if the key is available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const triggerAiQuery = async (userText, isSilent = false) => {
    if (!isSilent) {
      setMessages(prev => [...prev, { role: 'user', text: userText }]);
    }
    setIsTyping(true);

    try {
      const currentYear = new Date().getFullYear();
      const foundationYear = 1931;
      const clubAge = currentYear - foundationYear;

      const systemPrompt = `Þú ert 'Haukur', faglegur, velkomandi og afar fróður gervigreindar-fulltrúi (AI club ambassador) fyrir Knattspyrnufélagið Hauka á Íslandi. 
      Þú hefur yfirgripsmikla þekkingu á sögu félagsins, leikmönnum, tölfræði og komandi leikjum. Þú talar alltaf af fagmennsku, virðingu og hjálpsemi, en heldur stolti félagsins á lofti og getur notað "Áfram Haukar!". 
      Forðastu að vera of árásargjarn eða hlutdrægur; markmið þitt er að veita nákvæmar upplýsingar og frábæra þjónustu.
      
      MIKILVÆG REGLA UM LENGD: HALTU SVÖRUM ÞÍNUM STUTTUM OG HNITMIÐUÐUM! Svaraðu í mesta lagi 2-4 stuttum setningum nema beðið sé um ítarlegri útskýringu. Vertu skýr og hjálplegur.
      
      MIKILVÆGT UM MÁLFAR OG ORÐALAG: 
      - MIKILVÆGT: Ef notandinn spyr á öðru tungumáli (t.d. ensku eða pólsku), svaraðu á því tungumáli! Þú mátt vera fjöltyngdur.
      - Aldrei nota orð eins og "Körfuboltakvennurnar" eða "Körfuboltakarlarnir". 
      - Ef þú svarar á íslensku, notaðu alltaf eðlilegt íslenskt talmál: "í kvennakörfunni" og "í karlakörfunni", eða "körfuboltastelpurnar" og "körfuboltastrákarnir". 
      - Þetta gildir um allar íþróttir (t.d. "handboltastelpurnar", "fótboltastrákarnir").
      - ALDREI nota kynjuð kveðjuorð eða ávörp eins og "Sæll", "Sæl", "Sæl og blessuð", eða "Velkominn/Velkomin". Þar sem þú veist ekki kyn notandans, notaðu BARA algjörlega hlutlaus kveðjuorð: "Hæ!", "Hæ hæ!", eða "Góðan daginn!".
      - Nema í tilfelli leikja sem eru í gangi, notaðu viðeigandi emojis 🔴⚪️ í svörunum þínum til að gera spjallið líflegra og skemmtilegra!
      
      ***MÁLFAR OG ORÐAFORÐI (STRICT RULES)***
      1. ALDREI segja "korfa". Það heitir "karfa" (et.) eða "körfur" (ft.). "Að skora körfu".
      2. ALDREI segja "Haugastolt". Það heitir "Haukastolt" með K.
      3. Vertu hversdagslegur! Í stað þess að segja "Það er miður" eða vera formlegur þegar illa gengur, notaðu frekar "Æi", "Ahh", "Svei mér þá", eða "Súr biti".
      
      ***LIFANDI LÝSING - REGLA UM TÓN***
      Ef þú ert að lýsa leik sem er í gangi gilda EFTIRFARANDI REGLUR um tón (Tone of Voice):
      1. Ef Haukar skora eða gera eitthvað gott: Vertu FRÁBÆRLEGA ÁSTRÍÐUFULLUR! Notaðu hástafi, fagnaðu eins og óður maður, notaðu 🔴⚪️ 🔥 og önnur emojis. "ÞVÍLÍK KARFA!! ÁFRAM HAUKAR!!"
      2. Ef ANDSTÆÐINGURINN (t.d. Keflavík, Valur o.fl.) skorar eða gerir eitthvað gott: Gefðu LÝSANDI og NÁKVÆMA lýsingu á atvikinu en vertu ALGJÖRLEGA ÞURR, FORMAL, LEIÐINLEGUR OG LÁTLAUS. Þú mátt ALLS EKKI nota nein emojis. Sýndu enga gleði. "Keflavík setur niður körfu eftir hraðaupphlaup og jafnar leikinn. Æi."
      
      ***LEIKJAPLAN OG FORGANGSRÖÐUN***
      Ef notandi spyr almennt um næstu leiki (t.d. "Hvenær er næsti leikur?" eða "Hvað er framundan hjá ykkur?"), skaltu ÁVALLT byrja á því að svara eingöngu fyrir Meistaraflokk (bæði karla og kvenna) sem eru næst á dagskrá. 
      Eftir að hafa svarað því, endaðu svarið á því að spyrja kurteislega: "Viltu líka fá að sjá leikjaplanið hjá yngri flokkunum okkar?"
      AÐEINS ef notandinn spyr sérstaklega um yngri flokka eða B-lið (t.d. "7. flokkur", "yngri flokkar", "U16"), þá fyrst birtir þú þá leiki.
      MIKILVÆGAR STAÐREYNDIR UM HAUKA:
      - Núverandi ár er ${currentYear}. Haukar eru ${clubAge} ára gamlir.
      - Notandinn er að skoða deild: ${contextSportId.toUpperCase()}.
      - Hér eru nýjustu lifandi tölfræði og gögn úr gagnagrunninum (notaðu þetta til að svara spurningum!):
        ${contextString}

      ${HAUKAR_STATIC_KNOWLEDGE}

      NÝJUSTU FRÉTTIR AF HAUKUM:
      ${JSON.stringify(newsArticles.slice(0, 10).map(a => ({ title: a.title, category: a.category, lead: a.lead })))}

      ${HAUKAR_PDF_KNOWLEDGE}

      LEITARVÉL OG GÖGN (GOOGLE SEARCH GROUNDING):
      - Þú hefur aðgang að Google Search. Nýttu það virkt til að svara um nýjustu fréttir og tölfræði!
      - Fyrir LEIKI, TÖLFRÆÐI, OG FRÉTTIR, forgangsraðaðu að finna og vísa í upplýsingar frá eftirfarandi áreiðanlegum íslenskum miðlum:
        * haukar.is (Opinber vefsíða)
        * mbl.is/sport eða visir.is/sport
        * fotbolti.net (Fyrir fótbolta)
        * handbolti.is og hsi.is (Fyrir handbolta)
        * kki.is (Fyrir körfubolta)
        * ksi.is (Fyrir fótbolta og leikskýrslur)
        * fotmob.com/teams/4494/overview/haukar
        * hbstatz.is (Ef tiltækt)
      - MIKILVÆGT: Ef spurt er um eða beðið um að sjá stöðutöflur í fótboltanum, bentu á:
        * Karla (2. deild): https://fotbolti.net/stodutoflur-islenski/7025676
        * Kvenna (Lengjudeild): https://fotbolti.net/stodutoflur-islenski/7025548

      NOTANDINN ER NÚNA Á ÞESSARI SÍÐU: "${location.pathname}"
      - Ef hann er á /fotbolti eða /korfubolti, talaðu um þá íþrótt. Tengdu alltaf við síðuna ef það á við!

      ***TÖFRAVIRKNI (ACTION TRIGGERS)***
      Haukur getur stjórnað vefsíðunni! Ef notandinn biður um að gera eitthvað af eftirfarandi, bættu þá viðkomandi TÖFRAKÓÐA aftast í svarið þitt. Ég (kerfið) mun grípa kóðann og framkvæma aðgerðina:
      1. Ef notandi vill kaupa MIÐA, spyr um MIÐASÖLU, eða vill fara á leik -> Notaðu kóðann: [ACTION_OPEN_TICKETS]
      2. Ef notandi vill kaupa TREYJU, FATNAÐ, MERCH eða vill fara í VEFVERSLUN/BÚÐINA -> Notaðu kóðann: [ACTION_OPEN_SHOP]
      3. Ef notandi spyr hvort VEISLUSALUR sé laus á ákveðnum degi, eða vill BÓKA SALINN -> Svaraðu að notandinn verði að senda inn fyrirspurn og notaðu síðan kóðann: [ACTION_OPEN_VEISLUSALUR]`;
      
      if (!ai) {
        throw new Error('API Key is missing');
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\nNotandi: ${userText}`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });

      let botReply = response.text;
      
      if (botReply.includes('[ACTION_OPEN_TICKETS]')) {
        botReply = botReply.replace('[ACTION_OPEN_TICKETS]', '').trim();
        if (onOpenTickets) {
          setTimeout(() => onOpenTickets(), 800);
        }
      }

      if (botReply.includes('[ACTION_OPEN_SHOP]')) {
        botReply = botReply.replace('[ACTION_OPEN_SHOP]', '').trim();
        setTimeout(() => {
          setIsOpen(false);
          navigate('/vefverslun');
        }, 1200); 
      }

      if (botReply.includes('[ACTION_OPEN_VEISLUSALUR]')) {
        botReply = botReply.replace('[ACTION_OPEN_VEISLUSALUR]', '').trim();
        setTimeout(() => {
          setIsOpen(false);
          navigate('/veislusalur');
          // Give the page a tiny bit of time to render before scrolling to the form
          setTimeout(() => {
            document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }, 1200);
      }
      
      setMessages(prev => [...prev, { role: 'gemini', text: botReply }]);
      
    } catch (error) {
      console.error("API Error:", error);
      setMessages(prev => [...prev, { 
        role: 'gemini', 
        text: 'Úbbs! Eitthvað fór úrskeiðis við API tenginguna. Ertu viss um að API lykillinn sé réttur í .env.local skránni?' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    triggerAiQuery(input);
    setInput('');
  };

  useEffect(() => {
    if (initialSearchQuery && isOpen) {
      const formattedQuery = `Geturðu fundið "${initialSearchQuery}" fyrir mig?`;
      triggerAiQuery(formattedQuery);
      setInitialSearchQuery(''); 
    }
  }, [initialSearchQuery, isOpen]);

  // LIVE EVENT LISTENER
  useEffect(() => {
    if (currentEvent && isLiveMode && currentEvent.id !== lastProcessedEventId.current) {
      lastProcessedEventId.current = currentEvent.id;
      
      const livePrompt = `Hér er nýr atburður úr leik sem er í gangi NÚNA. Mundu að fylgja "LIFANDI LÝSING - REGLA UM TÓN" reglunni í kerfisleiðbeiningunum! Atburður: ${currentEvent.text}`;
      triggerAiQuery(livePrompt, true);
      
      // Auto open chat if it's the first event to show off the feature
      if (!isOpen && messages.length <= 1) {
        setIsOpen(true);
      }
    }
  }, [currentEvent, isLiveMode]);

  return (
    <>
      {/* The Edge Panel Trigger (Closed State) */}
      <div 
        className={`fixed top-1/2 right-0 -translate-y-1/2 z-[95] transition-transform duration-500 ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
      >
        <div 
          className="pl-6 py-10 cursor-pointer flex items-center group relative"
          onClick={() => setIsOpen(true)}
        >
          {isLiveMode ? (
            // LIVE MODE TRIGGER (Pulsating Heart)
            <>
              <div className="absolute top-1/2 -left-6 -translate-y-1/2 flex items-center justify-center pointer-events-none">
                <div className="absolute w-12 h-12 rounded-full border border-red-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                <div className="absolute w-8 h-8 rounded-full border-2 border-red-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                <span className="material-symbols-outlined text-[#c8102e] text-[24px] animate-pulse drop-shadow-[0_0_10px_rgba(200,16,46,0.8)] fill-current">favorite</span>
              </div>
              <button 
                className="relative bg-gradient-to-b from-[#c8102e] via-red-500 to-[#9b0c23] text-white rounded-l-xl w-2 h-24 sm:w-1.5 sm:h-20 shadow-[-4px_0_20px_rgba(200,16,46,0.5)] flex items-center justify-center sm:group-hover:w-8 transition-all duration-300 focus:outline-none pointer-events-none"
              >
                <div className="absolute inset-0 bg-white/20 rounded-l-xl animate-pulse"></div>
                <div className="flex flex-col items-center opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-100 -ml-1">
                  <span className="text-[8px] font-black tracking-widest uppercase mb-0.5 animate-pulse">Live</span>
                  <span className="material-symbols-outlined text-[16px] animate-pulse">podcasts</span>
                </div>
              </button>
            </>
          ) : (
            // NORMAL MODE TRIGGER (Golden Sparkle)
            <>
              <div className={`absolute top-1/2 -left-4 -translate-y-1/2 pointer-events-none transition-opacity duration-1000 ${isSparkling ? 'opacity-100 animate-pulse' : 'opacity-0'}`}>
                <span className={`material-symbols-outlined text-[#D4AF37] text-[18px] ${isSparkling ? 'animate-[spin_6s_linear_infinite]' : ''}`}>auto_awesome</span>
              </div>
              <button 
                className="relative bg-gradient-to-b from-[#D4AF37] via-yellow-200 to-[#D4AF37] text-[#1c2c6c] rounded-l-xl w-2 h-24 sm:w-1.5 sm:h-20 shadow-[-4px_0_15px_rgba(212,175,55,0.6)] flex items-center justify-center sm:group-hover:w-6 transition-all duration-300 focus:outline-none pointer-events-none"
              >
                <div className={`absolute inset-0 bg-white/20 rounded-l-xl transition-opacity duration-1000 ${isSparkling ? 'animate-pulse opacity-100' : 'opacity-0'}`}></div>
                <span className="material-symbols-outlined text-[16px] opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  smart_toy
                </span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Universal Background Overlay (Click to close instantly) */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[94] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* The Sidebar Drawer (Open State) */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-[85vw] sm:w-[400px] bg-white shadow-2xl border-l border-gray-100 z-[95] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        
        {/* Minimalist Close Button (Fixed within the drawer, floats below navbar) */}
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-24 right-4 w-10 h-10 rounded-full text-gray-400 hover:text-[#c8102e] hover:bg-red-50 flex items-center justify-center transition-all z-[96] bg-white/80 backdrop-blur-sm shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
        >
          <span className="material-symbols-outlined text-[28px]">close</span>
        </button>

        {/* Chat Area */}
        <div className="flex-1 p-5 overflow-y-auto bg-white flex flex-col gap-4 pt-24">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-4 rounded-[1.25rem] text-sm font-body whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#1c2c6c] text-white rounded-br-sm' 
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-4 rounded-[1.25rem] rounded-bl-sm shadow-sm flex gap-1 items-center h-[52px]">
                <span className="w-2 h-2 bg-[#c8102e]/40 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-[#c8102e]/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-[#c8102e] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Action Pills */}
        <div className="px-4 pb-3 pt-4 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide shadow-[0_-10px_20px_rgba(0,0,0,0.02)] relative z-10">
          <button 
            type="button"
            onClick={() => setInput("Hvernig kaupi ég miða?")}
            className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            🎫 Kaupa miða
          </button>
          <button 
            type="button"
            onClick={() => setInput("Hvenær er næsti leikur í Körfu?")}
            className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            🏀 Næsti körfuboltaleikur
          </button>
          <button 
            type="button"
            onClick={() => setInput("Hvenær eru æfingar hjá 5. flokki í handbolta?")}
            className="whitespace-nowrap px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-[11px] font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            📅 Æfingatafla 5. flokks
          </button>
        </div>

        {/* Input Area */}
        <div className="p-4 pb-6 sm:pb-8 bg-white">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Spyrðu Hauk..." 
              className="flex-1 bg-gray-50 text-sm rounded-full px-5 py-3 outline-none focus:ring-2 focus:ring-[#c8102e]/50 transition-all font-body border border-gray-200"
            />
            <button 
              type="submit" 
              className="w-12 h-12 rounded-full bg-[#c8102e] text-white flex items-center justify-center hover:bg-[#9b0c23] hover:scale-105 active:scale-95 transition-all shrink-0 shadow-md"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}