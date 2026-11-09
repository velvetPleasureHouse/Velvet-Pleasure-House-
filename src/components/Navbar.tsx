import React, { useState } from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  ExternalLink, 
  Sliders, 
  Menu, 
  X, 
  HeartHandshake, 
  BookOpen, 
  Sparkles,
  PhoneCall,
  Search,
  EyeOff
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    cart, 
    setIsCartOpen, 
    setIsOwnerModalOpen, 
    setIsDiscreetModalOpen,
    setIsDeploymentGuideOpen,
    setSelectedCategory
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Discreet emergency exit function: immediately leaves page to safe search
  const handleQuickExit = () => {
    window.location.replace('https://www.google.com/search?q=weather+forecast+today');
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'wellness', label: 'Intimate Wellness' },
    { id: 'shop', label: 'Shop Products' },
    { id: 'concierge', label: 'Velvet Concierge' },
    { id: 'learn', label: 'The Pleasure Guide' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact & FAQ' },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#261B22]/95 backdrop-blur-md border-b border-[#742D40]/40 transition-colors">
      {/* Top Reassurance & Quick Exit Bar */}
      <div className="bg-[#1C1419] border-b border-[#742D40]/30 px-4 py-1.5 text-xs text-[#F2E9DE]/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 truncate">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D89C91] animate-pulse"></span>
            <span className="truncate">
              <strong className="text-[#D89C91]">100% Plain Packaging:</strong> Neutral brown boxes. Zero brand logos on external labels across Nigeria.
            </span>
            <button 
              onClick={() => setIsDiscreetModalOpen(true)}
              className="text-[#D89C91] hover:underline underline-offset-2 ml-1 hidden sm:inline"
            >
              How it works
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsDeploymentGuideOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-[#D89C91] hover:text-[#F2E9DE] transition-colors bg-[#742D40]/40 hover:bg-[#742D40]/70 px-2.5 py-0.5 rounded border border-[#D89C91]/30"
              title="Store Owner Hosting & Deployment Guide"
            >
              <BookOpen className="w-3 h-3 text-[#D89C91]" />
              <span>Owner Hosting Guide</span>
            </button>

            {/* Quick Exit Button for privacy */}
            <button
              onClick={handleQuickExit}
              className="inline-flex items-center gap-1 text-[11px] bg-[#742D40]/60 hover:bg-[#742D40] text-[#F2E9DE] px-2.5 py-0.5 rounded transition-all font-medium border border-[#D89C91]/30"
              title="Instantly exit to Google Weather for privacy"
            >
              <EyeOff className="w-3 h-3 text-[#D89C91]" />
              <span>Quick Exit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#F2E9DE] hover:text-[#D89C91] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Brand Identity / Logo */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left cursor-pointer" onClick={() => handleNavClick('home')}>
            <span className="text-xl sm:text-2xl font-serif tracking-[0.22em] text-[#F2E9DE] font-semibold uppercase hover:text-[#D89C91] transition-colors">
              Velvet Pleasure House
            </span>
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#D89C91] font-light">
              Explore your sexuality without the awkwardness
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-[12px] xl:text-[13px] tracking-wider uppercase transition-colors relative py-1 shrink-0 ${
                  activeTab === link.id
                    ? 'text-[#D89C91] font-semibold'
                    : 'text-[#F2E9DE]/80 hover:text-[#D89C91]'
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D89C91] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Owner / Store Settings Button */}
            <button
              onClick={() => setIsOwnerModalOpen(true)}
              className="text-[#F2E9DE]/70 hover:text-[#D89C91] p-2 rounded-full hover:bg-[#742D40]/30 transition-colors"
              title="Store Owner Settings (WhatsApp number & Product Management)"
              aria-label="Store Settings"
            >
              <Sliders className="w-5 h-5" />
            </button>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-[#742D40] hover:bg-[#742D40]/80 text-[#F2E9DE] px-3.5 py-2 rounded-md transition-all border border-[#D89C91]/30 hover:border-[#D89C91]"
              aria-label="View Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D89C91]" />
              <span className="text-xs font-medium uppercase tracking-wider hidden sm:inline">Discreet Bag</span>
              {totalCartCount > 0 && (
                <span className="bg-[#D89C91] text-[#261B22] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1E151B] border-b border-[#742D40] px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3 py-2.5 rounded text-sm tracking-wider uppercase font-medium transition-colors ${
                  activeTab === link.id
                    ? 'bg-[#742D40] text-[#F2E9DE]'
                    : 'text-[#F2E9DE]/90 hover:bg-[#742D40]/40 hover:text-[#D89C91]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-[#742D40]/40 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDiscreetModalOpen(true);
              }}
              className="flex items-center gap-2 text-xs text-[#D89C91] hover:text-[#F2E9DE] py-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>100% Discreet Packaging Policy</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsDeploymentGuideOpen(true);
              }}
              className="flex items-center gap-2 text-xs text-[#D89C91] hover:text-[#F2E9DE] py-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span>Publishing & Free Hosting Guide</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsOwnerModalOpen(true);
              }}
              className="flex items-center gap-2 text-xs text-[#F2E9DE]/80 hover:text-[#D89C91] py-1.5"
            >
              <Sliders className="w-4 h-4" />
              <span>Store Owner & Product Management</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
