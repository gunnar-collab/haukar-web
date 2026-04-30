import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

console.log("--- SVG from Report Players ---");
$r('a[href*="/leikmadur?id="]').each((i, el) => {
    const parentText = $r(el).text().replace(/\s+/g, ' ').trim();
    $r(el).find('svg').each((j, svg) => {
        const svgHtml = $r.html(svg);
        if (svgHtml.includes('rect') || svgHtml.includes('path')) {
            console.log(`Player: ${parentText.substring(0, 30)}... SVG: ${svgHtml}`);
        }
    });
});

const htmlMain = fs.readFileSync('scratch/match_main.html', 'utf-8');
const $m = cheerio.load(htmlMain);

console.log("\n--- SVG from Main Match Page ---");
$m('.grid.grid-cols-\\[1fr_auto_1fr\\] svg').each((i, svg) => {
   const svgHtml = $m.html(svg);
   console.log(`Main Event SVG: ${svgHtml}`);
});
