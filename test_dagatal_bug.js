import fs from 'fs';
import { getAllMatches } from './src/utils/globalMatchUtils.js';

const allMatches = getAllMatches();
const youthMatch = allMatches.find(m => m.competition === 'Íslandsmót KSÍ 5. flokkur kvenna 2026 - A lið C riðill');

if (youthMatch) {
  console.log("FOUND MATCH:", youthMatch.competition);
  console.log("ageGroup:", youthMatch.ageGroup);
  console.log("category:", youthMatch.category);
  
  const activeSportFilter = 'Allt';
  const activeAgeFilter = 'Meistaraflokkur';
  
  const sportMatch = activeSportFilter === 'Allt' || youthMatch.category === activeSportFilter;
  const ageMatch = activeAgeFilter === 'Allir Flokkar' || youthMatch.ageGroup === activeAgeFilter || youthMatch.category === 'Félagið';
  
  console.log("sportMatch:", sportMatch);
  console.log("ageMatch:", ageMatch);
  console.log("included in filter?", sportMatch && ageMatch);
} else {
  console.log("MATCH NOT FOUND!");
}
