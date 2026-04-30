import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where } from 'firebase/firestore';

export function useFirebaseLiveMatch(isActive = true, matchId = 'haukar-keflavik-2026') {
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsLiveMode(false);
      setCurrentEvent(null);
      return;
    }

    setIsLiveMode(true);

    const q = query(
      collection(db, 'live_match_events'),
      where('matchId', '==', matchId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();
        
        // We only want to set the event if it's new (to avoid duplicate triggers)
        // A simple way is to use the document ID to prevent re-triggering the same event
        setCurrentEvent({
          id: doc.id,
          text: data.text,
          sport: data.sport
        });
      }
    });

    return () => unsubscribe();
  }, [isActive, matchId]);

  return { isLiveMode, currentEvent };
}
