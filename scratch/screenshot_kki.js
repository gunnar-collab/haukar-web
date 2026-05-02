import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  console.log("Navigating...");
  await page.goto("https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162#mbt:6-200$t&0=3", { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({ path: 'scratch/kki_03.png' });
  console.log("Screenshot saved to scratch/kki_03.png");
  await browser.close();
})();
