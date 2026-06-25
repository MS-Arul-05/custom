import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ArrowRight, Package, Palette, Box } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'FITBOX is an India-first custom apparel and streetwear brand — a store, a real-time T-shirt builder, mystery boxes, and a designer marketplace, all in one fit.',
}

const stats = [
  { value: '50k+', label: 'Fits shipped' },
  { value: '4.8★', label: 'Average rating' },
  { value: '120+', label: 'Indie designers' },
  { value: '🇮🇳', label: 'Designed & printed in India' },
]

const values = [
  {
    icon: Palette,
    title: 'Built by you, in real time',
    body: 'Our live customizer lets you drop graphics, type, and prints onto premium oversized blanks and see exactly what you cop before you check out. No guesswork, no mockup surprises — what you design is what we print.',
  },
  {
    icon: Box,
    title: 'Drops, boxes & a marketplace',
    body: 'Cop limited streetwear drops, gamble on a mystery box stacked with curated heat, or shop fits straight from our designer marketplace. We hand the mic to indie artists across India and split the spotlight with them.',
  },
  {
    icon: Package,
    title: 'Made and shipped in India',
    body: 'Everything is printed on demand in our Chennai studio using water-based DTG inks that go soft on the fabric and easy on the planet. Dispatch in 24–48 hours, delivered India-wide in days.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero */}
      <div className="max-w-[760px] mb-16">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: 'var(--accent)' }}
        >
          The FITBOX story
        </p>
        <h1
          className="font-heading font-extrabold tracking-tight mb-6"
          style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: 'var(--text-primary)', lineHeight: 1.05 }}
        >
          One box. Every way to wear what&apos;s in your head.
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          FITBOX started with a simple frustration: the fits we wanted in our heads never existed on the
          shelf. So we built the shelf. FITBOX is an India-first custom apparel and streetwear brand that
          fuses four things into one drop — a curated store, a real-time custom T-shirt builder, mystery
          boxes packed with surprise heat, and a marketplace for independent designers. Whether you want to
          design from scratch, cop a limited drop, or roll the dice on a box, the heat lands at your door.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-card p-6 text-center"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <p
              className="font-heading font-extrabold tracking-tight mb-1"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)' }}
            >
              {s.value}
            </p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {values.map((v) => {
          const Icon = v.icon
          return (
            <div
              key={v.title}
              className="rounded-card p-7"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="inline-flex items-center justify-center w-11 h-11 rounded-btn mb-5"
                style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
              >
                <Icon size={20} />
              </div>
              <h2
                className="font-heading font-bold text-lg mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {v.title}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {v.body}
              </p>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div
        className="rounded-card p-10 sm:p-14 text-center"
        style={{ background: 'var(--bg-dark)' }}
      >
        <h2
          className="font-heading font-extrabold tracking-tight mb-4"
          style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: '#FFFFFF' }}
        >
          Got a fit in your head? Build it now.
        </h2>
        <p className="text-sm mb-8 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
          Jump into the live customizer, drop your design on a premium blank, and watch it come together
          in real time.
        </p>
        <Link
          href="/customize"
          className="inline-flex items-center gap-2 h-12 px-8 text-sm font-bold rounded-btn text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          <Sparkles size={16} /> Design your own <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
