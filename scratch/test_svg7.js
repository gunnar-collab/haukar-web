import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/match_6962753.html', 'utf-8');
const $ = cheerio.load(html);

$('.grid.grid-cols-\\[1fr_auto_1fr\\]').each((i, row) => {
    $(row).find('svg').each((j, svg) => {
        const svgHtml = $.html(svg);
        const parentHtml = $(svg).parent().html() || '';
        const grandParentHtml = $(svg).parent().parent().html() || '';
        if (svgHtml.includes('currentColor')) {
            console.log(`\nRow ${i} SVG uses currentColor`);
            console.log("Parent classes:", $(svg).parent().attr('class'));
            console.log("Grandparent classes:", $(svg).parent().parent().attr('class'));
            console.log("SVG HTML snippet:", svgHtml.substring(0, 150));
        }
    });
});
