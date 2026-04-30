import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

console.log("=== STARTING LINEUPS ===");
// In KSÍ, the lineups are usually listed with player names, numbers, etc.
$r('.body-5').each((i, el) => {
    const text = $r(el).text().replace(/\s+/g, ' ').trim();
    if(text.length > 5 && text.length < 50) {
        // Just print some random body text to see what we have
        // console.log(text);
    }
});

// Let's specifically look for player lists. 
// Often there's a div containing "Byrjunarlið" or something.
$r('*:contains("Byrjunarlið")').last().parent().find('span').each((i, el) => {
    const text = $r(el).text().replace(/\s+/g, ' ').trim();
    if(text.length > 0) console.log(text);
});

