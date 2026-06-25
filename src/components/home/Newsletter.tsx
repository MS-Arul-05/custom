'use client'
import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <div
        className="rounded-modal p-8 md:p-14 text-center"
        style={{ background: 'var(--bg-dark)' }}
      >
        <Mail size={28} className="mx-auto mb-4" style={{ color: 'var(--accent)' }} />
        <h2 className="font-heading font-extrabold tracking-tight text-white" style={{ fontSize: 'clamp(24px, 3.5vw, 40px)' }}>
          Get early access to drops
        </h2>
        <p className="text-sm mt-3 mb-7 max-w-md mx-auto" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Join the list for drop alerts, ₹100 off your first order, and member-only mystery boxes.
        </p>
        {done ? (
          <div className="inline-flex items-center gap-2 h-12 px-6 rounded-btn text-sm font-bold" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            <Check size={16} /> You&apos;re in — check your inbox.
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (email.trim()) setDone(true)
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              aria-label="Email address"
              className="flex-1 h-12 px-4 rounded-btn text-sm outline-none"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.18)' }}
            />
            <button
              type="submit"
              className="h-12 px-7 rounded-btn text-sm font-bold text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Notify me
            </button>
          </form>
        )}
        <p className="text-[11px] mt-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
