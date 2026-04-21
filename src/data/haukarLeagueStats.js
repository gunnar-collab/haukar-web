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

const URLS = {
  karla_stada: 'https://hbstatz.is/OlisDeildKarlaStada.php',
  kvenna_stada: 'https://hbstatz.is/OlisDeildKvennaStada.php',
  karla_leikir: 'https://hbstatz.is/OlisDeildKarlaLeikir.php',
  kvenna_leikir: 'https://hbstatz.is/OlisDeildKvennaLeikir.php'
};

const JSON_OUTPUT = path.join(__dirname, 'haukar_league_data.json');

async function scrapeLeagueData() {
  const data = {
    karla: { standings: [], matches: [] },
    kvenna: { standings: [], matches: [] }
  };

  try {
    // 1. Scrape Standings
    for (const gender of ['karla', 'kvenna']) {
      console.log(`Sæki stöðu deildar (${gender})...`);
      const response = await axios.get(URLS[`${gender}_stada`], { headers: HEADERS });
      const $ = cheerio.load(response.data);

      $('tr').each((i, el) => {
        const cols = $(el).find('td');
        if (cols.length >= 10) {
          const rank = $(cols[0]).text().trim();
          const teamName = $(cols[1]).text().trim();
          if (rank && teamName) {
            data[gender].standings.push({
              rank: parseInt(rank),
              team: teamName,
              played: parseInt($(cols[3]).text().trim()),
              wins: 0, // HBStatz uses images for form, but points are at the end
              points: parseInt($(cols[cols.length - 1]).text().trim())
            });
          }
        }
      });
    }

    // 2. Scrape Matches (Recent & Next)
    for (const gender of ['karla', 'kvenna']) {
      console.log(`Sæki leiki (${gender})...`);
      const response = await axios.get(URLS[`${gender}_leikir`], { headers: HEADERS });
      const $ = cheerio.load(response.data);

      $('tr').each((i, el) => {
        const cols = $(el).find('td');
        if (cols.length >= 5) {
          const date = $(cols[0]).text().trim();
          const home = $(cols[1]).text().trim();
          const away = $(cols[2]).text().trim();
          const scoreRaw = $(cols[3]).text().trim();

          if (home.includes('Haukar') || away.includes('Haukar')) {
            data[gender].matches.push({
              date,
              home,
              away,
              score: scoreRaw.replace(/\s+/g, ' ').trim(),
              competition: $(cols[5]).text().trim()
            });
          }
        }
      });
      
      // Keep only last 3 and next 3 (sorted by date)
      data[gender].matches.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    fs.writeFileSync(JSON_OUTPUT, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Vistaði gögn í ${JSON_OUTPUT}`);

  } catch (error) {
    console.error('Villa við sköfun deildargagna:', error.message);
  }
}

scrapeLeagueData();
