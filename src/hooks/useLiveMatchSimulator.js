import { useState, useEffect } from 'react';

const MOCK_EVENTS = [
  "Það er allt að verða reiðubúið til að hefja leikinn. Stemmningin í Ólafssal er frábær í kvöld og við eigum von á hörkuleik.",
  "Mín 1: 2:0 Haukar setja fyrstu stig leiksins. Krystal gerir það.",
  "Mín 1: 2:2. Keflavík jafnar strax. Keishana.",
  "Mín 2: 6:2. Krystal fer á vítalínuna og setur niður bæði skot sín. Hún er með öll stig Hauka til þessa.",
  "Mín 5: 6:9. Keishana setur þrist fyrir Keflavík og brýtur stigaþurrðina hjá amk Keflavík.",
  "Mín 8: 10:11. Keishana setur stig fyrir Keflavík og þá eru þær yfir.",
  "Mín 11: 18:19. Anna Lára setur þrist fyrir Keflavík en Tinna minnkar muninn fyrir Hauka.",
  "Mín 14: 25:21. Rósa Björk geggjuð undir körfunni hjá Haukum og setur tvö stig.",
  "Mín 15: 30:25. Lovísa setur þrist fyrir Hauka og munurinn er fimm stig sem er sá mesti hingað til í leiknum.",
  "Mín 24: 50:40. Haukar svara strax með þriggja stiga körfu en Sara Rún setur tvö stig í kjölfarið og munurinn er þá 10 stig milli liðanna. Allt opið ennþá.",
  "Mín 28: 63:47. Krystal með þrist og munurinn er þá 16 stig. Haukar eru að ganga frá þessum leik í þriðja leikhluta.",
  "Mín 32: 72:56. Anna Ingunn setur þrist fyrir Keflavík.",
  "Mín 35: 76:66. Keflavíkurhraðlestin er komin á fullt og er búin að minnka forskot Hauka niður í 10 stig.",
  "Mín 39: 86:72. 14 stiga sigur Hauka í kvöld sem eru einum sigri frá úrslitaeinvíginu. Leik lokið!"
];

export function useLiveMatchSimulator(isActive = true) {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [eventIndex, setEventIndex] = useState(0);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsLiveMode(false);
      setCurrentEvent(null);
      return;
    }

    setIsLiveMode(true);
    
    // Push the first event quickly (5 seconds)
    const initialTimer = setTimeout(() => {
      setCurrentEvent({ id: 1, text: MOCK_EVENTS[0] });
      setEventIndex(1);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || eventIndex === 0 || eventIndex >= MOCK_EVENTS.length) return;

    // Push subsequent events every 10 seconds to simulate a live match faster for the demo
    const interval = setInterval(() => {
      setCurrentEvent({ id: eventIndex + 1, text: MOCK_EVENTS[eventIndex] });
      setEventIndex(prev => prev + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, [isActive, eventIndex]);

  return { isLiveMode, currentEvent };
}
