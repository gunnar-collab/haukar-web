import axios from 'axios';
import * as cheerio from 'cheerio';

const URL = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&category=Fullor%C3%B0nir&dateFrom=2026-01-01&dateTo=2026-12-31';

async function test() {
  try {
    const { data } = await axios.get(URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    });
    const $ = cheerio.load(data);
    
    console.log("Number of tables:", $('table').length);
    
    // Print the headers of the first table
    $('table:first thead tr th').each((i, el) => {
      console.log(`Col ${i}:`, $(el).text().trim());
    });
    
    // Print first 5 rows
    $('table:first tbody tr').slice(0, 5).each((i, row) => {
      console.log(`--- Row ${i} ---`);
      $(row).find('td').each((j, col) => {
         const aHref = $(col).find('a').attr('href');
         console.log(`  Col ${j}:`, $(col).text().trim().replace(/\s+/g, ' '), aHref ? `(Link: ${aHref})` : '');
      });
    });

  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
