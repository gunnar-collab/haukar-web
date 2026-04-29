import leagueData from '../data/haukar_league_data.json';

const SPORTS_MAP = {
  fotbolti_karla: { name: 'Fótbolti (K)', venue: 'Ásvellir' },
  fotbolti_kvenna: { name: 'Fótbolti (Kv)', venue: 'Ásvellir' },
  karla: { name: 'Handbolti (K)', venue: 'Schenkerhöllin' },
  kvenna: { name: 'Handbolti (Kv)', venue: 'Schenkerhöllin' },
  korfubolti_karla: { name: 'Körfubolti (K)', venue: 'Ólafssalur' },
  korfubolti_kvenna: { name: 'Körfubolti (Kv)', venue: 'Ólafssalur' }
};

export const getNextHomeGame = () => {
  const now = new Date();
  const nextWeek = new Date(now);
  nextWeek.setDate(now.getDate() + 7);

  let upcomingHomeGames = [];

  // Iterate over all divisions in the league data
  for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
    const divisionData = leagueData[key];
    if (divisionData && divisionData.matches) {
      divisionData.matches.forEach(match => {
        const matchDate = new Date(match.date);
        
        // Ensure it's a future match, within the next 7 days, and Haukar is the home team
        if (
          matchDate >= now &&
          matchDate <= nextWeek &&
          match.home && match.home.includes('Haukar')
        ) {
          upcomingHomeGames.push({
            ...match,
            sportName: sportConfig.name,
            venue: sportConfig.venue,
            parsedDate: matchDate
          });
        }
      });
    }
  }

  // Sort by closest date
  upcomingHomeGames.sort((a, b) => a.parsedDate - b.parsedDate);

  // Return the single most immediate home game, or null
  return upcomingHomeGames.length > 0 ? upcomingHomeGames[0] : null;
};
