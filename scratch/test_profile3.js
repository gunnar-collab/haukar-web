import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlProfile = fs.readFileSync('scratch/player_profile.html', 'utf-8');
const $p = cheerio.load(htmlProfile);

const row = $p('table tbody tr').filter((i, tr) => $p(tr).text().includes('2026 Lengjubikar')).first();
console.log("Row HTML:", $p.html(row));
