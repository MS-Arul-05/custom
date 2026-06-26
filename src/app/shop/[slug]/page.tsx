import type { Metadata } from 'next'
import { PRODUCTS, getProductBySlug, getRelated } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import ProductDetailClient from './ProductDetailClient'
import AdminProductFallback from './AdminProductFallback'

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product not found' }
  return {
    title: `${product.name} — ${formatPrice(product.salePrice ?? product.price)}`,
    description: product.description.slice(0, 155),
    openGraph: { images: [product.images[0]] },
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  // Admin-uploaded products live in the browser (localStorage), so fall back to
  // a client lookup when the slug isn't in the static catalogue.
  if (!product) return <AdminProductFallback slug={params.slug} />
  const related = getRelated(product, 4)
  return <ProductDetailClient product={product} related={related} />
}
