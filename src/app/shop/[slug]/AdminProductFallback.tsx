'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useAdminStore } from '@/store/admin'
import type { Product } from '@/types'
import ProductDetailClient from './ProductDetailClient'

/** Client lookup for admin-uploaded products (stored in localStorage). */
export default function AdminProductFallback({ slug }: { slug: string }) {
  const products = useAdminStore((s) => s.products)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => setHydrated(true), [])

  const product: Product | undefined = products.find((p) => p.slug === slug)

  if (!hydrated) {
    return <div className="max-w-content mx-auto px-4 py-24 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>Loading…</div>
  }

  if (!product) {
    return (
      <div className="max-w-content mx-auto px-4 py-24 text-center">
        <h1 className="font-heading font-extrabold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>Product not found</h1>
        <Link href="/shop" className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn text-white" style={{ background: 'var(--accent)' }}>
          Back to shop
        </Link>
      </div>
    )
  }

  return <ProductDetailClient product={product} related={[]} />
}
