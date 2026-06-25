'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'

const HERO_SLIDES = [
  '/hero/hero-1.jpg',
  '/hero/hero-2.jpg',
  '/hero/hero-3.jpg',
  '/hero/hero-4.jpg',
  '/hero/hero-5.jpg',
  '/hero/hero-6.jpg',
]

export default function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_SLIDES.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative overflow-hidden" style={{ background: 'var(--bg-dark)' }}>
      {/* Glow accents */}
      <div
        className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl opacity-30"
        style={{ background: 'var(--accent)' }}
        aria-hidden
      />
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-6"
              style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--accent)' }}
            >
              <Zap size={13} fill="var(--accent)" /> India-first custom apparel
            </span>
            <h1
              className="font-heading font-extrabold text-white leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}
            >
              WEAR WHAT
              <br />
              YOU <span style={{ color: 'var(--accent)' }}>MEAN.</span>
            </h1>
            <p className="text-base md:text-lg mt-6 max-w-md leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Design your own tee in real time, cop limited drops, and unbox mystery fits.
              Bold streetwear, printed in India, paid by UPI.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/customize"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold text-white transition-colors"
                style={{ background: 'var(--accent)' }}
              >
                <Sparkles size={16} /> Design your tee
              </Link>
              <Link
                href="/drops"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}
              >
                Shop drops <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10">
              {[
                { n: '50k+', l: 'fits shipped' },
                { n: '4.8★', l: 'avg rating' },
                { n: '3–5d', l: 'delivery' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-heading font-bold text-2xl text-white">{s.n}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero visual — auto-rotating photo cards */}
          <div className="relative hidden lg:block">
            <div
              className="aspect-[4/5] rounded-modal overflow-hidden relative"
              style={{ background: 'linear-gradient(135deg, #FF6B00 0%, #E55F00 100%)' }}
            >
              {HERO_SLIDES.map((src, i) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  aria-hidden={i !== active ? 'true' : 'false'}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              ))}
              {/* FITBOX wordmark badge */}
              <span
                className="absolute top-4 left-4 font-heading font-extrabold text-white leading-none px-3 py-1.5 rounded-btn"
                style={{ background: 'rgba(0,0,0,0.45)', fontSize: '14px', letterSpacing: '0.08em' }}
              >
                FITBOX
              </span>
              {/* Slide dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {HERO_SLIDES.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    aria-label={`Show slide ${i + 1}`}
                    onClick={() => setActive(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === active ? 20 : 6,
                      background: i === active ? '#fff' : 'rgba(255,255,255,0.5)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
