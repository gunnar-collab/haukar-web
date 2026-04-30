import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/match_6962749.html', 'utf-8');
const $ = cheerio.load(html);

$('.grid.grid-cols-\\[1fr_auto_1fr\\]').each((i, row) => {
    $(row).find('svg').each((j, svg) => {
        const svgHtml = $.html(svg);
        if (svgHtml.includes('rect') || $(svg).find('rect').length > 0) {
            console.log(`Found rect SVG at row ${i}:`, svgHtml);
        } else if (svgHtml.includes('bg-brand-warning') || $(svg).parent().attr('class')?.includes('bg-brand-warning')) {
            console.log(`Found bg-brand-warning SVG at row ${i}:`, svgHtml);
        } else if ($(svg).parent().html().includes('#F2C94C') || $(svg).parent().html().includes('yellow')) {
            console.log(`Found yellow SVG at row ${i}:`, svgHtml);
        }
    });
});

console.log("Dumping all timeline texts:");
$('.grid.grid-cols-\\[1fr_auto_1fr\\]').each((i, row) => {
    console.log($(row).text().replace(/\s+/g, ' ').trim());
});
