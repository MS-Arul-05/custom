// Custom T-shirt builder config + mock AI generation (client-side only).

export interface BuilderStyle {
  id: 'oversized' | 'regular' | 'hoodie' | 'polo'
  name: string
  basePrice: number // paise
  fabric: string
  image: string
}

export const BUILDER_STYLES: BuilderStyle[] = [
  {
    id: 'oversized',
    name: 'Oversized Tee',
    basePrice: 49900,
    fabric: '240 GSM combed cotton',
    image: '/products/suriya-kaaval-karuppu.jpg',
  },
  {
    id: 'regular',
    name: 'Regular Tee',
    basePrice: 39900,
    fabric: '190 GSM bio-washed cotton',
    image: '/products/karuppu-god-mode.jpg',
  },
  {
    id: 'hoodie',
    name: 'Hoodie',
    basePrice: 89900,
    fabric: '380 GSM brushed fleece',
    image: '/products/ajith-kumar-racing-hoodie-black.jpg',
  },
  {
    id: 'polo',
    name: 'Polo',
    basePrice: 59900,
    fabric: '220 GSM piqué',
    image: '/products/24h-series-racing-polo.jpg',
  },
]

export interface BuilderColor {
  name: string
  hex: string
  /** Text/print color that reads well on this garment. */
  contrast: string
}

export const BUILDER_COLORS: BuilderColor[] = [
  { name: 'White', hex: '#FFFFFF', contrast: '#1A1A1A' },
  { name: 'Black', hex: '#1A1A1A', contrast: '#FFFFFF' },
  { name: 'Beige', hex: '#E8DCC8', contrast: '#1A1A1A' },
  { name: 'Blue', hex: '#2B4C7E', contrast: '#FFFFFF' },
  { name: 'Green', hex: '#2E5E3A', contrast: '#FFFFFF' },
  { name: 'Red', hex: '#B3261E', contrast: '#FFFFFF' },
]

export const BUILDER_FONTS = [
  { id: 'heading', label: 'Display', css: 'var(--font-heading)' },
  { id: 'body', label: 'Clean', css: 'var(--font-body)' },
  { id: 'mono', label: 'Mono', css: 'ui-monospace, SFMono-Regular, Menlo, monospace' },
  { id: 'serif', label: 'Serif', css: 'Georgia, Cambria, serif' },
] as const

export type BuilderFontId = (typeof BUILDER_FONTS)[number]['id']

export interface DesignTemplate {
  id: string
  label: string
  emoji: string
}

export const DESIGN_TEMPLATES: DesignTemplate[] = [
  { id: 'flame', label: 'Flame', emoji: '🔥' },
  { id: 'skull', label: 'Skull', emoji: '💀' },
  { id: 'star', label: 'Star', emoji: '⭐' },
  { id: 'lightning', label: 'Lightning', emoji: '⚡' },
  { id: 'heart', label: 'Heart', emoji: '❤️' },
  { id: 'crown', label: 'Crown', emoji: '👑' },
  { id: 'wave', label: 'Wave', emoji: '🌊' },
  { id: 'rocket', label: 'Rocket', emoji: '🚀' },
]

export const TEXT_ALIGN = ['left', 'center', 'right'] as const
export type TextAlign = (typeof TEXT_ALIGN)[number]

export const CUSTOM_PRINT_FEE = 10000 // ₹100 add-on for a custom design/print

/**
 * Mock async "AI" design generation. Returns a deterministic placeholder image
 * URL derived from the prompt, after a short simulated delay.
 */
export function generateAIDesign(prompt: string): Promise<string> {
  const seed = encodeURIComponent(prompt.trim().toLowerCase().replace(/\s+/g, '-') || 'fitbox-ai')
  return new Promise((resolve) => {
    setTimeout(() => resolve(`https://picsum.photos/seed/ai-${seed}/600/600`), 1600)
  })
}
