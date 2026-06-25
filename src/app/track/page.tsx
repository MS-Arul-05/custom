'use client'
import { useState } from 'react'
import { Check, Package, Truck, MapPin, Home, Search } from 'lucide-react'

const STEPS = [
  { label: 'Order placed', detail: 'We got your order and locked it in.', icon: Check },
  { label: 'Printed', detail: 'Your fit was printed in our Chennai studio.', icon: Package },
  { label: 'Shipped', detail: 'Handed to the courier and on the move.', icon: Truck },
  { label: 'Out for delivery', detail: 'On the truck headed your way.', icon: MapPin },
  { label: 'Delivered', detail: 'Dropped at your door. Wear it loud.', icon: Home },
]

const COMPLETED = 3

export default function TrackPage() {
  const [orderId, setOrderId] = useState('')
  const [tracked, setTracked] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!orderId.trim()) return
    setTracked(orderId.trim().toUpperCase())
  }

  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-3"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Track your order
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
        Drop in your FITBOX order ID (e.g. FB123456) to see where your fit is right now.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-12">
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="FB123456"
          aria-label="Order ID"
          className="flex-1 h-12 px-4 rounded-btn text-sm outline-none"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-bold rounded-btn text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          <Search size={15} /> Track
        </button>
      </form>

      {tracked && (
        <div
          className="rounded-card p-6 sm:p-8"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-wide" style={{ color: 'var(--text-tertiary)' }}>
                Order
              </p>
              <p className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                {tracked}
              </p>
            </div>
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-badge"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              In transit
            </span>
          </div>

          <ol className="relative">
            {STEPS.map((step, i) => {
              const done = i < COMPLETED
              const Icon = done ? Check : step.icon
              const isLast = i === STEPS.length - 1
              return (
                <li key={step.label} className="flex gap-4 pb-6 last:pb-0 relative">
                  {/* connector line */}
                  {!isLast && (
                    <span
                      className="absolute left-[19px] top-10 bottom-0 w-0.5"
                      style={{ background: done ? 'var(--success)' : 'var(--border)' }}
                    />
                  )}
                  <span
                    className="relative z-10 flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full"
                    style={{
                      background: done ? 'var(--success)' : 'var(--bg-primary)',
                      border: done ? 'none' : '1px solid var(--border)',
                      color: done ? '#FFFFFF' : 'var(--text-tertiary)',
                    }}
                  >
                    <Icon size={16} />
                  </span>
                  <div className="pt-1.5">
                    <p
                      className="font-heading font-bold text-sm"
                      style={{ color: done ? 'var(--text-primary)' : 'var(--text-secondary)' }}
                    >
                      {step.label}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                      {step.detail}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
}
