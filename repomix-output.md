This file is a merged representation of the entire codebase, combined into a single document by Repomix.

<file_summary>
This section contains a summary of this file.

<purpose>
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.
</purpose>

<file_format>
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  - File path as an attribute
  - Full contents of the file
</file_format>

<usage_guidelines>
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.
</usage_guidelines>

<notes>
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)
</notes>

</file_summary>

<directory_structure>
public/
  images/
    basketball-news.jpg
    football-news.jpg
    goalkeeper.jpg
    goalkeeper.png
    leikmadur-vikunnar.jpg
    logo.png
  favicon.svg
  icons.svg
src/
  assets/
    hero-banner.mp4
    hero.png
    react.svg
    vite.svg
  components/
    AlertToast.jsx
    Button.jsx
    DivisionTicker.jsx
    Footer.jsx
    GeminiChat.jsx
    Hero.jsx
    HeroBanner.jsx
    LiveTicker.jsx
    Navbar.jsx
    NewsGrid.jsx
    PlayerSpotlight.jsx
    Sponsors.jsx
    TicketModal.jsx
    TrophyCabinet.jsx
    Veggurinn.jsx
  pages/
    Home.jsx
    Leikvakt.jsx
    Vefverslun.jsx
  App.jsx
  index.css
  main.jsx
.gitignore
eslint.config.js
index.html
package.json
postcss.config.js
README.md
tailwind.config.js
vite.config.js
</directory_structure>

<files>
This section contains the contents of the repository's files.

<file path="src/components/AlertToast.jsx">
import { useState, useEffect } from 'react';

export default function AlertToast() {
  const [isVisible, setIsVisible] = useState(true);

  // This acts as our timer. It waits 6 seconds, then hides the banner.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] transition-transform duration-700 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-[150%]'
      }`}
    >
      {/* FIXED: Replaced bg-surface-alt with bg-white and updated the border to our exact Haukar Red */}
      <div className="bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-2xl border-l-4 border-l-[#c8102e] flex items-center gap-4 max-w-sm">
        
        <div className="bg-red-50 p-2 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-[#c8102e] text-sm">campaign</span>
        </div>
        
        <div className="flex-1">
          {/* FIXED: Removed old font-label class, kept our standard tracking and uppercase */}
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Tilkynning</p>
          {/* FIXED: Removed font-headline class, set text to our standard dark blue */}
          <p className="font-bold text-sm text-[#1c2c6c] leading-tight">
            Tryggjum öryggi allra á Ásvöllum.
          </p>
        </div>

        <button 
          onClick={() => setIsVisible(false)} 
          className="text-gray-400 hover:text-[#c8102e] transition-colors flex items-center justify-center"
        >
          <span className="material-symbols-outlined text-lg">close</span>
        </button>

      </div>
    </div>
  );
}
</file>

<file path="src/components/Button.jsx">
export default function Button({
  children,
  variant = 'primary', // Options: 'primary', 'secondary', 'outline', 'overlay'
  size = 'md',         // Options: 'sm', 'md', 'lg'
  icon,                // Name of the Material Symbol (e.g., 'arrow_forward')
  iconPosition = 'left', // Options: 'left', 'right'
  uppercase = false,   // Force uppercase text
  className = '',      // Any extra Tailwind classes to append
  ...props             // Captures onClick, type, disabled, etc.
}) {
  
  // Base styles that EVERY button gets
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md gap-2 outline-none focus:ring-2 focus:ring-offset-2";
  
  // The exact color schemes from our design system
  const variants = {
    primary: "bg-[#c8102e] text-white hover:bg-red-800 focus:ring-[#c8102e]",
    secondary: "bg-[#1c2c6c] text-white hover:bg-blue-900 focus:ring-[#1c2c6c]",
    outline: "bg-white border-2 border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white focus:ring-[#c8102e]",
    overlay: "bg-black/50 text-white hover:bg-black/70 border border-white/20 backdrop-blur-sm focus:ring-white/50" 
  };

  // Standardized paddings and text sizes
  const sizes = {
    sm: "px-6 py-2.5 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  };

  // Text transform logic
  const textStyle = uppercase ? "uppercase tracking-widest text-[0.9em]" : "tracking-normal";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${textStyle} ${className}`}
      {...props}
    >
      {/* Optional Leading Icon */}
      {icon && iconPosition === 'left' && (
        <span className="material-symbols-outlined text-[1.2em]">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {/* Optional Trailing Icon */}
      {icon && iconPosition === 'right' && (
        <span className="material-symbols-outlined text-[1.2em]">{icon}</span>
      )}
    </button>
  );
}
</file>

