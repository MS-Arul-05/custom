'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle, Package, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface OrderSnapshot {
  orderId: string
  items: { name: string; color: string; size: string; quantity: number; price: number; image: string }[]
  total: number
  method: string
}

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<OrderSnapshot | null>(null)

  useEffect(() => {
    const raw = sessionStorage.getItem('fitbox-last-order')
    if (raw) setOrder(JSON.parse(raw))
  }, [])

  const orderId = order?.orderId ?? 'FB000000'

  return (
    <div className="max-w-[640px] mx-auto px-4 sm:px-6 py-20 text-center">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent-light)' }}>
        <CheckCircle size={32} style={{ color: 'var(--accent)' }} />
      </div>
      <h1 className="font-heading font-extrabold text-3xl mb-2" style={{ color: 'var(--text-primary)' }}>
        Order confirmed!
      </h1>
      <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
        Order <span className="font-bold" style={{ color: 'var(--text-primary)' }}>#{orderId}</span>
      </p>
      <p className="text-sm mb-8 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        Your fit is locked in. We&apos;ll send tracking to your email within 24 hours. Estimated delivery: 3–5 days.
      </p>

      {order && order.items.length > 0 && (
        <div className="rounded-card p-5 mb-6 text-left" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-bold uppercase tracking-wide mb-4 flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
            <Package size={13} /> In this order
          </p>
          <div className="space-y-3">
            {order.items.map((it, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-14 relative overflow-hidden rounded-badge" style={{ background: 'var(--bg-primary)' }}>
                  {it.image && <Image src={it.image} alt={it.name} fill className="object-cover" sizes="48px" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{it.name}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{it.color} · {it.size} · Qty {it.quantity}</p>
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatPrice(it.price * it.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4 mt-4 border-t text-base font-bold" style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <span>Paid ({order.method.toUpperCase()})</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/shop" className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn text-white" style={{ background: 'var(--accent)' }}>
          Continue shopping
        </Link>
        <Link href="/customize" className="inline-flex items-center gap-2 h-11 px-7 text-sm font-bold rounded-btn" style={{ background: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
          <Sparkles size={15} /> Design your next fit
        </Link>
      </div>
    </div>
  )
}
