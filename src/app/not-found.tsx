import Link from 'next/link'
import { Home, ShoppingBag } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="max-w-[560px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <p
        className="font-heading font-extrabold tracking-tight leading-none mb-4"
        style={{ fontSize: 'clamp(80px, 18vw, 160px)', color: 'var(--accent)' }}
      >
        404
      </p>
      <h1
        className="font-heading font-extrabold tracking-tight mb-3"
        style={{ fontSize: 'clamp(22px, 3.5vw, 32px)', color: 'var(--text-primary)' }}
      >
        This fit doesn&apos;t exist.
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
        Looks like this drop sold out, moved, or never existed. Let&apos;s get you back to the heat.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          <Home size={15} /> Home
        </Link>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          <ShoppingBag size={15} /> Shop now
        </Link>
      </div>
    </div>
  )
}
