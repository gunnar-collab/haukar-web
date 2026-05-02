import { parseMatchDate } from './globalMatchUtils';
import leagueData from '../data/haukar_league_data.json';

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const d = parseMatchDate(dateStr);
  const days = ['Sun', 'Mán', 'Þri', 'Mið', 'Fim', 'Fös', 'Lau'];
  const months = ['Janúar', 'Febrúar', 'Mars', 'Apríl', 'Maí', 'Júní', 'Júlí', 'Ágúst', 'September', 'Október', 'Nóvember', 'Desember'];
  
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  const time = `${h}:${m}`;
  
  return `${days[d.getDay()]} ${d.getDate()}. ${months[d.getMonth()]} • ${time}`;
};

export const getDynamicMatches = (sport, gender) => {
  const activeKey = sport === 'handbolti' ? gender : `${sport}_${gender}`;
  const currentData = leagueData[activeKey];
  
  if (!currentData || !currentData.matches) {
    return { lastMatch: {}, nextMatch: {} };
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of today for date comparison

  const isMeistaraflokkur = (match) => {
    return !(/\d\.\s*flokkur|U\d{2}/i.test(match.competition || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.home || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.away || ''));
  };

  // Filter for senior matches and sort by date
  const sortedMatches = [...currentData.matches]
    .filter(isMeistaraflokkur)
    .sort((a, b) => parseMatchDate(a.date) - parseMatchDate(b.date));

  const isUpcomingMatch = (m) => {
    const matchDate = parseMatchDate(m.date);
    return (m.score === 'Næsti leikur' || m.score === '- - -' || m.score === '-' || !m.score) && matchDate >= now;
  };

  const isPlayedMatch = (m) => {
    return m.score && m.score !== 'Næsti leikur' && m.score !== '- - -' && m.score !== '-';
  };

  const playedMatches = sortedMatches.filter(isPlayedMatch).reverse();
  const upcomingMatches = sortedMatches.filter(isUpcomingMatch);

  const lastRaw = playedMatches[0] || {};
  const nextRaw = upcomingMatches[0] || {};

  let homeScore = 0;
  let awayScore = 0;
  let penaltyInfo = '';
  
  if (lastRaw.score) {
    // Better regex to extract the main scores even with extra text (e.g. "28 (16) - 29 (13)")
    const scoreMatch = lastRaw.score.match(/^(\d+).*?-\s*(\d+)/);
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
      score: lastRaw.score,
      penaltyInfo,
      id: lastRaw.id,
      report: lastRaw.report,
      statsLink: lastRaw.statsLink || (sport === 'fotbolti' ? 'https://ksi.is' : 'https://hbstatz.is'),
      sport
    },
    nextMatch: {
      competition: nextRaw.competition || 'Mót',
      home: nextRaw.home || 'Heimalið',
      away: nextRaw.away || 'Útilið',
      date: nextRaw.date ? formatDate(nextRaw.date) : 'Óákveðið',
      venue: nextRaw.home === 'Haukar' ? 'Ásvellir' : 'Útivöllur',
      id: nextRaw.id,
      report: nextRaw.report,
      sport
    }
  };
};
