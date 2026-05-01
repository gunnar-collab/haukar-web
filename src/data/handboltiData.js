export const dataKarla = {
  standings: [
    { rank: 1, team: 'Valur', played: 22, w: 16, d: 2, l: 4, pts: 34 },
    { rank: 2, team: 'FH', played: 22, w: 15, d: 1, l: 6, pts: 31 },
    { rank: 3, team: 'Haukar', played: 22, w: 14, d: 2, l: 6, pts: 30 },
    { rank: 4, team: 'Afturelding', played: 22, w: 12, d: 3, l: 7, pts: 27 },
    { rank: 5, team: 'ÍBV', played: 22, w: 11, d: 1, l: 10, pts: 23 },
  ],
  nextMatch: {
    competition: 'Úrslitakeppni Olís deild karla',
    home: 'Haukar',
    away: 'FH',
    date: 'Fim 23. Apríl • 19:30',
    venue: 'Ásvellir',
  },
  lastMatch: {
    competition: 'Úrslitakeppni Olís deild karla',
    home: 'FH',
    away: 'Haukar',
    homeScore: 36,
    awayScore: 35,
    statsLink: 'https://hbstatz.is/OlisDeildKarlaLeikur.php?ID=12905'
  },
  players: [
    { number: "27", slug: "aron-rafn", name: "Aron Rafn", position: "Markvörður", img: "/images/players/Ernir20250922_DSF5515.webp" },
    { number: "3", slug: "hergeir-grimsson", name: "Hergeir", position: "Skytta", img: "/images/players/Ernir20250922_DSF5461.webp" },
    { number: "4", slug: "adam-haukur", name: "Adam Haukur", position: "Skytta", img: "/images/players/Ernir20250922_DSF5260.webp" },
    { number: "11", slug: "birkir-snaer", name: "Birkir Snær", position: "Hornamaður", img: "/images/players/Ernir20250922_DSF5368.webp" },
    { number: "9", slug: "sigurdur-snaer", name: "Sigurður Snær", position: "Lína", img: "/images/players/Ernir20250922_DSF5278.webp" },
    { number: "24", slug: "olafur-aegir", name: "Ólafur Ægir", position: "Skytta", img: "/images/players/Ernir20250922_DSF5229.webp" },
    { number: "47", slug: "jon-omar", name: "Jón Ómar", position: "Hornamaður", img: "/images/players/jon_omar.webp" }
  ]
};

export const dataKvenna = {
  standings: [
    { rank: 1, team: 'Valur', played: 21, w: 18, d: 1, l: 2, pts: 37 },
    { rank: 2, team: 'Fram', played: 21, w: 16, d: 2, l: 3, pts: 34 },
    { rank: 3, team: 'Haukar', played: 21, w: 14, d: 1, l: 6, pts: 29 },
    { rank: 4, team: 'ÍBV', played: 21, w: 12, d: 2, l: 7, pts: 26 },
    { rank: 5, team: 'Stjarnan', played: 21, w: 8, d: 3, l: 10, pts: 19 },
  ],
  nextMatch: {
    competition: 'Úrslitakeppni Olís deild kvenna',
    home: 'KA/Þór',
    away: 'Haukar',
    date: 'Lau 25. Apríl • 16:00',
    venue: 'KA-heimilið',
  },
  lastMatch: {
    competition: 'Úrslitakeppni Olís deild kvenna',
    home: 'Haukar',
    away: 'KA/Þór',
    homeScore: 28,
    awayScore: 23,
    statsLink: 'https://hbstatz.is/OlisDeildKvennaTolfraedi.php'
  },
  players: [
    { number: "1", slug: "elisa-helga", name: "Elísa Helga", position: "Markvörður", img: "/images/players/Ernir20250922_DSF5999.webp" },
    { number: "4", slug: "sara-sif", name: "Sara Sif", position: "Markvörður", img: "/images/players/Ernir20250922_DSF6121.webp" },
    { number: "91", slug: "johanna-margret", name: "Jóhanna Margrét", position: "Skytta", img: "/images/players/Ernir20250922_DSF5741.webp" },
    { number: "7", slug: "rakel-oddny", name: "Rakel Oddný", position: "Skytta", img: "/images/players/Ernir20250922_DSF5780.webp" },
    { id: 33, slug: 'ebba-gudridur', name: 'Ebba Guðríður', number: '15', position: 'Lína', img: '/images/players/Ernir20250922_DSF5916.webp' },
    { id: 26, slug: 'ragnheidur-5', name: 'Ragnheiður', number: '5', position: 'Hornamaður', img: '/images/players/Ernir20250922_DSF5800.webp' }
  ]
};

import { newsArticles } from './newsData';

export const handballNews = newsArticles
  .filter(n => n.sport === 'handbolti')
  .slice(0, 3);

export const socialPosts = [
  { id: 1, platform: 'Instagram', handle: '@haukar_topphandbolti', image: '/handball_social_1.png', text: 'Enginn stöðvar okkar menn þegar þeir komast í loftið! 🚀 Hlökkum til að sjá ykkur á Ásvöllum. #haukar #handbolti #hndbl', likes: '1.2k' },
  { id: 2, platform: 'Facebook', handle: 'Haukar Topphandbolti', image: '/handball_social_2.png', text: 'Vegurinn er lokaður! 🧱 Aron Rafn með hreint ótrúlega frammistöðu í gærkvöldi. Stúkan ætlaði um koll að keyra!', likes: '845' },
  { id: 3, platform: 'Instagram', handle: '@haukar_topphandbolti', image: '/handball_social_3.png', text: 'Liðsheildin er okkar styrkur. ❤️🖤 Þessi sigur var fyrir ykkur, kæru stuðningsmenn! #fyrirhauka #handbolti', likes: '2.1k' },
  { id: 4, platform: 'Facebook', handle: 'Haukar Topphandbolti', image: '/handball_social_4.png', text: 'Smáatriðin skipta máli. Klístur á fingurna og einbeiting í botni. Við erum klár í slaginn! 🔥', likes: '620' },
];
