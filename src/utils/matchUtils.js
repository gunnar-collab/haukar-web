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

  const playedMatches = currentData.matches.filter(m => m.score !== 'Næsti leikur' && m.score !== '- - -');
  const upcomingMatches = currentData.matches.filter(m => m.score === 'Næsti leikur' || m.score === '- - -').reverse();

  const lastRaw = playedMatches[0] || {};
  const nextRaw = upcomingMatches[0] || {};

  let homeScore = 0;
  let awayScore = 0;
  
  if (lastRaw.score) {
    const parts = lastRaw.score.split('-');
    if (parts.length >= 2) {
      homeScore = parseInt(parts[0].replace(/\(\d+\)/g, '').trim()) || 0;
      awayScore = parseInt(parts[1].replace(/\(\d+\)/g, '').trim()) || 0;
    }
  }

  return {
    lastMatch: {
      competition: lastRaw.competition || 'Mót',
      home: lastRaw.home || 'Heimalið',
      away: lastRaw.away || 'Útilið',
      homeScore,
      awayScore,
      statsLink: lastRaw.statsLink || (sport === 'fotbolti' ? 'https://ksi.is' : 'https://hbstatz.is')
    },
    nextMatch: {
      competition: nextRaw.competition || 'Mót',
      home: nextRaw.home || 'Heimalið',
      away: nextRaw.away || 'Útilið',
      date: nextRaw.date ? formatDate(nextRaw.date) : 'Óákveðið',
      venue: nextRaw.home === 'Haukar' ? 'Ásvellir' : 'Útivöllur'
    }
  };
};
