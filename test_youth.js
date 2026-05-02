import fs from 'fs';
const data = JSON.parse(fs.readFileSync('./src/data/haukar_league_data.json', 'utf8'));

const keys = ['fotbolti_karla', 'fotbolti_kvenna'];
keys.forEach(key => {
  if (data[key] && data[key].matches) {
    data[key].matches.forEach(match => {
      if (match.competition.includes('5. flokkur kvenna 2026 - A lið')) {
        const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
        console.log("Match:", match.home, "vs", match.away, "| isYouth:", isYouth);
      }
    });
  }
});
