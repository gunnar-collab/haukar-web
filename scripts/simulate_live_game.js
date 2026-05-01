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

const EVENTS = [
  "0:0. Leikur hafinn. Haukar vinna uppkastið og hefja sókn.",
  "2:0. Haukar setja fyrstu stig leiksins. Krystal gerir það.",
  "2:2. Keflavík jafnar strax. Keishana.",
  "8:10. Keishana setur stig fyrir Keflavík og þá eru þær yfir."
];

async function runDemo() {
  console.log("Starting Live Match Simulator (Pushing to Firebase)...");
  
  for (let i = 0; i < EVENTS.length; i++) {
    const text = EVENTS[i];
    console.log(`Pushing event ${i+1}: ${text}`);
    
    await addDoc(collection(db, 'live_match_events'), {
        text: text,
        timestamp: serverTimestamp(),
        matchId: 'kki-finals-2026',
        sport: 'korfubolti'
    });
    
    // Wait 12 seconds between events
    await new Promise(r => setTimeout(r, 12000));
  }
  
  console.log("Demo simulation finished.");
  process.exit(0);
}

runDemo();
