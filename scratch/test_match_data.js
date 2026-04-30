import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const MATCH_URL = 'https://www.ksi.is/leikir-og-urslit/felagslid/leikur?id=6962749';
const REPORT_URL = 'https://www.ksi.is/leikir-og-urslit/felagslid/leikur?id=6962749&banner-tab=report';

async function test() {
  try {
    const { data: matchData } = await axios.get(MATCH_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const { data: reportData } = await axios.get(REPORT_URL, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    
    fs.writeFileSync('scratch/match_main.html', matchData);
    fs.writeFileSync('scratch/match_report.html', reportData);
    
    console.log("Successfully downloaded HTML for the match and the report tab.");
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
