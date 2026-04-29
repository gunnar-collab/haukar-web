export const karate = {
  id: "karate",
  sport: "Karate",
  title: "Stundaskrá Karatedeildar",
  season: "Veturinn 2025-2026",
  gradient: "from-gray-800 to-black",
  icon: "sports_martial_arts",
  flokkar: [
    {
      name: "B1 - Byrjendur yngri",
      years: "Börn 6-11 ára",
      coaches: [
        { name: "Kristján" }
      ],
      sessions: [
        { day: "Mánudagar", time: "18:00-19:00", location: "-" },
        { day: "Miðvikudagar", time: "18:00-19:00", location: "-" }
      ]
    },
    {
      name: "FB - Framhald börn",
      years: "Börn 6-11 ára",
      coaches: [
        { name: "Gunni" }
      ],
      sessions: [
        { day: "Þriðjudagar", time: "18:00-19:00", location: "-" },
        { day: "Fimmtudagar", time: "18:00-19:00", location: "-" },
        { day: "Föstudagar", time: "18:00-19:00", location: "-" }
      ]
    },
    {
      name: "FU1 - Byrjendur og framhald",
      years: "Unglingar & Fullorðnir (Blátt belti og neðar)",
      coaches: [
        { name: "Gunni" }
      ],
      sessions: [
        { day: "Mánudagar", time: "19:00-20:30", location: "Sameiginlegt með FU2" },
        { day: "Þriðjudagar", time: "19:00-20:30", location: "-" },
        { day: "Fimmtudagar", time: "19:00-20:30", location: "Sameiginlegt með FU2" }
      ]
    },
    {
      name: "FU2 - Framhald",
      years: "Unglingar & Fullorðnir (Fjólublátt belti og ofar)",
      coaches: [
        { name: "Kristján" }
      ],
      sessions: [
        { day: "Mánudagar", time: "19:00-20:30", location: "Sameiginlegt með FU1" },
        { day: "Miðvikudagar", time: "19:00-20:30", location: "-" },
        { day: "Fimmtudagar", time: "19:00-20:30", location: "Sameiginlegt með FU1" }
      ]
    }
  ],
  specials: [
    {
      title: "Séræfingar",
      subtitle: "Þrek, Kata og Kumite",
      coaches: [
        { name: "Ýmsir" }
      ],
      sessions: [
        { day: "Þrek", time: "Mánudagar 20:30-22:00", location: "-" },
        { day: "Kata", time: "Þriðjudagar 20:30-22:00", location: "-" },
        { day: "Kumite", time: "Fimmtudagar 20:30-22:00", location: "-" }
      ]
    }
  ]
};
