import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Human-like headers to avoid being blocked as a bot
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
  'Accept-Language': 'is-IS,is;q=0.9,en-US;q=0.8,en;q=0.7',
  'Referer': 'https://hbstatz.is/',
  'Connection': 'keep-alive',
  'Cache-Control': 'max-age=0'
};

const BASE_URL = 'https://hbstatz.is/';
const MAIN_PAGE = `${BASE_URL}OlisDeildKarlaLeikir.php`;
const LOG_DIR = path.join(__dirname, 'match-logs');

// Utility function for random jitter (wait between requests)
const jitter = (min, max) => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (max - min + 1) + min) * 1000));

async function scrapeHaukarMatches() {
  try {
    console.log('Fetching main match list...');
    const response = await axios.get(MAIN_PAGE, { headers: HEADERS });
    const $ = cheerio.load(response.data);
    
    const haukarMatches = [];

    // Iterate through table rows to find Haukar matches
    $('tr').each((i, el) => {
      const rowText = $(el).text();
      if (rowText.includes('Haukar')) {
        const matchLink = $(el).find('a[href^="OlisDeildKarlaLeikur.php?ID="]').attr('href');
        if (matchLink) {
          const matchId = matchLink.split('=')[1];
          haukarMatches.push({
            id: matchId,
            url: `${BASE_URL}test10b.php?ID=${matchId}`, // Direct link to event list (Atvik)
            opponent: rowText.replace(/\s+/g, ' ').trim()
          });
        }
      }
    });

    console.log(`Found ${haukarMatches.length} matches for Haukar.`);

    if (!fs.existsSync(LOG_DIR)) {
      fs.mkdirSync(LOG_DIR);
    }

    for (const match of haukarMatches) {
      const filePath = path.join(LOG_DIR, `match_${match.id}.md`);
      
      // Skip if already scraped to be polite
      if (fs.existsSync(filePath)) {
        console.log(`Match ${match.id} already exists, skipping.`);
        continue;
      }

      console.log(`Scraping match report for ID ${match.id}...`);
      
      // Add jitter before fetching detail page (2-5 seconds)
      await jitter(2, 5);

      const matchResponse = await axios.get(match.url, { headers: HEADERS });
      const $match = cheerio.load(matchResponse.data);
      
      let markdownContent = `# Match Report: ${match.id}\n`;
      markdownContent += `Source: ${match.url}\n\n`;
      markdownContent += `| Time | Score | Event |\n`;
      markdownContent += `|------|-------|-------|\n`;

      $match('tr').each((i, el) => {
        const cols = $match(el).find('td');
        if (cols.length >= 4) {
          const time = $match(cols[1]).text().trim();
          const score = $match(cols[2]).text().trim();
          const event = $match(cols[3]).text().trim();
          
          if (time && event) {
            markdownContent += `| ${time} | ${score} | ${event} |\n`;
          }
        }
      });

      // Save in UTF-8 to preserve Icelandic characters
      fs.writeFileSync(filePath, markdownContent, 'utf8');
      console.log(`Saved match_${match.id}.md`);
    }

    console.log('Scraping complete.');

  } catch (error) {
    console.error('Error during scraping:', error.message);
  }
}

scrapeHaukarMatches();
