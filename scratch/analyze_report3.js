import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

// Look for team names
const teams = [];
$r('.body-1').each((i, el) => {
   teams.push($r(el).text().replace(/\s+/g, ' ').trim());
});
console.log("Teams headers:", teams);

// Look for grid columns
const cols = $r('.grid.grid-cols-2 > div, .grid.grid-cols-\\[1fr_1fr\\] > div');
console.log("Found grid columns:", cols.length);

if (cols.length >= 2) {
    const homeCol = cols.eq(0);
    const awayCol = cols.eq(1);

    console.log("Home column players:");
    homeCol.find('a[href*="/leikmadur?id="]').slice(0,3).each((i, el) => {
        console.log($r(el).text().replace(/\s+/g, ' ').trim());
    });

    console.log("Away column players:");
    awayCol.find('a[href*="/leikmadur?id="]').slice(0,3).each((i, el) => {
        console.log($r(el).text().replace(/\s+/g, ' ').trim());
    });
}
