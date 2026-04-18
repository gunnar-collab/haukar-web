export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden bg-[#1c2c6c]">
      
      {/* 1. The Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/hero-banner.mp4" type="video/mp4" />
      </video>

      {/* 2. The Cinematic Red Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#c8102e]/90 via-[#c8102e]/40 to-black/40 z-10 mix-blend-multiply"></div>

      {/* 3. The Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 w-full text-center md:text-left">
        
        {/* FIXED: Changed from red to white so it doesn't vanish into the background */}
        <span className="text-white text-sm md:text-base font-bold uppercase tracking-widest mb-4 block drop-shadow-md">
          Knattspyrnufélagið Haukar
        </span>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black italic tracking-tighter text-white leading-none mb-6 uppercase drop-shadow-lg">
          Hjartað í<br />
          {/* FIXED: Changed from red to Navy Blue to create an aggressive, premium contrast */}
          <span className="text-[#1c2c6c] drop-shadow-2xl">Hafnarfirði</span>
        </h1>
        
        <p className="text-white text-lg md:text-xl font-medium max-w-2xl mb-10 mx-auto md:mx-0 drop-shadow-md">
          Stolt, liðsheild og óbilandi baráttuandi. Vertu með í ferðalaginu og styddu þitt lið til sigurs á Ásvöllum.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          
          {/* FIXED: Swapped button to Navy Blue so it pops off the red video overlay */}
          <button className="bg-[#1c2c6c] text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-blue-900 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">confirmation_number</span>
            Kaupa miða
          </button>
          
          <button className="bg-white text-[#1c2c6c] px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-xl">shopping_cart</span>
            Vefverslun
          </button>
          
        </div>
      </div>
      
    </section>
  );
}