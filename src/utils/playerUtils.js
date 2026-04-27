import { dataKarla as hbKarla, dataKvenna as hbKvenna } from '../data/handboltiData';
import { dataKarla as fbKarla, dataKvenna as fbKvenna } from '../data/fotboltiData';
import { dataKarla as bbKarla, dataKvenna as bbKvenna } from '../data/korfuboltiData';

/**
 * Universal Master Roster
 * Flattens all sport-specific player lists into a single searchable array.
 */
const getMasterRoster = () => {
  const allPlayers = [
    ...hbKarla.players.map(p => ({ ...p, sport: 'handbolti', team: 'karla' })),
    ...hbKvenna.players.map(p => ({ ...p, sport: 'handbolti', team: 'kvenna' })),
    ...fbKarla.players.map(p => ({ ...p, sport: 'fotbolti', team: 'karla' })),
    ...fbKvenna.players.map(p => ({ ...p, sport: 'fotbolti', team: 'kvenna' })),
    ...bbKarla.players.map(p => ({ ...p, sport: 'korfubolti', team: 'karla' })),
    ...bbKvenna.players.map(p => ({ ...p, sport: 'korfubolti', team: 'kvenna' })),
  ];
  return allPlayers;
};

/**
 * Finds a player slug by name using heuristic matching.
 * Handles variations in Icelandic naming and short/full name forms.
 */
export const getPlayerSlug = (name) => {
  if (!name) return '';
  
  const roster = getMasterRoster();
  const cleanSearch = name.toLowerCase().replace(/\s+\(m\)/i, '').trim();
  
  // 1. Try exact match
  let match = roster.find(p => p.name.toLowerCase() === cleanSearch);
  
  // 2. Try partial match (search name in roster name)
  if (!match) {
    match = roster.find(p => p.name.toLowerCase().includes(cleanSearch) || cleanSearch.includes(p.name.toLowerCase()));
  }
  
  // 3. Try splitting and matching first/last names (for longer formal names)
  if (!match && cleanSearch.includes(' ')) {
    const parts = cleanSearch.split(' ');
    match = roster.find(p => parts.every(part => p.name.toLowerCase().includes(part)));
  }

  if (match) return match.slug;
  
  // Fallback: Generate a heuristic slug
  return cleanSearch
    .replace(/ /g, '-')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ð/g, "d")
    .replace(/þ/g, "th")
    .replace(/æ/g, "ae")
    .replace(/ö/g, "o")
    .toLowerCase();
};

/**
 * Returns the full profile path for a player
 */
export const getPlayerProfilePath = (name) => {
  const slug = getPlayerSlug(name);
  return `/leikmenn/${slug}`;
};

/**
 * Returns the player object if found
 */
export const getPlayerInfo = (name) => {
  const roster = getMasterRoster();
  const cleanSearch = name.toLowerCase().trim();
  return roster.find(p => p.name.toLowerCase().includes(cleanSearch) || cleanSearch.includes(p.name.toLowerCase()));
};
