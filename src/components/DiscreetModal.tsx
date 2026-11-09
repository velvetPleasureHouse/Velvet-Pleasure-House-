import React from 'react';
import { X, ShieldCheck, Box, UserCheck, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DiscreetModal: React.FC = () => {
  const { isDiscreetModalOpen, setIsDiscreetModalOpen } = useStore();

  if (!isDiscreetModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-[#261B22] border border-[#742D40] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#742D40]/40 bg-[#1F151B]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#D89C91]" />
            <div>
              <h2 className="font-serif text-xl text-[#F2E9DE]">The Velvet Discretion Pledge</h2>
              <p className="text-xs text-[#D89C91]">Our 100% Confidential Delivery & Privacy Policy in Nigeria</p>
            </div>
          </div>

          <button
            onClick={() => setIsDiscreetModalOpen(false)}
            className="p-1.5 rounded-full text-[#F2E9DE]/70 hover:text-[#F2E9DE] hover:bg-[#742D40]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[80vh] text-xs sm:text-sm text-[#F2E9DE]/85 leading-relaxed">
          <p className="text-sm font-serif italic text-[#D89C91]">
            &ldquo;We believe intimate wellness should never be accompanied by awkwardness, curiosity from third parties, or societal judgment. Here is exactly what happens when you place an order with Velvet Pleasure House.&rdquo;
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#D89C91] font-semibold">
                <Box className="w-4 h-4" />
                <span>1. Plain, Unbranded Box</span>
              </div>
              <p className="text-xs text-[#F2E9DE]/70 leading-relaxed">
                Your parcel arrives inside a standard unprinted brown cardboard box or sealed opaque poly mailer bag. There are zero words like &ldquo;sex&rdquo;, &ldquo;lingerie&rdquo;, or &ldquo;pleasure&rdquo; anywhere on the exterior.
              </p>
            </div>

            <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#D89C91] font-semibold">
                <UserCheck className="w-4 h-4" />
                <span>2. Courier Has No Clue</span>
              </div>
              <p className="text-xs text-[#F2E9DE]/70 leading-relaxed">
                Dispatch riders in Lagos, Abuja, and nationwide inter-state courier agents only see a sealed package with your contact phone number and delivery location. They have no knowledge of the contents.
              </p>
            </div>

            <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#D89C91] font-semibold">
                <CreditCard className="w-4 h-4" />
                <span>3. Discreet Bank Transfer</span>
              </div>
              <p className="text-xs text-[#F2E9DE]/70 leading-relaxed">
                Because orders are finalized via direct bank transfer or WhatsApp settlement, your bank transaction description lists a neutral business trading name—not an adult store descriptor.
              </p>
            </div>

            <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
              <div className="flex items-center gap-2 text-[#D89C91] font-semibold">
                <Lock className="w-4 h-4" />
                <span>4. Sealed & Tamper-Evident</span>
              </div>
              <p className="text-xs text-[#F2E9DE]/70 leading-relaxed">
                All intimate devices and wellness products are factory-sealed in hygienic protective film before being enclosed in our secondary protective layer for complete peace of mind.
              </p>
            </div>

          </div>

          <div className="bg-[#742D40]/20 border border-[#742D40]/40 p-4 rounded-xl space-y-2">
            <h4 className="font-semibold text-[#D89C91] text-xs uppercase tracking-wider">Pickup & Delivery Flexibility</h4>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              Prefer not to have it delivered to your home or office address? No problem. When finalizing your WhatsApp order, you can request delivery to a trusted dispatch pickup station or arrange for a meet-up at a neutral landmark in your city.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#1C1419] border-t border-[#742D40]/30 flex justify-end">
          <button
            onClick={() => setIsDiscreetModalOpen(false)}
            className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-5 py-2.5 rounded-lg border border-[#D89C91]/30"
          >
            I Understand — Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
