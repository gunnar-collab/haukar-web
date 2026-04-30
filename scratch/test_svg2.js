import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlMain = fs.readFileSync('scratch/match_main.html', 'utf-8');
const $m = cheerio.load(htmlMain);

console.log("All SVGs in grid events:");
$m('.grid.grid-cols-\\[1fr_auto_1fr\\] svg').each((i, svg) => {
    console.log(`Event SVG:`, $m.html(svg));
});
