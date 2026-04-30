import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlReport = fs.readFileSync('scratch/match_report.html', 'utf-8');
const $r = cheerio.load(htmlReport);

const matchReportDiv = $r('.match-report');
const columnsGrid = matchReportDiv.find('div.l\\:grid-cols-2').first();

console.log("ColumnsGrid children:", columnsGrid.children().length);

columnsGrid.children().each((i, col) => {
    // This is the Home/Away column.
    // Team name is usually at the top or inside it.
    // Let's find all players in this column
    const players = [];
    $r(col).find('a[href*="/leikmadur?id="]').each((j, a) => {
        players.push($r(a).text().replace(/\s+/g, ' ').trim());
    });
    console.log(`Column ${i} has ${players.length} players. First 3:`, players.slice(0,3));
});
