import { Link } from 'react-router-dom';

export default function RosterPreview({ players, loading, title, subtitle, isKarate = false }) {
  return (
    <div className="lg:col-span-2">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter text-[#c8102e] uppercase">{title}</h2>
          <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
        </div>
        {!isKarate && (
          <Link to="/leikmannahopur" className="text-[#1c2c6c] text-sm font-bold uppercase tracking-widest hover:text-[#c8102e] transition-colors flex items-center gap-1 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100" aria-label={`Sjá allan ${title.toLowerCase()}`}>
            Sjá alla <span className="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_forward</span>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10"></div>
        )}
        {players.map((player) => {
          const Wrapper = isKarate ? 'div' : Link;
          const wrapperProps = isKarate ? { key: player.slug } : { to: `/leikmenn/${player.slug}`, state: { player }, key: player.number };

          return (
            <Wrapper 
              {...wrapperProps}
              className={`group relative overflow-hidden rounded-2xl bg-gray-200 aspect-[3/4] ${!isKarate ? 'cursor-pointer' : ''} shadow-lg block border border-transparent hover:border-[#c8102e]/50`}
            >
              <img src={player.img} alt={player.name} className="absolute inset-0 w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c2c6c] via-[#1c2c6c]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              
              {isKarate ? (
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm px-3 py-1 rounded border border-white/20 shadow-md">
                  <span className="text-xs font-black italic tracking-widest text-white drop-shadow-md">
                    {player.number}
                  </span>
                </div>
              ) : (
                <div className="absolute top-4 left-4">
                  <span className="text-4xl font-black italic tracking-tighter text-white/30 group-hover:text-[#c8102e] transition-colors duration-300 drop-shadow-md">
                    {player.number}
                  </span>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#1c2c6c] bg-white/90 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest mb-2 inline-block shadow-sm">{player.position}</p>
                <h3 className="text-white text-xl font-black italic tracking-tight uppercase drop-shadow-md">{player.name}</h3>
              </div>
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
