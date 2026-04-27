import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Button from './Button.jsx';

export default function FanZone() {
  const audioRef = useRef(null);

  const playCheer = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  return (
    <section className="w-full bg-[#1c2c6c] py-12 md:py-24 relative overflow-hidden">
      {/* Audio Element (Hidden) */}
      <audio ref={audioRef} src="https://www.soundjay.com/human/sounds/cheer-01.mp3" preload="auto" />
      
      {/* Background Graphic Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <img 
          src="/images/fans/crowd.png" 
          alt="Fans background" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c6c] via-[#1c2c6c]/90 to-transparent z-10"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* 1. TEXT CONTENT */}
          <div className="animate-in fade-in slide-in-from-left-8 duration-700">
            <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] block mb-4">
              Stuðningsmannasvæðið
            </span>
            <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white uppercase leading-none mb-6">
              Vertu <span className="text-[#c8102e]">Bananas</span> <br/> 
              í stúkunni!
            </h2>
            <p className="text-white/80 text-lg font-medium leading-relaxed mb-10 max-w-xl">
              Haukar eiga bestu stuðningsmenn landsins. Hvort sem það er í boltanum, körfunni eða handboltanum þá er stemningin á Ásvöllum engu lík. Vertu hluti af Rauða Hernum og sýndu lit!
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/bakhjarlar">
                <Button variant="primary" icon="group" iconPosition="left">
                  Gerast Bakhjarl
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                icon="volume_up" 
                onClick={playCheer}
                className="group"
              >
                <span className="group-hover:animate-bounce inline-block">Hlusta á stemninguna</span>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#1c2c6c] bg-gray-200 overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?u=haukar${i}`} alt="Fan avatar" />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full border-2 border-[#1c2c6c] bg-[#c8102e] flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  +2k
                </div>
              </div>
              <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
                Vertu með yfir 2.000 öðrum í Rauða Hernum
              </p>
            </div>
          </div>

          {/* 2. DYNAMIC VISUALS */}
          <div className="relative group">
            {/* The main action photo */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 aspect-[4/5] transform lg:rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <img 
                src="/images/fans/superfan.png" 
                alt="Superfan Action" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-yellow-400">emoji_events</span>
                    <span className="text-white text-[10px] font-black uppercase tracking-widest">Stuðningsmaður vikunnar</span>
                  </div>
                  <h4 className="text-white text-2xl font-black italic uppercase">Sigrún 'Bananas' Jónsdóttir</h4>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 z-30 transform -rotate-3 hover:rotate-0 transition-transform duration-300 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#c8102e]/10 rounded-2xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#c8102e]">volume_up</span>
                </div>
                <div>
                  <p className="text-[#1c2c6c] text-2xl font-black leading-none">112 dB</p>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Hljóðstyrkurinn á Ásvöllum</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
