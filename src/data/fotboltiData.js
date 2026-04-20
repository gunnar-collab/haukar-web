export const dataKarla = {
  standings: [
    { rank: 1, team: 'Fjölnir', played: 22, w: 14, d: 6, l: 2, pts: 48 },
    { rank: 2, team: 'Afturelding', played: 22, w: 13, d: 4, l: 5, pts: 43 },
    { rank: 3, team: 'Haukar', played: 22, w: 12, d: 5, l: 5, pts: 41 },
    { rank: 4, team: 'Fylkir', played: 22, w: 11, d: 6, l: 5, pts: 39 },
    { rank: 5, team: 'Leiknir R.', played: 22, w: 10, d: 4, l: 8, pts: 34 },
  ],
  nextMatch: {
    competition: 'Lengjudeild Karla',
    home: 'Haukar',
    away: 'Fylkir',
    date: 'Lau 15. Maí • 14:00',
    venue: 'Ásvellir',
  },
  lastMatch: {
    competition: 'Lengjudeild Karla',
    home: 'Afturelding',
    away: 'Haukar',
    homeScore: 1,
    awayScore: 2,
    statsLink: 'https://www.ksi.is/'
  },
  players: [
    { number: "1", slug: "dadi-snaer", name: "Daði Snær", position: "Markvörður", deepStats: { leikir: 22, mork: 0, gula: 1, sto: 0 }, img: "https://images.unsplash.com/photo-1534015696614-25e2f2e51921?auto=format&fit=crop&q=80&w=800" },
    { number: "4", slug: "olafur-karl", name: "Ólafur Karl", position: "Varnarmaður", deepStats: { leikir: 21, mork: 2, gula: 4, sto: 1 }, img: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&q=80&w=800" },
    { number: "9", slug: "aron-freyr", name: "Aron Freyr", position: "Sóknarmaður", deepStats: { leikir: 22, mork: 14, gula: 2, sto: 5 }, img: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&q=80&w=800" }
  ]
};

export const dataKvenna = {
  standings: [
    { rank: 1, team: 'Víkingur R.', played: 18, w: 12, d: 4, l: 2, pts: 40 },
    { rank: 2, team: 'Haukar', played: 18, w: 11, d: 5, l: 2, pts: 38 },
    { rank: 3, team: 'Grótta', played: 18, w: 10, d: 3, l: 5, pts: 33 },
    { rank: 4, team: 'FHL', played: 18, w: 8, d: 4, l: 6, pts: 28 },
    { rank: 5, team: 'Afturelding', played: 18, w: 7, d: 5, l: 6, pts: 26 },
  ],
  nextMatch: {
    competition: 'Lengjudeild Kvenna',
    home: 'Grótta',
    away: 'Haukar',
    date: 'Sun 16. Maí • 16:00',
    venue: 'Vivaldivöllurinn',
  },
  lastMatch: {
    competition: 'Lengjudeild Kvenna',
    home: 'Haukar',
    away: 'Víkingur R.',
    homeScore: 1,
    awayScore: 1,
    statsLink: 'https://www.ksi.is/'
  },
  players: [
    { number: "1", slug: "saeunn-bjork", name: "Sæunn Björk", position: "Markvörður", deepStats: { leikir: 18, mork: 0, gula: 0, sto: 1 }, img: "https://images.unsplash.com/photo-1550091873-1025a1768822?auto=format&fit=crop&q=80&w=800" },
    { number: "8", slug: "birta-ros", name: "Birta Rós", position: "Miðjumaður", deepStats: { leikir: 18, mork: 4, gula: 1, sto: 7 }, img: "https://images.unsplash.com/photo-1560193498-755c3c0a520a?auto=format&fit=crop&q=80&w=800" },
    { number: "10", slug: "kristin-lind", name: "Kristín Lind", position: "Sóknarmaður", deepStats: { leikir: 17, mork: 11, gula: 2, sto: 3 }, img: "https://images.unsplash.com/photo-1522036750058-29fa3a992683?auto=format&fit=crop&q=80&w=800" }
  ]
};

export const footballNews = [
  { id: 1, category: "Meistaraflokkur Karla", title: "Flautað til leiks í Lengjudeildinni á laugardaginn", date: "10. Maí", image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=800" },
  { id: 2, category: "Meistaraflokkur Kvenna", title: "Stelpurnar tilbúnar í toppslaginn gegn Gróttu", date: "8. Maí", image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=800" },
  { id: 3, category: "Yngri Flokkar", title: "Fjölmennt á fótboltaskóla Hauka um helgina", date: "5. Maí", image: "https://images.unsplash.com/photo-1516733968668-dbdce39c4651?auto=format&fit=crop&q=80&w=800" },
];

export const socialPosts = [
  { id: 1, platform: 'Instagram', handle: '@haukar_fotbolti', image: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80&w=800', text: 'Sætur útisigur í gær! 3 stig í hús og stefnan sett upp á við. 🔴⚪️ #fotbolti', likes: '412' },
  { id: 2, platform: 'Facebook', handle: 'Haukar Fótbolti', image: 'https://images.unsplash.com/photo-1518091043644-c1d445e4d20c?auto=format&fit=crop&q=80&w=800', text: 'Liðið fyrir leik dagsins er klárt. Sjáumst á Ásvöllum klukkan 14:00!', likes: '205' },
  { id: 3, platform: 'Instagram', handle: '@haukar_fotbolti', image: 'https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&q=80&w=800', text: 'Nýr leikmaður mættur á svæðið. Bjóðum Aron Frey velkominn í fjölskylduna! ✍️', likes: '678' },
  { id: 4, platform: 'Facebook', handle: 'Haukar Fótbolti', image: 'https://images.unsplash.com/photo-1574629810360-7efbb19255cb?auto=format&fit=crop&q=80&w=800', text: 'Mætum í rautt og styðjum stelpurnar í mikilvægum leik gegn Gróttu á morgun.', likes: '315' },
];
