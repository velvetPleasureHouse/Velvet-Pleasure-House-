import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Clock, 
  Instagram, 
  Twitter, 
  Send,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { generateGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

export const ContactFAQView: React.FC = () => {
  const { settings, setIsDiscreetModalOpen, setActiveTab } = useStore();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does ordering through WhatsApp work?',
      a: 'When browsing our online store catalogue, simply click "Order via WhatsApp" on any product or click "Checkout Bag via WhatsApp" from your discreet shopping bag. Your device will automatically open WhatsApp with a neatly pre-formatted message detailing the product name, price in Naira, reference SKU, and selected quantity. Our concierge will confirm availability, provide direct bank transfer account details, and arrange discrete dispatch to your address.'
    },
    {
      q: 'Will the dispatch rider know what is inside my parcel?',
      a: 'Never. All orders are packed inside plain, unmarked brown cardboard boxes or opaque security flyers with no logos, descriptions, or store identifiers. The delivery rider only sees your recipient name, phone number, and delivery city/area. They have no knowledge of the contents.'
    },
    {
      q: 'What payment methods do you accept in Nigeria?',
      a: 'We accept direct bank transfers (instant mobile app transfer/USSD) upon confirming your WhatsApp order with our concierge. This ensures 100% discretion on your bank account statement with a neutral trading name, avoiding high-risk third-party payment gateway restrictions.'
    },
    {
      q: 'How long does delivery take in Lagos, Abuja, and nationwide?',
      a: 'For Lagos: Same-day dispatch or next-day delivery via private dispatch riders. For Abuja: 24 to 48 hours. For all other Nigerian states: 2 to 4 business days via reliable interstate logistics partners with door-step delivery or local hub pickup.'
    },
    {
      q: 'Are your toys and intimate care products body-safe?',
      a: 'Yes, 100%. We categorically refuse to stock cheap PVC or porous jelly rubber products containing toxic phthalates. Every electronic device is made from certified non-porous medical-grade platinum silicone or body-safe ABS. Our lubricants and cleansers are gynecologist-informed, pH-balanced (pH 3.8 to 4.2), and free of harsh parabens and petrochemicals.'
    },
    {
      q: 'Can I ask private questions before deciding on a product?',
      a: 'Absolutely. That is the core purpose of Velvet Pleasure House! You can message our WhatsApp concierge anytime with questions regarding sizing, motor loudness, lubricant compatibility, or beginner recommendations. Our team answers with complete confidentiality, warmth, and zero judgment.'
    },
    {
      q: 'What is your return & hygiene policy?',
      a: 'Due to intimate hygiene and health safety regulations, adult intimate devices, opened lubricants, and worn lingerie cannot be returned once the tamper-evident sanitary seal has been unsealed. If a product arrives with a rare manufacturer defect, notify our WhatsApp concierge within 48 hours of delivery with photos/video for an immediate replacement.'
    }
  ];

  const quickInquiryTopics = [
    'Help me choose a beginner-friendly intimate toy',
    'Question regarding discreet delivery in my area',
    'Lingerie sizing assistance',
    'Lubricant compatibility advice'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">
          Confidential Concierge & FAQ
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE]">
          Here For You, Discreetly
        </h1>
        <p className="text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed font-light">
          Have an inquiry regarding an order, discrete delivery in your Nigerian state, or product selection? Connect with our confidential concierge.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* WhatsApp Direct Chat Card */}
        <div className="bg-[#1F151B] border border-[#25D366]/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 fill-current" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-[#F2E9DE]">WhatsApp Order & Concierge</h3>
              <p className="text-xs text-[#25D366] font-medium">Fast, non-judgmental assistance</p>
            </div>
          </div>

          <p className="text-xs text-[#F2E9DE]/75 leading-relaxed">
            Message us directly on WhatsApp to place orders, confirm bank transfer details, check stock, or ask private product questions.
          </p>

          {/* Quick prompt buttons */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] uppercase tracking-wider text-[#D89C91] font-semibold block">
              Quick Inquiries:
            </span>
            <div className="flex flex-col gap-1.5">
              {quickInquiryTopics.map((topic, i) => {
                const url = generateGeneralInquiryWhatsAppUrl(topic, settings.whatsappNumber);
                return (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-xs bg-[#261B22] hover:bg-[#742D40]/30 text-[#F2E9DE]/80 hover:text-[#D89C91] px-3 py-2 rounded-lg border border-[#742D40]/40 transition-colors flex items-center justify-between group"
                  >
                    <span>{topic}</span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-3 px-4 rounded-xl shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-black/10" />
              <span>Open WhatsApp Chat ({settings.whatsappNumber})</span>
            </a>
          </div>
        </div>

        {/* Email & Social Channels Card */}
        <div className="bg-[#1F151B] border border-[#742D40]/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#742D40]/30 text-[#D89C91] flex items-center justify-center shrink-0 border border-[#D89C91]/30">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl text-[#F2E9DE]">Business & Customer Inquiries</h3>
                <p className="text-xs text-[#D89C91]">Formal correspondence & press</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[#F2E9DE]/80 leading-relaxed">
              <p>
                For partnership proposals, order receipts, or detailed inquiries, you can reach our administrative team by email:
              </p>
              <div className="bg-[#150F14] p-3 rounded-lg border border-[#742D40]/30 font-mono text-[#D89C91]">
                {settings.businessEmail}
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#D89C91] font-semibold block">
                Connect on Social Channels:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#261B22] hover:bg-[#742D40]/30 text-[#F2E9DE] p-2.5 rounded-lg border border-[#742D40]/40 flex items-center gap-2 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#D89C91]" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#261B22] hover:bg-[#742D40]/30 text-[#F2E9DE] p-2.5 rounded-lg border border-[#742D40]/40 flex items-center gap-2 transition-colors"
                >
                  <Twitter className="w-4 h-4 text-[#D89C91]" />
                  <span>X (Twitter)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Operating hours */}
          <div className="pt-4 border-t border-[#742D40]/30 text-xs text-[#F2E9DE]/60 space-y-1">
            <div className="flex items-center gap-2 text-[#D89C91]">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-semibold">Concierge Operating Hours:</span>
            </div>
            <p>Monday – Saturday: 9:00 AM – 9:00 PM (West Africa Time, WAT)</p>
            <p>Sunday: 12:00 PM – 6:00 PM WAT</p>
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="space-y-6 pt-4">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl text-[#F2E9DE]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-[#F2E9DE]/70">
            Clear, honest answers about privacy, ordering, and delivery in Nigeria.
          </p>
        </div>

        <div className="divide-y divide-[#742D40]/30 border border-[#742D40]/40 rounded-2xl overflow-hidden bg-[#20151C] shadow-xl">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="transition-colors">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 hover:bg-[#261B22]/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-[#F2E9DE]">
                    {faq.q}
                  </span>
                  <span className="text-[#D89C91] shrink-0 p-1 rounded-full bg-[#742D40]/30">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-[#F2E9DE]/80 leading-relaxed border-t border-[#742D40]/20 bg-[#1A1217]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Velvet Concierge Quick Link */}
        <div className="bg-[#1C1419] border border-[#25D366]/40 rounded-2xl p-6 text-center space-y-3">
          <h4 className="font-serif text-xl text-[#F2E9DE]">Still have an intimate or personal question?</h4>
          <p className="text-xs text-[#F2E9DE]/70 max-w-md mx-auto">
            You don&rsquo;t have to guess or feel shy. The Velvet Concierge is available to have respectful, supportive conversations with you.
          </p>
          <button
            onClick={() => {
              setActiveTab('concierge');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 fill-black/10" />
            <span>Open The Velvet Concierge</span>
          </button>
        </div>
      </div>

    </div>
  );
};
