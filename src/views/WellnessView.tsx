import React, { useState } from 'react';
import { 
  Heart, 
  Sparkles, 
  BookOpen, 
  MessageCircle, 
  ShieldCheck, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Lightbulb, 
  HelpCircle, 
  Compass, 
  UserCheck, 
  Users, 
  Flame,
  Search,
  AlertCircle
} from 'lucide-react';
import { WELLNESS_GUIDES, WellnessGuide, CONCIERGE_DISCLAIMER } from '../data/wellnessContent';
import { useStore } from '../context/StoreContext';

export const WellnessView: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();
  const [selectedGuide, setSelectedGuide] = useState<WellnessGuide | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All Guidance' },
    { id: 'self-discovery', label: 'Sexuality & Desires' },
    { id: 'body-pleasure', label: 'Pleasure & Body' },
    { id: 'communication', label: 'Communication & Consent' },
    { id: 'single-couple', label: 'Singles & Couples' },
    { id: 'life-stages', label: 'Life Stages & Hormones' },
    { id: 'products-safety', label: 'Product Safety' },
  ];

  const filteredGuides = WELLNESS_GUIDES.filter((guide) => {
    const matchesCat = activeCategory === 'all' || guide.category === activeCategory;
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.keyInsights.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Dedicated Full Guide Reader
  if (selectedGuide) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 animate-fadeIn">
        {/* Back Button */}
        <button
          onClick={() => {
            setSelectedGuide(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D89C91] hover:text-[#F2E9DE] font-semibold transition-colors"
        >
          <ChevronRight className="w-4 h-4 rotate-180" />
          <span>Back to Intimate Wellness Hub</span>
        </button>

        {/* Guide Header */}
        <div className="space-y-4 border-b border-[#742D40]/40 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#D89C91]">
            <span className="uppercase font-semibold tracking-wider bg-[#742D40]/40 px-3 py-1 rounded-full border border-[#D89C91]/30">
              {selectedGuide.categoryLabel}
            </span>
            <span className="flex items-center gap-1 text-[#F2E9DE]/60">
              <Clock className="w-3.5 h-3.5" />
              {selectedGuide.readTime}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE] leading-tight">
            {selectedGuide.title}
          </h1>

          <p className="text-base sm:text-lg text-[#D89C91] font-light leading-relaxed">
            {selectedGuide.subtitle}
          </p>

          <p className="text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed font-light italic bg-[#1C1419] p-4 rounded-xl border border-[#742D40]/30">
            &ldquo;{selectedGuide.summary}&rdquo;
          </p>
        </div>

        {/* Key Insights Box */}
        <div className="bg-[#20151C] border border-[#742D40] rounded-2xl p-6 space-y-3 shadow-xl">
          <h3 className="font-serif text-lg text-[#D89C91] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Core Principles for Your Wellbeing
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm text-[#F2E9DE]/85">
            {selectedGuide.keyInsights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-3 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#D89C91] shrink-0 mt-0.5" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-sm sm:text-base text-[#F2E9DE]/85 leading-relaxed">
          {selectedGuide.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE] pt-2">
                {sec.heading}
              </h2>
              {sec.body.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed font-light">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Self-Reflection Prompts */}
        {selectedGuide.reflectionPrompts.length > 0 && (
          <div className="bg-[#1C1419] border border-[#D89C91]/30 rounded-2xl p-6 space-y-3">
            <h3 className="font-serif text-lg text-[#F2E9DE] flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#D89C91]" />
              Reflections for Self-Discovery
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#F2E9DE]/80">
              {selectedGuide.reflectionPrompts.map((prompt, idx) => (
                <li key={idx} className="flex items-start gap-2.5 italic">
                  <span className="text-[#D89C91] font-bold">•</span>
                  <span>{prompt}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Practical Step */}
        {selectedGuide.practicalSteps.length > 0 && (
          <div className="bg-[#2D1B26] border border-[#742D40] rounded-2xl p-6 space-y-3">
            <h3 className="font-serif text-lg text-[#D89C91] flex items-center gap-2">
              <Compass className="w-4 h-4" />
              Gentle Practice to Try This Week
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F2E9DE]/85">
              {selectedGuide.practicalSteps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Velvet Concierge CTA */}
        <div className="bg-[#1F151B] border border-[#25D366]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-wider text-[#25D366] font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
              <MessageCircle className="w-4 h-4 fill-current" />
              The Velvet Concierge
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-[#F2E9DE]">
              Have a confidential question about this topic?
            </h4>
            <p className="text-xs text-[#F2E9DE]/70 max-w-md">
              Connect privately with our supportive concierge team on WhatsApp without awkwardness or judgment.
            </p>
          </div>

          <button
            onClick={() => {
              setActiveTab('concierge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md shrink-0 active:scale-95"
          >
            Visit The Concierge
          </button>
        </div>

        {/* Medical and Therapy Boundaries Disclaimer */}
        <div className="bg-[#170E14] border border-[#742D40]/30 rounded-xl p-4 text-[11px] text-[#F2E9DE]/65 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 text-[#D89C91] font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Supportive Guidance & Educational Scope</span>
          </div>
          <p>{CONCIERGE_DISCLAIMER}</p>
        </div>
      </div>
    );
  }

  // Intimate Wellness Hub Page
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-fadeIn">
      
      {/* 1. HERO HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-[#742D40]/40 border border-[#D89C91]/30 px-4 py-1.5 rounded-full text-xs text-[#D89C91] backdrop-blur-sm">
          <Heart className="w-3.5 h-3.5 text-[#D89C91]" />
          <span className="tracking-widest uppercase font-semibold">The Intimate Wellness Sanctuary</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-[#F2E9DE] leading-tight">
          More than pleasure products. <br />
          <span className="italic text-[#D89C91] font-light">A space to explore, understand & embrace your intimate wellness.</span>
        </h1>

        <p className="text-sm sm:text-base text-[#F2E9DE]/80 leading-relaxed font-light pt-2">
          At Velvet Pleasure House, we believe sexual wellness is an essential pillar of human joy, bodily health, and emotional connection. Discover thoughtful guidance on pleasure, communication, confidence, and desire across every season of life.
        </p>

        {/* Quick Nav to Concierge & Shop */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => {
              setActiveTab('concierge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-3 px-6 rounded-xl shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-black/10" />
            <span>Connect with The Velvet Concierge</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] font-semibold text-xs py-3 px-6 rounded-xl border border-[#D89C91]/30 transition-all"
          >
            <span>Explore Curated Products</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D89C91]" />
          </button>
        </div>
      </div>

      {/* 2. THE THREE CONNECTED EXPERIENCES */}
      <div className="bg-[#1F151B] border border-[#742D40]/50 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Our Integrated Approach</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">Three Connected Experiences</h2>
          <p className="text-xs text-[#F2E9DE]/70">Everything you need for an unhurried, comfortable, and fulfilling intimate life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          
          {/* Pillar 1: Explore */}
          <div 
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-[#261B22] border border-[#742D40]/40 hover:border-[#D89C91] rounded-2xl p-6 space-y-3 cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#742D40]/30 border border-[#D89C91]/30 flex items-center justify-center text-[#D89C91]">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D89C91] block">Experience 01</span>
            <h3 className="font-serif text-xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors">
              1. Explore Products
            </h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Medical-grade silicone devices, sumptuous mulberry silk lingerie, pH-balanced lubricants, and nourishing intimate balms selected with anatomical precision.
            </p>
            <div className="pt-2 text-xs text-[#D89C91] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>View Product Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: Understand */}
          <div className="bg-[#2D1B26] border border-[#D89C91]/40 rounded-2xl p-6 space-y-3 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#742D40]/60 border border-[#D89C91]/50 flex items-center justify-center text-[#D89C91]">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#D89C91] block">Experience 02</span>
            <h3 className="font-serif text-xl text-[#F2E9DE]">
              2. Understand & Learn
            </h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Evidence-based education on human anatomy, pleasure pacing, responsive desire, overcoming body insecurity, and communicating needs with tenderness.
            </p>
            <div className="pt-2 text-xs text-[#D89C91] font-semibold flex items-center gap-1">
              <span>Explore Guidance Below</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: Connect */}
          <div 
            onClick={() => {
              setActiveTab('concierge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-[#261B22] border border-[#25D366]/30 hover:border-[#25D366] rounded-2xl p-6 space-y-3 cursor-pointer transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#25D366] block">Experience 03</span>
            <h3 className="font-serif text-xl text-[#F2E9DE] group-hover:text-[#25D366] transition-colors">
              3. Connect with Concierge
            </h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              A private, respectful, human space on WhatsApp where you can ask personal intimate-life questions and receive non-judgmental guidance.
            </p>
            <div className="pt-2 text-xs text-[#25D366] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              <span>Start Private Conversation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </div>

      {/* 3. VELVET CONCIERGE SPOTLIGHT */}
      <div className="bg-gradient-to-r from-[#20151C] via-[#2D1B26] to-[#20151C] border border-[#742D40] rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <span className="text-xs uppercase tracking-widest text-[#25D366] font-semibold flex items-center justify-center md:justify-start gap-1.5">
            <MessageCircle className="w-4 h-4 fill-current" />
            The Velvet Concierge
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">
            &ldquo;Sometimes you have questions you don&rsquo;t know how to ask.&rdquo;
          </h3>
          <p className="text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed font-light">
            Maybe you&rsquo;re exploring your sexuality, trying to understand your pleasure, navigating intimacy in a relationship or simply looking for guidance. The Velvet Concierge is a welcoming space where you can reach out, ask questions and have a respectful conversation without judgment or embarrassment.
          </p>
        </div>

        <button
          onClick={() => {
            setActiveTab('concierge');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-3.5 px-8 rounded-xl shadow-lg transition-all shrink-0 active:scale-95"
        >
          Open The Velvet Concierge
        </button>
      </div>

      {/* 4. GUIDANCE TOPICS BROWSER */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#742D40]/30 pb-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Guidance Library</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F2E9DE] mt-1">
              Thoughtful Intimacy & Wellness Guides
            </h2>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#D89C91] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, desires, pacing..."
              className="w-full bg-[#1C1419] border border-[#742D40]/40 rounded-xl pl-9 pr-3 py-2 text-xs text-[#F2E9DE] focus:border-[#D89C91] focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#742D40] text-[#F2E9DE] border border-[#D89C91]/40 shadow'
                  : 'bg-[#1C1419] text-[#F2E9DE]/70 hover:text-[#D89C91]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => {
                setSelectedGuide(guide);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group bg-[#2A1D26] border border-[#742D40]/40 hover:border-[#D89C91] rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] text-[#D89C91] uppercase tracking-wider font-semibold">
                  <span>{guide.categoryLabel}</span>
                  <span className="flex items-center gap-1 text-[#F2E9DE]/50 font-normal">
                    <Clock className="w-3 h-3" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors leading-snug">
                  {guide.title}
                </h3>

                <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light line-clamp-3">
                  {guide.summary}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-[#742D40]/30 flex items-center justify-between text-xs text-[#D89C91] font-semibold">
                <span>Read Full Guidance</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. ETHICAL BOUNDARIES & DISCLAIMER BANNER */}
      <div className="bg-[#1C1419] border border-[#742D40]/40 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#D89C91] font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Our Ethical Practice & Medical Boundaries</span>
        </div>
        <p className="text-xs text-[#F2E9DE]/80 leading-relaxed font-light">
          {CONCIERGE_DISCLAIMER}
        </p>
      </div>

    </div>
  );
};
