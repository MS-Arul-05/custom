import type { Product, Category, Fit, Badge } from '@/types'

// Re-export so existing imports `from '@/lib/products'` keep working.
export type { Product, ProductColor, Category } from '@/types'

type Swatch = { name: string; hex: string }

// Swatch palette
const C = {
  white: { name: 'White', hex: '#FFFFFF' },
  black: { name: 'Black', hex: '#1A1A1A' },
  beige: { name: 'Beige', hex: '#E8DCC8' },
  blue: { name: 'Blue', hex: '#2B4C7E' },
  green: { name: 'Green', hex: '#2E5E3A' },
  red: { name: 'Red', hex: '#B3261E' },
  maroon: { name: 'Maroon', hex: '#5A1F1B' },
  olive: { name: 'Olive', hex: '#5B5E2A' },
  navy: { name: 'Navy', hex: '#1E2D4A' },
  grey: { name: 'Grey', hex: '#6B6B6B' },
}

const TEE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

// Each product photo is a real front+back composite stored in /public/products.
const photo = (slug: string) => [`/products/${slug}.jpg`]

const CINEMA: Product[] = [
  // ---- Hoodies (₹500) — Drops ----
  {
    id: 'hd01',
    slug: 'ajith-kumar-racing-hoodie-black',
    name: 'Ajith Kumar Racing Hoodie — Black',
    category: 'hoodies',
    collections: ['streetwear', 'creator'],
    price: 50000,
    description:
      'Drop-exclusive racing hoodie inspired by AK off-track energy — full sponsor layout, NOVA chest hit, and an Ajith Kumar Racing back print. Heavyweight 380 GSM brushed fleece, boxy oversized fit. Cop it before the grid clears.',
    fabric: '380 GSM brushed fleece',
    gsm: 380,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: photo('ajith-kumar-racing-hoodie-black'),
    colors: [C.black, C.maroon],
    sizes: TEE_SIZES,
    outOfStock: ['XXXL'],
    inStock: true,
    rating: 4.9,
    reviewCount: 212,
    isNewArrival: true,
    isBestseller: true,
    isDrop: true,
    designer: 'Pixel Riot',
    badge: 'drop',
  },
  {
    id: 'hd02',
    slug: 'ajith-kumar-racing-hoodie-white',
    name: 'Ajith Kumar Racing Hoodie — White',
    category: 'hoodies',
    collections: ['streetwear', 'creator'],
    price: 50000,
    description:
      'The clean colourway of the AK racing drop — Ajith Kumar Racing chest logo and a full paddock-portrait back graphic. 380 GSM brushed fleece with a structured oversized shoulder. Limited run, no restocks promised.',
    fabric: '380 GSM brushed fleece',
    gsm: 380,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: photo('ajith-kumar-racing-hoodie-white'),
    colors: [C.white, C.beige],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.8,
    reviewCount: 158,
    isNewArrival: true,
    isBestseller: false,
    isDrop: true,
    designer: 'Pixel Riot',
    badge: 'drop',
  },

  // ---- Oversized tees (₹400) ----
  {
    id: 'ot01',
    slug: 'suriya-kaaval-karuppu',
    name: 'Suriya · Kaaval Karuppu',
    category: 'oversized-t-shirts',
    collections: ['streetwear', 'college'],
    price: 40000,
    description:
      'Bold tribute tee — flaming SURIYA wordmark on the chest and a full Kaaval Karuppu back graphic. 240 GSM combed cotton, drop-shoulder oversized cut that sits heavy and falls clean.',
    fabric: '240 GSM combed cotton',
    gsm: 240,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: photo('suriya-kaaval-karuppu'),
    colors: [C.black, C.white],
    sizes: TEE_SIZES,
    outOfStock: ['XS'],
    inStock: true,
    rating: 4.7,
    reviewCount: 96,
    isNewArrival: true,
    isBestseller: true,
    designer: 'Madras Mafia',
    badge: 'bestseller',
  },
  {
    id: 'ot02',
    slug: 'karppu',
    name: 'Karppu',
    category: 'oversized-t-shirts',
    collections: ['streetwear'],
    price: 40000,
    description:
      'Minimal-meets-loud. A red Karppu wordmark on the front, a full cinematic back print. 240 GSM combed cotton with a relaxed boxy body and ribbed crew neck.',
    fabric: '240 GSM combed cotton',
    gsm: 240,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: photo('karppu'),
    colors: [C.black, C.beige],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.6,
    reviewCount: 74,
    isNewArrival: false,
    isBestseller: true,
    designer: 'Madras Mafia',
    badge: 'bestseller',
  },
  {
    id: 'ot03',
    slug: 'ajith-kumar-racing-mk',
    name: "Ajith Kumar Racing 'MK'",
    category: 'oversized-t-shirts',
    collections: ['streetwear', 'creator'],
    price: 40000,
    description:
      "The 'MK' racing tee — Ajith Kumar Racing front logo and a big back-print 'MK' grid graphic with the race car. 240 GSM combed cotton, oversized fit built for layering over the AK hoodie.",
    fabric: '240 GSM combed cotton',
    gsm: 240,
    fit: 'oversized',
    origin: 'Designed & printed in India',
    images: photo('ajith-kumar-racing-mk'),
    colors: [C.white, C.black],
    sizes: TEE_SIZES,
    outOfStock: ['XXXL'],
    inStock: true,
    rating: 4.8,
    reviewCount: 130,
    isNewArrival: true,
    isBestseller: false,
    designer: 'Pixel Riot',
    badge: 'new',
  },

  // ---- Regular-fit tees (₹300) ----
  {
    id: 'rt01',
    slug: 'karuppu-god-mode',
    name: 'Karuppu · God Mode',
    category: 'regular-fit-t-shirts',
    collections: ['gym', 'streetwear'],
    price: 30000,
    description:
      'God Mode activated — a fiery front graphic and a Nayippin Nayagan back hit. 190 GSM bio-washed cotton in a true regular fit that wears soft from the first day.',
    fabric: '190 GSM bio-washed cotton',
    gsm: 190,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: photo('karuppu-god-mode'),
    colors: [C.black, C.white],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.5,
    reviewCount: 64,
    isNewArrival: false,
    isBestseller: true,
    designer: 'Madras Mafia',
    badge: 'bestseller',
  },
  {
    id: 'rt02',
    slug: 'retro-eyes-v-neck',
    name: 'Retro Eyes V-Neck',
    category: 'regular-fit-t-shirts',
    collections: ['college'],
    price: 30000,
    description:
      'Retro-printed red eyes on a flattering V-neck, with a portrait back panel. 180 GSM combed cotton, regular fit with a slightly tapered body. Quiet on the front, loud on the back.',
    fabric: '180 GSM combed cotton',
    gsm: 180,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: photo('retro-eyes-v-neck'),
    colors: [C.black, C.white],
    sizes: TEE_SIZES,
    outOfStock: ['S'],
    inStock: true,
    rating: 4.4,
    reviewCount: 41,
    isNewArrival: true,
    isBestseller: false,
    badge: 'new',
  },
  {
    id: 'rt03',
    slug: 'tamizhaga-vetri-flag',
    name: 'Tamizhaga Vetri Flag',
    category: 'regular-fit-t-shirts',
    collections: ['college', 'streetwear'],
    price: 30000,
    description:
      'Wear the win — a flag-waving front graphic and a Tamizhaga Vetri back print. 185 GSM combed cotton, regular fit, pre-shrunk so it holds shape wash after wash.',
    fabric: '185 GSM combed cotton',
    gsm: 185,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: photo('tamizhaga-vetri-flag'),
    colors: [C.white, C.black],
    sizes: TEE_SIZES,
    outOfStock: [],
    inStock: true,
    rating: 4.6,
    reviewCount: 58,
    isNewArrival: false,
    isBestseller: false,
    badge: 'restock',
  },

  // ---- Polo (₹350) ----
  {
    id: 'pl01',
    slug: '24h-series-racing-polo',
    name: '24H Series Racing Polo',
    category: 'polo-shirts',
    collections: ['streetwear', 'creator'],
    price: 35000,
    description:
      'Endurance-racing polo in race-red with a white collar, full sponsor layout, and a 24H Series Racing Team back print. 220 GSM piqué knit, regular fit, zip placket. Paddock-ready, street-approved.',
    fabric: '220 GSM piqué',
    gsm: 220,
    fit: 'regular',
    origin: 'Designed & printed in India',
    images: photo('24h-series-racing-polo'),
    colors: [C.red, C.white, C.blue],
    sizes: TEE_SIZES,
    outOfStock: ['XXXL'],
    inStock: true,
    rating: 4.7,
    reviewCount: 39,
    isNewArrival: true,
    isBestseller: false,
    designer: 'Pixel Riot',
    badge: 'new',
  },
]

