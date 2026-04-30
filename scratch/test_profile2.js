import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlProfile = fs.readFileSync('scratch/player_profile.html', 'utf-8');
const $p = cheerio.load(htmlProfile);

$p('table thead tr').first().find('th').each((i, th) => {
    console.log(`Col ${i}:`, $p(th).text().trim());
});

console.log("Total stats in profile:");
const allTime = $p('.l\\:grid-cols-4 > div').each((i, div) => {
   console.log("Stat Block:", $p(div).text().replace(/\s+/g, ' ').trim());
});
