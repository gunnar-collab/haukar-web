import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read League Data
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

// Create a mock player
let player = {
  slug: 'dadi-snaer',
  name: 'Daði Snær',
  sport: 'fotbolti',
  team: 'karla',
  position: 'Sóknarmaður'
};

const teamKey = player.team || player.gender || 'karla';
const statsSource = player.sport === 'handbolti'
    ? (teamKey === 'karla' ? leagueData.karla?.player_stats : leagueData.kvenna?.player_stats)
    : (teamKey === 'karla' ? leagueData.fotbolti_karla?.player_stats : leagueData.fotbolti_kvenna?.player_stats);

if (statsSource) {
    const match = statsSource.find(stat => matchPlayerName(stat.name, player.name));
    if (match && match.stats) {
        player.stats = match.stats;
        player.stats.gamesPlayed = match.gamesPlayed !== undefined ? match.gamesPlayed : match.stats.gamesPlayed; 
    }
}

const isFootball = player.stats?.sport === 'fotbolti' || player.sport === 'fotbolti';
const isGoalkeeper = player.position?.toLowerCase().includes('markmaður') || player.position?.toLowerCase().includes('markvörður');

console.log("Player final object:", JSON.stringify(player, null, 2));
console.log("isFootball:", isFootball);
console.log("isGoalkeeper:", isGoalkeeper);
