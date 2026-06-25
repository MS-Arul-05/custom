import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProductsByCategory } from '@/lib/products'
import { CATEGORY_LABELS } from '@/components/product/FilterSidebar'
import type { Category } from '@/types'
import ProductCard from '@/components/product/ProductCard'

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[]

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }))
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const label = CATEGORY_LABELS[params.category as Category]
  return {
    title: label ? `${label}` : 'Shop',
    description: label ? `Shop FITBOX ${label.toLowerCase()} — bold prints, heavy fabric, India-first.` : undefined,
  }
}

export default function ShopCategoryPage({ params }: { params: { category: string } }) {
  const category = params.category as Category
  if (!CATEGORY_LABELS[category]) notFound()
  const products = getProductsByCategory(category)

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/shop" className="hover:underline">Shop</Link> / <span style={{ color: 'var(--text-primary)' }}>{CATEGORY_LABELS[category]}</span>
      </nav>
      <h1 className="font-heading font-extrabold tracking-tight mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)' }}>
        {CATEGORY_LABELS[category]}
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--text-secondary)' }}>
        {products.length} product{products.length !== 1 ? 's' : ''}
      </p>

      {products.length === 0 ? (
        <p className="text-sm py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
          Nothing here yet. <Link href="/shop" className="font-semibold underline" style={{ color: 'var(--accent)' }}>Shop all</Link>
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
