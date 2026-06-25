import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BadgeCheck, ArrowRight, Sparkles } from 'lucide-react'
import { DESIGNERS } from '@/lib/data'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'Designer Marketplace',
  description: 'Discover independent designers dropping limited collabs on FITBOX. Follow your favourites and cop their fits.',
}

export default function DesignerPage() {
  const designerProducts = PRODUCTS.filter((p) => p.designer)

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] mb-2" style={{ color: 'var(--accent)' }}>
          <Sparkles size={14} /> Community marketplace
        </span>
        <h1 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)' }}>
          Designer Marketplace
        </h1>
        <p className="text-sm mt-2 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
          Independent artists dropping limited collabs. Follow your favourites, cop their fits, and earn on every sale.
        </p>
      </div>

      {/* Designers */}
      <div className="grid sm:grid-cols-3 gap-5 mb-16">
        {DESIGNERS.map((d) => (
          <div key={d.id} className="rounded-card p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex items-center gap-3 mb-3">
              <Image src={d.avatar} alt={d.name} width={48} height={48} className="rounded-full" />
              <div>
                <p className="font-bold text-sm flex items-center gap-1" style={{ color: 'var(--text-primary)' }}>
                  {d.name} <BadgeCheck size={14} style={{ color: 'var(--accent)' }} />
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d.handle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{d.bio}</p>
            <div className="flex items-center justify-between text-xs" style={{ color: 'var(--text-tertiary)' }}>
              <span><span className="font-bold" style={{ color: 'var(--text-primary)' }}>{d.followers}</span> followers</span>
              <span><span className="font-bold" style={{ color: 'var(--text-primary)' }}>{d.drops}</span> drops</span>
            </div>
          </div>
        ))}
      </div>

      {/* Their fits */}
      <h2 className="font-heading font-extrabold tracking-tight mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)' }}>
        Fits from the marketplace
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {designerProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* Become a designer */}
      <div className="mt-16 rounded-modal p-8 md:p-12 text-center" style={{ background: 'var(--bg-dark)' }}>
        <h2 className="font-heading font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
          Sell your designs on FITBOX
        </h2>
        <p className="text-sm mt-3 mb-6 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Upload your art, set your cut, and we handle printing, shipping and payments. You design — we do the rest.
        </p>
        <Link href="/customize" className="inline-flex items-center gap-2 h-12 px-8 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
          Start designing <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
