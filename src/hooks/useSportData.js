import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

// Import local data for the fallback mechanism
import { dataKarla as fotboltiKarla, dataKvenna as fotboltiKvenna } from '../data/fotboltiData';
import { dataKarla as handboltiKarla, dataKvenna as handboltiKvenna } from '../data/handboltiData';
import { skakData } from '../data/skakData';
import { dataKarla as karateKarla, dataKvenna as karateKvenna } from '../data/karateData';

const LOCAL_DATA_FALLBACKS = {
  fotbolti: { karla: fotboltiKarla, kvenna: fotboltiKvenna },
  handbolti: { karla: handboltiKarla, kvenna: handboltiKvenna },
  skak: { default: skakData },
  karate: { karla: karateKarla, kvenna: karateKvenna }
};

/**
 * A custom hook to fetch sports data.
 * Attempts to fetch from Firestore first. If it fails or data is missing, 
 * it immediately falls back to local mock data to ensure the demo never breaks.
 */
export function useSportData(sportId, gender = 'default') {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchFromFirebase = async () => {
      try {
        // Here we attempt to fetch from the 'sports' collection in Firestore
        // where 'id' == sportId and 'gender' == gender
        const sportsRef = collection(db, 'sports');
        const q = query(sportsRef, where('id', '==', sportId), where('gender', '==', gender));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty && isMounted) {
          console.log(`[useSportData] Fetched live data from Firebase for ${sportId}`);
          // Merge documents if needed, assuming one main config doc for the sport
          setData(querySnapshot.docs[0].data());
        } else {
          throw new Error('No data found in Firebase for this sport.');
        }
      } catch (error) {
        console.warn(`[useSportData] Firebase fetch failed or no data found. Falling back to local data for ${sportId} (${gender}).`, error.message);
        
        // Fallback Mechanism
        if (isMounted) {
          const fallbackData = LOCAL_DATA_FALLBACKS[sportId]?.[gender] || LOCAL_DATA_FALLBACKS[sportId]?.['default'];
          if (fallbackData) {
            setData(fallbackData);
          } else {
            console.error(`[useSportData] No fallback data available for ${sportId} (${gender})`);
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setLoading(true);
    fetchFromFirebase();

    return () => {
      isMounted = false;
    };
  }, [sportId, gender]);

  return { data, loading };
}
