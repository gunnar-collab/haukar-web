import { useLocation } from 'react-router-dom';
import { useSportData } from './useSportData';

export function useAiContext() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  
  let sportId = null;
  if (path.includes('fotbolti')) sportId = 'fotbolti';
  else if (path.includes('korfubolti')) sportId = 'korfubolti';
  else if (path.includes('handbolti')) sportId = 'handbolti';
  else if (path.includes('skak')) sportId = 'skak';
  else if (path.includes('karate')) sportId = 'karate';

  // Default to fotbolti context if on the homepage to give Haukur something to talk about
  const { data: sportData, loading } = useSportData(sportId || 'fotbolti', 'karla'); 
  
  let aiContextString = '';

  if (sportData && !loading) {
    if (sportData.nextMatch) {
      aiContextString += `Næsti leikur: ${sportData.nextMatch.home} vs ${sportData.nextMatch.away} þann ${sportData.nextMatch.date} á ${sportData.nextMatch.venue}. `;
    }
    if (sportData.lastMatch) {
      aiContextString += `Síðasti leikur: ${sportData.lastMatch.home} ${sportData.lastMatch.homeScore} - ${sportData.lastMatch.awayScore} ${sportData.lastMatch.away}. `;
    }
    if (sportData.standings && sportData.standings.length > 0) {
      const haukarStanding = sportData.standings.find(s => s.team.includes('Haukar'));
      if (haukarStanding) {
         aiContextString += `Staðan í deildinni: Haukar eru í ${haukarStanding.rank}. sæti með ${haukarStanding.pts} stig. `;
      }
    }
    
    // Basketball specific (Playoffs instead of regular standings/matches)
    if (sportData.playoffs && sportData.playoffs.schedule) {
      aiContextString += `Liðið er núna í úrslitakeppni (${sportData.playoffs.series}) á móti ${sportData.playoffs.opponent}. `;
      const nextPlayoff = sportData.playoffs.schedule.find(g => g.result === null);
      if (nextPlayoff) {
        aiContextString += `Næsti leikur (Leikur ${nextPlayoff.game}) er ${nextPlayoff.date} á ${nextPlayoff.venue}. `;
      }
    }
  }

  return {
    sportId: sportId || 'Haukar almennt',
    contextString: aiContextString || 'Engin lifandi tölfræðigögn aðgengileg eins og er, en þú getur treyst á að rauða maskínan er á fullu!'
  };
}
