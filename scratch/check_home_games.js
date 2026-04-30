import fs from 'fs';

const leagueData = JSON.parse(fs.readFileSync('src/data/haukar_league_data.json', 'utf8'));

const SPORTS_MAP = {
  fotbolti_karla: { name: 'Fótbolti (K)', venue: 'Ásvellir' },
  fotbolti_kvenna: { name: 'Fótbolti (Kv)', venue: 'Ásvellir' },
  karla: { name: 'Handbolti (K)', venue: 'Schenkerhöllin' },
  kvenna: { name: 'Handbolti (Kv)', venue: 'Schenkerhöllin' },
  korfubolti_karla: { name: 'Körfubolti (K)', venue: 'Ólafssalur' },
  korfubolti_kvenna: { name: 'Körfubolti (Kv)', venue: 'Ólafssalur' }
};

const getUpcomingHomeMatches = (count = 3) => {
  const now = new Date('2026-04-30T00:00:00Z');
  let upcomingHomeGames = [];

  for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
    const divisionData = leagueData[key];
    if (divisionData && divisionData.matches) {
      divisionData.matches.forEach(match => {
        const matchDate = new Date(match.date);
        if (
          matchDate >= now &&
          match.home && match.home.includes('Haukar')
        ) {
          const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
          if (!isYouth) {
            upcomingHomeGames.push({
              ...match,
              sportName: sportConfig.name,
              venue: sportConfig.venue,
              parsedDate: matchDate
            });
          }
        }
      });
    }
  }
  upcomingHomeGames.sort((a, b) => a.parsedDate - b.parsedDate);
  return upcomingHomeGames.slice(0, count);
};

console.log(getUpcomingHomeMatches(5));
