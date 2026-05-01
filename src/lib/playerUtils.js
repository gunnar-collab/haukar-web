import { dataKarla as handKarla, dataKvenna as handKvenna } from '../data/handboltiData';
import { dataKarla as korfKarla, dataKvenna as korfKvenna } from '../data/korfuboltiData';
import { dataKarla as fotKarla, dataKvenna as fotKvenna } from '../data/fotboltiData';
import { dataKarla as karateKarla, dataKvenna as karateKvenna } from '../data/karateData';

/**
 * Consolidates all players from all sports into a single array with sport metadata.
 */
export const getAllPlayers = () => {
  const players = [];

  // Handbolti
  handKarla.players.forEach(p => players.push({ ...p, sport: 'handbolti', gender: 'karla' }));
  handKvenna.players.forEach(p => players.push({ ...p, sport: 'handbolti', gender: 'kvenna' }));

  // Körfubolti
  korfKarla.players.forEach(p => players.push({ ...p, sport: 'korfubolti', gender: 'karla' }));
  korfKvenna.players.forEach(p => players.push({ ...p, sport: 'korfubolti', gender: 'kvenna' }));

  // Fótbolti
  fotKarla.players.forEach(p => players.push({ ...p, sport: 'fotbolti', gender: 'karla' }));
  fotKvenna.players.forEach(p => players.push({ ...p, sport: 'fotbolti', gender: 'kvenna' }));

  // Karate
  karateKarla.players.forEach(p => players.push({ ...p, sport: 'karate', gender: 'karla' }));
  karateKvenna.players.forEach(p => players.push({ ...p, sport: 'karate', gender: 'kvenna' }));

  return players;
};

export const matchPlayerName = (name1, name2) => {
  if (!name1 || !name2) return false;
  const n1 = name1.toLowerCase().trim();
  const n2 = name2.toLowerCase().trim();
  if (n1 === n2 || n1.includes(n2) || n2.includes(n1)) return true;
  
  const p1 = n1.split(' ').filter(p => p.length > 2);
  const p2 = n2.split(' ').filter(p => p.length > 2);
  
  let matchCount = 0;
  for (const p of p1) {
    if (p2.includes(p)) matchCount++;
  }
  return matchCount >= 2;
};

/**
 * Finds a player by their unique slug.
 */
export const findPlayerBySlug = (slug) => {
  const allPlayers = getAllPlayers();
  return allPlayers.find(p => p.slug === slug);
};
