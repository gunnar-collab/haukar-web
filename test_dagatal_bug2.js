import fs from 'fs';

const SPORTS_MAP = {
  fotbolti_karla: { name: 'Fótbolti (K)', venue: 'Ásvellir' },
  fotbolti_kvenna: { name: 'Fótbolti (Kv)', venue: 'Ásvellir' },
  fotbolti_youth: { name: 'Fótbolti (Yngri)', venue: 'Ásvellir' },
  karla: { name: 'Handbolti (K)', venue: 'Schenkerhöllin' },
  kvenna: { name: 'Handbolti (Kv)', venue: 'Schenkerhöllin' },
  korfubolti_karla: { name: 'Körfubolti (K)', venue: 'Ólafssalur' },
  korfubolti_kvenna: { name: 'Körfubolti (Kv)', venue: 'Ólafssalur' }
};

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

const leagueData = JSON.parse(fs.readFileSync('./src/data/haukar_league_data.json', 'utf8'));

const getAllMatches = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let allMatches = [];

  for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
    const divisionData = leagueData[key];
    if (divisionData && divisionData.matches) {
      divisionData.matches.forEach(match => {
        const matchDate = parseMatchDate(match.date);
        const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
        
        let category = 'Félagið';
        if (key.includes('fotbolti')) category = 'Fótbolti';
        else if (key.includes('korfubolti')) category = 'Körfubolti';
        else if (key.includes('karla') || key.includes('kvenna')) category = 'Handbolti';
        
        const isUpcoming = (match.score === 'Næsti leikur' || match.score === '- - -' || match.score === '-' || !match.score) && matchDate >= now;

        allMatches.push({
          ...match,
          sportKey: key,
          category,
          ageGroup: isYouth ? 'Yngri flokkar' : 'Meistaraflokkur',
          parsedDate: matchDate,
          isYouth,
          isUpcoming
        });
      });
    }
  }
  return allMatches;
};

const allMatches = getAllMatches();
const youthMatch = allMatches.find(m => m.competition === 'Íslandsmót KSÍ 5. flokkur kvenna 2026 - A lið C riðill');

if (youthMatch) {
  console.log("FOUND MATCH:", youthMatch.competition);
  console.log("sportKey:", youthMatch.sportKey);
  console.log("ageGroup:", youthMatch.ageGroup);
  console.log("category:", youthMatch.category);
  
  const activeSportFilter = 'Allt';
  const activeAgeFilter = 'Meistaraflokkur';
  
  const sportMatch = activeSportFilter === 'Allt' || youthMatch.category === activeSportFilter;
  const ageMatch = activeAgeFilter === 'Allir Flokkar' || youthMatch.ageGroup === activeAgeFilter || youthMatch.category === 'Félagið';
  
  console.log("sportMatch:", sportMatch);
  console.log("ageMatch:", ageMatch);
  console.log("included in filter?", sportMatch && ageMatch);
} else {
  console.log("MATCH NOT FOUND!");
}
