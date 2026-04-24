import { useState, useEffect } from 'react';
import Button from '../components/Button';

export default function Dagatal() {
  const [activeFilter, setActiveFilter] = useState('Allt');
  const [visibleCount, setVisibleCount] = useState(10);

  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(10);
  }, [activeFilter]);

  // Real Event Data from KSÍ, KKÍ, and HBStatz
  const events = [
    { id: 1, date: '24. Apr', time: '19:15', title: 'Keflavík - Haukar (K)', category: 'Körfubolti', location: 'Keflavík', competition: 'Bónus deild kvenna - Úrslit', isTicketed: true },
    { id: 2, date: '25. Apr', time: '12:00', title: 'RKVN 2 - Haukar', category: 'Fótbolti', location: 'Nettóhöllin', competition: 'Íslandsmót KSÍ 5. fl. kv. - D lið C riðill', isTicketed: false },
    { id: 3, date: '25. Apr', time: '13:00', title: 'ÍR/Léttir - Haukar/KÁ', category: 'Fótbolti', location: 'ÍR-völlur', competition: 'Íslandsmót KSÍ 2. fl. ka. - A lið B deild', isTicketed: false },
    { id: 4, date: '25. Apr', time: '13:00', title: 'Haukar - FH 2', category: 'Fótbolti', location: 'BIRTU völlurinn', competition: 'Íslandsmót KSÍ 4. fl. ka. - A lið D deild', isTicketed: false },
    { id: 5, date: '25. Apr', time: '14:00', title: 'Víkingur Ó. - Haukar', category: 'Fótbolti', location: 'Ólafsvíkurvöllur', competition: 'Lengjubikar karla 2026 - B deild Úrslit', isTicketed: true },
    { id: 6, date: '25. Apr', time: '16:00', title: 'KA/Þór - Haukar (K)', category: 'Handbolti', location: 'KA-heimilið', competition: 'Úrslitakeppni Olís deild kvenna', isTicketed: true },
    { id: 7, date: '25. Apr', time: '19:15', title: 'Selfoss - Haukar (M)', category: 'Körfubolti', location: 'Selfoss', competition: '1. deild karla - Úrslit', isTicketed: true },
    { id: 8, date: '26. Apr', time: '10:00', title: 'Haukar - Grótta', category: 'Fótbolti', location: 'BIRTU völlurinn', competition: 'Íslandsmót KSÍ 5. fl. ka. - A lið C riðill', isTicketed: false },
    { id: 9, date: '26. Apr', time: '13:00', title: 'Haukar - Grótta', category: 'Fótbolti', location: 'BIRTU völlurinn', competition: 'Íslandsmót KSÍ 5. fl. ka. - C lið C riðill', isTicketed: false },
    { id: 10, date: '27. Apr', time: '16:00', title: 'Haukar - Þróttur R.', category: 'Fótbolti', location: 'BIRTU völlurinn', competition: 'Íslandsmót KSÍ 5. fl. kv. - A lið C riðill', isTicketed: false },
    { id: 11, date: '28. Apr', time: '19:15', title: 'Haukar - Keflavík (K)', category: 'Körfubolti', location: 'Ásvellir', competition: 'Bónus deild kvenna - Úrslit', isTicketed: true },
    { id: 12, date: '29. Apr', time: '19:15', title: 'Haukar - Selfoss (M)', category: 'Körfubolti', location: 'Ásvellir', competition: '1. deild karla - Úrslit', isTicketed: true },
    { id: 13, date: '30. Apr', time: '18:00', title: 'Valur - Haukar (K)', category: 'Fótbolti', location: 'Origo-völlurinn', competition: 'Lengjubikar kvenna - Úrslit', isTicketed: true },
    { id: 14, date: '01. Maí', time: '14:00', title: 'Haukar - ÍBV (M)', category: 'Fótbolti', location: 'Ásvellir', competition: '2. deild karla', isTicketed: true },
    { id: 15, date: '01. Maí', time: '14:00', title: 'Vorhátíð Hauka', category: 'Félagið', location: 'Ásvellir (Útisvæði)', competition: 'Félagsviðburður', isTicketed: false },
    { id: 16, date: '02. Maí', time: '14:00', title: 'Grótta - Haukar (K)', category: 'Fótbolti', location: 'Vivaldivöllurinn', competition: 'Lengjudeild kvenna', isTicketed: true },
  ];

  const filters = ['Allt', 'Handbolti', 'Fótbolti', 'Körfubolti', 'Félagið'];

  const filteredEvents = activeFilter === 'Allt' 
    ? events 
    : events.filter(e => e.category === activeFilter);

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
        
        {/* The Filter Strip */}
        <div className="flex flex-wrap justify-center gap-3">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-sm ${
                activeFilter === filter 
                  ? 'bg-[#1c2c6c] text-white scale-105' 
                  : 'bg-white text-gray-500 border border-gray-200 hover:border-[#1c2c6c] hover:text-[#1c2c6c]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* The Agenda List */}
      <div className="max-w-4xl mx-auto px-6">
        {filteredEvents.length > 0 ? (
          <div className="space-y-4">
            {displayedEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-6 group">
                
                {/* Date Block */}
                <div className="flex md:flex-col items-center justify-center bg-gray-50 md:w-24 px-4 py-3 md:py-4 rounded-xl border border-gray-100 shrink-0 gap-2 md:gap-0 self-end md:self-auto">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{event.date.split('.')[1]}</span>
                  <span className="text-2xl md:text-3xl font-black italic text-[#c8102e] leading-none">{event.date.split('.')[0]}</span>
                </div>

                {/* Event Details */}
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#1c2c6c] text-[10px] font-bold uppercase tracking-widest bg-[#1c2c6c]/5 px-2 py-1 rounded">
                      {event.category}
                    </span>
                    <span className="text-gray-400 text-xs font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {event.time}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-[#1c2c6c] uppercase tracking-tight mb-2 group-hover:text-[#c8102e] transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {event.location}
                    </p>
                    <p className="text-gray-400 text-[11px] font-bold uppercase tracking-tight flex items-center gap-1 pl-0.5">
                      <span className="material-symbols-outlined text-[14px]">emoji_events</span>
                      {event.competition}
                    </p>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="w-full md:w-auto flex md:flex-col gap-3 shrink-0 mt-4 md:mt-0">
                  {event.isTicketed && (
                    <Button variant="secondary" size="sm" icon="local_activity" className="w-full justify-center">
                      Miðar
                    </Button>
                  )}
                  <button className="flex items-center justify-center gap-1 text-xs font-bold text-gray-400 hover:text-[#1c2c6c] transition-colors w-full uppercase tracking-wider py-2">
                    <span className="material-symbols-outlined text-[16px]">calendar_add_on</span>
                    Bæta við
                  </button>
                </div>

              </div>
            ))}

            {hasMore && (
              <div className="pt-8 flex justify-center">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 10)}
                  className="group flex flex-col items-center gap-2"
                >
                  <span className="text-[#1c2c6c] text-xs font-black uppercase tracking-[0.2em] group-hover:text-[#c8102e] transition-colors">
                    Sjá fleiri viðburði
                  </span>
                  <div className="w-12 h-12 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:border-[#c8102e] group-hover:bg-[#c8102e]/5 transition-all duration-300">
                    <span className="material-symbols-outlined text-gray-400 group-hover:text-[#c8102e] animate-bounce">expand_more</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 border-dashed">
            <span className="material-symbols-outlined text-[48px] text-gray-300 mb-4">event_busy</span>
            <h3 className="text-xl font-black text-gray-400 uppercase tracking-tight">Engir viðburðir fundust</h3>
          </div>
        )}
      </div>
    </main>
  );
}