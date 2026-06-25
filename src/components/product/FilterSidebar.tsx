'use client'
import type { Category, Fit } from '@/types'

export interface FilterState {
  categories: Category[]
  collections: string[]
  fits: Fit[]
  sizes: string[]
  priceMax: number // rupees
}

export const PRICE_MAX = 1500

export const CATEGORY_LABELS: Record<Category, string> = {
  'oversized-t-shirts': 'Oversized Tees',
  'regular-fit-t-shirts': 'Regular Tees',
  'graphic-tees': 'Graphic Tees',
  'anime-collection': 'Anime',
  'streetwear-collection': 'Streetwear',
  hoodies: 'Hoodies',
  sweatshirts: 'Sweatshirts',
  'polo-shirts': 'Polos',
  'crop-tops': 'Crop Tops',
  jackets: 'Jackets',
  accessories: 'Accessories',
}

const COLLECTIONS = ['streetwear', 'gym', 'college', 'creator']
const FITS: Fit[] = ['oversized', 'regular', 'relaxed', 'boxy', 'slim']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}

interface Props {
  filters: FilterState
  onChange: (f: FilterState) => void
}

export default function FilterSidebar({ filters, onChange }: Props) {
  const Group = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="pb-6 mb-6 border-b" style={{ borderColor: 'var(--border)' }}>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.08em] mb-3" style={{ color: 'var(--text-secondary)' }}>
        {title}
      </h3>
      {children}
    </div>
  )

  const Chip = ({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="px-3 h-8 rounded-full text-xs font-semibold transition-colors"
      style={{
        background: active ? 'var(--accent)' : 'var(--bg-surface)',
        color: active ? '#fff' : 'var(--text-primary)',
        border: `1px solid ${active ? 'var(--accent)' : 'var(--border)'}`,
      }}
    >
      {label}
    </button>
  )

  return (
    <div>
      <Group title="Category">
        <div className="flex flex-col gap-2">
          {(Object.keys(CATEGORY_LABELS) as Category[]).map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'var(--text-primary)' }}>
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => onChange({ ...filters, categories: toggle(filters.categories, cat) })}
                className="accent-[var(--accent)] w-4 h-4"
              />
              {CATEGORY_LABELS[cat]}
            </label>
          ))}
        </div>
      </Group>

      <Group title="Collection">
        <div className="flex flex-wrap gap-2">
          {COLLECTIONS.map((c) => (
            <Chip
              key={c}
              active={filters.collections.includes(c)}
              label={c[0].toUpperCase() + c.slice(1)}
              onClick={() => onChange({ ...filters, collections: toggle(filters.collections, c) })}
            />
          ))}
        </div>
      </Group>

      <Group title="Fit">
        <div className="flex flex-wrap gap-2">
          {FITS.map((f) => (
            <Chip
              key={f}
              active={filters.fits.includes(f)}
              label={f[0].toUpperCase() + f.slice(1)}
              onClick={() => onChange({ ...filters, fits: toggle(filters.fits, f) })}
            />
          ))}
        </div>
      </Group>

      <Group title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <Chip
              key={s}
              active={filters.sizes.includes(s)}
              label={s}
              onClick={() => onChange({ ...filters, sizes: toggle(filters.sizes, s) })}
            />
          ))}
        </div>
      </Group>

      <Group title={`Max price · ₹${filters.priceMax}`}>
        <input
          type="range"
          min={300}
          max={PRICE_MAX}
          step={100}
          value={filters.priceMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-[var(--accent)]"
          aria-label="Maximum price"
        />
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>
          <span>₹300</span>
          <span>₹{PRICE_MAX}</span>
        </div>
      </Group>
    </div>
  )
}
