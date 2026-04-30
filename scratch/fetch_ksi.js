import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const url = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-04-30&dateTo=2026-12-31';
  console.log('Fetching', url);
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  $('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
    const comp = $(el).find('.hidden.l\\:flex a span.body-5').first().text().replace(/\s+/g, ' ').trim();
    const teamsDiv = $(el).find('.col-span-2.l\\:col-auto.grid.grid-cols-\\[1fr_auto_1fr\\]');
    const home = teamsDiv.find('a').eq(0).text().replace(/\s+/g, ' ').trim();
    const away = teamsDiv.find('a').eq(1).text().replace(/\s+/g, ' ').trim();
    console.log(`[${comp}] ${home} vs ${away}`);
  });
}
run();
