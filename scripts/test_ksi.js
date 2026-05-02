import axios from 'axios';
import * as cheerio from 'cheerio';

(async () => {
  const url = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193';
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = cheerio.load(data);
  const row = $('.grid.grid-cols-\\[70\\%_auto\\]').first();
  console.log('Row HTML:');
  console.log(row.html());
})();
