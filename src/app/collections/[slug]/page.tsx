import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { COLLECTIONS, getCollection } from '@/lib/data'
import { getProductsByCollection } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getCollection(params.slug)
  return {
    title: c ? `${c.title} Collection` : 'Collection',
    description: c?.blurb,
  }
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug)
  if (!collection) notFound()
  const products = getProductsByCollection(collection.slug)

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/collections" className="hover:underline">Collections</Link> / <span style={{ color: 'var(--text-primary)' }}>{collection.title}</span>
      </nav>
      <h1 className="font-heading font-extrabold tracking-tight mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)' }}>
        {collection.title}
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--text-secondary)' }}>{collection.blurb}</p>

      {products.length === 0 ? (
        <p className="text-sm py-16 text-center" style={{ color: 'var(--text-secondary)' }}>
          Drops landing soon. <Link href="/shop" className="font-semibold underline" style={{ color: 'var(--accent)' }}>Shop all</Link>
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
