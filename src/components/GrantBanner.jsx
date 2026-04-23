import Button from './Button.jsx';
import { Link } from 'react-router-dom';

export default function GrantBanner() {
  return (
    <section className="w-full bg-[#c8102e] py-16 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#1c2c6c] skew-x-[-15deg] translate-x-24 opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 translate-y-32"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          <div className="max-w-2xl text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-white/20 text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-6 border border-white/30">
              <span className="material-symbols-outlined text-[14px]">info</span>
              Hafnarfjarðarbær • Frístundastyrkur
            </span>
            <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter text-white uppercase leading-none mb-6">
              Nýttu <span className="text-[#1c2c6c]">frístundastyrkinn</span> <br className="hidden lg:block"/> 
              við skráningu hjá Haukum
            </h2>
            <p className="text-white/90 text-lg font-medium leading-relaxed mb-8">
              Börn með lögheimili í Hafnarfirði á aldrinum 6–18 ára eiga rétt á 54.500 kr. frístundastyrk á ári. Styrkurinn er dreginn beint af æfingagjöldum þegar gengið er frá skráningu í Abler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a href="https://hafnarfjordur.is/thjonusta/skolar-og-born/fristundastyrkir/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" icon="open_in_new" iconPosition="right">
                  Lesa nánar á hafnarfjordur.is
                </Button>
              </a>
              <Link to="/aefingagjold">
                <Button variant="ghost" icon="payments">
                  Sjá æfingagjöld
                </Button>
              </Link>
            </div>
          </div>

          {/* Graphical Element / Badge */}
          <div className="relative group">
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative backdrop-blur-sm">
              <div className="text-center">
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-1">Styrkur</p>
                <p className="text-5xl lg:text-7xl font-black italic text-white leading-none">54.500</p>
                <p className="text-[#D4AF37] text-xl font-bold italic uppercase tracking-tighter mt-1">krónur</p>
              </div>
              
              {/* Spinning border effect - NOW IN HAUKAR GOLD */}
              <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-[#D4AF37] animate-[spin_30s_linear_infinite] opacity-60"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
