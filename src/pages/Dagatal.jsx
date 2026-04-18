import { useState, useEffect } from 'react';
import Button from '../components/Button';

export default function Dagatal() {
  const [activeFilter, setActiveFilter] = useState('Allt');

  // Always snap to the top when navigating to this page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock Event Data (This is what we will eventually replace with Abler data!)
  const events = [
    { id: 1, date: '20. Apr', time: '19:30', title: 'Haukar - Valur', category: 'Handbolti', location: 'Ásvellir', isTicketed: true },
    { id: 2, date: '22. Apr', time: '18:00', title: 'Styrktarmót Ungmennaráðs', category: 'Félagið', location: 'Ásvellir (Veislusalur)', isTicketed: false },
    { id: 3, date: '25. Apr', time: '20:15', title: 'Haukar - Keflavík', category: 'Körfubolti', location: 'Ásvellir', isTicketed: true },
    { id: 4, date: '01. Maí', time: '14:00', title: 'Vorhátíð Hauka', category: 'Félagið', location: 'Ásvellir (Útisvæði)', isTicketed: false },
    { id: 5, date: '05. Maí', time: '19:15', title: 'Haukar - FH', category: 'Fótbolti', location: 'Ásvellir (Gervigras)', isTicketed: true },
  ];

  const filters = ['Allt', 'Handbolti', 'Fótbolti', 'Körfubolti', 'Félagið'];

  const filteredEvents = activeFilter === 'Allt' 
    ? events 
    : events.filter(e => e.category === activeFilter);

  return (
    <main className="w-full bg-[#fafafa] min-h-screen pt-10 md:pt-16 pb-20 font-sans">
      
      {/* Hero Header */}
      <div className="max-w-5xl mx-auto px-6 mb-12 text-center">
        <span className="text-[#c8102e] text-sm font-black uppercase tracking-widest mb-2 block">
          Hvað er framundan?
        </span>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#1c2c6c] uppercase mb-8">
          Viðburðadagatal
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
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row items-start md:items-center gap-6 group">
                
                {/* Date Block */}
                <div className="flex md:flex-col items-center justify-center bg-gray-50 md:w-24 px-4 py-3 md:py-4 rounded-xl border border-gray-100 shrink-0 gap-2 md:gap-0">
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
                  <p className="text-gray-500 text-sm font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                    {event.location}
                  </p>
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