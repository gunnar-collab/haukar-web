import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlMain = fs.readFileSync('scratch/match_main_vidir.html', 'utf-8');
const $m = cheerio.load(htmlMain);

console.log("Sections with events:");
$m('div.border-t.border-navy-stroke').each((i, el) => {
    console.log(`\nSection ${i}:`);
    $m(el).find('.body-5').each((j, b5) => {
        const text = $m(b5).text().replace(/\s+/g, ' ').trim();
        console.log("  Event text:", text);
    });
});
