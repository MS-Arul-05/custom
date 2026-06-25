'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Gift, Sparkles, ChevronLeft, Check, ShoppingBag, ArrowRight } from 'lucide-react'
import type { MysteryCategoryInfo, MysteryTier } from '@/lib/data'
import { MYSTERY_TIERS } from '@/lib/data'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

type Phase = 'select' | 'unboxing' | 'revealed'

export default function MysteryClient({ category, pool }: { category: MysteryCategoryInfo; pool: Product[] }) {
  const addItem = useCartStore((s) => s.addItem)
  const prefersReduced = useReducedMotion()
  const [tier, setTier] = useState<MysteryTier>(MYSTERY_TIERS[1])
  const [phase, setPhase] = useState<Phase>('select')
  const [reveal, setReveal] = useState<Product[]>([])
  const [added, setAdded] = useState(false)

  const revealCount = tier.id === 'bronze' ? 1 : tier.id === 'silver' ? 3 : 4

  const openBox = () => {
    // Pick a pseudo-random slice based on tier + time-free index rotation.
    const start = pool.length ? (revealCount * (MYSTERY_TIERS.indexOf(tier) + 1)) % pool.length : 0
    const picks: Product[] = []
    for (let i = 0; i < revealCount && pool.length; i++) {
      picks.push(pool[(start + i) % pool.length])
    }
    setReveal(picks)
    setPhase('unboxing')
    setTimeout(() => setPhase('revealed'), prefersReduced ? 0 : 1800)
  }

  const addBoxToCart = () => {
    addItem({
      kind: 'mystery_box',
      productId: `mystery-${category.slug}-${tier.id}`,
      name: `${tier.name} Mystery Box — ${category.title}`,
      price: tier.price,
      size: 'Surprise',
      color: category.title,
      image: reveal[0]?.images[0] ?? category.image,
      meta: { summary: `${tier.itemCount} · ${category.title} vibe` },
    })
    setAdded(true)
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      <Link href="/mystery-box" className="inline-flex items-center gap-1 text-sm font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
        <ChevronLeft size={16} /> All vibes
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">{category.emoji}</span>
        <div>
          <h1 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}>
            {category.title} Mystery Box
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{category.blurb}</p>
        </div>
      </div>

      {/* SELECT */}
      {phase === 'select' && (
        <div className="grid lg:grid-cols-3 gap-5">
          {MYSTERY_TIERS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTier(t)}
              className="rounded-card p-6 text-left transition-all"
              style={{
                border: `2px solid ${tier.id === t.id ? 'var(--accent)' : 'var(--border)'}`,
                background: tier.id === t.id ? 'var(--accent-light)' : 'var(--bg-surface)',
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{t.name}</h3>
                {tier.id === t.id && <Check size={18} style={{ color: 'var(--accent)' }} />}
              </div>
              <p className="font-heading font-extrabold text-2xl mb-1" style={{ color: 'var(--accent)' }}>{formatPrice(t.price)}</p>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{t.itemCount} · {t.blurb}</p>
              <ul className="space-y-1.5">
                {t.perks.map((p) => (
                  <li key={p} className="text-sm flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> {p}
                  </li>
                ))}
              </ul>
            </button>
          ))}
          <div className="lg:col-span-3 flex justify-center mt-2">
            <button type="button" onClick={openBox} className="inline-flex items-center gap-2 h-12 px-8 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
              <Gift size={18} /> Open the {tier.name} box · {formatPrice(tier.price)}
            </button>
          </div>
        </div>
      )}

      {/* UNBOXING */}
      {phase === 'unboxing' && (
        <div className="py-20 flex flex-col items-center">
          <motion.div
            animate={prefersReduced ? {} : { rotate: [0, -8, 8, -8, 8, 0], scale: [1, 1.05, 1, 1.05, 1] }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="w-40 h-40 rounded-modal flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #FF6B00, #E55F00)' }}
          >
            <Gift size={64} className="text-white" />
          </motion.div>
          <p className="font-heading font-bold text-xl mt-8" style={{ color: 'var(--text-primary)' }}>Unboxing your fit…</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Shaking the box for the good stuff.</p>
        </div>
      )}

      {/* REVEALED */}
      <AnimatePresence>
        {phase === 'revealed' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: prefersReduced ? 0 : 0.4 }}>
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-3" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                <Sparkles size={13} /> You pulled
              </span>
              <h2 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: 'var(--text-primary)' }}>
                {revealCount} fit{revealCount > 1 ? 's' : ''} in your {tier.name} box
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
              {reveal.map((p, i) => (
                <motion.div
                  key={p.id + i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: prefersReduced ? 0 : i * 0.15 }}
                >
                  <Link href={`/shop/${p.slug}`} className="group block">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 50vw, 25vw" />
                    </div>
                    <p className="text-sm font-semibold mt-2" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>worth {formatPrice(p.price)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              {added ? (
                <Link href="/cart" className="inline-flex items-center gap-2 h-12 px-8 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--success)' }}>
                  <Check size={16} /> Added — go to cart <ArrowRight size={15} />
                </Link>
              ) : (
                <button type="button" onClick={addBoxToCart} className="inline-flex items-center gap-2 h-12 px-8 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
                  <ShoppingBag size={16} /> Wear the fit · {formatPrice(tier.price)}
                </button>
              )}
              <button type="button" onClick={() => { setPhase('select'); setAdded(false) }} className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                Try another tier
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
