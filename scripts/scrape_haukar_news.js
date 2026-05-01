import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Setup Gemini
const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });

const WP_API_URL = 'https://www.haukar.is/wp-json/wp/v2/posts?_embed&per_page=40';
const OUT_FILE = path.join(__dirname, '..', 'src', 'data', 'newsData.js');
const IMG_DIR = path.join(__dirname, '..', 'public', 'images', 'news');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

const stripHtml = (html) => cheerio.load(html).text().replace(/\n/g, ' ').trim();

async function downloadImage(url, filename) {
  try {
      const response = await axios({ url, responseType: 'arraybuffer' });
      await sharp(response.data)
          .resize({ width: 1280, withoutEnlargement: true })
          .webp({ quality: 85 })
          .toFile(filename);
      return true;
  } catch (e) {
      console.error(`[Download Error] ${e.message}`);
      return false;
  }
}

async function generateAIImage(title, sport, filename) {
  try {
      console.log(`[AI] Generating image for: "${title}"`);
      
      let sportContext = "sports";
      if (sport === 'fotbolti') sportContext = "football/soccer";
      if (sport === 'handbolti') sportContext = "handball";
      if (sport === 'korfubolti') sportContext = "basketball";
      if (sport === 'karate') sportContext = "karate";

      const prompt = `A highly cinematic, photorealistic ${sportContext} image representing: "${title}". Haukar is an Icelandic sports club with red and white colors. The image should look professional, dynamic, and dramatic. Do NOT include any text, letters, or words in the image. Purely visual photography style.`;
      
      const response = await ai.models.generateImages({
          model: 'imagen-4.0-generate-001',
          prompt: prompt,
          config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9'
          }
      });
      
      const base64Image = response.generatedImages[0].image.imageBytes;
      const buffer = Buffer.from(base64Image, 'base64');
      await sharp(buffer)
          .webp({ quality: 85 })
          .toFile(filename);
      console.log(`[AI] Successfully saved generated image!`);
      return true;
  } catch (e) {
      console.error(`[AI Error] ${e.message}`);
      return false;
  }
}

async function analyzeArticleWithAI(title, content) {
  try {
      const prompt = `You are the content editor for Haukar, an Icelandic sports club.
Task 1: Categorize the news article into exactly ONE of these categories:
- Meistaraflokkur
- Yngri Flokkar
- Viðburðir
- Félagið
- Afreksstarf

Task 2: Write a clean, professional, and captivating 1-2 sentence lead/excerpt (max 150 characters) summarizing the article in Icelandic. Do NOT end it abruptly or with '...'. Avoid weird WordPress shortcuts.

Article Title: ${title}
Article Content snippet: ${content.substring(0, 1000)}

Respond with a valid JSON object matching this schema:
{
  "category": "category name",
  "lead": "clean summary here"
}`;

      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
      });
      const data = JSON.parse(response.text.trim());
      const validCategories = ['Meistaraflokkur', 'Yngri Flokkar', 'Viðburðir', 'Félagið', 'Afreksstarf'];
      return {
          category: validCategories.includes(data.category) ? data.category : 'Félagið',
          lead: data.lead || ''
      };
  } catch (e) {
      console.error(`[AI Analysis Error] ${e.message}`);
      return { category: 'Félagið', lead: '' };
  }
}

const sportMap = {
  'fotbolti': ['fótbolti', 'knattspyrnudeild'],
  'handbolti': ['handbolti', 'handknattleiksdeild'],
  'korfubolti': ['körfubolti'],
  'karate': ['karate'],
  'skak': ['skák']
};

function determineSport(categories) {
  for (const cat of categories) {
      const name = cat.name.toLowerCase();
      for (const [sport, keywords] of Object.entries(sportMap)) {
          if (keywords.some(k => name.includes(k))) return sport;
      }
  }
  return 'felagid';
}

function formatDate(isoString) {
  const date = new Date(isoString);
  const months = ['janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember'];
  return `${date.getDate()}. ${months[date.getMonth()]} ${date.getFullYear()}`;
}

