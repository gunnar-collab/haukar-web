import { useState, useEffect, useMemo } from 'react';
import Button from '../components/Button';
import TeamLogo from '../components/sports/TeamLogo';
import leagueData from '../data/haukar_league_data.json';
import youthData from '../data/haukar_youth_data.json';

// Utility to generate a calendar file download
const downloadICal = () => {
  const element = document.createElement("a");
  const file = new Blob(["BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Haukar//NONSGML v1.0//EN\nBEGIN:VEVENT\nUID:123456\nDTSTAMP:20260426T120000Z\nDTSTART:20260502T120000Z\nDTEND:20260502T140000Z\nSUMMARY:Haukar Leikur\nEND:VEVENT\nEND:VCALENDAR"], {type: 'text/calendar'});
  element.href = URL.createObjectURL(file);
  element.download = "haukar_dagatal.ics";
  document.body.appendChild(element);
  element.click();
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
        data.matches.filter(m => m.score === 'Næsti leikur' || m.score === '- - -').forEach(m => {
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
            location: m.home === 'Haukar' ? 'Ásvellir' : 'Útivöllur',
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
    <main className="w-full bg-[#fafafa] min-h-screen pt-10 md:pt-16 pb-20 font-sans">
      
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
        <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block">
          Hvað er framundan?
        </span>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-8">
          Á döfinni
        </h1>
        
        <div className="flex flex-col items-center gap-4">
          {/* Top Row: Export Button */}
          <div className="flex justify-end w-full mb-2">
            <button 
              onClick={downloadICal}
              className="flex items-center gap-2 bg-[#1c2c6c]/10 text-[#1c2c6c] hover:bg-[#1c2c6c] hover:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
              Bæta við dagatal
            </button>
          </div>

          {/* Primary Filters (Sport) */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full">
            {sportFilters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveSportFilter(filter)}
                className={`px-4 md:px-6 py-2.5 rounded-full text-[11px] md:text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                  activeSportFilter === filter 
                    ? 'bg-[#1c2c6c] text-white scale-105' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-[#1c2c6c] hover:text-[#1c2c6c]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Secondary Filters (Age Group) */}
          {activeSportFilter !== 'Félagið' && (
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 w-full mt-2 p-2 bg-gray-100 rounded-2xl max-w-fit mx-auto border border-gray-200/50">
              {ageFilters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveAgeFilter(filter)}
                  className={`px-4 md:px-5 py-2 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeAgeFilter === filter 
                      ? 'bg-white text-[#c8102e] shadow-sm border border-gray-200' 
                      : 'text-gray-400 hover:text-[#1c2c6c]'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* The Agenda List */}
      <div className="max-w-4xl mx-auto px-6">
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {displayedEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-6 group">
                
                {/* Date Block */}
                <div className="flex md:flex-col items-center justify-center bg-gray-50 md:w-24 px-4 py-3 md:py-4 rounded-xl border border-gray-100 shrink-0 gap-2 md:gap-0 self-start md:self-stretch h-full">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{event.month}</span>
                  <span className="text-2xl md:text-3xl font-black italic text-[#c8102e] leading-none">{event.day}</span>
                </div>

                {/* Team Logo (If not Félagið) */}
                {event.category !== 'Félagið' && (
                  <div className="hidden md:flex items-center justify-center gap-2 shrink-0 w-28">
                    {event.ageGroup === 'Námskeið' ? (
                      <TeamLogo teamName="Haukar" className="w-12 h-12" />
                    ) : (
                      <>
                        <TeamLogo teamName={event.home} className="w-10 h-10" />
                        <span className="text-gray-300 text-[10px] font-black italic">VS</span>
                        <TeamLogo teamName={event.away} className="w-10 h-10" />
                      </>
                    )}
                  </div>
                )}

                {/* Event Details */}
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[#1c2c6c] text-[10px] font-bold uppercase tracking-widest bg-[#1c2c6c]/5 border border-[#1c2c6c]/10 px-2 py-1 rounded">
                      {event.category}
                    </span>
                    {event.ageGroup && event.ageGroup !== 'Allir Flokkar' && (
                      <span className="text-[#c8102e] text-[9px] font-bold uppercase tracking-widest bg-[#c8102e]/5 border border-[#c8102e]/10 px-2 py-1 rounded">
                        {event.ageGroup}
                      </span>
                    )}
                    <span className="text-gray-400 text-xs font-bold flex items-center gap-1 ml-auto md:ml-0">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {event.time}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-[#1c2c6c] mb-1">
                    {event.title}
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-500 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#c8102e]">emoji_events</span>
                      <span className="truncate max-w-[200px]" title={event.competition}>{event.competition}</span>
                    </span>
                    <span className="hidden sm:inline text-gray-300">•</span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-gray-400">location_on</span>
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row md:flex-col items-center justify-end gap-2 w-full md:w-auto shrink-0 mt-4 md:mt-0 self-stretch">
                  {event.isTicketed && (
                    <Button variant="primary" className="w-full md:w-32 py-2.5 text-xs">
                      Miðar
                    </Button>
                  )}
                  {event.ablerLink && (
                    <a 
                      href={event.ablerLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-32 flex items-center justify-center gap-1.5 bg-[#4B5CC4] hover:bg-[#3A4899] text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all shadow-md"
                    >
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      Í Abler
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">event_busy</span>
            <h3 className="text-xl font-bold text-[#1c2c6c] mb-1">Engir viðburðir fundust</h3>
            <p className="text-gray-500">Reyndu að breyta leitarskilyrðum eða velja annan flokk.</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 10)}
              className="bg-white border-2 border-gray-200 text-gray-600 hover:border-[#1c2c6c] hover:text-[#1c2c6c] px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-sm"
            >
              Hlaða fleiri viðburðum
            </button>
          </div>
        )}
      </div>
    </main>
  );
}