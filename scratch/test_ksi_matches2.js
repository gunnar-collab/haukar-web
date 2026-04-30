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
    
    // The matches are in grid rows
    const matches = $('.grid.grid-cols-\\[70\\%_auto\\]');
    console.log(`Found ${matches.length} matches.`);
    
    matches.each((i, el) => {
      // Date is often the previous sibling or somewhere nearby.
      // Actually, let's just log the full text of the match row.
      const matchText = $(el).text().replace(/\s+/g, ' ').trim();
      
      const home = $(el).find('a').eq(0).text().replace(/\s+/g, ' ').trim();
      const score = $(el).find('span.whitespace-nowrap').first().text().trim();
      const away = $(el).find('a').eq(1).text().replace(/\s+/g, ' ').trim();
      
      // Competition
      const comp = $(el).find('.hidden.l\\:flex a span').text().trim();
      
      // Find date
      // Look up previous elements until we find something that looks like a date
      let dateText = '';
      let prev = $(el).prev();
      while (prev.length) {
         if (prev.text().match(/\d{1,2}\. [a-záéíóúýðþæö]+ \d{4}/i)) {
             dateText = prev.text().replace(/\s+/g, ' ').trim();
             break;
         }
         prev = prev.prev();
      }
      
      // If not found in prev, maybe it's inside the element?
      if (!dateText) {
          const possibleDates = $(el).parent().prevAll().map((idx, sibling) => $(sibling).text().trim()).get();
          for (const d of possibleDates) {
               if (d.match(/\d{1,2}\. [a-záéíóúýðþæö]+ \d{4}/i)) {
                  dateText = d.replace(/\s+/g, ' ').trim();
                  break;
               }
          }
      }

      console.log(`Match ${i+1}: ${dateText} | ${home} ${score} ${away} | ${comp}`);
    });

  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();
