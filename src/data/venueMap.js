export const getVenueForTeam = (teamName, sport) => {
  const venues = {
    'Afturelding': { default: 'Varmá' },
    'Dalvík/Reynir': { default: 'Dalvíkurvöllur' },
    'FH': { default: 'Kaplakriki' },
    'FHL': { default: 'Fjarðabyggðarhöllin' },
    'Fram': { default: 'Úlfarsárdalur' },
    'Grindavík': { default: 'Stakkavíkurvöllur', 'Körfubolti': 'HS Orku höllin' },
    'Grótta': { default: 'Vivaldivöllurinn', 'Handbolti': 'Hertzhöllin', 'Körfubolti': 'Hertzhöllin' },
    'HK': { default: 'Kórinn' },
    'Hamar': { default: 'Frystikistan' },
    'Höttur/Huginn': { default: 'Vilhjálmsvöllur' },
    'IBV': { default: 'Hásteinsvöllur', 'Handbolti': 'Íþróttamiðstöðin Vestmannaeyjum', 'Körfubolti': 'Íþróttamiðstöðin Vestmannaeyjum' },
    'ÍBV': { default: 'Hásteinsvöllur', 'Handbolti': 'Íþróttamiðstöðin Vestmannaeyjum', 'Körfubolti': 'Íþróttamiðstöðin Vestmannaeyjum' },
    'IR': { default: 'ÍR-völlurinn', 'Handbolti': 'Skógarsel', 'Körfubolti': 'Skógarsel' },
    'ÍR': { default: 'ÍR-völlurinn', 'Handbolti': 'Skógarsel', 'Körfubolti': 'Skógarsel' },
    'KA': { default: 'Greifavöllurinn', 'Handbolti': 'KA-heimilið' },
    'KA/Þór': { default: 'KA-heimilið' },
    'KFA': { default: 'Fjarðabyggðarhöllin' },
    'KR': { default: 'Meistaravellir', 'Körfubolti': 'DHL Höllin' },
    'KV': { default: 'KR-völlur' },
    'Keflavík': { default: 'HS Orku völlurinn', 'Körfubolti': 'Blue höllin' },
    'Kormákur/Hvöt': { default: 'Blönduósvöllur' },
    'Kári': { default: 'Akraneshöllin' },
    'Njarðvík': { default: 'Rafholtsvöllurinn', 'Körfubolti': 'Ljónagryfjan' },
    'Selfoss': { default: 'JÁVERK-völlurinn', 'Handbolti': 'Iða', 'Körfubolti': 'Iða' },
    'Sindri': { default: 'Mánavöllur', 'Körfubolti': 'Íþróttahúsið Höfn' },
    'Skallagrímur': { default: 'Fjósið' },
    'Snæfell': { default: 'Stykkishólmur' },
    'Stjarnan': { default: 'Samsung völlurinn', 'Handbolti': 'Mýrin', 'Körfubolti': 'Mýrin' },
    'Tindastóll': { default: 'Sauðárkróksvöllur', 'Körfubolti': 'Síkið' },
    'Valur': { default: 'N1-völlurinn (Hlíðarendi)', 'Handbolti': 'N1 höllin', 'Körfubolti': 'N1 höllin' },
    'Víkingur R.': { default: 'Víkingsvöllur', 'Handbolti': 'Safamýri' },
    'Víkingur Ó.': { default: 'Ólafsvíkurvöllur' },
    'Víðir': { default: 'Nesfisk-völlurinn' },
    'Ármann': { default: 'Kennaraháskólinn' },
    'Ægir': { default: 'Þorlákshöfn' },
    'Þróttur V.': { default: 'Vogaídýfuvöllur' },
    'Þróttur Vogum': { default: 'Vogaídýfuvöllur' },
    'Þór': { default: 'Þórsvöllur', 'Handbolti': 'Íþróttahöllin Akureyri', 'Körfubolti': 'Íþróttahöllin Akureyri' },
    'Þór Ak.': { default: 'Þórsvöllur', 'Handbolti': 'Íþróttahöllin Akureyri', 'Körfubolti': 'Íþróttahöllin Akureyri' }
  };

  const teamMapping = venues[teamName] || venues[teamName.trim()];
  if (teamMapping) {
    if (sport && teamMapping[sport]) {
      return teamMapping[sport];
    }
    return teamMapping.default;
  }
  
  // Fallback if not found
  return `${teamName} (Útivöllur)`;
};
