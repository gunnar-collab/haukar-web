import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { useLocation } from 'react-router-dom';

export default function GeminiChat({ onOpenTickets }) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'gemini', 
      text: 'Sæll og blessaður! Ég er Haukur í horni. Netþjónninn er tengdur og ég er tilbúinn að spjalla!' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize the Gemini Engine only if the key is available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      // 1. Math variables MUST be defined here before the prompt uses them!
      const currentYear = new Date().getFullYear();
      const foundationYear = 1931;
      const clubAge = currentYear - foundationYear;

      // 2. The Upgraded System Prompt with Page Context & Action Triggers
      const systemPrompt = `Þú ert 'Haukur í horni', brjálaður ofuraðdáandi og goðsögn hjá Knattspyrnufélaginu Haukum á Íslandi. 
      Þú elskar klúbbinn út af lífinu. Þú ert alltaf klár í slaginn, talar af mikilli ástríðu, notar orðatiltæki eins og "Áfram Haukar!" og "Rauða maskínan!", og neitar að viðurkenna að FH sé til.
      
      MIKILVÆG REGLA UM LENGD: HALTU SVÖRUM ÞÍNUM MJÖG STUTTUM OG HNITMIÐUÐUM! Ekki skrifa langar ritgerðir. Svaraðu í mesta lagi 2-3 stuttum setningum í einu. Vertu snöggur og beittur.
      
      MIKILVÆGAR STAÐREYNDIR:
      - Núverandi ár er ${currentYear}. Haukar eru ${clubAge} ára gamlir.
      - Nýjustu fréttir: Haukar unnu Val 24-21. Þráinn Orri var frábær. Næsti leikur er á móti FH.
      - Æfingatafla: 5. flokkur karla og kvenna í handbolta æfa á mánudögum kl. 16:00, miðvikudögum kl. 17:00 og föstudögum kl. 15:30 á Ásvöllum.

      NOTANDINN ER NÚNA Á ÞESSARI SÍÐU: "${location.pathname}"
      - Ef hann er á /fotbolti, minnstu á fótboltann. Ef hann er á /korfubolti, talaðu um körfuna og hrósaðu liðinu. Tengdu alltaf við síðuna ef það á við!

      ***TÖFRAVIRKNI (ACTION TRIGGERS)***
      Ef notandinn spyr eitthvað tengt því að kaupa miða, fara á leik, eða vill miða, ÞÁ SKALTU SETJA ÞENNAN KÓÐA NÁKVÆMLEGA SVONA INN Í SVARIÐ ÞITT: [ACTION_OPEN_TICKETS]
      (Ég mun grípa þennan kóða og opna miðasöluna sjálfkrafa fyrir notandann).`;
      
      // 3. Call the API
      if (!ai) {
        throw new Error('API Key is missing');
      }

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\nNotandi: ${userText}`,
      });

      let botReply = response.text;
      
      // 4. Parse the Action Trigger
      if (botReply.includes('[ACTION_OPEN_TICKETS]')) {
        // Remove the invisible token
        botReply = botReply.replace('[ACTION_OPEN_TICKETS]', '').trim();
        // Trigger the UI action
        if (onOpenTickets) {
          setTimeout(() => onOpenTickets(), 800); // Slight delay for dramatic effect
        }
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

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <div 
        className={`bg-white w-[calc(100vw-3rem)] sm:w-[350px] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute'
        }`}
      >
        {/* FIXED: Swapped to Haukar Red, updated Typography to match site branding */}
        <div className="bg-[#c8102e] text-white p-4 flex items-center justify-between shadow-md relative z-10 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-yellow-400">smart_toy</span>
            <span className="text-xl font-black italic tracking-tighter uppercase">Haukur í horni</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:text-black/30 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* FIXED: Swapped bg-surface for a clean bg-gray-50 */}
        <div className="h-80 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm font-body whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#c8102e] text-white rounded-br-none' 
                    : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center h-[46px]">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Pills */}
        <div className="px-3 pb-2 pt-3 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
          <button 
            type="button"
            onClick={() => setInput("Hvernig kaupi ég miða?")}
            className="whitespace-nowrap px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            🎫 Kaupa miða
          </button>
          <button 
            type="button"
            onClick={() => setInput("Hvenær er næsti leikur í Körfu?")}
            className="whitespace-nowrap px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            🏀 Næsti körfuboltaleikur
          </button>
          <button 
            type="button"
            onClick={() => setInput("Hvenær eru æfingar hjá 5. flokki í handbolta?")}
            className="whitespace-nowrap px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            📅 Æfingatafla 5. flokks
          </button>
          <button 
            type="button"
            onClick={() => setInput("Hverjir urðu Bikarmeistarar 2026?")}
            className="whitespace-nowrap px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full text-xs font-bold text-gray-600 hover:bg-[#c8102e] hover:border-[#c8102e] hover:text-white transition-colors"
          >
            🏆 Bikarmeistarar
          </button>
        </div>

        <form onSubmit={handleSend} className="p-3 bg-white flex gap-2 pt-2">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Spyrðu Hauk..." 
            // FIXED: Focus ring matched to brand color
            className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#c8102e]/50 transition-all font-body"
          />
          <button 
            type="submit" 
            // FIXED: Red button matched to brand color
            className="w-9 h-9 rounded-full bg-[#c8102e] text-white flex items-center justify-center hover:bg-red-800 transition-colors shrink-0 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </form>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-[#c8102e] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 hover:bg-red-800 transition-all duration-300 focus:outline-none ${
          isOpen ? 'scale-0 opacity-0 absolute pointer-events-none' : 'scale-100 opacity-100'
        }`}
      >
        <span className="material-symbols-outlined text-2xl">
          chat_bubble
        </span>
      </button>

    </div>
  );
}