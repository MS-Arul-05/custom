'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { Sparkles, Upload, Type, Eye } from 'lucide-react'
import Stack from '@/components/Stack'

const STEPS = [
  { icon: Sparkles, label: 'Pick a style' },
  { icon: Upload, label: 'Add a design' },
  { icon: Type, label: 'Add text' },
  { icon: Eye, label: 'Preview live' },
]

const TEES = [
  '/trend/tee-1.webp',
  '/trend/tee-2.webp',
  '/trend/tee-3.jpg',
  '/trend/tee-4.jpg',
  '/trend/tee-5.jpg',
  '/trend/tee-6.jpg',
  '/trend/tee-7.jpg',
  '/trend/tee-8.jpg',
  '/trend/tee-9.jpg',
]

export default function CustomizeCTA() {
  const cards = useMemo(
    () =>
      TEES.map((src) => (
        <div key={src} className="w-full h-full flex items-center justify-center" style={{ background: '#FFFFFF' }}>
          <img src={src} alt="Trending FITBOX tee design" className="w-full h-full object-contain p-4" />
        </div>
      )),
    []
  )

  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div
        className="rounded-modal overflow-hidden relative p-8 md:p-14"
        style={{ background: 'linear-gradient(135deg, #FFF0E6 0%, #FFFFFF 100%)', border: '1px solid var(--border)' }}
      >
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — copy */}
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--accent)' }}>
              <Sparkles size={14} /> The FITBOX builder
            </span>
            <h2 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: 'var(--text-primary)' }}>
              Design your own tee
              <br />
              in real time.
            </h2>
            <p className="text-base mt-4 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
              Upload art, generate a graphic with AI, drop in text, and watch it render front, back,
              and 360° before you ever check out.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">
              {STEPS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-sm font-semibold"
                  style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full text-white text-[11px]" style={{ background: 'var(--accent)' }}>
                    {i + 1}
                  </span>
                  <Icon size={15} style={{ color: 'var(--accent)' }} />
                  {label}
                </div>
              ))}
            </div>

            <Link
              href="/customize"
              className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold text-white mt-8 transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              <Sparkles size={16} /> Start designing — from ₹399
            </Link>
          </div>

          {/* Right — auto-rotating tee stack (React Bits Stack) */}
          <div className="relative flex justify-center lg:justify-end pt-4 lg:pt-0">
            <div className="w-full max-w-[380px] aspect-square">
              <Stack
                cards={cards}
                autoplay
                autoplayDelay={500}
                pauseOnHover
                sendToBackOnClick
                sensitivity={160}
                animationConfig={{ stiffness: 260, damping: 22 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
