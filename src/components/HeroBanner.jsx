import heroVideo from '../assets/hero-banner.mp4';
import Button from "./Button.jsx"; 

export default function HeroBanner() {
  // Swapped h-[80vh] min-h-[600px] for min-h-screen to fill the entire monitor
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-black">
      
      {/* 1. The Looping Background Video */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 2. The Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30"></div>

      {/* 3. The Content Container */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 z-10">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="inline-block bg-[#c8102e] text-white font-bold uppercase tracking-widest text-xs px-3 py-1 rounded-full mb-4 shadow-lg">
              Velkomin á Ásvelli
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black italic tracking-tighter text-white leading-none drop-shadow-xl mb-6 max-w-4xl pr-4">
              HJARTAÐ SLÆR <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c8102e] to-red-400 pr-3">
                Í HAFNARFIRÐI
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 font-body max-w-2xl mb-8 drop-shadow-md">
              Eitt stærsta og sigursælasta íþróttafélag landsins. Við byggjum á stolti, liðsheild og óbilandi baráttuanda.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              
              <Button 
                variant="primary" 
                icon="arrow_downward" 
                iconPosition="right"
                onClick={() => window.location.href = '#news'}
              >
                Nýjustu fréttir
              </Button>

              <Button 
                variant="overlay" 
                icon="live_tv" 
                iconPosition="right"
                onClick={() => window.location.href = '/leikvakt'}
              >
                Fara á Leikjavaktina
              </Button>

            </div>
          </div>

        </div>
      </div>
      
    </section>
  );
}