import React from 'react';
import { 
  X, 
  HelpCircle, 
  CheckCircle, 
  DollarSign, 
  Smartphone, 
  ShieldAlert, 
  Globe, 
  Server, 
  Clock, 
  CreditCard 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const DeploymentGuideModal: React.FC = () => {
  const { isDeploymentGuideOpen, setIsDeploymentGuideOpen } = useStore();

  if (!isDeploymentGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#261B22] border border-[#742D40] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#742D40]/40 bg-[#1F151B]">
          <div className="flex items-center gap-2.5">
            <Server className="w-5 h-5 text-[#D89C91]" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl text-[#F2E9DE]">Store Owner Publishing & Hosting Guide</h2>
              <p className="text-[11px] text-[#D89C91]">Essential technical, hosting & policy truths before you launch</p>
            </div>
          </div>

          <button
            onClick={() => setIsDeploymentGuideOpen(false)}
            className="p-1.5 rounded-full text-[#F2E9DE]/70 hover:text-[#F2E9DE] hover:bg-[#742D40]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto text-xs sm:text-sm text-[#F2E9DE]/85 leading-relaxed">
          
          {/* Clarification 0: Website vs App */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-semibold text-[#D89C91] text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Is this an app, a web app, or a proper website?
            </h3>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              <strong>It is a proper website.</strong> Customers do not download or install an application from an app store. They simply tap or click a link in their browser (Chrome, Safari, Opera, Firefox) on Android phones, iPhones, tablets, or computers. It is engineered with modern responsive web standards so it automatically adapts smoothly to mobile phone screens and desktop monitors.
            </p>
          </div>

          {/* Question 1: Can this website be published for free? */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-semibold text-[#D89C91] text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              1. Can this website be published and hosted for free?
            </h3>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              <strong>YES.</strong> This website is built as a lightweight, modern web application (React + Vite + Tailwind CSS + Node.js). It can be published completely free of charge on leading hosting platforms such as <strong>Vercel, Cloud Run (via Google AI Studio / Google Cloud Free Tier), Netlify, or GitHub Pages</strong>.
            </p>
          </div>

          {/* Question 2: Is hosting free forever or does it have limits? */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-semibold text-[#D89C91] text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              2. Do free hosting tiers expire or have usage limits?
            </h3>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              Free tiers on Vercel and Netlify <strong>do not expire</strong> as long as you remain within their generous free monthly allowance (typically 100 GB of bandwidth and millions of requests per month). For an online store processing hundreds or thousands of visitors, the free tier is usually more than sufficient.
            </p>
          </div>

          {/* Question 3: Is a custom domain optional or paid? */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-semibold text-[#D89C91] text-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D89C91]" />
              3. Is a custom domain (e.g., velvetpleasurehouse.com or .ng) free or paid?
            </h3>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              • <strong>Free option:</strong> The hosting provider grants you a free web address like <code>velvetpleasurehouse.vercel.app</code> at zero cost.<br />
              • <strong>Paid custom domain:</strong> If you want your own professional address (e.g. <code>velvetpleasurehouse.com</code> or <code>.com.ng</code>), custom domains are purchased from domain registrars (such as Namecheap, Whogohost, or Google Domains) for approximately ₦3,500 – ₦18,000 per year. Connecting the custom domain to the website is 100% free.
            </p>
          </div>

          {/* Question 4: Can the website be edited from a mobile phone? */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-semibold text-[#D89C91] text-sm flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              4. Can the store owner edit products and prices from a mobile phone?
            </h3>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              <strong>YES.</strong> We engineered a mobile-first <strong>Store Management Panel</strong> directly inside this application. Simply tap the &ldquo;Store Settings&rdquo; icon in the navigation bar to update your WhatsApp phone number, change product prices in Naira, edit descriptions, toggle stock availability, or add brand new items directly on your smartphone without coding.
            </p>
          </div>

          {/* Question 5: Adult Novelty & Platform Policies */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-rose-900/40 space-y-2">
            <h3 className="font-semibold text-rose-300 text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              5. Are any product categories prohibited by hosting providers or payment gateways?
            </h3>
            <div className="text-xs text-[#F2E9DE]/80 space-y-2 leading-relaxed">
              <p>
                <strong>Web Hosting:</strong> Static web hosts like Vercel and Netlify allow sexual wellness and lifestyle e-commerce provided the imagery is tasteful lifestyle product photography (as used here) and not explicit pornography or non-consensual content.
              </p>
              <p>
                <strong>Payment Gateways (Crucial in Nigeria):</strong> Traditional credit card payment gateways (e.g. Stripe, Paystack, Flutterwave) have strict Terms of Service that classify &ldquo;adult novelties & intimate devices&rdquo; as restricted or prohibited high-risk categories, frequently shutting down merchant accounts.
              </p>
              <p className="bg-[#261B22] p-2.5 rounded border border-[#742D40] text-[#D89C91]">
                <strong>Why the WhatsApp + Direct Bank Transfer Model is the Industry Standard:</strong> In Nigeria, successful intimate wellness brands operate via the exact model built here: customers curate their order on the website, click &ldquo;Order via WhatsApp&rdquo;, and complete the transaction privately with direct bank transfer. This avoids payment gateway account freezes, ensures 100% discretion, and builds personal customer trust.
              </p>
            </div>
          </div>

          {/* Question 6: Will future features require payment? */}
          <div className="bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-semibold text-[#D89C91] text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#D89C91]" />
              6. Will any future features require payment?
            </h3>
            <p className="text-xs text-[#F2E9DE]/80 leading-relaxed">
              The core website runs 100% free with zero monthly software subscriptions. Future optional upgrades that might incur modest costs include: a dedicated custom domain (annual fee), or third-party automated SMS order dispatch notifications if you ever choose to automate shipping status updates.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#1C1419] border-t border-[#742D40]/30 flex justify-end">
          <button
            onClick={() => setIsDeploymentGuideOpen(false)}
            className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-5 py-2.5 rounded-lg border border-[#D89C91]/30"
          >
            Got It — Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
