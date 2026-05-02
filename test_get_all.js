import { getAllMatches } from './src/utils/globalMatchUtils.js';

const allMatches = getAllMatches();
const target = allMatches.filter(m => m.competition && m.competition.toUpperCase().includes('5. FLOKKUR KVENNA 2026 - A LIÐ C RIÐILL'));

console.log(target);
