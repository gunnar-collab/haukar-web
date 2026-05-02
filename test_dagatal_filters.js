import fs from 'fs';

const rawData = fs.readFileSync('./src/data/haukar_league_data.json', 'utf8');
const leagueData = JSON.parse(rawData);

const rawYouth = fs.readFileSync('./src/data/haukar_youth_data.json', 'utf8');
const youthData = JSON.parse(rawYouth);

const parseMatchDate = (dateStr) => {
  if (!dateStr) return new Date();
  if (dateStr.includes('T')) return new Date(dateStr);
  return new Date(`${dateStr}T19:15:00`);
};

const events = [];
const now = new Date();
now.setHours(0,0,0,0);

const keys = ['fotbolti_karla', 'fotbolti_kvenna', 'karla', 'kvenna', 'korfubolti_karla', 'korfubolti_kvenna'];
keys.forEach(key => {
  if (leagueData[key] && leagueData[key].matches) {
    leagueData[key].matches.forEach(match => {
      const matchDate = parseMatchDate(match.date);
      const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
      let category = 'Félagið';
      if (key.includes('fotbolti')) category = 'Fótbolti';
      else if (key.includes('korfubolti')) category = 'Körfubolti';
      else if (key.includes('karla') || key.includes('kvenna')) category = 'Handbolti';
      
      const isUpcoming = (match.score === 'Næsti leikur' || match.score === '- - -' || match.score === '-' || !match.score) && matchDate >= now;
      
      if (isUpcoming) {
        events.push({ category, ageGroup: isYouth ? 'Yngri flokkar' : 'Meistaraflokkur', title: `${match.home} - ${match.away}` });
      }
    });
  }
});

if (youthData.matches) {
  youthData.matches.forEach(m => {
    const matchDate = parseMatchDate(m.date);
    if (matchDate >= now) {
      events.push({ category: m.sport, ageGroup: 'Yngri flokkar', title: `${m.home} - ${m.away}` });
    }
  });
}

const filters = [
  { sport: 'Allt', age: 'Allir Flokkar' },
  { sport: 'Handbolti', age: 'Allir Flokkar' },
  { sport: 'Fótbolti', age: 'Allir Flokkar' },
  { sport: 'Körfubolti', age: 'Allir Flokkar' },
  { sport: 'Félagið', age: 'Allir Flokkar' },
  { sport: 'Allt', age: 'Meistaraflokkur' },
  { sport: 'Allt', age: 'Yngri flokkar' },
  { sport: 'Allt', age: 'Námskeið' },
  { sport: 'Fótbolti', age: 'Meistaraflokkur' },
  { sport: 'Körfubolti', age: 'Meistaraflokkur' },
  { sport: 'Handbolti', age: 'Meistaraflokkur' }
];

filters.forEach(({ sport, age }) => {
  const filtered = events.filter(e => {
    const sportMatch = sport === 'Allt' || e.category === sport;
    const ageMatch = age === 'Allir Flokkar' || e.ageGroup === age || e.category === 'Félagið';
    return sportMatch && ageMatch;
  });
  console.log(`[${sport} / ${age}] -> ${filtered.length} events`);
});
