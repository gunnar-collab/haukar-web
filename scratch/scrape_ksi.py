import asyncio
import json
from playwright.async_api import async_playwright

LENGJUDEILD_KVENNA_URL = "https://www.ksi.is/oll-mot/mot?id=7025676"

async def scrape_ksi_standings(page):
    print(f"Navigating to {LENGJUDEILD_KVENNA_URL}...")
    await page.goto(LENGJUDEILD_KVENNA_URL)
    
    # Wait for the standings table to load
    try:
        await page.wait_for_selector("table.table", timeout=15000)
    except Exception as e:
        print("Timeout waiting for stats table.")
        return []

    # Extract standings
    standings = await page.evaluate('''() => {
        const rows = Array.from(document.querySelectorAll('table.table tbody tr'));
        return rows.map((row, idx) => {
            const cols = row.querySelectorAll('td');
            if (cols.length < 9) return null; // Make sure it's a valid data row
            
            return {
                rank: parseInt(cols[0].innerText.trim()) || (idx + 1),
                team: cols[1].innerText.trim(),
                played: parseInt(cols[2].innerText.trim()) || 0,
                wins: parseInt(cols[3].innerText.trim()) || 0,
                draws: parseInt(cols[4].innerText.trim()) || 0,
                losses: parseInt(cols[5].innerText.trim()) || 0,
                goalsFor: parseInt(cols[6].innerText.trim()) || 0,
                goalsAgainst: parseInt(cols[7].innerText.trim()) || 0,
                points: parseInt(cols[8].innerText.trim()) || 0
            };
        }).filter(t => t !== null);
    }''')
    
    return standings

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print("Scraping Lengjudeild kvenna standings...")
        standings = await scrape_ksi_standings(page)
        print(json.dumps(standings, indent=2, ensure_ascii=False))
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
