import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { schedulesData } from '../data/schedulesData';

export default function AefingataflaDetail() {
  const { id } = useParams();
  const schedule = schedulesData[id];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!schedule) {
    return (
      <main className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <span className="material-symbols-outlined text-[64px] text-gray-300 mb-4">event_busy</span>
        <h1 className="text-3xl font-black text-[#1c2c6c] uppercase italic mb-2">Æfingatafla fannst ekki</h1>
        <p className="text-gray-500 mb-8">Við fundum ekki æfingatöflu fyrir þessa deild.</p>
        <Link to="/aefingatoflur" className="bg-[#c8102e] text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-red-800 transition-colors">
          Til baka í yfirlit
        </Link>
      </main>
    );
  }

  return (
    <main className="w-full bg-white min-h-screen pb-20 font-sans">
      
      {/* 1. Hero Section */}
      <div className={`bg-gradient-to-br ${schedule.gradient} text-white pt-24 pb-16 px-6 text-center relative overflow-hidden shadow-md`}>
        <span className="material-symbols-outlined text-[300px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none -rotate-12">
          {schedule.icon}
        </span>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20 mb-8 shadow-sm">
            <span className="material-symbols-outlined text-white text-[18px]">{schedule.icon}</span>
            <span className="text-white text-xs font-black uppercase tracking-widest">
              Æfingatafla
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black italic tracking-tighter uppercase mb-6 drop-shadow-lg leading-none">
            {schedule.sport} 
            {schedule.gender && (
              <>
                <br className="md:hidden" />
                <span className="text-white/80 md:ml-4">{schedule.gender}</span>
              </>
            )}
          </h1>
          
          <p className="text-white/70 font-bold text-lg uppercase tracking-[0.2em] mb-4">
            {schedule.season}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-16">
        
        {/* 2. Flokkar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 md:mb-16">
          {schedule.flokkar.map((flokkur, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col">
              
              {/* Card Header */}
              <div className="bg-gray-50 px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tight text-[#1c2c6c]">
                    {flokkur.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">
                    {flokkur.years}
                  </p>
                </div>
              </div>

              {/* Coaches Section */}
              {flokkur.coaches && flokkur.coaches.length > 0 && (
                <div className="px-6 py-4 bg-[#1c2c6c]/5 border-b border-[#1c2c6c]/10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1c2c6c]/60 mb-2">Þjálfarar</h4>
                  <div className="space-y-2">
                    {flokkur.coaches.map((coach, cIdx) => (
                      <div key={cIdx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                        <span className="font-bold text-[#1c2c6c] text-sm">{coach.name}</span>
                        <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                          {coach.phone && (
                            <a href={`tel:${coach.phone.replace(/-/g, '')}`} className="flex items-center gap-1 hover:text-[#c8102e] transition-colors">
                              <span className="material-symbols-outlined text-[14px]">phone</span> {coach.phone}
                            </a>
                          )}
                          {coach.email && (
                            <a href={`mailto:${coach.email}`} className="flex items-center gap-1 hover:text-[#c8102e] transition-colors truncate max-w-[150px] sm:max-w-none">
                              <span className="material-symbols-outlined text-[14px]">mail</span> {coach.email}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Schedule Table */}
              <div className="p-6 flex-grow">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {flokkur.sessions.map((session, sIdx) => (
                      <tr key={sIdx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                        <td className="py-3 pr-4 w-1/3">
                          <span className="font-bold text-[#1c2c6c] text-sm">{session.day}</span>
                        </td>
                        <td className="py-3 px-4 w-1/3">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-gray-700 text-xs font-black uppercase tracking-wider">
                            <span className="material-symbols-outlined text-[14px] text-gray-400">schedule</span>
                            {session.time}
                          </div>
                        </td>
                        <td className="py-3 pl-4 w-1/3 text-right">
                          <span className="text-xs font-medium text-gray-500 flex items-center justify-end gap-1">
                            <span className="material-symbols-outlined text-[14px] text-[#c8102e]">location_on</span>
                            {session.location}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          ))}
        </div>

        {/* 3. Specials Section (Afreksskóli, Markmenn, etc) */}
        {schedule.specials && schedule.specials.length > 0 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-200 flex-grow"></div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-gray-400">
                Sértækar Æfingar
              </h2>
              <div className="h-px bg-gray-200 flex-grow"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schedule.specials.map((special, idx) => (
                <div key={idx} className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
                  <h3 className="text-lg font-black uppercase text-[#1c2c6c] mb-1">{special.title}</h3>
                  {special.subtitle && <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">{special.subtitle}</p>}
                  {!special.subtitle && <div className="h-4"></div>}

                  {special.coaches && special.coaches.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Þjálfarar</div>
                      <div className="text-sm font-bold text-[#1c2c6c]">
                        {special.coaches.map(c => c.name).join(', ')}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2 mt-4">
                    {special.sessions.map((session, sIdx) => (
                      <div key={sIdx} className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col gap-1">
                        <span className="text-xs font-bold text-[#c8102e] uppercase">{session.day}</span>
                        <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                          <span>{session.time}</span>
                          <span className="text-xs text-gray-400">{session.location !== '-' ? session.location : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
