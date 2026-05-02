import puppeteer from 'puppeteer';
async function test() {
  const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto("https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162#mbt:6-200$t&0=1", { waitUntil: 'networkidle2' });
  await page.waitForSelector('.mbt-table', { timeout: 15000 });
  const html = await page.evaluate(() => {
     return document.querySelector('.mbt-table').innerText;
  });
  console.log(html);
  await browser.close();
}
test();
