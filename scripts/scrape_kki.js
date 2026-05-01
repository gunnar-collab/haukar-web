import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const MEN_TEAM_URL = "https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=191&season_id=130402&team_id=4760732";
const WOMEN_TEAM_URL = "https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162";

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'haukar_league_data.json');

const args = process.argv.slice(2);
const isRecentOnly = args.includes('--recent-only');

function needsRecentUpdate(divisionMatches) {
  if (!divisionMatches || divisionMatches.length === 0) return true;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  
  for (const match of divisionMatches) {
    if (!match.date) continue;
    const matchDate = new Date(match.date).getTime();
    const diffDays = (today - matchDate) / (1000 * 60 * 60 * 24);
    
    if (diffDays >= -1 && diffDays <= 1) {
      return true;
    }
  }
  return false;
}

async function scrapeKKI() {
  let leagueData = {};
  try {
    const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    leagueData = JSON.parse(rawData);
  } catch (err) {
    console.error("Could not read league data:", err);
    process.exit(1);
  }

  if (isRecentOnly) {
      console.log("Running in --recent-only targeted polling mode for KKÍ");
  }

  const browser = await puppeteer.launch({ 
      headless: "new",
      args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  async function scrapeTeam(urlBase, division) {
    if (isRecentOnly && leagueData[division] && !needsRecentUpdate(leagueData[division].matches)) {
        console.log(`No recent matches found for ${division}. Skipping targeted polling.`);
        return false;
    }

    const page = await browser.newPage();
    try {
      // 1. Fetch Schedule
      console.log(`Fetching matches for ${division}...`);
      await page.goto(`${urlBase}#mbt:6-200$t&0=1`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.mbt-table', { timeout: 15000 });
      
      const matches = await page.evaluate(() => {
         const rows = Array.from(document.querySelectorAll('.mbt-table tbody tr'));
         return rows.map(row => {
             const cols = row.querySelectorAll('td');
             if (cols.length < 4) return null;
             
             let scoreIdx = -1;
             for(let i=0; i<cols.length; i++) {
                 if(cols[i].innerText.includes('-')) {
                     scoreIdx = i;
                     break;
                 }
             }
             if (scoreIdx === -1) scoreIdx = 3; // Fallback
             
             const dateText = cols[0]?.innerText.trim() || '';
             const home = cols[scoreIdx - 1]?.innerText.trim() || '';
             let score = cols[scoreIdx]?.innerText.trim() || '';
             const away = cols[scoreIdx + 1]?.innerText.trim() || '';
             
             // Format date: DD.MM.YYYY -> YYYY-MM-DD
             let formattedDate = dateText;
             const parts = dateText.split('.');
             if (parts.length === 3) {
                 formattedDate = `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
             }
             
             if (score.includes('-')) {
                 if (!score.match(/\d/)) score = null; // Unplayed game usually has "-"
             } else {
                 score = null;
             }
             
             return {
                 date: formattedDate,
                 home,
                 away,
                 score,
                 competition: "Besta deild"
             };
         }).filter(m => m !== null && (m.home.includes("Haukar") || m.away.includes("Haukar")));
      });
      
      if (matches && matches.length > 0) {
          if (!leagueData[division]) leagueData[division] = {};
          leagueData[division].matches = matches;
      }

      // 2. Fetch Player Stats
      console.log(`Fetching player stats for ${division}...`);
      await page.goto(`${urlBase}#mbt:6-200$t&0=5`, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('.mbt-table', { timeout: 15000 });

      const players = await page.evaluate(() => {
          const rows = Array.from(document.querySelectorAll('.mbt-table tbody tr'));
          return rows.map(row => {
              const cols = row.querySelectorAll('td');
              if (cols.length < 5) return null;
              
              return {
                  name: cols[0].innerText.trim(),
                  number: cols[1].innerText.trim(),
                  mpg: parseFloat(cols[4].innerText) || 0,
                  ppg: parseFloat(cols[5].innerText) || 0,
                  rpg: parseFloat(cols[6].innerText) || 0,
                  apg: parseFloat(cols[7].innerText) || 0,
                  eff: parseFloat(cols[cols.length - 1].innerText) || 0
              };
          }).filter(p => p !== null && p.name !== "Totals");
      });
      
      if (players && players.length > 0) {
          if (!leagueData[division]) leagueData[division] = {};
          leagueData[division].player_stats = players;
      }
      
      return true;
    } catch (e) {
      console.error(`Error scraping ${division}:`, e.message);
      return false;
    } finally {
      await page.close();
    }
  }

  const updatedMen = await scrapeTeam(MEN_TEAM_URL, "korfubolti_karla");
  const updatedWomen = await scrapeTeam(WOMEN_TEAM_URL, "korfubolti_kvenna");

  if (updatedMen || updatedWomen) {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(leagueData, null, 2), 'utf-8');
      console.log("Successfully merged KKÍ stats and matches into haukar_league_data.json");
  } else {
      console.log("KKÍ check complete. No updates needed.");
  }

  await browser.close();
}

scrapeKKI();
