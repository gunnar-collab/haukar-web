import Button from './Button.jsx';
import { Link } from 'react-router-dom';

export default function GrantBanner() {
  return (
    <section className="w-full bg-white py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(200,16,46,0.08)] border-t-[6px] border-[#c8102e] flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-[#c8102e]/10 text-[#c8102e] text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 border border-[#c8102e]/20">
              <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
              54.500 kr. Frístundastyrkur
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black italic tracking-tighter text-[#1c2c6c] uppercase leading-tight mb-4">
              Nýttu <span className="text-[#c8102e]">styrkinn</span> við skráningu
            </h2>
            <p className="text-gray-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl mx-auto md:mx-0">
              Börn með lögheimili í Hafnarfirði (6–18 ára) eiga rétt á 54.500 kr. frístundastyrk á ári. Styrkurinn dregst sjálfkrafa frá æfingagjöldum þegar gengið er frá skráningu í Abler.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
            <a href="https://hafnarfjordur.is/thjonusta/skolar-og-born/fristundastyrkir/" target="_blank" rel="noopener noreferrer" className="w-full">
              <Button variant="primary" icon="open_in_new" iconPosition="right" className="w-full">
                Lesa nánar um styrkinn
              </Button>
            </a>
            <Link to="/aefingagjold" className="w-full">
              <Button variant="outline" icon="payments" className="w-full">
                Sjá æfingagjöld Hauka
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
