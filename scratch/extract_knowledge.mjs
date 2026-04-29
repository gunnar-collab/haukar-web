import fs from 'fs';
import axios from 'axios';
import pdfParseWrapper from 'pdf-parse';

const pdfParse = typeof pdfParseWrapper.default === 'function' ? pdfParseWrapper.default : pdfParseWrapper;

async function fetchPdfText(url) {
  try {
    console.log(`Fetching PDF: ${url}`);
    const response = await axios.get(encodeURI(url), { responseType: 'arraybuffer' });
    const data = await (typeof pdfParse === 'function' ? pdfParse(response.data) : pdfParse.default(response.data));
    return data.text;
  } catch (error) {
    console.error(`Error processing PDF from ${url}:`, error.message);
    return "";
  }
}

async function extract() {
  const pdfUrls = [
    { title: 'Ársskýrsla Hauka 2024', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_Ársskýrsla-2024_LowRes02.pdf' },
    { title: 'Ársskýrsla Hauka 2023', url: 'https://www.haukar.is/wp-content/uploads/2024/05/Haukar_Ársskýrsla-2023_NET.pdf' }
  ];

  let pdfContent = "HÉR ERU NÝJUSTU ÁRSSKÝRSLUR HAUKA (UPPLÝSINGAR OG REIKNINGAR):\n\n";

  for (const pdf of pdfUrls) {
    const text = await fetchPdfText(pdf.url);
    if (text) {
      pdfContent += `\n--- BYRJUN: ${pdf.title} ---\n`;
      // Clean up multiple newlines to save tokens
      pdfContent += text.replace(/\n{3,}/g, '\n\n');
      pdfContent += `\n--- ENDIR: ${pdf.title} ---\n`;
    }
  }

  const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT.\nexport const HAUKAR_PDF_KNOWLEDGE = \`${pdfContent.replace(/`/g, "\\`")}\`;\n`;

  fs.writeFileSync('src/data/pdfKnowledge.js', fileContent);
  console.log('Successfully wrote src/data/pdfKnowledge.js');
}

extract().catch(console.error);
