'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log to your error reporting service in a real app
    console.error(error)
  }, [error])

  return (
    <div className="max-w-[560px] mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
      <div
        className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6"
        style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
      >
        <AlertTriangle size={26} />
      </div>
      <h1
        className="font-heading font-extrabold tracking-tight mb-3"
        style={{ fontSize: 'clamp(26px, 4vw, 40px)', color: 'var(--text-primary)' }}
      >
        Something broke.
      </h1>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
        A seam came loose on our end. Try again — and if it keeps happening, hit us up and we&apos;ll patch it.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn text-white transition-colors"
          style={{ background: 'var(--accent)' }}
        >
          <RotateCcw size={15} /> Try again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          <Home size={15} /> Back home
        </Link>
      </div>
      {error.digest && (
        <p className="text-xs mt-8" style={{ color: 'var(--text-tertiary)' }}>
          Error ref: {error.digest}
        </p>
      )}
    </div>
  )
}
