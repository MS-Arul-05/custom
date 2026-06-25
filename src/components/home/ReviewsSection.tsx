import Image from 'next/image'
import { Star } from 'lucide-react'
import { REVIEWS } from '@/lib/data'

export default function ReviewsSection() {
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <h2 className="font-heading font-extrabold tracking-tight mb-2" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-primary)' }}>
        Real fits, real reviews
      </h2>
      <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
        Rated 4.8 out of 5 by 12,000+ customers.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REVIEWS.map((r) => (
          <div key={r.id} className="rounded-card p-5" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill={i < r.rating ? '#FFB400' : 'none'} style={{ color: i < r.rating ? '#FFB400' : 'var(--border)' }} />
              ))}
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
              &ldquo;{r.text}&rdquo;
            </p>
            <div className="flex items-center gap-2.5">
              <Image src={r.avatar} alt={r.name} width={32} height={32} className="rounded-full" />
              <div>
                <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{r.name}</p>
                <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>{r.product}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
