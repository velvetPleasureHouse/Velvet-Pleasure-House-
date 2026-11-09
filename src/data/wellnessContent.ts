export interface WellnessGuide {
  id: string;
  category: 'self-discovery' | 'body-pleasure' | 'communication' | 'single-couple' | 'life-stages' | 'products-safety';
  categoryLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  readTime: string;
  keyInsights: string[];
  sections: {
    heading: string;
    body: string[];
  }[];
  reflectionPrompts: string[];
  practicalSteps: string[];
}

export interface ConciergeServiceTopic {
  id: string;
  title: string;
  description: string;
  sampleQuestions: string[];
  starterPrompt: string;
}

export const WELLNESS_GUIDES: WellnessGuide[] = [
  {
    id: 'understanding-desire-preferences',
    category: 'self-discovery',
    categoryLabel: 'Sexuality & Desires',
    title: 'Understanding Your Sexuality, Preferences & Authentic Desires',
    subtitle: 'Moving past cultural scripts to discover what truly resonates with your body and mind.',
    summary: 'Desire is not a fixed one-size-fits-all formula. Understanding spontaneous vs. responsive desire, sensory triggers, and personal fantasies without shame is the cornerstone of lifelong sexual wellness.',
    readTime: '6 min read',
    keyInsights: [
      'Over 80% of individuals experience responsive desire—where arousal builds through sensory context rather than striking out of nowhere.',
      'Cultural conditioning often teaches us to suppress curiosity. Acknowledging your desires is an act of self-care and authentic self-knowledge.',
      'Your preferences are dynamic and can evolve through different seasons of life, stress levels, and emotional connections.'
    ],
    sections: [
      {
        heading: 'The Myth of Instant Desire vs. The Dual-Control Model',
        body: [
          'In popular media, desire is portrayed as an electrical bolt that strikes spontaneously. In human biology, however, sexologists identify two primary models: spontaneous desire (feeling horny first, then seeking touch) and responsive desire (feeling neutral initially, but becoming deeply aroused once comfortable touch, warmth, or intimacy begins).',
          'Neither model is broken or inferior. Understanding whether your sexuality operates through responsive pacing removes enormous guilt and allows you to curate the emotional and physical environments where pleasure can naturally bloom.'
        ]
      },
      {
        heading: 'The Accelerators and The Brakes',
        body: [
          'Think of your sexual response like a car with both an accelerator (things that excite you: soft lighting, slow touch, visual beauty, emotional safety) and a brake (things that turn you off: exhaustion, clutter, unspoken relationship tension, fear of judgment, body anxiety).',
          'Often, cultivating pleasure isn\'t about pushing the accelerator harder; it is about gently lifting your foot off the brakes by cultivating comfort, safety, and self-acceptance.'
        ]
      }
    ],
    reflectionPrompts: [
      'What sensory conditions (scents, sounds, lighting, textures) help you feel most grounded and receptive in your body?',
      'Which messages about sexuality did you grow up with that you are ready to unlearn?'
    ],
    practicalSteps: [
      'Set aside 10 minutes of uninterrupted solo quiet time to focus on tactile comfort—like slipping into soft fabrics or applying comforting botanicals—without any pressure to perform.'
    ]
  },
  {
    id: 'pleasure-arousal-anatomy',
    category: 'body-pleasure',
    categoryLabel: 'Pleasure & The Body',
    title: 'Understanding Pleasure, Arousal & Your Body’s Unique Architecture',
    subtitle: 'The physiology of nervous systems, pelvic blood flow, and the multifaceted nature of orgasm.',
    summary: 'A deep-dive into the anatomy of pleasure. Why orgasms are not a mandatory scorecard, how tension affects sensitivity, and how to tune in to nuanced physical signals.',
    readTime: '7 min read',
    keyInsights: [
      'The external clitoris is only 10% of a vast 3D erectile structure with over 10,000 sensitive nerve endings wrapping around the pelvic floor.',
      'Arousal is mediated by the parasympathetic nervous system (the "rest and digest" state). Stress and pressure directly switch off lubrication and blood flow.',
      'Pleasure exists on a spectrum; deep relaxation and whole-body tingling are just as valid and restorative as peak climaxes.'
    ],
    sections: [
      {
        heading: 'Your Anatomy is Not a Broken Puzzle',
        body: [
          'Many people—especially women—worry that their bodies are "difficult" because they require specific pacing, continuous friction-free lubrication, or direct stimulation of external nerve endings to reach climax. Research consistently shows that only a minority of individuals climax from internal penetration alone.',
          'Your nervous system requires blood flow, relaxation, and gentle warmth. When you release the pressure of a ticking clock, your tissues become far more responsive.'
        ]
      },
      {
        heading: 'The Role of Mind-Body Congruence',
        body: [
          'Sometimes your body shows signs of arousal (such as lubrication or erection) without your mind feeling turned on; other times, your mind wants intimacy while your body is sluggish. This is called arousal non-congruence and is a completely normal physiological phenomenon.',
          'Checking in with yourself gently—"How does my body feel right now? What kind of touch feels comforting?"—fosters trust between your mind and your skin.'
        ]
      }
    ],
    reflectionPrompts: [
      'Do you approach intimacy with an "agenda" (climax or bust), or can you stay curious about whatever sensations arise?',
      'Where do you hold tension in your body when attempting to relax?'
    ],
    practicalSteps: [
      'Practice deep belly breathing for 2 minutes before intimacy. Slow diaphragmatic breathing stimulates the vagus nerve and relaxes pelvic floor muscles.'
    ]
  },
  {
    id: 'sexual-confidence-overcoming-embarrassment',
    category: 'self-discovery',
    categoryLabel: 'Confidence & Mindset',
    title: 'Sexual Confidence, Self-Awareness & Overcoming Embarrassment',
    subtitle: 'Reclaiming your natural birthright to pleasure without awkwardness, guilt, or comparison.',
    summary: 'How to silence internal self-criticism, celebrate your body exactly as it is, and build genuine, grounded sexual self-esteem.',
    readTime: '5 min read',
    keyInsights: [
      'Sexual confidence is not bravado or performance; it is the calm self-assurance of knowing what you like and having permission to voice it.',
      'Body shame thrives in silence. When you bring curiosity into conversations about intimacy, the awkwardness quickly evaporates.',
      'Every human body is asymmetrical, textured, and uniquely fragrant. True luxury is feeling at home in your own skin.'
    ],
    sections: [
      {
        heading: 'Shifting from Spectator to Experiencer',
        body: [
          'Psychologists term the habit of judging your body during intimacy as "spectatoring"—mentally hovering outside yourself worrying: "How do I look? Am I taking too long? Does my stomach look flat?"',
          'Spectatoring pulls blood and attention away from sensory nerve endings and sends it into anxious thought loops. To overcome it, deliberately shift attention to physical touch: the smoothness of silk, the warmth of breath, the glide of lubricant.'
        ]
      },
      {
        heading: 'Owning Your Curiosity Without Apology',
        body: [
          'Being curious about toys, lingerie, or fantasies does not make you vulgar or hyper-sexualized. It makes you a conscious adult investing in your overall wellbeing.',
          'At Velvet Pleasure House, our philosophy is simple: when you eliminate the awkwardness, intimacy becomes a joyful, grounded dimension of living well.'
        ]
      }
    ],
    reflectionPrompts: [
      'What would your intimate life feel like if you completely trusted that your desires are normal and worthy of respect?',
      'What is one thing about your body you can genuinely thank today?'
    ],
    practicalSteps: [
      'Look at yourself in a mirror while wearing something that feels soft and comforting. Practice offering yourself zero critiques for 60 seconds.'
    ]
  },
  {
    id: 'communicating-desires-partner',
    category: 'communication',
    categoryLabel: 'Relationships & Communication',
    title: 'Communicating Needs & Desires: How to Talk to a Partner Without Tension',
    subtitle: 'Practical scripts, timing strategies, and compassionate frameworks for open intimate dialogues.',
    summary: 'Talking about intimacy with a spouse or partner can feel daunting. Learn how to initiate non-threatening conversations, celebrate mutual desires, and eliminate defensive reactions.',
    readTime: '6 min read',
    keyInsights: [
      'Never have vulnerable intimate conversations in the heat of the bedroom or right after a disappointing encounter. Talk when both of you are relaxed, clothed, and calm.',
      'Use "I love when we..." and "I\'m curious about trying..." rather than "You never..." or "Why don\'t you...".',
      'Introducing wellness products or toys is an enhancement to connection, not a criticism of your partner\'s ability.'
    ],
    sections: [
      {
        heading: 'The Kitchen Table Conversation',
        body: [
          'The most successful intimate conversations happen over a casual cup of tea or during a relaxed evening walk. When clothes are on and there is zero expectation of immediate sex, defenses stay down.',
          'Frame your thoughts around shared curiosity: "I\'ve been reading about how different lubricants enhance sensation, and I’d love to explore what feels best for us," or "I love our connection, and I’m curious about introducing something playful into our bedroom."'
        ]
      },
      {
        heading: 'Reassuring Partner Insecurities',
        body: [
          'In many relationships, a partner might fear that talking about toys or fantasies means they are inadequate. Reassure them with warmth: "Nothing replaces your touch, warmth, and eye contact. An intimate device is like adding great music or candles—it’s an accessory to make what we share even more fun."'
        ]
      }
    ],
    reflectionPrompts: [
      'What is one intimate desire or curiosity you have hesitated to share with your partner?',
      'How does your partner best receive feedback (verbal affirmation, gentle touch, collaborative questions)?'
    ],
    practicalSteps: [
      'Try the "Curiosity Sandwich": Start with genuine appreciation ("I love how connected we feel when..."), share your curiosity ("I\'d love if we tried..."), and finish with affection.'
    ]
  },
  {
    id: 'boundaries-consent-respect',
    category: 'communication',
    categoryLabel: 'Boundaries & Consent',
    title: 'Boundaries, Consent & Mutual Respect in Intimate Relationships',
    subtitle: 'Why clear boundaries create the psychological safety needed for genuine, uninhibited pleasure.',
    summary: 'A deep look at enthusiastic consent, non-negotiable boundaries, how to say no without guilt, and how to receive a boundary with grace.',
    readTime: '5 min read',
    keyInsights: [
      'A true "Yes" is only possible when a "No" is received with total respect and zero punishment.',
      'Boundaries do not limit intimacy—they provide the fence within which trust and vulnerability can freely play.',
      'Check in periodically: consent is an ongoing conversation, not a lifetime contract.'
    ],
    sections: [
      {
        heading: 'Consent is Active, Not Merely the Absence of a No',
        body: [
          'True intimacy flourishes when both partners feel completely heard and physically safe. Enthusiastic consent means being present, attentive, and tuned in to verbal and non-verbal cues.',
          'If your partner seems tense, withdrawn, or merely enduring an act, pausing to check in—"How does this feel? Do you want to keep going or try something softer?"—builds immense emotional safety.'
        ]
      },
      {
        heading: 'The Power of Clean Boundaries',
        body: [
          'Saying "Not tonight, but I love holding you," or "I don\'t enjoy that particular sensation, let\'s try this instead" is not rejection; it is an act of honesty that keeps resentment from poisoning the relationship.'
        ]
      }
    ],
    reflectionPrompts: [
      'Do you ever say "yes" to intimacy out of obligation or fear of your partner\'s mood?',
      'How can you communicate your limits with gentle clarity?'
    ],
    practicalSteps: [
      'Establish a "Yellow / Red / Green" check-in protocol for new explorations: Green means loving it, Yellow means pause/slow down, Red means stop immediately.'
    ]
  },
  {
    id: 'single-and-couple-exploration',
    category: 'single-couple',
    categoryLabel: 'Singles & Couples',
    title: 'Exploring Intimacy: The Joys of Solo Discovery & Partnered Connection',
    subtitle: 'Nurturing self-love when single, and cultivating enduring novelty when partnered.',
    summary: 'Whether single and prioritizing self-care or in a decade-long partnership, intentional exploration grounds you in fulfillment.',
    readTime: '6 min read',
    keyInsights: [
      'Solo pleasure is self-discovery and autonomous wellness, not just a substitute for a relationship.',
      'Long-term couples must transition from passive expectation to intentional cultivation of romance and play.',
      'Introducing new textures, gentle warming gels, or shared games rekindles the spark of novelty.'
    ],
    sections: [
      {
        heading: 'Solo Exploration: Learning Your Body\'s Instruction Manual',
        body: [
          'How can you guide a partner to what feels wonderful if you have never taken the time to discover it yourself? Solo intimacy allows you to test angles, speeds, pressure, and fantasies without performance pressure.',
          'It is an empowering ritual of body sovereignty, stress relief, and self-appreciation.'
        ]
      },
      {
        heading: 'Partnered Play: Breaking Routine and Rekindling Curiosity',
        body: [
          'Long-term relationships naturally settle into predictable rhythms. Novelty activates dopamine in the brain. Small shifts—such as using a silky massage oil, taking turns exploring with a quiet couples device, or reading intimacy guides together—revitalizes excitement.'
        ]
      }
    ],
    reflectionPrompts: [
      'As a single person, how do you celebrate and nurture your intimate self?',
      'As a couple, when was the last time you explored something entirely new in bed together?'
    ],
    practicalSteps: [
      'Schedule a "No-Destination Intimate Date": 30 minutes dedicated to massage, conversation, and soft touch with zero requirement for intercourse or climax.'
    ]
  },
  {
    id: 'life-stages-shifting-desires',
    category: 'life-stages',
    categoryLabel: 'Life Stages & Hormones',
    title: 'Changes in Desire and Intimacy Across Different Stages of Life',
    subtitle: 'Navigating stress, postpartum shifts, hormonal transitions, and aging with grace and compassion.',
    summary: 'Human intimacy naturally ebbs and flows through life events. Understanding hormonal shifts and physical changes allows you to adapt with confidence rather than panic.',
    readTime: '6 min read',
    keyInsights: [
      'Postpartum hormonal crashes, breastfeeding, and sleep deprivation naturally suppress estrogen and libido; this is biology protecting energy, not a failure of love.',
      'Perimenopause and menopause alter vaginal mucosal thickness and pH. High-quality pH-balanced lubricants and soothing intimate balms restore effortless comfort.',
      'Intimacy in mature years often deepens into slower, richer, and more emotionally attuned pleasure.'
    ],
    sections: [
      {
        heading: 'Honoring Your Body’s Changing Seasons',
        body: [
          'At 20, 35, 50, and 65, your nervous system, hormonal baseline, and emotional priorities are very different. Expecting your body to respond at 45 exactly as it did at 22 leads to needless frustration.',
          'When natural lubrication decreases due to hormonal transitions or medications, high-grade botanical water or pure silicone lubricants are essential tools that preserve mucosal skin and keep intimacy pain-free.'
        ]
      },
      {
        heading: 'Redefining What "Counts" as Intimacy',
        body: [
          'During demanding seasons—such as caring for young children, managing heavy careers, or navigating grief—intimacy might look like sensual foot rubs, deep hugs, shared baths, or whisper-quiet solo moments. Removing rigid definitions keeps connection alive.'
        ]
      }
    ],
    reflectionPrompts: [
      'What stage of life are you currently in, and what physical or emotional pressures are impacting your energy?',
      'How can you offer yourself and your partner more grace during this season?'
    ],
    practicalSteps: [
      'Incorporate daily intimate moisture care: using a nourishing balm or prebiotic cleanser to maintain tissue elasticity and comfort throughout the day.'
    ]
  },
  {
    id: 'choosing-products-responsible-exploration',
    category: 'products-safety',
    categoryLabel: 'Product Education & Safety',
    title: 'Choosing Intimate Wellness Products: Safety, Materials & Responsible Play',
    subtitle: 'How to cut through misleading marketing, recognize toxic materials, and invest in authentic quality.',
    summary: 'Why non-porous platinum medical silicone is non-negotiable, how to balance vaginal pH, and how to curate products that truly enhance your health.',
    readTime: '5 min read',
    keyInsights: [
      'Cheap PVC and "jelly" toys contain toxic phthalates and porous pockets that permanently harbor bacteria. Never compromise on medical-grade materials.',
      'Always match your lubricant to your tools: silicone toys require water-based lubricant; latex condoms break down in oil.',
      'Quality over quantity: One well-designed, whisper-quiet device provides years of safe, reliable pleasure.'
    ],
    sections: [
      {
        heading: 'Why We Treat Pleasure Products as Wellness Instruments',
        body: [
          'You wouldn\'t put toxic chemicals on your face or eat from lead dishes. Your delicate intimate mucosal tissues have the highest absorption rates of any area on your body.',
          'At Velvet Pleasure House, our selection is curated with medical-grade biocompatibility: 100% phthalate-free, non-porous, waterproof, and ergonomically balanced.'
        ]
      }
    ],
    reflectionPrompts: [
      'Have you ever checked the material makeup of products you use intimates-wise?',
      'What product qualities (noise level, shape, softness) are most important to your comfort?'
    ],
    practicalSteps: [
      'Audit your intimate drawer: discard any sticky, porous, or peeling jelly toys, and store your body-safe devices in individual breathable pouches.'
    ]
  }
];