<file path="src/components/DivisionTicker.jsx">
export default function DivisionTicker({ isOpen }) {
  return (
    <div 
      className={`bg-asvellir-blue text-white shadow-inner w-full relative z-40 transition-all duration-500 ease-in-out overflow-hidden ${
        isOpen ? 'max-h-16 py-2 opacity-100 border-b border-blue-900' : 'max-h-0 py-0 opacity-0 border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto flex items-center gap-10 md:justify-center text-[10px] md:text-xs font-label uppercase tracking-widest whitespace-nowrap opacity-80">
        
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>Handbolti: Haukar 28 - 24 FH</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>Körfubolti: Haukar 85 - 82 Stjarnan</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
          <span>Fótbolti: Þróttur R. 0 - 1 Haukar</span>
        </div>

      </div>
    </div>
  );
}
</file>

<file path="src/components/GeminiChat.jsx">
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
        className={`bg-white w-[350px] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-bottom-right mb-4 ${
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
</file>

<file path="src/components/HeroBanner.jsx">
import heroVideo from '../assets/hero-banner.mp4';
import Button from "./Button.jsx"; // <-- Our new global component!

export default function HeroBanner() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden bg-black">
      
      {/* 1. The Looping Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. The Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

      {/* 3. The Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 z-10">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Cleaned up rogue fonts, used standard Haukar Red */}
            <span className="inline-block bg-[#c8102e] text-white font-bold uppercase tracking-widest text-xs px-3 py-1 rounded-full mb-4 shadow-lg">
              Velkomin á Ásvelli
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white leading-none drop-shadow-xl mb-6 max-w-4xl pr-4">
              HJARTAÐ SLÆR <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8102e] to-red-400 pr-3">
                Í HAFNARFIRÐI
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mb-8 drop-shadow-md">
              Eitt stærsta og sigursælasta íþróttafélag landsins. Við byggjum á stolti, liðsheild og óbilandi baráttuanda.
            </p>

            {/* Action Buttons - REFACTORED WITH GLOBAL COMPONENT */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              <Button 
                variant="primary" 
                icon="arrow_downward" 
                iconPosition="right"
                onClick={() => window.location.href = '#news'}
              >
                Nýjustu fréttir
              </Button>

              <Button 
                variant="overlay" 
                icon="live_tv" 
                iconPosition="right"
                onClick={() => window.location.href = '/leikvakt'}
              >
                Fara á Leikjavaktina
              </Button>

            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}
</file>

<file path="src/components/LiveTicker.jsx">
import { Link, useLocation } from 'react-router-dom';

export default function LiveTicker({ toggleDrawer, isOpen }) {
  // 1. We ask the engine: "Where are we right now?"
  const location = useLocation();
  
  // 2. We build the logic: If we are on '/leikvakt', the link goes to '/' (Home). Otherwise, go to '/leikvakt'.
  const targetPath = location.pathname === '/leikvakt' ? '/' : '/leikvakt';

  return (
    <div className="bg-haukar-red text-white py-2 px-4 flex justify-center items-center shadow-md relative z-50 min-h-[48px]">
      
      <div className="flex items-center gap-4 md:gap-6">
        
        {/* We pass our smart targetPath into the Link */}
        <Link to={targetPath} className="flex items-center gap-3 md:gap-6 hover:opacity-80 transition-opacity cursor-pointer group">
          
          <div className="flex items-center gap-2 font-black tracking-widest uppercase text-xs md:text-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white shadow-sm"></span>
            </span>
            Í BEINNI
          </div>

          <div className="font-headline font-black tracking-wide flex items-center gap-2 md:gap-4 text-sm md:text-lg">
            <span className="hidden sm:inline">HAUKAR</span>
            <span className="sm:hidden">HAU</span>
            <span className="bg-white text-haukar-red px-3 py-1 rounded shadow-inner text-base md:text-xl group-hover:scale-105 transition-transform">
              24 - 21
            </span>
            <span className="hidden sm:inline opacity-90">VALUR</span>
            <span className="sm:hidden opacity-90">VAL</span>
          </div>

          <div className="font-body font-medium hidden md:block opacity-90 text-sm">
            (45:12)
          </div>
        </Link>
        
        <button 
          onClick={toggleDrawer}
          className="flex items-center gap-1 font-bold hover:text-anniversary-gold transition-colors group cursor-pointer border-l border-white/30 pl-4 md:pl-6"
        >
          <span className="hidden md:inline text-xs uppercase tracking-wider">Síðustu Leikir</span>
          <span className={`material-symbols-outlined text-base transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            expand_more
          </span>
        </button>

      </div>
    </div>
  );
}
</file>

<file path="src/components/PlayerSpotlight.jsx">
import Button from './Button.jsx';

export default function PlayerOfTheWeek() {
  return (
    <section className="w-full bg-white py-24 border-b border-gray-100 relative overflow-hidden">
      
      {/* Subtle Background Angle for Agency-Grade Depth */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fafafa] skew-x-12 transform origin-top-right -z-0 hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Column: The Portrait */}
          <div className="w-full md:w-1/2 lg:w-5/12">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#1c2c6c]/20 group">
              {/* Premium Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] to-transparent opacity-60 z-10"></div>
              
              {/* Your New AI Generated Image */}
              <img 
                src="/images/leikmadur-vikunnar.jpg" 
                alt="Leikmaður vikunnar" 
                className="w-full h-auto aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2 inline-block shadow-sm">
                  Vika 14
                </span>
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase leading-none drop-shadow-md">
                  Leikmaður<br/>Vikunnar
                </h3>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Stats */}
          <div className="w-full md:w-1/2 lg:w-7/12">
            <div className="mb-8">
              <span className="text-[#c8102e] text-sm font-bold uppercase tracking-widest flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                Stjarnan í dagsins ljósi
              </span>
              <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-none mb-5">
                Ólafur <br className="hidden lg:block"/>
                <span className="text-[#c8102e]">Gústafsson</span>
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm border-l-2 border-[#c8102e] pl-3">
                Vinstri Skytta • Olís Deild Karla
              </p>
            </div>

            <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8 max-w-xl">
              Ólafur átti algjöran stórleik í sigrinum gegn Fram á fimmtudaginn. Með 9 mörk úr 11 skotum og stálheila vörn dró hann vagninn þegar mest á reyndi. Hann er sannkallaður Haukur í horni fyrir liðið.
            </p>

            {/* Stat Grid */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-10 max-w-lg">
              <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mörk</p>
                <p className="text-4xl font-black italic text-[#1c2c6c]">9</p>
              </div>
              <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nýting</p>
                <p className="text-4xl font-black italic text-[#c8102e]">82%</p>
              </div>
              <div className="bg-[#fafafa] p-4 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Stoðsend.</p>
                <p className="text-4xl font-black italic text-[#1c2c6c]">4</p>
              </div>
            </div>

            {/* Fired up with the Global Button */}
            <Button variant="primary" icon="arrow_forward" iconPosition="right">
              Skoða leikmannasnið
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
</file>

<file path="src/components/Sponsors.jsx">
import Button from './Button.jsx';

export default function Sponsors() {
  const corporateSponsors = [
    { id: 1, name: "Olís", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Olis_logo.svg/512px-Olis_logo.svg.png" },
    { id: 2, name: "Bónus", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/B%C3%B3nus_logo.svg/512px-B%C3%B3nus_logo.svg.png" },
    { id: 3, name: "Eimskip", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Eimskip_logo.svg/512px-Eimskip_logo.svg.png" },
    { id: 4, name: "Landsbankinn", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Landsbankinn_logo.svg/512px-Landsbankinn_logo.svg.png" },
    { id: 5, name: "Sjóvá", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Sjova_logo.svg/512px-Sjova_logo.svg.png" },
  ];

  const haukurIHorni = [
    "Jón Jónsson", "Guðrún Jónsdóttir", "Sigurður Sigurðsson", 
    "Anna Pétursdóttir", "Kristján Kristjánsson", "María Guðmundsdóttir",
    "Fjölskyldan Ásvöllum", "Gunnar Gunnarsson", "Haukar Aðdáendaklúbbur",
    "Hafnarfjarðarbær", "Ólafur Ólafsson", "Helga Helgadóttir"
  ];

  return (
    <section className="w-full bg-white border-t border-gray-100">
      
      {/* 1. CORPORATE SPONSORS (The Grayscale Grid) */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">
            Stoltir Styrktaraðilar
          </span>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase">
            Þeir sem gera þetta mögulegt
          </h2>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 lg:gap-20">
          {corporateSponsors.map((sponsor) => (
            <div key={sponsor.id} className="group cursor-pointer">
              <img 
                src={sponsor.logo} 
                alt={sponsor.name} 
                className="h-12 md:h-16 w-auto object-contain filter grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      {/* 2. HAUKUR Í HORNI (The VIP Text Grid & CTA) - INVERTED TO CLEAN WHITE */}
      <div className="w-full bg-white py-20 relative overflow-hidden border-t border-gray-50">
        
        {/* Subtle Background Watermark Icon in Soft Grey */}
        <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 pointer-events-none z-0">
          <span className="material-symbols-outlined text-[500px] text-gray-50 rotate-12">workspace_premium</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12">
            
            {/* The Pitch */}
            <div className="max-w-xl">
              <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">
                Styðjum Starfið
              </span>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-6">
                Haukar í <span className="text-[#c8102e]">Horni</span>
              </h2>
              <p className="text-gray-600 font-medium text-lg leading-relaxed mb-8">
                Haukar í horni er bakhjarlaklúbbur Hauka. Með því að gerast Haukur í horni tryggir þú öflugt barna- og unglingastarf og styður við afreksfólk framtíðarinnar. Vertu með í liðinu!
              </p>
              
              <div className="flex gap-4">
                <Button variant="primary" icon="favorite">
                  Gerast Bakhjarl
                </Button>
                {/* Changed this button to Outline so it perfectly matches the light theme */}
                <Button variant="outline">
                  Sjá fríðindi
                </Button>
              </div>
            </div>

            {/* The Clean Name Grid - Premium Light Theme */}
            <div className="w-full lg:w-1/2 bg-white shadow-2xl shadow-gray-200/50 border border-gray-100 rounded-3xl p-8 relative overflow-hidden">
              
              {/* Premium Gradient Accent Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c8102e] to-[#1c2c6c]"></div>

              <h3 className="text-[#1c2c6c] font-black italic uppercase tracking-widest text-lg mb-6 border-b border-gray-100 pb-4">
                Nýjustu bakhjarlar
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-2">
                {haukurIHorni.map((name, index) => (
                  <div key={index} className="flex items-center gap-2 group cursor-default">
                    {/* The dot and text change color on hover! */}
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-[#c8102e] transition-colors"></span>
                    <span className="text-gray-500 text-sm font-bold group-hover:text-[#1c2c6c] transition-colors truncate">
                      {name}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center border-t border-gray-100 pt-5">
                <a href="#" className="text-gray-400 hover:text-[#c8102e] text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1">
                  Sjá alla Haukana <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
</file>

<file path="src/components/TicketModal.jsx">
import { useState } from 'react';

export default function TicketModal({ isOpen, onClose }) {
  const [ticketCount, setTicketCount] = useState(1);
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'
  const ticketPrice = 2500;

  if (!isOpen) return null;

  const handlePayment = () => {
    setStep('processing');
    // Fake the biometric payment processing delay
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const resetAndClose = () => {
    setStep('select');
    setTicketCount(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-asvellir-blue p-4 flex justify-between items-center text-white relative">
          <h2 className="font-headline font-bold text-xl italic tracking-wide">Kaupa Miða</h2>
          <button onClick={resetAndClose} className="hover:text-haukar-red transition-colors absolute right-4">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          {/* STEP 1: SELECT TICKETS */}
          {step === 'select' && (
            <div className="space-y-6">
              <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                <p className="text-sm text-haukar-red font-bold uppercase tracking-wider mb-1">Næsti Leikur</p>
                <p className="font-headline font-bold text-xl">Haukar vs. Valur</p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  Fimmtudagur kl. 19:30 • Ásvellir
                </p>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-700">Fjöldi miða:</span>
                <div className="flex items-center bg-gray-100 rounded-full">
                  <button 
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-haukar-red transition-colors"
                  >
                    <span className="material-symbols-outlined">remove</span>
                  </button>
                  <span className="w-8 text-center font-bold">{ticketCount}</span>
                  <button 
                    onClick={() => setTicketCount(ticketCount + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-haukar-red transition-colors"
                  >
                    <span className="material-symbols-outlined">add</span>
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                <span className="text-gray-500 text-sm">Samtals:</span>
                <span className="font-headline font-bold text-3xl">{(ticketCount * ticketPrice).toLocaleString('is-IS')} kr.</span>
              </div>

              {/* Seamless Payment Buttons */}
              <div className="space-y-3 pt-2">
                <button 
                  onClick={handlePayment}
                  className="w-full bg-black text-white rounded-full py-4 font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined">apple</span>
                  <span>Pay</span>
                </button>
                <button 
                  onClick={handlePayment}
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded-full py-4 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                  <span>Pay</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: PROCESSING (The fake Face ID delay) */}
          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 border-4 border-gray-200 border-t-haukar-red rounded-full animate-spin"></div>
              <p className="font-bold text-gray-600 animate-pulse">Staðfesti greiðslu...</p>
            </div>
          )}

          {/* STEP 3: SUCCESS (The QR Code Delivery) */}
          {step === 'success' && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="font-headline font-bold text-2xl">Mætt á svæðið!</h3>
              <p className="text-gray-500 text-sm">Hér er aðgöngumiðinn þinn. Hann hefur einnig verið sendur á netfangið þitt.</p>
              
              {/* Fake QR Code */}
              <div className="bg-gray-100 p-4 rounded-2xl w-48 h-48 flex items-center justify-center my-4">
                <span className="material-symbols-outlined text-8xl text-gray-800">qr_code_2</span>
              </div>

              <button 
                onClick={resetAndClose}
                className="w-full bg-asvellir-blue text-white rounded-full py-3 font-bold hover:bg-blue-900 transition-colors mt-4"
              >
                Klára
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
</file>

<file path="src/components/Veggurinn.jsx">
import Button from './Button.jsx';

export default function Veggurinn() {
  // Mock data for the social feed
  const socialPosts = [
    {
      id: 1,
      user: 'Jón Jónsson',
      handle: '@jonni_haukamadur',
      platform: 'instagram',
      content: 'Mættur á Ásvelli! Búið að vera geggjað tímabil, nú klárum við þetta! 🔴⚪️',
      image: true,
      time: '2 klst síðan'
    },
    {
      id: 2,
      user: 'Haukar Handbolti',
      handle: '@HaukarHandbolti',
      platform: 'x',
      content: 'Þvílík stemning í stúkunni í kvöld! Takk fyrir stuðninginn, þið eruð áttundi leikmaðurinn á vellinum. 👊',
      image: false,
      time: '5 klst síðan'
    },
    {
      id: 3,
      user: 'Anna Sigurðardóttir',
      handle: '@annasig',
      platform: 'instagram',
      content: 'Framtíðin er björt! Yngri flokkarnir að gera frábæra hluti um helgina. Upprennandi stjörnur.',
      image: true,
      time: 'Í gær'
    },
    {
      id: 4,
      user: 'Körfuknattleiksdeild Hauka',
      handle: '@haukarkarfa',
      platform: 'x',
      content: 'Undirbúningur í hámarki fyrir oddaleikinn. Hlökkum til að sjá ykkur öll á fimmtudaginn!',
      image: false,
      time: 'Í gær'
    }
  ];

  return (
    <section className="w-full bg-[#fafafa] py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section (Centered for impact) */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-2">
            #ÁframHaukar
          </span>
          <h2 className="text-5xl font-black italic tracking-normal text-[#c8102e]">
            Veggurinn á Ásvöllum
          </h2>
          <p className="text-gray-500 text-sm font-body mt-4 max-w-xl">
            Taktu þátt í umræðunni! Merktu myndirnar þínar með <strong className="text-[#1c2c6c]">#ÁframHaukar</strong> á Instagram og X til að birtast á veggnum.
          </p>
        </div>

        {/* Masonry/Grid Layout for Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col h-full cursor-pointer">
              
              {/* Post Header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-[#1c2c6c]">
                    {post.user.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1c2c6c] leading-none">{post.user}</h4>
                    <span className="text-[10px] text-gray-400 font-medium">{post.handle}</span>
                  </div>
                </div>
                {/* Platform Icon Indicator */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[12px] ${post.platform === 'instagram' ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-black'}`}>
                  <span className="material-symbols-outlined text-[14px]">
                    {post.platform === 'instagram' ? 'photo_camera' : 'tag'}
                  </span>
                </div>
              </div>

              {/* Post Image Placeholder (Conditional) */}
              {post.image && (
                <div className="w-full bg-[#e9ecef] rounded-2xl aspect-square mb-4 flex items-center justify-center">
                  <span className="material-symbols-outlined text-gray-400 text-3xl">image</span>
                </div>
              )}

              {/* Post Content */}
              <p className="text-gray-600 text-sm font-body mb-4 flex-grow">
                {post.content}
              </p>

              {/* Post Footer */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{post.time}</span>
                <span className="material-symbols-outlined text-gray-300 hover:text-[#c8102e] transition-colors text-[18px]">favorite</span>
              </div>

            </div>
          ))}
        </div>

        {/* REFACTORED: Powered by our Global Design System */}
        <div className="mt-12 text-center">
          <Button variant="outline" uppercase={true}>
            Hlaða fleiri færslum
          </Button>
        </div>

      </div>
    </section>
  );
}
</file>

<file path="src/pages/Home.jsx">
import HeroBanner from '../components/HeroBanner';
import NewsGrid from '../components/NewsGrid';
import PlayerSpotlight from '../components/PlayerSpotlight';
import Veggurinn from '../components/Veggurinn';
import TrophyCabinet from '../components/TrophyCabinet';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* 1. Cinematic Entry */}
      <HeroBanner />
      
      {/* 2. Latest Club News (Bento Grid) */}
      <div id="news">
        <NewsGrid />
      </div>

      {/* 3. Star Athlete Feature */}
      <PlayerSpotlight />

      {/* 4. The Social & Sponsor Grid */}
      <Veggurinn />

      {/* 5. Historical Anchor */}
      <TrophyCabinet />
    </div>
  );
}
</file>

