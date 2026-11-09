import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Filter, 
  ArrowUpDown, 
  Sparkles, 
  Sliders, 
  ShieldCheck,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { ProductCategory } from '../types';

export const ShopView: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    setIsOwnerModalOpen 
  } = useStore();

  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(8);

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Collections' },
    { id: 'lingerie', label: 'Lingerie' },
    { id: 'toys', label: 'Sex Toys' },
    { id: 'lubricants', label: 'Lubricants' },
    { id: 'intimate-care', label: 'Intimate Care' },
  ];

  // Reset pagination when category, search, or sort changes
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setVisibleCount(8);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(8);
  };

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          (p.badge && p.badge.toLowerCase().includes(q))
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else {
      // featured
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Header & Tagline */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D89C91] font-medium">
          Velvet Pleasure Products Catalogue
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE]">
          Curated For Intimacy & Confidence
        </h1>
        <p className="text-xs sm:text-sm text-[#F2E9DE]/75 leading-relaxed font-light">
          Browse our four core categories. Every order is delivered nationwide in plain, unmarked packaging and ordered seamlessly through WhatsApp.
        </p>
      </div>

      {/* Demonstration notice & Owner settings shortcut */}
      <div className="bg-[#1F151B] border border-[#742D40]/40 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F2E9DE]/80">
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <Sparkles className="w-4 h-4 text-[#D89C91] shrink-0" />
          <span>
            <strong className="text-[#D89C91]">Demonstration Catalogue:</strong> Sample products and prices in Nigerian Naira (₦). Store owners can customize, add, or edit items anytime.
          </span>
        </div>

        <button
          onClick={() => setIsOwnerModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-[#742D40]/60 hover:bg-[#742D40] text-[#F2E9DE] px-3 py-1.5 rounded-lg border border-[#D89C91]/30 shrink-0 font-medium transition-colors"
        >
          <Sliders className="w-3.5 h-3.5 text-[#D89C91]" />
          <span>Manage Catalogue</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#261B22] border border-[#742D40]/40 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#742D40]/30">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`text-xs uppercase tracking-wider px-4 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#742D40] text-[#F2E9DE] shadow-md border border-[#D89C91]/40'
                  : 'bg-[#1C1419] text-[#F2E9DE]/70 hover:text-[#D89C91] hover:bg-[#1C1419]/80 border border-transparent'
              }`}
            >
              {cat.label}
              {cat.id !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-70">
                  ({products.filter(p => p.category === cat.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#D89C91] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search toys, silk, water-based lube..."
              className="w-full bg-[#1C1419] border border-[#742D40]/50 rounded-xl pl-9 pr-9 py-2.5 text-xs text-[#F2E9DE] placeholder:text-[#F2E9DE]/40 focus:border-[#D89C91] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F2E9DE]/50 hover:text-[#F2E9DE]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end text-xs text-[#F2E9DE]/70">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#D89C91]" />
            <span className="shrink-0">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setVisibleCount(8);
              }}
              className="bg-[#1C1419] border border-[#742D40]/50 rounded-lg px-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

      </div>

      {/* Results Count & Active Filters */}
      <div className="flex items-center justify-between text-xs text-[#F2E9DE]/60 px-1">
        <span>
          Showing <strong>{Math.min(visibleCount, filteredProducts.length)}</strong> of <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'all' && ` in ${selectedCategory.replace('-', ' ')}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </span>

        {(selectedCategory !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              handleCategorySelect('all');
              handleSearchChange('');
            }}
            className="text-[#D89C91] hover:underline"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-[#1F151B] border border-[#742D40]/40 rounded-2xl p-12 text-center space-y-4">
          <ShoppingBag className="w-12 h-12 text-[#742D40]/60 mx-auto" />
          <h3 className="font-serif text-xl text-[#F2E9DE]">No products found</h3>
          <p className="text-xs text-[#F2E9DE]/60 max-w-sm mx-auto">
            We couldn't find any items matching your selected criteria. Try adjusting your search term or view all categories.
          </p>
          <button
            onClick={() => {
              handleCategorySelect('all');
              handleSearchChange('');
            }}
            className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-4 py-2 rounded-lg"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Load More Button if category has many products */}
          {filteredProducts.length > visibleCount && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 border-t border-[#742D40]/30">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-6 py-3 rounded-xl border border-[#D89C91]/30 transition-all shadow-lg flex items-center gap-2"
              >
                <span>Load More Products</span>
                <span className="text-[11px] opacity-75">
                  ({Math.min(visibleCount, filteredProducts.length)} of {filteredProducts.length})
                </span>
              </button>
              <button
                onClick={() => setVisibleCount(filteredProducts.length)}
                className="text-xs text-[#D89C91] hover:text-[#F2E9DE] underline px-3 py-2"
              >
                Show All ({filteredProducts.length})
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
