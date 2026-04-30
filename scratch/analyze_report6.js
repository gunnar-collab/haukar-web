import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

const columnsContainer = $r('div.match-report > div.l\\:grid-cols-2').first();
const homeCol = columnsContainer.children().eq(0);

console.log("HomeCol child count:", homeCol.children().length);
console.log("HomeCol classes:", homeCol.attr('class'));

homeCol.children().each((i, c) => {
   console.log(`Child ${i} text length:`, $r(c).text().trim().length, `content:`, $r(c).text().replace(/\s+/g, ' ').trim().substring(0, 100));
});

