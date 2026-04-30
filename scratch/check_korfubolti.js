import fs from 'fs';
const data = JSON.parse(fs.readFileSync('src/data/haukar_league_data.json', 'utf8'));
const matches = data.korfubolti_kvenna.matches;
const now = new Date();
now.setHours(0,0,0,0);
matches.forEach(m => {
  const d = new Date(m.date);
  console.log(`${m.date} -> parsed: ${d.toISOString()}, isUpcoming: ${d >= now}, home: ${m.home}, score: ${m.score}`);
});
