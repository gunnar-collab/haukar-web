import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot, where, doc } from 'firebase/firestore';

export function useLiveCommentaryStream(isActive = true, matchId = 'kki-finals-2026') {
  const [currentCommentary, setCurrentCommentary] = useState(null);
  const [isLiveMode, setIsLiveMode] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setIsLiveMode(false);
      setCurrentCommentary(null);
      return;
    }

    // 1. Listen to the System Lock to see if a live match is currently running
    const lockRef = doc(db, 'system_state', 'live_commentary_lock');
    const unsubscribeLock = onSnapshot(lockRef, (lockSnap) => {
      if (lockSnap.exists()) {
        const lockData = lockSnap.data();
        const now = Date.now();
        if (lockData.isRunning && lockData.expiresAt > now) {
          setIsLiveMode(true);
        } else {
          setIsLiveMode(false);
          setCurrentCommentary(null); // Clear commentary if game ended
        }
      } else {
        setIsLiveMode(false);
      }
    });

    return () => unsubscribeLock();
  }, [isActive]);

  useEffect(() => {
    if (!isLiveMode) return;

    // 2. Only if live mode is active, listen for the actual commentary events
    const q = query(
      collection(db, 'live_commentary_stream'),
      where('matchId', '==', matchId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const unsubscribeStream = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const data = doc.data();
        
        setCurrentCommentary({
          id: doc.id,
          text: data.text,
          sport: data.sport
        });
      }
    });

    return () => unsubscribeStream();
  }, [isLiveMode, matchId]);

  return { isLiveMode, currentCommentary };
}
