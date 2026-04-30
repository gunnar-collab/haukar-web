import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/test_ksi.html', 'utf-8');
const $ = cheerio.load(html);

$('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
   const comp = $(el).find('.hidden.l\\:flex a span.body-5').first().text().replace(/\s+/g, ' ').trim();
   const date = $(el).find('.flex.items-center.gap-\\[8rem\\] span.body-5').first().text().replace(/\s+/g, ' ').trim();
   
   const teamsDiv = $(el).find('.col-span-2.l\\:col-auto.grid.grid-cols-\\[1fr_auto_1fr\\]');
   const home = teamsDiv.find('a').eq(0).text().replace(/\s+/g, ' ').trim();
   const score = teamsDiv.find('span.whitespace-nowrap').first().text().trim();
   const away = teamsDiv.find('a').eq(1).text().replace(/\s+/g, ' ').trim();
   
   const linkHref = $(el).find('a[href*="/leikur?id="]').attr('href');
   const matchId = linkHref ? linkHref.split('id=')[1] : null;

   console.log(`Match ${i}: Date: [${date}], Comp: [${comp}], Home: [${home}], Score: [${score}], Away: [${away}], ID: [${matchId}]`);
});
