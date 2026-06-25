import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PRODUCTS, getProductBySlug, getRelated } from '@/lib/products'
import { formatPrice } from '@/lib/utils'
import ProductDetailClient from './ProductDetailClient'

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
  if (!product) notFound()
  const related = getRelated(product, 4)
  return <ProductDetailClient product={product} related={related} />
}
