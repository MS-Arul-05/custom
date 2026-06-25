'use client'
import { useState } from 'react'
import Link from 'next/link'
import { User, Package, MapPin, Heart, ArrowRight, LogOut } from 'lucide-react'

export default function AccountPage() {
  const [signedIn, setSignedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSignedIn(true)
  }

  if (!signedIn) {
    return (
      <div className="max-w-[440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div
          className="rounded-card p-8"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
        >
          <h1
            className="font-heading font-extrabold tracking-tight mb-2"
            style={{ fontSize: 'clamp(24px, 3vw, 32px)', color: 'var(--text-primary)' }}
          >
            Welcome back
          </h1>
          <p className="text-sm mb-7" style={{ color: 'var(--text-secondary)' }}>
            Sign in to track orders, save fits, and cop drops faster.
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold mb-1.5"
                style={{ color: 'var(--text-primary)' }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-btn text-sm outline-none"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold mb-1.5"
                style={{ color: 'var(--text-primary)' }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 px-4 rounded-btn text-sm outline-none"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-btn text-white text-sm font-bold transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Sign in
            </button>
          </form>

          <p className="text-xs text-center mt-5" style={{ color: 'var(--text-tertiary)' }}>
            New here?{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Create an account</span> at checkout.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1
          className="font-heading font-extrabold tracking-tight"
          style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-primary)' }}
        >
          Your account
        </h1>
        <button
          type="button"
          onClick={() => setSignedIn(false)}
          className="inline-flex items-center gap-2 h-10 px-4 text-sm font-bold rounded-btn transition-colors"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Profile */}
        <div className="rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <User size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              Profile
            </h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt style={{ color: 'var(--text-secondary)' }}>Name</dt>
              <dd style={{ color: 'var(--text-primary)', fontWeight: 600 }}>FITBOX Member</dd>
            </div>
            <div className="flex justify-between">
              <dt style={{ color: 'var(--text-secondary)' }}>Email</dt>
              <dd style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{email || 'you@example.com'}</dd>
            </div>
            <div className="flex justify-between">
              <dt style={{ color: 'var(--text-secondary)' }}>Member since</dt>
              <dd style={{ color: 'var(--text-primary)', fontWeight: 600 }}>2026</dd>
            </div>
          </dl>
        </div>

        {/* Orders */}
        <div className="rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              Orders
            </h2>
          </div>
          <div className="text-center py-6">
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              No orders yet. Your fits will show up here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 h-10 px-5 text-sm font-bold rounded-btn text-white transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Start shopping <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Addresses */}
        <div className="rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              Addresses
            </h2>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            No saved addresses yet. Add one at checkout to speed up your next drop.
          </p>
        </div>

        {/* Wishlist */}
        <div className="rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-4">
            <Heart size={18} style={{ color: 'var(--accent)' }} />
            <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
              Wishlist
            </h2>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Nothing saved yet. Tap the heart on any fit to stash it here for later.
          </p>
        </div>
      </div>
    </div>
  )
}
