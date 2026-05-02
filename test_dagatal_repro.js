const events = [
  {
    category: 'Fótbolti',
    ageGroup: 'Yngri flokkar',
    title: 'Haukar - Víkingur R.',
    competition: 'Íslandsmót KSÍ 5. flokkur kvenna 2026 - A lið C riðill'
  }
];

const activeSportFilter = 'Allt';
const activeAgeFilter = 'Meistaraflokkur';

const filteredEvents = events.filter(e => {
  const sportMatch = activeSportFilter === 'Allt' || e.category === activeSportFilter;
  const ageMatch = activeAgeFilter === 'Allir Flokkar' || e.ageGroup === activeAgeFilter || e.category === 'Félagið';
  return sportMatch && ageMatch;
});

console.log("Filtered length:", filteredEvents.length);
