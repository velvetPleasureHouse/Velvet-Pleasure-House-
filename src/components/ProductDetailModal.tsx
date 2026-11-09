import React, { useState } from 'react';
import { 
  X, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  AlertCircle,
  Package,
  Layers,
  Info
} from 'lucide-react';
import { Product } from '../types';
import { formatNaira, generateProductWhatsAppUrl } from '../utils/whatsapp';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { settings, addToCart, setIsCartOpen } = useStore();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'safety' | 'delivery'>('description');
  const [copiedNote, setCopiedNote] = useState(false);

  const { url: whatsappUrl, message: whatsappMessage } = generateProductWhatsAppUrl(
    product,
    quantity,
    settings.whatsappNumber
  );

  const handleLaunchWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddToBag = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
    onClose();
  };

  const copyMessagePreview = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-4xl bg-[#261B22] border border-[#742D40] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Close */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#742D40]/40 bg-[#1F151B]">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-[#D89C91] font-medium">
              {product.category.replace('-', ' ')}
            </span>
            <span className="text-xs text-[#F2E9DE]/40">•</span>
            <span className="text-xs text-[#F2E9DE]/60">Ref: {product.id}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#F2E9DE]/70 hover:text-[#F2E9DE] hover:bg-[#742D40]/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[#1E151B] border border-[#742D40]/50 shadow-inner">
                <img
                  src={product.images[selectedImageIdx] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#742D40] text-[#F2E9DE] text-xs uppercase font-semibold px-3 py-1 rounded shadow-md border border-[#D89C91]/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails if multiple */}
              {product.images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImageIdx === idx
                          ? 'border-[#D89C91] scale-105'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Discreet Reassurance Callout */}
              <div className="bg-[#1C1419] rounded-xl p-4 border border-[#742D40]/40 flex items-start gap-3 text-xs text-[#F2E9DE]/80">
                <ShieldCheck className="w-5 h-5 text-[#D89C91] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#F2E9DE] mb-0.5">100% Confidential Nigerian Courier</h4>
                  <p className="leading-relaxed text-[#F2E9DE]/70">
                    Packed inside a plain brown shipping carton. No intimates description or store logos on the courier airway bill.
                  </p>
                </div>
              </div>
            </div>

            {/* Info & Ordering Column */}
            <div className="flex flex-col space-y-5">
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE] leading-snug">
                  {product.name}
                </h1>
                <div className="flex items-baseline gap-3 mt-3">
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#D89C91]">
                    {formatNaira(product.price)}
                  </span>
                  <span className="text-xs text-[#F2E9DE]/50">Nigerian Naira (₦)</span>
                  {product.inStock && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-emerald-400 font-medium bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Available for Dispatch
                    </span>
                  )}
                </div>
              </div>

              {/* Materials summary */}
              <div className="text-xs bg-[#742D40]/20 border border-[#742D40]/40 rounded-lg p-3 text-[#F2E9DE]/80">
                <span className="text-[#D89C91] font-semibold">Materials & Safety: </span>
                {product.materials}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 py-2 border-y border-[#742D40]/30">
                <span className="text-xs uppercase tracking-wider text-[#F2E9DE]/70 font-medium">Quantity:</span>
                <div className="flex items-center border border-[#742D40] rounded-lg overflow-hidden bg-[#1E151B]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 text-sm hover:bg-[#742D40]/50 text-[#F2E9DE] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-semibold text-[#F2E9DE] min-w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 py-1.5 text-sm hover:bg-[#742D40]/50 text-[#F2E9DE] transition-colors"
                  >
                    +
                  </button>
                </div>
                <div className="text-xs text-[#F2E9DE]/60 ml-auto">
                  Subtotal: <strong className="text-[#F2E9DE]">{formatNaira(product.price * quantity)}</strong>
                </div>
              </div>

              {/* Primary Actions */}
              <div className="space-y-3 pt-1">
                {/* ORDER VIA WHATSAPP Button */}
                <button
                  onClick={handleLaunchWhatsApp}
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl transition-all shadow-lg active:scale-98"
                >
                  <MessageCircle className="w-5 h-5 fill-black/10" />
                  <span>ORDER VIA WHATSAPP</span>
                </button>

                {/* Add to Discreet Bag Button */}
                <button
                  onClick={handleAddToBag}
                  className="w-full flex items-center justify-center gap-2 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] font-semibold text-sm py-3 px-6 rounded-xl transition-all border border-[#D89C91]/30"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D89C91]" />
                  <span>Add to Discreet Bag</span>
                </button>

                <p className="text-[11px] text-center text-[#F2E9DE]/60">
                  Clicking WhatsApp will open a prewritten message with this product & quantity.
                  <br />Payment details and delivery confirmation are completed directly on WhatsApp.
                </p>
              </div>

              {/* Live WhatsApp Message Preview Toggle */}
              <div className="bg-[#1C1419] rounded-lg p-3 text-xs border border-[#742D40]/30 space-y-2">
                <div className="flex items-center justify-between text-[#D89C91] font-medium">
                  <span className="flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Preview WhatsApp Message:
                  </span>
                  <button 
                    onClick={copyMessagePreview}
                    className="text-[10px] text-[#F2E9DE]/70 hover:text-[#F2E9DE] underline"
                  >
                    {copiedNote ? 'Copied!' : 'Copy text'}
                  </button>
                </div>
                <pre className="text-[11px] font-mono text-[#F2E9DE]/80 bg-[#150F14] p-2.5 rounded whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
                  {whatsappMessage}
                </pre>
              </div>

            </div>
          </div>

          {/* In-depth Tabs: Description / Specs / Safety / Delivery */}
          <div className="pt-6 border-t border-[#742D40]/40">
            <div className="flex flex-wrap gap-2 border-b border-[#742D40]/30 pb-3">
              {[
                { id: 'description', label: 'Full Description', icon: Info },
                { id: 'specifications', label: 'Specifications', icon: Layers },
                { id: 'safety', label: 'Safety & Hygiene', icon: ShieldCheck },
                { id: 'delivery', label: 'Packaging & Delivery', icon: Truck },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-1.5 text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#742D40] text-[#F2E9DE]'
                        : 'text-[#F2E9DE]/70 hover:text-[#D89C91] hover:bg-[#742D40]/20'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#D89C91]" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 text-xs sm:text-sm text-[#F2E9DE]/85 leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-3">
                  <p className="leading-relaxed">{product.description}</p>
                  {product.compatibility && (
                    <div className="p-3 rounded-lg bg-[#742D40]/20 border border-[#742D40]/40 mt-3">
                      <strong className="text-[#D89C91]">Compatibility Note: </strong>
                      {product.compatibility}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="divide-y divide-[#742D40]/30">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="py-2.5 flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="text-[#D89C91] font-medium">{key}</span>
                      <span className="text-[#F2E9DE]">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'safety' && (
                <div className="space-y-3 bg-[#1F151B] p-4 rounded-xl border border-[#742D40]/40">
                  <div className="flex items-center gap-2 text-[#D89C91] font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Intimate Hygiene & Body-Safe Usage Protocol</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#F2E9DE]/80">
                    {product.safetyAndCare}
                  </p>
                  <p className="text-[11px] text-[#F2E9DE]/60 italic">
                    Note: Velvet Pleasure House provides wellness lifestyle products for adult enjoyment and comfort. These products are not intended to diagnose, treat, cure or prevent medical conditions.
                  </p>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-3 bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30 text-xs leading-relaxed">
                  <h4 className="font-semibold text-[#D89C91] text-sm">Discreet Packaging Guarantee in Nigeria</h4>
                  <ul className="space-y-2 list-disc list-inside text-[#F2E9DE]/80">
                    <li><strong>No Intimate Markings:</strong> Your order arrives in a standard cardboard parcel or opaque flyer. The courier rider has zero knowledge of the contents.</li>
                    <li><strong>Sender Identifier:</strong> The dispatch slip does not say &ldquo;Velvet Pleasure House&rdquo; or mention intimate products.</li>
                    <li><strong>Lagos & Abuja:</strong> Same-day or next-day express delivery available via trusted private dispatch riders.</li>
                    <li><strong>Nationwide:</strong> Interstate courier delivery across all 36 Nigerian states to your doorstep or local hub pickup.</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="px-6 py-3 bg-[#1C1419] border-t border-[#742D40]/30 flex flex-wrap items-center justify-between text-[11px] text-[#F2E9DE]/60 gap-2">
          <span>WhatsApp ordering hotline configured: <strong className="text-[#D89C91]">{settings.whatsappNumber}</strong></span>
          <button 
            onClick={onClose}
            className="text-[#D89C91] hover:underline"
          >
            Back to catalogue
          </button>
        </div>
      </div>
    </div>
  );
};
