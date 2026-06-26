import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#F6EFE4' }}>
      <div className="relative w-full">
        {/* The banner already contains the wording, buttons and stats. */}
        <img
          src="/hero/main-hero.jpg"
          alt="FITBOX — India-first custom apparel. Wear what you mean. Design your own tee in real time."
          draggable={false}
          className="block w-full h-auto select-none"
        />
        {/* Invisible hotspots over the baked-in buttons so they stay clickable. */}
        <Link href="/customize" aria-label="Design your tee" className="absolute" style={{ left: '3.5%', top: '66%', width: '14%', height: '9%' }} />
        <Link href="/drops" aria-label="Shop drops" className="absolute" style={{ left: '17.5%', top: '66%', width: '11%', height: '9%' }} />
      </div>
    </section>
  )
}
