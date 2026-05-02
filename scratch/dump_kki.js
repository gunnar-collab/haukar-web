import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto("https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162#mbt:6-200$t&0=1", { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('.mbt-table', { timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  const html = await page.evaluate(() => document.querySelector('.mbt-table').outerHTML);
  import('fs').then(fs => fs.writeFileSync('scratch/kki_table.html', html));
  console.log("Done");
  await browser.close();
})();
