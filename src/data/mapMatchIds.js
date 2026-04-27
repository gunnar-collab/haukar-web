import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LEAGUE_DATA_PATH = path.join(__dirname, 'haukar_league_data.json');
const REPORTS_PATH = path.join(__dirname, 'match_reports.json');

const leagueData = JSON.parse(fs.readFileSync(LEAGUE_DATA_PATH, 'utf8'));
const reports = JSON.parse(fs.readFileSync(REPORTS_PATH, 'utf8'));

function findMapping() {
  const mapping = {};
  
  // Create a list of reports with their final scores
  const reportScores = Object.values(reports).map(r => {
    const finalEvent = r.events[r.events.length - 1] || {};
    return {
      id: r.id,
      score: finalEvent.score || ''
    };
  });

  console.log('--- Matching Summary ---');
  
  for (const genderKey in leagueData) {
    const category = leagueData[genderKey];
    if (!category.matches) continue;

    category.matches.forEach(match => {
      // Normalize score for matching: "35 (14) - 36 (19)" -> "35-36"
      const normalizedScore = match.score.replace(/\s+/g, '').replace(/\(\d+\)/g, '');
      
      // Try to find a report with this score
      // Note: This is fuzzy because multiple games can have the same score.
      // In a real scenario, we'd match by date too, but the logs don't have dates yet.
      const possibleMatches = reportScores.filter(rs => rs.score === normalizedScore);
      
      if (possibleMatches.length === 1) {
        match.id = possibleMatches[0].id;
        console.log(`Matched ${match.date} ${match.home}-${match.away} (${normalizedScore}) -> ID ${match.id}`);
      } else if (possibleMatches.length > 1) {
        console.log(`Ambiguous match for ${match.date} ${match.home}-${match.away} (${normalizedScore}): ${possibleMatches.map(m => m.id).join(', ')}`);
      }
    });
  }

  fs.writeFileSync(LEAGUE_DATA_PATH, JSON.stringify(leagueData, null, 2));
  console.log('Updated haukar_league_data.json with match IDs where possible.');
}

findMapping();
