'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag, Truck, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '@/store/cart'
import { formatPrice, FREE_SHIPPING_THRESHOLD } from '@/lib/utils'

export default function CartDrawer() {
  const { items, isOpen, close, updateQuantity, removeItem, subtotal, itemCount } = useCartStore()
  const prefersReduced = useReducedMotion()
  const total = subtotal()
  const count = itemCount()
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={close}
          />
          <motion.div
            key="drawer"
            initial={{ x: prefersReduced ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: prefersReduced ? 0 : '100%' }}
            transition={{ duration: prefersReduced ? 0 : 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] z-50 flex flex-col shadow-2xl"
            style={{ background: 'var(--bg-primary)' }}
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2">
                <ShoppingBag size={17} style={{ color: 'var(--text-primary)' }} />
                <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Cart ({count})
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                style={{ color: 'var(--text-secondary)' }}
                className="hover:opacity-70 transition-opacity"
              >
                <X size={22} />
              </button>
            </div>

            {/* Free shipping progress */}
            <div className="px-6 pt-4">
              {toFreeShipping === 0 ? (
                <div
                  className="flex items-center gap-2 text-xs font-semibold rounded-btn px-3 py-2"
                  style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
                >
                  <Truck size={13} />
                  You&apos;ve unlocked free shipping!
                </div>
              ) : (
                <div>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>
                    Add{' '}
                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>
                      {formatPrice(toFreeShipping)}
                    </span>{' '}
                    more for free shipping
                  </p>
                  <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'var(--accent-light)' }}>
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress}%`, background: 'var(--accent)' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={32} className="mx-auto mb-4 opacity-30" style={{ color: 'var(--text-secondary)' }} />
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    Your cart is empty.
                  </p>
                  <button
                    type="button"
                    onClick={close}
                    className="text-sm font-semibold underline"
                    style={{ color: 'var(--accent)' }}
                  >
                    Start shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <div
                      className="w-[80px] h-[100px] flex-shrink-0 overflow-hidden relative rounded-badge"
                      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                    >
                      {item.image && (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      )}
                      {item.kind !== 'product' && (
                        <span
                          className="absolute top-1 left-1 rounded-badge px-1 py-0.5 text-white flex items-center"
                          style={{ background: 'var(--accent)', fontSize: '9px' }}
                        >
                          <Sparkles size={8} />
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div>
                        <p className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                          {item.name}
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                          {item.color} · {item.size}
                        </p>
                        {item.meta?.summary && (
                          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>
                            {item.meta.summary}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-7 h-7 rounded-badge border flex items-center justify-center hover:opacity-70 transition-opacity"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center" style={{ color: 'var(--text-primary)' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-7 h-7 rounded-badge border flex items-center justify-center hover:opacity-70 transition-opacity"
                          style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.key)}
                          className="ml-auto text-xs underline hover:opacity-70 transition-opacity"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <p className="text-sm font-bold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-6 py-5 border-t space-y-3" style={{ borderColor: 'var(--border)' }}>
                <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span className="font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                    {formatPrice(total)}
                  </span>
                </div>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                  Taxes and shipping calculated at checkout.
                </p>
                <Link
                  href="/checkout"
                  onClick={close}
                  className="flex items-center justify-center w-full h-12 rounded-btn text-white text-sm font-bold transition-colors"
                  style={{ background: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
                >
                  Checkout · {formatPrice(total)}
                </Link>
                <Link
                  href="/cart"
                  onClick={close}
                  className="flex items-center justify-center w-full h-10 text-sm font-medium underline"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  View cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
