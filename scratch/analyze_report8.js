import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

const dadiRow = $r('a:contains("Daði Snær Ingason")').parent();
console.log("Daði Row HTML:", dadiRow.html());
