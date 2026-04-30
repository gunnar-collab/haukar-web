import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlProfile = fs.readFileSync('scratch/player_profile.html', 'utf-8');
const $p = cheerio.load(htmlProfile);

// Let's find the stats table.
// Usually under .table or similar.
console.log("Looking for 2026 stats...");
$p('table tbody tr').each((i, tr) => {
    const text = $p(tr).text().replace(/\s+/g, ' ').trim();
    if (text.includes('2026') && text.includes('Haukar')) {
        console.log("2026 Row:", text);
    }
});
