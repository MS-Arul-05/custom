import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MYSTERY_CATEGORIES, getMysteryCategory } from '@/lib/data'
import { PRODUCTS, getProductsByCategory, getProductsByCollection, getBestsellers } from '@/lib/products'
import MysteryClient from './MysteryClient'

export function generateStaticParams() {
  return MYSTERY_CATEGORIES.map((c) => ({ category: c.slug }))
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const cat = getMysteryCategory(params.category)
  return {
    title: cat ? `${cat.title} Mystery Box` : 'Mystery Box',
    description: cat?.blurb,
  }
}

export default function MysteryCategoryPage({ params }: { params: { category: string } }) {
  const cat = getMysteryCategory(params.category)
  if (!cat) notFound()

  let pool =
    cat.slug === 'anime' ? getProductsByCategory('anime-collection') : getProductsByCollection(cat.slug)
  if (pool.length < 3) pool = [...pool, ...getBestsellers()]
  if (pool.length < 3) pool = PRODUCTS

  // de-dupe + cap
  const seen = new Set<string>()
  const unique = pool.filter((p) => (seen.has(p.id) ? false : seen.add(p.id)))

  return <MysteryClient category={cat} pool={unique.slice(0, 8)} />
}
