import { useState, useEffect } from 'react';

const MOCK_EVENTS = [
  "KERFISSKILABOÐ: Leikur er að hefjast! Haukar spilar við Keflavík. Leikurinn byrjar klukkan 19:15. Skrifaðu gríðarlega peppaða og spennandi inngangslýsingu til að hita aðdáendur upp!",
  "0:0. Leikur hafinn. Haukar vinna uppkastið og hefja sókn.",
  "2:0. Haukar setja fyrstu stig leiksins. Krystal gerir það.",
  "2:2. Keflavík jafnar strax. Keishana.",
  "8:10. Keishana setur stig fyrir Keflavík og þá eru þær yfir."
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
