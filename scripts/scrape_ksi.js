import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const KSI_WOMEN_URL = 'https://www.ksi.is/oll-mot/mot?id=7025676';
const KSI_MEN_URL = 'https://www.ksi.is/oll-mot/mot?id=7025548';
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'haukar_league_data.json');

async function fetchStandings(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  console.log(`Found ${$('table').length} tables at ${url}`);
  const standings = [];
  $('table tbody tr').each((idx, el) => {
    const cols = $(el).find('td');
    if (cols.length >= 8) {
      standings.push({
        rank: parseInt($(cols[0]).text().trim()) || (idx + 1),
        team: $(cols[1]).text().trim(),
        played: parseInt($(cols[2]).text().trim()) || 0,
        wins: parseInt($(cols[3]).text().trim()) || 0,
        draws: parseInt($(cols[4]).text().trim()) || 0,
        losses: parseInt($(cols[5]).text().trim()) || 0,
        goalsFor: parseInt($(cols[6]).text().trim()) || 0,
        goalsAgainst: parseInt($(cols[7]).text().trim()) || 0,
        points: parseInt($(cols[8]).text().trim()) || 0
      });
    }
  });
  return standings;
}

async function scrapeKSI() {
  try {
    console.log("Fetching KSÍ Women's standings...");
    const womenStandings = await fetchStandings(KSI_WOMEN_URL);
    
    console.log("Fetching KSÍ Men's standings...");
    const menStandings = await fetchStandings(KSI_MEN_URL);
    
    if (womenStandings.length > 0 || menStandings.length > 0) {
      console.log(`Successfully parsed ${womenStandings.length} women's teams and ${menStandings.length} men's teams.`);
      
      // Read current JSON
      const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const leagueData = JSON.parse(rawData);
      
      // Update women's football standings
      if (leagueData.fotbolti_kvenna && womenStandings.length > 0) {
        leagueData.fotbolti_kvenna.standings = womenStandings;
      }
      
      // Update men's football standings
      if (leagueData.fotbolti_karla && menStandings.length > 0) {
        leagueData.fotbolti_karla.standings = menStandings;
      }
      
      // Save back to JSON
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(leagueData, null, 2), 'utf-8');
      console.log("Updated haukar_league_data.json with latest standings!");
    } else {
      console.log("No standings parsed. Keeping existing data.");
    }

  } catch (error) {
    console.error("Error scraping KSÍ data:", error);
    process.exit(1);
  }
}

scrapeKSI();
