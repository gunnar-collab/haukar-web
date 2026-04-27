import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import TeamLogo from './TeamLogo';
import matchReports from '../../data/match_reports.json';
import { parseGenericEvent } from '../../utils/matchReportUtils';
import { getPlayerSlug } from '../../utils/playerUtils';

export default function MatchReportModal({ isOpen, onClose, match }) {
  const [activeTab, setActiveTab] = useState('atburdir'); // 'atburdir' | 'leikskyrsla'

  if (!isOpen || !match) return null;

  // Detect sport
  const isBasketball = match.competition?.toLowerCase().includes('karla') || 
                       match.competition?.toLowerCase().includes('bónus deild') ||
                       match.competition?.toLowerCase().includes('1. deild') ||
                       match.competition?.toLowerCase().includes('körfu');
  const isHandball = match.competition?.toLowerCase().includes('olís') || 
                     match.competition?.toLowerCase().includes('grill') ||
                     match.competition?.toLowerCase().includes('hand');
  const isFootball = !isBasketball && !isHandball;

  const isUpcoming = match.score === 'Næsti leikur' || match.score === '- - -' || !match.score;

  // Try to load real data if ID exists
  const realReport = match.id ? matchReports[match.id] : null;

  // Transform real report events if they exist
  const parsedEvents = realReport ? realReport.events.map(e => ({
    ...parseGenericEvent(e.text, match),
    min: e.time === 'PSO' ? 120 : (parseInt(e.time.split(':')[0]) || parseInt(e.time.replace("'", "")) || 0)
  })) : null;

  const report = {
    lineup: realReport?.lineup || match.report?.lineup || null,
    opponentLineup: realReport?.opponentLineup || null,
    events: parsedEvents || match.report?.events || []
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'goal': return isBasketball ? '🏀' : (isHandball ? '🤾' : '⚽');
      case 'yellow': return '🟨';
      case 'red': return '🟥';
      case 'sub': return '🔄';
      case 'suspension': return '⏱️';
      case 'save': return '🧤';
      case 'penalty': return '🎯';
      default: return '•';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
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
                <TeamLogo teamName={match.home} className="w-16 h-16 md:w-20 md:h-20 mb-4" />
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter">{match.home}</h3>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-4xl md:text-7xl font-black italic tracking-tighter mb-2 whitespace-nowrap">
                  {isUpcoming ? 'VS' : (match.score || `${match.homeScore} - ${match.awayScore}`).replace(/\(.*?\)/g, '').trim()}
                </div>
                {match.score?.includes('vító') && (
                  <span className="text-xs font-bold text-white/60 mb-2">
                    ({match.score.match(/\((.*?)\)/)?.[1] || match.score})
                  </span>
                )}
                <span className={`text-[10px] font-black uppercase tracking-widest ${isUpcoming ? 'text-[#D4AF37]' : 'text-green-400'}`}>
                    {isUpcoming ? 'Leikur framundan' : 'Leik lokið'}
                </span>
              </div>

              <div className="flex-1 flex flex-col items-center text-center">
                <TeamLogo teamName={match.away} className="w-16 h-16 md:w-20 md:h-20 mb-4" />
                <h3 className="text-lg md:text-xl font-black uppercase italic tracking-tighter">{match.away}</h3>
              </div>
            </div>

            {/* Condensed Broadcast-Style Scorer Summary - Only if played and has events */}
            {!isUpcoming && report.events.length > 0 && (
                <div className="w-full max-w-2xl grid grid-cols-2 gap-12 mt-4 border-t border-white/10 pt-6">
                    <div className="text-right">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Markahæstu • {match.home}</p>
                        <div className="flex flex-wrap justify-end gap-x-3 gap-y-1">
                            {(() => {
                                const goalEvents = report.events.filter(e => e.type === 'goal' && (match.home === 'Haukar' ? e.team === 'Haukar' : e.team !== 'Haukar'));
                                const counts = {};
                                goalEvents.forEach(e => {
                                    const name = (e.player?.split('.').slice(1).join('.').trim() || e.player || 'Leikmaður').replace(/\s+(skorar|ver|fær|klikkar|tapar|með|fiskar).*/i, '').trim();
                                    counts[name] = (counts[name] || 0) + 1;
                                });
                                return Object.entries(counts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 3)
                                    .map(([name, count], i) => {
                                        const slug = getPlayerSlug(name);
                                        return (
                                            <Link to={`/leikmenn/${slug}`} key={i} className="text-[11px] font-black italic uppercase text-white/80 hover:text-[#D4AF37] transition-colors">
                                                {name} <span className="text-[#D4AF37] not-italic ml-0.5">{count}</span>
                                            </Link>
                                        );
                                    });
                            })()}
                        </div>
                    </div>
                    <div className="text-left border-l border-white/10 pl-12">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">Markahæstu • {match.away}</p>
                        <div className="flex flex-wrap justify-start gap-x-3 gap-y-1">
                            {(() => {
                                const goalEvents = report.events.filter(e => e.type === 'goal' && (match.away === 'Haukar' ? e.team === 'Haukar' : e.team !== 'Haukar'));
                                const counts = {};
                                goalEvents.forEach(e => {
                                    const name = (e.player?.split('.').slice(1).join('.').trim() || e.player || 'Leikmaður').replace(/\s+(skorar|ver|fær|klikkar|tapar|með|fiskar).*/i, '').trim();
                                    counts[name] = (counts[name] || 0) + 1;
                                });
                                return Object.entries(counts)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 3)
                                    .map(([name, count], i) => {
                                        const slug = getPlayerSlug(name);
                                        return (
                                            <Link to={`/leikmenn/${slug}`} key={i} className="text-[11px] font-black italic uppercase text-white/80 hover:text-[#D4AF37] transition-colors">
                                                {name} <span className="text-[#D4AF37] not-italic ml-0.5">{count}</span>
                                            </Link>
                                        );
                                    });
                            })()}
                        </div>
                    </div>
                </div>
            )}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 px-8 bg-gray-50/50">
          {!isUpcoming && (
            <button 
                onClick={() => setActiveTab('atburdir')}
                className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
                activeTab === 'atburdir' ? 'text-[#c8102e]' : 'text-gray-400 hover:text-gray-600'
                }`}
            >
                Atburðir
                {activeTab === 'atburdir' && <div className="absolute bottom-0 left-8 right-8 h-1 bg-[#c8102e] rounded-t-full"></div>}
            </button>
          )}
          <button 
            onClick={() => setActiveTab('leikskyrsla')}
            className={`px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative ${
              (activeTab === 'leikskyrsla' || isUpcoming) ? 'text-[#c8102e]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {isUpcoming ? 'Leikskýrsla / Upplýsingar' : 'Leikskýrsla'}
            {(activeTab === 'leikskyrsla' || isUpcoming) && <div className="absolute bottom-0 left-8 right-8 h-1 bg-[#c8102e] rounded-t-full"></div>}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto p-8">
          
          {activeTab === 'atburdir' && !isUpcoming && (
            <div className="max-w-2xl mx-auto py-8">
              {report.events.length > 0 ? (
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2"></div>
                    <div className="space-y-12">
                    {report.events.map((event, idx) => (
                        <div key={idx} className={`relative flex items-center gap-8 ${event.team === 'Haukar' ? 'flex-row-reverse' : 'flex-row'}`}>
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
                                    <p className="text-[11px] font-black italic uppercase leading-tight">{event.text || event.player}</p>
                                )}
                                <span className="text-lg">{event.icon || getEventIcon(event.type)}</span>
                            </div>
                            </div>
                        </div>
                        <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-gray-100 flex items-center justify-center text-xs font-black italic text-[#1c2c6c] shadow-sm">
                            {event.min}'
                        </div>
                        <div className="flex-1"></div>
                        </div>
                    ))}
                    </div>
                </div>
              ) : (
                <div className="text-center py-20 opacity-20">
                    <span className="material-symbols-outlined text-6xl mb-4">sports_score</span>
                    <p className="text-xs font-black uppercase tracking-widest">Engir atburðir skráðir</p>
                </div>
              )}
            </div>
          )}

          {(activeTab === 'leikskyrsla' || isUpcoming) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Haukar Lineup */}
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c8102e] mb-6 flex items-center gap-3">
                    <span className="w-8 h-[2px] bg-[#c8102e]/20"></span>
                    Haukar • Leikmannahópur
                  </h4>
                  {report.lineup ? (
                    <div className="bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden">
                        {report.lineup.starting.map((player, idx) => {
                            const slug = getPlayerSlug(player.name);
                            return (
                            <Link to={`/leikmenn/${slug}`} key={idx} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-white transition-colors group">
                                <span className="w-6 h-6 rounded-lg bg-[#1c2c6c] group-hover:bg-[#c8102e] transition-colors text-white flex items-center justify-center text-[10px] font-black shrink-0">
                                    {player.number}
                                </span>
                                <span className="text-xs font-bold text-[#1c2c6c] group-hover:text-[#c8102e] transition-colors uppercase italic tracking-tight flex-grow">{player.name}</span>
                                <span className="material-symbols-outlined text-gray-300 group-hover:text-[#c8102e] text-sm opacity-0 group-hover:opacity-100 transition-opacity shrink-0">chevron_right</span>
                            </Link>
                        )})}
                    </div>
                  ) : (
                    <div className="p-12 text-center bg-gray-50 rounded-3xl border border-gray-100 opacity-30">
                        <span className="material-symbols-outlined text-4xl mb-2">person_search</span>
                        <p className="text-[10px] font-black uppercase tracking-widest">Hópur ekki staðfestur</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Opponent / Venue Info */}
              <div className="space-y-8">
                  {isUpcoming ? (
                    <div className="p-8 bg-[#1c2c6c]/5 rounded-[2rem] border border-[#1c2c6c]/10">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1c2c6c] mb-6">Upplýsingar um leik</h4>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-[#D4AF37]">event</span>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1c2c6c]/40 mb-1">Dagsetning</p>
                                    <p className="text-sm font-black italic uppercase text-[#1c2c6c]">{match.date}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-[#D4AF37]">location_on</span>
                                <div>
                                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1c2c6c]/40 mb-1">Leikvöllur</p>
                                    <p className="text-sm font-black italic uppercase text-[#1c2c6c]">{match.venue || 'TBA'}</p>
                                </div>
                            </div>
                            <div className="pt-6">
                                <a 
                                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((match.venue || 'Haukar') + ', Iceland')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-[#1c2c6c] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-colors"
                                >
                                    Opna í kortum <span className="material-symbols-outlined text-sm">map</span>
                                </a>
                            </div>
                        </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6 flex items-center gap-3">
                          <span className="w-8 h-[2px] bg-gray-200"></span>
                          {match.home === 'Haukar' ? match.away : match.home}
                      </h4>
                      <div className="bg-gray-100 rounded-3xl h-64 flex items-center justify-center text-[10px] font-black uppercase tracking-widest text-gray-300">
                          {isFootball ? 'Sækja gögn frá KSÍ...' : 'Tölfræði í vinnslu...'}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
                {isFootball && <img src="/images/ksi-logo.png" alt="KSÍ" className="h-6 grayscale opacity-50" />}
                {isBasketball && <span className="text-[12px] font-black italic text-[#1c2c6c]">KKÍ</span>}
                {isHandball && <span className="text-[12px] font-black italic text-[#c8102e]">HSÍ</span>}
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest italic">
                    Opinber gögn frá {isBasketball ? 'KKÍ Data Engine' : (isHandball ? 'HSÍ Mótakerfi' : 'KSÍ Data Engine')}
                </span>
            </div>
            {!isUpcoming && (
                <a 
                    href={match.statsLink || (isBasketball ? "https://www.kki.is" : (isHandball ? "https://www.hsi.is" : "https://www.ksi.is"))} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-black uppercase tracking-widest text-[#1c2c6c] hover:text-[#c8102e] flex items-center gap-2 transition-colors"
                >
                    Sjá á {isBasketball ? 'kki.is' : (isHandball ? 'hsi.is' : 'ksi.is')} <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
            )}
        </div>

      </div>
    </div>,
    document.body
  );
}
