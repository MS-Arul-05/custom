'use client'
import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import { useAdminStore } from '@/store/admin'
import type { Category } from '@/types'
import ProductCard from '@/components/product/ProductCard'
import FilterSidebar, { PRICE_MAX, CATEGORY_LABELS } from '@/components/product/FilterSidebar'
import type { FilterState } from '@/components/product/FilterSidebar'

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'sale'

const EMPTY: FilterState = {
  categories: [],
  collections: [],
  fits: [],
  sizes: [],
  priceMax: PRICE_MAX,
}

export default function ShopClient() {
  const params = useSearchParams()
  const categoryParam = params.get('category')
  const collectionParam = params.get('collection')
  const sortParam = params.get('sort') as SortOption | null

  const [filters, setFilters] = useState<FilterState>(EMPTY)
  const [sort, setSort] = useState<SortOption>('featured')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Seed filters/sort from URL on mount + when params change.
  useEffect(() => {
    setFilters({
      ...EMPTY,
      categories: categoryParam && categoryParam in CATEGORY_LABELS ? [categoryParam as Category] : [],
      collections: collectionParam ? [collectionParam] : [],
    })
    if (sortParam) setSort(sortParam)
  }, [categoryParam, collectionParam, sortParam])

  const adminProducts = useAdminStore((s) => s.products)

  const filtered = useMemo(() => {
    const ALL = [...adminProducts, ...PRODUCTS]
    let list = ALL.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.collections.length && !filters.collections.some((c) => p.collections?.includes(c))) return false
      if (filters.fits.length && !filters.fits.includes(p.fit)) return false
      if (filters.sizes.length && !filters.sizes.some((s) => p.sizes.includes(s))) return false
      if ((p.salePrice ?? p.price) > filters.priceMax * 100) return false
      return true
    })

    switch (sort) {
      case 'price-asc':
        list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price))
        break
      case 'price-desc':
        list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price))
        break
      case 'newest':
        list = [...list].sort((a, b) => Number(b.isNewArrival) - Number(a.isNewArrival))
        break
      case 'sale':
        list = list.filter((p) => p.salePrice != null)
        break
      default:
        break
    }
    return list
  }, [filters, sort, adminProducts])

  const heading = filters.categories.length === 1 ? CATEGORY_LABELS[filters.categories[0]] : 'Shop all'

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-heading font-extrabold tracking-tight" style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}>
          {heading}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} product{filtered.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden flex items-center gap-2 h-10 px-4 text-sm font-semibold border rounded-btn self-start"
          style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
        >
          <SlidersHorizontal size={14} /> Filters
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <label htmlFor="sort" className="text-sm shrink-0" style={{ color: 'var(--text-secondary)' }}>
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="h-10 px-3 rounded-btn border text-sm focus:outline-none"
            style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)', color: 'var(--text-primary)' }}
          >
            <option value="featured">Featured</option>
            <option value="newest">New Arrivals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="sale">On Sale</option>
          </select>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="hidden lg:block w-[230px] flex-shrink-0">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-[300px] h-full overflow-y-auto px-6 py-8" style={{ background: 'var(--bg-primary)' }}>
              <div className="flex items-center justify-between mb-6">
                <p className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Filters</p>
                <button type="button" onClick={() => setSidebarOpen(false)} aria-label="Close filters">
                  <X size={20} style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
              <FilterSidebar filters={filters} onChange={setFilters} />
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="mt-2 w-full h-11 rounded-btn text-white text-sm font-bold"
                style={{ background: 'var(--accent)' }}
              >
                View {filtered.length} products
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="py-20 text-center" style={{ color: 'var(--text-secondary)' }}>
              <p className="text-lg mb-3">No products match your filters.</p>
              <button type="button" onClick={() => setFilters(EMPTY)} className="text-sm font-semibold underline" style={{ color: 'var(--accent)' }}>
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
