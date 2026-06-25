import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '@/store/cart'
import type { NewCartItem } from '@/types'

const base: NewCartItem = {
  kind: 'product',
  productId: 'ot01',
  name: 'Suriya · Kaaval Karuppu',
  price: 40000,
  size: 'M',
  color: 'Black',
  image: 'x.jpg',
}

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false })
  })

  it('adds an item with a computed key and quantity 1', () => {
    useCartStore.getState().addItem(base)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].key).toBe('ot01|M|Black')
    expect(items[0].quantity).toBe(1)
  })

  it('increments quantity for the same variant instead of duplicating', () => {
    const s = useCartStore.getState()
    s.addItem(base)
    s.addItem(base)
    const { items } = useCartStore.getState()
    expect(items).toHaveLength(1)
    expect(items[0].quantity).toBe(2)
  })

  it('keeps different sizes/colors as separate lines', () => {
    const s = useCartStore.getState()
    s.addItem(base)
    s.addItem({ ...base, size: 'L' })
    s.addItem({ ...base, color: 'White' })
    expect(useCartStore.getState().items).toHaveLength(3)
  })

  it('supports custom and mystery_box kinds', () => {
    const s = useCartStore.getState()
    s.addItem({ ...base, kind: 'custom', productId: 'custom-oversized-black', name: 'Custom Oversized Tee' })
    s.addItem({ ...base, kind: 'mystery_box', productId: 'mystery-anime-gold', name: 'Gold Mystery Box', size: 'Surprise' })
    const kinds = useCartStore.getState().items.map((i) => i.kind)
    expect(kinds).toContain('custom')
    expect(kinds).toContain('mystery_box')
  })

  it('updates quantity by key and removes at zero', () => {
    const s = useCartStore.getState()
    s.addItem(base)
    const key = useCartStore.getState().items[0].key
    s.updateQuantity(key, 5)
    expect(useCartStore.getState().items[0].quantity).toBe(5)
    s.updateQuantity(key, 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('removes an item by key', () => {
    const s = useCartStore.getState()
    s.addItem(base)
    s.removeItem('ot01|M|Black')
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('computes subtotal and itemCount across quantities', () => {
    const s = useCartStore.getState()
    s.addItem(base) // 40000
    s.addItem({ ...base, size: 'L', price: 30000 })
    s.updateQuantity('ot01|L|Black', 2) // 60000
    expect(useCartStore.getState().subtotal()).toBe(100000)
    expect(useCartStore.getState().itemCount()).toBe(3)
  })

  it('clear empties the cart', () => {
    const s = useCartStore.getState()
    s.addItem(base)
    s.clear()
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
