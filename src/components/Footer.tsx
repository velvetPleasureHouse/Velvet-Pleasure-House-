import React from 'react';
import { 
  ShieldCheck, 
  MessageCircle, 
  Heart, 
  BookOpen, 
  Sliders, 
  Sparkles,
  Lock,
  ArrowUp
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { 
    setActiveTab, 
    setSelectedCategory, 
    setIsOwnerModalOpen, 
    setIsDiscreetModalOpen,
    setIsDeploymentGuideOpen,
    settings 
  } = useStore();

  const handleNav = (tab: string, category: string = 'all') => {
    setSelectedCategory(category);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#170E14] text-[#F2E9DE] border-t border-[#742D40]/40 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="cursor-pointer" onClick={() => handleNav('home')}>
              <span className="text-xl font-serif tracking-[0.2em] font-semibold uppercase text-[#F2E9DE] block">
                Velvet Pleasure House
              </span>
              <span className="text-[11px] tracking-[0.25em] uppercase text-[#D89C91] font-light">
                Explore your sexuality without the awkwardness
              </span>
            </div>

            <p className="text-xs text-[#F2E9DE]/70 leading-relaxed max-w-sm font-light">
              Nigeria&rsquo;s online intimate-wellness and pleasure-products store. Curated body-safe sex toys, fine lingerie, organic lubricants, and shame-free intimacy education with 100% confidential courier delivery.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#D89C91]">
              <ShieldCheck className="w-4 h-4 text-[#D89C91]" />
              <span>Discreet, unbranded courier packaging nationwide</span>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-2.5 px-4 rounded-lg shadow transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-black/10" />
                <span>WhatsApp: {settings.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">
              Explore & Understand
            </h4>
            <ul className="space-y-2 text-xs text-[#F2E9DE]/75">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#D89C91] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('wellness')} className="hover:text-[#D89C91] transition-colors font-medium text-[#D89C91]">
                  Intimate Wellness Hub
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'all')} className="hover:text-[#D89C91] transition-colors">
                  Shop Pleasure Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('concierge')} className="hover:text-[#25D366] transition-colors flex items-center gap-1">
                  <span>The Velvet Concierge</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('learn')} className="hover:text-[#D89C91] transition-colors">
                  The Pleasure Guide
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#D89C91] transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#D89C91] transition-colors">
                  Contact & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#F2E9DE]/75">
              <li>
                <button onClick={() => handleNav('shop', 'lingerie')} className="hover:text-[#D89C91] transition-colors">
                  Lingerie
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'toys')} className="hover:text-[#D89C91] transition-colors">
                  Sex Toys
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'lubricants')} className="hover:text-[#D89C91] transition-colors">
                  Lubricants
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'intimate-care')} className="hover:text-[#D89C91] transition-colors">
                  Intimate Care
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Store Admin */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">
              Discretion & Tools
            </h4>
            <ul className="space-y-2 text-xs text-[#F2E9DE]/75">
              <li>
                <button 
                  onClick={() => setIsDiscreetModalOpen(true)}
                  className="hover:text-[#D89C91] transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D89C91]" />
                  <span>Packaging Promise</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsDeploymentGuideOpen(true)}
                  className="hover:text-[#D89C91] transition-colors flex items-center gap-1.5 text-[#D89C91]"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Publishing & Hosting Guide</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsOwnerModalOpen(true)}
                  className="hover:text-[#D89C91] transition-colors flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#D89C91]" />
                  <span>Store Owner Settings</span>
                </button>
              </li>
              <li className="pt-2 text-[11px] text-[#F2E9DE]/50 leading-normal">
                Discreet delivery across Lagos, Abuja, Port Harcourt, Ibadan, and all 36 Nigerian states.
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#742D40]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F2E9DE]/60">
          <p>© {new Date().getFullYear()} Velvet Pleasure House. All rights reserved. Intimate wellness for adults 18+.</p>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-[#D89C91]">
              Prices in Nigerian Naira (₦)
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#20151C] hover:bg-[#742D40] text-[#F2E9DE] transition-colors"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
