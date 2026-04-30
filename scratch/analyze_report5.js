import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

const columnsContainer = $r('div.match-report > div.l\\:grid-cols-2').first();
const homeCol = columnsContainer.children().eq(0);

// Print all text in homeCol to see the sections
homeCol.children().each((i, el) => {
    const text = $r(el).text().replace(/\s+/g, ' ').trim();
    if(text.length < 50 && text.length > 0) console.log("Section/Row:", text);
    else if(text.length >= 50) {
        // Probably a list of players
        $r(el).find('a[href*="/leikmadur?id="]').each((j, a) => {
            const playerText = $r(a).parent().text().replace(/\s+/g, ' ').trim();
            console.log("  Player Row:", playerText);
        });
    }
});
