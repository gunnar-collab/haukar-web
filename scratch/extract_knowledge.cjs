const fs = require('fs');
const { execSync } = require('child_process');

function fetchPdfText(url) {
  try {
    console.log(`Fetching PDF: ${url}`);
    execSync(`curl -sL "${url}" -o /tmp/temp.pdf`);
    execSync(`pdftotext /tmp/temp.pdf /tmp/temp.txt`);
    const text = fs.readFileSync('/tmp/temp.txt', 'utf8');
    return text;
  } catch (error) {
    console.error(`Error processing PDF from ${url}:`, error.message);
    return "";
  }
}

function extract() {
  const pdfUrls = [
    { title: 'Ársskýrsla Hauka 2024', url: 'https://www.haukar.is/wp-content/uploads/2016/03/Haukar_Ársskýrsla-2024_LowRes02.pdf' },
    { title: 'Ársskýrsla Hauka 2023', url: 'https://www.haukar.is/wp-content/uploads/2024/05/Haukar_Ársskýrsla-2023_NET.pdf' }
  ];

  let pdfContent = "HÉR ERU NÝJUSTU ÁRSSKÝRSLUR HAUKA (UPPLÝSINGAR OG REIKNINGAR):\n\n";

  for (const pdf of pdfUrls) {
    const text = fetchPdfText(pdf.url);
    if (text) {
      pdfContent += `\n--- BYRJUN: ${pdf.title} ---\n`;
      pdfContent += text.replace(/\n{3,}/g, '\n\n');
      pdfContent += `\n--- ENDIR: ${pdf.title} ---\n`;
    }
  }

  const fileContent = `// AUTO-GENERATED FILE. DO NOT EDIT.\nexport const HAUKAR_PDF_KNOWLEDGE = \`${pdfContent.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;\n`;

  fs.writeFileSync('src/data/pdfKnowledge.js', fileContent);
  console.log('Successfully wrote src/data/pdfKnowledge.js');
}

extract();
