import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  let page = 1;
  let allMatches = [];
  while(true) {
    const url = `https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-01-01&dateTo=2026-12-31&page=${page}`;
    const {data} = await axios.get(url);
    const $ = cheerio.load(data);
    const matches = [];
    $('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
      const comp = $(el).find('.hidden.l\\:flex a span.body-5').first().text().replace(/\s+/g, ' ').trim();
      const teamsDiv = $(el).find('.col-span-2.l\\:col-auto.grid.grid-cols-\\[1fr_auto_1fr\\]');
      const home = teamsDiv.find('a').eq(0).text().replace(/\s+/g, ' ').trim();
      const away = teamsDiv.find('a').eq(1).text().replace(/\s+/g, ' ').trim();
      matches.push(`[${comp}] ${home} vs ${away}`);
    });
    if (matches.length === 0) break;
    allMatches.push(...matches);
    page++;
  }
  console.log(`Fetched ${allMatches.length} total matches!`);
}
run();
