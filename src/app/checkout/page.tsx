'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Lock, ChevronRight, Tag, Gift, Smartphone, CreditCard, Landmark, Wallet, Check } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { formatPrice, shippingFor } from '@/lib/utils'

type PayMethod = 'upi' | 'card' | 'netbanking' | 'wallet'

const COUPONS: Record<string, { type: 'flat' | 'pct'; value: number; label: string }> = {
  FITBOX100: { type: 'flat', value: 10000, label: '₹100 off' },
  FIRST10: { type: 'pct', value: 10, label: '10% off' },
}

const PAY_METHODS: { id: PayMethod; label: string; icon: typeof Smartphone }[] = [
  { id: 'upi', label: 'UPI', icon: Smartphone },
  { id: 'card', label: 'Card', icon: CreditCard },
  { id: 'netbanking', label: 'NetBanking', icon: Landmark },
  { id: 'wallet', label: 'Wallet', icon: Wallet },
]

function Field({ label, id, type = 'text', placeholder, required = true, className = '' }: { label: string; id: string; type?: string; placeholder?: string; required?: boolean; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {label} {required && <span style={{ color: 'var(--error)' }}>*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full h-11 px-4 text-sm rounded-btn outline-none transition-colors focus:border-[var(--accent)]"
        style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, itemCount, clear } = useCartStore()
  const [pay, setPay] = useState<PayMethod>('upi')
  const [couponInput, setCouponInput] = useState('')
  const [coupon, setCoupon] = useState<string | null>(null)
  const [couponError, setCouponError] = useState('')
  const [giftCard, setGiftCard] = useState('')
  const [giftApplied, setGiftApplied] = useState(0)
  const [placing, setPlacing] = useState(false)

  const total = subtotal()
  const count = itemCount()
  const shippingCost = shippingFor(total)

  const discount = (() => {
    if (!coupon) return 0
    const c = COUPONS[coupon]
    return c.type === 'flat' ? c.value : Math.round((total * c.value) / 100)
  })()

  const grandTotal = Math.max(0, total + shippingCost - discount - giftApplied)

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase()
    if (COUPONS[code]) {
      setCoupon(code)
      setCouponError('')
    } else {
      setCoupon(null)
      setCouponError('Invalid code. Try FITBOX100 or FIRST10.')
    }
  }

  const applyGift = () => {
    if (giftCard.trim().toUpperCase().startsWith('GIFT')) setGiftApplied(50000)
  }

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setPlacing(true)
    const snapshot = {
      orderId: `FB${Math.floor(100000 + Math.random() * 900000)}`,
      items: items.map((i) => ({ name: i.name, color: i.color, size: i.size, quantity: i.quantity, price: i.price, image: i.image })),
      total: grandTotal,
      method: pay,
    }
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('fitbox-last-order', JSON.stringify(snapshot))
    }
    setTimeout(() => {
      clear()
      router.push('/checkout/success')
    }, 900)
  }

  if (items.length === 0 && !placing) {
    return (
      <div className="max-w-content mx-auto px-4 py-24 text-center">
        <h1 className="font-heading font-extrabold text-2xl mb-3" style={{ color: 'var(--text-primary)' }}>Your cart is empty</h1>
        <Link href="/shop" className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn text-white" style={{ background: 'var(--accent)' }}>
          Back to shop
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <nav className="flex items-center gap-1.5 text-xs mb-8" style={{ color: 'var(--text-secondary)' }}>
        <Link href="/cart" className="hover:underline">Cart</Link>
        <ChevronRight size={12} />
        <span style={{ color: 'var(--text-primary)' }}>Checkout</span>
      </nav>

      <form onSubmit={placeOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12">
        {/* Left */}
        <div>
          <h2 className="font-heading font-bold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>Contact</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <Field label="Email" id="email" type="email" placeholder="you@email.com" />
            <Field label="Phone" id="phone" type="tel" placeholder="+91 98765 43210" />
          </div>

          <h2 className="font-heading font-bold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>Shipping address</h2>
          <div className="space-y-4 mb-8">
            <Field label="Full name" id="name" placeholder="Arjun Kumar" />
            <Field label="Address" id="address" placeholder="Flat / House no, street, area" />
            <div className="grid grid-cols-3 gap-4">
              <Field label="City" id="city" placeholder="Chennai" />
              <Field label="State" id="state" placeholder="Tamil Nadu" />
              <Field label="Pincode" id="pincode" placeholder="600001" />
            </div>
          </div>

          {/* Payment */}
          <h2 className="font-heading font-bold text-lg mb-5" style={{ color: 'var(--text-primary)' }}>Payment</h2>
          <div className="grid grid-cols-4 gap-2 mb-5">
            {PAY_METHODS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPay(id)}
                className="flex flex-col items-center gap-1.5 py-3 rounded-btn border text-xs font-semibold transition-all"
                style={{
                  borderColor: pay === id ? 'var(--accent)' : 'var(--border)',
                  background: pay === id ? 'var(--accent-light)' : 'var(--bg-surface)',
                  color: pay === id ? 'var(--accent)' : 'var(--text-primary)',
                }}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-card border mb-2" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
            {pay === 'upi' && <Field label="UPI ID" id="upi" placeholder="yourname@upi" />}
            {pay === 'card' && (
              <div className="space-y-3">
                <Field label="Card number" id="card" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Expiry" id="exp" placeholder="MM / YY" />
                  <Field label="CVV" id="cvv" placeholder="123" />
                </div>
              </div>
            )}
            {pay === 'netbanking' && (
              <div>
                <label htmlFor="bank" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Select bank *</label>
                <select id="bank" className="w-full h-11 px-4 text-sm rounded-btn outline-none" style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>State Bank of India</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra</option>
                </select>
              </div>
            )}
            {pay === 'wallet' && (
              <div>
                <label htmlFor="wallet" className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--text-secondary)' }}>Select wallet *</label>
                <select id="wallet" className="w-full h-11 px-4 text-sm rounded-btn outline-none" style={{ border: '1px solid var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}>
                  <option>Paytm</option>
                  <option>PhonePe</option>
                  <option>Amazon Pay</option>
                  <option>Mobikwik</option>
                </select>
              </div>
            )}
            <p className="text-[10px] mt-3" style={{ color: 'var(--text-tertiary)' }}>
              Demo checkout — no real payment is processed.
            </p>
          </div>
        </div>

        {/* Right: summary */}
        <div>
          <div className="sticky top-24 rounded-card p-6" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h3 className="font-heading font-bold text-base mb-4" style={{ color: 'var(--text-primary)' }}>Order summary ({count})</h3>

            <div className="space-y-3 mb-5 max-h-[260px] overflow-y-auto">
              {items.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <div className="w-14 h-[70px] flex-shrink-0 overflow-hidden relative rounded-badge" style={{ background: 'var(--bg-primary)' }}>
                    {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />}
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-white flex items-center justify-center font-bold" style={{ background: 'var(--accent)', fontSize: '10px' }}>
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                    <p className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{item.color} · {item.size}</p>
                  </div>
                  <p className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--text-primary)' }}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mb-2 flex gap-2">
              <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-btn" style={{ border: '1px solid var(--border)' }}>
                <Tag size={14} style={{ color: 'var(--text-secondary)' }} />
                <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code" aria-label="Coupon code" className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
              </div>
              <button type="button" onClick={applyCoupon} className="h-10 px-4 rounded-btn text-sm font-bold" style={{ background: 'var(--bg-dark)', color: '#fff' }}>Apply</button>
            </div>
            {coupon && <p className="text-xs mb-2 flex items-center gap-1" style={{ color: 'var(--success)' }}><Check size={12} /> {COUPONS[coupon].label} applied</p>}
            {couponError && <p className="text-xs mb-2" style={{ color: 'var(--error)' }}>{couponError}</p>}

            {/* Gift card */}
            <div className="mb-4 flex gap-2">
              <div className="flex-1 flex items-center gap-2 h-10 px-3 rounded-btn" style={{ border: '1px solid var(--border)' }}>
                <Gift size={14} style={{ color: 'var(--text-secondary)' }} />
                <input value={giftCard} onChange={(e) => setGiftCard(e.target.value)} placeholder="Gift card (try GIFT500)" aria-label="Gift card" className="flex-1 bg-transparent text-sm outline-none" style={{ color: 'var(--text-primary)' }} />
              </div>
              <button type="button" onClick={applyGift} className="h-10 px-4 rounded-btn text-sm font-bold" style={{ background: 'var(--bg-dark)', color: '#fff' }}>Apply</button>
            </div>

            <div className="space-y-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}><span>Subtotal</span><span>{formatPrice(total)}</span></div>
              <div className="flex justify-between text-sm" style={{ color: 'var(--text-secondary)' }}>
                <span>Shipping</span><span style={{ color: shippingCost === 0 ? 'var(--accent)' : undefined }}>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
              </div>
              {discount > 0 && <div className="flex justify-between text-sm" style={{ color: 'var(--success)' }}><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
              {giftApplied > 0 && <div className="flex justify-between text-sm" style={{ color: 'var(--success)' }}><span>Gift card</span><span>−{formatPrice(giftApplied)}</span></div>}
              <div className="flex justify-between text-base font-bold pt-3 border-t" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
                <span>Total</span><span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <button type="submit" disabled={placing} className="mt-5 w-full h-12 rounded-btn text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-60" style={{ background: 'var(--accent)' }}>
              <Lock size={14} /> {placing ? 'Processing…' : `Pay ${formatPrice(grandTotal)}`}
            </button>
            <p className="text-[11px] text-center mt-3" style={{ color: 'var(--text-tertiary)' }}>
              Secured checkout · UPI · Cards · NetBanking · Wallets
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}
