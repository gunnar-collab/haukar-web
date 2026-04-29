const fs = require('fs');

const leaguePath = 'src/data/haukar_league_data.json';
const reportsPath = 'src/data/match_reports.json';

const leagueData = JSON.parse(fs.readFileSync(leaguePath, 'utf8'));
const reportsData = JSON.parse(fs.readFileSync(reportsPath, 'utf8'));

// Initialize defensive stats for all players
['karla', 'kvenna'].forEach(gender => {
  if (leagueData[gender] && leagueData[gender].player_stats) {
    leagueData[gender].player_stats.forEach(player => {
      if (!player.stats) player.stats = {};
      player.stats.defensive = {
        legalStops: 0,
        steals: 0,
        blockedShots: 0
      };
    });
  }
});

const getFirstName = (name) => name.split(' ')[0];

Object.values(reportsData).forEach(report => {
  if (!report.events) return;
  report.events.forEach(event => {
    const text = event.text;
    let action = '';
    if (text.includes('löglega stöðvun')) action = 'legalStops';
    else if (text.includes('stelur boltanum')) action = 'steals';
    else if (text.includes('blokkar skot')) action = 'blockedShots';
    
    if (action) {
      // Find which player this belongs to
      let foundPlayer = null;
      ['karla', 'kvenna'].forEach(gender => {
        if (!foundPlayer && leagueData[gender] && leagueData[gender].player_stats) {
          foundPlayer = leagueData[gender].player_stats.find(p => {
            const parts = p.name.split(' ');
            const first = parts[0];
            const second = parts[1] || '';
            // Match e.g. "Þráinn Orri" or "Árni Bragi"
            const nameRegex = new RegExp(`\\d+\\.\\s+${first}(\\s+${second})?\\b`);
            return nameRegex.test(text);
          });
        }
      });

      if (foundPlayer) {
        foundPlayer.stats.defensive[action]++;
      }
    }
  });
});

fs.writeFileSync(leaguePath, JSON.stringify(leagueData, null, 2), 'utf8');
console.log('Successfully aggregated and injected defensive stats!');
