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
  now.setHours(0, 0, 0, 0);

  let upcomingHomeGames = [];

  // Iterate over all divisions in the league data
  for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
    const divisionData = leagueData[key];
    if (divisionData && divisionData.matches) {
      divisionData.matches.forEach(match => {
        const matchDate = new Date(match.date);
        
        // Ensure it's a future match and Haukar is the home team
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

  // Sort by closest date
  upcomingHomeGames.sort((a, b) => a.parsedDate - b.parsedDate);

  // Return the single most immediate home game, or null
  return upcomingHomeGames.length > 0 ? upcomingHomeGames[0] : null;
};

export const getUpcomingHomeMatches = (count = 3) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let upcomingHomeGames = [];

  // Iterate over all divisions in the league data
  for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
    const divisionData = leagueData[key];
    if (divisionData && divisionData.matches) {
      divisionData.matches.forEach(match => {
        const matchDate = new Date(match.date);
        
        // Ensure it's a future match and Haukar is the home team
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

  // Sort by closest date
  upcomingHomeGames.sort((a, b) => a.parsedDate - b.parsedDate);

  return upcomingHomeGames.slice(0, count);
};

export const getUpcomingMatches = (count = 3) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let upcomingGames = [];

  for (const [key, sportConfig] of Object.entries(SPORTS_MAP)) {
    const divisionData = leagueData[key];
    if (divisionData && divisionData.matches) {
      divisionData.matches.forEach(match => {
        const matchDate = new Date(match.date);
        
        // Ensure it's a future match
        if (matchDate >= now) {
          const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(match.competition) || /\d\.\s*flokkur|U\d{2}/i.test(match.home) || /\d\.\s*flokkur|U\d{2}/i.test(match.away);
          
          if (!isYouth) {
            // Fix venue: if Haukar is away, use their venue, else use Ásvellir/Schenker etc.
            const isHome = match.home && match.home.includes('Haukar');
            const venue = isHome ? sportConfig.venue : match.away; // Usually away team name is the venue, or we can just say "Útivöllur"
            
            upcomingGames.push({
              ...match,
              sportName: sportConfig.name,
              venue: isHome ? sportConfig.venue : 'Útivöllur',
              parsedDate: matchDate,
              isHome
            });
          }
        }
      });
    }
  }

  // Sort by closest date
  upcomingGames.sort((a, b) => a.parsedDate - b.parsedDate);

  // Return the specified count
  return upcomingGames.slice(0, count);
};
