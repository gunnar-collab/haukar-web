import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOG_DIR = path.join(__dirname, 'match-logs');
const OUTPUT_FILE = path.join(__dirname, 'match_reports.json');

function parseMarkdownTable(content) {
  const lines = content.split('\n');
  const events = [];
  
  // Find the table start
  const tableStartIndex = lines.findIndex(line => line.includes('| Time | Score | Event |'));
  if (tableStartIndex === -1) return [];

  // Skip header and separator
  for (let i = tableStartIndex + 2; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line.startsWith('|')) continue;

    const parts = line.split('|').map(p => p.trim()).filter(p => p !== '');
    if (parts.length >= 3) {
      events.push({
        time: parts[0],
        score: parts[1],
        text: parts[2]
      });
    }
  }
  return events;
}

function aggregateLogs() {
  const reports = {};
  
  if (!fs.existsSync(LOG_DIR)) {
    console.error('Log directory not found');
    return;
  }

  const files = fs.readdirSync(LOG_DIR).filter(f => f.endsWith('.md'));
  
  files.forEach(file => {
    const matchId = file.replace('match_', '').replace('.md', '');
    const content = fs.readFileSync(path.join(LOG_DIR, file), 'utf8');
    const events = parseMarkdownTable(content);
    
    reports[matchId] = {
      id: matchId,
      events: events.reverse() // Keep chronological order (HBStatz is usually reverse)
    };
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(reports, null, 2));
  console.log(`Aggregated ${Object.keys(reports).length} reports into ${OUTPUT_FILE}`);
}

aggregateLogs();
