// ---- Catalog ----

export type Category =
  | 'oversized-t-shirts'
  | 'regular-fit-t-shirts'
  | 'graphic-tees'
  | 'anime-collection'
  | 'streetwear-collection'
  | 'hoodies'
  | 'sweatshirts'
  | 'polo-shirts'
  | 'crop-tops'
  | 'jackets'
  | 'accessories'

export type Fit = 'oversized' | 'regular' | 'relaxed' | 'boxy' | 'slim'

export type Badge = 'new' | 'bestseller' | 'drop' | 'restock'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  collections?: string[]
  price: number // integer INR paise
  salePrice?: number | null
  description: string
  fabric: string
  gsm?: number
  fit: Fit
  origin: string
  images: string[]
  colors: ProductColor[]
  sizes: string[]
  outOfStock?: string[]
  inStock: boolean
  rating?: number
  reviewCount?: number
  isNewArrival: boolean
  isBestseller: boolean
  isDrop?: boolean
  designer?: string
  badge?: Badge
}

// ---- Cart ----

export type CartItemKind = 'product' | 'custom' | 'mystery_box'

export interface CartItem {
  key: string // `${productId}|${size}|${color}`
  kind: CartItemKind
  productId: string
  name: string
  price: number // paise
  size: string
  color: string
  quantity: number
  image: string
  /** Custom-builder summary or mystery-box tier details, shown in cart/checkout. */
  meta?: Record<string, string>
}

/** Shape callers pass to addItem — key + quantity are filled in by the store. */
export type NewCartItem = Omit<CartItem, 'key' | 'quantity'> & { quantity?: number }
