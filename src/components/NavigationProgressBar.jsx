import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavigationProgressBar() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Start progress on location change
    setVisible(true);
    setProgress(30);

    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setVisible(false);
        setTimeout(() => setProgress(0), 200); // Reset for next time
      }, 300);
    }, 400); // Fake load time for smooth feel

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-full z-[9999] pointer-events-none"
      style={{ height: '3px' }}
    >
      <div 
        className="h-full bg-[#c8102e] transition-all duration-300 ease-out shadow-[0_0_8px_rgba(200,16,46,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
