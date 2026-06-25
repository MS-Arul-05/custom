import { describe, it, expect } from 'vitest'
import { formatPrice, shippingFor, cartKey, slugify, FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING } from '@/lib/utils'

describe('formatPrice (INR paise)', () => {
  it('formats paise to whole-rupee strings with ₹', () => {
    expect(formatPrice(49900)).toBe('₹499')
    expect(formatPrice(50000)).toBe('₹500')
    expect(formatPrice(0)).toBe('₹0')
  })

  it('shows no paise fraction', () => {
    expect(formatPrice(40050)).toBe('₹401') // rounds, never shows decimals
    expect(formatPrice(149900)).toContain('₹')
    expect(formatPrice(149900)).not.toContain('.')
  })

  it('groups thousands in the Indian system', () => {
    expect(formatPrice(129900)).toBe('₹1,299')
    expect(formatPrice(1000000)).toBe('₹10,000')
  })
})

describe('shippingFor', () => {
  it('is free at or above the ₹1499 threshold', () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD)).toBe(0)
    expect(shippingFor(200000)).toBe(0)
  })
  it('charges flat ₹79 below the threshold', () => {
    expect(shippingFor(FREE_SHIPPING_THRESHOLD - 1)).toBe(STANDARD_SHIPPING)
    expect(shippingFor(0)).toBe(STANDARD_SHIPPING)
  })
})

describe('cartKey', () => {
  it('joins product, size and color', () => {
    expect(cartKey('p1', 'M', 'Black')).toBe('p1|M|Black')
  })
  it('distinguishes variants', () => {
    expect(cartKey('p1', 'M', 'Black')).not.toBe(cartKey('p1', 'L', 'Black'))
  })
})

describe('slugify', () => {
  it('lowercases and hyphenates', () => {
    expect(slugify('Ajith Kumar Racing Hoodie')).toBe('ajith-kumar-racing-hoodie')
  })
  it('strips punctuation and trims dashes', () => {
    expect(slugify("Karuppu · God Mode!")).toBe('karuppu-god-mode')
  })
})
