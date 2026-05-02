import fs from 'fs';

const parseMatchDate = (dateStr) => {
  if (!dateStr) return new Date();
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim());
  if (isDateOnly) {
    return new Date(`${dateStr.trim()}T19:15:00`);
  }
  const d = new Date(dateStr);
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0) {
    d.setHours(19, 15, 0, 0);
  }
  return d;
};

const rawData = fs.readFileSync('./src/data/haukar_league_data.json', 'utf8');
const leagueData = JSON.parse(rawData);

const allEvents = [];
const now = new Date();
now.setHours(0,0,0,0);

const match = leagueData.fotbolti_kvenna.matches.find(m => m.competition === 'Íslandsmót KSÍ 5. flokkur kvenna 2026 - A lið C riðill');

const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
let category = 'Fótbolti';

allEvents.push({
  category,
  ageGroup: isYouth ? 'Yngri flokkar' : 'Meistaraflokkur',
  competition: match.competition
});

const activeSportFilter = 'Allt';
const activeAgeFilter = 'Meistaraflokkur';

const filteredEvents = allEvents.filter(e => {
  const sportMatch = activeSportFilter === 'Allt' || e.category === activeSportFilter;
  const ageMatch = activeAgeFilter === 'Allir Flokkar' || e.ageGroup === activeAgeFilter || e.category === 'Félagið';
  return sportMatch && ageMatch;
});

console.log("Filtered events length:", filteredEvents.length);
console.log("Event age group:", allEvents[0].ageGroup);

