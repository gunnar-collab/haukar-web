import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button.jsx';

export default function TicketModal({ isOpen, onClose }) {
  const [ticketCount, setTicketCount] = useState(1);
  const [paymentStep, setPaymentStep] = useState('select'); 

  // Reset the modal automatically 300ms after closing so it's fresh for next time
  useEffect(() => {
    if (!isOpen) {
      const timeout = setTimeout(() => {
        setTicketCount(1);
        setPaymentStep('select');
      }, 300);
      document.body.style.overflow = 'unset';
      return () => clearTimeout(timeout);
    } else {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    // FIXED: Bumped to z-[9999] so it perfectly overlays the sticky z-[100] Navbar
    <div className="fixed inset-0 bg-[#1c2c6c]/90 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative animate-in fade-in zoom-in duration-300 flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-all z-20"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Premium Red Hero Header */}
        <div className="bg-gradient-to-br from-[#c8102e] to-[#9b0c23] p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 flex items-center justify-center">
            <span className="material-symbols-outlined text-[150px] text-white">sports_handball</span>
          </div>
          <span className="text-white/90 text-xs font-bold uppercase tracking-widest relative z-10 mb-2 block">Olís deild karla</span>
          <h3 className="text-4xl font-black italic tracking-tighter text-white uppercase relative z-10">
            Haukar <span className="text-[#1c2c6c] mx-2">-</span> Valur
          </h3>
          <div className="text-white/90 text-sm font-medium mt-4 relative z-10 flex flex-col gap-1 items-center">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">calendar_month</span> Fimmtudagur 16. apríl kl. 19:30</span>
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> Íþróttamiðstöðin Ásvöllum</span>
          </div>
        </div>

        {paymentStep === 'select' ? (
          <div className="p-8 flex flex-col gap-6 bg-gray-50">
            
            {/* Ticket Counter */}
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div>
                <p className="font-bold text-[#1c2c6c]">Almennur miði</p>
                <p className="text-xs text-gray-500">2.500 kr. pr. miða</p>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                  className="w-8 h-8 rounded-full bg-gray-100 text-[#1c2c6c] hover:bg-gray-200 flex items-center justify-center font-bold transition-colors"
                >-</button>
                <span className="font-black text-xl w-4 text-center">{ticketCount}</span>
                <button 
                  onClick={() => setTicketCount(ticketCount + 1)}
                  className="w-8 h-8 rounded-full bg-[#1c2c6c] text-white hover:bg-blue-900 flex items-center justify-center font-bold transition-colors"
                >+</button>
              </div>
            </div>

            <div className="pt-2">
              <div className="flex justify-between items-end mb-4 px-2">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">Samtals</span>
                <span className="text-2xl font-black text-[#1c2c6c]">{(ticketCount * 2500).toLocaleString('is-IS')} kr.</span>
              </div>

              {/* Native Apple & Google Pay Buttons */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setPaymentStep('qr')}
                  className="w-full bg-black text-white font-medium text-[20px] py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-800 transition-transform active:scale-95 shadow-md"
                >
                  <svg className="h-[22px] w-auto mb-1" viewBox="0 0 384 512" fill="currentColor">
                    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.3 48.6-.8 90.4-86.8 102.3-134.1-41.5-16.5-61.2-46.7-61.4-76.5zM256 109.1c11.9-15.3 21-38 18.5-59.8-19.3 1.5-44.8 14-57.9 29.5-11.4 13.5-22.1 36.4-19 57.5 21.6 2.3 44.9-10.7 58.4-27.2z"/>
                  </svg>
                  <span className="font-semibold tracking-tight">Pay</span>
                </button>

                <button 
                  onClick={() => setPaymentStep('qr')}
                  className="w-full bg-white border border-gray-300 text-[#3c4043] font-medium text-[19px] py-3.5 rounded-xl flex items-center justify-center gap-1.5 hover:bg-gray-50 transition-transform active:scale-95 shadow-sm"
                >
                  <svg className="h-[20px] w-auto" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                  </svg>
                  <span className="font-sans font-medium tracking-tight mt-[2px]">Pay</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          /* Success QR Code View */
          <div className="p-8 flex flex-col items-center justify-center gap-4 bg-gray-50 text-center animate-in slide-in-from-right-8 duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 shadow-inner">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <h4 className="text-2xl font-black text-[#1c2c6c] uppercase tracking-tighter">Miði Staðfestur!</h4>
            <p className="text-sm text-gray-500 mb-2">Sýndu þennan kóða við innganginn á Ásvöllum.</p>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
              <span className="material-symbols-outlined text-[140px] text-[#1c2c6c]">qr_code_2</span>
            </div>
            <p className="font-bold text-[#c8102e] mt-2 text-lg">{ticketCount}x Almennur miði</p>
            
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={onClose}
            >
              Loka glugga
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}