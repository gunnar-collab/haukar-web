import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/match_6962749.html', 'utf-8');
const $m = cheerio.load(html);

$m('.match-event').each((i, el) => {
    // Try different selectors
    const iconWrapper = $m(el).find('.w-\\[32rem\\]\\.h-\\[32rem\\]'); // Maybe dot chaining is wrong?
    console.log(`Event ${i}: iconWrapper length =`, iconWrapper.length);
    
    // Better way: find any div with bg-[#FAC83C] inside the event!
    const yCards = $m(el).find('[class*="FAC83C"]');
    console.log(`Event ${i}: yellow cards length =`, yCards.length);
});
