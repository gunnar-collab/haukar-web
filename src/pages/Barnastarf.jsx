import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Barnastarf() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const portals = [
    {
      title: 'Æfingatöflur',
      subtitle: 'Tímasetningar fyrir allar deildir',
      icon: 'calendar_today',
      link: '/aefingatoflur',
      gradient: 'from-[#1c2c6c] to-[#2a4099]',
      iconColor: 'text-[#1c2c6c]',
      bgAccent: 'bg-[#1c2c6c]/5',
      hoverBorder: 'hover:border-[#1c2c6c]/50',
      delay: 'delay-100'
    },
    {
      title: 'Æfingagjöld',
      subtitle: 'Verðskrá & Abler skráning',
      icon: 'payments',
      link: '/aefingagjold',
      gradient: 'from-[#c8102e] to-[#e82040]',
      iconColor: 'text-[#c8102e]',
      bgAccent: 'bg-[#c8102e]/5',
      hoverBorder: 'hover:border-[#c8102e]/50',
      delay: 'delay-150'
    },
    {
      title: 'Sumaríþróttaskóli',
      subtitle: 'Fjölgreina- og boltaskólar yfir sumarið',
      icon: 'wb_sunny',
      link: '/sumarskoli',
      gradient: 'from-[#D4AF37] to-[#F1C40F]',
      iconColor: 'text-[#D4AF37]',
      bgAccent: 'bg-[#D4AF37]/10',
      hoverBorder: 'hover:border-[#D4AF37]/50',
      delay: 'delay-200'
    },
    {
      title: 'Leikjaskóli Barnanna',
      subtitle: 'Fyrstu skrefin fyrir 2-5 ára kríli',
      icon: 'toys',
      link: '/leikjaskoli',
      gradient: 'from-green-500 to-emerald-400',
      iconColor: 'text-green-500',
      bgAccent: 'bg-green-500/10',
      hoverBorder: 'hover:border-green-500/50',
      delay: 'delay-300'
    }
  ];

  return (
    <main className="w-full bg-white min-h-screen pb-20 font-sans">
      
      {/* 1. Fun, Welcoming Hero Section */}
      <div className="bg-gradient-to-br from-[#1c2c6c] to-[#2a4099] py-24 px-6 text-center relative overflow-hidden shadow-inner">
        {/* Floating Background Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <span className="material-symbols-outlined absolute top-10 left-10 text-[100px] text-green-400 animate-[bounce_8s_infinite]">sports_soccer</span>
          <span className="material-symbols-outlined absolute bottom-10 right-20 text-[120px] text-orange-400 animate-[pulse_6s_infinite]">sports_basketball</span>
          <span className="material-symbols-outlined absolute top-20 right-10 text-[80px] text-yellow-400 animate-[bounce_10s_infinite_reverse]">sports_handball</span>
          <span className="material-symbols-outlined absolute bottom-20 left-20 text-[90px] text-pink-400 animate-[pulse_7s_infinite]">toys</span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 rounded-[2rem] bg-white/10 backdrop-blur-sm shadow-xl flex items-center justify-center mb-6 transform -rotate-6 border border-white/20">
            <img src="/images/haukar-log.svg" alt="Haukar Logo" className="w-12 h-12" />
          </div>
          <span className="text-[#c8102e] bg-white/90 px-3 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4 shadow-sm inline-block">
            Upplýsingatorg
          </span>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-md flex justify-center gap-[2px]">
            <span className="inline-block text-red-400 animate-wave-grow origin-bottom" style={{animationDelay: '0.0s'}}>B</span>
            <span className="inline-block text-yellow-400 animate-wave-grow origin-bottom" style={{animationDelay: '0.15s'}}>A</span>
            <span className="inline-block text-green-400 animate-wave-grow origin-bottom" style={{animationDelay: '0.3s'}}>R</span>
            <span className="inline-block text-blue-300 animate-wave-grow origin-bottom" style={{animationDelay: '0.45s'}}>N</span>
            <span className="inline-block text-purple-400 animate-wave-grow origin-bottom" style={{animationDelay: '0.6s'}}>A</span>
            <span className="inline-block text-pink-400 animate-wave-grow origin-bottom" style={{animationDelay: '0.75s'}}>S</span>
            <span className="inline-block text-orange-400 animate-wave-grow origin-bottom" style={{animationDelay: '0.9s'}}>T</span>
            <span className="inline-block text-teal-400 animate-wave-grow origin-bottom" style={{animationDelay: '1.05s'}}>A</span>
            <span className="inline-block text-[#D4AF37] animate-wave-grow origin-bottom" style={{animationDelay: '1.2s'}}>R</span>
            <span className="inline-block text-white animate-wave-grow origin-bottom" style={{animationDelay: '1.35s'}}>F</span>
          </h1>
          <p className="text-white/80 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Allt sem þú þarft að vita um starfið okkar fyrir yngstu kynslóðina, tekið saman á einum stað.
          </p>
        </div>
      </div>

      {/* 2. Interactive Portal Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-24 -mt-12 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {portals.map((portal, idx) => (
            <Link 
              key={idx}
              to={portal.link}
              className={cn(
                "group block rounded-[2.5rem] bg-white p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-gray-100 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 relative overflow-hidden",
                portal.delay,
                portal.hoverBorder
              )}
            >
              {/* Animated Background Gradient Hover Effect */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 ease-out",
                portal.gradient
              )}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-8">
                  <div className={cn("w-20 h-20 rounded-[2rem] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 shadow-inner", portal.bgAccent)}>
                    <span className={cn("material-symbols-outlined text-[40px]", portal.iconColor)}>
                      {portal.icon}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-[#1c2c6c]">arrow_forward</span>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter text-[#1c2c6c] mb-2 group-hover:text-[#c8102e] transition-colors">
                    {portal.title}
                  </h2>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed">
                    {portal.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  );
}
