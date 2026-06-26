'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import Stack from '@/components/Stack'

const HERO_PHOTOS = [
  '/hero/hero-people.jpg',
  '/hero/hero-people-2.jpg',
  '/hero/hero-people-3.jpg',
]

export default function Hero() {
  const cards = useMemo(
    () =>
      HERO_PHOTOS.map((src) => (
        <img key={src} src={src} alt="Friends wearing FITBOX custom streetwear tees" className="card-image" />
      )),
    []
  )

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #F6EFE4 0%, #F1E6D5 55%, #F4E3CE 100%)' }}
    >
      {/* Warm glow accent */}
      <div
        className="absolute top-1/2 right-0 w-[460px] h-[460px] rounded-full blur-3xl opacity-25 -translate-y-1/2"
        style={{ background: 'var(--accent)' }}
        aria-hidden
      />
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Left half — wording (shown first + centered on mobile) */}
          <div className="text-center lg:text-left">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-6 text-white"
              style={{ background: '#1A1A2E' }}
            >
              <Zap size={13} fill="var(--accent)" style={{ color: 'var(--accent)' }} /> India-first custom apparel
            </span>
            <h1
              className="font-heading font-extrabold leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(44px, 7vw, 88px)', color: '#16182B' }}
            >
              WEAR WHAT
              <br />
              YOU <span style={{ color: 'var(--accent)' }}>MEAN.</span>
            </h1>
            <p className="text-base md:text-lg mt-6 max-w-md mx-auto lg:mx-0 leading-relaxed" style={{ color: 'rgba(30,26,20,0.7)' }}>
              Design your own tee in real time, cop limited drops, and unbox mystery fits.
              Bold streetwear, printed in India, paid by UPI.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">
              <Link
                href="/customize"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold text-white transition-colors"
                style={{ background: 'var(--accent)' }}
              >
                <Sparkles size={16} /> Design your tee
              </Link>
              <Link
                href="/drops"
                className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold text-white transition-colors"
                style={{ background: '#1A1A2E' }}
              >
                Shop drops <ArrowRight size={16} />
              </Link>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-5 mt-10">
              {[
                { n: '50k+', l: 'fits shipped' },
                { n: '4.8★', l: 'avg rating' },
                { n: '3–5d', l: 'delivery' },
              ].map((s, i) => (
                <div key={s.l} className="flex items-center gap-5">
                  {i > 0 && <span className="h-9 w-px" style={{ background: 'rgba(30,26,20,0.15)' }} aria-hidden />}
                  <div>
                    <p className="font-heading font-bold text-2xl" style={{ color: '#16182B' }}>{s.n}</p>
                    <p className="text-xs" style={{ color: 'rgba(30,26,20,0.5)' }}>
                      {s.l}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right half — draggable photo stack (stacks under the wording on mobile) */}
          <div className="relative flex justify-center lg:justify-end pt-6 pb-10 lg:py-8">
            <div className="w-full max-w-[600px] aspect-[5/4] sm:aspect-[16/11] lg:max-w-none lg:aspect-[4/3]">
              <Stack
                cards={cards}
                autoplay
                autoplayDelay={1000}
                pauseOnHover
                sendToBackOnClick
                sensitivity={170}
                animationConfig={{ stiffness: 260, damping: 22 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
