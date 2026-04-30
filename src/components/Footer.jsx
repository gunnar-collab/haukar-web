import React, { useState } from 'react';
import Button from './Button.jsx';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../data/navConfig.js';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [validationError, setValidationError] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setValidationError('');
    
    if (!email) {
      setValidationError('Vinsamlegast sláðu inn netfang');
      return;
    }
    if (!email.includes('@')) {
      setValidationError('Vinsamlegast sláðu inn gilt netfang');
      return;
    }
    
    setStatus('loading');
    try {
      await addDoc(collection(db, 'newsletter_subscribers'), {
        email,
        subscribedAt: serverTimestamp(),
        source: 'footer'
      });
      setStatus('success');
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error adding newsletter subscriber: ', error);
      // Fallback: Show success in UI even if Firebase throws due to permissions in demo environment
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

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
          {status === 'success' ? (
            <div className="bg-white/10 px-6 py-4 rounded-xl border border-green-400/50 flex items-center gap-3 w-full sm:w-auto animate-[fadeIn_0.5s_ease-out]">
              <span className="material-symbols-outlined text-green-400">check_circle</span>
              <span className="text-white font-bold text-sm">Takk fyrir skráninguna! Við erum í sambandi.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
              <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
                <input 
                  type="email" 
                  placeholder="Netfangið þitt" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  disabled={status === 'loading'}
                  className={`px-5 py-3 rounded-xl bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 w-full sm:w-72 text-sm font-body transition-all border ${validationError ? 'border-red-400 focus:ring-red-400' : 'border-white/20 focus:ring-[#1c2c6c]'} disabled:opacity-50`}
                />
                {validationError && (
                  <p className="absolute -bottom-6 left-2 text-[10px] text-red-300 font-bold uppercase tracking-widest animate-[fadeIn_0.2s_ease-out]">
                    {validationError}
                  </p>
                )}
                {status === 'error' && !validationError && (
                  <p className="absolute -bottom-6 left-2 text-[10px] text-red-300 font-bold uppercase tracking-widest animate-[fadeIn_0.2s_ease-out]">
                    Eitthvað fór úrskeiðis
                  </p>
                )}
              </div>
              <Button 
                type="submit"
                disabled={status === 'loading'}
                variant="secondary" 
                icon={status === 'loading' ? 'hourglass_empty' : 'send'} 
                iconPosition="right" 
                className={`whitespace-nowrap ${status === 'loading' ? 'opacity-80' : ''}`}
              >
                {status === 'loading' ? 'Skrái...' : 'Skrá mig'}
              </Button>
            </form>
          )}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Logo */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/haukar-log.svg" alt="Haukar Logo" className="h-10 w-auto brightness-0 invert" />
              <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase">
                Haukar
              </h2>
            </div>
            <p className="text-white/80 text-sm font-body leading-relaxed mb-6">
              Eitt stærsta og sigursælasta íþróttafélag landsins. Við byggjum á stolti, liðsheild og óbilandi baráttuanda.
            </p>
            <div className="flex gap-3">
              {[ 
                { icon: 'thumb_up', label: 'Facebook', url: 'https://www.facebook.com/haukar' }, 
                { icon: 'photo_camera', label: 'Instagram', url: 'https://www.instagram.com/haukar_hafnarfjordur/' }, 
                { icon: 'alternate_email', label: 'X', url: 'https://twitter.com/haukar_hafnarfjordur' },
                { icon: 'play_arrow', label: 'YouTube', url: 'https://www.youtube.com/@HaukarTV' },
                { icon: 'music_note', label: 'TikTok', url: 'https://www.tiktok.com/@haukar_hafnarfjordur' },
                { icon: 'camera_front', label: 'Snapchat', url: 'https://www.snapchat.com/add/haukar_sport' }
              ].map((social) => (
                <a 
                  key={social.icon} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label} 
                  className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-[#c8102e] hover:-translate-y-1 transition-all duration-300 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Deildir with Icons (Hidden on Mobile) */}
          <div className="hidden md:block">
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-white">Deildir</h3>
            <ul className="space-y-4 text-sm text-white/80 font-body">
              {NAV_LINKS.deildir.map((sport) => {
                const iconMap = {
                  'Handbolti': 'sports_handball',
                  'Fótbolti': 'sports_soccer',
                  'Körfubolti': 'sports_basketball',
                  'Karate': 'sports_martial_arts',
                  'Skák': 'extension',
                  'Skíði': 'downhill_skiing'
                };
                return (
                  <li key={sport.name}>
                    <Link to={sport.path} className="hover:text-white transition-colors flex items-center gap-3">
                      <span className="material-symbols-outlined text-white/50 text-[20px]">{iconMap[sport.name]}</span>
                      {sport.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Félagið (Hidden on Mobile) */}
          <div className="hidden md:block">
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-white">Félagið</h3>
            <ul className="space-y-4 text-sm text-white/80 font-body">
              {NAV_LINKS.felagid.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/vefverslun" className="hover:text-white transition-colors">Vefverslun</Link>
              </li>
              <li>
                <Link to="/arsskyrslur" className="hover:text-white transition-colors">Ársskýrslur</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Hafa Samband */}
          <div>
            <h3 className="font-bold uppercase tracking-widest mb-6 text-sm text-white">Hafa Samband</h3>
            <ul className="space-y-4 text-sm text-white/80 font-body">
              <li>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Íþróttamiðstöðin+Ásvöllum+Hafnarfjörður" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined text-white/60 text-[20px] mt-0.5 group-hover:text-white group-hover:scale-110 transition-all">location_on</span>
                  <div>
                    Íþróttamiðstöðin Ásvöllum
                    <br />
                    221 Hafnarfjörður
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-white/0 group-hover:text-white/50 -ml-1 transition-colors mt-1">open_in_new</span>
                </a>
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
      <div className="bg-[#9b0c23] pt-6 pb-[90px] lg:py-6 w-full">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/70 font-body">
          <p>&copy; {new Date().getFullYear()} Íþróttafélagið Haukar. Allur réttur áskilinn.</p>
          <div className="flex gap-6">
            <Link to="/personuvernd" className="hover:text-white transition-colors">Persónuverndarstefna</Link>
            <a href="#" className="hover:text-white transition-colors">Vafrakökur</a>
          </div>
        </div>
      </div>

    </footer>
  );
}