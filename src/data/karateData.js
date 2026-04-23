export const dataKarla = {
  standings: [
    { rank: 1, team: 'Fylkir', played: 5, w: 12, d: 8, l: 4, pts: 120 },
    { rank: 2, team: 'Haukar', played: 5, w: 10, d: 6, l: 3, pts: 95 },
    { rank: 3, team: 'Breiðablik', played: 5, w: 8, d: 5, l: 6, pts: 82 },
    { rank: 4, team: 'Þór', played: 5, w: 5, d: 7, l: 4, pts: 65 },
    { rank: 5, team: 'Afturelding', played: 5, w: 3, d: 4, l: 8, pts: 40 },
  ],
  nextMatch: {
    competition: 'Íslandsmeistaramót í Kumite',
    home: 'Allir flokkar',
    away: 'Fjölnishöll',
    date: 'Lau 22. Okt • 09:00',
    venue: 'Fjölnishöllin',
  },
  lastMatch: {
    competition: 'Bikarmót KAÍ - 2. mót',
    home: 'Haukar',
    away: 'Verðlaun',
    homeScore: 4, // Gold
    awayScore: 2, // Silver
    statsLink: 'https://kai.is/'
  },
  players: [
    { number: "1. Dan", slug: "jon-sveinsson", name: "Jón Sveinsson", position: "Svart Belti", deepStats: { leikir: 8, mork: 4, nytni: 2, sto: 1 }, img: "/assets/sports/karate/jon-sveinsson.png" },
    { number: "1. Kyu", slug: "sigurdur-pall", name: "Sigurður Páll", position: "Brúnt Belti", deepStats: { leikir: 6, mork: 2, nytni: 3, sto: 2 }, img: "/assets/sports/karate/sigurdur-pall.png" },
    { number: "2. Dan", slug: "kristjan-orn", name: "Kristján Örn", position: "Svart Belti", deepStats: { leikir: 10, mork: 7, nytni: 1, sto: 0 }, img: "/assets/sports/karate/kristjan-orn.png" }
  ]
};

export const dataKvenna = {
  standings: [
    { rank: 1, team: 'Haukar', played: 5, w: 14, d: 5, l: 2, pts: 135 },
    { rank: 2, team: 'Fylkir', played: 5, w: 11, d: 4, l: 3, pts: 105 },
    { rank: 3, team: 'Breiðablik', played: 5, w: 7, d: 6, l: 5, pts: 78 },
    { rank: 4, team: 'KFR', played: 5, w: 6, d: 3, l: 4, pts: 60 },
    { rank: 5, team: 'Afturelding', played: 5, w: 4, d: 2, l: 5, pts: 45 },
  ],
  nextMatch: {
    competition: 'Íslandsmeistaramót í Kumite',
    home: 'Allir flokkar',
    away: 'Fjölnishöll',
    date: 'Lau 22. Okt • 09:00',
    venue: 'Fjölnishöllin',
  },
  lastMatch: {
    competition: 'Bikarmót KAÍ - 2. mót',
    home: 'Haukar',
    away: 'Verðlaun',
    homeScore: 5, // Gold
    awayScore: 3, // Silver
    statsLink: 'https://kai.is/'
  },
  players: [
    { number: "2. Dan", slug: "anna-maria", name: "Anna María", position: "Svart Belti", deepStats: { leikir: 9, mork: 6, nytni: 2, sto: 0 }, img: "/assets/sports/karate/anna-maria.png" },
    { number: "1. Dan", slug: "maria-gudmunds", name: "María Guðmunds", position: "Svart Belti", deepStats: { leikir: 7, mork: 3, nytni: 4, sto: 1 }, img: "/assets/sports/karate/maria-gudmunds.png" },
    { number: "1. Kyu", slug: "sara-dis", name: "Sara Dís", position: "Brúnt Belti", deepStats: { leikir: 5, mork: 1, nytni: 2, sto: 3 }, img: "/assets/sports/karate/social-kumite.png" }
  ]
};

export const karateNews = [
  { id: 1, category: "Afreksstarf", title: "Fimm Haukar valdir í landsliðshóp KAÍ", date: "12. Okt", image: "/assets/sports/karate/news-landslið.png" },
  { id: 2, category: "Mótamál", title: "Frábær árangur á Bikarmóti í Kumite", date: "5. Okt", image: "/assets/sports/karate/news-bikarmot.png" },
  { id: 3, category: "Beltapróf", title: "Haust-beltapróf verða haldin í lok nóvember", date: "1. Okt", image: "/assets/sports/karate/news-beltaprof.png" },
];

export const socialPosts = [
  { id: 1, platform: 'Instagram', handle: '@haukar_karate', image: '/assets/sports/karate/social-kumite.png', text: 'Gull, silfur og brons! Stórkostleg helgi að baki á Bikarmótinu. 🥇🥈🥉 #haukar #karate', likes: '215' },
  { id: 2, platform: 'Facebook', handle: 'Haukar Karate', image: '/assets/sports/karate/social-children.png', text: 'Minnum á skráningu á byrjendanámskeið barna. Örfá pláss laus í 6-8 ára hópnum!', likes: '142' },
  { id: 3, platform: 'Instagram', handle: '@haukar_karate', image: '/assets/sports/karate/social-focus.png', text: 'Fókus og yfirvegun. Undirbúningur fyrir Íslandsmeistaramótið í fullum gangi. 🥋🔥', likes: '308' },
  { id: 4, platform: 'Facebook', handle: 'Haukar Karate', image: '/assets/sports/karate/social-blackbelt.png', text: 'Til hamingju með svarta beltið! Frábær árangur hjá okkar fólki í dag.', likes: '456' },
];