// ---- Graphic / streetwear catalog (real product photos in /public/products) ----

const CAT_META: Record<Category, { fabric: string; gsm?: number; fit: Fit }> = {
  'oversized-t-shirts': { fabric: '240 GSM combed cotton', gsm: 240, fit: 'oversized' },
  'graphic-tees': { fabric: '240 GSM combed cotton', gsm: 240, fit: 'relaxed' },
  'streetwear-collection': { fabric: '240 GSM combed cotton', gsm: 240, fit: 'oversized' },
  'anime-collection': { fabric: '240 GSM combed cotton', gsm: 240, fit: 'oversized' },
  'regular-fit-t-shirts': { fabric: '185 GSM combed cotton', gsm: 185, fit: 'regular' },
  'polo-shirts': { fabric: '220 GSM piqué', gsm: 220, fit: 'regular' },
  hoodies: { fabric: '380 GSM brushed fleece', gsm: 380, fit: 'oversized' },
  sweatshirts: { fabric: '320 GSM loop-knit fleece', gsm: 320, fit: 'relaxed' },
  'crop-tops': { fabric: '220 GSM combed cotton', gsm: 220, fit: 'boxy' },
  jackets: { fabric: 'Wind-resistant shell', fit: 'relaxed' },
  accessories: { fabric: 'Cotton twill', fit: 'regular' },
}

