import { useState } from 'react';

// Common team colors for the dynamic SVG fallback
const getTeamColor = (teamName) => {
  const name = teamName.toLowerCase();
  if (name.includes('valur')) return 'from-red-600 to-red-800';
  if (name.includes('fh')) return 'from-gray-800 to-black';
  if (name.includes('íR') || name.includes('ir')) return 'from-blue-600 to-blue-800';
  if (name.includes('fram')) return 'from-blue-500 to-blue-700';
  if (name.includes('ka')) return 'from-yellow-400 to-yellow-600 text-black';
  if (name.includes('íBV') || name.includes('ibv')) return 'from-white to-gray-200 text-black';
  if (name.includes('stjarnan')) return 'from-blue-700 to-blue-900';
  if (name.includes('afturelding')) return 'from-red-600 to-black';
  if (name.includes('vikingur') || name.includes('víkingur')) return 'from-red-600 to-black';
  if (name.includes('grótta') || name.includes('grotta')) return 'from-blue-600 to-gray-800';
  if (name.includes('keflavík')) return 'from-blue-800 to-blue-900';
  
  // Deterministic random color for others
  const colors = [
    'from-emerald-500 to-emerald-700',
    'from-purple-500 to-purple-700',
    'from-indigo-500 to-indigo-700',
    'from-rose-500 to-rose-700',
    'from-cyan-500 to-cyan-700',
    'from-amber-500 to-amber-700'
  ];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[index % colors.length];
};

export default function TeamLogo({ teamName, className = "" }) {
  const [imgError, setImgError] = useState(false);
  
  // If it's Haukar, use the official logo
  if (teamName.includes('Haukar')) {
    return <img src="/images/haukar-log.svg" alt="Haukar" className={`object-contain scale-125 drop-shadow-sm ${className}`} />;
  }

  // Format team name for our local files
  const safeName = teamName.toLowerCase()
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace('á', 'a')
    .replace(/[^a-z0-9]/g, '');

  const gradientClass = getTeamColor(teamName);
  const initial = teamName.charAt(0).toUpperCase();

  // If the image fails to load, we fall back to the sleek CSS crest
  if (imgError) {
    return (
      <div className={`rounded-full flex items-center justify-center bg-gradient-to-br shadow-inner ${gradientClass} ${className}`}>
        <span className="font-black italic opacity-90 drop-shadow-md text-white text-3xl">
          {gradientClass.includes('text-black') ? (
            <span className="text-gray-900">{initial}</span>
          ) : (
            initial
          )}
        </span>
      </div>
    );
  }

  // First try to load the local downloaded PNG/SVG, then fallback to error
  // We check .svg first (for FH, Vikingur), but for simplicity we'll just try to load a known extension
  // In a real app we'd map this, but here we'll try .png and if it fails, it sets imgError.
  // Actually, because of React, it's safer to just trigger the error to show the sleek CSS fallback 
  // for any team that isn't hardcoded here.
  
  const knownLogos = {
    'fh': '/images/teams/fh.svg',
    'stjarnan': '/images/teams/stjarnan.png',
    'vikingurr': '/images/teams/vikingurr.svg'
  };

  const logoSrc = knownLogos[safeName];

  if (logoSrc) {
    return (
      <img 
        src={logoSrc} 
        alt={teamName} 
        className={`object-contain ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  // If we don't have a known logo file, render the sleek CSS crest immediately
  return (
    <div className={`rounded-full flex items-center justify-center bg-gradient-to-br shadow-inner border border-white/20 ${gradientClass} ${className}`}>
      <span className="font-black italic drop-shadow-sm text-white text-3xl">
        {gradientClass.includes('text-black') ? (
          <span className="text-gray-900">{initial}</span>
        ) : (
          initial
        )}
      </span>
    </div>
  );
}
