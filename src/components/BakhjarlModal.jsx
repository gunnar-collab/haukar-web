import { useState } from 'react';

export default function BakhjarlModal({ isOpen, onClose }) {
  const [selectedTier, setSelectedTier] = useState('einstaklingur');
  const [step, setStep] = useState('select'); // 'select' | 'processing' | 'success'

  if (!isOpen) return null;

  const tiers = [
    { id: 'einstaklingur', name: 'Einstaklingur', price: '2.500 kr. / mán', icon: 'person' },
    { id: 'fjolskylda', name: 'Fjölskylda', price: '5.000 kr. / mán', icon: 'group' },
    { id: 'gull', name: 'Gullhaukur', price: '10.000 kr. / mán', icon: 'workspace_premium' }
  ];

  const handlePayment = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 1500);
  };

  const resetAndClose = () => {
    setStep('select');
    setSelectedTier('einstaklingur');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* FIXED: Header is now Haukar Red */}
        <div className="bg-[#c8102e] p-5 flex justify-between items-center text-white relative shadow-md">
          <h2 className="font-black text-xl italic tracking-widest uppercase drop-shadow-sm">Gerast Bakhjarl</h2>
          {/* FIXED: Changed hover to opacity so it doesn't vanish into the red background */}
          <button onClick={resetAndClose} className="hover:opacity-70 transition-opacity absolute right-4">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          {step === 'select' && (
            <div className="space-y-6">
              
              <div className="text-center mb-2">
                <p className="text-sm text-gray-500 font-medium">Styðjum framtíðina á Ásvöllum. Veldu þína leið til að vera með í liðinu.</p>
              </div>

              <div className="space-y-3">
                {tiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-200 ${
                      selectedTier === tier.id 
                        ? 'border-[#c8102e] bg-red-50 text-[#c8102e]' 
                        : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">{tier.icon}</span>
                      <span className={`font-bold ${selectedTier === tier.id ? 'text-[#1c2c6c]' : 'text-gray-700'}`}>
                        {tier.name}
                      </span>
                    </div>
                    <span className="font-black text-[#1c2c6c]">{tier.price}</span>
                  </button>
                ))}
              </div>

              {/* Seamless Payment Buttons */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                
                {/* FIXED: The Official, Native-Looking Apple Pay Button */}
                <button 
                  onClick={handlePayment}
                  className="w-full h-[54px] bg-black text-white rounded-full flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-colors shadow-md"
                >
                  <svg className="w-[18px] h-[18px] fill-current mb-[2px]" viewBox="0 0 384 512">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.3zM250.8 110.3c15.2-18.4 25.3-43.9 22.5-69.5-20.2 1-45.9 13.9-61.8 32.4-13.4 15.6-25.2 41.6-21.7 66.4 22.4 1.7 46.9-10.9 61-29.3z"/>
                  </svg>
                  <span className="text-[20px] font-semibold tracking-tight">Pay</span>
                </button>

                {/* Google Pay Button (Height matched to Apple Pay) */}
                <button 
                  onClick={handlePayment}
                  className="w-full h-[54px] bg-white text-gray-800 border border-gray-300 rounded-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm font-semibold"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" className="w-5 h-5" />
                  <span className="text-[18px]">Pay</span>
                </button>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center space-y-6">
              <div className="w-16 h-16 border-4 border-gray-100 border-t-[#c8102e] rounded-full animate-spin"></div>
              <p className="font-bold text-gray-500 animate-pulse uppercase tracking-widest text-sm">Staðfesti greiðslu...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center text-center space-y-4 py-4">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
                <span className="material-symbols-outlined text-5xl">check</span>
              </div>
              <h3 className="font-black text-3xl italic text-[#1c2c6c] uppercase tracking-tighter">Velkominn í hópinn!</h3>
              <p className="text-gray-500 text-sm max-w-[250px]">Takk fyrir stuðninginn. Þitt framlag skiptir sköpum fyrir starfið.</p>
              
              <div className="bg-gradient-to-br from-[#c8102e] to-[#1c2c6c] p-6 rounded-2xl w-full flex flex-col items-center justify-center my-4 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-10 translate-x-10"></div>
                <span className="material-symbols-outlined text-5xl mb-2 text-yellow-400">workspace_premium</span>
                <p className="font-black text-xl uppercase tracking-widest text-yellow-400">
                  {tiers.find(t => t.id === selectedTier)?.name}
                </p>
                <p className="text-xs opacity-90 mt-2 font-medium">Nafnið þitt birtist núna á Veggnum!</p>
              </div>

              <button 
                onClick={resetAndClose}
                className="w-full bg-[#1c2c6c] text-white rounded-xl py-4 font-bold uppercase tracking-widest hover:bg-blue-900 transition-colors mt-2 shadow-lg"
              >
                Halda áfram
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}