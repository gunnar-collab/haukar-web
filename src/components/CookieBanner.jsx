import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted/declined in the past
    const cookieConsent = localStorage.getItem('haukar_cookie_consent');
    
    if (!cookieConsent) {
      // Add a slight delay before popping up so it doesn't feel aggressive
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (accepted) => {
    // Save their choice to localStorage so it doesn't bother them again
    localStorage.setItem('haukar_cookie_consent', accepted ? 'yes' : 'no');
    setIsVisible(false);
    setHasInteracted(true);
  };

  if (!isVisible && !hasInteracted) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 w-full z-[9999] p-4 md:p-6 pointer-events-none transition-all duration-700 ease-out transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      }`}
    >
      {/* Haukar Red Background with thick Navy Blue topline */}
      <div className="max-w-5xl mx-auto bg-[#c8102e] rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-t-8 border-[#1c2c6c] flex flex-col md:flex-row items-center gap-6 md:gap-8 pointer-events-auto relative overflow-hidden">
        
        {/* Subtle background logo/icon for texture */}
        <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[150px] text-black/10 pointer-events-none transform -rotate-12">
          warning
        </span>

        {/* The Cookie Mascot (Slightly bouncing to catch the eye) */}
        <div className="text-6xl md:text-7xl animate-[bounce_3s_infinite] drop-shadow-lg shrink-0 relative z-10">
          🍪
        </div>

        {/* The Pitch */}
        <div className="flex-grow text-center md:text-left text-white relative z-10">
          <span className="text-[#1c2c6c] text-[10px] md:text-xs font-black uppercase tracking-widest mb-1 block drop-shadow-sm">
            Kerfisskilaboð
          </span>
          <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-3 drop-shadow-md">
            Tæknivilla!
          </h3>
          <p className="text-white/90 font-medium text-sm md:text-base leading-relaxed max-w-2xl">
            Við erum því miður ekki að tala um nýbakaðar mömmukökur úr sjoppunni á Ásvöllum, heldur vefkökur. 
            Við notum þær til að teikna upp rétta leikplanið og gera upplifun þína á síðunni að meistaravígi. 
            Ertu til í slaginn?
          </p>
        </div>

        {/* The Actions */}
        <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 shrink-0 w-full md:w-auto relative z-10">
           <button 
             onClick={() => handleConsent(false)}
             className="px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider text-white/70 hover:text-white bg-black/10 hover:bg-black/20 transition-colors"
           >
             Nei, ég sit á bekknum
           </button>
           
           {/* Custom button to contrast against the red */}
           <button 
             onClick={() => handleConsent(true)}
             className="px-8 py-4 rounded-2xl font-black uppercase tracking-wider text-white bg-[#1c2c6c] hover:bg-[#152052] transition-all shadow-xl hover:-translate-y-0.5"
           >
             Já, áfram Haukar!
           </button>
        </div>

      </div>
    </div>
  );
}