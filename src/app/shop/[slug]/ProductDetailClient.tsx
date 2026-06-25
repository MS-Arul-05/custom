'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, Ruler, Truck, RotateCcw, ShieldCheck, ChevronRight, X, Star } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'
import ProductCard from '@/components/product/ProductCard'

interface Props {
  product: Product
  related: Product[]
}

interface UserReview {
  name: string
  rating: number
  text: string
}

export default function ProductDetailClient({ product: p, related }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  const [activeImage, setActiveImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(p.colors[0].name)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const [sizeError, setSizeError] = useState(false)
  const [reviews, setReviews] = useState<UserReview[]>([])
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, text: '' })

  const outOfStock = p.outOfStock ?? []
  const hasSale = p.salePrice != null && p.salePrice < p.price
  const displayPrice = hasSale ? p.salePrice! : p.price

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true)
      return
    }
    setSizeError(false)
    addItem({
      kind: 'product',
      productId: p.id,
      name: p.name,
      price: displayPrice,
      size: selectedSize,
      color: selectedColor,
      image: p.images[0],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) return
    setReviews((r) => [{ ...reviewForm }, ...r])
    setReviewForm({ name: '', rating: 5, text: '' })
  }

  return (
    <>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs mb-8 flex-wrap" style={{ color: 'var(--text-secondary)' }}>
          <Link href="/" className="hover:underline">Home</Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:underline">Shop</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--text-primary)' }}>{p.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <div className="flex gap-3 lg:sticky lg:top-20 self-start">
            <div className="hidden sm:flex flex-col gap-2 w-[72px] flex-shrink-0">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className="relative w-[72px] h-[90px] overflow-hidden rounded-badge"
                  style={{
                    outline: activeImage === i ? '2px solid var(--accent)' : '2px solid transparent',
                    outlineOffset: '1px',
                    background: 'var(--bg-surface)',
                  }}
                  aria-label={`View ${p.name} image ${i + 1}`}
                >
                  <Image src={img} alt={`${p.name} view ${i + 1}`} fill className="object-contain p-1" sizes="72px" />
                </button>
              ))}
            </div>
            <div className="flex-1 relative aspect-[4/5] overflow-hidden rounded-card" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              <Image src={p.images[activeImage]} alt={`${p.name} — front and back`} fill priority className="object-contain p-4" sizes="(max-width: 1024px) 100vw, 50vw" />
              {p.badge && (
                <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-badge text-white" style={{ background: 'var(--accent)' }}>
                  {p.badge}
                </span>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            {p.rating != null && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < Math.round(p.rating!) ? '#FFB400' : 'none'} style={{ color: '#FFB400' }} />
                  ))}
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {p.rating} ({p.reviewCount} reviews)
                </span>
              </div>
            )}

            <h1 className="font-heading font-extrabold tracking-tight leading-tight mb-3" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-primary)' }}>
              {p.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-5">
              <p className="text-2xl font-bold" style={{ color: hasSale ? 'var(--accent)' : 'var(--text-primary)' }}>
                {formatPrice(displayPrice)}
              </p>
              {hasSale && <p className="text-base line-through" style={{ color: 'var(--text-tertiary)' }}>{formatPrice(p.price)}</p>}
              {hasSale && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-badge" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                  Save {formatPrice(p.price - displayPrice)}
                </span>
              )}
            </div>

            <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2.5" style={{ color: 'var(--text-primary)' }}>
                Colour: <span style={{ color: 'var(--text-secondary)', fontWeight: 400 }}>{selectedColor}</span>
              </p>
              <div className="flex gap-2.5">
                {p.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    title={c.name}
                    aria-label={c.name}
                    aria-pressed={selectedColor === c.name}
                    className="w-9 h-9 rounded-full"
                    style={{
                      background: c.hex,
                      outline: selectedColor === c.name ? '2px solid var(--accent)' : '2px solid transparent',
                      outlineOffset: '2px',
                      border: '1px solid rgba(0,0,0,0.15)',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-sm font-semibold" style={{ color: sizeError ? 'var(--error)' : 'var(--text-primary)' }}>
                  {sizeError ? 'Please select a size' : 'Size'}
                </p>
                <button type="button" onClick={() => setSizeGuideOpen(true)} className="flex items-center gap-1 text-xs font-semibold" style={{ color: 'var(--accent)' }}>
                  <Ruler size={12} /> Size guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((sz) => {
                  const oos = outOfStock.includes(sz)
                  const sel = selectedSize === sz
                  return (
                    <button
                      key={sz}
                      type="button"
                      disabled={oos}
                      onClick={() => { setSelectedSize(sz); setSizeError(false) }}
                      aria-pressed={sel}
                      aria-disabled={oos}
                      className="h-11 min-w-[48px] px-3 rounded-btn border text-sm font-semibold transition-all"
                      style={{
                        borderColor: sel ? 'var(--accent)' : 'var(--border)',
                        background: sel ? 'var(--accent-light)' : 'var(--bg-surface)',
                        color: sel ? 'var(--accent)' : 'var(--text-primary)',
                        opacity: oos ? 0.4 : 1,
                        textDecoration: oos ? 'line-through' : 'none',
                        cursor: oos ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {sz}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Add to cart */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full h-12 rounded-btn text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors mb-3"
              style={{ background: added ? 'var(--success)' : 'var(--accent)' }}
            >
              <ShoppingBag size={16} />
              {added ? 'Added to cart!' : `Add to cart · ${formatPrice(displayPrice)}`}
            </button>
            <Link
              href="/customize"
              className="w-full h-11 rounded-btn text-sm font-bold flex items-center justify-center gap-2 transition-colors mb-6"
              style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            >
              Want it custom? Design your own →
            </Link>

            {/* Trust row */}
            <div className="grid grid-cols-3 gap-3 py-4 border-t border-b mb-6" style={{ borderColor: 'var(--border)' }}>
              {[
                { icon: Truck, label: 'Free shipping', sub: 'over ₹1,499' },
                { icon: RotateCcw, label: '7-day returns', sub: 'easy & free' },
                { icon: ShieldCheck, label: 'UPI / Cards', sub: 'secure pay' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1">
                  <Icon size={17} style={{ color: 'var(--accent)' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div>
              {[
                {
                  label: 'Fabric & Fit',
                  content: `${p.fabric}${p.gsm ? ` · ${p.gsm} GSM` : ''}\n\nFit: ${p.fit}\n\n${p.origin}.`,
                },
                {
                  label: 'Care Instructions',
                  content: 'Machine wash cold inside-out. Do not bleach. Tumble dry low or hang dry. Iron on reverse — avoid ironing directly over prints. First wash separately.',
                },
                {
                  label: 'Shipping & Returns',
                  content: 'Dispatched in 24–48 hrs. Standard delivery 3–5 days (free over ₹1,499, else ₹79). Easy 7-day returns and exchanges. Custom-printed items are final sale.',
                },
              ].map(({ label, content }) => (
                <details key={label} className="border-b" style={{ borderColor: 'var(--border)' }}>
                  <summary className="py-4 text-sm font-semibold cursor-pointer select-none" style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </summary>
                  <p className="pb-4 text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>{content}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-20 grid lg:grid-cols-[1fr_1.2fr] gap-12">
          <div>
            <h2 className="font-heading font-extrabold tracking-tight mb-2" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text-primary)' }}>
              Write a review
            </h2>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>Copped this fit? Tell the crew what you think.</p>
            <form onSubmit={submitReview} className="space-y-3">
              <input
                value={reviewForm.name}
                onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Your name"
                aria-label="Your name"
                className="w-full h-11 px-4 rounded-btn text-sm outline-none"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button key={i} type="button" onClick={() => setReviewForm((f) => ({ ...f, rating: i + 1 }))} aria-label={`${i + 1} stars`}>
                    <Star size={22} fill={i < reviewForm.rating ? '#FFB400' : 'none'} style={{ color: '#FFB400' }} />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewForm.text}
                onChange={(e) => setReviewForm((f) => ({ ...f, text: e.target.value }))}
                placeholder="What did you think of the fit, fabric and print?"
                aria-label="Your review"
                rows={4}
                className="w-full px-4 py-3 rounded-btn text-sm outline-none resize-none"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
              />
              <button type="submit" className="h-11 px-6 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
                Post review
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4" style={{ color: 'var(--text-secondary)' }}>
              {reviews.length > 0 ? `${reviews.length} new review${reviews.length > 1 ? 's' : ''}` : 'Recent reviews'}
            </h3>
            <div className="space-y-4">
              {(reviews.length > 0
                ? reviews
                : [
                    { name: 'Karthik R.', rating: 5, text: 'Heavy fabric, print is crisp. Exactly as pictured. Fits true to size.' },
                    { name: 'Anjali S.', rating: 4, text: 'Love the oversized cut. Shipping was quick and the packaging was premium.' },
                  ]
              ).map((r, i) => (
                <div key={i} className="rounded-card p-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} fill={j < r.rating ? '#FFB400' : 'none'} style={{ color: '#FFB400' }} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-heading font-extrabold tracking-tight mb-8" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text-primary)' }}>
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {related.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size guide modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSizeGuideOpen(false)} />
          <div className="relative w-full max-w-lg rounded-modal p-8 overflow-y-auto max-h-[90vh]" style={{ background: 'var(--bg-primary)' }} role="dialog" aria-label="Size guide">
            <button type="button" onClick={() => setSizeGuideOpen(false)} className="absolute top-4 right-4" aria-label="Close size guide">
              <X size={20} style={{ color: 'var(--text-secondary)' }} />
            </button>
            <h3 className="font-heading font-bold text-xl mb-4" style={{ color: 'var(--text-primary)' }}>Size guide</h3>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Measurements in inches. Oversized fits run 1–2 sizes large by design.
            </p>
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Size', 'Chest', 'Length', 'Shoulder'].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-bold" style={{ color: 'var(--text-primary)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['XS', '38', '26', '17'],
                  ['S', '40', '27', '18'],
                  ['M', '42', '28', '19'],
                  ['L', '44', '29', '20'],
                  ['XL', '46', '30', '21'],
                  ['XXL', '48', '31', '22'],
                  ['XXXL', '50', '32', '23'],
                ].map(([s, c, l, sh]) => (
                  <tr key={s} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td className="py-3 pr-4 font-semibold" style={{ color: 'var(--text-primary)' }}>{s}</td>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-secondary)' }}>{c}</td>
                    <td className="py-3 pr-4" style={{ color: 'var(--text-secondary)' }}>{l}</td>
                    <td className="py-3" style={{ color: 'var(--text-secondary)' }}>{sh}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
