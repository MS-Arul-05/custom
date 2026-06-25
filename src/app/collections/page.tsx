import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { COLLECTIONS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Collections — Streetwear, Gym, College & Creator',
  description: 'Shop FITBOX collections curated by vibe: streetwear, gym, college and creator drops.',
}

export default function CollectionsPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading font-extrabold tracking-tight mb-2" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)' }}>
        Collections
      </h1>
      <p className="text-sm mb-10" style={{ color: 'var(--text-secondary)' }}>
        Curated by vibe. Pick your lane.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {COLLECTIONS.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group block relative aspect-[16/10] rounded-card overflow-hidden">
            <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 50vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 30%, rgba(0,0,0,0.8) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h2 className="font-heading font-extrabold text-3xl text-white">{c.title}</h2>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.85)' }}>{c.blurb}</p>
              <span className="inline-flex items-center gap-1 text-sm font-bold mt-3" style={{ color: 'var(--accent)' }}>
                Shop {c.title} <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
