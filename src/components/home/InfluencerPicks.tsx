import Link from 'next/link'
import Image from 'next/image'
import { INFLUENCER_PICKS } from '@/lib/data'
import { getProductBySlug } from '@/lib/products'
import { formatPrice } from '@/lib/utils'

export default function InfluencerPicks() {
  return (
    <section style={{ background: 'var(--bg-surface)' }}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <h2 className="font-heading font-extrabold tracking-tight mb-2" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-primary)' }}>
          Influencer picks
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          The fits your timeline can&apos;t stop posting.
        </p>
        <div className="grid sm:grid-cols-3 gap-6">
          {INFLUENCER_PICKS.map((pick) => {
            const product = getProductBySlug(pick.productSlug)
            if (!product) return null
            return (
              <Link key={pick.id} href={`/shop/${product.slug}`} className="group block rounded-card overflow-hidden" style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={`${product.name} — front and back`}
                    fill
                    className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Image src={pick.avatar} alt={pick.name} width={32} height={32} className="rounded-full" />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{pick.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{pick.handle}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{pick.caption}&rdquo;
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{product.name}</span>
                    <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>{formatPrice(product.salePrice ?? product.price)}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
