import fs from 'fs';

const SPORTS_MAP = {
  fotbolti_karla: { name: 'Fótbolti (K)', venue: 'Ásvellir' },
  fotbolti_kvenna: { name: 'Fótbolti (Kv)', venue: 'Ásvellir' },
  fotbolti_youth: { name: 'Fótbolti (Yngri)', venue: 'Ásvellir' }
};

const leagueData = JSON.parse(fs.readFileSync('./src/data/haukar_league_data.json', 'utf8'));

for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
  const divisionData = leagueData[key];
  if (divisionData && divisionData.matches) {
    divisionData.matches.forEach(match => {
      if (match.competition && match.competition.includes('5. flokkur kvenna 2026 - A lið C riðill') && match.home === 'Haukar' && match.away === 'Víkingur R.') {
        const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
        console.log("MATCH FOUND IN KEY:", key);
        console.log("Competition:", match.competition);
        console.log("isYouth:", isYouth);
        console.log("ageGroup:", isYouth ? 'Yngri flokkar' : 'Meistaraflokkur');
        console.log("dateRaw:", match.date);
      }
    });
  }
}
