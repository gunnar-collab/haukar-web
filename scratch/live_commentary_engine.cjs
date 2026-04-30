const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin (assuming default application credentials or env variables)
// If you don't have a service account key set up locally, we'll need to use standard firebase client instead, 
// but since this is scratch, let's use standard firebase client with the .env values
require('dotenv').config({ path: '../.env.local' });
require('dotenv').config({ path: '../.env' });
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

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

const mblEvents = [
  "Það er allt að verða reiðubúið til að hefja leikinn. Stemmningin í Ólafssal er frábær í kvöld og við eigum von á hörkuleik.",
  "Lið Íslandsmeistara Hauka: Þóra, Ásdís, Lovísa, Sigrún, Rósa, Tinna, Agnes, Arnheiður, Sólrún, Amandine, Catherine, Krystal.",
  "Mín 0: Haukar vinna uppkastið og hefja sókn.",
  "Mín 1: 2:0 Haukar setja fyrstu stig leiksins. Krystal gerir það.",
  "Mín 1: 2:2. Keflavík jafnar strax. Keishana.",
  "Mín 1: 4:2. Krystal setur aðra körfu fyrir heimaliðið. Haukar vinna síðan boltann.",
  "Mín 2: 6:2. Krystal fer á vítalínuna og setur niður bæði skot sín. Hún er með öll stig Hauka til þessa.",
  "Mín 2: 6:6. Tvær körfur í röð frá Keflavík. Sara og Keishana setja þær og jafna leikinn.",
  "Mín 5: 6:9. Keishana setur þrist fyrir Keflavík og brýtur stigaþurrðina hjá amk Keflavík.",
  "Mín 6: 9:9. Krystal jafnar og heldur áfram að vera með allt stigaskor Hauka í fyrsta leikhluta.",
  "Mín 8: 10:11. Keishana setur stig fyrir Keflavík og þá eru þær yfir.",
  "Mín 8: 12:11. Krystal setur niður tvö vítaskot og kemur Haukum yfir.",
  "Mín 10: Fyrsta leikhluta lokið. Mjög svo jafn leikhluti sem endar með þremur stigum frá Söru Rún. Staðan 13:16 fyrir Keflavík.",
  "Mín 11: 16:16. Amandine jafnar leikinn.",
  "Mín 11: 18:19. Anna Lára setur þrist fyrir Keflavík en Tinna minnkar muninn fyrir Hauka.",
  "Mín 12: 23:19. Sigrún setur layup úr hraðaupphlaupi.",
  "Mín 14: 25:21. Rósa Björk geggjuð undir körfunni hjá Haukum og setur tvö stig.",
  "Mín 15: 30:25. Lovísa setur þrist fyrir Hauka og munurinn er fimm stig sem er sá mesti hingað til í leiknum.",
  "Mín 17: 35:25. Lovísa setur tvö stig og fær að auki villu. Hún hittir úr vítaskotinu. 10 stiga munur.",
  "Mín 18: 37:25. Haukarnir eru að keyra yfir Keflavíkurkonur þessa stundina. 12 stiga munur.",
  "Mín 20: Hálfleikur í Ólafssal þar sem heimakonur úr Haukum leiða leikinn eftir að hafa verið þremur undir eftir fyrsta leikhlutann. Staðan 41:35.",
  "Mín 24: 50:40. Haukar svara strax með þriggja stiga körfu en Sara Rún setur tvö stig í kjölfarið og munurinn er þá 10 stig milli liðanna. Allt opið ennþá.",
  "Mín 28: 63:47. Krystal með þrist og munurinn er þá 16 stig. Haukar eru að ganga frá þessum leik í þriðja leikhluta.",
  "Mín 30: Þriðja leikhluta lokið. Frábær leikhluti hjá Haukum og þær fara með 15 stiga forskot í loka leikhlutann. 66:51.",
  "Mín 32: 72:56. Anna Ingunn setur þrist fyrir Keflavík.",
  "Mín 35: 76:66. Keflavíkurhraðlestin er komin á fullt og er búin að minnka forskot Hauka niður í 10 stig.",
  "Mín 36: 82:68. Haukar koma þessu í 14 stig á nýjan leik og það eru bara 2:52 eftir af leiknum sem er of skammur tími til að jafna þetta fyrir Keflavík.",
  "Mín 39: 86:72. 14 stiga sigur Hauka í kvöld sem eru einum sigri frá úrslitaeinvíginu. Leik lokið!"
];

async function runSimulator() {
  console.log("Starting Live Commentary Engine Simulator...");
  console.log(`Loaded ${mblEvents.length} events to replay.`);

  for (let i = 0; i < mblEvents.length; i++) {
    const eventText = mblEvents[i];
    
    try {
      await addDoc(collection(db, 'live_match_events'), {
        text: eventText,
        timestamp: serverTimestamp(),
        matchId: 'haukar-keflavik-2026',
        sport: 'korfubolti'
      });
      console.log(`[PUSHED] ${eventText}`);
    } catch (e) {
      console.error("Error pushing event:", e);
    }

    // Wait 10 seconds before the next event
    if (i < mblEvents.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
  }
  
  console.log("Match simulator finished!");
  process.exit(0);
}

runSimulator();
