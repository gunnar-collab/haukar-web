import { useState } from 'react';
import Button from './Button.jsx';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data/navConfig.js';
import { cn } from '../lib/utils.js';

export default function Navbar({ onOpenTickets }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null); 

  const toggleMobileAccordion = (section) => {
    setMobileExpanded(mobileExpanded === section ? null : section);
  };

  const handleMobileNav = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full z-[100]">
      <div className="relative w-full bg-white shadow-md border-b border-gray-200">
        
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative z-30">
          
          <Link 
            to="/" 
            className="flex items-center gap-3 cursor-pointer" 
            aria-label="Forsíða"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <img src="/images/logo.png" alt="Haukar Logo" className="h-10 w-auto" />
            <span className="text-2xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mt-1">Haukar</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            
            {/* 1. Deildir */}
            <div className="relative group py-2 cursor-pointer">
              <span className="text-sm font-bold text-gray-500 group-hover:text-[#1c2c6c] uppercase tracking-wider transition-colors flex items-center gap-1">
                Deildir <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-180" aria-hidden="true">expand_more</span>
              </span>
              <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 overflow-hidden flex flex-col z-50">
                {NAV_LINKS.deildir.map((link) => (
                  <Link key={link.name} to={link.path} className="px-4 py-3 text-sm font-bold text-gray-500 hover:text-[#c8102e] hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 flex items-center gap-2">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 2. Félagið */}
            <div className="relative group py-2 cursor-pointer">
              <span className="text-sm font-bold text-gray-500 group-hover:text-[#1c2c6c] uppercase tracking-wider transition-colors flex items-center gap-1">
                Félagið <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-rotate-180" aria-hidden="true">expand_more</span>
              </span>
              <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 overflow-hidden flex flex-col z-50">
                {NAV_LINKS.felagid.map((link) => (
                  <Link key={link.name} to={link.path} className="px-4 py-3 text-sm font-bold text-gray-500 hover:text-[#c8102e] hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Skráning */}
            <a href="https://www.abler.io/shop/haukar/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-[#c8102e] hover:text-[#9b0c23] uppercase tracking-wider transition-colors py-2 flex items-center gap-1">
              Skráning <span className="material-symbols-outlined text-[16px]" aria-hidden="true">open_in_new</span>
            </a>

            {/* 4. Dagatal */}
            <Link to="/dagatal" className="text-sm font-bold text-gray-500 hover:text-[#1c2c6c] uppercase tracking-wider transition-colors py-2">
              Dagatal
            </Link>

            {/* 5. Leikvakt */}
            <Link to="/leikvakt" className="text-sm font-bold text-gray-500 hover:text-[#1c2c6c] uppercase tracking-wider transition-colors py-2">
              Leikvakt
            </Link>

          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="secondary" size="sm" icon="local_activity" onClick={onOpenTickets}>
              Kaupa miða
            </Button>
            <Link to="/vefverslun" aria-label="Vefverslun">
              <Button variant="primary" size="sm" icon="shopping_cart">
                Vefverslun
              </Button>
            </Link>
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
                    <Link key={link.name} to={link.path} onClick={handleMobileNav} className="py-3 text-sm font-bold text-gray-500 hover:text-[#c8102e] border-b border-gray-100 last:border-0">
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
                  {NAV_LINKS.felagid.map((link) => (
                    <Link key={link.name} to={link.path} onClick={handleMobileNav} className="py-3 text-sm font-bold text-gray-500 hover:text-[#c8102e] border-b border-gray-100 last:border-0">
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}

              <a href="https://www.abler.io/shop/haukar/" target="_blank" rel="noopener noreferrer" onClick={handleMobileNav} className="flex items-center justify-between py-3 text-sm font-bold text-[#c8102e] uppercase tracking-wider border-b border-gray-100">
                Skráning <span className="material-symbols-outlined text-[16px]" aria-hidden="true">open_in_new</span>
              </a>
              
              <Link to="/dagatal" onClick={handleMobileNav} className="flex items-center justify-between py-3 text-sm font-bold text-[#1c2c6c] uppercase tracking-wider border-b border-gray-100">
                Dagatal
              </Link>
              <Link to="/leikvakt" onClick={handleMobileNav} className="flex items-center justify-between py-3 text-sm font-bold text-[#1c2c6c] uppercase tracking-wider border-b border-gray-100">
                Leikvakt
              </Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button variant="secondary" size="md" icon="local_activity" className="w-full justify-center" onClick={() => { setIsMobileMenuOpen(false); onOpenTickets(); }}>
                Kaupa miða
              </Button>
              <Link to="/vefverslun" onClick={handleMobileNav} className="w-full" aria-label="Vefverslun">
                <Button variant="primary" size="md" icon="shopping_cart" className="w-full justify-center">
                  Vefverslun
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}