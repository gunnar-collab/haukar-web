import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlMain = fs.readFileSync('scratch/match_main.html', 'utf-8');
const $m = cheerio.load(htmlMain);

console.log("Looking for yellow/red cards in match_main...");
$m('svg').each((i, svg) => {
    const html = $m.html(svg);
    if (html.includes('rect') || html.toLowerCase().includes('yellow') || html.includes('F2C94C') || html.includes('E74C3C') || html.includes('F1C40F') || html.includes('EB5757') || html.includes('#E2B93B') || html.includes('#D32F2F')) {
        console.log("Found card-like SVG:", html);
    }
});
