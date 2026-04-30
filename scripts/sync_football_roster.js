import fs from 'fs';

const dataFile = 'src/data/fotboltiData.js';
let fotboltiData = fs.readFileSync(dataFile, 'utf-8');

const leagueData = JSON.parse(fs.readFileSync('src/data/haukar_league_data.json', 'utf-8'));

function createSlug(name) {
    return name.toLowerCase().replace(/[áæ]/g, 'a').replace(/[é]/g, 'e').replace(/[í]/g, 'i').replace(/[óö]/g, 'o').replace(/[ú]/g, 'u').replace(/[ý]/g, 'y').replace(/[þ]/g, 'th').replace(/[ð]/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function getExistingSlugs(text, arrayName) {
    // Basic regex to find slugs in the file to avoid duplicates
    const slugs = [];
    const regex = /slug:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        slugs.push(match[1]);
    }
    return slugs;
}

const existingSlugs = getExistingSlugs(fotboltiData);

let menToAdd = [];
leagueData.fotbolti_karla.player_stats.forEach(p => {
    const slug = createSlug(p.name);
    if (!existingSlugs.includes(slug)) {
        menToAdd.push(`
    { 
      number: "-", slug: "${slug}", name: "${p.name}", position: "Leikmaður", 
      bio: "${p.name} er mikilvægur hluti af leikmannahópi Hauka. Með mikla vinnusemi og liðsanda leggur leikmaðurinn mikið af mörkum til liðsins bæði á æfingum og í leikjum.",
      stats: { sport: "fotbolti", gamesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }, 
      img: "/images/players/placeholder_football.png" 
    }`);
        existingSlugs.push(slug); // prevent dups
    }
});

let womenToAdd = [];
leagueData.fotbolti_kvenna.player_stats.forEach(p => {
    const slug = createSlug(p.name);
    if (!existingSlugs.includes(slug)) {
        womenToAdd.push(`
    { 
      number: "-", slug: "${slug}", name: "${p.name}", position: "Leikmaður", 
      bio: "${p.name} er mikilvægur hluti af leikmannahópi Hauka. Með mikla vinnusemi og liðsanda leggur leikmaðurinn mikið af mörkum til liðsins bæði á æfingum og í leikjum.",
      stats: { sport: "fotbolti", gamesPlayed: 0, goals: 0, assists: 0, yellowCards: 0, redCards: 0 }, 
      img: "/images/players/placeholder_football.png" 
    }`);
        existingSlugs.push(slug);
    }
});

// Inject men
if (menToAdd.length > 0) {
    const menAppendStr = menToAdd.join(',') + '\n  ]';
    // Find the end of dataKarla players array
    // We will replace `    }\n  ]\n};` for dataKarla. Since it's exactly formatted like that:
    fotboltiData = fotboltiData.replace(/(\s*img:\s*"\/images\/players\/markus_breki\.png"\s*\n\s*})\n\s*\]\n};/, `$1,${menAppendStr}\n};`);
}

// Inject women
if (womenToAdd.length > 0) {
    const womenAppendStr = womenToAdd.join(',') + '\n  ]';
    fotboltiData = fotboltiData.replace(/(\s*img:\s*"\/images\/players\/katrin_maria\.png"\s*\n\s*})\n\s*\]\n};/, `$1,${womenAppendStr}\n};`);
}

fs.writeFileSync(dataFile, fotboltiData);
console.log(`Added ${menToAdd.length} men and ${womenToAdd.length} women profiles.`);