interface Seed {
  id: string
  slug: string
  name: string
  category: Category
  color: Swatch
  price: number
  desc: string
  coll: string[]
  ext?: 'jpg' | 'webp'
  drop?: boolean
}

const RATINGS = [4.8, 4.6, 4.7, 4.5, 4.9, 4.4, 4.7, 4.6]

function expand(s: Seed, i: number): Product {
  const m = CAT_META[s.category]
  const best = i % 4 === 1
  const isNew = !best && i % 3 === 0
  const drop = s.drop ?? false
  const badge: Badge | undefined = drop ? 'drop' : best ? 'bestseller' : isNew ? 'new' : undefined
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    category: s.category,
    collections: s.coll,
    price: s.price,
    description: s.desc,
    fabric: m.fabric,
    gsm: m.gsm,
    fit: m.fit,
    origin: 'Designed & printed in India',
    images: [`/products/${s.slug}.${s.ext ?? 'jpg'}`],
    colors: [s.color],
    sizes: TEE_SIZES,
    outOfStock: i % 6 === 0 ? ['XXXL'] : [],
    inStock: true,
    rating: RATINGS[i % RATINGS.length],
    reviewCount: 24 + i * 11,
    isNewArrival: isNew || drop,
    isBestseller: best,
    isDrop: drop || undefined,
    designer: s.category === 'polo-shirts' || s.category === 'hoodies' ? 'Pixel Riot' : undefined,
    badge,
  }
}

