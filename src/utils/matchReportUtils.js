import { dataKarla as hbKarla, dataKvenna as hbKvenna } from '../data/handboltiData';
import { dataKarla as fbKarla, dataKvenna as fbKvenna } from '../data/fotboltiData';

// List of all known Haukar player names for heuristic team detection
const haukarPlayerNames = [
  ...hbKarla.players.map(p => p.name),
  ...hbKvenna.players.map(p => p.name),
  ...fbKarla.players.map(p => p.name),
  ...fbKvenna.players.map(p => p.name),
  "Skarphéðinn Ívar", "Hergeir", "Adam Haukur", "Birkir Snær", "Sigurður Snær", "Ólafur Ægir", 
  "Jón Ómar", "Aron Rafn", "Stefán Magni", "Birkir Snær", "Brynjólfur Snær", "Kristján Ottó",
  "Þráinn Orri", "Össur", "Ihor", "Freyr", "Sigurður Bragason", "Gunnar Gunnarsson",
  "Hallur Húni", "Máni Mar", "Daði Snær", "Sigurður Hrannar", "Haukur Darri", "Fannar Óli",
  "Pablo Punyed", "Óliver Þorkelsson", "Einar Karl", "Ísak Jónsson", "Gabríel Aron", "Kári Vilberg",
  "Ævar Daði", "Óliver Steinar", "Ólafur Darri", "Jón Gísli", "Markús Breki", "Sveinn Óli", "Franz Sigurjónsson",
  "Andri Steinn", "Guðjón Pétur", "Óskar Örn", "Markús Breki"
];

export function parseHbStatzEvent(eventText, match) {
  const text = eventText.toLowerCase();
  let type = 'comment';
  let icon = '•';
  
  if (text.includes('mark!')) {
    type = 'goal';
    icon = '⚽';
  } else if (text.includes('2 mínútur')) {
    type = 'suspension';
    icon = '⏱️';
  } else if (text.includes('gult spjald')) {
    type = 'yellow';
    icon = '🟨';
  } else if (text.includes('rautt spjald')) {
    type = 'red';
    icon = '🟥';
  } else if (text.includes('varið!')) {
    type = 'save';
    icon = '🧤';
  } else if (text.includes('víti!')) {
    type = 'penalty';
    icon = '🎯';
  } else if (text.includes('tapar boltanum') || text.includes('sóknarbrot')) {
    type = 'turnover';
    icon = '⚠️';
  }

  // Heuristic team detection
  const isHaukarPlayer = haukarPlayerNames.some(name => eventText.includes(name));
  let team = isHaukarPlayer ? 'Haukar' : 'Andstæðingur';

  // Extract player name (usually starts with number then name)
  const playerMatch = eventText.match(/(\d+\.\s+[^!\s]+(\s+[^!\s]+)?)/);
  const playerName = playerMatch ? playerMatch[1] : '';

  return {
    type,
    icon,
    player: playerName || 'Leikmaður',
    team,
    text: eventText
  };
}

export function parseKsiEvent(eventText, match) {
  const text = eventText.toLowerCase();
  let type = 'comment';
  let icon = '•';
  let playerIn = '';
  let playerOut = '';

  if (text.includes('skorar')) {
    type = 'goal';
    icon = '⚽';
  } else if (text.includes('gult spjald')) {
    type = 'yellow';
    icon = '🟨';
  } else if (text.includes('rautt spjald')) {
    type = 'red';
    icon = '🟥';
  } else if (text.includes('skipting')) {
    type = 'sub';
    icon = '🔄';
    // Extract "Player In / Player Out"
    const subMatch = eventText.match(/Skipting:\s*(.*?)\s*\(Inn\)\s*\/\s*(.*?)\s*\(Út\)/i);
    if (subMatch) {
      playerIn = subMatch[1];
      playerOut = subMatch[2];
    }
  }

  // Heuristic team detection
  const isHaukar = eventText.includes('(Haukar)') || haukarPlayerNames.some(name => eventText.includes(name));
  let team = isHaukar ? 'Haukar' : 'Andstæðingur';

  // Extract player name before " (Haukar)" or similar
  const playerPartMatch = eventText.match(/^(.*?)\s*(\((Haukar|Andstæðingur|.*?)\))/i);
  const playerName = playerPartMatch ? playerPartMatch[1].replace(/.*:\s*/, '') : '';

  return {
    type,
    icon,
    player: playerName || (playerIn ? `${playerIn} (inn)` : 'Leikmaður'),
    playerIn,
    playerOut,
    team,
    text: eventText
  };
}

export function parseGenericEvent(eventText, match) {
  // Simple router based on content/source
  if (eventText.includes('Skipting:') || eventText.includes('PSO')) {
    return parseKsiEvent(eventText, match);
  }
  return parseHbStatzEvent(eventText, match);
}
