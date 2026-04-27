import { useState } from 'react';
import Button from './Button.jsx';
import { NavLink, Link } from 'react-router-dom';
import { NAV_LINKS } from '../data/navConfig.js';
import { cn } from '../lib/utils.js';

export default function Navbar({ onOpenTickets, onOpenLogin }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null); 

  const activeClassName = "text-[#1c2c6c] border-b-2 border-[#c8102e]";
  const baseClassName = "text-sm font-bold text-gray-500 hover:text-[#1c2c6c] uppercase tracking-wider transition-all py-2";

  const toggleMobileAccordion = (section) => {
    setMobileExpanded(mobileExpanded === section ? null : section);
  };

  const handleMobileNav = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full relative z-[100]">
      <div className="relative w-full bg-white/90 backdrop-blur-md border-b border-gray-100/50 shadow-sm transition-all duration-300">
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-30">
          
          <Link 
            to="/" 
            className="flex items-center gap-3 cursor-pointer group" 
            aria-label="Forsíða"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/images/haukar-log.svg" alt="Haukar Logo" className="h-10 w-auto group-hover:scale-105 transition-transform" />
            <span className="text-2xl font-black italic tracking-tighter text-[#c8102e] uppercase mt-1">Haukar</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            
            {/* 1. Deildir */}
            <div className="relative group py-2 cursor-pointer">
              <span className="text-sm font-bold text-gray-500 group-hover:text-[#1c2c6c] uppercase tracking-wider transition-colors flex items-center gap-1">
                Deildir <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-180" aria-hidden="true">expand_more</span>
              </span>
              <div className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-xl rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-2 overflow-hidden flex flex-col z-50 py-2">
                {NAV_LINKS.deildir.map((link) => (
                  <NavLink 
                    key={link.name} 
                    to={link.path} 
                    className={({ isActive }) => cn(
                      "px-5 py-3 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#c8102e] hover:bg-gray-50/50 transition-colors flex items-center gap-2",
                      isActive && "bg-gray-50/80 text-[#c8102e]"
                    )}
                  >
                    {link.icon && <span className="material-symbols-outlined text-[16px]">{link.icon}</span>}
                    {link.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* 2. Félagið */}
            <div className="relative group py-2 cursor-pointer">
              <span className="text-sm font-bold text-gray-500 group-hover:text-[#1c2c6c] uppercase tracking-wider transition-colors flex items-center gap-1">
                Félagið <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-180" aria-hidden="true">expand_more</span>
              </span>
              <div className="absolute top-full left-0 w-56 bg-white/95 backdrop-blur-xl rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-4 group-hover:translate-y-2 overflow-hidden flex flex-col z-50 py-2">
                {NAV_LINKS.felagid.map((link) => {
                  const itemClass = "px-5 py-3 text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-[#c8102e] hover:bg-gray-50/50 transition-colors flex items-center gap-2";
                  if (link.external) {
                    return (
                      <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" className={itemClass}>
                        {link.icon && <span className="material-symbols-outlined text-[16px]">{link.icon}</span>}
                        {link.name}
                      </a>
                    );
                  }
                  return (
                    <NavLink 
                      key={link.name} 
                      to={link.path} 
                      className={({ isActive }) => cn(itemClass, isActive && "bg-gray-50/80 text-[#c8102e]")}
                    >
                      {link.icon && <span className="material-symbols-outlined text-[16px]">{link.icon}</span>}
                      {link.name}
                    </NavLink>
                  );
                })}
              </div>
            </div>

            {/* 3. Skráning */}
            <a href="https://www.abler.io/shop/haukar/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#c8102e] hover:text-[#9b0c23] uppercase tracking-wider transition-colors py-2 flex items-center gap-1">
              Skráning <span className="material-symbols-outlined text-[16px]" aria-hidden="true">open_in_new</span>
            </a>

            {/* Removed Dagatal and Leikvakt (moved to Félagið dropdown) */}

          </div>

          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={onOpenLogin} 
              className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#c8102e] hover:text-white hover:bg-[#c8102e] hover:border-[#c8102e] hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300 group relative shadow-sm"
              aria-label="Innskráning"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white font-bold text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">Innskráning</div>
            </button>
            <Link to="/vefverslun" aria-label="Verslun">
              <button 
                className="w-10 h-10 rounded-full bg-white border border-gray-100 text-[#c8102e] hover:text-white hover:bg-[#c8102e] hover:border-[#c8102e] hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center transition-all duration-300 group relative shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white font-bold text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">Verslun</div>
              </button>
            </Link>
            <button 
              onClick={onOpenTickets} 
              className="relative w-10 h-10 flex items-center justify-center group"
              aria-label="Miðar"
            >
              <div className="absolute inset-0 bg-[#c8102e] rounded-full animate-ping opacity-25"></div>
              <div className="relative w-full h-full rounded-full bg-[#c8102e] text-white hover:bg-red-800 shadow-md flex items-center justify-center transition-all z-10">
                <span className="material-symbols-outlined text-[20px]">local_activity</span>
              </div>
              <div className="absolute top-full mt-2 right-0 px-2 py-1 bg-[#c8102e] text-white font-bold text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-20 pointer-events-none">Kaupa miða</div>
            </button>
          </div>

          <button 
            className="lg:hidden text-[#1c2c6c] p-2 hover:bg-gray-50 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Loka valmynd" : "Opna valmynd"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[28px]" aria-hidden="true">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Accordion Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl py-6 px-6 flex flex-col gap-2 z-40 border-t border-gray-100 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-1 mb-4">
              
              <button onClick={() => toggleMobileAccordion('deildir')} className="flex items-center justify-between py-3 text-sm font-bold text-[#1c2c6c] uppercase tracking-wider border-b border-gray-100" aria-expanded={mobileExpanded === 'deildir'}>
                Deildir <span className={cn("material-symbols-outlined transition-transform duration-300", mobileExpanded === 'deildir' ? '-rotate-180' : '')} aria-hidden="true">expand_more</span>
              </button>
              {mobileExpanded === 'deildir' && (
                <div className="flex flex-col pl-4 border-b border-gray-50 bg-gray-50/50">
                  {NAV_LINKS.deildir.map((link) => (
                    <Link key={link.name} to={link.path} onClick={handleMobileNav} className="py-3 text-sm font-bold text-gray-500 hover:text-[#c8102e] border-b border-gray-100 last:border-0 flex items-center gap-2">
                      {link.icon && <span className="material-symbols-outlined text-[18px]">{link.icon}</span>}
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              <button onClick={() => toggleMobileAccordion('felagid')} className="flex items-center justify-between py-3 text-sm font-bold text-[#1c2c6c] uppercase tracking-wider border-b border-gray-100" aria-expanded={mobileExpanded === 'felagid'}>
                Félagið <span className={cn("material-symbols-outlined transition-transform duration-300", mobileExpanded === 'felagid' ? '-rotate-180' : '')} aria-hidden="true">expand_more</span>
              </button>
              {mobileExpanded === 'felagid' && (
                <div className="flex flex-col pl-4 border-b border-gray-50 bg-gray-50/50">
                  {NAV_LINKS.felagid.map((link) => {
                    const itemClass = "py-3 text-sm font-bold text-gray-500 hover:text-[#c8102e] border-b border-gray-100 last:border-0 flex items-center gap-2";
                    if (link.external) {
                      return (
                        <a key={link.name} href={link.path} target="_blank" rel="noopener noreferrer" onClick={handleMobileNav} className={itemClass}>
                          {link.icon && <span className="material-symbols-outlined text-[18px]">{link.icon}</span>}
                          {link.name}
                        </a>
                      );
                    }
                    return (
                      <Link key={link.name} to={link.path} onClick={handleMobileNav} className={itemClass}>
                        {link.icon && <span className="material-symbols-outlined text-[18px]">{link.icon}</span>}
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              )}

              <a href="https://www.abler.io/shop/haukar/" target="_blank" rel="noopener noreferrer" onClick={handleMobileNav} className="flex items-center justify-between py-3 text-sm font-bold text-[#c8102e] uppercase tracking-wider border-b border-gray-100">
                Skráning <span className="material-symbols-outlined text-[16px]" aria-hidden="true">open_in_new</span>
              </a>
              
              {/* Removed Dagatal and Leikvakt from mobile root (moved to Félagið accordion) */}
            </div>
            
            <div className="flex flex-col gap-3">
              <Button variant="outline" size="md" icon="login" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); onOpenLogin(); }}>
                Innskráning
              </Button>
              <Button variant="secondary" size="md" icon="local_activity" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); onOpenTickets(); }}>
                Miðar
              </Button>
              <Link to="/vefverslun" onClick={handleMobileNav} className="w-full" aria-label="Verslun">
                <Button variant="primary" size="md" icon="checkroom" className="w-full justify-center">
                  Verslun
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}