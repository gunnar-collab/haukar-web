import fs from 'fs';

const parseMatchDate = (dateStr) => {
  if (!dateStr) return new Date();
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateStr.trim());
  if (isDateOnly) {
    return new Date(`${dateStr.trim()}T19:15:00`);
  }
  const d = new Date(dateStr);
  if (d.getUTCHours() === 0 && d.getUTCMinutes() === 0) {
    d.setHours(19, 15, 0, 0);
  }
  return d;
};

const rawData = fs.readFileSync('./src/data/haukar_league_data.json', 'utf8');
const leagueData = JSON.parse(rawData);

const getDynamicMatches = (sport, gender) => {
  const activeKey = sport === 'handbolti' ? gender : `${sport}_${gender}`;
  const currentData = leagueData[activeKey];

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const isMeistaraflokkur = (match) => {
    return !(/\d\.\s*flokkur|U\d{2}/i.test(match.competition || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.home || '') || /\d\.\s*flokkur|U\d{2}/i.test(match.away || ''));
  };

  const sortedMatches = [...currentData.matches]
    .filter(isMeistaraflokkur)
    .sort((a, b) => parseMatchDate(a.date) - parseMatchDate(b.date));

  const isUpcomingMatch = (m) => {
    const matchDate = parseMatchDate(m.date);
    return (m.score === 'Næsti leikur' || m.score === '- - -' || m.score === '-' || !m.score) && matchDate >= now;
  };

  const upcomingMatches = sortedMatches.filter(isUpcomingMatch);
  return upcomingMatches[0] || {};
};

console.log("Next Fótbolti Kvenna:", getDynamicMatches('fotbolti', 'kvenna'));
