import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSportData } from './useSportData';
import menHbStats from '../data/haukar_player_stats.json';
import womenHbStats from '../data/haukar_women_player_stats.json';
import { dataKarla as korfuKarla, dataKvenna as korfuKvenna } from '../data/korfuboltiData';
import leagueData from '../data/haukar_league_data.json';
import youthData from '../data/haukar_youth_data.json';
import { getVenueForTeam } from '../data/venueMap';

let cachedEvents = null;

function getAllUpcomingEvents() {
  if (cachedEvents) return cachedEvents;

  const allEvents = [];
  const adultKeys = ['fotbolti_karla', 'fotbolti_kvenna', 'karla', 'kvenna', 'korfubolti_karla', 'korfubolti_kvenna'];
  
  adultKeys.forEach(key => {
    const data = leagueData[key];
    if (data && data.matches) {
      data.matches.filter(m => m.score === 'Næsti leikur' || m.score === '- - -' || !m.score).forEach(m => {
        let sport = key.includes('fotbolti') ? 'Fótbolti' : key.includes('korfubolti') ? 'Körfubolti' : 'Handbolti';
        allEvents.push({
          dateRaw: m.date,
          title: `${m.home} vs ${m.away}`,
          sportId: sport.toLowerCase().replace('ó', 'o'),
          category: `${sport} (${key.includes('kvenna') ? 'Kvenna' : 'Karla'})`,
          location: m.home === 'Haukar' ? 'Ásvellir' : getVenueForTeam(m.home, sport)
        });
      });
    }
  });

  if (youthData && youthData.matches) {
    youthData.matches.forEach(m => {
      const isCourse = m.ageGroup === 'Námskeið';
      const title = isCourse ? m.competition : `${m.home} vs ${m.away}`;
      const extraInfo = m.ablerLink ? ` (Skráning á Abler: ${m.ablerLink})` : '';
      
      allEvents.push({
        dateRaw: m.date,
        title: `${title}${extraInfo}`,
        sportId: m.sport.toLowerCase().replace('ó', 'o'),
        category: `${m.sport} (Yngri)`,
        location: m.venue
      });
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = allEvents.filter(event => new Date(event.dateRaw) >= today);
  upcomingEvents.sort((a, b) => new Date(a.dateRaw) - new Date(b.dateRaw));

  cachedEvents = upcomingEvents;
  return cachedEvents;
}

function formatEventsForAi(eventsArray, limit = 5) {
  if (!eventsArray || eventsArray.length === 0) return 'Engir viðburðir skráðir.';
  const limited = eventsArray.slice(0, limit);
  return limited.map(e => {
    const d = new Date(e.dateRaw);
    const dateStr = `${d.getDate()}.${d.getMonth() + 1}`;
    const timeStr = d.getHours() > 0 ? `${d.getHours()}:${d.getMinutes().toString().padStart(2, '0')}` : '';
    return `[${dateStr} ${timeStr}] ${e.category}: ${e.title} á ${e.location}`;
  }).join(' | ');
}

function formatTopPerformers(statsArray, limit = 6) {
  if (!statsArray || statsArray.length === 0) return '';
  const fieldPlayers = statsArray.filter(p => p.position !== 'Markmaður');
  const goalkeepers = statsArray.filter(p => p.position === 'Markmaður');

  const topScorers = [...fieldPlayers]
    .sort((a, b) => (b.stats?.offensive?.totalGoals || 0) - (a.stats?.offensive?.totalGoals || 0))
    .slice(0, limit);
    
  const topGks = [...goalkeepers]
    .sort((a, b) => (b.stats?.goalkeeper?.totalSaves || 0) - (a.stats?.goalkeeper?.totalSaves || 0))
    .slice(0, 2);

  let result = "Markahæstir: ";
  result += topScorers.map(p => `${p.name} (${p.stats?.offensive?.totalGoals || 0} mörk)`).join(', ') + ". ";
  
  if (topGks.length > 0) {
    result += "Markverðir: ";
    result += topGks.map(p => `${p.name} (${p.stats?.goalkeeper?.totalSaves || 0} varin)`).join(', ') + ".";
  }
  return result;
}

function formatBasketballPerformers(statsArray, limit = 5) {
  if (!statsArray || statsArray.length === 0) return '';
  const topScorers = [...statsArray]
    .sort((a, b) => (b.stats?.pts || 0) - (a.stats?.pts || 0))
    .slice(0, limit);

  let result = "Stigahæstir: ";
  result += topScorers.map(p => `${p.name} (${p.stats?.pts || 0} stig, ${p.stats?.reb || 0} fráköst)`).join(', ') + ".";
  return result;
}

function getLatestResults() {
  const latest = [];
  const adultKeys = ['fotbolti_karla', 'fotbolti_kvenna', 'karla', 'kvenna', 'korfubolti_karla', 'korfubolti_kvenna'];
  
  adultKeys.forEach(key => {
    const data = leagueData[key];
    if (data && data.matches) {
      const pastMatches = data.matches.filter(m => m.score && m.score !== 'Næsti leikur' && m.score !== '- - -' && new Date(m.date) <= new Date());
      pastMatches.sort((a, b) => new Date(b.date) - new Date(a.date));
      if (pastMatches.length > 0) {
        const m = pastMatches[0];
        let sport = key.includes('fotbolti') ? 'Fótbolti' : key.includes('korfubolti') ? 'Körfubolti' : 'Handbolti';
        const category = `${sport} ${key.includes('kvenna') ? 'Kvenna' : 'Karla'}`;
        latest.push(`[${category}]: ${m.home} ${m.score} ${m.away}`);
      }
    }
  });
  return latest.length > 0 ? latest.join(' | ') : 'Engin nýleg úrslit skráð.';
}

export function useAiContext() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  
  let sportId = null;
  if (path.includes('fotbolti')) sportId = 'fotbolti';
  else if (path.includes('korfubolti')) sportId = 'korfubolti';
  else if (path.includes('handbolti')) sportId = 'handbolti';
  else if (path.includes('skak')) sportId = 'skak';
  else if (path.includes('karate')) sportId = 'karate';

  let gender = 'karla';
  if (path.includes('kvenna')) gender = 'kvenna';
  
  const { data: sportData, loading } = useSportData(sportId || 'fotbolti', sportId ? gender : 'karla'); 
  
  const aiContextString = useMemo(() => {
    let contextStr = '';

    if (sportId && sportData && !loading) {
      if (sportData.nextMatch) {
        contextStr += `Næsti leikur hjá ${sportId} ${gender} (${sportData.nextMatch.competition || 'Mót'}): ${sportData.nextMatch.home} vs ${sportData.nextMatch.away} þann ${sportData.nextMatch.date} á ${sportData.nextMatch.venue}. `;
      }
      if (sportData.lastMatch) {
        let penaltyText = sportData.lastMatch.penaltyScore ? ` (Vítakeppni: ${sportData.lastMatch.penaltyScore})` : '';
        contextStr += `Síðasti leikur hjá ${sportId} ${gender} (${sportData.lastMatch.competition || 'Mót'}): ${sportData.lastMatch.home} ${sportData.lastMatch.homeScore} - ${sportData.lastMatch.awayScore} ${sportData.lastMatch.away}${penaltyText}. `;
      }
      if (sportData.standings && sportData.standings.length > 0) {
        const haukarStanding = sportData.standings.find(s => s.team.includes('Haukar'));
        if (haukarStanding) {
           contextStr += `Staðan í deildinni (${gender}): Haukar eru í ${haukarStanding.rank}. sæti með ${haukarStanding.pts || haukarStanding.points} stig. `;
        }
      }
      
      if (sportData.playoffs && sportData.playoffs.schedule) {
        contextStr += `Liðið er núna í úrslitakeppni (${sportData.playoffs.series}) á móti ${sportData.playoffs.opponent}. `;
        const nextPlayoff = sportData.playoffs.schedule.find(g => g.result === null);
        if (nextPlayoff) {
          contextStr += `Næsti leikur (Leikur ${nextPlayoff.game}) er ${nextPlayoff.date} á ${nextPlayoff.venue}. `;
        }
      }
    } else if (!sportId) {
      contextStr += `Nýjustu úrslit allra meistaraflokka: ${getLatestResults()}. `;
    }

    const allEvents = getAllUpcomingEvents();
    contextStr += `\nNæstu 30 viðburðir á dagskrá hjá félaginu (Barna- og meistaraflokkar): ${formatEventsForAi(allEvents, 30)}. `;
    
    if (sportId && sportId !== 'Haukar almennt') {
      const sportEvents = allEvents.filter(e => e.sportId === sportId);
      if (sportEvents.length > 0) {
        contextStr += `Næstu 15 viðburðir sérstaklega í ${sportId}: ${formatEventsForAi(sportEvents, 15)}. `;
      }
    }

    if (sportId === 'handbolti' || !sportId) {
      contextStr += `\nTölfræði Handbolta Karla (Helstu leikmenn): ${formatTopPerformers(menHbStats)} `;
      contextStr += `\nTölfræði Handbolta Kvenna (Helstu leikmenn): ${formatTopPerformers(womenHbStats)} `;
    }

    if (sportId === 'korfubolti' || !sportId) {
      contextStr += `\nTölfræði Körfubolta Karla (Helstu leikmenn): ${formatBasketballPerformers(korfuKarla.players)} `;
      contextStr += `\nTölfræði Körfubolta Kvenna (Helstu leikmenn): ${formatBasketballPerformers(korfuKvenna.players)} `;
    }

    return contextStr;
  }, [sportId, gender, sportData, loading]);

  return {
    sportId: sportId || 'Haukar almennt',
    contextString: aiContextString || 'Engin lifandi tölfræðigögn aðgengileg eins og er, en þú getur treyst á að rauða maskínan er á fullu!'
  };
}
