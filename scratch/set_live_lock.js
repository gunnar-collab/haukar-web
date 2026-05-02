import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
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

async function setLock() {
  const lockRef = doc(db, 'system_state', 'live_commentary_lock');
  await setDoc(lockRef, {
    isRunning: true,
    expiresAt: Date.now() + (2 * 60 * 60 * 1000), // 2 hours
    matchInfo: "Keflavík vs Haukar (Simulator)"
  });
  console.log("Live lock set!");
  process.exit(0);
}

setLock();
