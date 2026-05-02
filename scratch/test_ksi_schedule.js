import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-05-01&dateTo=2026-12-31';
  console.log('Fetching', url);
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  
  // Try to find the rows
  $('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
    // Look closely at what HTML is around here
    const html = $(el).parent().html();
    if (i === 0) {
      console.log("HTML for first match:", html);
    }
  });
}
run();
