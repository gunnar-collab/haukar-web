import { useMatch } from '../context/MatchContext';

export default function Leikvakt() {
  const { minutes, seconds, haukarScore, fhScore, events } = useMatch();

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 pt-10 md:pt-16 pb-12 flex-grow w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#c8102e]/10 text-[#c8102e] text-xs font-bold uppercase tracking-widest rounded mb-3">
            <span className="w-2 h-2 rounded-full bg-[#c8102e] animate-pulse"></span>
            Bein Útsending - Hafnarfjarðarslagurinn
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#c8102e] italic tracking-tighter uppercase">
            Haukar vs FH
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Olís deild karla • Ásvellir • Áhorfendur: 2,450 (UPPSELT)
          </p>
        </div>
        
        <div className="flex flex-col items-end">
           <div className="text-sm font-bold text-gray-500 mb-1 tracking-widest bg-gray-100 px-3 py-1 rounded-full shadow-inner animate-pulse">
             {minutes}:{seconds.toString().padStart(2, '0')}
           </div>
           <div className="flex items-center gap-6 text-5xl md:text-6xl font-black italic tracking-tighter">
             <span className="text-[#1c2c6c]">{haukarScore}</span>
             <span className="text-[#c8102e] mb-2">-</span>
             <span className="text-gray-400">{fhScore}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-black rounded-xl overflow-hidden shadow-xl aspect-video relative border-4 border-[#1c2c6c] group">
            <iframe 
              className="w-full h-full absolute top-0 left-0 rounded-lg shadow-inner"
              src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1&loop=1&playlist=LXb3EKWsInQ" 
              title="Leikvakt Útsending" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:border-[#1c2c6c] transition-colors cursor-default">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Skotnýting</p>
              <p className="text-2xl font-black text-[#1c2c6c]">62%</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:border-[#1c2c6c] transition-colors cursor-default">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Varin Skot</p>
              <p className="text-2xl font-black text-[#1c2c6c]">14</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:border-[#1c2c6c] transition-colors cursor-default">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Hraðaupphlaup</p>
              <p className="text-2xl font-black text-[#1c2c6c]">8</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-center hover:border-[#c8102e] transition-colors cursor-default">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Brottvísanir</p>
              <p className="text-2xl font-black text-[#c8102e]">2 Mín</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col h-[500px] lg:h-[600px] overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
            <h3 className="font-black italic uppercase tracking-widest text-sm text-[#1c2c6c]">Leiklýsing</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100 flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               Bein Uppfærsla
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {events.map((event, index) => (
              <div 
                key={event.id} 
                className={`flex gap-4 transition-all duration-500 
                  ${index === 0 ? 'opacity-100 scale-100 bg-gray-50 -mx-4 px-4 py-3 rounded-xl border border-gray-100' : 'opacity-70 scale-95'}`}
              >
                <div className={`text-sm font-black uppercase tracking-widest w-14 pt-1 ${event.type === 'goal_haukar' ? 'text-[#c8102e]' : 'text-gray-400'}`}>
                  {event.time}
                </div>
                <div>
                  <p className={`font-bold ${event.type === 'goal_haukar' ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
