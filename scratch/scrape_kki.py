import asyncio
import json
from playwright.async_api import async_playwright

# KKÍ Team URLs
MEN_TEAM_URL = "https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=191&season_id=130402&team_id=4760732#mbt:6-200$t&0=5"
WOMEN_TEAM_URL = "https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162"

async def scrape_team_stats(page, url):
    print(f"Navigating to {url}...")
    await page.goto(url)
    
    # Wait for the Genius Sports widget to load
    # It usually contains a table with class 'mbt-table'
    try:
        await page.wait_for_selector(".mbt-table", timeout=15000)
    except:
        print("Timeout waiting for stats table. Genius widget might be slow.")
        return []

    # Extract player stats
    players = await page.evaluate('''() => {
        const rows = Array.from(document.querySelectorAll('.mbt-table tbody tr'));
        return rows.map(row => {
            const cols = row.querySelectorAll('td');
            if (cols.length < 5) return null;
            
            return {
                name: cols[0].innerText.trim(),
                number: cols[1].innerText.trim(),
                mpg: parseFloat(cols[4].innerText) || 0,
                ppg: parseFloat(cols[5].innerText) || 0,
                rpg: parseFloat(cols[6].innerText) || 0,
                apg: parseFloat(cols[7].innerText) || 0,
                eff: parseFloat(cols[cols.length - 1].innerText) || 0
            };
        }).filter(p => p !== null);
    }''')
    
    return players

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        print("Scraping Men's Team...")
        men_players = await scrape_team_stats(page, MEN_TEAM_URL)
        
        print("Scraping Women's Team...")
        women_players = await scrape_team_stats(page, WOMEN_TEAM_URL)
        
        data = {
            "men": men_players,
            "women": women_players,
            "updated": "2026-04-27"
        }
        
        with open("basketball_stats.json", "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
            
        print("Successfully saved to basketball_stats.json")
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
