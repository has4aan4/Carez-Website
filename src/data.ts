import { Review, Specification, Benefit, CustomRgbDetails, MouseVariant, AddOnItem } from './types';

export const SPECIFICATIONS: Specification[] = [
  {
    key: 'dpi',
    label: 'DPI Range',
    value: '100 – 26,000 DPI',
    iconName: 'Cpu',
    description: 'Ultra-sensitive optical sensor adjustable in increments of 50 DPI with on-board memory.'
  },
  {
    key: 'sensor',
    label: 'Sensor Type',
    value: 'Carez Precision Optical',
    iconName: 'Target',
    description: 'Next-gen tracking tracking flawlessly on glass or reflective setups with zero smoothing.'
  },
  {
    key: 'polling',
    label: 'Polling Rate',
    value: '8,000 Hz Hyperpolling',
    iconName: 'Zap',
    description: 'Unbelievably low latency of 0.125ms—8x faster than standard esports mouse updates.'
  },
  {
    key: 'weight',
    label: 'Weight',
    value: '52 Grams',
    iconName: 'Feather',
    description: 'Featherlight honeycomb design engineered for swift micro-adjustments with zero lift-off drag.'
  },
  {
    key: 'rgb',
    label: 'RGB Lighting',
    value: 'Custom 5-Zone Profile',
    iconName: 'Sparkles',
    description: 'True chromatic rendering customizable via hardware presets or on-page dynamic customizer.'
  },
  {
    key: 'connectivity',
    label: 'Connectivity',
    value: 'Carez Speed-Link & USB-C',
    iconName: 'Wifi',
    description: 'Lag-free 2.4Ghz wireless connection + fast charge lightweight paracord braided cable.'
  },
  {
    key: 'buttons',
    label: 'Buttons Count',
    value: '6 Tactile Buttons',
    iconName: 'MousePointer',
    description: 'Fully remappable positions with optical switches rated for 90M double-click-free cycles.'
  },
  {
    key: 'compatibility',
    label: 'Compatibility',
    value: 'Windows, macOS, Linux',
    iconName: 'Monitor',
    description: 'Driverless plug-and-play profile saving directly onto the device internal controller.'
  }
];

export const BENEFITS: Benefit[] = [
  {
    title: 'Improve Accuracy',
    description: 'State-of-the-art precision optical tracking translates pixel-perfect hand adjustments into instant on-screen motion.',
    iconName: 'Crosshair',
    tag: 'AIM ACCURACY'
  },
  {
    title: 'Faster Reactions',
    description: 'Instant optical switch response coupled with 8,000Hz updates gives you a crucial competitive edge in millisecond battles.',
    iconName: 'Zap',
    tag: 'ULTRA LOW LATENCY'
  },
  {
    title: 'Comfortable Gaming',
    description: 'Anatomical ergonomic grip matches natural hand postures perfectly to limit wrist stress over marathon sessions.',
    iconName: 'Shield',
    tag: 'ERGO CONTROL'
  },
  {
    title: 'Custom RGB Effects',
    description: 'Create customized atmospheric backlighting matching your setups with smart brightness controls and neon modes.',
    iconName: 'Paintbrush',
    tag: 'STYLE HARMONY'
  },
  {
    title: 'Built to Last',
    description: 'Milled structure supporting millions of reliable clicks, fitted with high-friction pure PTFE mouse skates.',
    iconName: 'Award',
    tag: 'PREMIUM QUALITY'
  },
  {
    title: 'Multi-Game Performance',
    description: 'Preconfigured profiles tuned for elite FPS targets, macro-rich MOBA systems, and immersive open-world RPG setups.',
    iconName: 'Compass',
    tag: 'MULTI-GENRE'
  }
];

