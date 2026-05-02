import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=2026-05-01&dateTo=2026-12-31';
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  
  $('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
    const teamsDiv = $(el).find('.col-span-2.l\\:col-auto.grid.grid-cols-\\[1fr_auto_1fr\\]');
    const home = teamsDiv.find('a').eq(0).text().replace(/\s+/g, ' ').trim();
    const scoreText = teamsDiv.find('span.whitespace-nowrap').first().text().trim();
    const score = scoreText.match(/\d\s*-\s*\d/) ? scoreText : "Næsti leikur";
    const away = teamsDiv.find('a').eq(1).text().replace(/\s+/g, ' ').trim();
    console.log(`Match ${i+1}: ${home} ${score} ${away}`);
  });
}
run();
