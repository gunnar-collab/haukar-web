import fs from 'fs';
import * as cheerio from 'cheerio';

const htmlMain = fs.readFileSync('scratch/match_main.html', 'utf-8');
const $m = cheerio.load(htmlMain);

const goalScorers = {};
// Let's find all the body-5 divs that contain goal information
// They are usually under the border-t border-navy-stroke
const goalsGrid = $m('div.border-t.border-navy-stroke');

console.log("Goals grid found:", goalsGrid.length);
goalsGrid.children().each((colIndex, col) => {
    // Only parse if it's the home or away column, ignoring the middle svg
    if ($m(col).prop('tagName').toLowerCase() === 'svg') return;
    
    $m(col).find('div.body-5').each((j, el) => {
        const spans = $m(el).find('span');
        if (spans.length >= 2) {
            const playerName = $m(spans[0]).text().trim();
            const goalTimes = $m(spans[1]).text().trim();
            const goals = (goalTimes.match(/´/g) || []).length;
            if (goals > 0) {
               console.log(`Column ${colIndex}: Player: ${playerName}, Goals: ${goals} (${goalTimes})`);
               goalScorers[playerName] = (goalScorers[playerName] || 0) + goals;
            }
        }
    });
});
console.log("Final Scorers:", goalScorers);