export const RGB_OPTIONS: CustomRgbDetails[] = [
  {
    id: 'lime',
    name: 'Electric Neon Lime',
    hex: '#D1FF4D',
    textColor: 'text-neon-lime',
    glowClass: 'neon-glow-lime',
    borderClass: 'neon-border-lime'
  },
  {
    id: 'pink',
    name: 'Cyber Pink Glow',
    hex: '#EC4899',
    textColor: 'text-pink-500',
    glowClass: 'text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]',
    borderClass: 'neon-border-glowing-pink'
  },
  {
    id: 'blue',
    name: 'Hyper Electric Blue',
    hex: '#3B82F6',
    textColor: 'text-blue-500',
    glowClass: 'text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)]',
    borderClass: 'neon-border-glowing-blue'
  },
  {
    id: 'orange',
    name: 'Volcanic Aurora Orange',
    hex: '#F97316',
    textColor: 'text-orange-500',
    glowClass: 'text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.6)]',
    borderClass: 'neon-border-glowing-orange'
  },
  {
    id: 'purple',
    name: 'Cosmic Mystique Purple',
    hex: '#A855F7',
    textColor: 'text-purple-500',
    glowClass: 'text-purple-400 drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]',
    borderClass: 'neon-border-glowing-purple'
  }
];

export const MOUSE_VARIANTS: MouseVariant[] = [
  {
    id: 'var-lime',
    name: 'Carez Neon Apex',
    colorName: 'Core Lime Edition',
    price: 79.99,
    imageColor: '#D1FF4D',
    description: 'The standard issue featuring signature electric lime honeycomb casing.'
  },
  {
    id: 'var-stealth',
    name: 'Carez Stealth Obsidian',
    colorName: 'Dark Stealth Gray',
    price: 79.99,
    imageColor: '#2A2A2A',
    description: 'An understated premium dark matte styling for clean setups.'
  },
  {
    id: 'var-ghost',
    name: 'Carez Cyber Specter',
    colorName: 'Frost White Ghost',
    price: 89.99,
    imageColor: '#E2E8F0',
    description: 'A striking snowy-white shell contrasted against deep space internals.'
  }
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: 'addon-pad',
    name: 'Carez Heavy Velocity Mousepad (XL)',
    price: 24.99,
    description: 'Micro-woven speed surface with anti-slip premium rubber base (900mm x 400mm).'
  },
  {
    id: 'addon-skates',
    name: 'Carez PTFE Replacement Feet Skates',
    price: 8.99,
    description: 'Custom-cut rounded edge virgin grade PTFE glides, thickness 0.8mm.'
  },
  {
    id: 'addon-grips',
    name: 'Custom Polyurethane Carez Grip Tape',
    price: 11.99,
    description: 'Anti-slip textured grips pre-cut for side channels and left/right triggers.'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Alex "Zephyr" Vance',
    role: 'Apex Legends Semi-Pro',
    rating: 5,
    text: 'Switching to CAREZ dropped my DPI jitters completely. The weight at 52g is like moving air, and that 8K Hz polling means micro-adjustments registrate instantly. Easily the best mouse of 2026.',
    date: '3 weeks ago',
    avatarSeed: 'alex',
    setupType: 'Obsidian Stealth Build',
    likes: 42
  },
  {
    id: 'rev-2',
    author: 'Sarah "Nova" Brooks',
    role: 'Esports Content Creator',
    rating: 5,
    text: 'The neon lime LED on this matches my desk perfectly. It looks futuristic and premium without feeling bulky. Battery keeps going and going (I am averaging 90 hours active use). Absolute masterpiece.',
    date: '1 month ago',
    avatarSeed: 'sarah',
    setupType: 'Neon Cyberstation XL',
    likes: 28
  },
  {
    id: 'rev-3',
    author: 'Marcus K.',
    role: 'Competitive Valorant Grind',
    rating: 4,
    text: 'Click action on the optical switches is extremely snappy with zero post-travel mushiness. The honeycomb gives so much breathability! Reduced my palm sweat during intensive matches.',
    date: '2 months ago',
    avatarSeed: 'marcus',
    setupType: 'Minimalist Frost White Custom',
    likes: 19
  }
];
