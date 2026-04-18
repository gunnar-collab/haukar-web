import { useEffect } from 'react';
import Button from '../components/Button';

export default function Sagan() {
  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const milestones = [
    {
      year: '1931',
      title: 'Stofnun Félagsins',
      desc: 'Íþróttafélagið Haukar var stofnað þann 12. apríl 1931 að frumkvæði ungra pilta úr KFUM í Hafnarfirði. Upphaflega stóð til að æfa eingöngu knattspyrnu.',
      icon: 'sports_soccer'
    },
    {
      year: '1955',
      title: 'Handboltinn mætir á svæðið',
      desc: 'Handknattleiksdeild var formlega stofnuð. Þetta átti eftir að breyta sögu félagsins að eilífu og leggja grunninn að einu sigursælasta handboltaliði Íslandssögunnar.',
      icon: 'sports_handball'
    },
    {
      year: '2000',
      title: 'Gullöldin hefst',
      desc: 'Meistaraflokkur karla í handbolta vinnur sinn fyrsta Íslandsmeistaratitil. Sönn gullöld hefst þar sem titlarnir söfnuðust í hús á Ásvöllum á næstu tveimur áratugum.',
      icon: 'emoji_events'
    },
    {
      year: '2010',
      title: 'Ásvellir stækka',
      desc: 'Ný og glæsileg íþróttamiðstöð tekin í notkun sem umbylti allri aðstöðu fyrir iðkendur. Haukar verða stolt Hafnarfjarðar með einhverja bestu umgjörð landsins.',
      icon: 'domain'
    },
    {
      year: 'Í Dag',
      title: 'Framtíðin er Rauð',
      desc: 'Með þúsundir iðkenda, frábæra þjálfara og öflugt bakland stefnum við ótrauð áfram. Við erum Haukar, og við erum rétt að byrja.',
      icon: 'rocket_launch'
    }
  ];

  return (
    <main className="w-full bg-[#fafafa] flex-grow pt-10 md:pt-16 pb-20">
      
      {/* 1. Hero Section */}
      <div className="bg-[#c8102e] text-white py-20 px-6 text-center relative overflow-hidden shadow-md">
        
        {/* Subtle Watermark Icon */}
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none rotate-12">
          history_edu
        </span>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          
          {/* The clean, text-only Navy Blue detail */}
          <span className="text-[#1c2c6c] text-[10px] md:text-xs font-black uppercase tracking-widest mb-3 block">
            Við erum stolt af sögunni okkar
          </span>
          
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg">
            Sagan Okkar
          </h1>
          <p className="text-white/90 font-medium text-lg md:text-xl leading-relaxed max-w-2xl text-center">
            Frá KFUM piltum árið 1931 til eins stærsta og sigursælasta íþróttafélags Íslands. Þetta er okkar vegferð.
          </p>
        </div>
      </div>

      {/* 2. The Vertical Timeline */}
      <div className="max-w-5xl mx-auto px-6 py-20 relative">
        
        {/* The Central Line */}
        <div className="absolute left-[38px] md:left-1/2 top-20 bottom-20 w-1 bg-gray-200 md:-translate-x-1/2 rounded-full"></div>

        <div className="space-y-16 md:space-y-24 relative">
          {milestones.map((milestone, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={milestone.year} className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                
                {/* The Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-14 h-14 bg-white border-4 border-[#1c2c6c] rounded-full flex items-center justify-center transform md:-translate-x-1/2 z-10 shadow-md group-hover:border-[#c8102e] group-hover:scale-110 transition-all duration-300 mt-2 md:mt-0">
                  <span className="material-symbols-outlined text-[#1c2c6c] group-hover:text-[#c8102e] transition-colors">
                    {milestone.icon}
                  </span>
                </div>

                {/* Content Container */}
                <div className={`w-full pl-20 md:pl-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right md:flex md:justify-end' : 'md:pl-16 md:ml-auto md:text-left'}`}>
                  
                  <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden group-hover:-translate-y-1 w-full max-w-lg">
                    
                    {/* Decorative Gradient Line */}
                    <div className={`absolute top-0 w-full h-1 bg-gradient-to-r from-[#c8102e] to-[#1c2c6c] ${isEven ? 'right-0' : 'left-0'}`}></div>

                    <span className="inline-block text-4xl font-black text-gray-200 mb-2 italic tracking-tighter">
                      {milestone.year}
                    </span>
                    <h3 className="text-2xl font-bold text-[#1c2c6c] mb-3 uppercase tracking-tight">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 font-medium leading-relaxed">
                      {milestone.desc}
                    </p>

                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Footer Call to Action */}
      <div className="max-w-3xl mx-auto px-6 text-center pb-12 border-t border-gray-200 pt-16">
        <h3 className="text-3xl font-black italic text-[#1c2c6c] uppercase tracking-tighter mb-4">
          Næsti kafli er óskrifaður
        </h3>
        <p className="text-gray-500 font-medium mb-8">
          Við erum alltaf að leita að öflugu fólki í stúkuna og bakhjarlahópinn. Vertu hluti af framtíð Hauka.
        </p>
        <Button variant="primary" icon="favorite" className="mx-auto" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
          Gerast Bakhjarl
        </Button>
      </div>

    </main>
  );
}