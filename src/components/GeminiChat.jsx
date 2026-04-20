import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function GeminiChat() {
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

  // Initialize the Gemini Engine using your local secret key
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

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

      // 2. The Upgraded System Prompt
      const systemPrompt = `Þú ert 'Haukur í horni', sýndar-aðstoðarþjálfari fyrir Knattspyrnufélagið Hauka á Íslandi. 
      Þú ert hjálpsamur, kurteis, og talar frábæra íslensku. 
      
      MIKILVÆGAR STAÐREYNDIR TIL AÐ MUNA:
      - Núverandi ár er ${currentYear}. Knattspyrnufélagið Haukar er nákvæmlega ${clubAge} ára gamalt.
      
      NÝJUSTU FRÉTTIR (Notaðu þetta ef spurt er um nýlega atburði):
      - Í gærkvöldi vann meistaraflokkur karla í handbolta glæsilegan sigur á Val, 24-21 á Ásvöllum. 
      - Þráinn Orri Jónsson var markahæstur með 8 mörk.
      - Næsti leikur er gegn FH á fimmtudaginn.`;
      
      // 3. Call the API
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${systemPrompt}\n\nNotandi: ${userText}`,
      });

      const botReply = response.text;
      
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
        className={`bg-white w-[calc(100vw-3rem)] sm:w-[350px] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-bottom-right mb-4 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none absolute'
        }`}
      >
        {/* FIXED: Swapped to Haukar Red, updated Typography to match site branding */}
        <div className="bg-[#c8102e] text-white p-4 flex items-center justify-between shadow-md relative z-10">
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

        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex gap-2">
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
        // FIXED: Toggle button matched to brand color
        className="w-14 h-14 bg-[#c8102e] text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 hover:bg-red-800 transition-all focus:outline-none"
      >
        <span className="material-symbols-outlined text-2xl">
          {isOpen ? 'close' : 'chat_bubble'}
        </span>
      </button>

    </div>
  );
}