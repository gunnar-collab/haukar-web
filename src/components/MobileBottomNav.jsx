import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { NAV_LINKS } from '../data/navConfig';

export default function MobileBottomNav({ onOpenTickets }) {
  const [activeSheet, setActiveSheet] = useState(null); // 'deildir' | 'meira' | null
  const location = useLocation();

  const isDeildirActive = ['/handbolti', '/fotbolti', '/korfubolti', '/karate', '/skak'].includes(location.pathname);
  
  // Close sheet when route changes
  useEffect(() => {
    setActiveSheet(null);
  }, [location.pathname]);

  const toggleSheet = (sheet) => {
    if (activeSheet === sheet) {
      setActiveSheet(null);
    } else {
      setActiveSheet(sheet);
    }
  };

  // --- SWIPE DOWN GESTURE ---
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 40;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientY);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchEnd - touchStart;
    if (distance > minSwipeDistance) {
      setActiveSheet(null);
    }
  };
  // --------------------------

  return (
    <>
      {/* Dimmed Overlay for Bottom Sheets */}
      {activeSheet && (
        <div 
          className="lg:hidden fixed inset-0 z-[80] bg-[#1c2c6c]/20 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveSheet(null)}
        ></div>
      )}

      {/* Deildir Bottom Sheet */}
      <div 
        className={cn(
          "lg:hidden fixed bottom-[64px] left-0 w-full bg-white rounded-t-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-[85] p-6 pb-10 transition-transform duration-300 ease-out transform",
          activeSheet === 'deildir' ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div 
          className="w-full h-8 -mt-2 mb-4 flex items-start justify-center cursor-grab active:cursor-grabbing"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mt-2"></div>
        </div>
        <h3 className="text-center font-black uppercase tracking-widest text-[#1c2c6c] mb-6 text-sm">
          Veldu Deild
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {NAV_LINKS.deildir.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              onClick={() => setActiveSheet(null)}
              className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 active:bg-gray-100 active:scale-95 transition-all text-[#1c2c6c] border border-gray-100"
            >
              <span className="material-symbols-outlined text-[32px] text-[#c8102e]">{link.icon}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-center">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Meira (Félagið) Bottom Sheet */}
      <div 
        className={cn(
          "lg:hidden fixed bottom-[64px] left-0 w-full bg-white rounded-t-[2rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-[85] p-6 pb-10 transition-transform duration-300 ease-out transform max-h-[70vh] overflow-y-auto",
          activeSheet === 'meira' ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div 
          className="w-full h-8 -mt-2 mb-4 flex items-start justify-center cursor-grab active:cursor-grabbing sticky top-0 bg-white"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="w-12 h-1.5 bg-gray-200 rounded-full mt-2"></div>
        </div>
        <h3 className="text-center font-black uppercase tracking-widest text-[#1c2c6c] mb-6 text-sm">
          Félagið
        </h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {NAV_LINKS.felagid.map((link) => {
            if (link.external) {
              return (
                <a 
                  key={link.name} 
                  href={link.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setActiveSheet(null)}
                  className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 active:bg-gray-100 active:scale-95 transition-all text-[#1c2c6c] border border-gray-100"
                >
                  <span className="material-symbols-outlined text-[28px] text-[#1c2c6c]">{link.icon}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-center">{link.name}</span>
                </a>
              );
            }
            return (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setActiveSheet(null)}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 active:bg-gray-100 active:scale-95 transition-all text-[#1c2c6c] border border-gray-100"
              >
                <span className="material-symbols-outlined text-[28px] text-[#1c2c6c]">{link.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-center">{link.name}</span>
              </Link>
            );
          })}
        </div>
        
        <a 
          href="https://www.abler.io/shop/haukar/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full py-4 bg-[#c8102e]/5 active:bg-[#c8102e]/10 text-[#c8102e] rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all border border-[#c8102e]/10"
        >
          <span>Skráning í Abler</span>
          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </a>
      </div>

      {/* The Actual Bottom Tab Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-100 z-[90] pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
          
          {/* Forsíða */}
          <NavLink 
            to="/" 
            end
            onClick={() => setActiveSheet(null)}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90",
              isActive ? "text-[#c8102e]" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {({ isActive }) => (
              <>
                <span className={cn("material-symbols-outlined text-[24px] mb-0.5", isActive ? "fill-icon font-variation-fill-1" : "")}>
                  home
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider">Heim</span>
              </>
            )}
          </NavLink>

          {/* Deildir Button (Opens Sheet) */}
          <button 
            onClick={() => toggleSheet('deildir')}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90",
              (isDeildirActive || activeSheet === 'deildir') ? "text-[#c8102e]" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <span className={cn("material-symbols-outlined text-[24px] mb-0.5", (isDeildirActive || activeSheet === 'deildir') ? "fill-icon font-variation-fill-1" : "")}>
              sports_handball
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider">Deildir</span>
          </button>

          {/* Kaupa Miða - Prominent middle button */}
          <button 
            onClick={() => {
              setActiveSheet(null);
              onOpenTickets();
            }}
            className="relative -top-5 flex flex-col items-center justify-center group active:scale-95 transition-transform"
          >
            <div className="w-14 h-14 bg-[#c8102e] rounded-full flex items-center justify-center text-white shadow-lg shadow-red-500/30 group-active:bg-red-800">
              <span className="material-symbols-outlined text-[28px]">local_activity</span>
            </div>
            <span className="text-[9px] font-bold text-[#1c2c6c] mt-1 uppercase tracking-wider">Miðar</span>
          </button>

          {/* Vefverslun */}
          <NavLink 
            to="/vefverslun" 
            onClick={() => setActiveSheet(null)}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90",
              isActive ? "text-[#c8102e]" : "text-gray-400 hover:text-gray-600"
            )}
          >
            {({ isActive }) => (
              <>
                <span className={cn("material-symbols-outlined text-[24px] mb-0.5", isActive ? "fill-icon font-variation-fill-1" : "")}>
                  checkroom
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider">Verslun</span>
              </>
            )}
          </NavLink>

          {/* Félagið / More (Opens Sheet) */}
          <button 
            onClick={() => toggleSheet('meira')}
            className={cn(
              "flex flex-col items-center justify-center w-16 h-full transition-all duration-200 active:scale-90",
              activeSheet === 'meira' ? "text-[#c8102e]" : "text-gray-400 hover:text-gray-600"
            )}
          >
            <span className={cn("material-symbols-outlined text-[24px] mb-0.5", activeSheet === 'meira' ? "fill-icon font-variation-fill-1" : "")}>
              {activeSheet === 'meira' ? 'close' : 'more_horiz'}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider">Meira</span>
          </button>

        </div>
      </div>
    </>
  );
}
