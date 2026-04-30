import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/match_6962749.html', 'utf-8');
const $ = cheerio.load(html);

console.log($('.grid.grid-cols-\\[1fr_auto_1fr\\]').eq(1).html());
