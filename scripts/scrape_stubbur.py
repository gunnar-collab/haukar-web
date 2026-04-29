import asyncio
import json
import os
import re
from playwright.async_api import async_playwright

STUBB_URL = "https://stubb.is/haukar/tickets"
DATA_FILE = os.path.join(os.getcwd(), 'src', 'data', 'haukar_league_data.json')

async def scrape_stubbur():
    print("Launching Playwright to scrape Stubbur...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        await page.goto(STUBB_URL)
        
        # Wait for the event cards to load. They usually have 'href' pointing to /events/
        # Since Stubb is a SPA, we wait for network idle or a specific selector.
        try:
            await page.wait_for_load_state("networkidle", timeout=10000)
        except:
            pass # Continue even if it didn't fully idle
            
        # Extract all links that contain "/events/"
        events = await page.evaluate('''() => {
            const links = Array.from(document.querySelectorAll('a[href*="/events/"]'));
            return links.map(a => {
                const url = a.href;
                const textContent = a.innerText || "";
                return { url, textContent };
            });
        }''')
        
        await browser.close()
        
        if not events:
            print("No events found on Stubbur for Haukar right now.")
            return

        # Load local JSON
        try:
            with open(DATA_FILE, "r", encoding="utf-8") as f:
                league_data = json.load(f)
        except Exception as e:
            print(f"Error reading JSON: {e}")
            return

        # Parse the events text to find dates/opponents
        # Stubbur text often looks like: "Haukar - Keflavík\n06. maí kl. 19:15\nÓlafssalur"
        for event in events:
            text = event['textContent']
            url = event['url']
            print(f"Found Stubbur Event: {url}")
            
            # Simple matching: if the text mentions the opponent name, we map it.
            # We loop through all matches in our JSON and see if the opponent name is in the text
            for division_key, division_data in league_data.items():
                if "matches" in division_data:
                    for match in division_data["matches"]:
                        if "Haukar" in match.get("home", ""):
                            away_team = match.get("away", "")
                            # If the away team is in the Stubbur text (case insensitive)
                            if away_team.lower() in text.lower():
                                match["ticketLink"] = url
                                print(f"Mapped {url} to match vs {away_team}")

        # Save back to JSON
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(league_data, f, ensure_ascii=False, indent=2)
            
        print("Stubbur sync complete.")

if __name__ == "__main__":
    asyncio.run(scrape_stubbur())
