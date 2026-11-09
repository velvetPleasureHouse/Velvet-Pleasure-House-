import React from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatNaira, generateCartWhatsAppUrl } from '../utils/whatsapp';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    settings,
    setSelectedProduct
  } = useStore();

  if (!isCartOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const { url: whatsappUrl, message: whatsappMessage } = generateCartWhatsAppUrl(
    cart,
    settings.whatsappNumber
  );

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#261B22] border-l border-[#742D40] shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-[#742D40]/40 bg-[#1F151B] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D89C91]" />
              <h2 className="font-serif text-xl text-[#F2E9DE]">Your Discreet Bag</h2>
              <span className="bg-[#742D40] text-[#F2E9DE] text-xs font-semibold px-2 py-0.5 rounded-full">
                {totalCount}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#F2E9DE]/70 hover:text-[#F2E9DE] hover:bg-[#742D40]/50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Privacy reassurance badge */}
          <div className="bg-[#1C1419] px-4 py-2 border-b border-[#742D40]/30 flex items-center gap-2 text-xs text-[#F2E9DE]/80">
            <ShieldCheck className="w-4 h-4 text-[#D89C91] shrink-0" />
            <span>Combined into 1 single plain discreet delivery box.</span>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#742D40]/60" />
                <h3 className="font-serif text-lg text-[#F2E9DE]">Your bag is currently empty</h3>
                <p className="text-xs text-[#F2E9DE]/60 max-w-xs">
                  Discover curated lingerie, body-safe toys, and lubricants crafted for comfort and confidence.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 text-xs text-[#D89C91] hover:underline flex items-center gap-1 font-semibold"
                >
                  Explore Products <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-[#1E151B] border border-[#742D40]/40 rounded-xl p-3 flex gap-3.5 items-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-[#150F14] shrink-0 cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(item.product);
                      setIsCartOpen(false);
                    }}
                  />

                  <div className="flex-1 min-w-0">
                    <h4 
                      className="font-serif text-sm text-[#F2E9DE] truncate cursor-pointer hover:text-[#D89C91]"
                      onClick={() => {
                        setSelectedProduct(item.product);
                        setIsCartOpen(false);
                      }}
                    >
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-[#D89C91] font-semibold mt-0.5">
                      {formatNaira(item.product.price)}
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-[#742D40] rounded bg-[#150F14] text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 hover:bg-[#742D40]/50 text-[#F2E9DE]"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-[#F2E9DE] font-medium min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-0.5 hover:bg-[#742D40]/50 text-[#F2E9DE]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-[#F2E9DE]/40 hover:text-rose-400 ml-auto transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with WhatsApp Multi-item Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#742D40]/40 bg-[#1F151B] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#F2E9DE]/70">
                  <span>Items count:</span>
                  <span>{totalCount} items</span>
                </div>
                <div className="flex justify-between text-[#F2E9DE]/70">
                  <span>Packaging:</span>
                  <span className="text-[#D89C91]">Plain Discreet Box (Included)</span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-[#742D40]/30">
                  <span className="font-serif text-base text-[#F2E9DE]">Estimated Total:</span>
                  <span className="font-serif text-xl font-bold text-[#D89C91]">
                    {formatNaira(totalAmount)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-sm py-3.5 px-4 rounded-xl shadow-lg transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 fill-black/10" />
                <span>CHECKOUT BAG VIA WHATSAPP</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-[#F2E9DE]/50">
                <span>Sends entire item list to WhatsApp</span>
                <button
                  onClick={clearCart}
                  className="hover:text-rose-400 underline"
                >
                  Empty bag
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
