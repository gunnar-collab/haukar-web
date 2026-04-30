import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlMain = fs.readFileSync('scratch/match_main_vidir.html', 'utf-8');
const $m = cheerio.load(htmlMain);

console.log("Looking for yellow/red cards in match_main_vidir...");
$m('.grid.grid-cols-\\[1fr_auto_1fr\\] svg').each((i, svg) => {
    const html = $m.html(svg);
    // Yellow card often uses #F2C94C or #F1C40F
    // Red card often uses #E74C3C or #EB5757
    if (html.includes('rect') || html.includes('F2C94C') || html.includes('E74C3C') || html.includes('F1C40F') || html.includes('EB5757')) {
        console.log("Found card SVG:", html);
    } else {
        console.log("Other SVG:", html);
    }
});
