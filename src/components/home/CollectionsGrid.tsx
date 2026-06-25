import Link from 'next/link'
import Image from 'next/image'
import { COLLECTIONS } from '@/lib/data'

export default function CollectionsGrid() {
  return (
    <section className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
      <h2 className="font-heading font-extrabold tracking-tight mb-8" style={{ fontSize: 'clamp(26px, 3.5vw, 40px)', color: 'var(--text-primary)' }}>
        Shop by vibe
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {COLLECTIONS.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="group block relative aspect-[3/4] rounded-card overflow-hidden">
            <Image
              src={c.image}
              alt={c.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 25vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.78) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="font-heading font-bold text-xl text-white">{c.title}</h3>
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.8)' }}>
                {c.blurb}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
