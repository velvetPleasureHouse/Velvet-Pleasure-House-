import type { Product } from '../types/index.ts';

export const DEFAULT_PRODUCTS: Product[] = [
  // 1. LINGERIE
  {
    id: 'vph-ling-01',
    name: 'The Noir Silk & Chantilly Lace Babydoll',
    category: 'lingerie',
    price: 38500,
    shortDescription: 'Sumptuous mulberry silk with delicate scalloped French eyelash lace and adjustable cross-back straps.',
    description: 'Designed to drape naturally against the curves of the body, the Noir Babydoll combines breathable 100% natural silk with whisper-soft Chantilly lace. Perfect for self-celebration or romantic evenings, offering effortless glamour and skin-comfort in warm climates.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Bestseller',
    materials: '92% Mulberry Silk, 8% Elastane, French Chantilly Lace',
    specifications: {
      'Sizing': 'Available in XS to 2XL with gentle stretch',
      'Fit Style': 'Flowing relaxed silhouette with underbust support band',
      'Closure': 'Adjustable silk sliders, hookless slip-on',
      'Care': 'Gentle hand wash in cold water with silk shampoo, air dry flat'
    },
    safetyAndCare: 'Breathable, hypoallergenic silk safe for sensitive intimate skin. Avoid bleaching or hot tumble drying.',
    isDemonstration: true
  },
  {
    id: 'vph-ling-02',
    name: 'Burgundy Velvet & Sheer Mesh Plunge Bodysuit',
    category: 'lingerie',
    price: 42000,
    shortDescription: 'Deep wine stretch velvet with semi-sheer mesh paneling and a flattering deep plunge neckline.',
    description: 'A striking fusion of tactile crushed velvet and breathable mesh. This bodysuit celebrates all contours with targeted contouring lines and a high-cut leg line that elongates the silhouette. Features a discreet snap closure at the gusset.',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: true,
    badge: 'New Arrival',
    materials: 'Stretch Crushed Velvet, Fine Mesh, 100% Cotton Gusset Lining',
    specifications: {
      'Sizing': 'S, M, L, XL, XXL (Adaptive elasticity)',
      'Gusset': '100% organic cotton lined with triple popper snaps',
      'Hardware': 'Rose gold coated metallic adjusters',
      'Colorway': 'Deep Bordeaux / Midnight Burgundy'
    },
    safetyAndCare: 'Cotton gusset lining protects mucosal breathability. Hand wash recommended.',
    isDemonstration: true
  },
  {
    id: 'vph-ling-03',
    name: 'Elysian Rose Satin Robe & Slip Ensemble',
    category: 'lingerie',
    price: 49500,
    shortDescription: 'Two-piece muted rose liquid satin robe with belted sash and matching low-back slip dress.',
    description: 'Wrap yourself in liquid luxury. Crafted from featherlight high-thread-count satin in our signature muted rose hue. Features deep kimono sleeves, internal security tie, and a matching bias-cut slip that feels like second skin.',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Luxury Lounge',
    materials: 'High-grade liquid satin with micro-weave drape',
    specifications: {
      'Includes': 'Longline Robe with belt + Bias-cut V-neck slip',
      'Robe Length': 'Mid-calf (115cm)',
      'Slip Straps': 'Fully adjustable sliding straps',
      'Sizes': 'Standard Fit (S-M) & Curve Fit (L-2XL)'
    },
    safetyAndCare: 'Non-irritant dyes, safe for prolonged lounging. Cold gentle cycle or hand wash.',
    isDemonstration: true
  },
  {
    id: 'vph-ling-04',
    name: 'Aura Floral Lace Bralette & High-Waist Brief Set',
    category: 'lingerie',
    price: 32000,
    shortDescription: 'Underwire-free architectural lace bralette paired with vintage high-waisted cheeky briefs.',
    description: 'Designed for everyday sensuality with zero discomfort. The wireless cups cradle the bust naturally while the soft wide underband prevents digging. Paired with a flattering vintage high-rise brief with scalloped edges.',
    images: [
      'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    materials: 'Botanical Soft Stretch Lace, Organic Cotton Gusset',
    specifications: {
      'Wire Type': 'Zero-wire (natural contouring)',
      'Back Closure': '4-hook eye closure for customizable ribcage fit',
      'Panty Cut': 'High-waisted cheekster with no-dig leg openings',
      'Colors': 'Midnight Plum & Champagne'
    },
    safetyAndCare: 'Lined with breathable organic cotton. Hand wash recommended.',
    isDemonstration: true
  },

  // 2. SEX TOYS
  {
    id: 'vph-toy-01',
    name: 'Velvet Eclipse Dual Air-Pulse & G-Spot Stimulator',
    category: 'toys',
    price: 58000,
    shortDescription: 'Pioneering contactless sonic pleasure waves combined with deep rumbly internal vibrations.',
    description: 'The pinnacle of dual stimulation. The Eclipse uses gentle aerated pressure waves to stimulate external nerve endings without direct contact or desensitization, while the curved flexible arm delivers quiet, deep-frequency pulsations internally. Ergonomically shaped for intuitive one-handed control.',
    images: [
      'https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Bestseller',
    materials: '100% Medical-Grade Body-Safe Silicone, ABS Core, Phthalate & Latex Free',
    specifications: {
      'Vibration Patterns': '10 multi-speed rhythms + 5 pressure wave intensities',
      'Sound Level': 'Whisper quiet (< 42 dB)',
      'Waterproof': '100% Submersible IPX7 (Bath & shower safe)',
      'Charging': 'Magnetic USB rechargeable (2 hrs charging = 90 mins runtime)',
      'Dimensions': '18.5 cm total length, 3.2 cm maximum diameter'
    },
    safetyAndCare: 'Use exclusively with water-based lubricants. Do not use with silicone lubricant. Clean thoroughly with warm water and antibacterial toy cleanser.',
    compatibility: 'Compatible only with water-based lubricants. Safe with latex & polyisoprene condoms.',
    isDemonstration: true
  },
  {
    id: 'vph-toy-02',
    name: 'Silk Touch Ergonomic Flexible Wand',
    category: 'toys',
    price: 46500,
    shortDescription: 'Flexible silicone neck with deep-resonance motor designed for targeted clitoral & tension relief.',
    description: 'Unlike noisy electric wands, the Silk Touch features an ultra-dense, low-frequency internal motor that resonates through tissue rather than buzzing on the surface. The velvety silicone head bends up to 45 degrees to match your body position without strain.',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Staff Favorite',
    materials: 'Seamless Ultra-Soft Medical Silicone, Hypoallergenic',
    specifications: {
      'Motor': 'Heavy-duty deep frequency low-pitch motor',
      'Speeds': '8 vibrational patterns across 5 intensity levels',
      'Waterproof': 'IPX6 Splashproof & wash-safe',
      'Battery': 'Rechargeable Lithium-ion via magnetic USB pin',
      'Dimensions': '21 cm length, 4.2 cm head width'
    },
    safetyAndCare: 'Store in breathable satin pouch away from direct sunlight. Clean with gentle soap before and after each use.',
    compatibility: 'Water-based lubricants recommended.',
    isDemonstration: true
  },
  {
    id: 'vph-toy-03',
    name: 'The Petite Rose Whisper Bullet',
    category: 'toys',
    price: 24500,
    shortDescription: 'Discreet, travel-friendly precision micro-stimulator with velvety matte finish.',
    description: 'An elegant introductory companion for beginners or travel. Fitting discreetly into the palm of your hand, this miniature bullet packs surprisingly nuanced power with simple one-button navigation and zero intimidation factor.',
    images: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1512290900672-1f5be4eb9c08?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Beginner Friendly',
    materials: 'Medical-Grade Soft Touch Silicone & Rose Gold Metal Accents',
    specifications: {
      'Speeds': '10 distinct vibration modes',
      'Sound Level': 'Virtually silent (< 38 dB)',
      'Waterproof': 'IPX7 Waterproof',
      'Battery': 'Fast USB Magnetic Charge (45 mins full charge)',
      'Dimensions': '8.8 cm length x 2.1 cm diameter'
    },
    safetyAndCare: 'Keep dry during charging. Wash with warm water and dry with lint-free cloth.',
    compatibility: 'Water-based lubes only.',
    isDemonstration: true
  },
  {
    id: 'vph-toy-04',
    name: 'Harmonia Couple’s Remote Vibrating Ring',
    category: 'toys',
    price: 36000,
    shortDescription: 'Flexible dual-pleasure couples ring with whisper remote for partnered intimacy.',
    description: 'Engineered to enhance sensation for both partners simultaneously. Crafted from ultra-stretchy silicone that fits comfortably while providing gentle constriction, paired with an angled vibrating pad for direct clitoral stimulation during lovemaking.',
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Couples Choice',
    materials: 'Super-Stretch Platinum Cured Medical Silicone',
    specifications: {
      'Controls': 'On-device button or wireless discreet remote (up to 8m range)',
      'Modes': '9 playful pulse rhythms',
      'Waterproof': 'IPX7 Waterproof ring; splash-proof remote',
      'Runtime': 'Up to 70 minutes per charge'
    },
    safetyAndCare: 'Do not wear continuously for more than 30 minutes. Remove immediately if discomfort occurs. Clean after use.',
    compatibility: 'Safe with natural latex condoms and water-based lubricants.',
    isDemonstration: true
  },

  // 3. LUBRICANTS
  {
    id: 'vph-lube-01',
    name: 'Botanical Silk Water-Based Intimate Lubricant (150ml)',
    category: 'lubricants',
    price: 18500,
    shortDescription: 'pH-balanced, aloe-enriched organic formula mimicking natural intimate hydration.',
    description: 'A pure, clean, non-sticky lubricant designed to enhance comfort and ease friction. Formulated at an optimal vaginal pH of 3.8 to 4.2 with certified organic aloe vera, plant cellulose, and calming chamomile. Rinses off clean with plain water and leaves no residue on sheets.',
    images: [
      'https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Essential',
    materials: 'Deionized Water, Organic Aloe Barbadensis, Plant Cellulose, Vegetable Glycerin, Citric Acid, Potassium Sorbate',
    specifications: {
      'Volume': '150ml (5.1 fl oz) pump bottle',
      'pH Level': '3.9 ± 0.2 (Optimal mucosal balance)',
      'Formulation': 'Free of parabens, petrochemicals, artificial perfumes, and harsh sugars',
      'Texture': 'Silky glide, non-tacky, easy water rinse'
    },
    safetyAndCare: '100% safe with all silicone toys, latex condoms, and polyisoprene. Store in a cool place away from direct heat.',
    compatibility: 'Universal: 100% safe for silicone toys, rubber, glass, and all condoms.',
    isDemonstration: true
  },
  {
    id: 'vph-lube-02',
    name: 'Velvet Satin Long-Lasting Pure Silicone Elixir (100ml)',
    category: 'lubricants',
    price: 22000,
    shortDescription: 'Water-resistant, ultra-concentrated silicone formula for uninterrupted sensual glide.',
    description: 'When you desire a glide that never dries or evaporates. Formulated with premium high-purity dimethicone, this velvety elixir does not absorb into the skin or dissolve in water, making it perfect for prolonged sessions, sensitive skin, and shower play.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Waterproof Glide',
    materials: 'Medical-Grade Dimethicone, Cyclomethicone, Dimethiconol (100% hypoallergenic)',
    specifications: {
      'Volume': '100ml frosted pump dispenser',
      'Longevity': '3x longer-lasting than standard water lubes',
      'Features': 'Shower-safe, non-comedogenic, unscented',
      'Safety': 'Latex condom safe'
    },
    safetyAndCare: 'CRITICAL: Do NOT use with silicone sex toys (causes material degradation). Use with glass, metal, or partnered play. Safe for latex and polyisoprene condoms.',
    compatibility: 'NOT compatible with silicone toys. Safe for latex condoms and glass/metal toys.',
    isDemonstration: true
  },
  {
    id: 'vph-lube-03',
    name: 'Warm Bourbon Vanilla Arousal & Massage Gel (60ml)',
    category: 'lubricants',
    price: 16500,
    shortDescription: 'Gentle warming botanicals with natural food-grade vanilla extract for heightened sensitivity.',
    description: 'Ignite warmth with every touch. Formulated with gentle ginger root extract and natural vanilla bean, this sensory gel produces a subtle, comforting warmth when blown on or massaged into intimate zones, increasing blood flow and pleasure responsiveness.',
    images: [
      'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Sensory',
    materials: 'Organic Aloe, Zingiber Officinale (Ginger) Root Extract, Natural Bourbon Vanilla, Plant Glycerin',
    specifications: {
      'Volume': '60ml travel-safe dropper bottle',
      'Sensation': 'Gradual warming upon contact & breath friction',
      'Flavor': 'Mild natural vanilla (food-grade ingredients, no synthetic flavor)'
    },
    safetyAndCare: 'Do a small patch test on inner forearm prior to full application. Discontinue if redness occurs. Clean with warm water.',
    compatibility: 'Condom and silicone toy friendly.',
    isDemonstration: true
  },

  // 4. INTIMATE CARE PRODUCTS
  {
    id: 'vph-care-01',
    name: 'Gentle Bloom Prebiotic Intimate Cleansing Foam (200ml)',
    category: 'intimate-care',
    price: 17500,
    shortDescription: 'Gynecologically tested pH 4.0 wash with prebiotics that supports healthy vaginal flora.',
    description: 'Most commercial soaps are too alkaline (pH 8-10) and disrupt natural lactobacilli flora. Gentle Bloom is scientifically balanced at pH 4.0, using nourishing prebiotic inulin, organic rose hydrosol, and calendula to gently cleanse external intimate areas without irritation, dryness, or odor.',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: true,
    badge: 'Gynecologist Tested',
    materials: 'Aqua, Rosa Damascena Flower Water, Inulin (Prebiotic), Coco-Glucoside, Calendula Extract, Lactic Acid',
    specifications: {
      'Volume': '200ml cloud-foam dispenser',
      'pH Balance': '4.0 (Physiological vulvar pH)',
      'Free From': 'Zero sulfates (SLS), zero parabens, zero synthetic fragrance, zero dyes',
      'Use': 'Daily external hygiene and post-intimacy cleansing'
    },
    safetyAndCare: 'For external vulvar use only. Do not douche or insert into the vaginal canal. Rinse with clean water.',
    isDemonstration: true
  },
  {
    id: 'vph-care-02',
    name: 'Antimicrobial Hygiene Cleansing Mist for Intimate Devices (150ml)',
    category: 'intimate-care',
    price: 14000,
    shortDescription: 'Alcohol-free, quick-cleansing spray formulated to preserve silicone and eliminate 99.9% of bacteria.',
    description: 'Standard household soaps and hand sanitizers contain alcohol or oils that break down high-grade medical silicone and irritate intimate mucous membranes. This fast-acting mist sanitizes silicone, glass, and metal devices within 60 seconds while keeping them silky and bacteria-free.',
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1608248597359-5613521b44cb?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Device Care',
    materials: 'Purified Water, Benzalkonium Chloride (0.1%), Melaleuca Alternifolia (Tea Tree) Hydrosol, Zinc Gluconate',
    specifications: {
      'Volume': '150ml fine mist spray',
      'Formula': '100% Alcohol-Free, Bleach-Free, Non-Corrosive',
      'Action Time': '60 seconds contact time before rinse/wipe'
    },
    safetyAndCare: 'Spray device thoroughly, wait 60 seconds, rinse with warm water or wipe with clean lint-free cloth before storage.',
    isDemonstration: true
  },
  {
    id: 'vph-care-03',
    name: 'Soothe & Nourish Intimate Recovery Butter (50g)',
    category: 'intimate-care',
    price: 15500,
    shortDescription: 'Whipped organic shea, squalane and vitamin E balm for friction relief and delicate skin nourishment.',
    description: 'Formulated specifically for the delicate skin of the bikini area and external labia. Whether recovering from shaving, waxing, cycling friction, or post-intimate tenderness, this velvety whipped butter restores elasticity, hydrates dry tissue, and calms irritation.',
    images: [
      'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'Soothing Comfort',
    materials: 'Unrefined Butyrospermum Parkii (Shea) Butter, Plant Squalane, Tocopherol (Vitamin E), Chamomile Extract',
    specifications: {
      'Net Weight': '50g amber glass jar with rose gold lid',
      'Texture': 'Melts on contact with skin warmth',
      'Skin Types': 'Sensitive, easily irritated, prone to ingrowns or friction'
    },
    safetyAndCare: 'For external use. Apply with clean fingertips. Store in cool room away from direct tropical sunlight.',
    isDemonstration: true
  },
  {
    id: 'vph-care-04',
    name: 'Discreet Bamboo Intimate Fresh Wipes (Pack of 30)',
    category: 'intimate-care',
    price: 9800,
    shortDescription: '100% biodegradable bamboo wipes infused with aloe and cucumber for on-the-go freshness.',
    description: 'Individually wrapped discreet flush-friendly wipes for travel, pre-date freshening, or post-intimacy hygiene. Free from alcohol, parabens, and chlorine bleaching. Keeps your intimate microbiome balanced wherever your day takes you.',
    images: [
      'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80'
    ],
    inStock: true,
    isFeatured: false,
    badge: 'On The Go',
    materials: '100% Organic Bamboo Fiber, Aloe Vera, Cucumber Fruit Water, Citric Acid',
    specifications: {
      'Count': '30 individually sealed pocket-sized sachets',
      'Biodegradability': '100% unbleached bamboo fiber (eco-conscious)',
      'Fragrance': 'Naturally unscented'
    },
    safetyAndCare: 'Gentle on external skin. Seal pocket carefully. Resealable carton.',
    isDemonstration: true
  }
];

export const DEFAULT_SETTINGS: {
  whatsappNumber: string;
  businessEmail: string;
  instagramHandle: string;
  twitterHandle: string;
  storeNotice: string;
  currencySymbol: string;
} = {
  whatsappNumber: '+2348000000000', // Configurable placeholder for owner
  businessEmail: 'concierge@velvetpleasurehouse.com',
  instagramHandle: '@velvetpleasurehouse',
  twitterHandle: '@velvetpleasurehouse',
  storeNotice: '100% Discreet Packaging: Plain, unmarked courier boxes delivered nationwide across Nigeria.',
  currencySymbol: '₦'
};
