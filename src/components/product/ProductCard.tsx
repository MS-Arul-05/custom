'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Star } from 'lucide-react'
import type { Product, Badge } from '@/types'
import { formatPrice } from '@/lib/utils'
import { useCartStore } from '@/store/cart'

interface Props {
  product: Product
  priority?: boolean
}

const BADGE_STYLE: Record<Badge, { bg: string; color: string; label: string }> = {
  new: { bg: 'var(--accent-light)', color: 'var(--accent)', label: 'New' },
  bestseller: { bg: 'var(--bg-dark)', color: '#fff', label: 'Bestseller' },
  drop: { bg: 'var(--accent)', color: '#fff', label: 'Drop' },
  restock: { bg: '#E8F5EC', color: 'var(--success)', label: 'Restock' },
}

export default function ProductCard({ product, priority = false }: Props) {
  const addItem = useCartStore((s) => s.addItem)
  const [hovered, setHovered] = useState(false)

  const hasSale = product.salePrice != null && product.salePrice < product.price
  const displayPrice = hasSale ? product.salePrice! : product.price
  const badge = product.badge
  const badgeStyle = badge ? BADGE_STYLE[badge] : null

  const firstAvailableSize =
    product.sizes.find((s) => !(product.outOfStock ?? []).includes(s)) ?? product.sizes[0]

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      kind: 'product',
      productId: product.id,
      name: product.name,
      price: displayPrice,
      size: firstAvailableSize,
      color: product.colors[0].name,
      image: product.images[0],
    })
  }

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative aspect-[4/5] overflow-hidden rounded-card"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <Image
          src={hovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={`${product.name} — front and back`}
          fill
          priority={priority}
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 300px"
        />

        {badgeStyle && (
          <span
            className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-badge"
            style={{ background: badgeStyle.bg, color: badgeStyle.color }}
          >
            {badgeStyle.label}
          </span>
        )}

        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 h-10 rounded-btn text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-1.5"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          <ShoppingBag size={15} />
          Quick add
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-semibold leading-snug" style={{ color: 'var(--text-primary)' }}>
            {product.name}
          </p>
          {product.rating != null && (
            <span
              className="flex items-center gap-0.5 text-xs font-medium shrink-0 mt-0.5"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Star size={11} fill="#FFB400" style={{ color: '#FFB400' }} />
              {product.rating}
            </span>
          )}
        </div>

        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
          {product.fabric}
        </p>

        <div className="flex items-center gap-2 pt-1">
          <p className="text-sm font-bold" style={{ color: hasSale ? 'var(--accent)' : 'var(--text-primary)' }}>
            {formatPrice(displayPrice)}
          </p>
          {hasSale && (
            <p className="text-xs line-through" style={{ color: 'var(--text-tertiary)' }}>
              {formatPrice(product.price)}
            </p>
          )}
          <div className="flex gap-1 ml-auto">
            {product.colors.slice(0, 4).map((c) => (
              <span
                key={c.name}
                title={c.name}
                aria-label={c.name}
                className="w-3.5 h-3.5 rounded-full border"
                style={{ background: c.hex, borderColor: 'rgba(0,0,0,0.18)' }}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
