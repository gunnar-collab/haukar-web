import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        # Intercept network requests
        page.on("response", lambda response: print(f"Response: {response.url} (Status: {response.status})") if "json" in response.url.lower() or "api" in response.url.lower() else None)
        
        print("Navigating to Women's KKÍ page...")
        await page.goto("https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162#mbt:6-200$t&0=5")
        
        # Wait for the table to appear
        try:
            await page.wait_for_selector(".mbt-table", timeout=10000)
            print("Table loaded. Waiting 3 seconds for all requests to finish...")
            await asyncio.sleep(3)
        except Exception as e:
            print("Timeout waiting for table.")
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
