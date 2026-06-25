'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Menu, X, Search, Sparkles, Zap } from 'lucide-react'
import { useCartStore } from '@/store/cart'

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/customize', label: 'Customize', highlight: true },
  { href: '/mystery-box', label: 'Mystery Box' },
  { href: '/collections', label: 'Collections' },
  { href: '/drops', label: 'Drops' },
]

export default function Navbar() {
  const toggle = useCartStore((s) => s.toggle)
  const itemCount = useCartStore((s) => s.itemCount)
  const count = itemCount()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header
        className="sticky top-0 z-40 h-16 border-b backdrop-blur"
        style={{ background: 'rgba(248,248,248,0.92)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-content mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <button
            className="flex lg:hidden items-center justify-center w-9 h-9"
            aria-label="Open navigation menu"
            onClick={() => setMobileOpen(true)}
            style={{ color: 'var(--text-primary)' }}
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-extrabold tracking-tight text-xl flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            style={{ color: 'var(--text-primary)' }}
          >
            <Zap size={20} fill="var(--accent)" style={{ color: 'var(--accent)' }} />
            FITBOX
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium flex items-center gap-1 transition-colors"
                style={{ color: link.highlight ? 'var(--accent)' : 'var(--text-secondary)' }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = link.highlight
                    ? 'var(--accent-hover)'
                    : 'var(--text-primary)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = link.highlight
                    ? 'var(--accent)'
                    : 'var(--text-secondary)')
                }
              >
                {link.highlight && <Sparkles size={13} />}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <Link
              href="/shop"
              aria-label="Search products"
              className="hidden sm:flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <Search size={20} />
            </Link>
            <button
              onClick={toggle}
              aria-label={`Open cart, ${count} item${count !== 1 ? 's' : ''}`}
              className="relative flex items-center justify-center w-9 h-9 transition-opacity hover:opacity-70"
              style={{ color: 'var(--text-primary)' }}
            >
              <ShoppingBag size={21} />
              {count > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 flex items-center justify-center rounded-full w-[18px] h-[18px] text-white font-semibold"
                  style={{ fontSize: '10px', background: 'var(--accent)' }}
                >
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <nav
            className="relative w-[290px] h-full flex flex-col px-6 py-8"
            style={{ background: 'var(--bg-primary)' }}
          >
            <div className="flex items-center justify-between mb-8">
              <span
                className="font-heading font-extrabold text-lg flex items-center gap-1.5"
                style={{ color: 'var(--text-primary)' }}
              >
                <Zap size={18} fill="var(--accent)" style={{ color: 'var(--accent)' }} />
                FITBOX
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ color: 'var(--text-secondary)' }}
              >
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 px-3 rounded-btn text-base font-semibold flex items-center gap-2"
                  style={{ color: link.highlight ? 'var(--accent)' : 'var(--text-primary)' }}
                >
                  {link.highlight && <Sparkles size={16} />}
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-auto pt-6 border-t flex flex-col gap-1" style={{ borderColor: 'var(--border)' }}>
              <Link
                href="/track"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Track order
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
