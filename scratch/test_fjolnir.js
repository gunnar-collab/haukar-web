import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/match_fjolnir.html', 'utf-8');
const $ = cheerio.load(html);

console.log("Looking for events in match_fjolnir.html");
$('.grid.grid-cols-\\[1fr_auto_1fr\\]').each((i, row) => {
    console.log(`\nRow ${i}:`);
    const leftText = $(row).children().eq(0).text().replace(/\s+/g, ' ').trim();
    const middleHtml = $(row).children().eq(1).html();
    const rightText = $(row).children().eq(2).text().replace(/\s+/g, ' ').trim();
    console.log(`  Left: ${leftText}`);
    console.log(`  Mid HTML: ${middleHtml ? middleHtml.substring(0, 150) : ''}`);
    console.log(`  Right: ${rightText}`);
    
    // check left and right for SVGs too
    const leftSvg = $(row).children().eq(0).find('svg').html();
    if (leftSvg) console.log(`  Left SVG color:`, leftSvg.match(/fill="[^"]+"|stroke="[^"]+"/g));
    
    const rightSvg = $(row).children().eq(2).find('svg').html();
    if (rightSvg) console.log(`  Right SVG color:`, rightSvg.match(/fill="[^"]+"|stroke="[^"]+"/g));
});
