import { useState } from 'react';

export default function MatchReportModal({ isOpen, onClose, match }) {
  const [activeTab, setActiveTab] = useState('atburdir'); // 'atburdir' | 'leikskyrsla'

  if (!isOpen || !match) return null;

  // Mock data for the report if not provided in match object
  const report = match.report || {
    lineup: {
      starting: [
        { number: 1, name: "Sveinn Óli Guðnason (M)" },
        { number: 4, name: "Fannar Óli Friðleifsson" },
        { number: 7, name: "Haukur Darri Pálsson" },
        { number: 9, name: "Sigurður Hrannar Þorsteinsson" },
        { number: 10, name: "Daði Snær Ingason" },
        { number: 15, name: "Andri Steinn Ingvarsson" },
        { number: 17, name: "Tómas Atli Björgvinsson" },
        { number: 18, name: "Óliver Steinar Guðmundsson" },
        { number: 21, name: "Daníel Smári Sigurðsson" },
        { number: 25, name: "Hallur Húni Þorsteinsson" },
        { number: 99, name: "Óliver Þorkelsson" }
      ],
      bench: [
        { number: 12, name: "Ísak Freyr Jóhannsson (M)" },
        { number: 5, name: "Ævar Daði Segatta" },
        { number: 8, name: "Ísak Jónsson" },
        { number: 23, name: "Guðjón Pétur Lýðsson" },
        { number: 28, name: "Alexander Árni Alves Daníelsson" },
        { number: 80, name: "Baltasar Trausti Ingvarsson" },
        { number: 82, name: "Arnar Bjarki Björgvinsson" }
      ],
      coach: "Ian David Jeffs"
    },
    events: [
      { min: 27, type: 'goal', player: "Sigurður Hrannar Þorsteinsson", team: 'Haukar' },
      { min: 30, type: 'sub', playerIn: "Pór Llorens Þórðarson", playerOut: "Marinó Hilmar Ásgeirsson", team: 'Andstæðingur' },
      { min: 50, type: 'yellow', player: "Marteinn Theodórsson", team: 'Andstæðingur' },
      { min: 56, type: 'yellow', player: "Andri Júlíusson", team: 'Andstæðingur' },
      { min: 62, type: 'sub', playerIn: "Jón Þór Finnbogason", playerOut: "Börkur Bernharð Sigmundsson", team: 'Andstæðingur' },
      { min: 67, type: 'goal', player: "Finnbogi Laxdal Aðalgeirsson", team: 'Andstæðingur' },
      { min: 69, type: 'yellow', player: "Daði Snær Ingason", team: 'Haukar' },
      { min: 71, type: 'goal', player: "Finnbogi Laxdal Aðalgeirsson", team: 'Andstæðingur' },
      { min: 76, type: 'sub', playerIn: "Guðjón Pétur Lýðsson", playerOut: "Haukur Darri Pálsson", team: 'Haukar' },
      { min: 85, type: 'sub', playerIn: "Ævar Daði Segatta", playerOut: "Sigurður Hrannar Þorsteinsson", team: 'Haukar' }
    ]
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'goal': return '⚽';
      case 'yellow': return '🟨';
      case 'red': return '🟥';
      case 'sub': return '🔄';
      default: return '•';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1c2c6c]/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header - Match Summary */}
        <div className="bg-[#1c2c6c] p-8 md:p-12 text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>

          <div className="flex flex-col items-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8">
              {match.competition} • {match.date}
            </p>
            
            <div className="flex items-center justify-center gap-8 md:gap-16 mb-8 w-full max-w-2xl">
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-3xl backdrop-blur-md mb-4 flex items-center justify-center border border-white/10">
                  {/* Placeholder for Opponent Logo */}
                  <span className="material-symbols-outlined text-4xl text-white/20">shield</span>
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter">{match.home}</h3>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-5xl md:text-7xl font-black italic tracking-tighter mb-2">
                  {match.score || `${match.homeScore} - ${match.awayScore}`}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Leik lokið</span>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-3xl backdrop-blur-md mb-4 flex items-center justify-center border border-white/10 p-4">
                  <img src="/images/logo.png" alt="Haukar" className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter">{match.away}</h3>
              </div>
            </div>

            {/* Scorer Summary */}
            <div className="flex gap-12 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <div className="text-right">
                    {report.events.filter(e => e.type === 'goal' && e.team !== 'Haukar').map((e, idx) => (
                        <div key={idx}>{e.player} {e.min}'</div>
                    ))}
                </div>
                <div className="text-left text-white/60">
                    {report.events.filter(e => e.type === 'goal' && e.team === 'Haukar').map((e, idx) => (
                        <div key={idx}>{e.player} {e.min}'</div>
                    ))}
                </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 px-8 bg-gray-50/50">
          <button 
            onClick={() => setActiveTab('atburdir')}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
              activeTab === 'atburdir' ? 'text-[#c8102e]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Atburðir
            {activeTab === 'atburdir' && <div className="absolute bottom-0 left-8 right-8 h-1 bg-[#c8102e] rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('leikskyrsla')}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
              activeTab === 'leikskyrsla' ? 'text-[#c8102e]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Leikskýrsla
            {activeTab === 'leikskyrsla' && <div className="absolute bottom-0 left-8 right-8 h-1 bg-[#c8102e] rounded-t-full"></div>}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8">
          
          {activeTab === 'atburdir' && (
            <div className="max-w-2xl mx-auto py-8">
              <div className="relative">
                {/* Center Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>
                
                <div className="space-y-12">
                  {report.events.map((event, idx) => (
                    <div key={idx} className={`relative flex items-center gap-8 ${event.team === 'Haukar' ? 'flex-row-reverse' : 'flex-row'}`}>
                      {/* Event Content */}
                      <div className={`flex-1 ${event.team === 'Haukar' ? 'text-left' : 'text-right'}`}>
                        <div className={`inline-block p-4 rounded-3xl border transition-all hover:shadow-lg ${
                            event.type === 'goal' ? 'bg-[#c8102e] text-white border-[#c8102e] shadow-xl' : 'bg-white border-gray-100 text-[#1c2c6c]'
                        }`}>
                          <div className="flex items-center gap-3">
                            {event.type === 'sub' ? (
                                <div className="text-xs">
                                    <p className="font-black italic uppercase leading-none mb-1">{event.playerIn}</p>
                                    <p className="font-bold opacity-50 text-[9px] uppercase tracking-tighter">Út: {event.playerOut}</p>
                                </div>
                            ) : (
                                <p className="text-xs font-black italic uppercase">{event.player}</p>
                            )}
                            <span className="text-lg">{getEventIcon(event.type)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Minute Marker */}
                      <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-black italic text-[#1c2c6c] shadow-sm">
                        {event.min}'
                      </div>

                      {/* Spacer for the other side */}
                      <div className="flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'leikskyrsla' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Haukar Lineup */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8102e] mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#c8102e]/20"></span>
                    Haukar • Byrjunarlið
                  </h4>
                  <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
                    {report.lineup.starting.map((player, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
                            <span className="w-6 h-6 rounded-lg bg-[#1c2c6c] text-white flex items-center justify-center text-[10px] font-black">
                                {player.number}
                            </span>
                            <span className="text-xs font-bold text-[#1c2c6c] uppercase italic tracking-tight">{player.name}</span>
                        </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-gray-200"></span>
                    Varamenn
                  </h4>
                  <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
                    {report.lineup.bench.map((player, idx) => (
                        <div key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-white transition-colors">
                            <span className="w-6 h-6 rounded-lg bg-gray-200 text-gray-400 flex items-center justify-center text-[10px] font-black">
                                {player.number}
                            </span>
                            <span className="text-xs font-bold text-gray-500 uppercase italic tracking-tight">{player.name}</span>
                        </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-[#1c2c6c]/5 rounded-3xl border border-[#1c2c6c]/10">
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1c2c6c]/40 mb-2">Þjálfari</p>
                    <p className="text-sm font-black italic uppercase text-[#1c2c6c]">{report.lineup.coach}</p>
                </div>
              </div>

              {/* Opponent Lineup (Placeholder) */}
              <div className="space-y-8 opacity-50">
                  {/* Similar structure for opponent */}
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-gray-200"></span>
                        {match.home === 'Haukar' ? match.away : match.home}
                    </h4>
                    <div className="bg-gray-100 rounded-3xl h-64 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                        Sækja gögn frá KSÍ...
                    </div>
                  </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <img src="/images/ksi-logo.png" alt="KSÍ" className="h-6 grayscale opacity-50" />
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">Opinber leikskýrsla frá KSÍ Data Engine</span>
            </div>
            <a 
                href={match.statsLink || "https://www.ksi.is"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[10px] font-black uppercase tracking-widest text-[#1c2c6c] hover:text-[#c8102e] flex items-center gap-2 transition-colors"
            >
                Sjá á ksi.is <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
        </div>

      </div>
    </div>
  );
}
