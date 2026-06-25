import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Flame } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

export default function DropsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null
  return (
    <section style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-4"
              style={{ background: 'rgba(255,107,0,0.18)', color: 'var(--accent)' }}
            >
              <Flame size={13} /> Live now
            </span>
            <h2 className="font-heading font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}>
              Limited Drops
            </h2>
            <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Small runs. No restock promises. When they&apos;re gone, they&apos;re gone.
            </p>
          </div>
          <Link href="/drops" className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-white shrink-0">
            All drops <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 4).map((p) => (
            <Link key={p.id} href={`/shop/${p.slug}`} className="group block">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-card"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                <Image
                  src={p.images[0]}
                  alt={`${p.name} — front and back`}
                  fill
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <span
                  className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-badge text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  Drop
                </span>
              </div>
              <p className="text-sm font-semibold mt-3 text-white">{p.name}</p>
              <p className="text-sm font-bold mt-0.5" style={{ color: 'var(--accent)' }}>
                {formatPrice(p.salePrice ?? p.price)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
