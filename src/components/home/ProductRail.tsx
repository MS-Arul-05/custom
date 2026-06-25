import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/types'
import ProductCard from '@/components/product/ProductCard'

interface Props {
  title: string
  subtitle?: string
  products: Product[]
  viewAllHref?: string
  priority?: boolean
}

export default function ProductRail({ title, subtitle, products, viewAllHref, priority }: Props) {
  if (products.length === 0) return null
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="flex items-end justify-between mb-8 gap-4">
        <div>
          <h2 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-primary)' }}>
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm mt-1.5" style={{ color: 'var(--text-secondary)' }}>
              {subtitle}
            </p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold shrink-0"
            style={{ color: 'var(--accent)' }}
          >
            View all <ArrowRight size={15} />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.slice(0, 4).map((p, i) => (
          <ProductCard key={p.id} product={p} priority={priority && i < 2} />
        ))}
      </div>
    </section>
  )
}
