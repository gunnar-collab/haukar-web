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

/**
 * Finds a player by their unique slug.
 */
export const findPlayerBySlug = (slug) => {
  const allPlayers = getAllPlayers();
  return allPlayers.find(p => p.slug === slug);
};
