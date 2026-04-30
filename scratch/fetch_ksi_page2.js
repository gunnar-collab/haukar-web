import axios from 'axios';
import * as cheerio from 'cheerio';
async function run() {
  const url1 = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-01-01&dateTo=2026-12-31';
  const url2 = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-01-01&dateTo=2026-12-31&page=2';
  const r1 = await axios.get(url1);
  const r2 = await axios.get(url2);
  const $1 = cheerio.load(r1.data);
  const $2 = cheerio.load(r2.data);
  const getFirstMatch = ($) => {
    return $('.grid.grid-cols-\\[70\\%_auto\\]').first().text().replace(/\s+/g, ' ').trim();
  };
  console.log('Page 1:', getFirstMatch($1));
  console.log('Page 2:', getFirstMatch($2));
}
run();
