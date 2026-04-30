import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report_vidir.html', 'utf-8');
const $r = cheerio.load(htmlReport);

$r('a[href*="/leikmadur?id="]').each((i, el) => {
    const parentText = $r(el).text().replace(/\s+/g, ' ').trim();
    $r(el).find('svg').each((j, svg) => {
        console.log(`Player: ${parentText.substring(0, 30)}... SVG: ${$r.html(svg)}`);
    });
});
