import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

console.log("=== STARTING LINEUPS === ");
$r('.grid.grid-cols-\\[1fr_auto_1fr\\]').each((i, grid) => {
    // Sometimes the lists are in grid items
    console.log(`Grid ${i}:`);
    $r(grid).find('div').each((j, div) => {
        const text = $r(div).text().replace(/\s+/g, ' ').trim();
        if(text.includes('Byrjunarlið') || text.includes('Varamenn')) {
            console.log(`  Div ${j}:`, text.substring(0, 300));
        }
    });
});

// Let's print out all links since players are usually wrapped in an 'a' tag.
console.log("=== LINKS IN REPORT ===");
$r('a[href*="/leikmadur?id="]').slice(0, 10).each((i, el) => {
    console.log("Player:", $r(el).text().replace(/\s+/g, ' ').trim());
});

