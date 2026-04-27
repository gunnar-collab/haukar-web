import leagueData from '../data/haukar_league_data.json';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const days = ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'];
  const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
  // We don't have exact times in the JSON, so default to 19:15 for now, or use what's there
  return `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]} • 19:15`;
};

export const getDynamicMatches = (sport, gender) => {
  const activeKey = sport === 'handbolti' ? gender : `${sport}_${gender}`;
  const currentData = leagueData[activeKey];
  
  if (!currentData || !currentData.matches) {
    return { lastMatch: {}, nextMatch: {} };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of today for date comparison

  // Sort matches by date to ensure we pick the correct ones
  const sortedMatches = [...currentData.matches].sort((a, b) => new Date(a.date) - new Date(b.date));

  const playedMatches = sortedMatches.filter(m => new Date(m.date) < now).reverse();
  const upcomingMatches = sortedMatches.filter(m => new Date(m.date) >= now);

  const lastRaw = playedMatches[0] || {};
  const nextRaw = upcomingMatches[0] || {};

  let homeScore = 0;
  let awayScore = 0;
  let penaltyInfo = '';
  
  if (lastRaw.score) {
    // Better regex to extract the main scores even with extra text
    const scoreMatch = lastRaw.score.match(/^(\d+)\s*-\s*(\d+)/);
    if (scoreMatch) {
      homeScore = parseInt(scoreMatch[1]);
      awayScore = parseInt(scoreMatch[2]);
    }
    
    // Extract penalty info if present (e.g., "(2-4 vító)")
    if (lastRaw.score.includes('vító')) {
      const pMatch = lastRaw.score.match(/\((.*?)\)/);
      if (pMatch) penaltyInfo = pMatch[1];
    }
  }

  return {
    lastMatch: {
      competition: lastRaw.competition || 'Mót',
      home: lastRaw.home || 'Heimalið',
      away: lastRaw.away || 'Útilið',
      homeScore,
      awayScore,
      penaltyInfo,
      id: lastRaw.id,
      report: lastRaw.report,
      statsLink: lastRaw.statsLink || (sport === 'fotbolti' ? 'https://ksi.is' : 'https://hbstatz.is')
    },
    nextMatch: {
      competition: nextRaw.competition || 'Mót',
      home: nextRaw.home || 'Heimalið',
      away: nextRaw.away || 'Útilið',
      date: nextRaw.date ? formatDate(nextRaw.date) : 'Óákveðið',
      venue: nextRaw.home === 'Haukar' ? 'Ásvellir' : 'Útivöllur',
      id: nextRaw.id,
      report: nextRaw.report
    }
  };
};
