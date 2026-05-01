import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp, where } from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
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

const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

const MATCH_ID = 'kki-finals-2026';
let lastProcessedEventId = null;

const systemPrompt = `Þú ert 'Haukur', mjög ástríðufullur og örlítið hlutdrægur gervigreindar-lýsandi fyrir Knattspyrnufélagið Hauka á Íslandi.
Þú ert að lýsa leik SEM ER Í GANGI NÚNA. Þú færð hrá gögn og breytir þeim í 1-2 setningar af LIFANDI LÝSINGU.

***LIFANDI LÝSING - REGLA UM TÓN***
1. Ef Haukar skora eða gera eitthvað gott: Vertu FRÁBÆRLEGA ÁSTRÍÐUFULLUR! Notaðu hástafi, fagnaðu eins og óður maður, notaðu 🔴⚪️ 🔥 og önnur emojis. "ÞVÍLÍK KARFA!! ÁFRAM HAUKAR!!"
2. Ef ANDSTÆÐINGURINN skorar eða gerir eitthvað gott: Gefðu LÝSANDI og NÁKVÆMA lýsingu á atvikinu en vertu ALGJÖRLEGA ÞURR, FORMAL, LEIÐINLEGUR OG LÁTLAUS. Sýndu enga gleði og notaðu ENGIN EMOJIS.
3. EF STIGASTAÐA (t.d. 30:25) kemur fram í atburðinum, MUNDU AÐ NEFNA STÖÐUNA Í LÝSINGUNNI ÞINNI svo aðdáendur geti fylgst með skori leiksins!

ALDREI nota orðið "korfa", það heitir "karfa".
MIKILVÆGT UM KÖRFUBOLTA: Í körfubolta skorar maður STIG eða KÖRFU (t.d. "2 stiga karfa", "3 stiga karfa", "skoraði stig"). ALDREI nota orðið "mörk" eða "mark" þegar þú talar um körfubolta!
Notaðu eðlilegt íslenskt slangur.
Haltu þessu stuttu, hröðu og grípandi!`;

async function processEvent(eventData) {
    console.log(`\nProcessing raw event: ${eventData.text}`);
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${systemPrompt}\n\nNýr Atburður: ${eventData.text}`,
        });
        
        const commentary = response.text;
        console.log(`[GENERATED] ${commentary}`);
        
        // Push the finalized AI commentary back to Firebase
        await addDoc(collection(db, 'live_commentary_stream'), {
            text: commentary,
            timestamp: serverTimestamp(),
            matchId: eventData.matchId,
            sport: eventData.sport
        });
        
    } catch (error) {
        console.error("Gemini API Error:", error);
    }
}

function startEngine() {
    console.log("Starting Backend AI Commentary Engine...");
    
    const q = query(
      collection(db, 'live_match_events'),
      where('matchId', '==', MATCH_ID),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        
        if (lastProcessedEventId !== doc.id) {
            lastProcessedEventId = doc.id;
            // Process only if it's a new event created after engine start
            // To prevent processing old events on startup, we check the timestamp (optional)
            processEvent(doc.data());
        }
      }
    });
}

startEngine();
