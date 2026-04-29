import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'is-IS,is;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': 'https://hbstatz.is/',
  'Connection': 'keep-alive',
  'Cache-Control': 'max-age=0'
};

const URLS = {
  karla_stada: 'https://hbstatz.is/OlisDeildKarlaStada.php',
  kvenna_stada: 'https://hbstatz.is/OlisDeildKvennaStada.php',
  karla_leikir: 'https://hbstatz.is/OlisDeildKarlaLeikir.php',
  kvenna_leikir: 'https://hbstatz.is/OlisDeildKvennaLeikir.php',
  karla_players: 'https://hbstatz.is/OlisDeildKarlaTolfraedib.php',
  karla_gk: 'https://hbstatz.is/test22b.php',
  kvenna_players: 'https://hbstatz.is/OlisDeildKvennaTolfraedib.php',
  kvenna_gk: 'https://hbstatz.is/testF22b.php'
};

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'haukar_league_data.json');

async function fetchHBStatz() {
  try {
    const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const leagueData = JSON.parse(rawData);

    for (const gender of ['karla', 'kvenna']) {
      const division = gender;
      if (!leagueData[division]) continue;

      console.log(`Fetching Standings for ${division}...`);
      const stadaRes = await axios.get(URLS[`${gender}_stada`], { headers: HEADERS });
      const $s = cheerio.load(stadaRes.data);
      const standings = [];
      $s('tr').each((i, el) => {
        const cols = $s(el).find('td');
        if (cols.length >= 10) {
          const rank = $s(cols[0]).text().trim();
          const teamName = $s(cols[1]).text().trim();
          if (rank && teamName) {
            standings.push({
              rank: parseInt(rank),
              team: teamName,
              played: parseInt($s(cols[3]).text().trim()) || 0,
              wins: 0, 
              points: parseInt($s(cols[cols.length - 1]).text().trim()) || 0
            });
          }
        }
      });
      if (standings.length > 0) leagueData[division].standings = standings;

      console.log(`Fetching Player Stats for ${division}...`);
      const playersRes = await axios.get(URLS[`${gender}_players`], { headers: HEADERS });
      const $p = cheerio.load(playersRes.data);
      const players = {};

      $p('table#statz1 tbody tr').each((i, el) => {
        const cols = $p(el).find('td');
        const team = $p(cols[0]).text().trim();
        if (team === 'Haukar') {
          const name = $p(cols[1]).text().trim();
          const gamesPlayed = parseInt($p(cols[3]).text().trim()) || 0;
          const totalGoals = parseInt($p(cols[4]).text().trim()) || 0;
          const shootingPct = parseFloat($p(cols[5]).text().trim()) || 0;
          let totalShots = shootingPct > 0 ? Math.round(totalGoals / (shootingPct / 100)) : 0;
          
          players[name] = {
            name,
            gamesPlayed,
            stats: {
              offensive: { gamesPlayed, totalGoals, totalShots, shootingPercentage: `${shootingPct}%` }
            }
          };
        }
      });

      console.log(`Fetching Goalkeeper Stats for ${division}...`);
      const gkRes = await axios.get(URLS[`${gender}_gk`], { headers: HEADERS });
      const $gk = cheerio.load(gkRes.data);
      $gk('tr').each((i, el) => {
        const cols = $gk(el).find('td');
        const team = $gk(cols[0]).text().trim();
        if (team === 'Haukar') {
          const name = $gk(cols[1]).text().trim();
          const gamesPlayed = parseInt($gk(cols[3]).text().trim()) || 0;
          const totalSaves = parseInt($gk(cols[4]).text().trim()) || 0;
          const savePercentage = $gk(cols[5]).text().trim() + '%';
          
          if (players[name]) {
            players[name].stats.goalkeeper = { gamesPlayed, totalSaves, savePercentage };
            players[name].position = 'Markmaður';
          } else {
            players[name] = {
              name, position: 'Markmaður',
              stats: { goalkeeper: { gamesPlayed, totalSaves, savePercentage } }
            };
          }
        }
      });

      const playerList = Object.values(players);
      playerList.sort((a, b) => (b.stats?.offensive?.totalGoals || 0) - (a.stats?.offensive?.totalGoals || 0));
      
      if (playerList.length > 0) {
        leagueData[division].player_stats = playerList;
      }
    }

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(leagueData, null, 2), 'utf-8');
    console.log("Updated haukar_league_data.json with HBStatz standings and players!");

  } catch (error) {
    console.error("Error scraping HBStatz:", error);
    process.exit(1);
  }
}

fetchHBStatz();
