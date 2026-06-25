import type { Metadata } from 'next'
import Link from 'next/link'
import { Flame } from 'lucide-react'
import { getDrops, getNewArrivals } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Limited Drops',
  description: 'Small-run FITBOX drops. No restock promises. Cop them before they clear the grid.',
}

export default function DropsPage() {
  const drops = getDrops()
  const upcoming = getNewArrivals().filter((p) => !p.isDrop).slice(0, 4)

  return (
    <div>
      <section style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-4" style={{ background: 'rgba(255,107,0,0.18)', color: 'var(--accent)' }}>
            <Flame size={13} /> Live now
          </span>
          <h1 className="font-heading font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}>
            Limited Drops
          </h1>
          <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Small runs, big heat. When they&apos;re gone, they&apos;re gone — no restock promises.
          </p>
        </div>
      </section>

      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {drops.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {upcoming.length > 0 && (
          <>
            <h2 className="font-heading font-extrabold tracking-tight mt-16 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)' }}>
              Just landed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {upcoming.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}

        <div className="mt-14 text-center">
          <Link href="/customize" className="inline-flex items-center gap-2 h-12 px-8 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
            Can&apos;t wait? Design your own →
          </Link>
        </div>
      </div>
    </div>
  )
}
