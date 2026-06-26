import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/types'

export type OrderStatus = 'pending' | 'confirmed' | 'printing' | 'shipped' | 'delivered'

export const ORDER_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'printing', 'shipped', 'delivered']

export interface AdminOrder {
  id: string
  createdAt: number
  source: 'checkout' | 'custom'
  customer: { name: string; email: string; phone: string; address: string }
  summary: string
  quantity: number
  total: number // paise
  status: OrderStatus
  /** Optional preview/design image (hosted URL or small data URL). */
  preview?: string
}

interface AdminStore {
  products: Product[]
  orders: AdminOrder[]
  addProduct: (p: Product) => void
  removeProduct: (id: string) => void
  addOrder: (o: Omit<AdminOrder, 'id' | 'createdAt' | 'status'> & { status?: OrderStatus }) => void
  updateOrderStatus: (id: string, status: OrderStatus) => void
  removeOrder: (id: string) => void
  clearOrders: () => void
}

// Keep localStorage well under quota — drop oversized preview data URLs.
function trimPreview(preview?: string): string | undefined {
  if (!preview) return undefined
  if (preview.startsWith('data:') && preview.length > 600_000) return undefined
  return preview
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      products: [],
      orders: [],
      addProduct: (p) => set((s) => ({ products: [p, ...s.products] })),
      removeProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),
      addOrder: (o) =>
        set((s) => ({
          orders: [
            {
              ...o,
              preview: trimPreview(o.preview),
              id: `FB${Math.floor(100000 + Math.random() * 900000)}`,
              createdAt: Date.now(),
              status: o.status ?? 'pending',
            },
            ...s.orders,
          ],
        })),
      updateOrderStatus: (id, status) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),
      removeOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),
      clearOrders: () => set({ orders: [] }),
    }),
    { name: 'fitbox-admin' }
  )
)
