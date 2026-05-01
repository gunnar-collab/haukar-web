import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import dotenv from 'dotenv';

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

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'haukar_league_data.json');
const DURATION_MS = 2.5 * 60 * 60 * 1000; // 2.5 hours

function getActiveMatch(leagueData) {
    const now = new Date();
    
    for (const division of ['korfubolti_karla', 'korfubolti_kvenna']) {
        if (!leagueData[division] || !leagueData[division].matches) continue;
        
        for (const match of leagueData[division].matches) {
            if (!match.date || !match.time) continue;
            
            // Format time assuming HH:MM
            const matchDateStr = `${match.date}T${match.time.length === 4 ? '0'+match.time : match.time}:00`;
            const matchDate = new Date(matchDateStr);
            
            // Check if the match is currently happening (started less than 2.5 hours ago, or starts in the next 10 mins)
            const diffMs = now - matchDate;
            const startsIn10Mins = diffMs >= -10 * 60 * 1000;
            const hasNotEnded = diffMs <= DURATION_MS;
            
            if (startsIn10Mins && hasNotEnded) {
                return { match, division };
            }
        }
    }
    return null;
}

async function orchestrate() {
    console.log("Checking for active live matches...");
    
    let leagueData = {};
    try {
        const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
        leagueData = JSON.parse(rawData);
    } catch (err) {
        console.error("Failed to read league data:", err);
        process.exit(1);
    }

    const activeMatch = getActiveMatch(leagueData);

    if (!activeMatch) {
        console.log("No active matches found at this time. Exiting.");
        process.exit(0);
    }

    console.log(`Live match detected: ${activeMatch.match.home} vs ${activeMatch.match.away} at ${activeMatch.match.time}`);

    const lockRef = doc(db, 'system_state', 'live_commentary_lock');
    const lockSnap = await getDoc(lockRef);
    const now = Date.now();

    if (lockSnap.exists()) {
        const lockData = lockSnap.data();
        if (lockData.isRunning && lockData.expiresAt > now) {
            console.log("Live commentary is already running in another GitHub Action runner. Exiting safely.");
            process.exit(0);
        }
    }

    // Acquire lock
    console.log("Acquiring lock to start live commentary engine...");
    await setDoc(lockRef, {
        isRunning: true,
        expiresAt: now + DURATION_MS,
        matchInfo: `${activeMatch.match.home} vs ${activeMatch.match.away}`
    });

    console.log("Pushing pre-game introduction event...");
    await addDoc(collection(db, 'live_match_events'), {
        text: `KERFISSKILABOÐ: Leikur er að hefjast! ${activeMatch.match.home} spilar við ${activeMatch.match.away}. Leikurinn byrjar klukkan ${activeMatch.match.time}. Skrifaðu gríðarlega peppaða og spennandi inngangslýsingu til að hita aðdáendur upp!`,
        timestamp: serverTimestamp(),
        matchId: 'kki-finals-2026',
        sport: 'korfubolti'
    });

    // Start the Scraper and the Engine
    console.log("Starting Sub-processes: live_pbp_scraper and ai_commentary_engine...");
    
    const scraper = spawn('node', ['scripts/live_pbp_scraper.js'], { stdio: 'inherit' });
    const engine = spawn('node', ['scripts/ai_commentary_engine.js'], { stdio: 'inherit' });

    // Let them run for 2.5 hours
    await new Promise(resolve => setTimeout(resolve, DURATION_MS));

    console.log("Match duration elapsed. Shutting down engines...");
    scraper.kill();
    engine.kill();

    // Release Lock
    await setDoc(lockRef, {
        isRunning: false,
        expiresAt: 0,
        matchInfo: null
    });

    console.log("Live commentary orchestrator finished successfully.");
    process.exit(0);
}

orchestrate();
