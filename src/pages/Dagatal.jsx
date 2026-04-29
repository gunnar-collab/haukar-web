import { useState, useEffect, useMemo } from 'react';
import Button from '../components/Button';
import TeamLogo from '../components/sports/TeamLogo';
import leagueData from '../data/haukar_league_data.json';
import youthData from '../data/haukar_youth_data.json';
import { getVenueForTeam } from '../data/venueMap';

// Utility to generate calendar links
const getCalendarLinks = (event) => {
  const startDate = new Date(event.dateRaw).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endDate = new Date(new Date(event.dateRaw).getTime() + 2 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "");
  
  const googleUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.competition)}&location=${encodeURIComponent(event.location)}`;
  
  const icalContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${startDate}\nDTEND:${endDate}\nLOCATION:${event.location}\nDESCRIPTION:${event.competition}\nEND:VEVENT\nEND:VCALENDAR`;
  
  return { googleUrl, icalContent };
};

const downloadEventICal = (event) => {
  const { icalContent } = getCalendarLinks(event);
  const element = document.createElement("a");
  const file = new Blob([icalContent], {type: 'text/calendar'});
  element.href = URL.createObjectURL(file);
  element.download = `${event.title.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

const formatDateObj = (dateStr) => {
  if (!dateStr) return { day: '01', month: 'Jan', time: '12:00' };
  const d = new Date(dateStr);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maí', 'Jún', 'Júl', 'Ágú', 'Sep', 'Okt', 'Nóv', 'Des'];
  return {
    day: d.getDate().toString().padStart(2, '0'),
    month: months[d.getMonth()],
    time: d.getHours() > 0 ? `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}` : '19:15'
  };
};

export default function Dagatal() {
  const [activeSportFilter, setActiveSportFilter] = useState('Allt');
  const [activeAgeFilter, setActiveAgeFilter] = useState('Allir Flokkar');
  const [visibleCount, setVisibleCount] = useState(15);
  const [showCalendarMenu, setShowCalendarMenu] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setVisibleCount(15);
  }, [activeSportFilter, activeAgeFilter]);

  const events = useMemo(() => {
    const allEvents = [];
    
    // 1. Adult Matches
    const adultKeys = ['fotbolti_karla', 'fotbolti_kvenna', 'karla', 'kvenna', 'korfubolti_karla', 'korfubolti_kvenna'];
    adultKeys.forEach(key => {
      const data = leagueData[key];
      if (data && data.matches) {
        data.matches.filter(m => m.score === 'Næsti leikur' || m.score === '- - -' || !m.score).forEach(m => {
          let sport = key.includes('fotbolti') ? 'Fótbolti' : key.includes('korfubolti') ? 'Körfubolti' : 'Handbolti';
          allEvents.push({
            id: `adult_${key}_${m.date}_${m.away}`,
            dateRaw: m.date,
            ...formatDateObj(m.date),
            title: `${m.home} - ${m.away}`,
            home: m.home,
            away: m.away,
            category: sport,
            ageGroup: 'Meistaraflokkur',
            competition: m.competition,
            location: m.home === 'Haukar' ? 'Ásvellir' : getVenueForTeam(m.home, sport),
            isTicketed: true
          });
        });
      }
    });

    // 2. Youth Matches
    if (youthData && youthData.matches) {
      youthData.matches.forEach(m => {
        allEvents.push({
          id: m.id,
          dateRaw: m.date,
          ...formatDateObj(m.date),
          title: `${m.home} - ${m.away}`,
          home: m.home,
          away: m.away,
          category: m.sport,
          ageGroup: 'Yngri flokkar',
          competition: m.competition,
          location: m.venue,
          isTicketed: false,
          ablerLink: m.ablerLink
        });
      });
    }

    // 3. Club Events
    allEvents.push({
      id: 'club_1', dateRaw: '2026-05-01T14:00:00', day: '01', month: 'Maí', time: '14:00',
      title: 'Vorhátíð Hauka', home: 'Haukar', away: '', category: 'Félagið', ageGroup: 'Allir Flokkar',
      competition: 'Félagsviðburður', location: 'Ásvellir (Útisvæði)', isTicketed: false
    });

    // Filter out past events (keep events from today onwards)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = allEvents.filter(event => {
      const eventDate = new Date(event.dateRaw);
      return eventDate >= today;
    });

    return upcomingEvents.sort((a, b) => new Date(a.dateRaw) - new Date(b.dateRaw));
  }, []);

  const sportFilters = ['Allt', 'Handbolti', 'Fótbolti', 'Körfubolti', 'Félagið'];
  const ageFilters = ['Allir Flokkar', 'Meistaraflokkur', 'Yngri flokkar', 'Námskeið'];

  const filteredEvents = events.filter(e => {
    const sportMatch = activeSportFilter === 'Allt' || e.category === activeSportFilter;
    const ageMatch = activeAgeFilter === 'Allir Flokkar' || e.ageGroup === activeAgeFilter || e.category === 'Félagið';
    return sportMatch && ageMatch;
  });

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMore = filteredEvents.length > visibleCount;

  return (
    <main className="w-full bg-white min-h-screen font-sans overflow-x-hidden">
      
      {/* Hero Header */}
      <div className="pt-16 pb-12 px-6 text-center bg-white border-b border-gray-100">
        <span className="text-[#c8102e] text-[10px] font-black uppercase tracking-[0.3em] mb-3 block">
          Hvað er framundan?
        </span>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-4">
          Á döfinni
        </h1>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto">
          Allir leikir og viðburðir hjá félaginu á einum stað
        </p>
      </div>

      {/* Sticky Filter Bar */}
      <div className="sticky top-[64px] z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 shadow-sm overflow-x-auto no-scrollbar">
        <div className="max-w-5xl mx-auto px-6 flex items-center gap-2 min-w-max md:justify-center">
            {sportFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveSportFilter(filter)}
                className={`px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeSportFilter === filter 
                    ? 'bg-[#1c2c6c] text-white shadow-lg shadow-[#1c2c6c]/20 scale-105' 
                    : 'bg-gray-50 text-gray-400 border border-transparent hover:bg-gray-100'
                }`}
              >
                {filter}
              </button>
            ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          
          {/* Secondary Age Filter */}
          {activeSportFilter !== 'Félagið' && (
            <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
              {ageFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveAgeFilter(filter)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                    activeAgeFilter === filter 
                      ? 'bg-white text-[#c8102e] shadow-md border border-gray-100' 
                      : 'text-gray-400 hover:text-[#1c2c6c]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                      activeAgeFilter === filter ? 'bg-[#c8102e] scale-125' : 'bg-gray-200'
                  }`}></span>
                  {filter}
                </button>
              ))}
            </div>
          )}

        {/* The Agenda List */}
        {filteredEvents.length > 0 ? (
          <div className="space-y-6">
            {displayedEvents.map(event => (
              <div 
                key={event.id} 
                className={`group relative bg-white rounded-[2.5rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgba(28,44,108,0.08)] transition-all duration-500 border-l-[6px] ${
                    event.category === 'Handbolti' ? 'border-[#c8102e]' : 
                    event.category === 'Fótbolti' ? 'border-green-500' : 
                    event.category === 'Körfubolti' ? 'border-[#1c2c6c]' : 'border-[#D4AF37]'
                } flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12`}
              >
                
                {/* Modern Date Block */}
                <div className="flex md:flex-col items-center justify-center shrink-0 min-w-[70px] text-center border-r border-gray-100 pr-8 md:pr-0 md:border-r-0 md:border-b md:border-gray-50 md:pb-4">
                  <span className="text-[#c8102e] text-[10px] font-black uppercase tracking-[0.4em] mb-1">{event.month}</span>
                  <span className="text-4xl font-black italic text-[#1c2c6c] leading-none tracking-tighter">{event.day}</span>
                </div>

                {/* Event Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${
                             event.category === 'Handbolti' ? 'bg-[#c8102e]' : 
                             event.category === 'Fótbolti' ? 'bg-green-500' : 'bg-[#1c2c6c]'
                        }`}></span>
                        <span className="text-[#1c2c6c] text-[9px] font-black uppercase tracking-[0.2em]">
                        {event.category} • {event.ageGroup}
                        </span>
                    </div>
                    <span className="hidden md:inline text-gray-200">|</span>
                    <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {event.time}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-[#1c2c6c] mb-3 group-hover:text-[#c8102e] transition-colors">
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-[#D4AF37]">emoji_events</span>
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest text-gray-500 truncate max-w-[200px] md:max-w-none">
                            {event.competition}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[18px] text-gray-400">location_on</span>
                        </div>
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location + ' Iceland')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-[#c8102e] transition-colors"
                        >
                            {event.location}
                        </a>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto shrink-0 mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-gray-50">
                  <div className="relative flex-grow md:flex-grow-0">
                    <button 
                      onClick={() => setShowCalendarMenu(showCalendarMenu === event.id ? null : event.id)}
                      className="w-full md:w-14 h-14 flex items-center justify-center gap-3 md:gap-0 bg-white border-2 border-gray-100 text-[#1c2c6c] hover:border-[#1c2c6c] hover:bg-[#1c2c6c]/5 rounded-[1.25rem] transition-all shadow-sm"
                      title="Bæta við dagatal"
                    >
                      <span className="material-symbols-outlined text-2xl">calendar_add_on</span>
                      <span className="md:hidden text-[10px] font-black uppercase tracking-widest">Bæta við</span>
                    </button>
                    
                    {showCalendarMenu === event.id && (
                        <div className="absolute bottom-full md:bottom-auto md:top-full right-0 mb-4 md:mt-4 w-56 bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-white/20 py-3 z-[60] animate-in fade-in zoom-in-95 duration-200">
                            <div className="px-4 py-2 mb-1">
                                <p className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Veldu dagatal</p>
                            </div>
                            <a 
                                href={getCalendarLinks(event).googleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-[#1c2c6c] hover:text-white transition-all"
                                onClick={() => setShowCalendarMenu(null)}
                            >
                                <img src="https://www.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_31_2x.png" className="w-5 h-5" alt="" />
                                Google Calendar
                            </a>
                            <button 
                                onClick={() => { downloadEventICal(event); setShowCalendarMenu(null); }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-[#c8102e] hover:text-white transition-all"
                            >
                                <span className="material-symbols-outlined text-lg">apple</span>
                                Apple / Outlook
                            </button>
                        </div>
                    )}
                  </div>

                  {event.isTicketed && (
                    <a 
                      href={event.ticketLink || "https://stubb.is/haukar/tickets"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-grow md:flex-grow-0 bg-[#c8102e] text-white px-8 h-14 flex items-center justify-center rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-black transition-all shadow-xl shadow-[#c8102e]/20 hover:-translate-y-1"
                    >
                      Miðar
                    </a>
                  )}
                  {event.ablerLink && (
                    <a 
                      href={event.ablerLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-grow md:flex-grow-0 bg-[#4B5CC4] text-white px-8 h-14 flex items-center justify-center rounded-[1.25rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#3A4899] transition-all shadow-xl shadow-[#4B5CC4]/20 hover:-translate-y-1"
                    >
                      Í Abler
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
            <span className="material-symbols-outlined text-5xl text-gray-200 mb-4">event_busy</span>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-[#1c2c6c] mb-2">Engir viðburðir fundust</h3>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Reyndu að breyta leitarskilyrðum</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="bg-white border border-gray-200 text-[#1c2c6c] hover:border-[#1c2c6c] px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all shadow-sm active:scale-95"
            >
              Hlaða fleiri viðburðum
            </button>
          </div>
        )}
      </div>
    </main>
  );
}