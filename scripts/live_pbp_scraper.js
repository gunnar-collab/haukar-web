import puppeteer from 'puppeteer';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load env variables
dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Example KKÍ Play-By-Play URL (Finals)
// Replace with the actual URL when the final starts
const LIVE_URL = "https://kki.is/motamal/leikir-og-urslit/motayfirlit/Eitt-lid?league_id=189&season_id=130422&team_id=4760162#mbt:6-200$t&0=3";
const MATCH_ID = 'kki-finals-2026';

let processedEvents = new Set();

async function startScraping() {
  console.log("Starting Live Play-by-Play Scraper...");
  
  const browser = await puppeteer.launch({ 
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox'] 
  });
  
  const page = await browser.newPage();
  
  try {
    await page.goto(LIVE_URL, { waitUntil: 'domcontentloaded' });
    console.log("Connected to Genius Sports feed. Waiting for events...");

    // Loop indefinitely to keep checking for new events
    while (true) {
      try {
        await page.waitForSelector('.mbt-table', { timeout: 10000 });
        
        const newEvents = await page.evaluate(() => {
           const rows = Array.from(document.querySelectorAll('.mbt-table tbody tr'));
           return rows.map(row => {
               const cols = row.querySelectorAll('td');
               if (cols.length < 3) return null;
               
               const time = cols[0]?.innerText.trim() || '';
               const eventText = cols[1]?.innerText.trim() || '';
               const score = cols[2]?.innerText.trim() || '';
               
               if (!eventText) return null;
               
               return {
                   rawString: `Mín: ${time} | Atburður: ${eventText} | Staða: ${score}`,
                   id: `${time}-${eventText}` // unique identifier
               };
           }).filter(Boolean);
        });

        // Check for events we haven't seen yet
        // Since play-by-play usually lists newest at the top or bottom, we process them
        // Let's reverse them if they are newest at top to process chronological, or just push new ones
        for (let i = newEvents.length - 1; i >= 0; i--) {
            const event = newEvents[i];
            if (!processedEvents.has(event.id)) {
                processedEvents.add(event.id);
                console.log(`[NEW EVENT DETECTED]: ${event.rawString}`);
                
                // Push to Firebase
                await addDoc(collection(db, 'live_match_events'), {
                    text: event.rawString,
                    timestamp: serverTimestamp(),
                    matchId: MATCH_ID,
                    sport: 'korfubolti'
                });
            }
        }
      } catch (e) {
        // Just suppress timeout errors in case the table hasn't loaded yet
      }

      // Wait 30 seconds before polling again
      await new Promise(resolve => setTimeout(resolve, 30000));
    }

  } catch (error) {
    console.error("Fatal Scraper Error:", error);
  } finally {
    await browser.close();
  }
}

startScraping();
