import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import admin from 'firebase-admin';
import axios from 'axios';

import { HAUKAR_STATIC_KNOWLEDGE } from '../src/data/staticKnowledge.js';
import { newsArticles } from '../src/data/newsData.js';
import { footballNews } from '../src/data/fotboltiData.js';
import { dataKarla, dataKvenna } from '../src/data/handboltiData.js';
import { dataKarla as fotboltiKarla, dataKvenna as fotboltiKvenna } from '../src/data/fotboltiData.js';
import { dataKarla as korfuKarla, dataKvenna as korfuKvenna } from '../src/data/korfuboltiData.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Initialize Firebase Admin SDK
// This relies on the Application Default Credentials (e.g., from 'gcloud auth application-default login' or 'firebase login')
admin.initializeApp({
  projectId: process.env.VITE_FIREBASE_PROJECT_ID
});

const db = admin.firestore();

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

async function getEmbedding(text) {
  try {
    const response = await ai.models.embedContent({
      model: 'embedding-001',
      contents: text,
    });
    return response.embeddings[0].values;
  } catch (error) {
    console.error("Error generating embedding:", error.message || error);
    return null;
  }
}

async function fetchPdfText(url) {
  try {
    console.log(`Fetching PDF: ${url}`);
    const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' });
    const pdfParseModule = await import('pdf-parse');
    const pdfParse = typeof pdfParseModule.default === 'function' ? pdfParseModule.default : pdfParseModule;
    const data = await (typeof pdfParse === 'function' ? pdfParse(response.data) : pdfParse.default(response.data));
    return data.text;
  } catch (error) {
    console.error(`Error processing PDF from ${url}:`, error.message);
    return null;
  }
}

// Helper to chunk text roughly into manageable sizes
function chunkText(text, maxChars = 2000) {
  const paragraphs = text.split('\n\n').filter(p => p.trim().length > 0);
  const chunks = [];
  let currentChunk = "";
  
  for (const para of paragraphs) {
    if ((currentChunk.length + para.length) > maxChars && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = "";
    }
    currentChunk += para + "\n\n";
  }
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }
  return chunks;
}

async function processAndStore(title, category, fullText) {
  console.log(`Processing: [${category}] ${title}`);
  const chunks = chunkText(fullText);
  
  for (let i = 0; i < chunks.length; i++) {
    const chunkText = chunks[i];
    
    try {
      const docRef = db.collection('knowledgeBase').doc();
      await docRef.set({
        title,
        category,
        content: chunkText,
        chunkIndex: i
      });
      console.log(`  -> Stored chunk ${i+1}/${chunks.length}`);
    } catch (e) {
      console.error('Firebase error:', e.message);
    }
  }
}

async function buildVectorDB() {
  console.log("Starting Vector DB Build Process...");
  
  // 1. Process Static Knowledge
  await processAndStore("Haukar Almennar Upplýsingar", "General", HAUKAR_STATIC_KNOWLEDGE);
  
  // 2. Process News Articles
  for (const article of newsArticles) {
    // Strip simple HTML tags from content for better embedding
    const cleanContent = article.content.replace(/<[^>]*>?/gm, '');
    const fullText = `Title: ${article.title}\nDate: ${article.date || 'Unknown'}\nCategory: ${article.category}\n\n${article.lead}\n\n${cleanContent}`;
    await processAndStore(article.title, "News", fullText);
  }
  
  // 3. Process Football News
  for (const fn of footballNews) {
    await processAndStore(fn.title, "Football News", `Title: ${fn.title}\nDate: ${fn.date}\nCategory: ${fn.category}`);
  }
  
  // 4. Process Player Bios & Stats (Combine into text)
  const processSportsData = async (data, sport, gender) => {
    if (!data || !data.players) return;
    for (const p of data.players) {
      const text = `Leikmaður í ${sport} ${gender}: ${p.name}. Staða: ${p.position}. Nær: ${p.number}. \nUpplýsingar: ${p.bio}\nTölfræði: Leikir: ${p.stats?.gamesPlayed || 0}, Mörk: ${p.stats?.goals || 0}`;
      await processAndStore(`Leikmaður: ${p.name}`, `Player Bio - ${sport}`, text);
    }
  };
  
  await processSportsData(dataKarla, 'Handbolti', 'Karla');
  await processSportsData(dataKvenna, 'Handbolti', 'Kvenna');
  await processSportsData(fotboltiKarla, 'Fótbolti', 'Karla');
  await processSportsData(fotboltiKvenna, 'Fótbolti', 'Kvenna');
  await processSportsData(korfuKarla, 'Körfubolti', 'Karla');
  await processSportsData(korfuKvenna, 'Körfubolti', 'Kvenna');
  
  // 5. Process PDFs
  const pdfUrls = [
    { title: 'Ársskýrsla Hauka 2024', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_Ársskýrsla-2024_LowRes02.pdf' },
    { title: 'Ársskýrsla Hauka 2023', url: 'https://www.haukar.is/wp-content/uploads/2024/05/Haukar_Ársskýrsla-2023_NET.pdf' }
  ];
  
  for (const pdf of pdfUrls) {
    const text = await fetchPdfText(pdf.url);
    if (text) {
      await processAndStore(pdf.title, "Annual Report", text);
    }
  }
  
  console.log("Vector DB Build Complete!");
  process.exit(0);
}

buildVectorDB().catch(console.error);
