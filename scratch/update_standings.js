import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/haukar_league_data.json', 'utf8'));

const karlaTeams = [
    'Ægir', 'Grótta', 'Þróttur Vogum', 'Kormákur/Hvöt', 
    'Dalvík/Reynir', 'KFA', 'Haukar', 'Víkingur Ólafsvík', 
    'Kári', 'KFG', 'Víðir', 'Höttur/Huginn'
];

const kvennaTeams = [
    'Víkingur R.', 'Haukar', 'Grótta', 'FHL', 'Afturelding'
];

if (data.fotbolti_karla && data.fotbolti_karla.standings) {
    data.fotbolti_karla.standings = data.fotbolti_karla.standings.slice(0, karlaTeams.length).map((team, index) => {
        team.team = karlaTeams[index] || "0";
        team.played = 0;
        team.wins = 0;
        team.draws = 0;
        team.losses = 0;
        team.goalsFor = 0;
        team.goalsAgainst = 0;
        team.points = 0;
        return team;
    });
}

if (data.fotbolti_kvenna && data.fotbolti_kvenna.standings) {
    data.fotbolti_kvenna.standings = data.fotbolti_kvenna.standings.slice(0, kvennaTeams.length).map((team, index) => {
        team.team = kvennaTeams[index] || "0";
        team.played = 0;
        team.wins = 0;
        team.draws = 0;
        team.losses = 0;
        team.goalsFor = 0;
        team.goalsAgainst = 0;
        team.points = 0;
        return team;
    });
}

fs.writeFileSync('./src/data/haukar_league_data.json', JSON.stringify(data, null, 2));
console.log('Successfully updated haukar_league_data.json');
