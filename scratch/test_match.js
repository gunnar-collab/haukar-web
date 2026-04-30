import fs from 'fs';

const rawData = fs.readFileSync('src/data/haukar_league_data.json', 'utf-8');
const leagueData = JSON.parse(rawData);

const statsSource = leagueData.fotbolti_karla?.player_stats || [];

const playerName = "Daði Snær";

const match = statsSource.find(stat => 
    stat.name.toLowerCase().includes(playerName.toLowerCase()) || 
    playerName.toLowerCase().includes(stat.name.toLowerCase())
);

console.log("Match found for Daði Snær:", match);

const playerName2 = "Sigurður Hrannar";
const match2 = statsSource.find(stat => 
    stat.name.toLowerCase().includes(playerName2.toLowerCase()) || 
    playerName2.toLowerCase().includes(stat.name.toLowerCase())
);
console.log("Match found for Sigurður Hrannar:", match2);
