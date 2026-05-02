import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://www.ksi.is/leikir-og-urslit/felagslid/leikur?id=7053200';
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  
  const h1 = $('h1').first();
  console.log("h1 text:", h1.text().trim());
  const scoreSpan = h1.parent().find('span').filter((i, el) => $(el).text().includes('-'));
  console.log("Score span:", scoreSpan.first().text().trim());
}
run();
