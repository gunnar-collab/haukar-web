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