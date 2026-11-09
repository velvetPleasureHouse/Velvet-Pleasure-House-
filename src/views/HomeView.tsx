import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  MessageCircle, 
  BookOpen, 
  Heart, 
  CheckCircle2, 
  Lock, 
  Truck, 
  Star,
  Layers,
  ChevronRight,
  Compass,
  Lightbulb,
  Users
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { WELLNESS_GUIDES } from '../data/wellnessContent';
import { PLEASURE_GUIDE_ARTICLES } from '../data/articles';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

export const HomeView: React.FC = () => {
  const { 
    products, 
    setActiveTab, 
    setSelectedCategory, 
    settings, 
    setIsDiscreetModalOpen,
  } = useStore();

  // Prioritize products explicitly marked as featured by the store owner in the dashboard
  const explicitFeatured = products.filter((p) => p.isFeatured);
  const featuredProducts = explicitFeatured.length > 0 
    ? explicitFeatured 
    : products.filter((p) => p.badge === 'Bestseller' || p.badge === 'New Arrival' || p.isFeatured);

  const categories = [
    {
      id: 'lingerie',
      name: 'Lingerie',
      tagline: 'Mulberry silk, French lace & relaxed contouring',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=700&q=80',
      count: products.filter(p => p.category === 'lingerie').length
    },
    {
      id: 'toys',
      name: 'Sex Toys',
      tagline: 'Medical silicone & whisper-quiet frequencies (<42 dB)',
      image: 'https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=700&q=80',
      count: products.filter(p => p.category === 'toys').length
    },
    {
      id: 'lubricants',
      name: 'Lubricants',
      tagline: 'pH-balanced water, pure silicone & warming elixirs',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
      count: products.filter(p => p.category === 'lubricants').length
    },
    {
      id: 'intimate-care',
      name: 'Intimate Care',
      tagline: 'Prebiotic cleansers, recovery balms & device hygiene',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80',
      count: products.filter(p => p.category === 'intimate-care').length
    }
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const conciergeWhatsApp = generateGeneralInquiryWhatsAppUrl(
    'General Intimate Wellness & Consultation',
    settings.whatsappNumber
  );

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION: BALANCED WELLNESS & PLEASURE */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-[#742D40]/30 bg-gradient-to-b from-[#261B22] via-[#2F1E29] to-[#261B22]">
        
        {/* Subtle decorative background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#742D40]/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          
          {/* New Core Brand Positioning Message */}
          <div className="inline-flex items-center gap-2 bg-[#742D40]/40 border border-[#D89C91]/30 px-4 py-1.5 rounded-full text-xs sm:text-sm text-[#D89C91] mb-5 backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5" />
            <span className="tracking-widest uppercase font-semibold">
              More than pleasure products. A space to explore, understand & embrace your intimate wellness.
            </span>
          </div>

          {/* Major Editorial Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#F2E9DE] tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Explore your sexuality <br />
            <span className="italic text-[#D89C91] font-light">without the awkwardness.</span>
          </h1>

          {/* Welcoming Philosophy */}
          <p className="mt-6 text-sm sm:text-lg text-[#F2E9DE]/80 max-w-2xl mx-auto leading-relaxed font-light">
            Welcome to <strong className="font-semibold text-[#F2E9DE]">Velvet Pleasure House</strong>. We are a Nigerian intimate-wellness brand that encourages you to explore your desires, understand your body, build confidence, and have honest conversations about intimacy without judgment or shame.
          </p>

          {/* Balanced Action CTAs: Wellness, Products & Concierge */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-xl mx-auto">
            
            {/* Intimate Wellness Button */}
            <button
              onClick={() => {
                setActiveTab('wellness');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-xl border border-[#D89C91]/40 hover:scale-102 active:scale-98"
            >
              <Heart className="w-4 h-4 text-[#D89C91]" />
              <span>Intimate Wellness Hub</span>
            </button>

            {/* Shop Products Button */}
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveTab('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#1C1419]/90 hover:bg-[#1C1419] text-[#F2E9DE] font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all border border-[#742D40] hover:border-[#D89C91]/50"
            >
              <span>Shop Pleasure Products</span>
              <ArrowRight className="w-4 h-4 text-[#D89C91]" />
            </button>

            {/* Velvet Concierge Button */}
            <button
              onClick={() => {
                setActiveTab('concierge');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] font-semibold text-xs sm:text-sm py-3.5 px-5 rounded-xl transition-all border border-[#25D366]/40"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>The Velvet Concierge</span>
            </button>
          </div>

          {/* Trust & Discretion Highlights */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-[#742D40]/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#D89C91] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F2E9DE]">100% Plain Packaging</h4>
                <p className="text-[11px] text-[#F2E9DE]/65 mt-0.5">Neutral brown cartons across all 36 Nigerian states.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Heart className="w-5 h-5 text-[#D89C91] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F2E9DE]">Wellness First</h4>
                <p className="text-[11px] text-[#F2E9DE]/65 mt-0.5">Education on anatomy, pacing, and confidence.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MessageCircle className="w-5 h-5 text-[#D89C91] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F2E9DE]">The Velvet Concierge</h4>
                <p className="text-[11px] text-[#F2E9DE]/65 mt-0.5">Confidential WhatsApp advice with zero judgment.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Truck className="w-5 h-5 text-[#D89C91] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F2E9DE]">Lagos, Abuja & Beyond</h4>
                <p className="text-[11px] text-[#F2E9DE]/65 mt-0.5">Express same-day & discrete interstate delivery.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE THREE CONNECTED EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Brand Philosophy</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F2E9DE]">
            Three Connected Experiences
          </h2>
          <p className="text-xs sm:text-sm text-[#F2E9DE]/70 leading-relaxed font-light">
            Velvet Pleasure House harmonizes tactile products, honest education, and respectful personal guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. EXPLORE */}
          <div 
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-[#2A1D26] border border-[#742D40]/50 hover:border-[#D89C91] rounded-2xl p-6 sm:p-7 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-[#742D40]/30 border border-[#D89C91]/30 flex items-center justify-center text-[#D89C91]">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D89C91]">Pillar 01</span>
            <h3 className="font-serif text-2xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors">
              1. Explore
            </h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Carefully vetted body-safe pleasure devices, fine lingerie, pH-balanced lubricants, and intimate care created to honor your body.
            </p>
            <div className="pt-2 text-xs text-[#D89C91] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Shop Curated Store</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* 2. UNDERSTAND */}
          <div 
            onClick={() => {
              setActiveTab('wellness');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-[#2D1B26] border border-[#D89C91]/50 hover:border-[#D89C91] rounded-2xl p-6 sm:p-7 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-xl ring-1 ring-[#D89C91]/30"
          >
            <div className="w-12 h-12 rounded-xl bg-[#742D40]/60 border border-[#D89C91]/50 flex items-center justify-center text-[#D89C91]">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#D89C91]">Pillar 02</span>
            <h3 className="font-serif text-2xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors">
              2. Understand
            </h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Thoughtful guidance on anatomy, responsive desire, overcoming embarrassment, relationship communication, consent, and life-stage transitions.
            </p>
            <div className="pt-2 text-xs text-[#D89C91] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Explore Intimate Wellness</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* 3. CONNECT */}
          <div 
            onClick={() => {
              setActiveTab('concierge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-[#2A1D26] border border-[#25D366]/30 hover:border-[#25D366] rounded-2xl p-6 sm:p-7 space-y-3 cursor-pointer transition-all hover:-translate-y-1 shadow-xl"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#25D366]">Pillar 03</span>
            <h3 className="font-serif text-2xl text-[#F2E9DE] group-hover:text-[#25D366] transition-colors">
              3. Connect
            </h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Supportive, confidential one-on-one conversations through The Velvet Concierge on WhatsApp to ask questions without awkwardness.
            </p>
            <div className="pt-2 text-xs text-[#25D366] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Meet The Concierge</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. THE VELVET CONCIERGE BANNER (SUGGESTED INTRODUCTION) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#20151C] via-[#2E1A26] to-[#20151C] border border-[#742D40] rounded-3xl p-6 sm:p-12 shadow-2xl space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold flex items-center justify-center lg:justify-start gap-2">
                <MessageCircle className="w-4 h-4 fill-current" />
                The Velvet Concierge
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F2E9DE] leading-snug">
                &ldquo;Sometimes you have questions you don&rsquo;t know how to ask.&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed font-light">
                Maybe you&rsquo;re exploring your sexuality, trying to understand your pleasure, navigating intimacy in a relationship or simply looking for guidance. The Velvet Concierge is a welcoming space where you can reach out, ask questions and have a respectful conversation without judgment or embarrassment.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-[#D89C91]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  Pleasure & Sexuality
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  Intimacy & Relationships
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" />
                  Product Selection & Care
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => {
                  setActiveTab('concierge');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs sm:text-sm py-4 px-8 rounded-xl shadow-lg transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5 fill-black/10" />
                <span>Visit The Concierge</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('wellness');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto text-center text-xs text-[#F2E9DE]/70 hover:text-[#D89C91] py-2"
              >
                Read Intimate Guidance First
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTIMATE WELLNESS SPOTLIGHT (FEATURED GUIDES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#742D40]/30 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Understand & Grow</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F2E9DE] mt-1">
              Intimate Wellness & Education
            </h2>
            <p className="text-xs sm:text-sm text-[#F2E9DE]/70 mt-1">
              Grounded, mature conversations on pleasure, relationships, confidence, and bodily comfort.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('wellness');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-wider text-[#D89C91] hover:text-[#F2E9DE] font-semibold flex items-center gap-1 shrink-0"
          >
            <span>View All Wellness Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WELLNESS_GUIDES.slice(0, 3).map((guide) => (
            <div
              key={guide.id}
              onClick={() => {
                setActiveTab('wellness');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-[#2A1D26] border border-[#742D40]/40 hover:border-[#D89C91] rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                <span className="text-[10px] uppercase tracking-wider text-[#D89C91] font-semibold bg-[#742D40]/30 px-2.5 py-0.5 rounded">
                  {guide.categoryLabel}
                </span>

                <h3 className="font-serif text-xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#742D40]/30 flex items-center justify-between text-xs text-[#D89C91] font-semibold">
                <span>Read Topic</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRODUCT CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Explore The Store</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F2E9DE] mt-1.5">
            Four Paths to Intimate Pleasure
          </h2>
          <p className="text-xs sm:text-sm text-[#F2E9DE]/70 mt-2 font-light">
            Crafted with deep respect for body autonomy, comfort, and solo or couples exploration.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="group relative rounded-2xl overflow-hidden aspect-4/5 cursor-pointer border border-[#742D40]/40 hover:border-[#D89C91] transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#261B22] via-[#261B22]/60 to-transparent"></div>

              <div className="absolute inset-0 p-6 flex flex-col justify-end text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#D89C91] font-semibold mb-1">
                  {cat.count} Curated Products
                </span>
                <h3 className="font-serif text-2xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#F2E9DE]/70 mt-1 line-clamp-2 leading-relaxed font-light">
                  {cat.tagline}
                </p>

                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#D89C91] font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Explore Collection</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-baseline justify-between mb-8 pb-4 border-b border-[#742D40]/30 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Vetted Selections</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F2E9DE] mt-1">
              Featured Pleasure & Intimate Care
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs uppercase tracking-wider text-[#D89C91] hover:text-[#F2E9DE] font-semibold flex items-center gap-1"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. DISCREET NIGERIAN PACKAGING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#20151C] via-[#2D1B26] to-[#20151C] border border-[#742D40] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#D89C91] font-semibold flex items-center justify-center md:justify-start gap-2">
              <Lock className="w-3.5 h-3.5" />
              Private & Reassuring Nigerian Shopping
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">
              No awkward store visits. No curious courier questions.
            </h3>
            <p className="text-xs sm:text-sm text-[#F2E9DE]/75 max-w-xl leading-relaxed font-light">
              Every parcel is shipped in an unmarked, plain cardboard box. The delivery rider has zero knowledge of what is inside. Bank transactions reflect a neutral trading descriptor.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setIsDiscreetModalOpen(true)}
              className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-5 py-3 rounded-xl border border-[#D89C91]/30 transition-colors"
            >
              See Our Packaging Promise
            </button>

            <button
              onClick={() => {
                setActiveTab('concierge');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-black/10" />
              <span>Ask A Private Question</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
