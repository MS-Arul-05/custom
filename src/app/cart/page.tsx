'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X, ShoppingBag, Truck, ArrowRight, Sparkles } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, FREE_SHIPPING_THRESHOLD, shippingFor } from '@/lib/utils'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, itemCount } = useCartStore()
  const total = subtotal()
  const count = itemCount()
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - total)
  const progress = Math.min(100, (total / FREE_SHIPPING_THRESHOLD) * 100)
  const shippingCost = shippingFor(total)
  const estimatedTotal = total + shippingCost

  if (items.length === 0) {
    return (
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <ShoppingBag size={48} className="mx-auto mb-6 opacity-20" style={{ color: 'var(--text-secondary)' }} />
        <h1 className="font-heading font-extrabold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>
          Your cart is empty
        </h1>
        <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
          No fits yet. Go grab some heat.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/shop" className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn text-white" style={{ background: 'var(--accent)' }}>
            Shop now <ArrowRight size={15} />
          </Link>
          <Link href="/customize" className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
            <Sparkles size={15} /> Design your own
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading font-extrabold text-3xl mb-8" style={{ color: 'var(--text-primary)' }}>
        Cart ({count})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-card p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            {toFreeShipping === 0 ? (
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--accent)' }}>
                <Truck size={15} /> You&apos;ve unlocked free shipping!
              </div>
            ) : (
              <>
                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                  Add <span className="font-bold" style={{ color: 'var(--text-primary)' }}>{formatPrice(toFreeShipping)}</span> more for free shipping
                </p>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ background: 'var(--accent-light)' }}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--accent)' }} />
                </div>
              </>
            )}
          </div>

          <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
            {items.map((item) => (
              <div key={item.key} className="flex gap-5 py-6">
                <div className="w-[100px] h-[125px] flex-shrink-0 overflow-hidden relative rounded-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="100px" />}
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.color} · Size {item.size}</p>
                      {item.meta?.summary && (
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{item.meta.summary}</p>
                      )}
                    </div>
                    <button type="button" onClick={() => removeItem(item.key)} aria-label="Remove item" className="flex-shrink-0 hover:opacity-60 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
                      <X size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border rounded-btn overflow-hidden" style={{ borderColor: 'var(--border)' }}>
                      <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Decrease quantity">
                        <Minus size={13} />
                      </button>
                      <span className="w-10 text-center text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center transition-colors" style={{ color: 'var(--text-secondary)' }} aria-label="Increase quantity">
                        <Plus size={13} />
                      </button>
                    </div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="sticky top-24 rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h2 className="font-heading font-bold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>Order summary</h2>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>Subtotal ({count} item{count !== 1 ? 's' : ''})</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span style={{ color: shippingCost === 0 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-base font-bold pt-4 mb-5 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
              <span>Total</span>
              <span>{formatPrice(estimatedTotal)}</span>
            </div>
            <Link href="/checkout" className="flex items-center justify-center w-full h-12 rounded-btn text-white text-sm font-bold gap-2 transition-colors" style={{ background: 'var(--accent)' }}>
              Checkout <ArrowRight size={15} />
            </Link>
            <p className="text-xs text-center mt-3" style={{ color: 'var(--text-tertiary)' }}>
              UPI · Cards · NetBanking · Wallets · 7-day returns
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
