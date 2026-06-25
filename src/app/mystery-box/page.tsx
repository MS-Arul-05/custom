import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Gift, ArrowRight, Sparkles } from 'lucide-react'
import { MYSTERY_CATEGORIES, MYSTERY_TIERS } from '@/lib/data'
import { formatPrice } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Mystery Box — Unbox a Surprise Fit',
  description:
    'Pick a vibe, choose your tier, and unbox a surprise FITBOX fit worth more than you paid. Bronze, Silver and Gold mystery boxes.',
}

export default function MysteryBoxPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--bg-dark)' }}>
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-5" style={{ background: 'rgba(255,107,0,0.18)', color: 'var(--accent)' }}>
            <Gift size={13} /> Always worth more than you pay
          </span>
          <h1 className="font-heading font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}>
            Unbox a mystery fit
          </h1>
          <p className="text-base mt-4 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
            Pick your vibe, choose a tier, and let the algorithm surprise you. Every box beats its price.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <h2 className="font-heading font-extrabold tracking-tight mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)' }}>
          1. Pick your vibe
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MYSTERY_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/mystery-box/${c.slug}`} className="group block rounded-card overflow-hidden relative aspect-[4/5]">
              <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.82) 100%)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="text-3xl">{c.emoji}</span>
                <h3 className="font-heading font-bold text-xl text-white mt-1">{c.title}</h3>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{c.blurb}</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold mt-2" style={{ color: 'var(--accent)' }}>
                  Choose <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Tiers preview */}
        <h2 className="font-heading font-extrabold tracking-tight mt-16 mb-8" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)' }}>
          The tiers
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {MYSTERY_TIERS.map((t) => (
            <div key={t.id} className="rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{t.name}</h3>
                <Sparkles size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <p className="font-heading font-extrabold text-2xl mb-1" style={{ color: 'var(--accent)' }}>{formatPrice(t.price)}</p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{t.blurb}</p>
              <ul className="space-y-1.5">
                {t.perks.map((p) => (
                  <li key={p} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