<file path="src/pages/Leikvakt.jsx">
export default function Leikvakt() {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 flex-grow w-full">
      
      {/* 1. Header: Match Context */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          {/* FIXED: Swapped haukar-red to #c8102e and removed font-label */}
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#c8102e]/10 text-[#c8102e] text-xs font-bold uppercase tracking-widest rounded mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-pulse"></span>
            Bein Útsending
          </span>
          {/* FIXED: Swapped asvellir-blue to #1c2c6c and font-headline to standard */}
          <h1 className="text-3xl md:text-5xl font-black text-[#c8102e] italic tracking-tighter uppercase">
            Haukar vs Valur
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Olís deild karla • Ásvellir • Áhorfendur: 1,240
          </p>
        </div>
        
        {/* Giant Score Display */}
        <div className="flex items-center gap-6 text-4xl md:text-5xl font-black italic tracking-tighter">
           <span className="text-gray-900">24</span>
           <span className="text-[#c8102e] mb-2">-</span>
           <span className="text-gray-500">21</span>
        </div>
      </div>

      {/* 2. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: The HaukarTV Video Player (Takes up 2/3 of the screen) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-xl overflow-hidden shadow-xl aspect-video relative border-4 border-gray-900 group">
            
            {/* The YouTube Iframe Embed */}
            <iframe 
              className="w-full h-full absolute top-0 left-0 rounded-2xl shadow-inner"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&loop=1&playlist=LXb3EKWsInQ" 
              title="Leikvakt Útsending" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
            
            {/* Fallback Overlay */}
            {/* FIXED: Swapped asvellir-blue to #1c2c6c */}
            <div className="absolute inset-0 bg-[#1c2c6c]/80 flex flex-col items-center justify-center text-white pointer-events-none opacity-0 transition-opacity">
              <span className="material-symbols-outlined text-6xl mb-4 opacity-50">videocam_off</span>
              <p className="font-bold uppercase tracking-widest">Útsending hefst brátt</p>
            </div>
          </div>
          
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Skotnýting</p>
              <p className="text-xl font-bold text-gray-900">62%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Varin Skot</p>
              <p className="text-xl font-bold text-gray-900">14</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Hraðaupphlaup</p>
              <p className="text-xl font-bold text-gray-900">8</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Brottvísanir</p>
              <p className="text-xl font-bold text-gray-900">2 Mín</p>
            </div>
          </div>
        </div>

        {/* Right Column: Live Play-by-Play Feed */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-[500px] lg:h-auto overflow-hidden">
          
          {/* Feed Header */}
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <h3 className="font-bold uppercase tracking-widest text-sm text-[#1c2c6c]">Leiklýsing</h3>
            <span className="text-xs font-medium text-gray-500 bg-white px-2 py-1 rounded border border-gray-200">Uppfærist sjálfkrafa</span>
          </div>

          {/* Feed Content (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Event 1 */}
            <div className="flex gap-4">
              <div className="text-sm font-bold text-[#c8102e] w-12 pt-1">45:12</div>
              <div>
                <p className="font-bold text-gray-900">MARK! Haukar (24-21)</p>
                <p className="text-sm text-gray-600 mt-1">Þráinn Orri Jónsson skorar með glæsilegu skoti af línunni eftir frábæra sendingu.</p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex gap-4">
              <div className="text-sm font-bold text-gray-400 w-12 pt-1">44:30</div>
              <div>
                <p className="font-bold text-gray-900">Varin! Haukar</p>
                <p className="text-sm text-gray-600 mt-1">Aron Rafn Eðvarðsson ver glæsilega úr dauðafæri hornamanns Vals.</p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="flex gap-4">
              <div className="text-sm font-bold text-gray-400 w-12 pt-1">43:15</div>
              <div>
                <p className="font-bold text-gray-900">Tveggja mínútna brottvísun</p>
                <p className="text-sm text-gray-600 mt-1">Leikmaður Vals fær 2 mínútur fyrir brot á línumanni Hauka.</p>
              </div>
            </div>

             {/* Event 4 */}
             <div className="flex gap-4 opacity-70">
              <div className="text-sm font-bold text-gray-400 w-12 pt-1">42:05</div>
              <div>
                <p className="font-bold text-gray-900">MARK! Valur (23-21)</p>
                <p className="text-sm text-gray-600 mt-1">Valur minnkar muninn með langskoti.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
</file>

<file path="src/pages/Vefverslun.jsx">
export default function Vefverslun() {
  const products = [
    {
      id: 1,
      name: 'Haukar Heimatreyja 2026',
      category: 'Keppnisfatnaður',
      price: '14.990 kr.',
      image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Placeholder red sports shirt
      isNew: true
    },
    {
      id: 2,
      name: 'Haukar Útitreyja 2026',
      category: 'Keppnisfatnaður',
      price: '14.990 kr.',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Placeholder white shirt
      isNew: true
    },
    {
      id: 3,
      name: 'Haukar Æfingapeysa',
      category: 'Æfingafatnaður',
      price: '11.990 kr.',
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Placeholder hoodie
      isNew: false
    },
    {
      id: 4,
      name: 'Haukar Trefill',
      category: 'Fylgihlutir',
      price: '4.990 kr.',
      image: 'https://images.unsplash.com/photo-1606130983177-3e819b168db6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', // Placeholder scarf/accessory
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20"> {/* pt-24 pushes it down below your navbar */}
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Store Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
          <div>
            <p className="text-[10px] font-bold text-haukar-red tracking-[0.2em] uppercase mb-2">
              Vefverslun Hauka
            </p>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter text-asvellir-blue font-headline uppercase">
              Kaupa Hauka Varning
            </h1>
          </div>
          
          {/* Category Filters */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <button className="text-sm font-bold text-white bg-asvellir-blue px-4 py-2 rounded-full">Allt</button>
            <button className="text-sm font-bold text-gray-500 hover:text-asvellir-blue px-4 py-2">Treyjur</button>
            <button className="text-sm font-bold text-gray-500 hover:text-asvellir-blue px-4 py-2">Fylgihlutir</button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              
              {/* Image & Hover Action */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-4 aspect-[4/5]">
                {product.isNew && (
                  <span className="absolute top-4 left-4 z-20 bg-haukar-red text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm shadow-md">
                    Nýtt
                  </span>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Slide-up Add to Cart Button */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <button className="w-full bg-asvellir-blue text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-900 transition-colors flex justify-center items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    Bæta í körfu
                  </button>
                </div>
                
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              </div>

              {/* Product Info */}
              <div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                  {product.category}
                </p>
                <h3 className="font-bold text-asvellir-blue mb-1 leading-tight">
                  {product.name}
                </h3>
                <p className="font-black text-haukar-red">
                  {product.price}
                </p>
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
</file>

<file path="public/favicon.svg">
<svg xmlns="http://www.w3.org/2000/svg" width="48" height="46" fill="none" viewBox="0 0 48 46"><path fill="#863bff" d="M25.946 44.938c-.664.845-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.287c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.497 0-3.578-1.842-3.578H1.237c-.92 0-1.456-1.04-.92-1.788L10.013.474c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.579 1.842 3.579h11.377c.943 0 1.473 1.088.89 1.83L25.947 44.94z" style="fill:#863bff;fill:color(display-p3 .5252 .23 1);fill-opacity:1"/><mask id="a" width="48" height="46" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M25.842 44.938c-.664.844-2.021.375-2.021-.698V33.937a2.26 2.26 0 0 0-2.262-2.262H10.183c-.92 0-1.456-1.04-.92-1.788l7.48-10.471c1.07-1.498 0-3.579-1.842-3.579H1.133c-.92 0-1.456-1.04-.92-1.787L9.91.473c.214-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.471c-1.07 1.498 0 3.578 1.842 3.578h11.377c.943 0 1.473 1.088.89 1.832L25.843 44.94z" style="fill:#000;fill-opacity:1"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#ede6ff" rx="5.508" ry="14.704" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -4.47 31.516)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#ede6ff" rx="10.399" ry="29.851" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -39.328 7.883)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#7e14ff" rx="5.508" ry="30.487" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -25.913 -14.639)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.814 -32.644 -3.334)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#7e14ff" rx="5.508" ry="30.599" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="matrix(.00324 1 1 -.00324 -34.34 30.47)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#ede6ff" rx="14.072" ry="22.078" style="fill:#ede6ff;fill:color(display-p3 .9275 .9033 1);fill-opacity:1" transform="rotate(93.35 24.506 48.493)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#7e14ff" rx="3.47" ry="21.501" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(89.009 28.708 47.59)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx=".387" cy="8.972" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(39.51 .387 8.972)"/></g><g filter="url(#k)"><ellipse cx="47.523" cy="-6.092" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 47.523 -6.092)"/></g><g filter="url(#l)"><ellipse cx="41.412" cy="6.333" fill="#47bfff" rx="5.971" ry="9.665" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 41.412 6.333)"/></g><g filter="url(#m)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#n)"><ellipse cx="-1.879" cy="38.332" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 -1.88 38.332)"/></g><g filter="url(#o)"><ellipse cx="35.651" cy="29.907" fill="#7e14ff" rx="4.407" ry="29.108" style="fill:#7e14ff;fill:color(display-p3 .4922 .0767 1);fill-opacity:1" transform="rotate(37.892 35.651 29.907)"/></g><g filter="url(#p)"><ellipse cx="38.418" cy="32.4" fill="#47bfff" rx="5.971" ry="15.297" style="fill:#47bfff;fill:color(display-p3 .2799 .748 1);fill-opacity:1" transform="rotate(37.892 38.418 32.4)"/></g></g><defs><filter id="b" width="60.045" height="41.654" x="-19.77" y="16.149" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-54.613" y="-7.533" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-49.64" y="2.03" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-45.045" y="20.029" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-43.513" y="21.178" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="15.756" y="-17.901" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="23.548" y="2.284" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-27.636" y="-22.853" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="20.116" y="-38.415" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="24.641" y="-11.323" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-29.286" y="6.009" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="8.244" y="-2.416" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="18.713" y="10.588" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17158" stdDeviation="4.596"/></filter></defs></svg>
</file>

<file path="public/icons.svg">
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="bluesky-icon" viewBox="0 0 16 17">
    <g clip-path="url(#bluesky-clip)"><path fill="#08060d" d="M7.75 7.735c-.693-1.348-2.58-3.86-4.334-5.097-1.68-1.187-2.32-.981-2.74-.79C.188 2.065.1 2.812.1 3.251s.241 3.602.398 4.13c.52 1.744 2.367 2.333 4.07 2.145-2.495.37-4.71 1.278-1.805 4.512 3.196 3.309 4.38-.71 4.987-2.746.608 2.036 1.307 5.91 4.93 2.746 2.72-2.746.747-4.143-1.747-4.512 1.702.189 3.55-.4 4.07-2.145.156-.528.397-3.691.397-4.13s-.088-1.186-.575-1.406c-.42-.19-1.06-.395-2.741.79-1.755 1.24-3.64 3.752-4.334 5.099"/></g>
    <defs><clipPath id="bluesky-clip"><path fill="#fff" d="M.1.85h15.3v15.3H.1z"/></clipPath></defs>
  </symbol>
  <symbol id="discord-icon" viewBox="0 0 20 19">
    <path fill="#08060d" d="M16.224 3.768a14.5 14.5 0 0 0-3.67-1.153c-.158.286-.343.67-.47.976a13.5 13.5 0 0 0-4.067 0c-.128-.306-.317-.69-.476-.976A14.4 14.4 0 0 0 3.868 3.77C1.546 7.28.916 10.703 1.231 14.077a14.7 14.7 0 0 0 4.5 2.306q.545-.748.965-1.587a9.5 9.5 0 0 1-1.518-.74q.191-.14.372-.293c2.927 1.369 6.107 1.369 8.999 0q.183.152.372.294-.723.437-1.52.74.418.838.963 1.588a14.6 14.6 0 0 0 4.504-2.308c.37-3.911-.63-7.302-2.644-10.309m-9.13 8.234c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.894 0 1.614.82 1.599 1.82.001 1-.705 1.82-1.6 1.82m5.91 0c-.878 0-1.599-.82-1.599-1.82 0-.998.705-1.82 1.6-1.82.893 0 1.614.82 1.599 1.82 0 1-.706 1.82-1.6 1.82"/>
  </symbol>
  <symbol id="documentation-icon" viewBox="0 0 21 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="m15.5 13.333 1.533 1.322c.645.555.967.833.967 1.178s-.322.623-.967 1.179L15.5 18.333m-3.333-5-1.534 1.322c-.644.555-.966.833-.966 1.178s.322.623.966 1.179l1.534 1.321"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M17.167 10.836v-4.32c0-1.41 0-2.117-.224-2.68-.359-.906-1.118-1.621-2.08-1.96-.599-.21-1.349-.21-2.848-.21-2.623 0-3.935 0-4.983.369-1.684.591-3.013 1.842-3.641 3.428C3 6.449 3 7.684 3 10.154v2.122c0 2.558 0 3.838.706 4.726q.306.383.713.671c.76.536 1.79.64 3.581.66"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M3 10a2.78 2.78 0 0 1 2.778-2.778c.555 0 1.209.097 1.748-.047.48-.129.854-.503.982-.982.145-.54.048-1.194.048-1.749a2.78 2.78 0 0 1 2.777-2.777"/>
  </symbol>
  <symbol id="github-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M9.356 1.85C5.05 1.85 1.57 5.356 1.57 9.694a7.84 7.84 0 0 0 5.324 7.44c.387.079.528-.168.528-.376 0-.182-.013-.805-.013-1.454-2.165.467-2.616-.935-2.616-.935-.349-.91-.864-1.143-.864-1.143-.71-.48.051-.48.051-.48.787.051 1.2.805 1.2.805.695 1.194 1.817.857 2.268.649.064-.507.27-.857.49-1.052-1.728-.182-3.545-.857-3.545-3.87 0-.857.31-1.558.8-2.104-.078-.195-.349-1 .077-2.078 0 0 .657-.208 2.14.805a7.5 7.5 0 0 1 1.946-.26c.657 0 1.328.092 1.946.26 1.483-1.013 2.14-.805 2.14-.805.426 1.078.155 1.883.078 2.078.502.546.799 1.247.799 2.104 0 3.013-1.818 3.675-3.558 3.87.284.247.528.714.528 1.454 0 1.052-.012 1.896-.012 2.156 0 .208.142.455.528.377a7.84 7.84 0 0 0 5.324-7.441c.013-4.338-3.48-7.844-7.773-7.844" clip-rule="evenodd"/>
  </symbol>
  <symbol id="social-icon" viewBox="0 0 20 20">
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M12.5 6.667a4.167 4.167 0 1 0-8.334 0 4.167 4.167 0 0 0 8.334 0"/>
    <path fill="none" stroke="#aa3bff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.35" d="M2.5 16.667a5.833 5.833 0 0 1 8.75-5.053m3.837.474.513 1.035c.07.144.257.282.414.309l.93.155c.596.1.736.536.307.965l-.723.73a.64.64 0 0 0-.152.531l.207.903c.164.715-.213.991-.84.618l-.872-.52a.63.63 0 0 0-.577 0l-.872.52c-.624.373-1.003.094-.84-.618l.207-.903a.64.64 0 0 0-.152-.532l-.723-.729c-.426-.43-.289-.864.306-.964l.93-.156a.64.64 0 0 0 .412-.31l.513-1.034c.28-.562.735-.562 1.012 0"/>
  </symbol>
  <symbol id="x-icon" viewBox="0 0 19 19">
    <path fill="#08060d" fill-rule="evenodd" d="M1.893 1.98c.052.072 1.245 1.769 2.653 3.77l2.892 4.114c.183.261.333.48.333.486s-.068.089-.152.183l-.522.593-.765.867-3.597 4.087c-.375.426-.734.834-.798.905a1 1 0 0 0-.118.148c0 .01.236.017.664.017h.663l.729-.83c.4-.457.796-.906.879-.999a692 692 0 0 0 1.794-2.038c.034-.037.301-.34.594-.675l.551-.624.345-.392a7 7 0 0 1 .34-.374c.006 0 .93 1.306 2.052 2.903l2.084 2.965.045.063h2.275c1.87 0 2.273-.003 2.266-.021-.008-.02-1.098-1.572-3.894-5.547-2.013-2.862-2.28-3.246-2.273-3.266.008-.019.282-.332 2.085-2.38l2-2.274 1.567-1.782c.022-.028-.016-.03-.65-.03h-.674l-.3.342a871 871 0 0 1-1.782 2.025c-.067.075-.405.458-.75.852a100 100 0 0 1-.803.91c-.148.172-.299.344-.99 1.127-.304.343-.32.358-.345.327-.015-.019-.904-1.282-1.976-2.808L6.365 1.85H1.8zm1.782.91 8.078 11.294c.772 1.08 1.413 1.973 1.425 1.984.016.017.241.02 1.05.017l1.03-.004-2.694-3.766L7.796 5.75 5.722 2.852l-1.039-.004-1.039-.004z" clip-rule="evenodd"/>
  </symbol>
</svg>
</file>

<file path="src/assets/react.svg">
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>
</file>

<file path="src/assets/vite.svg">
<svg xmlns="http://www.w3.org/2000/svg" width="77" height="47" fill="none" aria-labelledby="vite-logo-title" viewBox="0 0 77 47"><title id="vite-logo-title">Vite</title><style>.parenthesis{fill:#000}@media (prefers-color-scheme:dark){.parenthesis{fill:#fff}}</style><path fill="#9135ff" d="M40.151 45.71c-.663.844-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.493c-.92 0-1.457-1.04-.92-1.788l7.479-10.471c1.07-1.498 0-3.578-1.842-3.578H15.443c-.92 0-1.456-1.04-.92-1.788l9.696-13.576c.213-.297.556-.474.92-.474h28.894c.92 0 1.456 1.04.92 1.788l-7.48 10.472c-1.07 1.497 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.087.89 1.83L40.153 45.712z"/><mask id="a" width="48" height="47" x="14" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><path fill="#000" d="M40.047 45.71c-.663.843-2.02.374-2.02-.699V34.708a2.26 2.26 0 0 0-2.262-2.262H24.389c-.92 0-1.457-1.04-.92-1.788l7.479-10.472c1.07-1.497 0-3.578-1.842-3.578H15.34c-.92 0-1.456-1.04-.92-1.788l9.696-13.575c.213-.297.556-.474.92-.474H53.93c.92 0 1.456 1.04.92 1.788L47.37 13.03c-1.07 1.498 0 3.578 1.842 3.578h11.376c.944 0 1.474 1.088.89 1.831L40.049 45.712z"/></mask><g mask="url(#a)"><g filter="url(#b)"><ellipse cx="5.508" cy="14.704" fill="#eee6ff" rx="5.508" ry="14.704" transform="rotate(269.814 20.96 11.29)scale(-1 1)"/></g><g filter="url(#c)"><ellipse cx="10.399" cy="29.851" fill="#eee6ff" rx="10.399" ry="29.851" transform="rotate(89.814 -16.902 -8.275)scale(1 -1)"/></g><g filter="url(#d)"><ellipse cx="5.508" cy="30.487" fill="#8900ff" rx="5.508" ry="30.487" transform="rotate(89.814 -19.197 -7.127)scale(1 -1)"/></g><g filter="url(#e)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.928 4.177)scale(1 -1)"/></g><g filter="url(#f)"><ellipse cx="5.508" cy="30.599" fill="#8900ff" rx="5.508" ry="30.599" transform="rotate(89.814 -25.738 5.52)scale(1 -1)"/></g><g filter="url(#g)"><ellipse cx="14.072" cy="22.078" fill="#eee6ff" rx="14.072" ry="22.078" transform="rotate(93.35 31.245 55.578)scale(-1 1)"/></g><g filter="url(#h)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#i)"><ellipse cx="3.47" cy="21.501" fill="#8900ff" rx="3.47" ry="21.501" transform="rotate(89.009 35.419 55.202)scale(-1 1)"/></g><g filter="url(#j)"><ellipse cx="14.592" cy="9.743" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(39.51 14.592 9.743)"/></g><g filter="url(#k)"><ellipse cx="61.728" cy="-5.321" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 61.728 -5.32)"/></g><g filter="url(#l)"><ellipse cx="55.618" cy="7.104" fill="#00c2ff" rx="5.971" ry="9.665" transform="rotate(37.892 55.618 7.104)"/></g><g filter="url(#m)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#n)"><ellipse cx="12.326" cy="39.103" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 12.326 39.103)"/></g><g filter="url(#o)"><ellipse cx="49.857" cy="30.678" fill="#8900ff" rx="4.407" ry="29.108" transform="rotate(37.892 49.857 30.678)"/></g><g filter="url(#p)"><ellipse cx="52.623" cy="33.171" fill="#00c2ff" rx="5.971" ry="15.297" transform="rotate(37.892 52.623 33.17)"/></g></g><path d="M6.919 0c-9.198 13.166-9.252 33.575 0 46.789h6.215c-9.25-13.214-9.196-33.623 0-46.789zm62.424 0h-6.215c9.198 13.166 9.252 33.575 0 46.789h6.215c9.25-13.214 9.196-33.623 0-46.789" class="parenthesis"/><defs><filter id="b" width="60.045" height="41.654" x="-5.564" y="16.92" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="c" width="90.34" height="51.437" x="-40.407" y="-6.762" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="d" width="79.355" height="29.4" x="-35.435" y="2.801" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="e" width="79.579" height="29.4" x="-30.84" y="20.8" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="f" width="79.579" height="29.4" x="-29.307" y="21.949" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="g" width="74.749" height="58.852" x="29.961" y="-17.13" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="7.659"/></filter><filter id="h" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="i" width="61.377" height="25.362" x="37.754" y="3.055" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="j" width="56.045" height="63.649" x="-13.43" y="-22.082" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="k" width="54.814" height="64.646" x="34.321" y="-37.644" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="l" width="33.541" height="35.313" x="38.847" y="-10.552" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="m" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="n" width="54.814" height="64.646" x="-15.081" y="6.78" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="o" width="54.814" height="64.646" x="22.45" y="-1.645" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter><filter id="p" width="39.409" height="43.623" x="32.919" y="11.36" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur result="effect1_foregroundBlur_2002_17286" stdDeviation="4.596"/></filter></defs></svg>
</file>

<file path="src/components/Footer.jsx">
import Button from './Button.jsx';

export default function Footer() {
  return (
    <footer className="bg-[#c8102e] text-white pt-12 border-t border-gray-200 w-full relative z-30">
      
      <div className="max-w-7xl mx-auto px-6 pb-12">
        
        {/* Seamless Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-white/20 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <h3 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase">
              Skráðu þig á póstlistann
            </h3>
            <p className="text-white/80 text-sm font-body">
              Fáðu nýjustu fréttir, tilboð úr vefverslun og upplýsingar um miðasölu beint í æð.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
            <input 
              type="email" 
              placeholder="Netfangið þitt" 
              className="px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#1c2c6c] w-full sm:w-72 text-sm font-body transition-all border border-white/20"
            />
            {/* REFACTORED TO GLOBAL BUTTON */}
            <Button 
              variant="secondary" 
              icon="send" 
              iconPosition="right" 
              className="whitespace-nowrap"
            >
              Skrá mig
            </Button>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="Haukar Logo" className="h-10 w-auto brightness-0 invert" />
              <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
                Haukar
              </h2>
            </div>
            <p className="text-white/80 text-sm font-body leading-relaxed mb-6">
              Eitt stærsta og sigursælasta íþróttafélag landsins. Við byggjum á stolti, liðsheild og óbilandi baráttuanda.
            </p>
            <div className="flex gap-3">
              {[ { icon: 'share', label: 'Share' }, { icon: 'photo_camera', label: 'Instagram' }, { icon: 'play_arrow', label: 'YouTube' } ].map((social) => (
                <a key={social.icon} href="#" aria-label={social.label} className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c8102e] hover:-translate-y-1 transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Deildir with Icons */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-white">Deildir</h3>
            <ul className="space-y-4 text-sm text-white/80 font-body">
              {[
                { name: 'Handbolti', icon: 'sports_handball' },
                { name: 'Fótbolti', icon: 'sports_soccer' },
                { name: 'Körfubolti', icon: 'sports_basketball' },
                { name: 'Karaté', icon: 'sports_martial_arts' },
                { name: 'Skíði', icon: 'downhill_skiing' }
              ].map((sport) => (
                <li key={sport.name}>
                  <a href="#" className="hover:text-white transition-colors flex items-center gap-3">
                    <span className="material-symbols-outlined text-white/50 text-[20px]">{sport.icon}</span>
                    {sport.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Félagið */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-white">Félagið</h3>
            <ul className="space-y-4 text-sm text-white/80 font-body">
              {['Sagan', 'Stjórn og nefndir', 'Gjaldskrá & Æfingagjöld', 'Mótin', 'Vefverslun'].map((link) => (
                <li key={link}><a href={link === 'Vefverslun' ? '/vefverslun' : '#'} className="hover:text-white transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 4: Hafa Samband */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-white">Hafa Samband</h3>
            <ul className="space-y-4 text-sm text-white/80 font-body">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-white/60 text-[20px] mt-0.5">location_on</span>
                <div>
                  Íþróttamiðstöðin Ásvöllum
                  <br />
                  221 Hafnarfjörður
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/60 text-[20px]">mail</span>
                <a href="mailto:haukar@haukar.is" className="hover:text-white transition-colors">haukar@haukar.is</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white/60 text-[20px]">phone</span>
                <a href="tel:+3545258700" className="hover:text-white transition-colors">525 8700</a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* FULL WIDTH Bottom Bar - Dark Crimson */}
      <div className="bg-[#9b0c23] py-6 w-full">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70 font-body">
          <p>&copy; {new Date().getFullYear()} Íþróttafélagið Haukar. Allur réttur áskilinn.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Persónuverndarstefna</a>
            <a href="#" className="hover:text-white transition-colors">Vafrakökur</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
</file>

<file path="src/components/Hero.jsx">
export default function Hero() {
  return (
    <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-[#1c2c6c]">
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c6c]/90 to-[#1c2c6c]/40 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-60"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
      ></div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center md:text-left">
        <span className="text-[#c8102e] text-sm md:text-base font-bold uppercase tracking-widest mb-4 block">
          Knattspyrnufélagið Haukar
        </span>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white leading-tight mb-6 uppercase">
          Hjartað í<br />
          <span className="text-[#c8102e] drop-shadow-lg">Hafnarfirði</span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl font-body max-w-2xl mb-10 mx-auto md:mx-0">
          Stolt, liðsheild og óbilandi baráttuandi. Vertu með í ferðalaginu og styddu þitt lið til sigurs á Ásvöllum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          
          {/* FIXED: Removed ALL rounded classes for pure 90-degree corners */}
          <button className="bg-[#c8102e] text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-red-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">confirmation_number</span>
            Kaupa miða
          </button>
          
          {/* FIXED: Removed ALL rounded classes for pure 90-degree corners */}
          <button className="bg-white text-[#1c2c6c] px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            Vefverslun
          </button>
          
        </div>
      </div>
      
    </section>
  );
}
</file>

<file path="src/components/Navbar.jsx">
import { useState } from 'react';
import Button from './Button.jsx';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPastMatchesOpen, setIsPastMatchesOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentStep, setPaymentStep] = useState('select'); 

  const closeModal = () => {
    setIsTicketModalOpen(false);
    setTimeout(() => {
      setTicketCount(1);
      setPaymentStep('select');
    }, 300);
  };

  return (
    <>
      <nav className="fixed w-full z-50 transition-all">
        
        {/* Top Ticker (Red Banner) */}
        <div className="bg-[#c8102e] text-white py-2 px-4 md:px-6 flex items-center justify-between text-xs relative z-50 shadow-md">
          <div className="flex-1 flex justify-start">
            <a href="/leikvakt" className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 transition-colors rounded-full cursor-pointer w-max">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="font-bold tracking-widest uppercase text-[10px] md:text-xs">Í beinni</span>
            </a>
          </div>

          <div className="hidden sm:flex flex-1 justify-center items-center whitespace-nowrap">
            <div className="font-black text-sm md:text-base tracking-widest bg-black/20 px-4 py-1 rounded text-white border border-white/10 shadow-inner">
              HAUKAR <span className="text-yellow-400 mx-2">24 - 21</span> VALUR
            </div>
          </div>

          <div className="flex-1 flex justify-end items-center gap-4">
            <span className="font-medium hidden lg:block text-white/90">Næsti leikur: Haukar - Valur kl. 19:30</span>
            <button 
              onClick={() => {
                setIsPastMatchesOpen(!isPastMatchesOpen);
                setIsMobileMenuOpen(false); 
              }}
              className="flex items-center gap-1 font-bold uppercase tracking-wider text-[10px] md:text-xs bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full transition-colors"
            >
              Liðnir leikir
              <span className="material-symbols-outlined text-[16px]">
                {isPastMatchesOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        </div>

        {/* Shared Wrapper */}
        <div className="relative w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
          
          {/* Main White Navbar */}
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-30">
            <a href="/" className="flex items-center gap-3 cursor-pointer">
              <img src="/images/logo.png" alt="Haukar Logo" className="h-10 w-auto" />
              <span className="text-2xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mt-1">Haukar</span>
            </a>

            <div className="hidden lg:flex items-center gap-8">
              <a href="#" className="text-sm font-bold text-[#1c2c6c] border-b-2 border-[#c8102e] pb-1 uppercase tracking-wider transition-colors">Handbolti</a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider transition-colors">Fótbolti</a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider transition-colors">Körfubolti</a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider transition-colors">Sagan</a>
              <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider transition-colors">Mótin</a>
            </div>

            {/* Desktop Action Buttons - REFACTORED */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="secondary" 
                size="sm" 
                icon="local_activity"
                onClick={() => setIsTicketModalOpen(true)}
              >
                Kaupa miða
              </Button>
              
              <Button 
                variant="primary" 
                size="sm" 
                icon="shopping_cart"
                onClick={() => window.location.href = '/vefverslun'}
              >
                Vefverslun
              </Button>
            </div>

            <button 
              className="lg:hidden text-[#1c2c6c] p-2 hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsPastMatchesOpen(false); 
              }}
              aria-label="Toggle Menu"
            >
              <span className="material-symbols-outlined text-[28px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Past Matches Dropdown */}
          <div 
            className={`absolute top-0 left-0 w-full bg-white text-[#1c2c6c] transition-all duration-500 ease-in-out shadow-2xl z-40 overflow-hidden ${
              isPastMatchesOpen ? 'max-h-[500px] opacity-100 py-6 border-b-4 border-[#c8102e]' : 'max-h-0 opacity-0 py-0 border-b-0'
            }`}
          >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center justify-center border-r border-gray-100 last:border-0 p-2">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Olís deild karla</span>
                <div className="font-black text-xl md:text-2xl tracking-tight mb-1">HAU <span className="text-green-500">32 - 28</span> FRA</div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Sigur</span>
              </div>
              <div className="flex flex-col items-center justify-center border-r border-gray-100 last:border-0 p-2">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Besta deildin</span>
                <div className="font-black text-xl md:text-2xl tracking-tight mb-1">HAU <span className="text-gray-400">1 - 1</span> KEF</div>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Jafntefli</span>
              </div>
              <div className="flex flex-col items-center justify-center border-r border-gray-100 last:border-0 p-2 hidden md:flex">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Subway deild kvenna</span>
                <div className="font-black text-xl md:text-2xl tracking-tight mb-1">HAU <span className="text-[#c8102e]">75 - 82</span> NJA</div>
                <span className="text-xs font-bold text-[#c8102e] bg-red-50 px-2 py-0.5 rounded">Tap</span>
              </div>
              <div className="flex flex-col items-center justify-center p-2 hidden md:flex">
                <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mb-2">Olís deild kvenna</span>
                <div className="font-black text-xl md:text-2xl tracking-tight mb-1">HAU <span className="text-green-500">26 - 22</span> VAL</div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">Sigur</span>
              </div>
            </div>
          </div>

          {/* Mobile Dropdown Menu (Burger menu) */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-6 flex flex-col gap-6 z-40 border-t border-gray-100">
              <div className="flex flex-col gap-4">
                <a href="#" className="text-sm font-bold text-[#1c2c6c] uppercase tracking-wider border-b border-gray-100 pb-3 flex justify-between items-center">
                  Handbolti <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                </a>
                <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider border-b border-gray-100 pb-3 flex justify-between items-center">
                  Fótbolti <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                </a>
                <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider border-b border-gray-100 pb-3 flex justify-between items-center">
                  Körfubolti <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                </a>
                <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider border-b border-gray-100 pb-3 flex justify-between items-center">
                  Sagan <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                </a>
                <a href="#" className="text-sm font-bold text-gray-500 hover:text-[#c8102e] uppercase tracking-wider border-b border-gray-100 pb-3 flex justify-between items-center">
                  Mótin <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>
                </a>
              </div>
              
              {/* Mobile Action Buttons - REFACTORED */}
              <div className="flex flex-col gap-3 mt-2">
                <Button 
                  variant="secondary" 
                  size="md" 
                  icon="local_activity"
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsTicketModalOpen(true);
                  }}
                >
                  Kaupa miða
                </Button>

                <Button 
                  variant="primary" 
                  size="md" 
                  icon="shopping_cart"
                  className="w-full"
                  onClick={() => window.location.href = '/vefverslun'}
                >
                  Vefverslun Hauka
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- DETAILED TICKET CHECKOUT MODAL --- */}
      {isTicketModalOpen && (
        <div className="fixed inset-0 bg-[#1c2c6c]/90 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300 flex flex-col">
            
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-all z-20"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="bg-gradient-to-br from-[#c8102e] to-[#9b0c23] p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[150px] text-white">sports_handball</span>
              </div>
              <span className="text-white/90 text-xs font-bold uppercase tracking-widest relative z-10 mb-2 block">Olís deild karla</span>
              <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase relative z-10">
                Haukar <span className="text-[#1c2c6c] mx-2">-</span> Valur
              </h3>
              <div className="text-white/90 text-sm font-medium mt-4 relative z-10 flex flex-col gap-1 items-center">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_month</span> Fimmtudagur 16. apríl kl. 19:30</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Íþróttamiðstöðin Ásvöllum</span>
              </div>
            </div>

            {paymentStep === 'select' ? (
              <div className="p-8 flex flex-col gap-6 bg-gray-50">
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <div>
                    <p className="font-bold text-[#1c2c6c]">Almennur miði</p>
                    <p className="text-xs text-gray-500">2.500 kr. pr. miða</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-8 h-8 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-gray-200 flex items-center justify-center font-bold transition-colors"
                    >-</button>
                    <span className="font-black text-xl w-4 text-center">{ticketCount}</span>
                    <button 
                      onClick={() => setTicketCount(ticketCount + 1)}
                      className="w-8 h-8 rounded-full bg-[#1c2c6c] text-white hover:bg-blue-900 flex items-center justify-center font-bold transition-colors"
                    >+</button>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex justify-between items-end mb-4 px-2">
                    <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Samtals</span>
                    <span className="text-2xl font-black text-[#1c2c6c]">{(ticketCount * 2500).toLocaleString('is-IS')} kr.</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* Apple Pay */}
                    <button 
                      onClick={() => setPaymentStep('qr')}
                      className="w-full bg-black text-white font-medium text-[20px] py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-transform active:scale-95 shadow-md"
                    >
                      <svg className="h-[22px] w-auto mb-1" viewBox="0 0 384 512" fill="currentColor">
                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.8 90.4-86.8 102.3-134.1-41.5-16.5-61.2-46.7-61.4-76.5zM256 109.1c11.9-15.3 21-38 18.5-59.8-19.3 1.5-44.8 14-57.9 29.5-11.4 13.5-22.1 36.4-19 57.5 21.6 2.3 44.9-10.7 58.4-27.2z"/>
                      </svg>
                      <span className="font-semibold tracking-tight">Pay</span>
                    </button>

                    {/* Google Pay */}
                    <button 
                      onClick={() => setPaymentStep('qr')}
                      className="w-full bg-white border border-gray-300 text-[#3c4043] font-medium text-[19px] py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-transform active:scale-95 shadow-sm"
                    >
                      <svg className="h-[20px] w-auto" viewBox="0 0 48 48">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                      </svg>
                      <span className="font-sans font-medium tracking-tight mt-[2px]">Pay</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 flex flex-col items-center justify-center gap-4 bg-gray-50 text-center animate-in slide-in-from-right-8 duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
                  <span className="material-symbols-outlined text-[32px]">check_circle</span>
                </div>
                <h4 className="text-2xl font-black text-[#1c2c6c] uppercase tracking-tighter">Miði Staðfestur!</h4>
                <p className="text-sm text-gray-500 mb-2">Sýndu þennan kóða við innganginn á Ásvöllum.</p>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
                  <span className="material-symbols-outlined text-[140px] text-[#1c2c6c]">qr_code_2</span>
                </div>
                <p className="font-bold text-[#c8102e] mt-2 text-lg">{ticketCount}x Almennur miði</p>
                
                {/* Modal Close Button - REFACTORED */}
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={closeModal}
                >
                  Loka glugga
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
</file>

<file path="src/components/NewsGrid.jsx">
export default function NewsGrid() {
  return (
    <section className="w-full bg-[#fafafa] py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-1">
              Fréttasafn
            </span>
            <h2 className="text-5xl font-black italic tracking-normal text-[#c8102e]">
              Nýjustu Fréttir
            </h2>
          </div>
          <a href="#" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2">
            Sjá Allt <span className="text-xl leading-none">&rsaquo;</span>
          </a>
        </div>

        {/* Masonry/Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Large Left Card: Player Portrait */}
          <div className="lg:col-span-1 lg:row-span-2 rounded-3xl overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow min-h-[450px] lg:min-h-full flex flex-col justify-end p-6 bg-[#1c2c6c]">
             
             {/* The Goalkeeper Image */}
             <img 
               src="/images/goalkeeper.png
               " 
               alt="Grétar Ari" 
               className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
             />

             {/* Dark Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c]/90 via-[#1c2c6c]/20 to-transparent"></div>
             
             <div className="relative z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
               <span className="bg-[#c8102e] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 inline-block shadow-sm">
                 Uppalinn í Haukum
               </span>
               <h3 className="text-3xl font-black text-white leading-tight drop-shadow-md">
                 Grétar Ari kominn heim
               </h3>
             </div>
          </div>

          {/* Top Middle Card: Basketball - FIXED WITH NEW IMAGE */}
          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
              <img 
                src="/images/basketball-news.jpg" 
                alt="Basketball Action" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Körfubolti • 2 klst síðan
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Mikil spenna fyrir úrslitakeppninni í körfu
            </h3>
          </div>

          {/* Top Right Card: Football - FIXED WITH NEW IMAGE */}
          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col group">
            <div className="rounded-2xl aspect-[16/9] mb-4 overflow-hidden bg-gray-100">
              <img 
                src="/images/football-news.jpg" 
                alt="Football Pitch" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Fótbolti • Gær
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Undirbúningur í fullum gangi á Ásvöllum
            </h3>
          </div>

          {/* Bottom Middle Card: Handball */}
          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-end min-h-[220px]">
            <div className="flex-grow"></div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Handbolti • 5 klst síðan
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Stelpurnar okkar mæta Val í undanúrslitum
            </h3>
          </div>

          {/* Bottom Right Card: Club */}
          <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-end min-h-[220px]">
            <div className="flex-grow"></div>
            <span className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2 block">
              Klúbburinn • Gær
            </span>
            <h3 className="text-xl font-bold text-[#c8102e] leading-tight">
              Bæjarstjóri heimsækir nýja félagsmiðstöð
            </h3>
          </div>

        </div>
      </div>
    </section>
  );
}
</file>

<file path="src/components/TrophyCabinet.jsx">
export default function TrophyCabinet() {
  return (
    <section className="w-full bg-white py-16 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest block mb-1">
              Stolt Félagsins
            </span>
            {/* FIXED: Removed rogue font-headline, added tracking-tighter to match NewsGrid perfectly */}
            <h2 className="text-5xl font-black italic tracking-tighter text-[#c8102e]">
              Bikarskápurinn
            </h2>
          </div>
          <a href="#" className="font-bold text-[#c8102e] hover:text-red-800 transition-colors flex items-center gap-1 mb-2">
            Öll sagan <span className="text-xl leading-none">&rsaquo;</span>
          </a>
        </div>

        {/* The Display Cases (Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Handbolti Cabinet - FIXED: Swapped to Haukar Red */}
          <div className="bg-[#c8102e] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] text-black/10 group-hover:text-black/15 transition-colors pointer-events-none transform -rotate-12">
              emoji_events
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                {/* Inverted to white background with red icon for contrast */}
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#c8102e] shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sports_handball</span>
                </div>
                {/* FIXED: Typography matches PlayerSpotlight exactly */}
                <h3 className="text-3xl font-black italic text-white leading-tight">Handbolti</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Íslandsmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">18x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Karla: 11 titlar<br/>
                    Kvenna: 7 titlar
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-white/90 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">11x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Karla: 7 titlar<br/>
                    Kvenna: 4 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Körfubolti Cabinet - FIXED: Swapped to Haukar Red */}
          <div className="bg-[#c8102e] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] text-black/10 group-hover:text-black/15 transition-colors pointer-events-none transform -rotate-12">
              emoji_events
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#c8102e] shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sports_basketball</span>
                </div>
                <h3 className="text-3xl font-black italic text-white leading-tight">Körfubolti</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Íslandsmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">4x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Kvenna: 4 titlar<br/>
                    <span className="text-transparent selection:bg-transparent">_</span>
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-white/90 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">10x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Karla: 3 titlar<br/>
                    Kvenna: 7 titlar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fótbolti Cabinet - FIXED: Swapped to Haukar Red */}
          <div className="bg-[#c8102e] rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-30 pointer-events-none"></div>
            <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[180px] text-black/10 group-hover:text-black/15 transition-colors pointer-events-none transform -rotate-12">
              emoji_events
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#c8102e] shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">sports_soccer</span>
                </div>
                <h3 className="text-3xl font-black italic text-white leading-tight">Fótbolti</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-yellow-400 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Deildarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">4x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    1. deild karla: 3 titlar<br/>
                    2. deild karla: 1 titill
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-white/90 text-[22px]">emoji_events</span>
                    <h4 className="font-bold text-white text-lg leading-none uppercase tracking-wider">Bikarmeistarar</h4>
                    <span className="bg-black/20 text-white text-xs font-black px-2.5 py-1 rounded-full ml-auto">1x</span>
                  </div>
                  <p className="text-sm text-white/80 font-medium leading-relaxed border-l-2 border-white/20 pl-3 ml-2">
                    Bikar kvenna (Neðri deildir)<br/>
                    <span className="text-transparent selection:bg-transparent">_</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
</file>

<file path="src/App.jsx">
import Vefverslun from './pages/Vefverslun';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveTicker from './components/LiveTicker';
import AlertToast from './components/AlertToast';
import DivisionTicker from './components/DivisionTicker';
import GeminiChat from './components/GeminiChat';
import TicketModal from './components/TicketModal';
import Sponsors from './components/Sponsors'; 

// Pages
import Home from './pages/Home';
import Leikvakt from './pages/Leikvakt';

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  return (
    <div className="bg-[#fafafa] text-gray-900 font-sans selection:bg-[#c8102e] selection:text-white flex flex-col min-h-screen">
      {/* FIXED: Removed ghost classes (bg-surface, haukar-red, font-body) and locked in the global hex codes */}
      
      {/* 1. Modals & Overlays */}
      <TicketModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} />

      {/* 2. Header */}
      <LiveTicker toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} isOpen={isDrawerOpen} />
      <DivisionTicker isOpen={isDrawerOpen} />
      <Navbar onOpenTickets={() => setIsTicketModalOpen(true)} />

      {/* 3. The Router Engine */}
      <div className="flex-grow relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leikvakt" element={<Leikvakt />} />
          <Route path="/vefverslun" element={<Vefverslun />} />
        </Routes>
      </div>

      {/* 4. Global Pre-Footer & Footer */}
      <AlertToast />
      <GeminiChat />
      
      {/* 5. Sponsor Wall & Footer sit outside the routes so they render on every page! */}
      <Sponsors />
      <Footer />
      
    </div>
  );
}
</file>

<file path="src/index.css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Anti-Flicker Curtain Drop */
body {
    opacity: 0;
    animation: fadeIn 0.3s ease-in forwards 0.15s;
    background-color: #ffffff;
}

@keyframes fadeIn {
    to { opacity: 1; }
}

/* Material Icons Fix */
.material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* Custom Gradients */
.hero-gradient {
    background: linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(30, 58, 138, 0.7) 100%);
}

.metallic-gold {
    background: linear-gradient(to bottom, #FCEABB 0%, #D4AF37 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</file>

<file path="src/main.jsx">
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
</file>

<file path=".gitignore">
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
</file>

<file path="eslint.config.js">
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
])
</file>

<file path="index.html">
<!doctype html>
<html lang="is">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Haukar | Bikarmeistarar 2026</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Lexend:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
</file>

<file path="package.json">
{
  "name": "haukar-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@google/genai": "^1.50.1",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "^7.14.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.4",
    "@tailwindcss/postcss": "^4.2.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "autoprefixer": "^10.5.0",
    "eslint": "^9.39.4",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.4.0",
    "postcss": "^8.5.9",
    "tailwindcss": "^3.4.19",
    "vite": "^8.0.4"
  }
}
</file>

<file path="postcss.config.js">
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
</file>

<file path="README.md">
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
</file>

<file path="tailwind.config.js">
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        haukar: {
          red: '#c8102e',
          darkRed: '#9b0c23',    // Used for hover states and footer bottom
          blue: '#1c2c6c',
          darkBlue: '#1c3074',   // Used for the past matches background
          lightBlue: '#a0acdc',  // Used for muted text
        }
      },
      fontFamily: {
        // We use a heavy, condensed font for headlines to give it that aggressive sports feel
        headline: ['"Barlow Condensed"', 'Oswald', 'sans-serif'],
        // Clean, highly readable font for general text and UI elements
        body: ['"Inter"', 'system-ui', 'sans-serif'],
        label: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'zoom-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out',
        'zoom-in': 'zoom-in 0.2s ease-out',
      }
    },
  },
  plugins: [],
}
</file>

<file path="vite.config.js">
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
</file>

</files>
