import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

// Find the main container for Byrjunarlið
// Usually it's under a div that contains "Byrjunarlið" "Byrjunarlið"
const h2 = $r('h2:contains("Byrjunarlið")');
console.log("h2 length:", h2.length);

const byrjunarliðDivs = $r('div.body-1:contains("Byrjunarlið")');
console.log("div.body-1 contains Byrjunarlið:", byrjunarliðDivs.length);

$r('div.match-report').children().each((i, el) => {
   console.log(`Child ${i} classes:`, $r(el).attr('class'));
});
