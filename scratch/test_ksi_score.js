import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://www.ksi.is/leikir-og-urslit/felagslid/leikur?id=7053200';
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  
  // Usually there's a big score in the header
  const scoreDiv = $('.match-header .score, .text-\\[32rem\\]').text();
  console.log("Raw Score Text:", scoreDiv.trim());
  
  // Or let's just print the text of the main header wrapper
  const headerText = $('h1').parent().text().replace(/\s+/g, ' ').trim();
  console.log("Header text:", headerText);
}
run();
