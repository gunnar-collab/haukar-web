import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const leagueData = JSON.parse(fs.readFileSync(join(__dirname, '../src/data/haukar_league_data.json'), 'utf-8'));

const matchPlayerName = (name1, name2) => {
  if (!name1 || !name2) return false;
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();
  if (n1 === n2 || n1.includes(n2) || n2.includes(n1)) return true;
  
  const p1 = n1.split(' ').filter(p => p.length > 2);
  const p2 = n2.split(' ').filter(p => p.length > 2);
  
  let matchCount = 0;
  for (const p of p1) {
    if (p2.includes(p)) matchCount++;
  }
  return matchCount >= 2;
};

const statsSource = leagueData.fotbolti_karla?.player_stats;
const match = statsSource.find(stat => matchPlayerName(stat.name, "Daði Snær"));

console.log("Matched stat:", match);
