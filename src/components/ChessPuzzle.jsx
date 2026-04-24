import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_PIECES = {
  'e2': { type: 'knight', color: 'white', icon: 'chess_knight' },
  'f4': { type: 'king', color: 'black', icon: 'chess_king' },
  'h6': { type: 'rook', color: 'white', icon: 'chess_rook' },
};

export default function ChessPuzzle() {
  const [pieces, setPieces] = useState(INITIAL_PIECES);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'success' | 'fail'
  const [hint, setHint] = useState(false);

  // Mate in 1: Rh6 to h4 is NOT mate, but Rh6 to f6 is! 
  // Let's make it simpler: Rook at h6, King at f4. White to move.
  // Goal: Rh6 -> h4 (Check) or something else.
  // Let's do: Rook at d1, King at d8. Move Rd1 -> d8 (Mate).
  
  const puzzlePieces = {
    'a1': { type: 'rook', color: 'white', icon: 'chess_rook' },
    'h8': { type: 'king', color: 'black', icon: 'chess_king' },
    'f7': { type: 'pawn', color: 'black', icon: 'chess_pawn' },
    'g7': { type: 'pawn', color: 'black', icon: 'chess_pawn' },
    'h7': { type: 'pawn', color: 'black', icon: 'chess_pawn' },
  };

  useEffect(() => {
    setPieces(puzzlePieces);
  }, []);

  const handleSquareClick = (coord) => {
    if (status === 'success') return;

    if (selected === coord) {
      setSelected(null);
      return;
    }

    if (pieces[coord] && pieces[coord].color === 'white') {
      setSelected(coord);
      return;
    }

    if (selected) {
      // Attempt move
      if (selected === 'a1' && coord === 'a8') {
        const newPieces = { ...pieces };
        delete newPieces[selected];
        newPieces[coord] = pieces[selected];
        setPieces(newPieces);
        setSelected(null);
        setStatus('success');
      } else {
        setStatus('fail');
        setTimeout(() => setStatus('idle'), 1000);
      }
    }
  };

  const reset = () => {
    setPieces(puzzlePieces);
    setStatus('idle');
    setSelected(null);
  };

  const renderSquare = (r, c) => {
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const coord = `${files[c]}${8 - r}`;
    const isDark = (r + c) % 2 === 1;
    const piece = pieces[coord];
    const isSelected = selected === coord;

    return (
      <div 
        key={coord}
        onClick={() => handleSquareClick(coord)}
        className={`
          relative aspect-square flex items-center justify-center cursor-pointer transition-colors duration-300
          ${isDark ? 'bg-[#1c2c6c]/20' : 'bg-white/5'}
          ${isSelected ? 'bg-[#c8102e]/40 ring-4 ring-inset ring-[#c8102e]' : ''}
          hover:bg-white/10
        `}
      >
        <AnimatePresence mode="popLayout">
          {piece && (
            <motion.span 
              key={coord + piece.type}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`material-symbols-outlined text-3xl md:text-4xl select-none
                ${piece.color === 'white' ? 'text-white' : 'text-gray-500'}
              `}
            >
              {piece.icon}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Square Notation (Optional) */}
        {c === 0 && <span className="absolute top-1 left-1 text-[8px] text-gray-600 font-bold uppercase">{8 - r}</span>}
        {r === 7 && <span className="absolute bottom-1 right-1 text-[8px] text-gray-600 font-bold uppercase">{files[c]}</span>}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative rounded-2xl overflow-hidden border-4 border-[#131a2e] shadow-2xl aspect-square bg-[#0a0f1d]">
        <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
          {[...Array(8)].map((_, r) => (
            [...Array(8)].map((_, c) => renderSquare(r, c))
          ))}
        </div>

        {/* Feedback Overlay */}
        <AnimatePresence>
          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
              className="absolute inset-0 bg-[#c8102e]/20 flex flex-col items-center justify-center p-6 text-center z-20"
            >
              <motion.div
                initial={{ scale: 0.5, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-[2rem] p-8 shadow-2xl"
              >
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-3xl">check</span>
                </div>
                <h4 className="text-[#0a0f1d] text-2xl font-black italic uppercase mb-2">Frábært!</h4>
                <p className="text-gray-500 text-sm font-medium mb-6">Þú mátaðir í einum leik.</p>
                <button 
                  onClick={reset}
                  className="px-8 py-3 bg-[#0a0f1d] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#c8102e] transition-colors"
                >
                  Prófa aftur
                </button>
              </motion.div>
            </motion.div>
          )}

          {status === 'fail' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none ring-8 ring-inset ring-red-500/50 z-20"
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Hvítur á leik</span>
        </div>
        <button 
          onClick={() => setHint(!hint)}
          className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
        >
          {hint ? 'Vísbending: Hrókur á a8' : 'Vantar vísbendingu?'}
        </button>
      </div>
    </div>
  );
}