async function run() {
  console.log(`Fetching latest news from haukar.is...`);
  const response = await axios.get(WP_API_URL);
  const posts = response.data;
  
  const newsArticles = [];
  
  for (const post of posts) {
      const title = stripHtml(post.title.rendered);
      const slug = post.slug;
      const date = formatDate(post.date);
      let rawContent = post.content.rendered;
      
      // Process and Strip Images
      const $ = cheerio.load(rawContent);
      const articleImages = [];
      let imgCount = 0;
      
      $('img').each((i, el) => {
          const src = $(el).attr('srcset') || $(el).attr('data-lazy-src') || $(el).attr('src');
          if (src) {
              // Usually srcset is "url size, url size". We want the last URL.
              let bestUrl = src;
              if (src.includes('w,')) {
                  const parts = src.split(',').map(s => s.trim().split(' ')[0]);
                  bestUrl = parts[parts.length - 1]; // The largest one
              }
              if (bestUrl && !bestUrl.includes('1x1.trans.gif')) {
                  articleImages.push(bestUrl);
              }
          }
          $(el).remove(); // Strip from content
      });
      
      // Also remove any empty <a> tags that used to wrap the images
      $('a').each((i, el) => {
          if ($(el).html().trim() === '') {
              $(el).remove();
          }
      });
      
      const cleanContent = $('body').html() || '';

      let categories = [];
      if (post._embedded && post._embedded['wp:term']) {
          categories = post._embedded['wp:term'][0] || [];
      }
      
      const sport = determineSport(categories);
      
      console.log(`[Processing] ${title} - Pausing briefly to respect AI API limits...`);
      await sleep(2500);
      
      console.log(`[Processing] ${title} - AI Analysis...`);
      const { category: aiCategory, lead: aiLead } = await analyzeArticleWithAI(title, stripHtml(cleanContent));
      const cleanLead = aiLead || stripHtml(post.excerpt.rendered).substring(0, 150).replace(/(\s\S*)$/, '') + '...';
      
      // Handle Image
      let localImagePath = `/images/news/${slug}.webp`;
      let absoluteImgPath = path.join(IMG_DIR, `${slug}.webp`);
      
      let imageUrl = null;
      if (post._embedded && post._embedded['wp:featuredmedia']) {
          imageUrl = post._embedded['wp:featuredmedia'][0].source_url;
      }

      // Check if image exists locally first
      if (!fs.existsSync(absoluteImgPath)) {
         if (!imageUrl || imageUrl.includes('Merki-Hauka') || imageUrl.toLowerCase().includes('logo')) {
             // Generate AI Image
             console.log(`[Processing] ${title} - Found generic/missing image. Engaging AI...`);
             await generateAIImage(title, sport, absoluteImgPath);
         } else {
             // Download Real Image
             console.log(`[Processing] ${title} - Downloading real image...`);
             await downloadImage(imageUrl, absoluteImgPath);
         }
      } else {
         console.log(`[Processing] ${title} - Image already exists locally. Skipping...`);
      }
      
      // Handle Gallery Images
      const galleryPaths = [];
      for (const [index, imgUrl] of articleImages.entries()) {
          // Exclude the hero image if it's the exact same
          if (imageUrl && imgUrl.includes(imageUrl)) continue;
          
          const galleryFileName = `${slug}_gallery_${index}.webp`;
          const absoluteGalleryPath = path.join(IMG_DIR, galleryFileName);
          
          if (!fs.existsSync(absoluteGalleryPath)) {
              console.log(`[Processing] ${title} - Downloading gallery image ${index + 1}...`);
              await downloadImage(imgUrl, absoluteGalleryPath);
          }
          galleryPaths.push(`/images/news/${galleryFileName}`);
      }

      newsArticles.push({
          slug,
          sport,
          category: aiCategory,
          date,
          title,
          lead: cleanLead,
          image: localImagePath,
          images: galleryPaths,
          content: cleanContent
      });
  }

  // Generate the JS file content
  const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Run 'node scripts/scrape_haukar_news.js' to update.

export const newsArticles = ${JSON.stringify(newsArticles, null, 2)};
`;

  fs.writeFileSync(OUT_FILE, fileContent, 'utf8');
  console.log(`\nSuccessfully wrote ${newsArticles.length} articles to src/data/newsData.js!`);
}

run();
