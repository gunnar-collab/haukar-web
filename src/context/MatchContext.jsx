import { createContext, useContext, useState, useEffect, useRef } from 'react';

const MatchContext = createContext();

export const useMatch = () => useContext(MatchContext);

export function MatchProvider({ children }) {
  const [minutes, setMinutes] = useState(58);
  const [seconds, setSeconds] = useState(0);
  const [haukarScore, setHaukarScore] = useState(33);
  const [fhScore, setFhScore] = useState(36);
  const [events, setEvents] = useState([]);
  const processedIds = useRef(new Set());

  const realEvents = [
    { id: 1, time: "56:51", score: "33-35", title: "MARK! Haukar", type: "goal_haukar", desc: "Skarphéðinn Ívar skorar fyrir utan af miðju." },
    { id: 2, time: "57:30", score: "33-36", title: "MARK! FH", type: "goal_fh", desc: "Jón Bjarni skorar af línunni." },
    { id: 3, time: "58:03", score: "33-36", title: "Brottvísun", type: "penalty", desc: "Ágúst fær 2 mínútur!" },
    { id: 4, time: "58:17", score: "34-36", title: "MARK! Haukar", type: "goal_haukar", desc: "Andri Fannar skorar úr hægra horni! Freyr með stoðsendinguna." },
    { id: 5, time: "59:03", score: "34-36", title: "VARIÐ!", type: "save", desc: "Aron Rafn ver! Garðar Ingi klikkar fyrir utan af miðju." },
    { id: 6, time: "59:11", score: "35-36", title: "MARK! Haukar", type: "goal_haukar", desc: "Össur skorar úr vinstra horni! Skarphéðinn Ívar með stoðsendingu." },
    { id: 7, time: "59:35", score: "35-36", title: "VARIÐ!", type: "save", desc: "Aron Rafn ver! Ingvar Dagur klikkar af línunni." },
    { id: 8, time: "60:00", score: "35-36", title: "VARIÐ!", type: "save", desc: "Daníel Freyr ver! Jón Ómar klikkar af línunni á síðustu sekúndunni." },
    { id: 9, time: "60:00", score: "35-36", title: "Gult spjald", type: "penalty", desc: "Birgir Már og Ágúst fá báðir gult spjald í leikslok." },
    { id: 10, time: "60:00", score: "35-36", title: "Leik lokið", type: "info", desc: "Hörkuleik lýkur með sigri FH í Hafnarfjarðarslagnum." }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        if (prev === 59) {
          if (minutes < 60) {
            setMinutes(m => m + 1);
            return 0;
          }
          return 59;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes]);

  useEffect(() => {
    const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    const nextEvents = realEvents.filter(e => 
      e.time === timeString && 
      !processedIds.current.has(e.id)
    );
    
    if (nextEvents.length > 0) {
      nextEvents.sort((a, b) => a.id - b.id);
      
      nextEvents.forEach((nextEvent, index) => {
        processedIds.current.add(nextEvent.id);
        setTimeout(() => {
          if (nextEvent.type === 'goal_haukar') {
            const [h, f] = nextEvent.score.split('-').map(Number);
            setHaukarScore(h);
          } else if (nextEvent.type === 'goal_fh') {
            const [h, f] = nextEvent.score.split('-').map(Number);
            setFhScore(f);
          }
          setEvents(prev => {
            if (prev.some(e => e.id === nextEvent.id)) return prev;
            return [nextEvent, ...prev];
          });
        }, index * 1000);
      });
    }

    if (minutes >= 60 && seconds > 0) {
        setMinutes(60);
        setSeconds(0);
    }
  }, [minutes, seconds]);

  const [selectedReport, setSelectedReport] = useState(null);

  const openReport = (match) => setSelectedReport(match);
  const closeReport = () => setSelectedReport(null);

  const value = {
    minutes,
    seconds,
    haukarScore,
    fhScore,
    events,
    latestEvent: events[0] || null,
    selectedReport,
    openReport,
    closeReport
  };

  return (
    <MatchContext.Provider value={value}>
      {children}
    </MatchContext.Provider>
  );
}
