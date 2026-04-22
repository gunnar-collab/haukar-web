import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AlertToast() {
  const [isVisible, setIsVisible] = useState(true);

  // This acts as our timer. It waits 10 seconds, then hides the banner.
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] transition-all duration-700 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0 pointer-events-none'
      }`}
    >
      <div className="relative group">
        <Link 
          to="/fraedsla"
          className="bg-white border border-gray-200 px-5 py-4 rounded-xl shadow-2xl border-l-4 border-l-[#c8102e] flex items-center gap-4 w-[calc(100vw-3rem)] sm:w-auto sm:max-w-sm cursor-pointer hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 block"
        >
          
          <div className="bg-red-50 p-2 rounded-full flex items-center justify-center group-hover:bg-[#c8102e] group-hover:text-white transition-colors">
            <span className="material-symbols-outlined text-[#c8102e] text-sm group-hover:text-white">campaign</span>
          </div>
          
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-0.5">Tilkynning • Fræðsla</p>
            <p className="font-bold text-sm text-[#1c2c6c] leading-tight">
              Tryggjum öryggi allra á Ásvöllum. <br />
              <span className="text-[#c8102e] text-[10px] font-bold uppercase tracking-tighter">Smelltu til að lesa meira</span>
            </p>
          </div>
        </Link>

        {/* Close button sits outside the link to avoid accidental clicks */}
        <button 
          onClick={() => setIsVisible(false)} 
          className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-200 rounded-full text-gray-400 hover:text-[#c8102e] shadow-md transition-colors flex items-center justify-center z-20"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>
    </div>
  );
}