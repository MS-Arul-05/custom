import { Suspense } from 'react'
import type { Metadata } from 'next'
import ShopClient from '@/components/product/ShopClient'

export const metadata: Metadata = {
  title: 'Shop All — Tees, Hoodies & Drops',
  description:
    'Browse FITBOX oversized tees, graphic tees, hoodies, polos and more. Filter by category, collection, fit, size and price.',
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="max-w-content mx-auto px-4 py-20 text-sm" style={{ color: 'var(--text-secondary)' }}>Loading shop…</div>}>
      <ShopClient />
    </Suspense>
  )
}
