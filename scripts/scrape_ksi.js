import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import path from 'path';

const KSI_WOMEN_URL = 'https://www.ksi.is/oll-mot/mot?id=7025676';
const KSI_MEN_URL = 'https://www.ksi.is/oll-mot/mot?id=7025548';
const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'haukar_league_data.json');

const icelandicMonths = {
  "janúar": "01", "febrúar": "02", "mars": "03", "apríl": "04",
  "maí": "05", "júní": "06", "júlí": "07", "ágúst": "08",
  "september": "09", "október": "10", "nóvember": "11", "desember": "12"
};

function parseKSIDate(dateText, year) {
  const match = dateText.match(/(\d{1,2})\.\s+([a-záéíóúýðþæö]+)/i);
  if (match) {
    const day = match[1].padStart(2, '0');
    const monthName = match[2].toLowerCase();
    const month = icelandicMonths[monthName];
    if (month) return `${year}-${month}-${day}`;
  }
  return null;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchMatchStats(matchObj, playerStatsDict) {
  console.log(`  -> Deep scraping match: ${matchObj.home} vs ${matchObj.away} (${matchObj.date})`);
  
  try {
    // Fetch Main Page (for goals)
    const { data: mainData } = await axios.get(matchObj.statsLink, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $m = cheerio.load(mainData);
    
    // Fetch Report Page (for lineups)
    const { data: reportData } = await axios.get(`${matchObj.statsLink}&banner-tab=report`, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $r = cheerio.load(reportData);

    const isHome = matchObj.home === 'Haukar';
    
    // 1. Process Goals from Main Page
    const goalScorers = {};
    const goalsGrid = $m('div.border-t.border-navy-stroke').first();
    if (goalsGrid.length > 0) {
      const haukarGoalCol = goalsGrid.children().eq(isHome ? 0 : 2);
      haukarGoalCol.find('div.body-5').each((i, el) => {
        const spans = $m(el).find('span');
        if (spans.length >= 2) {
          const playerName = $m(spans[0]).text().trim();
          const goalTimes = $m(spans[1]).text().trim();
          // Count commas or apostrophes to count goals
          const goals = (goalTimes.match(/´/g) || []).length;
          if (goals > 0) goalScorers[playerName] = (goalScorers[playerName] || 0) + goals;
        }
      });
    }

    // Helper to process players
    const processPlayers = (colIndex, isStarter) => {
      const col = $r('div.match-report > div.l\\:grid-cols-2').children().eq(colIndex);
      col.find('a[href*="/leikmadur?id="]').each((j, a) => {
        const id = $r(a).attr('href').split('id=')[1];
        
        // Find the name, it's usually the second span (first is number)
        const spans = $r(a).find('span.group-hover\\:underline');
        let name = "Unknown";
        if (spans.length > 0) {
           name = $r(spans[0]).text().replace(/\s+/g, ' ').replace('(M)', '').replace('(F)', '').trim();
        }
        
        // Check if subbed on (bench players only get a game if they have minute marks like 79´)
        let played = false;
        if (isStarter) {
          played = true;
        } else {
          // If bench, check for SVG/minute marks
          const rowText = $r(a).text();
          if (rowText.match(/\d+´/)) played = true;
        }

        if (played) {
          if (!playerStatsDict[id]) {
            playerStatsDict[id] = {
              name,
              ksiId: id,
              stats: { gamesPlayed: 0, starts: 0, goals: 0, yellowCards: 0, redCards: 0 }
            };
          }
          playerStatsDict[id].stats.gamesPlayed += 1;
          if (isStarter) playerStatsDict[id].stats.starts += 1;
          
          // Match goals by name (best effort since KSÍ main page uses full name and report uses full name)
          // We apply goals when we see them in the report so we don't double count
          for (const scorerName of Object.keys(goalScorers)) {
             if (scorerName.includes(name) || name.includes(scorerName)) {
                 playerStatsDict[id].stats.goals += goalScorers[scorerName];
                 delete goalScorers[scorerName]; // don't assign to another player
                 break;
             }
          }
        }
      });
    };

    // 2. Process Lineups from Report Page
    // Column indexes: 2=HomeStart, 3=AwayStart, 6=HomeBench, 7=AwayBench
    const startersColIndex = isHome ? 2 : 3;
    const benchColIndex = isHome ? 6 : 7;
    
    processPlayers(startersColIndex, true);
    processPlayers(benchColIndex, false);

    // 3. Process Cards from Timeline (Main Page)
    $m('.match-event').each((i, el) => {
      const cardDiv = $m(el).find('div[class*="w-[12rem]"][class*="h-[16rem]"]');
      if (cardDiv.length > 0) {
        const classList = cardDiv.attr('class') || '';
        const isYellow = classList.includes('FAC83C') || classList.includes('yellow');
        const isRed = !isYellow; // If it's a card and not yellow, it must be red
        
        $m(el).find('a[href*="/leikmadur?id="]').each((idx, a) => {
           const playerId = $m(a).attr('href').split('id=')[1];
           if (playerStatsDict[playerId]) { 
               if (isYellow) playerStatsDict[playerId].stats.yellowCards += 1;
               if (isRed) playerStatsDict[playerId].stats.redCards += 1;
           }
        });
      }
    });
    
    matchObj.statsScraped = true;

  } catch (e) {
    console.error(`  -> Failed to scrape match details for ${matchObj.statsLink}: ${e.message}`);
  }
}

async function fetchMatches(existingLeagueData) {
  const year = new Date().getFullYear();
  
  const menMatches = [];
  const womenMatches = [];
  let page = 1;

  while(true) {
    const url = `https://www.ksi.is/leikir-felaga/felagslid/?club=2107&club=2193&dateFrom=${year}-01-01&dateTo=${year}-12-31&page=${page}`;
    console.log(`Fetching KSÍ Matches Page ${page}...`);
    
    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const $ = cheerio.load(data);
    
    let matchesFoundOnPage = 0;
    
    $('.grid.grid-cols-\\[70\\%_auto\\]').each((i, el) => {
      matchesFoundOnPage++;
      const comp = $(el).find('.hidden.l\\:flex a span.body-5').first().text().replace(/\s+/g, ' ').trim();
      const dateTextFull = $(el).find('.flex.items-center.gap-\\[8rem\\] span.body-5').first().text().replace(/\s+/g, ' ').trim();
      
      const teamsDiv = $(el).find('.col-span-2.l\\:col-auto.grid.grid-cols-\\[1fr_auto_1fr\\]');
      const home = teamsDiv.find('a').eq(0).text().replace(/\s+/g, ' ').trim();
      const scoreText = teamsDiv.find('span.whitespace-nowrap').first().text().trim();
      const score = scoreText.match(/\d\s*-\s*\d/) ? scoreText : "Næsti leikur";
      const away = teamsDiv.find('a').eq(1).text().replace(/\s+/g, ' ').trim();
      
      const linkHref = $(el).find('a[href*="/leikur?id="]').attr('href');
      const matchId = linkHref ? linkHref.split('id=')[1] : null;
      
      let dateText = '';
      if (dateTextFull.match(/\d{1,2}\. [a-záéíóúýðþæö]+/i)) {
        dateText = dateTextFull;
      } else {
         const possibleDates = $(el).parent().prevAll().map((idx, sibling) => $(sibling).text().trim()).get();
         for (const d of possibleDates) {
            if (d.match(/\d{1,2}\. [a-záéíóúýðþæö]+/i)) {
               dateText = d.replace(/\s+/g, ' ').trim();
               break;
            }
         }
      }
      const formattedDate = parseKSIDate(dateText, year) || `${year}-01-01`;

      const isYouth = /\d\.\s*flokkur|U\d{2}/i.test(comp) || /\d\.\s*flokkur|U\d{2}/i.test(home) || /\d\.\s*flokkur|U\d{2}/i.test(away);

      const matchObj = {
        date: formattedDate,
        home,
        away,
        score,
        competition: comp,
        statsScraped: isYouth // Skip deep scraping for youth matches to save time
      };
      if (matchId) {
         matchObj.id = matchId;
         matchObj.statsLink = `https://www.ksi.is${linkHref}`;
      }

      const compLower = comp.toLowerCase();
      if (compLower.includes('kvenna') || compLower.includes('kvenn') || compLower.includes('konur')) {
        womenMatches.push(matchObj);
      } else {
        menMatches.push(matchObj);
      }
    });

    if (matchesFoundOnPage === 0) break;
    page++;
  }
  
  // Cross reference with existing data to keep statsScraped flag
  const mergeMatches = (scrapedMatches, existingMatches) => {
     return scrapedMatches.map(sm => {
        const ex = existingMatches?.find(e => e.id === sm.id);
        if (ex && ex.statsScraped) {
           sm.statsScraped = true;
        }
        return sm;
     });
  };

  const finalMen = mergeMatches(menMatches, existingLeagueData?.fotbolti_karla?.matches || []);
  const finalWomen = mergeMatches(womenMatches, existingLeagueData?.fotbolti_kvenna?.matches || []);

  return { menMatches: finalMen, womenMatches: finalWomen };
}

async function fetchStandings(url) {
  const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  const $ = cheerio.load(data);
  const standings = [];
  $('table tbody tr').each((idx, el) => {
    const cols = $(el).find('td');
    if (cols.length >= 8) {
      standings.push({
        rank: parseInt($(cols[0]).text().trim()) || (idx + 1),
        team: $(cols[1]).text().trim(),
        played: parseInt($(cols[2]).text().trim()) || 0,
        wins: parseInt($(cols[3]).text().trim()) || 0,
        draws: parseInt($(cols[4]).text().trim()) || 0,
        losses: parseInt($(cols[5]).text().trim()) || 0,
        goalsFor: parseInt($(cols[6]).text().trim()) || 0,
        goalsAgainst: parseInt($(cols[7]).text().trim()) || 0,
        points: parseInt($(cols[8]).text().trim()) || 0
      });
    }
  });
  return standings;
}

// Convert player object map back to array
const dictToArray = (dict) => Object.values(dict).sort((a,b) => b.stats.gamesPlayed - a.stats.gamesPlayed);

async function scrapeKSI() {
  try {
    const rawData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const leagueData = JSON.parse(rawData);

    console.log("Fetching KSÍ Women's standings...");
    const womenStandings = await fetchStandings(KSI_WOMEN_URL);
    
    console.log("Fetching KSÍ Men's standings...");
    const menStandings = await fetchStandings(KSI_MEN_URL);
    
    console.log("Fetching KSÍ Matches...");
    const { menMatches, womenMatches } = await fetchMatches(leagueData);
    
    // Deep Scrape Men's Matches
    const menPlayerStats = {};
    // Load existing stats if they exist, but ZERO them out because we are re-aggregating
    if (leagueData.fotbolti_karla && leagueData.fotbolti_karla.player_stats) {
       leagueData.fotbolti_karla.player_stats.forEach(p => {
           p.stats = { gamesPlayed: 0, starts: 0, goals: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 };
           menPlayerStats[p.ksiId] = p;
       });
    }

    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    for (const match of menMatches) {
        if (match.score !== 'Næsti leikur' && match.score !== '-') {
            const matchDate = new Date(match.date);
            if (!match.statsScraped || matchDate >= fourteenDaysAgo) {
                // Fetch deep stats
                await fetchMatchStats(match, menPlayerStats);
                await delay(1000); // polite delay
            }
        }
    }

    // Deep Scrape Women's Matches
    const womenPlayerStats = {};
    if (leagueData.fotbolti_kvenna && leagueData.fotbolti_kvenna.player_stats) {
       leagueData.fotbolti_kvenna.player_stats.forEach(p => {
           p.stats = { gamesPlayed: 0, starts: 0, goals: 0, yellowCards: 0, redCards: 0, cleanSheets: 0 };
           womenPlayerStats[p.ksiId] = p;
       });
    }

    for (const match of womenMatches) {
        if (match.score !== 'Næsti leikur' && match.score !== '-') {
            const matchDate = new Date(match.date);
            if (!match.statsScraped || matchDate >= fourteenDaysAgo) {
                await fetchMatchStats(match, womenPlayerStats);
                await delay(1000);
            }
        }
    }

    // Update payload
    if (!leagueData.fotbolti_karla) leagueData.fotbolti_karla = {};
    if (!leagueData.fotbolti_kvenna) leagueData.fotbolti_kvenna = {};

    if (womenStandings.length > 0) leagueData.fotbolti_kvenna.standings = womenStandings;
    if (womenMatches.length > 0) leagueData.fotbolti_kvenna.matches = womenMatches;
    leagueData.fotbolti_kvenna.player_stats = dictToArray(womenPlayerStats);

    if (menStandings.length > 0) leagueData.fotbolti_karla.standings = menStandings;
    if (menMatches.length > 0) leagueData.fotbolti_karla.matches = menMatches;
    leagueData.fotbolti_karla.player_stats = dictToArray(menPlayerStats);

    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(leagueData, null, 2), 'utf-8');
    console.log("Updated haukar_league_data.json with deep KSÍ stats!");

  } catch (error) {
    console.error("Error scraping KSÍ data:", error);
    process.exit(1);
  }
}

scrapeKSI();
