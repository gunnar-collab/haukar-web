import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fotboltiDataStr = fs.readFileSync(join(__dirname, '../src/data/fotboltiData.js'), 'utf-8');
const fotboltiMatch = fotboltiDataStr.match(/export const dataKarla = (.*?);/s);

// Let's just emulate the PlayerProfile.jsx logic:
import { findPlayerBySlug, matchPlayerName } from '../src/lib/playerUtils.js';
import leagueData from '../src/data/haukar_league_data.json' assert { type: 'json' };

const slug = "dadi-snaer";
let player = findPlayerBySlug(slug);

if (player) {
    if (player.sport === 'handbolti' || player.sport === 'fotbolti') {
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
    }
}

console.log("Player stats:", player.stats);

