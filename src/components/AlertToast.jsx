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