export const CONCIERGE_TOPICS: ConciergeServiceTopic[] = [
  {
    id: 'understanding-pleasure',
    title: 'Understanding Pleasure & Sexuality',
    description: 'Exploring your desires, overcoming shyness, responsive desire pacing, and discovering what feels good.',
    sampleQuestions: [
      'How do I know what stimulation style fits my body?',
      'Why do I feel arousal in my head but my body is slow to respond?',
      'I want to explore solo pleasure for the first time without feeling guilty.'
    ],
    starterPrompt: 'Hello Velvet Concierge, I have a confidential question about understanding my pleasure and desires.'
  },
  {
    id: 'intimacy-relationships',
    title: 'Intimacy & Relationship Communication',
    description: 'Talking with your partner about fantasies, introducing toys without jealousy, and rekindling connection.',
    sampleQuestions: [
      'How do I suggest introducing a toy without my partner feeling inadequate?',
      'Our intimacy has become routine; how can we gently bring back excitement?',
      'How do I express that I need more slow warm-up without hurting feelings?'
    ],
    starterPrompt: 'Hello Velvet Concierge, I’d love guidance on communicating intimate desires with my partner.'
  },
  {
    id: 'sexual-confidence',
    title: 'Sexual Confidence & Self-Discovery',
    description: 'Overcoming body insecurity, releasing awkwardness or shame, and tuning in to self-appreciation.',
    sampleQuestions: [
      'How do I stop overthinking my body’s appearance during intimacy?',
      'I feel awkward and self-conscious; how do I build intimate confidence?',
      'How do I get comfortable with my natural anatomy?'
    ],
    starterPrompt: 'Hello Velvet Concierge, I have a question about building sexual confidence and self-awareness.'
  },
  {
    id: 'general-wellness-education',
    title: 'General Sexual Wellness Education',
    description: 'Hormonal shifts, vaginal pH balance, postpartum changes, life-stage transitions, and physical comfort.',
    sampleQuestions: [
      'Why do regular soaps cause burning or irritation in the bikini area?',
      'How do hormonal changes or perimenopause affect natural lubrication?',
      'What can help with friction discomfort during intimacy?'
    ],
    starterPrompt: 'Hello Velvet Concierge, I would like general sexual wellness guidance regarding comfort and hydration.'
  },
  {
    id: 'choosing-products',
    title: 'Choosing Suitable Products',
    description: 'Matching toys to beginner needs, finding the right lubricant for your skin, and lingerie sizing guidance.',
    sampleQuestions: [
      'Which toy is best for someone who has never owned one before?',
      'Should I choose water-based or silicone-based lube for sensitive skin?',
      'Which vibrator is whisper-quiet enough for apartment living?'
    ],
    starterPrompt: 'Hello Velvet Concierge, could you recommend a suitable product based on my personal preferences?'
  },
  {
    id: 'product-use-care',
    title: 'Product Use, Safety & Hygiene Care',
    description: 'Cleaning silicone devices, battery charging, material compatibility, and confidential storage tips.',
    sampleQuestions: [
      'How do I properly sanitize my toy after use?',
      'Can I use silicone lube with my vibrator?',
      'What is the safest way to store devices discreetly at home in Nigeria?'
    ],
    starterPrompt: 'Hello Velvet Concierge, I have a question regarding product care, hygiene, and compatibility.'
  }
];

export const CONCIERGE_DISCLAIMER = `The Velvet Concierge provides supportive intimate-life conversations, sexual wellness education, product guidance, and confidential lifestyle advice. We do NOT provide licensed psychotherapy, sex therapy, medical treatment, or clinical counseling. If you are experiencing persistent physical pain, infections, severe pelvic trauma, or complex psychological distress, we warmly encourage you to consult a licensed medical doctor, gynecologist, or healthcare professional.`;
