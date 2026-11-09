import React from 'react';
import { ShieldCheck, HeartHandshake, EyeOff } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AgeGateModal: React.FC = () => {
  const { ageVerified, setAgeVerified } = useStore();

  if (ageVerified) return null;

  const handleAccept = () => {
    setAgeVerified(true);
  };

  const handleDecline = () => {
    window.location.replace('https://www.google.com');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#160E14]/95 backdrop-blur-xl flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#261B22] border border-[#742D40] rounded-2xl p-6 sm:p-8 text-center shadow-2xl space-y-6">
        
        {/* Crest / Emblem */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#742D40]/30 border border-[#D89C91]/40 flex items-center justify-center text-[#D89C91]">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#D89C91] font-semibold">
            Age Verification & Discretion
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">
            Velvet Pleasure House
          </h2>
          <p className="text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed pt-2">
            Welcome to a judgment-free space centred on intimacy, pleasure, and body-safe wellness. Our online store features products intended for adults aged 18 and older.
          </p>
        </div>

        <div className="bg-[#1C1419] p-3.5 rounded-xl border border-[#742D40]/30 text-xs text-[#F2E9DE]/70 space-y-1 text-left">
          <p className="font-semibold text-[#D89C91] flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4" />
            Our Discretion Promise
          </p>
          <p className="text-[11px] leading-relaxed">
            All orders across Nigeria are dispatched in unmarked, plain packaging with neutral payment descriptions.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={handleAccept}
            className="w-full bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] font-semibold text-sm py-3 px-6 rounded-xl transition-all border border-[#D89C91]/40 shadow-lg"
          >
            I am 18 or older — Enter Store
          </button>

          <button
            onClick={handleDecline}
            className="w-full bg-transparent hover:bg-[#1C1419] text-[#F2E9DE]/60 hover:text-[#F2E9DE] text-xs py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <EyeOff className="w-3.5 h-3.5" />
            <span>I am under 18 — Exit to Google</span>
          </button>
        </div>

        <p className="text-[10px] text-[#F2E9DE]/40">
          By entering, you confirm you are at least 18 years of age and agree to our terms of discrete service.
        </p>
      </div>
    </div>
  );
};