const SEEDS: Seed[] = [
  { id: 's01', slug: 'never-give-up-tee', name: 'Never Give Up Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['gym', 'streetwear'], desc: "A bold 'Never Give Up' typographic print with fiery gradient accents — hits as hard as your hustle." },
  { id: 's02', slug: 'self-love-oversized-tee', name: 'Self Love Oversized Tee', category: 'oversized-t-shirts', color: C.black, price: 40000, coll: ['streetwear', 'college'], desc: "'Embracing Imperfections · Self Love' celestial floral artwork on a boxy oversized fit built to flex." },
  { id: 's03', slug: 'drawing-attention-oversized-tee', name: 'Drawing Attention Oversized Tee', category: 'oversized-t-shirts', color: C.grey, price: 40000, coll: ['streetwear'], desc: 'Minimal Japanese-inspired back print on a relaxed drop-shoulder oversized fit.' },
  { id: 's04', slug: 'beautiful-people-oversized-tee', name: 'Beautiful People Oversized Tee', category: 'oversized-t-shirts', color: C.black, price: 40000, coll: ['streetwear', 'college'], desc: "Front-and-back 'Beautiful People' doodle graphics on an oversized silhouette that owns the street." },
  { id: 's05', slug: 'reaper-skull-oversized-tee', name: 'Reaper Skull Oversized Tee', category: 'oversized-t-shirts', color: C.black, price: 40000, coll: ['streetwear'], drop: true, desc: 'A monochrome reaper-skull collage sprawls across a drop-shoulder oversized fit for max menace.' },
  { id: 's06', slug: 'certified-racer-tee', name: 'Certified Racer Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['gym', 'streetwear'], desc: 'A red superbike moto graphic fires across a tee built for speed.' },
  { id: 's07', slug: 'black-clover-demon-tee', name: 'Black Clover Demon Tee', category: 'anime-collection', color: C.black, price: 40000, coll: ['streetwear'], desc: 'A horned demon skull with manga lettering haunts this anime drop for true fans.' },
  { id: 's08', slug: 'justice-is-dead-tee', name: 'Justice Is Dead Tee', category: 'graphic-tees', color: C.navy, price: 40000, coll: ['streetwear'], desc: "Neon-soaked 'Justice Is Dead' skeleton artwork with unapologetic streetwear edge." },
  { id: 's09', slug: 'new-dimension-streetwear-tee', name: 'New Dimension Tee', category: 'streetwear-collection', color: C.black, price: 40000, coll: ['streetwear'], desc: "A red-on-black 'New Dimension' barcode panel straight from the underground." },
  { id: 's10', slug: 'bad-bear-streetwear-tee', name: 'Bad Bear Tee', category: 'streetwear-collection', color: C.navy, price: 40000, coll: ['streetwear', 'college'], desc: "Front pocket hit and a full-back 'Bad Bear' graffiti print made for the bold." },
  { id: 's11', slug: 'pacific-ocean-palm-tee', name: 'Pacific Ocean Palm Tee', category: 'regular-fit-t-shirts', color: C.beige, price: 30000, coll: ['college'], desc: "A clean 'Pacific Ocean' palm-tree badge on a soft regular-fit tee for easy everyday wear." },
  { id: 's12', slug: 'adventure-line-polo', name: 'Adventure Line Polo', category: 'polo-shirts', color: C.black, price: 35000, coll: ['creator'], desc: "Tipped collar and subtle 'Adventure' line-art graphic on a breathable piqué polo." },
  { id: 's13', slug: 'teal-logo-tipped-polo', name: 'Teal Logo Tipped Polo', category: 'polo-shirts', color: C.blue, price: 35000, coll: ['creator'], desc: 'A customisable chest-logo polo in rich teal with crisp white tipping.' },
  { id: 's14', slug: 'navy-lotus-logo-polo', name: 'Navy Lotus Logo Polo', category: 'polo-shirts', color: C.navy, price: 35000, coll: ['creator'], desc: 'A sharp navy piqué polo with white-tipped collar and embroidered lotus logo.' },
  { id: 's15', slug: 'beige-contrast-collar-polo', name: 'Beige Contrast Collar Polo', category: 'polo-shirts', color: C.beige, price: 35000, coll: ['creator'], desc: 'Textured beige piqué polo with a contrast knit collar and tiny chest emblem.' },
  { id: 's16', slug: 'ladakh-scouts-ram-polo', name: 'Ladakh Scouts Ram Polo', category: 'polo-shirts', color: C.black, price: 35000, coll: ['creator', 'streetwear'], desc: "A black 'Ladakh Scouts' polo with a swirling line-art ram graphic." },
  { id: 's17', slug: 'player-01-phoenix-polo', name: 'Player 01 Phoenix Polo', category: 'polo-shirts', color: C.black, price: 35000, coll: ['creator', 'gym'], desc: "Front-and-back 'Player 01' phoenix sublimation engineered for game day." },
  { id: 's18', slug: 'hope-safety-pin-tee', name: 'Hope Safety Pin Tee', category: 'graphic-tees', color: C.grey, price: 40000, coll: ['college'], desc: "A clever 'HOPE' safety-pin typographic block print that speaks louder than words." },
  { id: 's19', slug: 'tree-of-life-goddess-tee', name: 'Tree Of Life Goddess Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['streetwear'], desc: "An intricate 'Tree of Life' goddess illustration for soulful street style." },
  { id: 's20', slug: 'not-who-you-think-tee', name: 'Not Who You Think Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['streetwear', 'college'], desc: "'I'm Not Who You Think I Am' layered typographic print with attitude." },
  { id: 's21', slug: 'kolkata-tram-heritage-tee', name: 'Kolkata Tram Heritage Tee', category: 'graphic-tees', color: C.white, price: 40000, coll: ['college'], desc: 'A hand-drawn Kolkata tram, rickshaw and skyline illustration — India-first to the core.' },
  { id: 's22', slug: 'guess-grunge-photo-tee', name: 'Grunge Photo Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['streetwear'], desc: 'A distressed photo-collage print with raw streetwear energy.' },
  { id: 's23', slug: 'powered-by-ai-tee', name: 'Powered By AI Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['college'], desc: "A playful 'Powered By AI' robot circuit graphic for the future-forward crew." },
  { id: 's24', slug: 'mahadev-trishul-oversized-tee', name: 'Mahadev Trishul Oversized Tee', category: 'oversized-t-shirts', color: C.black, price: 40000, coll: ['streetwear'], desc: "A glowing blue 'Mahadev' back print with trishul detailing — devotion meets drip." },
  { id: 's25', slug: 'nataraja-shiva-tee', name: 'Nataraja Shiva Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['streetwear'], desc: 'A striking white Nataraja dancing-Shiva print circled in flames.' },
  { id: 's26', slug: 'discipline-hands-tee', name: 'Discipline Hands Tee', category: 'graphic-tees', color: C.black, price: 40000, coll: ['gym'], desc: "A minimalist 'Discipline' reaching-hands back print to keep your mindset on lock." },
  { id: 's27', slug: 'ronaldo-strike-oversized-tee', name: 'Striker Sketch Oversized Tee', category: 'oversized-t-shirts', color: C.blue, price: 40000, coll: ['gym', 'college'], desc: 'A sketched football-striker back print on a sky-blue oversized fit for the pitch-obsessed.' },
  { id: 's28', slug: 'wolf-spirit-oversized-tee', name: 'Wolf Spirit Oversized Tee', category: 'oversized-t-shirts', color: C.black, price: 40000, coll: ['streetwear'], desc: 'A fierce autumn-wreathed wolf back print for lone-wolf energy.' },
  { id: 's29', slug: 'blue-faces-washed-hoodie', name: 'Blue Faces Washed Hoodie', category: 'hoodies', color: C.black, price: 50000, coll: ['streetwear', 'creator'], desc: 'An acid-washed fleece hoodie with bold blue cloud-face graphics and red sleeve hits.' },
  { id: 's30', slug: 'god-loves-you-hoodie', name: 'God Loves You Hoodie', category: 'hoodies', color: C.blue, price: 50000, coll: ['streetwear', 'creator'], desc: "A bold 'God Loves You' scripture back print on a cozy fleece hoodie." },
  { id: 's31', slug: 'money-over-everything-hoodie', name: 'Money Over Everything Hoodie', category: 'hoodies', color: C.black, price: 50000, coll: ['streetwear', 'creator'], drop: true, desc: "A grungy pink 'Money Over Everything' skull-and-cash back print with raw hustle energy." },
  { id: 's32', slug: 'the-devil-throne-hoodie', name: 'The Devil Throne Hoodie', category: 'hoodies', color: C.black, price: 50000, coll: ['streetwear', 'creator'], drop: true, desc: "A dark crimson 'The Devil' throned-demon back print for gothic streetwear heat." },
  { id: 's33', slug: 'i-can-i-will-hoodie', name: 'I Can I Will Hoodie', category: 'hoodies', color: C.grey, price: 50000, coll: ['gym', 'creator'], desc: "A triple-stacked 'ICANIWILL' bubble-text back print that powers your grind." },
  { id: 's34', slug: 'deep-space-universe-hoodie', name: 'Deep Space Universe Hoodie', category: 'hoodies', color: C.maroon, price: 50000, coll: ['streetwear', 'creator'], desc: "A playful 'Universe · Deep Space' doodle back print for cosmic street vibes." },
  { id: 's35', slug: 'official-roses-oversized-tee', name: 'Official Roses Oversized Tee', category: 'oversized-t-shirts', color: C.black, price: 40000, coll: ['streetwear', 'college'], desc: "A 'Limited Edition Official' rose-collage back print with global streetwear flair." },
  { id: 's36', slug: 'pi-mathlete-hoodie', name: 'Pi Mathlete Hoodie', category: 'hoodies', color: C.black, price: 50000, coll: ['college', 'creator'], desc: "A clean white 'Pi Mathlete' front print on a heavyweight fleece hoodie." },
  { id: 's37', slug: 'i-love-bbq-sauce-hoodie', name: 'I Love BBQ Sauce Hoodie', category: 'hoodies', color: C.black, price: 50000, coll: ['streetwear', 'creator'], desc: "A bold 'I Love BBQ Sauce' heart-graphic front print with cheeky comfort-food swagger." },
  { id: 's38', slug: 'but-first-coffee-tee', name: 'But First Coffee Tee', category: 'graphic-tees', color: C.black, price: 40000, ext: 'webp', coll: ['college', 'streetwear'], desc: "Front chest hit and a full-back 'But First Coffee' mascot graphic for caffeine-fueled days." },
]

export const PRODUCTS: Product[] = [...CINEMA, ...SEEDS.map(expand)]

// ---- helpers ----

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getNewArrivals(): Product[] {
  return PRODUCTS.filter((p) => p.isNewArrival)
}

export function getBestsellers(): Product[] {
  return PRODUCTS.filter((p) => p.isBestseller)
}

export function getDrops(): Product[] {
  return PRODUCTS.filter((p) => p.isDrop)
}

export function getProductsByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat)
}

export function getProductsByCollection(collection: string): Product[] {
  return PRODUCTS.filter((p) => p.collections?.includes(collection))
}

export function getRelated(product: Product, limit = 4): Product[] {
  const sameCat = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category)
  const fill = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category)
  return [...sameCat, ...fill].slice(0, limit)
}
