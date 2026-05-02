import axios from 'axios';
import * as cheerio from 'cheerio';

async function run() {
  const url = 'https://www.ksi.is/leikir-og-urslit/felagslid/leikur?id=7053200';
  const {data} = await axios.get(url);
  const $ = cheerio.load(data);
  const info = $('.match-info').text().replace(/\s+/g, ' ').trim();
  const dateStr = $('.date-time').text().replace(/\s+/g, ' ').trim() || $('div:contains("Dagsetning")').parent().text().replace(/\s+/g, ' ').trim();
  const score = $('.score').text().replace(/\s+/g, ' ').trim() || $('.goals').text().replace(/\s+/g, ' ').trim() || 'No score found';
  console.log("Info:", info);
  console.log("Date:", dateStr);
  console.log("Score:", score);
  // Also dump some relevant looking header parts
  console.log("Header:", $('.container .row .col-12 h1, .container h2, h1, h2').text().replace(/\s+/g, ' ').trim());
  
  // Actually on KSI site, it is often in .match-detail or something.
  // Let's just find anything matching \d{2}:\d{2} or text about the score.
  const allText = $('body').text().replace(/\s+/g, ' ');
  const match = allText.match(/\d{1,2}\.\s+(jan|feb|mar|apr|maí|jún|júl|ágú|sep|okt|nóv|des).*?\d{4}\s*-\s*\d{2}:\d{2}/i);
  if (match) console.log("Found date/time:", match[0]);
  
  const scoreMatch = allText.match(/Þróttur V\.\s+(\d+)\s*-\s*(\d+)\s+Haukar/i) || allText.match(/(\d+)\s*-\s*(\d+)/);
  if (scoreMatch) console.log("Found score:", scoreMatch[0]);
}
run();
