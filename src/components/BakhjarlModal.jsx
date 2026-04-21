import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function BakhjarlModal({ isOpen, onClose, initialTier = 'gull' }) {
  const [selectedTier, setSelectedTier] = useState(initialTier); // 'silfur' or 'gull'
  const [subscriptionType, setSubscriptionType] = useState('einstaklingur'); // 'einstaklingur' or 'hjon'
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'

  // Track previous isOpen to reset state when opened
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen && !prevIsOpen) {
    setPrevIsOpen(true);
    setSelectedTier(initialTier);
    setStep('select');
    setSubscriptionType('einstaklingur');
  } else if (!isOpen && prevIsOpen) {
    setPrevIsOpen(false);
  }

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // The actual pricing logic based on your rules
  const pricingData = {
    silfur: { 
      einstaklingur: '2.990 kr. / mán', 
      hjon: '4.900 kr. / mán' 
    },
    gull: { 
      einstaklingur: '3.900 kr. / mán', 
      hjon: '6.490 kr. / mán' 
    }
  };

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const resetAndClose = () => {
    setStep('select');
    onClose();
  };

  return createPortal(
    // FIXED: z-[9999] ensures this sits ABOVE the sticky Navbar (which is z-[100])
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
        
        {/* Header - Haukar Red */}
        <div className="bg-[#c8102e] p-5 flex justify-between items-center text-white relative shadow-md">
          <h2 className="font-black text-xl italic tracking-widest uppercase drop-shadow-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            Gerast Bakhjarl
          </h2>
          <button onClick={resetAndClose} className="hover:text-white/70 transition-colors absolute right-4 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <div className="p-6">
          {step === 'select' && (
            <div className="space-y-6">
              
              <div className="text-center mb-2">
                <p className="text-sm text-[#1c2c6c]/70 font-medium">Styðjum framtíðina á Ásvöllum. <br/>Skráðu þig eða ykkur hjónin saman.</p>
              </div>

              {/* Sub-Toggle: Einstaklingur vs Hjón */}
              <div className="flex bg-gray-100 p-1 rounded-xl shadow-inner border border-gray-200">
                <button 
                  onClick={() => setSubscriptionType('einstaklingur')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex justify-center items-center gap-1 ${
                    subscriptionType === 'einstaklingur' ? 'bg-[#1c2c6c] text-white shadow-md' : 'text-gray-500 hover:text-[#1c2c6c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">person</span> Einstaklingur
                </button>
                <button 
                  onClick={() => setSubscriptionType('hjon')}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 flex justify-center items-center gap-1 ${
                    subscriptionType === 'hjon' ? 'bg-[#1c2c6c] text-white shadow-md' : 'text-gray-500 hover:text-[#1c2c6c]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">group</span> Hjón / Par
                </button>
              </div>

              {/* Tier Selection */}
              <div className="space-y-3">
                
                {/* Silfur Option */}
                <button
                  onClick={() => setSelectedTier('silfur')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedTier === 'silfur' 
                      ? 'border-[#c8102e] bg-[#c8102e]/5' 
                      : 'border-gray-100 bg-gray-50 hover:border-[#c8102e]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedTier === 'silfur' ? 'bg-[#c8102e] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
                    </div>
                    <span className={`font-bold uppercase tracking-widest ${selectedTier === 'silfur' ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                      Silfurfélagi
                    </span>
                  </div>
                  <span className="font-black text-[#1c2c6c] text-lg">{pricingData.silfur[subscriptionType]}</span>
                </button>

                {/* Gull Option */}
                <button
                  onClick={() => setSelectedTier('gull')}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                    selectedTier === 'gull' 
                      ? 'border-[#c8102e] bg-[#c8102e]/5' 
                      : 'border-gray-100 bg-gray-50 hover:border-[#c8102e]/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedTier === 'gull' ? 'bg-[#c8102e] text-white' : 'bg-gray-200 text-gray-500'}`}>
                      <span className="material-symbols-outlined text-[18px] text-yellow-400">workspace_premium</span>
                    </div>
                    <span className={`font-bold uppercase tracking-widest ${selectedTier === 'gull' ? 'text-[#c8102e]' : 'text-[#1c2c6c]'}`}>
                      Gullfélagi
                    </span>
                  </div>
                  <span className="font-black text-[#1c2c6c] text-lg">{pricingData.gull[subscriptionType]}</span>
                </button>

              </div>

              {/* Seamless Payment Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={handlePayment}
                  className="w-full h-[54px] bg-black text-white rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-900 transition-colors shadow-md"
                >
                  <svg className="w-[18px] h-[18px] fill-current mb-[2px]" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.3zM250.8 110.3c15.2-18.4 25.3-43.9 22.5-69.5-20.2 1-45.9 13.9-61.8 32.4-13.4 15.6-25.2 41.6-21.7 66.4 22.4 1.7 46.9-10.9 61-29.3z"/>
                  </svg>
                  <span className="text-[20px] font-semibold tracking-tight">Pay</span>
                </button>

                <button 
                  onClick={handlePayment}
                  className="w-full h-[54px] bg-white text-gray-800 border border-gray-300 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm font-semibold"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-[18px]">Pay</span>
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-20 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-[#c8102e] rounded-full animate-spin"></div>
              <p className="font-bold text-[#1c2c6c] animate-pulse uppercase tracking-widest text-sm">Staðfesti greiðslu...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center text-center space-y-4 py-6">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-2 shadow-lg scale-in-center">
                <span className="material-symbols-outlined text-5xl">check</span>
              </div>
              <h3 className="font-black text-3xl italic text-[#1c2c6c] uppercase tracking-tighter">Áskrift staðfest!</h3>
              <p className="text-gray-500 text-sm max-w-[280px]">Kortið þitt er klárt. Takk fyrir að styðja við bakið á Haukum.</p>
              
              <div className="bg-[#c8102e] p-6 rounded-2xl w-full flex flex-col items-center justify-center my-4 text-white shadow-xl relative overflow-hidden border border-[#a30d25]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
                <span className={`material-symbols-outlined text-5xl mb-2 ${selectedTier === 'gull' ? 'text-yellow-400' : 'text-gray-200'}`}>workspace_premium</span>
                <p className={`font-black text-xl uppercase tracking-widest ${selectedTier === 'gull' ? 'text-yellow-400' : 'text-white'}`}>
                  {selectedTier === 'gull' ? 'Gullfélagi' : 'Silfurfélagi'}
                </p>
                <p className="text-xs opacity-90 mt-2 font-medium">Skoðaðu Apple Wallet eða Google Pay.</p>
              </div>

              <button 
                onClick={resetAndClose}
                className="w-full bg-[#1c2c6c] text-white rounded-xl py-4 font-bold uppercase tracking-widest hover:bg-black transition-colors shadow-md"
              >
                Klára
              </button>
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  );
}