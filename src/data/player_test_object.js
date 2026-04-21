/**
 * Dæmi um JSON hlut fyrir leikmannatölfræði Hauka.
 * Þessi hlutur er notaður til að fylla út PlayerProfile sniðmátið.
 */

const playerStatsData = {
  name: "Aron Rafn Eðvarðsson",
  number: "1",
  position: "Markmaður",
  img: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=1000",
  stats: {
    offensive: {
      gamesPlayed: 28,
      totalGoals: 2,
      totalShots: 3,
      shootingPercentage: "66.7%"
    },
    defensive: {
      legalStops: 1,
      steals: 2,
      blockedShots: 0
    },
    goalkeeper: {
      totalSaves: 215
    }
  }
};

/**
 * Fall sem tekur við JSON hlut og skilar React component eða
 * uppfærir state (Dæmi um notkun í React):
 */
function populatePlayerTemplate(data) {
  // Í raunverulegu forriti myndir þú nota React Router:
  // navigate(`/leikmenn/${slug}`, { state: { player: data } });
  console.log("Gögn móttekin fyrir:", data.name);
  return data;
}

populatePlayerTemplate(playerStatsData);
