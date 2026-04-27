const fs = require('fs');

const opponents = ['FH', 'Valur', 'Grótta', 'Afturelding', 'Stjarnan', 'Breiðablik', 'Fylkir', 'ÍR', 'Fram', 'HK', 'Víkingur R.', 'KR', 'KA', 'Selfoss'];
const sports = ['Fótbolti', 'Handbolti', 'Körfubolti'];
const categories = ['Yngri flokkar'];
const flokkar = ['2. flokkur', '3. flokkur', '4. flokkur', '5. flokkur', '6. flokkur', '7. flokkur'];
const genders = ['ka.', 'kv.'];
const teams = ['A lið', 'B lið', 'C lið', 'D lið'];
const venues = ['Ásvellir', 'Schenkerhöllin', 'Ólafssalur', 'Útivöllur'];

const generateMatches = (count) => {
  const matches = [];
  
  // Keep the programs
  matches.push({
    id: "p1", date: "2026-06-08T09:00:00", home: "Haukar", away: "Fótbolti",
    sport: "Fótbolti", category: "Fótbolti", ageGroup: "Námskeið", competition: "Sumarnámskeið - Vika 1",
    venue: "Ásvellir", ablerLink: "https://www.abler.io/shop/haukar/fotbolti"
  });
  matches.push({
    id: "p2", date: "2026-06-08T13:00:00", home: "Haukar", away: "Fótbolti",
    sport: "Fótbolti", category: "Fótbolti", ageGroup: "Námskeið", competition: "Knattspyrnuskóli Hauka",
    venue: "Ásvellir", ablerLink: "https://www.abler.io/shop/haukar/fotbolti"
  });
  matches.push({
    id: "p3", date: "2026-05-15T16:00:00", home: "Haukar", away: "Afrek",
    sport: "Fótbolti", category: "Fótbolti", ageGroup: "Námskeið", competition: "Afreksæfingar - Vor",
    venue: "Schenkerhöllin", ablerLink: "https://www.abler.io/shop/haukar/fotbolti"
  });

  // Generate 60 matches spread out over May and June
  let currentDate = new Date('2026-05-01T10:00:00');
  
  for (let i = 0; i < count; i++) {
    const isHome = Math.random() > 0.5;
    const opp = opponents[Math.floor(Math.random() * opponents.length)];
    const sport = sports[Math.floor(Math.random() * sports.length)];
    const flokkur = flokkar[Math.floor(Math.random() * flokkar.length)];
    const gender = genders[Math.floor(Math.random() * genders.length)];
    const team = teams[Math.floor(Math.random() * teams.length)];
    
    let comp = '';
    let venue = '';
    
    if (sport === 'Fótbolti') {
      comp = `Íslandsmót KSÍ ${flokkur} ${gender} - ${team}`;
      venue = isHome ? 'Ásvellir' : 'Útivöllur';
    } else if (sport === 'Handbolti') {
      comp = `Íslandsmót HSÍ ${flokkur} ${gender} - ${team}`;
      venue = isHome ? 'Schenkerhöllin' : 'Útivöllur';
    } else {
      comp = `Fjölnismót KKÍ ${flokkur} ${gender}`;
      venue = isHome ? 'Ólafssalur' : 'Útivöllur';
    }

    const homeTeam = isHome ? 'Haukar' : opp;
    const awayTeam = isHome ? opp : 'Haukar';

    // Add 2-12 hours random
    currentDate = new Date(currentDate.getTime() + (Math.floor(Math.random() * 10) + 2) * 60 * 60 * 1000);
    
    // Ensure matches are in reasonable hours (9 AM to 8 PM)
    if (currentDate.getHours() < 9) currentDate.setHours(9 + Math.floor(Math.random() * 3));
    if (currentDate.getHours() > 20) {
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(9 + Math.floor(Math.random() * 3));
    }

    const ablerLink = `https://www.abler.io/shop/haukar/${sport.toLowerCase().replace('ó', 'o')}`;

    matches.push({
      id: `gen_y_${i}`,
      date: currentDate.toISOString().split('.')[0], // simple format
      home: homeTeam,
      away: awayTeam,
      sport: sport,
      category: "Yngri flokkar",
      competition: comp,
      venue: venue,
      ablerLink: ablerLink
    });
  }

  return { matches };
};

const data = generateMatches(60);
fs.writeFileSync('src/data/haukar_youth_data.json', JSON.stringify(data, null, 2));
console.log('Successfully generated 60 youth matches and overwrote src/data/haukar_youth_data.json');
