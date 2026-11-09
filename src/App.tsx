import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { WellnessView } from './views/WellnessView';
import { ShopView } from './views/ShopView';
import { ConciergeView } from './views/ConciergeView';
import { LearnView } from './views/LearnView';
import { AboutView } from './views/AboutView';
import { ContactFAQView } from './views/ContactFAQView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { StoreSettingsModal } from './components/StoreSettingsModal';
import { DiscreetModal } from './components/DiscreetModal';
import { DeploymentGuideModal } from './components/DeploymentGuideModal';
import { AgeGateModal } from './components/AgeGateModal';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    selectedProduct, 
    setSelectedProduct 
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#261B22] text-[#F2E9DE]">
      {/* 18+ Age Gate & Discretion Consent */}
      <AgeGateModal />

      {/* Main Luxury Navigation Header */}
      <Navbar />

      {/* Main Body View */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'wellness' && <WellnessView />}
        {activeTab === 'shop' && <ShopView />}
        {activeTab === 'concierge' && <ConciergeView />}
        {activeTab === 'learn' && <LearnView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'contact' && <ContactFAQView />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <CartDrawer />
      <StoreSettingsModal />
      <DiscreetModal />
      <DeploymentGuideModal />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
