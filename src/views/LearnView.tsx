import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  Sparkles, 
  Share2,
  Heart
} from 'lucide-react';
import { PLEASURE_GUIDE_ARTICLES } from '../data/articles';
import { Article } from '../types';
import { useStore } from '../context/StoreContext';

export const LearnView: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'all',
    'Lubricants',
    'Intimate Toys',
    'Materials & Safety',
    'Hygiene & Care',
    'Lingerie',
    'Safety & Compatibility',
    'Confidence & FAQs',
  ];

  const filteredArticles = PLEASURE_GUIDE_ARTICLES.filter((art) => {
    const matchesCat = filterCategory === 'all' || art.category === filterCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.keyPoints.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // If viewing a full article
  if (selectedArticle) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fadeIn">
        {/* Back navigation */}
        <button
          onClick={() => {
            setSelectedArticle(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#D89C91] hover:text-[#F2E9DE] font-semibold transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to The Pleasure Guide</span>
        </button>

        {/* Article Header */}
        <div className="space-y-4 border-b border-[#742D40]/40 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#D89C91]">
            <span className="uppercase font-semibold tracking-wider bg-[#742D40]/40 px-2.5 py-1 rounded">
              {selectedArticle.category}
            </span>
            <span className="flex items-center gap-1 text-[#F2E9DE]/60">
              <Clock className="w-3.5 h-3.5" />
              {selectedArticle.readingTime}
            </span>
            <span className="text-[#F2E9DE]/40">•</span>
            <span className="text-[#F2E9DE]/60">By {selectedArticle.author}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE] leading-tight">
            {selectedArticle.title}
          </h1>

          <p className="text-base sm:text-lg text-[#F2E9DE]/80 leading-relaxed font-light italic">
            &ldquo;{selectedArticle.summary}&rdquo;
          </p>
        </div>

        {/* Key Takeaways Box */}
        <div className="bg-[#1F151B] border border-[#742D40] rounded-2xl p-5 sm:p-6 space-y-3 shadow-xl">
          <h3 className="font-serif text-lg text-[#D89C91] flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Key Clinical & Lifestyle Takeaways
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#F2E9DE]/85">
            {selectedArticle.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#D89C91] shrink-0 mt-0.5" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Article Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-[#F2E9DE]/85 leading-relaxed">
          {selectedArticle.content.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE] pt-2">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Disclaimer & Citation */}
        <div className="bg-[#1C1419] border border-[#742D40]/30 rounded-xl p-4 text-xs text-[#F2E9DE]/65 space-y-1.5">
          <p className="font-semibold text-[#D89C91] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            Evidence-Based Wellness Disclaimer
          </p>
          <p className="leading-relaxed">
            Content is developed by Velvet Pleasure House and cross-referenced with {selectedArticle.reviewedBy}. This educational content is provided for informational and lifestyle pleasure purposes only and does not substitute professional gynecological or medical advice.
          </p>
        </div>

        {/* Explore Related Products CTA */}
        <div className="bg-[#2D1B26] border border-[#742D40] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h4 className="font-serif text-xl text-[#F2E9DE]">Ready to explore body-safe products?</h4>
            <p className="text-xs text-[#F2E9DE]/70">Browse vetted items matching the principles discussed in this guide.</p>
          </div>
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-6 py-3 rounded-xl border border-[#D89C91]/30 shrink-0"
          >
            Visit Online Store Catalogue
          </button>
        </div>
      </div>
    );
  }

  // Articles Hub Overview
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#D89C91] font-medium flex items-center justify-center gap-2">
          <BookOpen className="w-4 h-4" />
          The Pleasure Guide
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE]">
          Intimacy & Sexual Wellness, Explained
        </h1>
        <p className="text-xs sm:text-sm text-[#F2E9DE]/75 leading-relaxed font-light">
          Reliable, shame-free guidance on choosing lubricants, body-safe materials, toy hygiene, lingerie styling, and intimate confidence in Nigeria.
        </p>
      </div>

      {/* Search and Category Filters */}
      <div className="bg-[#261B22] border border-[#742D40]/40 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
        
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#D89C91] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides: lubricants, cleaning, sizing, pH..."
            className="w-full bg-[#1C1419] border border-[#742D40]/50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#F2E9DE] placeholder:text-[#F2E9DE]/40 focus:border-[#D89C91] focus:outline-none"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2 border-t border-[#742D40]/30">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-[#742D40] text-[#F2E9DE] border border-[#D89C91]/40'
                  : 'bg-[#1C1419] text-[#F2E9DE]/70 hover:text-[#D89C91]'
              }`}
            >
              {cat === 'all' ? 'All Guides' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => {
              setSelectedArticle(article);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group bg-[#2A1D26] border border-[#742D40]/40 hover:border-[#D89C91] rounded-2xl p-6 flex flex-col justify-between cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-[#D89C91] uppercase tracking-wider font-semibold">
                <span>{article.category}</span>
                <span className="flex items-center gap-1 text-[#F2E9DE]/50 font-normal">
                  <Clock className="w-3 h-3" />
                  {article.readingTime}
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl text-[#F2E9DE] group-hover:text-[#D89C91] transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-[#F2E9DE]/75 leading-relaxed line-clamp-3">
                {article.summary}
              </p>
            </div>

            <div className="pt-5 mt-5 border-t border-[#742D40]/30 flex items-center justify-between text-xs text-[#D89C91] font-semibold">
              <span>Read Full Guide</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Reassurance Banner */}
      <div className="bg-[#1C1419] border border-[#742D40]/30 rounded-2xl p-6 sm:p-8 text-center max-w-3xl mx-auto space-y-2">
        <Heart className="w-6 h-6 text-[#D89C91] mx-auto" />
        <h3 className="font-serif text-xl text-[#F2E9DE]">Intimacy Rooted in Knowledge</h3>
        <p className="text-xs text-[#F2E9DE]/70 leading-relaxed font-light">
          When people have accurate, respectful information about their bodies and sexual wellness, anxiety dissolves and authentic confidence begins. Have a topic you&rsquo;d like covered? Reach out to our concierge.
        </p>
      </div>

    </div>
  );
};
