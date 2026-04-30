import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlMain = fs.readFileSync('scratch/match_main.html', 'utf-8');
const $m = cheerio.load(htmlMain);

console.log("=== MAIN TAB (Events/Atburðir) ===");
// Events are usually in a timeline or list. Let's look for common event classes or table rows.
$m('.event-row, .timeline-event, table tr').slice(0, 15).each((i, el) => {
   const text = $m(el).text().replace(/\s+/g, ' ').trim();
   if(text.length > 0 && text.length < 200) console.log(text);
});
// Alternatively, let's look for specific players to see how they are rendered
const haukar = $m('*:contains("Haukar")').last().text().replace(/\s+/g, ' ').trim().substring(0, 200);
console.log("Sample text containing Haukar:", haukar);


const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

console.log("\n=== REPORT TAB (Lineups/Leikskýrsla) ===");
$r('table').slice(0, 4).each((i, el) => {
   console.log(`Table ${i + 1}:`);
   $r(el).find('tr').slice(0, 5).each((j, tr) => {
       console.log("  Row:", $r(tr).text().replace(/\s+/g, ' ').trim());
   });
});
