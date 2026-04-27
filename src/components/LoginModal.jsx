import React, { useState } from 'react';
import { auth } from '../lib/firebase';
import { signInWithCustomToken } from 'firebase/auth';

export default function LoginModal({ isOpen, onClose }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 7) {
      setErrorMsg('Vinsamlegast sláðu inn gilt símanúmer');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      // 1. Call the serverless handshake function
      // Note: In production, this URL would point to your deployed Firebase Function
      // We'll simulate the endpoint for local development if the emulator isn't running
      const response = await fetch('http://127.0.0.1:5001/haukar-web/us-central1/authenticateWithDokobit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      if (!response.ok) {
        throw new Error('Auðkenning mistókst. Vinsamlegast reynið aftur.');
      }

      const data = await response.json();

      // 2. Log in to Firebase using the Custom Token from the backend
      await signInWithCustomToken(auth, data.customToken);
      
      setStatus('success');
      
      // Close modal after success
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setPhoneNumber('');
      }, 2000);

    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(err.message || 'Eitthvað fór úrskeiðis.');
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-end md:justify-center bg-black/50 backdrop-blur-sm overflow-hidden">
      <div className="bg-white rounded-t-[2.5rem] md:rounded-[2.5rem] shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto relative animate-in slide-in-from-bottom-12 md:zoom-in-95 duration-200 flex flex-col">
        
        {/* Mobile Drag Indicator */}
        <div className="md:hidden w-full flex justify-center pt-4 pb-2 absolute top-0 z-30">
          <div className="w-12 h-1.5 bg-white/40 rounded-full"></div>
        </div>
        {/* Header */}
        <div className="bg-[#c8102e] p-6 text-center relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <span className="material-icons">close</span>
          </button>
          <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-inner mb-4">
            <span className="font-bold text-[#c8102e] text-2xl">H</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Haukar í Horni</h2>
          <p className="text-white/80 text-sm mt-1">Innskráning á aðdáendasvæði</p>
        </div>

        {/* Body */}
        <div className="p-8">
          {status === 'idle' || status === 'error' ? (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Símanúmer
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <span className="text-gray-500 font-medium">+354</span>
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="123 4567"
                    className="w-full pl-16 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c8102e] focus:border-transparent outline-none transition-all font-medium text-lg"
                    maxLength={7}
                  />
                </div>
                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium mt-2">{errorMsg}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-3 bg-[#111827] text-white rounded-lg py-4 px-6 font-bold hover:bg-black transition-colors shadow-lg"
              >
                <span className="material-icons text-white/80">fingerprint</span>
                <span>Innskráning með Rafrænum Skilríkjum</span>
              </button>
              <p className="text-center text-xs text-gray-500 mt-4">
                Með því að skrá þig inn samþykkir þú skilmála Hauka um meðferð persónuupplýsinga.
              </p>
            </form>
          ) : status === 'loading' ? (
            <div className="flex flex-col items-center justify-center py-8 space-y-6">
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-[#c8102e] rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="material-icons text-[#c8102e]">smartphone</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Beðið eftir staðfestingu</h3>
                <p className="text-gray-500">Vinsamlegast staðfestu innskráningu í símanum þínum.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <span className="material-icons text-green-600 text-4xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Innskráning tókst!</h3>
              <p className="text-gray-500">Velkomin(n) aftur í Hauka í Horni.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
