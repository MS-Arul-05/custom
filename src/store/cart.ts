import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, NewCartItem } from '@/types'
import { cartKey } from '@/lib/utils'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: NewCartItem) => void
  removeItem: (key: string) => void
  updateQuantity: (key: string, qty: number) => void
  clear: () => void
  toggle: () => void
  open: () => void
  close: () => void
  subtotal: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) =>
        set((state) => {
          const key = cartKey(item.productId, item.size, item.color)
          const qty = item.quantity ?? 1
          const existing = state.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + qty } : i
              ),
              isOpen: true,
            }
          }
          return {
            items: [...state.items, { ...item, key, quantity: qty }],
            isOpen: true,
          }
        }),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      updateQuantity: (key, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity: qty } : i)),
        })),
      clear: () => set({ items: [] }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      subtotal: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'fitbox-cart',
      partialize: (s) => ({ items: s.items }),
    }
  )
)
