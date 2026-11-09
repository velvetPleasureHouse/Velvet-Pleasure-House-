import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  BookOpen, 
  Lock, 
  Award,
  Smile,
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutView: React.FC = () => {
  const { setActiveTab } = useStore();

  const values = [
    {
      icon: Sparkles,
      title: 'Luxury Without Vulgarity',
      desc: 'Intimate products deserve the same artisanal aesthetics, high-grade materials, and editorial elegance as fine perfume, skincare, and luxury loungewear.'
    },
    {
      icon: Heart,
      title: 'Confidence Without Shame',
      desc: 'We unseat outdated cultural taboos that make people feel embarrassed for desiring pleasure, bodily comfort, or deeper connection with themselves and their partners.'
    },
    {
      icon: Lock,
      title: 'Absolute Privacy & Discretion',
      desc: 'From anonymous billing descriptions to plain cardboard courier packaging in Lagos and nationwide, we fiercely safeguard your confidentiality.'
    },
    {
      icon: Users,
      title: 'Warm Inclusivity',
      desc: 'While designed with deep respect and intuition for women’s bodies, we warmly invite men, singles, couples, and curious newcomers into the fold.'
    },
    {
      icon: Award,
      title: 'Medical-Grade Standards',
      desc: 'Zero toxic PVC, zero phthalates, zero low-grade market fillers. Every silicone toy and pH-balanced lubricant meets strict biocompatibility criteria.'
    },
    {
      icon: BookOpen,
      title: 'Education Before Sales',
      desc: 'We never pressure you into buying. Our Pleasure Guide exists so you understand your anatomy, material safety, and desires first.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-fadeIn">
      
      {/* Brand Hero Introduction */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-[0.25em] text-[#D89C91] font-semibold">
          About Velvet Pleasure House
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE] leading-tight">
          Intimacy without shame. <br />
          <span className="italic text-[#D89C91] font-light">Wellness without awkwardness.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#D89C91] font-serif italic pt-1">
          &ldquo;More than pleasure products. A space to explore, understand and embrace your intimate wellness.&rdquo;
        </p>
        <p className="text-sm sm:text-base text-[#F2E9DE]/80 leading-relaxed font-light pt-2">
          Velvet Pleasure House is a premier Nigerian online intimate-wellness and pleasure-products brand born out of a simple, overdue realization: the human desire for pleasure, intimacy, and self-discovery is natural, healthy, and beautiful.
        </p>
      </div>

      {/* Brand Story Editorial Section */}
      <div className="bg-[#20151C] border border-[#742D40] rounded-3xl p-6 sm:p-12 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#742D40]/15 rounded-full blur-3xl pointer-events-none"></div>

        <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">
          Our Founding Philosophy
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-[#F2E9DE]/85 leading-relaxed">
          <p>
            For too long, purchasing intimate products in Nigeria meant choosing between two extremes: sleazy, low-quality back-alley shops selling toxic plastic knock-offs, or furtive overseas deliveries fraught with anxiety and courier embarrassment. Women, in particular, were left without a refined, judgment-free space tailored to their needs.
          </p>
          <p>
            Velvet Pleasure House was founded to rewrite that story. We created a sanctuary that looks and feels like a welcoming intimate wellness apothecary and online store: luxurious, calm, respectful, and safe.
          </p>
          <p>
            Whether you are picking your very first silk babydoll, learning why water-based lube protects silicone, or introducing a couple’s vibrating ring into a long-term marriage, we meet you where you are—with warmth, discretion, and genuine care.
          </p>
        </div>

        <div className="pt-4 border-t border-[#742D40]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#D89C91] italic font-serif">
            &ldquo;Explore your sexuality without the awkwardness.&rdquo;
          </div>
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-5 py-2.5 rounded-xl border border-[#D89C91]/30 transition-colors"
          >
            <span>Explore The Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 6 Core Pillars */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">What Guides Us</span>
          <h2 className="font-serif text-3xl text-[#F2E9DE]">The Six Pillars of Velvet</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-[#2A1D26] border border-[#742D40]/40 rounded-2xl p-6 space-y-3 hover:border-[#D89C91] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#742D40]/30 border border-[#D89C91]/30 flex items-center justify-center text-[#D89C91]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg text-[#F2E9DE]">{v.title}</h3>
                <p className="text-xs text-[#F2E9DE]/75 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Three Connected Experiences */}
      <div className="bg-[#1F151B] border border-[#742D40] rounded-3xl p-6 sm:p-10 space-y-6 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">The Velvet Model</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">Three Connected Experiences</h2>
          <p className="text-xs text-[#F2E9DE]/75 font-light">
            We believe buying a product without understanding your pleasure is only half the journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-[#261B22] p-5 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-serif text-lg text-[#D89C91]">1. Explore</h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Premium pleasure products, lingerie, lubricants, and intimate care tested for body-safe biocompatibility.
            </p>
          </div>

          <div className="bg-[#261B22] p-5 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-serif text-lg text-[#D89C91]">2. Understand</h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Grounded, mature education about sexuality, desire, pacing, relationship communication, and body anatomy.
            </p>
          </div>

          <div className="bg-[#261B22] p-5 rounded-xl border border-[#742D40]/30 space-y-2">
            <h3 className="font-serif text-lg text-[#D89C91]">3. Connect</h3>
            <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
              Supportive, confidential, non-judgmental conversations with The Velvet Concierge on WhatsApp.
            </p>
          </div>
        </div>
      </div>

      {/* Our Discretion and Delivery Commitment in Nigeria */}
      <div className="bg-[#1C1419] border border-[#742D40]/40 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-[#D89C91] font-semibold text-sm">
          <ShieldCheck className="w-5 h-5" />
          <span>Our Discretion & Confidentiality Standards</span>
        </div>
        <p className="text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed font-light">
          We understand that discretion in Nigeria is paramount. Every order is packed inside a plain, unbranded shipping box or opaque poly flyer. No delivery rider, office receptionist, or family member can tell what is inside. Bank transactions reflect a neutral trading descriptor. Your contact information is never shared or added to unsolicited promotional broadcast lists.
        </p>
      </div>

      {/* Ethical Medical & Therapy Boundaries */}
      <div className="bg-[#170E14] border border-[#742D40]/50 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#D89C91] font-semibold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Ethical Practice & Professional Boundaries</span>
        </div>
        <p className="text-xs text-[#F2E9DE]/75 leading-relaxed font-light">
          Velvet Pleasure House provides sexual wellness education, general intimate-life guidance, and supportive lifestyle advice. We do NOT provide licensed psychotherapy, sex therapy, medical diagnosis, or clinical counseling. For persistent pelvic pain, physical infections, deep trauma, or complex psychological difficulties, we strongly encourage visitors to seek care from a registered medical doctor, gynecologist, or licensed counselor.
        </p>
      </div>

    </div>
  );
};
