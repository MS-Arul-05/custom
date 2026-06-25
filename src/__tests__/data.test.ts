import { describe, it, expect } from 'vitest'
import {
  PRODUCTS, getProductBySlug, getNewArrivals, getBestsellers, getDrops,
  getProductsByCategory, getProductsByCollection, getRelated,
} from '@/lib/products'
import { COLLECTIONS, MYSTERY_TIERS, getCollection, getMysteryCategory } from '@/lib/data'
import { BUILDER_STYLES, generateAIDesign, CUSTOM_PRINT_FEE } from '@/lib/builder'

describe('catalog integrity', () => {
  it('has products with unique ids and slugs', () => {
    const ids = new Set(PRODUCTS.map((p) => p.id))
    const slugs = new Set(PRODUCTS.map((p) => p.slug))
    expect(ids.size).toBe(PRODUCTS.length)
    expect(slugs.size).toBe(PRODUCTS.length)
  })

  it('stores every price as a positive integer (paise)', () => {
    for (const p of PRODUCTS) {
      expect(Number.isInteger(p.price)).toBe(true)
      expect(p.price).toBeGreaterThan(0)
      if (p.salePrice != null) {
        expect(Number.isInteger(p.salePrice)).toBe(true)
        expect(p.salePrice).toBeLessThan(p.price)
      }
    }
  })

  it('includes the seed hoodie/tee/polo prices from the spec', () => {
    expect(getProductBySlug('ajith-kumar-racing-hoodie-black')?.price).toBe(50000)
    expect(getProductBySlug('suriya-kaaval-karuppu')?.price).toBe(40000)
    expect(getProductBySlug('karuppu-god-mode')?.price).toBe(30000)
    expect(getProductBySlug('24h-series-racing-polo')?.price).toBe(35000)
  })

  it('every product has at least one image, colour and size', () => {
    for (const p of PRODUCTS) {
      expect(p.images.length).toBeGreaterThan(0)
      expect(p.colors.length).toBeGreaterThan(0)
      expect(p.sizes.length).toBeGreaterThan(0)
    }
  })
})

describe('catalog selectors', () => {
  it('finds by slug, returns undefined when missing', () => {
    expect(getProductBySlug('karppu')?.name).toBe('Karppu')
    expect(getProductBySlug('nope')).toBeUndefined()
  })
  it('filters by flags', () => {
    expect(getNewArrivals().every((p) => p.isNewArrival)).toBe(true)
    expect(getBestsellers().every((p) => p.isBestseller)).toBe(true)
    expect(getDrops().every((p) => p.isDrop)).toBe(true)
  })
  it('filters by category and collection', () => {
    expect(getProductsByCategory('hoodies').length).toBeGreaterThan(0)
    expect(getProductsByCollection('streetwear').every((p) => p.collections?.includes('streetwear'))).toBe(true)
  })
  it('related excludes the product itself and returns the limit', () => {
    const p = PRODUCTS[0]
    const rel = getRelated(p, 4)
    expect(rel.length).toBe(4)
    expect(rel.find((r) => r.id === p.id)).toBeUndefined()
  })
})

describe('feature data', () => {
  it('has 4 collections resolvable by slug', () => {
    expect(COLLECTIONS).toHaveLength(4)
    expect(getCollection('gym')?.title).toBe('Gym')
    expect(getCollection('missing')).toBeUndefined()
  })
  it('mystery tiers match the spec prices', () => {
    const byId = Object.fromEntries(MYSTERY_TIERS.map((t) => [t.id, t.price]))
    expect(byId.bronze).toBe(79900)
    expect(byId.silver).toBe(149900)
    expect(byId.gold).toBe(249900)
  })
  it('resolves mystery categories', () => {
    expect(getMysteryCategory('anime')?.title).toBe('Anime')
  })
})

describe('builder', () => {
  it('exposes the four styles with paise base prices', () => {
    expect(BUILDER_STYLES.map((s) => s.id)).toEqual(['oversized', 'regular', 'hoodie', 'polo'])
    for (const s of BUILDER_STYLES) expect(Number.isInteger(s.basePrice)).toBe(true)
  })
  it('has a positive integer custom print fee', () => {
    expect(Number.isInteger(CUSTOM_PRINT_FEE)).toBe(true)
    expect(CUSTOM_PRINT_FEE).toBeGreaterThan(0)
  })
  it('AI generation resolves to a deterministic image url for a prompt', async () => {
    const a = await generateAIDesign('neon tiger')
    const b = await generateAIDesign('neon tiger')
    expect(a).toBe(b)
    expect(a).toContain('https://')
  })
})
