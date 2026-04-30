import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/data/haukar_league_data.json', 'utf8'));
const now = new Date('2026-04-30T00:00:00Z');
let upcoming = [];
for (const [key, sport] of Object.entries(data)) {
  if (sport.matches) {
    sport.matches.forEach(m => {
      if (new Date(m.date) >= now) {
        upcoming.push({sport: key, ...m});
      }
    });
  }
}
console.log(upcoming.length + " future games found.");
console.log(upcoming.slice(0, 3));
