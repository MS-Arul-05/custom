'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  Lock, LogOut, Package, ShoppingBag, Upload, Trash2, Plus, ExternalLink, Boxes,
} from 'lucide-react'
import { useAdminStore, ORDER_STATUSES, type OrderStatus } from '@/store/admin'
import { formatPrice } from '@/lib/utils'
import type { Category, Fit, Product } from '@/types'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'fitbox-admin'
const AUTH_KEY = 'fitbox-admin-auth'

const CATEGORIES: Category[] = [
  'oversized-t-shirts', 'regular-fit-t-shirts', 'graphic-tees', 'anime-collection',
  'streetwear-collection', 'hoodies', 'sweatshirts', 'polo-shirts', 'crop-tops', 'jackets', 'accessories',
]
const FITS: Fit[] = ['oversized', 'regular', 'relaxed', 'boxy', 'slim']
const TEE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: '#B58900',
  confirmed: '#2B4C7E',
  printing: '#FF6B00',
  shipped: '#5B5E2A',
  delivered: '#2E7D32',
}

const inputStyle = { background: 'var(--bg-surface)', border: '1px solid var(--border)', color: 'var(--text-primary)' } as const

// Read a file and downscale to a compact data URL so localStorage stays small.
function fileToScaledDataUrl(file: File, maxW = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new window.Image()
      img.onload = () => {
        const scale = Math.min(1, maxW / img.naturalWidth)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.naturalWidth * scale)
        canvas.height = Math.round(img.naturalHeight * scale)
        const ctx = canvas.getContext('2d')
        if (!ctx) return resolve(reader.result as string)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.82))
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'product'
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<'products' | 'orders'>('products')

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(AUTH_KEY) === '1') setAuthed(true)
  }, [])

  const signIn = (e: React.FormEvent) => {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, '1')
      setAuthed(true)
      setAuthError('')
    } else {
      setAuthError('Wrong password.')
    }
  }

  if (!authed) {
    return (
      <div className="max-w-[420px] mx-auto px-4 py-24">
        <div className="rounded-card p-8" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <div className="flex items-center gap-2 mb-2">
            <Lock size={20} style={{ color: 'var(--accent)' }} />
            <h1 className="font-heading font-extrabold text-2xl" style={{ color: 'var(--text-primary)' }}>Admin sign in</h1>
          </div>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>Enter the admin password to manage products and orders.</p>
          {authError && <p className="text-xs font-semibold rounded-btn px-3 py-2 mb-4" style={{ background: 'rgba(179,38,30,0.1)', color: '#B3261E' }}>{authError}</p>}
          <form onSubmit={signIn} className="space-y-3">
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Password" aria-label="Admin password" className="w-full h-11 px-4 rounded-btn text-sm outline-none" style={inputStyle} />
            <button type="submit" className="w-full h-12 rounded-btn text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>Sign in</button>
          </form>
          <p className="text-[11px] mt-4" style={{ color: 'var(--text-tertiary)' }}>Default password: <b>fitbox-admin</b> (set NEXT_PUBLIC_ADMIN_PASSWORD to change).</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Boxes size={24} style={{ color: 'var(--accent)' }} />
          <h1 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(24px,3.5vw,36px)', color: 'var(--text-primary)' }}>FITBOX Admin</h1>
        </div>
        <button type="button" onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false) }} className="inline-flex items-center gap-2 h-10 px-4 text-sm font-bold rounded-btn" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
          <LogOut size={14} /> Sign out
        </button>
      </div>

      <div className="flex gap-2 mb-7">
        {([['products', 'Products', Package], ['orders', 'Orders', ShoppingBag]] as const).map(([id, label, Icon]) => (
          <button key={id} type="button" onClick={() => setTab(id)} className="inline-flex items-center gap-2 h-10 px-5 rounded-btn text-sm font-bold" style={{ background: tab === id ? 'var(--accent)' : 'var(--bg-surface)', color: tab === id ? '#fff' : 'var(--text-primary)', border: tab === id ? 'none' : '1px solid var(--border)' }}>
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>

      {tab === 'products' ? <ProductsTab /> : <OrdersTab />}
    </div>
  )
}

function ProductsTab() {
  const products = useAdminStore((s) => s.products)
  const addProduct = useAdminStore((s) => s.addProduct)
  const removeProduct = useAdminStore((s) => s.removeProduct)

  const [form, setForm] = useState({ name: '', priceRupees: '', category: CATEGORIES[0] as Category, fit: 'oversized' as Fit, fabric: '240 GSM combed cotton', description: '' })
  const [image, setImage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true)
    try { setImage(await fileToScaledDataUrl(file)) } finally { setBusy(false) }
    e.target.value = ''
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const rupees = Number(form.priceRupees)
    if (!form.name.trim() || !rupees || rupees <= 0) { setMsg('Enter a name and a valid price.'); return }
    if (!image) { setMsg('Please upload a product image.'); return }
    const product: Product = {
      id: `adm-${Date.now()}`,
      slug: `${slugify(form.name)}-${Date.now().toString(36)}`,
      name: form.name.trim(),
      category: form.category,
      price: Math.round(rupees * 100),
      description: form.description.trim() || `${form.name.trim()} — printed in India.`,
      fabric: form.fabric,
      fit: form.fit,
      origin: 'Designed & printed in India',
      images: [image],
      colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#1A1A1A' }],
      sizes: TEE_SIZES,
      inStock: true,
      isNewArrival: true,
      isBestseller: false,
    }
    addProduct(product)
    setForm((f) => ({ ...f, name: '', priceRupees: '', description: '' }))
    setImage(null)
    setMsg('Product added — it now shows on the shop.')
  }

  return (
    <div className="grid lg:grid-cols-[380px_1fr] gap-8">
      {/* Upload form */}
      <form onSubmit={submit} className="rounded-card p-6 h-fit" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h2 className="font-heading font-bold text-lg mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Upload size={18} style={{ color: 'var(--accent)' }} /> Upload product</h2>
        {msg && <p className="text-xs font-semibold rounded-btn px-3 py-2 mb-3" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{msg}</p>}

        <label className="flex items-center justify-center gap-2 h-36 rounded-card border-2 border-dashed cursor-pointer text-sm font-semibold overflow-hidden relative mb-4" style={{ borderColor: image ? 'var(--accent)' : 'var(--border)', color: 'var(--text-secondary)' }}>
          {image ? <Image src={image} alt="Product" fill className="object-contain" sizes="380px" /> : <>{busy ? 'Processing…' : <><Upload size={16} /> Upload image</>}</>}
          <input type="file" accept="image/*" onChange={onImage} className="hidden" />
        </label>

        <div className="space-y-3">
          <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Product name *" aria-label="Product name" className="w-full h-11 px-4 rounded-btn text-sm outline-none" style={inputStyle} />
          <input value={form.priceRupees} onChange={(e) => setForm((f) => ({ ...f, priceRupees: e.target.value }))} placeholder="Price in ₹ *" aria-label="Price in rupees" type="number" min={1} className="w-full h-11 px-4 rounded-btn text-sm outline-none" style={inputStyle} />
          <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value as Category }))} aria-label="Category" className="w-full h-11 px-4 rounded-btn text-sm outline-none" style={inputStyle}>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>)}
          </select>
          <select value={form.fit} onChange={(e) => setForm((f) => ({ ...f, fit: e.target.value as Fit }))} aria-label="Fit" className="w-full h-11 px-4 rounded-btn text-sm outline-none" style={inputStyle}>
            {FITS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
          <input value={form.fabric} onChange={(e) => setForm((f) => ({ ...f, fabric: e.target.value }))} placeholder="Fabric" aria-label="Fabric" className="w-full h-11 px-4 rounded-btn text-sm outline-none" style={inputStyle} />
          <textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Description" aria-label="Description" rows={3} className="w-full px-4 py-3 rounded-btn text-sm outline-none resize-none" style={inputStyle} />
        </div>
        <button type="submit" className="w-full h-12 mt-4 rounded-btn text-white text-sm font-bold flex items-center justify-center gap-2" style={{ background: 'var(--accent)' }}><Plus size={16} /> Add product</button>
      </form>

      {/* Product list */}
      <div>
        <p className="text-sm font-bold mb-3" style={{ color: 'var(--text-secondary)' }}>Your products ({products.length})</p>
        {products.length === 0 ? (
          <div className="rounded-card p-10 text-center text-sm" style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border)', color: 'var(--text-tertiary)' }}>No products yet. Upload one on the left — it appears on the shop instantly.</div>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="rounded-card overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
                <div className="relative aspect-square" style={{ background: 'var(--bg-primary)' }}>
                  <Image src={p.images[0]} alt={p.name} fill className="object-contain" sizes="240px" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-bold truncate" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                  <p className="text-xs mb-2" style={{ color: 'var(--text-secondary)' }}>{p.category.replace(/-/g, ' ')} · {formatPrice(p.price)}</p>
                  <div className="flex gap-2">
                    <Link href={`/shop/${p.slug}`} className="flex-1 inline-flex items-center justify-center gap-1 h-9 rounded-btn text-xs font-bold" style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}><ExternalLink size={13} /> View</Link>
                    <button type="button" onClick={() => removeProduct(p.id)} aria-label="Delete product" className="inline-flex items-center justify-center w-9 h-9 rounded-btn" style={{ background: 'rgba(179,38,30,0.1)', color: '#B3261E' }}><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function OrdersTab() {
  const orders = useAdminStore((s) => s.orders)
  const updateOrderStatus = useAdminStore((s) => s.updateOrderStatus)
  const removeOrder = useAdminStore((s) => s.removeOrder)

  const counts = useMemo(() => {
    const c: Record<string, number> = {}
    for (const o of orders) c[o.status] = (c[o.status] ?? 0) + 1
    return c
  }, [orders])

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-5">
        {ORDER_STATUSES.map((s) => (
          <span key={s} className="text-xs font-bold px-3 py-1.5 rounded-full capitalize" style={{ background: 'var(--bg-surface)', color: STATUS_COLOR[s], border: '1px solid var(--border)' }}>
            {s}: {counts[s] ?? 0}
          </span>
        ))}
      </div>

      {orders.length === 0 ? (
        <div className="rounded-card p-12 text-center text-sm" style={{ background: 'var(--bg-surface)', border: '1px dashed var(--border)', color: 'var(--text-tertiary)' }}>
          No orders yet. They appear here when a customer checks out or emails a custom order.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="rounded-card p-4 flex flex-col sm:flex-row gap-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
              {o.preview && (
                <div className="relative w-16 h-20 flex-shrink-0 rounded-badge overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
                  <Image src={o.preview} alt="Design" fill className="object-cover" sizes="64px" unoptimized />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>#{o.id}</span>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-primary)', color: 'var(--text-secondary)' }}>{o.source}</span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{new Date(o.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <p className="text-sm mt-1" style={{ color: 'var(--text-primary)' }}>{o.summary}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {o.customer.name} · {o.customer.phone}{o.customer.email ? ` · ${o.customer.email}` : ''}
                </p>
                {o.customer.address && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{o.customer.address}</p>}
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--text-primary)' }}>Qty {o.quantity} · {formatPrice(o.total)}</p>
              </div>
              <div className="flex sm:flex-col items-center sm:items-end gap-2">
                <select value={o.status} onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)} aria-label="Order status" className="h-9 px-3 rounded-btn text-xs font-bold capitalize outline-none" style={{ background: 'var(--bg-primary)', border: `2px solid ${STATUS_COLOR[o.status]}`, color: STATUS_COLOR[o.status] }}>
                  {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <button type="button" onClick={() => removeOrder(o.id)} aria-label="Delete order" className="inline-flex items-center justify-center w-9 h-9 rounded-btn" style={{ background: 'rgba(179,38,30,0.1)', color: '#B3261E' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
