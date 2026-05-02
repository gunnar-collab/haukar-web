import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-05-01&dateTo=2026-12-31';
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  
  $('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
    const dateTextFull = $(el).find('.flex.items-center.gap-\\[8rem\\] span.body-5').first().text().replace(/\s+/g, ' ').trim();
    console.log(`Match ${i+1}: dateTextFull = "${dateTextFull}"`);
  });
}
run();
