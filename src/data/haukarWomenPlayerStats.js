import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Accept-Language': 'is-IS,is;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': 'https://hbstatz.is/'
};

// Women's URLs (Total stats)
const PLAYER_URL = 'https://hbstatz.is/OlisDeildKvennaTolfraedib.php';
const GK_URL = 'https://hbstatz.is/testF22b.php';
const JSON_OUTPUT = path.join(__dirname, 'haukar_women_player_stats.json');
const MD_OUTPUT = path.join(__dirname, 'haukar_women_player_stats.md');

const jitter = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1) + min) * 1000));

async function scrapeWomenStats() {
  try {
    console.log('Sæki tölfræði kvennaliðs Hauka (Leikmenn)...');
    const playerResponse = await axios.get(PLAYER_URL, { headers: HEADERS });
    const $p = cheerio.load(playerResponse.data);
    
    const players = {};

    // 1. Scrape Players (Offensive & Defensive)
    // Table rows are inside the <tbody> of #statz1
    $p('table#statz1 tbody tr').each((i, el) => {
      const cols = $p(el).find('td');
      const team = $p(cols[0]).text().trim();

      if (team === 'Haukar') {
        const name = $p(cols[1]).text().trim();
        const gamesPlayed = parseInt($p(cols[3]).text().trim()) || 0;
        const totalGoals = parseInt($p(cols[4]).text().trim()) || 0;
        const shootingPct = parseFloat($p(cols[5]).text().trim()) || 0;
        
        // Defensive stats (Women's indices are 19, 20, 21)
        const steals = parseInt($p(cols[19]).text().trim()) || 0;
        const blockedShots = parseInt($p(cols[20]).text().trim()) || 0;
        const legalStops = parseInt($p(cols[21]).text().trim()) || 0;

        // Calculate total shots
        let totalShots = 0;
        if (shootingPct > 0) {
          totalShots = Math.round(totalGoals / (shootingPct / 100));
        }

        players[name] = {
          name,
          gamesPlayed,
          stats: {
            offensive: {
              gamesPlayed,
              totalGoals,
              totalShots,
              shootingPercentage: `${shootingPct}%`
            },
            defensive: {
              legalStops,
              steals,
              blockedShots
            }
          }
        };
      }
    });

    console.log('Sæki tölfræði kvennaliðs Hauka (Markmenn)...');
    const gkResponse = await axios.get(GK_URL, { headers: HEADERS });
    const $gk = cheerio.load(gkResponse.data);

    // 2. Scrape Goalkeepers and merge
    $gk('tr').each((i, el) => {
      const cols = $gk(el).find('td');
      const team = $gk(cols[0]).text().trim();

      if (team === 'Haukar') {
        const name = $gk(cols[1]).text().trim();
        const gamesPlayed = parseInt($gk(cols[9]).text().trim()) || 0; // Women's games played is at col 9
        const totalSaves = parseInt($gk(cols[4]).text().trim()) || 0;
        const savePercentage = $gk(cols[5]).text().trim() + '%';
        const goalsScored = parseInt($gk(cols[13]).text().trim()) || 0;
        const shotsTaken = parseInt($gk(cols[14]).text().trim()) || 0;

        if (players[name]) {
          players[name].stats.goalkeeper = { 
            gamesPlayed,
            totalSaves,
            savePercentage
          };
          if (goalsScored > 0 || shotsTaken > 0) {
            players[name].stats.offensive = {
              gamesPlayed,
              totalGoals: goalsScored,
              totalShots: shotsTaken,
              shootingPercentage: shotsTaken > 0 ? `${((goalsScored/shotsTaken)*100).toFixed(1)}%` : '0%'
            };
          }
          players[name].position = 'Markmaður';
        } else {
          players[name] = {
            name,
            position: 'Markmaður',
            stats: {
              goalkeeper: { 
                gamesPlayed,
                totalSaves,
                savePercentage
              },
              offensive: {
                gamesPlayed,
                totalGoals: goalsScored,
                totalShots: shotsTaken,
                shootingPercentage: shotsTaken > 0 ? `${((goalsScored/shotsTaken)*100).toFixed(1)}%` : '0%'
              }
            }
          };
        }
      }
    });

    const playerList = Object.values(players);
    console.log(`Sótti tölfræði fyrir ${playerList.length} leikmenn í kvennaliðinu.`);

    // Sort by goals descending
    playerList.sort((a, b) => (b.stats?.offensive?.totalGoals || 0) - (a.stats?.offensive?.totalGoals || 0));

    // Save as JSON
    fs.writeFileSync(JSON_OUTPUT, JSON.stringify(playerList, null, 2), 'utf8');
    console.log(`Vistaði JSON í ${JSON_OUTPUT}`);

    // Save as Markdown for AI
    let mdContent = `# Tölfræði kvennaliðs Hauka (Heildartölur tímabils)\n`;
    mdContent += `| Nafn | Leikir | Mörk | Skot | Nýting | Stuldur | Stöðvanir | Varin skot |\n`;
    mdContent += `|------|--------|------|------|--------|---------|-----------|------------|\n`;

    playerList.forEach(p => {
      mdContent += `| ${p.name} | ${p.gamesPlayed || '-'} | ${p.stats?.offensive?.totalGoals || 0} | ${p.stats?.offensive?.totalShots || 0} | ${p.stats?.offensive?.shootingPercentage || '-'} | ${p.stats?.defensive?.steals || 0} | ${p.stats?.defensive?.legalStops || 0} | ${p.stats?.goalkeeper?.totalSaves || '-'} |\n`;
    });

    fs.writeFileSync(MD_OUTPUT, mdContent, 'utf8');
    console.log(`Vistaði Markdown í ${MD_OUTPUT}`);

    console.log('Búið.');

  } catch (error) {
    console.error('Villa við sköfun:', error.message);
  }
}

// Start
await jitter(1, 3);
scrapeWomenStats();
