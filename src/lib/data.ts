// Marketing + feature data for FITBOX (mock, client-side only).

export interface Collection {
  slug: string
  title: string
  blurb: string
  image: string
  accent: string
}

export const COLLECTIONS: Collection[] = [
  {
    slug: 'streetwear',
    title: 'Streetwear',
    blurb: 'Oversized cuts, loud graphics, after-hours energy.',
    image: '/products/suriya-kaaval-karuppu.jpg',
    accent: '#1A1A1A',
  },
  {
    slug: 'gym',
    title: 'Gym',
    blurb: 'Move-ready fits that hit different under the lights.',
    image: '/products/karuppu-god-mode.jpg',
    accent: '#2E5E3A',
  },
  {
    slug: 'college',
    title: 'College',
    blurb: 'Campus classics and slogan tees for the everyday grind.',
    image: '/products/tamizhaga-vetri-flag.jpg',
    accent: '#2B4C7E',
  },
  {
    slug: 'creator',
    title: 'Creator',
    blurb: 'Limited collabs from the designers shaping the scene.',
    image: '/products/ajith-kumar-racing-mk.jpg',
    accent: '#B3261E',
  },
]

export function getCollection(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug)
}

// ---- Mystery box ----

export type MysteryCategory = 'anime' | 'streetwear' | 'gym' | 'creator'

export interface MysteryCategoryInfo {
  slug: MysteryCategory
  title: string
  blurb: string
  emoji: string
  image: string
}

export const MYSTERY_CATEGORIES: MysteryCategoryInfo[] = [
  {
    slug: 'anime',
    title: 'Anime',
    blurb: 'Manga-panel prints, glow inks, and arc-finisher fits.',
    emoji: '🌸',
    image: '/products/karppu.jpg',
  },
  {
    slug: 'streetwear',
    title: 'Streetwear',
    blurb: 'Oversized heat and graphic statements.',
    emoji: '🔥',
    image: '/products/suriya-kaaval-karuppu.jpg',
  },
  {
    slug: 'gym',
    title: 'Gym',
    blurb: 'Performance fits and motivational drops.',
    emoji: '💪',
    image: '/products/karuppu-god-mode.jpg',
  },
  {
    slug: 'creator',
    title: 'Creator',
    blurb: 'Surprise collabs from the FITBOX designer marketplace.',
    emoji: '🎨',
    image: '/products/ajith-kumar-racing-hoodie-black.jpg',
  },
]

export interface MysteryTier {
  id: 'bronze' | 'silver' | 'gold'
  name: string
  price: number // paise
  itemCount: string
  blurb: string
  perks: string[]
}

export const MYSTERY_TIERS: MysteryTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 79900,
    itemCount: '1 item',
    blurb: 'One surprise tee. Always worth more than you paid.',
    perks: ['1 surprise fit', 'Worth up to ₹1,200', 'Free shipping'],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 149900,
    itemCount: '2–3 items',
    blurb: 'A curated bundle with a guaranteed bestseller inside.',
    perks: ['2–3 surprise fits', 'Worth up to ₹2,800', '1 guaranteed bestseller', 'Free shipping'],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 249900,
    itemCount: '3–5 items',
    blurb: 'The full haul — including a shot at a drop-exclusive piece.',
    perks: [
      '3–5 surprise fits',
      'Worth up to ₹5,500',
      'Chance at a drop-exclusive',
      'Sticker pack + tote',
      'Priority shipping',
    ],
  },
]

export function getMysteryCategory(slug: string): MysteryCategoryInfo | undefined {
  return MYSTERY_CATEGORIES.find((c) => c.slug === slug)
}

// ---- Designer marketplace ----

export interface Designer {
  id: string
  name: string
  handle: string
  bio: string
  avatar: string
  followers: string
  drops: number
}

export const DESIGNERS: Designer[] = [
  {
    id: 'd1',
    name: 'Studio Kage',
    handle: '@studiokage',
    bio: 'Anime-core illustrator turning late-night arcs into wearable panels.',
    avatar: 'https://picsum.photos/seed/fitbox-d-kage/200/200',
    followers: '48.2k',
    drops: 12,
  },
  {
    id: 'd2',
    name: 'Pixel Riot',
    handle: '@pixelriot',
    bio: 'Glitch graphics and racing-inspired streetwear collabs.',
    avatar: 'https://picsum.photos/seed/fitbox-d-pixel/200/200',
    followers: '31.7k',
    drops: 8,
  },
  {
    id: 'd3',
    name: 'Madras Mafia',
    handle: '@madrasmafia',
    bio: 'Regional typography and cinema tributes, printed loud.',
    avatar: 'https://picsum.photos/seed/fitbox-d-madras/200/200',
    followers: '67.9k',
    drops: 19,
  },
]

// ---- Social proof ----

export interface Review {
  id: string
  name: string
  handle: string
  avatar: string
  rating: number
  text: string
  product: string
}

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Arjun M.',
    handle: '@arjun.fits',
    avatar: 'https://picsum.photos/seed/fitbox-r1/120/120',
    rating: 5,
    text: 'The oversized fit is exactly what I wanted — heavy fabric, print did not crack after 10 washes. FITBOX is the only place I cop tees now.',
    product: 'Suriya · Kaaval Karuppu',
  },
  {
    id: 'r2',
    name: 'Sneha R.',
    handle: '@snehawears',
    avatar: 'https://picsum.photos/seed/fitbox-r2/120/120',
    rating: 5,
    text: 'Designed my own birthday tee in the builder and it shipped in 4 days. The live preview is unreal — got exactly what I saw on screen.',
    product: 'Custom Oversized Tee',
  },
  {
    id: 'r3',
    name: 'Vikram T.',
    handle: '@vikramt',
    avatar: 'https://picsum.photos/seed/fitbox-r3/120/120',
    rating: 4,
    text: 'Gold mystery box was insane value — three tees and a drop hoodie I missed earlier. Worth every rupee.',
    product: 'Gold Mystery Box',
  },
  {
    id: 'r4',
    name: 'Divya K.',
    handle: '@divyak',
    avatar: 'https://picsum.photos/seed/fitbox-r4/120/120',
    rating: 5,
    text: 'UPI checkout took 20 seconds. The AK racing hoodie is the comfiest 380 GSM I own. Already on my second order.',
    product: 'Ajith Kumar Racing Hoodie',
  },
]

// ---- Influencer picks ----

export interface InfluencerPick {
  id: string
  name: string
  handle: string
  avatar: string
  caption: string
  productSlug: string
}

export const INFLUENCER_PICKS: InfluencerPick[] = [
  {
    id: 'i1',
    name: 'Karthik',
    handle: '@kartstyle',
    avatar: 'https://picsum.photos/seed/fitbox-i1/200/200',
    caption: 'Race-day fit secured. The MK tee goes hard.',
    productSlug: 'ajith-kumar-racing-mk',
  },
  {
    id: 'i2',
    name: 'Meera',
    handle: '@meera.drips',
    avatar: 'https://picsum.photos/seed/fitbox-i2/200/200',
    caption: 'The Karppu fit is unreal — front clean, back loud.',
    productSlug: 'karppu',
  },
  {
    id: 'i3',
    name: 'Rohit',
    handle: '@rohitlifts',
    avatar: 'https://picsum.photos/seed/fitbox-i3/200/200',
    caption: 'God Mode tee in the gym, every single day.',
    productSlug: 'karuppu-god-mode',
  },
]
