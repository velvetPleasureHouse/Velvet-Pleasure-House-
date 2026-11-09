import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  Heart, 
  HelpCircle, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  ExternalLink,
  AlertCircle,
  Copy,
  Check
} from 'lucide-react';
import { CONCIERGE_TOPICS, CONCIERGE_DISCLAIMER } from '../data/wellnessContent';
import { useStore } from '../context/StoreContext';
import { sanitizePhoneNumber } from '../utils/whatsapp';

export const ConciergeView: React.FC = () => {
  const { settings, setActiveTab } = useStore();
  const [selectedTopicId, setSelectedTopicId] = useState<string>(CONCIERGE_TOPICS[0].id);
  const [customQuestion, setCustomQuestion] = useState<string>('');
  const [copiedNotice, setCopiedNotice] = useState(false);

  const activeTopic = CONCIERGE_TOPICS.find(t => t.id === selectedTopicId) || CONCIERGE_TOPICS[0];

  const cleanPhone = sanitizePhoneNumber(settings.whatsappNumber);

  const generateWhatsAppLink = (starterText: string, specificQuestion?: string) => {
    const fullText = [
      `*VELVET CONCIERGE — CONFIDENTIAL INQUIRY*`,
      ``,
      starterText,
      specificQuestion ? `Specific Question: "${specificQuestion}"` : '',
      ``,
      `I am seeking respectful, non-judgmental guidance and product education.`
    ].filter(Boolean).join('\n');

    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullText)}`;
  };

  const handleOpenWhatsApp = () => {
    const link = generateWhatsAppLink(activeTopic.starterPrompt, customQuestion);
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleCopyPrompt = () => {
    const fullText = `${activeTopic.starterPrompt} ${customQuestion ? `Question: ${customQuestion}` : ''}`;
    navigator.clipboard.writeText(fullText);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 animate-fadeIn">
      
      {/* 1. HERO HEADER */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 px-4 py-1.5 rounded-full text-xs text-[#25D366] backdrop-blur-sm">
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span className="tracking-widest uppercase font-semibold">Private & Non-Judgmental Guidance</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl text-[#F2E9DE] leading-tight">
          The Velvet Concierge
        </h1>

        <div className="bg-[#1C1419] border border-[#742D40] rounded-2xl p-6 sm:p-8 text-left space-y-3 shadow-xl">
          <p className="font-serif text-base sm:text-lg text-[#D89C91] leading-relaxed italic">
            &ldquo;Sometimes you have questions you don&rsquo;t know how to ask. Maybe you&rsquo;re exploring your sexuality, trying to understand your pleasure, navigating intimacy in a relationship or simply looking for guidance. The Velvet Concierge is a welcoming space where you can reach out, ask questions and have a respectful conversation without judgment or embarrassment.&rdquo;
          </p>
          <div className="flex items-center gap-2 text-xs text-[#F2E9DE]/60 pt-2 border-t border-[#742D40]/30">
            <ShieldCheck className="w-4 h-4 text-[#D89C91]" />
            <span>100% Confidential. All conversations are handled directly by trained, compassionate team members.</span>
          </div>
        </div>
      </div>

      {/* 2. SIX GUIDANCE AREAS */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#D89C91] font-semibold">Supportive Consultations</span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F2E9DE]">
            What You Can Discuss With The Concierge
          </h2>
          <p className="text-xs text-[#F2E9DE]/70 max-w-lg mx-auto">
            Select a topic to review sample inquiries or initiate a private conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CONCIERGE_TOPICS.map((topic) => {
            const isSelected = selectedTopicId === topic.id;
            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#2D1B26] border-[#D89C91] shadow-xl ring-1 ring-[#D89C91]/50'
                    : 'bg-[#1F151B] border-[#742D40]/40 hover:border-[#D89C91]/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base text-[#F2E9DE] font-medium">
                      {topic.title}
                    </h3>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#D89C91]"></span>
                    )}
                  </div>
                  <p className="text-xs text-[#F2E9DE]/70 leading-relaxed font-light">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-4 mt-2 border-t border-[#742D40]/30 text-[11px] text-[#D89C91] font-semibold flex items-center justify-between">
                  <span>{isSelected ? 'Selected Topic' : 'Select to Explore'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE CONVERSATION LAUNCHER */}
      <div className="bg-[#1C1419] border border-[#25D366]/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#742D40]/40 pb-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#25D366] font-semibold flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 fill-current" />
              Direct WhatsApp Concierge Starter
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F2E9DE] mt-1">
              Topic: {activeTopic.title}
            </h3>
          </div>

          <span className="text-xs text-[#F2E9DE]/60 bg-[#261B22] px-3 py-1.5 rounded-lg border border-[#742D40]/40">
            Number: <strong className="text-[#D89C91]">{settings.whatsappNumber}</strong>
          </span>
        </div>

        {/* Sample Questions to Click */}
        <div className="space-y-2.5">
          <label className="block text-xs uppercase tracking-wider text-[#D89C91] font-semibold">
            Common Inquiries for this topic (Click to insert):
          </label>
          <div className="flex flex-wrap gap-2">
            {activeTopic.sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setCustomQuestion(q)}
                className="text-left text-xs bg-[#261B22] hover:bg-[#742D40]/50 text-[#F2E9DE]/80 hover:text-[#F2E9DE] px-3 py-2 rounded-xl border border-[#742D40]/40 transition-colors"
              >
                &ldquo;{q}&rdquo;
              </button>
            ))}
          </div>
        </div>

        {/* Optional Custom Question Input */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-[#D89C91] font-semibold">
            Your Private Message or Specific Question:
          </label>
          <textarea
            rows={3}
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Type your question here or leave blank to start with a gentle introduction..."
            className="w-full bg-[#150F14] border border-[#742D40] rounded-xl p-3.5 text-xs text-[#F2E9DE] focus:border-[#25D366] focus:outline-none placeholder:text-[#F2E9DE]/40 leading-relaxed"
          />
        </div>

        {/* Launch Button & Secondary Action */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs sm:text-sm py-3.5 px-8 rounded-xl shadow-lg transition-all active:scale-95"
          >
            <MessageCircle className="w-5 h-5 fill-black/10" />
            <span>Launch Private WhatsApp Conversation</span>
          </button>

          <button
            onClick={handleCopyPrompt}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#261B22] hover:bg-[#742D40]/40 text-[#F2E9DE]/80 text-xs py-3.5 px-5 rounded-xl border border-[#742D40]/40 transition-colors"
          >
            {copiedNotice ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#D89C91]" />
                <span>Copy Message Text</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-[#F2E9DE]/50">
          Clicking will open WhatsApp with this discreet opening message. No judgment. No obligation to purchase.
        </p>
      </div>

      {/* 4. PRIVATE EMAIL FALLBACK */}
      <div className="bg-[#1F151B] border border-[#742D40]/40 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center gap-2 text-[#D89C91] text-xs font-semibold justify-center sm:justify-start">
            <Mail className="w-4 h-4" />
            <span>Prefer Formal Email?</span>
          </div>
          <h4 className="font-serif text-lg sm:text-xl text-[#F2E9DE]">
            Send a Private Confidential Email
          </h4>
          <p className="text-xs text-[#F2E9DE]/70 max-w-md">
            If you prefer writing in longer form or do not use WhatsApp, our concierge email inbox is reviewed exclusively by trained female staff.
          </p>
        </div>

        <a
          href={`mailto:${settings.businessEmail}?subject=Confidential%20Concierge%20Inquiry%20-%20Velvet%20Pleasure%20House`}
          className="bg-[#742D40] hover:bg-[#8e374f] text-[#F2E9DE] text-xs font-semibold px-6 py-3 rounded-xl border border-[#D89C91]/30 shrink-0 transition-colors"
        >
          Email: {settings.businessEmail}
        </a>
      </div>

      {/* 5. ETHICAL BOUNDARIES DISCLAIMER */}
      <div className="bg-[#160E14] border border-[#742D40]/50 rounded-2xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-[#D89C91] font-semibold text-xs uppercase tracking-wider">
          <AlertCircle className="w-4 h-4 text-[#D89C91]" />
          <span>Professional Boundaries & Medical Clarity</span>
        </div>
        <p className="text-xs text-[#F2E9DE]/80 leading-relaxed font-light">
          {CONCIERGE_DISCLAIMER}
        </p>
        <p className="text-[11px] text-[#F2E9DE]/60 italic pt-1">
          For clinical or psychological challenges, please consult a registered medical doctor or certified counselor.
        </p>
      </div>

    </div>
  );
};

function ChevronRight(props: any) {
  return (
    <svg 
      {...props} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
