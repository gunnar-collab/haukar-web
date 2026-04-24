import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skakData } from '../data/skakData';
import Button from '../components/Button';
import ChessPuzzle from '../components/ChessPuzzle';

export default function Skak() {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#0a0f1d] text-white selection:bg-[#c8102e] selection:text-white min-h-screen">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/chess/hero_bg.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1d]/40 via-[#0a0f1d]/60 to-[#0a0f1d]" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="inline-block px-4 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.3em] mb-6 text-gray-300">
              The Art of Strategy
            </span>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-6 leading-none">
              Haukar <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-400">Skák</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 font-medium leading-relaxed mb-10 italic">
              "Á skákborðinu eru allir jafnir þar til fyrsti leikurinn er gerður."
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white border-white !text-[#0a0f1d] hover:!bg-[#c8102e] hover:!border-[#c8102e] hover:!text-white transition-all duration-300"
              >
                Skráning í skóla
              </Button>
              <Button variant="secondary" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Skoða töflu
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Decorative Lines */}
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* 2. LEADERBOARD / TOP PLAYERS */}
      <section className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
              Lykilmenn
            </h2>
            <p className="text-gray-400 font-medium">
              Haukar eiga einhverja sterkustu skákmenn landsins. Hér eru foringjarnir sem leiða sveitina á Íslandsmótinu.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-500">
            <span>Stigatafla</span>
            <div className="h-[2px] w-12 bg-[#c8102e]" />
            <span>2026 Season</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skakData.topPlayers.map((player, idx) => (
            <motion.div 
              key={player.name}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#131a2e] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 cursor-pointer"
              onClick={() => setSelectedPlayer(player)}
            >
              <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={player.img} 
                  alt={player.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.src = "https://placehold.co/400x600/131a2e/white?text=Haukar+Skák"; }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1d] via-[#0a0f1d]/20 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-[#c8102e] uppercase tracking-widest">{player.title}</span>
                  <span className="text-lg font-black italic">{player.rating}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight leading-tight">{player.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE PUZZLE & NEXT BATTLE */}
      <section className="py-24 bg-[#111827] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Puzzle Card */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-[#0a0f1d] rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl relative group"
          >
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#c8102e] rounded-full flex items-center justify-center rotate-[-15deg] shadow-lg">
              <span className="material-symbols-outlined text-white text-3xl">lightbulb</span>
            </div>
            
            <h3 className="text-3xl font-black italic uppercase tracking-tight mb-4 mt-4">
              {skakData.puzzle.title}
            </h3>
            <p className="text-gray-400 mb-8 font-medium">
              {skakData.puzzle.description}
            </p>
            
            <ChessPuzzle />
          </motion.div>

          {/* Next Tournament Card */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-[#c8102e] text-xs font-black uppercase tracking-[0.3em] mb-4 block">Næsta orrusta</span>
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-tight">
              {skakData.nextTournament.competition}
            </h2>
            
            <div className="space-y-8 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">event</span>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-1">Dagsetning</h4>
                  <p className="text-xl font-bold">{skakData.nextTournament.date}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-white">location_on</span>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-500 mb-1">Staður</h4>
                  <p className="text-xl font-bold">{skakData.nextTournament.venue}</p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-gradient-to-br from-[#c8102e]/20 to-transparent border border-[#c8102e]/20">
                <p className="text-lg font-medium italic text-gray-300">
                  "{skakData.nextTournament.description}"
                </p>
              </div>
            </div>
            
            <Button variant="primary" size="lg" className="w-full md:w-auto px-12">
              Skoða deildina
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 4. NEWS GRID */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-12">Fréttir af vellinum</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skakData.news.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 relative border border-white/5">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  onError={(e) => { e.target.src = "https://placehold.co/600x400/131a2e/white?text=Haukar+Fréttir"; }}
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#c8102e] rounded-full text-[9px] font-black uppercase tracking-widest">
                  {item.category}
                </div>
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight group-hover:text-[#c8102e] transition-colors line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm font-bold mt-2 uppercase tracking-widest">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLAYER MODAL */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="absolute inset-0 bg-[#0a0f1d]/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#131a2e] rounded-[3rem] overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-1/2 aspect-[3/4]">
                <img src={selectedPlayer.img} alt={selectedPlayer.name} className="w-full h-full object-cover" onError={(e) => { e.target.src = "https://placehold.co/400x600/131a2e/white?text=Haukar+Skák"; }} />
              </div>
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <button onClick={() => setSelectedPlayer(null)} className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">close</span>
                </button>
                <span className="text-[#c8102e] text-xs font-black uppercase tracking-[0.3em] mb-4 block">{selectedPlayer.title}</span>
                <h3 className="text-5xl font-black italic uppercase tracking-tighter mb-2 leading-none">{selectedPlayer.name.split(' ')[0]}<br/>{selectedPlayer.name.split(' ').slice(1).join(' ')}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-gray-500 text-sm font-bold uppercase tracking-widest">Current Rating</span>
                  <span className="text-3xl font-black italic text-white">{selectedPlayer.rating}</span>
                </div>
                <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 italic">
                  "{selectedPlayer.bio}"
                </p>
                <Button 
                  variant="outline" 
                  className="w-full py-5 rounded-2xl bg-white border-white !text-[#0a0f1d] hover:!bg-[#c8102e] hover:!border-[#c8102e] hover:!text-white transition-all duration-300"
                >
                  Skoða prófíl á FIDE
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
