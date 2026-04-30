import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/haukar_league_data.json', 'utf-8'));
const matches = data.fotbolti_karla?.matches || [];
console.log(matches.map(m => m.statsLink).filter(Boolean));
