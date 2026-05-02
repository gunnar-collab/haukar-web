import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  console.log("Navigating to team page...");
  await page.goto("https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162#mbt:6-200$t&0=1", { waitUntil: 'networkidle2' });
  
  await page.waitForSelector('.mbt-table', { timeout: 15000 });
  
  const matchLinks = await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll('.mbt-table tbody tr'));
    return rows.map(row => {
      const home = row.querySelector('td:nth-child(3)')?.innerText.trim();
      const away = row.querySelector('td:nth-child(5)')?.innerText.trim();
      const link = row.querySelector('a')?.href;
      const date = row.querySelector('td:nth-child(1)')?.innerText.trim();
      return { home, away, link, date };
    }).filter(m => m.home && m.link);
  });
  
  console.log("Found matches:");
  matchLinks.forEach(m => console.log(m));
  
  await browser.close();
})();
