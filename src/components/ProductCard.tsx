import React from 'react';
import { MessageCircle, Eye, ShoppingBag, ShieldCheck, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatNaira, generateProductWhatsAppUrl } from '../utils/whatsapp';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, settings, setIsCartOpen } = useStore();

  const { url: whatsappUrl } = generateProductWhatsAppUrl(
    product,
    1,
    settings.whatsappNumber
  );

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddToBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group bg-[#2A1D26] rounded-xl overflow-hidden border border-[#742D40]/30 hover:border-[#D89C91]/60 transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#20161D]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay for subtle mood */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1D26] via-transparent to-transparent opacity-60"></div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="bg-[#742D40] text-[#F2E9DE] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-sm shadow-md border border-[#D89C91]/30">
              {product.badge}
            </span>
          )}
          {product.isDemonstration && (
            <span className="bg-[#1C1419]/80 backdrop-blur-sm text-[#D89C91] text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-sm border border-[#D89C91]/20">
              Demo Catalogue
            </span>
          )}
        </div>

        {/* Quick View Pill */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#261B22]/40 backdrop-blur-[2px]">
          <span className="inline-flex items-center gap-1.5 bg-[#F2E9DE] text-[#261B22] text-xs font-semibold px-4 py-2 rounded-full shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>View Full Details</span>
          </span>
        </div>
      </div>

      {/* Product Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Discretion tag */}
          <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-[#D89C91] mb-1.5 font-medium">
            <span>{product.category.replace('-', ' ')}</span>
            <span className="flex items-center gap-1 text-[10px] text-[#F2E9DE]/60 normal-case tracking-normal">
              <ShieldCheck className="w-3 h-3 text-[#D89C91]" />
              Discreet Box
            </span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg sm:text-xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Short Description */}
          <p className="text-[#F2E9DE]/75 text-xs sm:text-sm line-clamp-2 mt-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Actions */}
        <div className="pt-4 mt-4 border-t border-[#742D40]/30">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-xs text-[#F2E9DE]/60 block">Price (NGN)</span>
              <span className="text-xl sm:text-2xl font-serif font-bold text-[#F2E9DE]">
                {formatNaira(product.price)}
              </span>
            </div>
            {product.inStock ? (
              <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                In Stock
              </span>
            ) : (
              <span className="text-[11px] text-amber-400 font-medium">
                Batch Reserved
              </span>
            )}
          </div>

          {/* Buttons: WhatsApp Order & Bag */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-semibold text-xs py-2.5 px-2 rounded-md transition-all shadow-md active:scale-95"
              title="Order directly via WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-black/10" />
              <span className="truncate">Order via WhatsApp</span>
            </button>

            <button
              onClick={handleAddToBag}
              className="w-full flex items-center justify-center gap-1.5 bg-[#742D40] hover:bg-[#8d364e] text-[#F2E9DE] font-medium text-xs py-2.5 px-2 rounded-md transition-all border border-[#D89C91]/30 active:scale-95"
              title="Add to Discreet Shopping Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D89C91]" />
              <span className="truncate">Add to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
