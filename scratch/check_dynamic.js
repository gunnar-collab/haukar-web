import fs from 'fs';
const leagueData = JSON.parse(fs.readFileSync('src/data/haukar_league_data.json', 'utf8'));

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const days = ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'];
  const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
  return `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]} • 19:15`;
};

const getDynamicMatches = (sport, gender) => {
  const activeKey = sport === 'handbolti' ? gender : `${sport}_${gender}`;
  const currentData = leagueData[activeKey];
  
  if (!currentData || !currentData.matches) return { lastMatch: {}, nextMatch: {} };

  const now = new Date('2026-04-30T00:00:00Z');

  const isMeistaraflokkur = (match) => {
    return !(/\d\.\s*flokkur|U\d{2}/i.test(match.competition || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.home || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.away || ''));
  };

  const sortedMatches = [...currentData.matches]
    .filter(isMeistaraflokkur)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const playedMatches = sortedMatches.filter(m => new Date(m.date) < now).reverse();
  const upcomingMatches = sortedMatches.filter(m => new Date(m.date) >= now);

  const lastRaw = playedMatches[0] || {};
  const nextRaw = upcomingMatches[0] || {};

  let homeScore = 0;
  let awayScore = 0;
  
  if (lastRaw.score) {
    const scoreMatch = lastRaw.score.match(/^(\d+).*?-\s*(\d+)/);
    if (scoreMatch) {
      homeScore = parseInt(scoreMatch[1]);
      awayScore = parseInt(scoreMatch[2]);
    }
  }

  return {
    lastMatch: {
      competition: lastRaw.competition || 'Mót',
      home: lastRaw.home || 'Heimalið',
      away: lastRaw.away || 'Útilið',
      homeScore,
      awayScore,
      score: lastRaw.score,
      id: lastRaw.id,
      sport
    },
    nextMatch: {
      competition: nextRaw.competition || 'Mót',
      home: nextRaw.home || 'Heimalið',
      away: nextRaw.away || 'Útilið',
      date: nextRaw.date ? formatDate(nextRaw.date) : 'Óákveðið',
      venue: nextRaw.home === 'Haukar' ? 'Ásvellir' : 'Útivöllur',
      id: nextRaw.id,
      sport
    }
  };
};

const result = getDynamicMatches('korfubolti', 'kvenna');
console.log(JSON.stringify(result, null, 2));
