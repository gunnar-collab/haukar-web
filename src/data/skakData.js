export const skakData = {
  topPlayers: [
    { name: "Hjörvar Steinn Grétarsson", rating: 2580, title: "Grandmaster (GM)", bio: "Hjörvar er einn fremsti skákmaður landsins og hefur verið burðarás í liði Hauka í mörg ár.", img: "/images/chess/hjovar.png" },
    { name: "Vignir Vatnar Stefánsson", rating: 2495, title: "International Master (IM)", bio: "Vignir er einn efnilegasti skákmaður Íslands og ríkjandi Íslandsmeistari í skák.", img: "/images/chess/vignir.png" },
    { name: "Guðmundur Kjartansson", rating: 2450, title: "Grandmaster (GM)", bio: "Guðmundur hefur mikla reynslu og er þekktur fyrir baráttugleði sína á skákborðinu.", img: "/images/chess/gudmundur.png" },
    { name: "Davíð Kjartansson", rating: 2320, title: "International Master (IM)", bio: "Davíð er lykilmaður í sveit Hauka og hefur unnið mörg mikilvæg stig fyrir félagið.", img: "/images/chess/david.png" },
  ],
  nextTournament: {
    competition: "Íslandsmót Skákfélaga",
    date: "Fös 15. Október • 18:00",
    venue: "Rimaskóli",
    opponent: "Víkingaklúbburinn",
    description: "Stórleikur í efstu deild Íslandsmótsins þar sem Haukar mæta ríkjandi meisturum."
  },
  lastResult: {
    competition: "Hraðskákkeppni Taflfélaga",
    opponent: "TR",
    result: "14.5 - 13.5",
    status: "Sigur",
    date: "12. Apríl"
  },
  puzzle: {
    title: "Vinnur þú eins og Vignir?",
    description: "Hvítur á leik og vinnur. Finnur þú framhaldið sem Vignir Vatnar notaði gegn TR í úrslitunum?",
    fen: "r1bqk2r/pp2bppp/2nppn2/8/3NP3/2N5/PPP1BPPP/R1BQ1RK1 w kq - 0 1",
    solution: "1. Nxc6 bxc6 2. e5!"
  },
  news: [
    { id: 1, slug: 'skak-islandsmeistari-vignir', category: "Meistaraflokkur", title: "Vignir Vatnar er Íslandsmeistari í skák 2026", date: "20. Apríl", image: "/images/chess/vignir.png" },
    { id: 2, slug: 'skak-haukar-a-toppnum', category: "Íslandsmót", title: "Haukar leiða Íslandsmótið eftir fyrri hlutann", date: "15. Apríl", image: "/images/chess/team_chess.png" },
    { id: 3, slug: 'skak-skoli-sumar', category: "Barna- og unglingastarf", title: "Skákskóli Hauka hefst í júní - Skráning í fullum gangi", date: "10. Apríl", image: "/images/chess/hero_bg.png" },
  ],
  social: [
    { id: 1, platform: 'Instagram', handle: '@haukarskak', image: '/images/chess/vignir.png', text: 'Vignir Vatnar gerir það aftur! Íslandsmeistari 2026. Til hamingju Vignir! 🏆🇮🇸 #skak #haukar', likes: '842' },
    { id: 2, platform: 'Facebook', handle: 'Haukar Skák', image: '/images/chess/team_chess.png', text: 'Frábær frammistaða hjá A-liðinu um helgina. Við stefnum á titilinn í ár!', likes: '315' },
  ]
};
