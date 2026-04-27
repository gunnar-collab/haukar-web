import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FanProfileDemo() {
  const [matchStatusIndex, setMatchStatusIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [ticketType, setTicketType] = useState('vip'); // 'vip' | 'general'
  
  const matchStatuses = [
    { label: "Fyrir leik", statusText: "Pre-Game: Haukamenn mæta kl 18:00", badge: "KICKOFF: 19:30" },
    { label: "Hálfleikur", statusText: "Hálfleikur (Staðan: 1-0 fyrir Hauka)", badge: "HT: 1-0" },
    { label: "Leikslok", statusText: "Lokastaða: Sigur! 2-1", badge: "FT: 2-1 (W)" }
  ];

  const currentStatus = matchStatuses[matchStatusIndex];

  const handleAddToWallet = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
        
        {/* Left Column: Dashboard & Controls */}
        <div className="flex-1 space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mínar Síður</h1>
            <p className="text-gray-600">Velkominn, <span className="font-semibold">Jón Jónsson</span> (Kt: 123456-7890)</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="material-icons mr-2 text-[#c8102e]">confirmation_number</span>
              Næsti Leikur
            </h2>
            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Haukar vs. Grótta</p>
              <p className="text-2xl font-bold text-gray-900">Mán 28. Apríl • 19:30</p>
              <p className="text-gray-600">Ásvellir, Hafnarfirði</p>
            </div>

            {/* Simulation Slider */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <label htmlFor="match-status" className="block text-sm font-bold text-gray-900 mb-4 flex items-center">
                <span className="material-icons mr-2 text-gray-400">tune</span>
                Hermir: Staða Leiks (Sýnishorn)
              </label>
              <input
                id="match-status"
                type="range"
                min="0"
                max="2"
                step="1"
                value={matchStatusIndex}
                onChange={(e) => setMatchStatusIndex(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#c8102e]"
              />
              <div className="flex justify-between text-xs text-gray-500 font-medium mt-2">
                <span>Fyrir Leik</span>
                <span>Hálfleikur</span>
                <span>Leikslok</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Google Wallet Pass Mock */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          <div className="flex space-x-2 mb-8 bg-gray-200 p-1 rounded-lg w-max mx-auto md:mx-0">
            <button 
              onClick={() => setTicketType('vip')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${ticketType === 'vip' ? 'bg-white shadow-sm text-[#c8102e]' : 'text-gray-500 hover:text-gray-900'}`}
            >
              VIP Miði
            </button>
            <button 
              onClick={() => setTicketType('general')}
              className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${ticketType === 'general' ? 'bg-white shadow-sm text-[#c8102e]' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Almennur Miði
            </button>
          </div>

          <div className="relative w-full max-w-[340px] perspective-1000">
            <motion.div 
              className="w-full bg-gradient-to-br from-[#e61932] to-[#990a21] rounded-[24px] shadow-2xl overflow-hidden relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Top Banner (Matte Red) */}
              <div className="px-6 py-5 flex justify-between items-start border-b border-white/20">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                   {/* Haukar Logo Mock */}
                   <span className="font-bold text-[#c8102e] text-lg">H</span>
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-xs font-semibold uppercase tracking-wider">Haukar Íþróttafélag</p>
                  <p className="text-white font-bold text-lg">
                    {ticketType === 'vip' ? 'VIP Aðgöngumiði' : 'Almennur Aðgöngumiði'}
                  </p>
                </div>
              </div>

              {/* Match Details */}
              <div className="px-6 py-6 bg-white/5 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-white/60 text-xs font-medium uppercase mb-1">Keppni</p>
                    <p className="text-white font-bold text-xl">Lengjudeildin</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                      {currentStatus.badge}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-white/60 text-xs font-medium uppercase mb-1">Mótherji</p>
                    <p className="text-white font-bold text-lg">Grótta</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-xs font-medium uppercase mb-1">Dags</p>
                    <p className="text-white font-bold text-lg">28. Apr</p>
                  </div>
                </div>

                {/* Seat Info */}
                {ticketType === 'vip' ? (
                  <div className="flex justify-between items-center bg-black/20 rounded-lg p-3">
                     <div>
                        <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Sæti</p>
                        <p className="text-white font-bold text-xl">B12</p>
                     </div>
                     <div className="text-center border-l border-white/20 pl-4">
                        <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Hlið</p>
                        <p className="text-white font-bold text-xl">A</p>
                     </div>
                     <div className="text-right border-l border-white/20 pl-4">
                        <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Röð</p>
                        <p className="text-white font-bold text-xl">3</p>
                     </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center bg-black/20 rounded-lg p-3">
                     <div className="w-full text-center">
                        <p className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Stúka</p>
                        <p className="text-white font-bold text-xl tracking-widest">OPIÐ SVÆÐI</p>
                     </div>
                  </div>
                )}
              </div>

              {/* Dynamic Status / Barcode Area */}
              <div className="bg-white px-6 py-6 text-center">
                <motion.div 
                  key={matchStatusIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <p className="text-sm font-bold text-[#c8102e] uppercase tracking-wider mb-1">Flugupplýsingar / Staða</p>
                  <p className="text-gray-800 font-medium">{currentStatus.statusText}</p>
                </motion.div>
                
                {/* Aztec Barcode Mock */}
                <div className="w-32 h-32 bg-gray-100 border-2 border-gray-800 mx-auto rounded-lg flex flex-col items-center justify-center p-2">
                  <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik00IDRoOHY4SDR6TTEyIDEyaDh2OEgxMnpNMjAgMjBoOHY4SDIwek0yOCA4aDh2OEgyOHpNOCAyOGg4djhIOHoiIGZpbGw9IiMzMzMiLz48L3N2Zz4=')] bg-repeat opacity-80 mix-blend-multiply"></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-mono">1234567890-HAUK</p>
              </div>
            </motion.div>
          </div>

          {/* Add to Wallet Button */}
          <div className="mt-8 w-full max-w-[340px]">
            <AnimatePresence mode="wait">
              {!isAdded ? (
                <motion.button
                  key="add-btn"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToWallet}
                  className="w-full bg-black text-white rounded-full py-4 px-6 font-bold flex items-center justify-center space-x-3 shadow-lg hover:bg-gray-900 transition-colors"
                >
                  {/* Google Wallet Icon Mock */}
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M21 18v-7h-2v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zm-3-11V5c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v2H3v2h18V7h-3zM8 5h8v2H8V5z" />
                  </svg>
                  <span>Bæta í Google Wallet</span>
                </motion.button>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-green-50 text-green-700 border border-green-200 rounded-full py-4 px-6 font-bold flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span className="material-icons">check_circle</span>
                  <span>Vistað í Wallet!</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>
      </div>
    </div>
  );
}
