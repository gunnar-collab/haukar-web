import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const KSI_URL = 'https://www.ksi.is/oll-mot/mot?id=7025676';

async function fetchStandings() {
  try {
    const { data } = await axios.get(KSI_URL);
    const $ = cheerio.load(data);
    
    // In KSÍ, standings are usually in a table with class "table" or "standings-table"
    // Let's print out all tables we find to debug
    const tables = $('table');
    console.log(`Found ${tables.length} tables.`);
    
    // Log matches
    const { data: matchData } = await axios.get(KSI_URL + '&banner-tab=matches-and-results');
    const $m = cheerio.load(matchData);
    
    // Let's log classes of elements containing 'Haukar'
    $m('a:contains("Haukar")').each((idx, el) => {
         console.log("Haukar link parent HTML:", $m(el).parent().html().substring(0, 300));
    });
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchStandings();
