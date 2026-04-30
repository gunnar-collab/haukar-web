import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/match_6962753.html', 'utf-8');
const $ = cheerio.load(html);

console.log("SVGs in timeline grid:");
$('.grid.grid-cols-\\[1fr_auto_1fr\\]').each((i, row) => {
    console.log(`\nRow ${i}:`);
    const leftText = $(row).children().eq(0).text().replace(/\s+/g, ' ').trim();
    const rightText = $(row).children().eq(2).text().replace(/\s+/g, ' ').trim();
    console.log(`  Left: ${leftText} | Right: ${rightText}`);
    
    // check left, mid, right SVGs
    $(row).find('svg').each((j, svg) => {
        console.log(`  SVG ${j}:`, $.html(svg));
    });
});
