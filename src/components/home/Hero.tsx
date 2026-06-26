import Link from 'next/link'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: '#F6EFE4' }}>
      {/* Desktop / laptop — full-width banner (text is baked into the image) */}
      <div className="relative w-full hidden lg:block">
        <img
          src="/hero/main-hero.jpg"
          alt="FITBOX — India-first custom apparel. Wear what you mean. Design your own tee in real time."
          draggable={false}
          className="block w-full h-auto select-none"
        />
        <Link href="/customize" aria-label="Design your tee" className="absolute" style={{ left: '3.5%', top: '66%', width: '14%', height: '9%' }} />
        <Link href="/drops" aria-label="Shop drops" className="absolute" style={{ left: '17.5%', top: '66%', width: '11%', height: '9%' }} />
      </div>

      {/* Mobile — readable live text + photo */}
      <div className="lg:hidden px-4 sm:px-6 py-12 text-center">
        <span
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] px-3 py-1.5 rounded-full mb-5 text-white"
          style={{ background: '#1A1A2E' }}
        >
          <Zap size={13} fill="var(--accent)" style={{ color: 'var(--accent)' }} /> India-first custom apparel
        </span>
        <h1
          className="font-heading font-extrabold leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(40px, 13vw, 64px)', color: '#16182B' }}
        >
          WEAR WHAT
          <br />
          YOU <span style={{ color: 'var(--accent)' }}>MEAN.</span>
        </h1>
        <p className="text-base mt-5 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(30,26,20,0.7)' }}>
          Design your own tee in real time, cop limited drops, and unbox mystery fits.
          Bold streetwear, printed in India, paid by UPI.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-7">
          <Link
            href="/customize"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold text-white"
            style={{ background: 'var(--accent)' }}
          >
            <Sparkles size={16} /> Design your tee
          </Link>
          <Link
            href="/drops"
            className="inline-flex items-center gap-2 h-12 px-7 rounded-btn text-sm font-bold text-white"
            style={{ background: '#1A1A2E' }}
          >
            Shop drops <ArrowRight size={16} />
          </Link>
        </div>
        <div className="flex items-center justify-center gap-5 mt-8">
          {[
            { n: '50k+', l: 'fits shipped' },
            { n: '4.8★', l: 'avg rating' },
            { n: '3–5d', l: 'delivery' },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center gap-5">
              {i > 0 && <span className="h-9 w-px" style={{ background: 'rgba(30,26,20,0.15)' }} aria-hidden />}
              <div>
                <p className="font-heading font-bold text-2xl" style={{ color: '#16182B' }}>{s.n}</p>
                <p className="text-xs" style={{ color: 'rgba(30,26,20,0.5)' }}>{s.l}</p>
              </div>
            </div>
          ))}
        </div>
        <img
          src="/hero/hero-people.jpg"
          alt="Friends wearing FITBOX custom streetwear tees"
          draggable={false}
          className="w-full max-w-[560px] mx-auto h-auto rounded-modal mt-9 select-none"
          style={{ boxShadow: '0 24px 50px -20px rgba(80,50,20,0.45)' }}
        />
      </div>
    </section>
  )
}
