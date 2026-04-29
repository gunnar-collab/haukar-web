import Button from './Button';

export default function SkokkPromotion() {
  return (
    <section className="relative w-full overflow-hidden bg-[#1c2c6c] min-h-[600px] flex items-center shadow-2xl">

      {/* 1. Full-Bleed Background Image with Deep Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/skokk-promo.png"
          alt="Skokkhópur Hauka"
          className="w-full h-full object-cover scale-105"
        />
        {/* Multilayered Gradient for Text Legibility and Cinematic Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c2c6c] via-[#1c2c6c]/90 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c]/40 via-transparent to-transparent"></div>
      </div>

      {/* 2. Content Container (Aligned to Site Grid) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-8 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Text Side */}
        <div className="w-full lg:w-3/5 text-white">
          <div className="inline-flex items-center gap-2 bg-[#c8102e] px-5 py-2 rounded-full mb-8 shadow-lg shadow-black/20">
            <span className="material-symbols-outlined text-sm">exercise</span>
            <span className="text-[11px] font-black uppercase tracking-widest">Nýliðanámskeið 2026</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9] drop-shadow-xl">
            Ertu klár í <br />
            <span className="text-[#c8102e]">skokkið?</span>
          </h2>

          <p className="text-xl md:text-2xl text-white/90 font-medium mb-10 max-w-xl leading-relaxed">
            Skokkhópur Hauka býður upp á faglegt nýliðanámskeið. Frábær félagsskapur og æfingar áfram út sumarið innifaldar!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
            <div>
              <p className="text-[#c8102e] text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-90">Hvenær byrjum við?</p>
              <p className="text-2xl font-black italic uppercase tracking-tight">Miðvikudaginn 8. apríl <br /> kl. 17:30</p>
            </div>
            <div>
              <p className="text-[#c8102e] text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-90">Þátttökugjald</p>
              <p className="text-2xl font-black italic uppercase tracking-tight">15.990,-</p>
              <p className="text-xs font-bold text-white/50 uppercase mt-1">Æfingar út sumarið innifaldar</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Button
              variant="primary"
              className="w-full sm:w-auto px-12 py-6 text-xl shadow-2xl shadow-[#c8102e]/30"
              onClick={() => window.location.href = 'mailto:haukarskokk@gmail.com?subject=Skráning á nýliðanámskeið'}
            >
              Skrá mig núna
            </Button>
            <div className="flex items-center justify-center gap-4 px-8 py-5 w-full sm:w-auto rounded-[1.25rem] bg-white/5 border border-white/10 backdrop-blur-md shadow-xl">
              <span className="material-symbols-outlined text-[#c8102e] text-3xl">location_on</span>
              <div className="text-left">
                <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Mæting</p>
                <p className="text-lg font-black uppercase italic tracking-tight">Ásvellir</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Side (The Floating Grid) */}
        <div className="w-full lg:w-auto flex flex-col gap-5 animate-fadeInRight">
          <div className="mb-2 text-center lg:text-left">
            <p className="text-white/40 text-xs font-black uppercase tracking-[0.3em]">Æfingatímar</p>
          </div>
          {[
            { day: 'Mánudagar', time: '17:30', icon: 'schedule' },
            { day: 'Miðvikudagar', time: '17:30', icon: 'event_repeat' },
            { day: 'Laugardagar', time: '09:00', icon: 'wb_sunny' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-[1.25rem] w-full flex items-center justify-between gap-12 hover:bg-[#c8102e] hover:border-transparent hover:scale-105 hover:-translate-x-2 transition-all duration-500 cursor-default shadow-xl group">
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-white/30 group-hover:text-white transition-colors">{item.icon}</span>
                <span className="font-black uppercase italic tracking-tighter text-lg">{item.day}</span>
              </div>
              <span className="text-sm font-black bg-white text-[#1c2c6c] px-4 py-1.5 rounded-xl shadow-lg">{item.time}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Decorative Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1c2c6c]/20 to-transparent pointer-events-none"></div>
    </section>
  );
}
