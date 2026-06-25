import type { Metadata } from 'next'
import { MapPin, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join FITBOX — we are hiring across print production, design, growth, and community. Chennai / Remote roles building India’s loudest custom apparel brand.',
}

const roles = [
  {
    title: 'Print Production Lead',
    team: 'Operations',
    type: 'Full-time',
    blurb:
      'Own our Chennai DTG floor end to end — dial in print quality, keep dispatch under 48 hours, and scale output without dropping the bar on every fit that leaves the studio.',
  },
  {
    title: 'Graphic Designer',
    team: 'Creative',
    type: 'Full-time',
    blurb:
      'Push our drops, marketplace templates, and customizer assets. You live in graphics, type, and streetwear references, and you can take a hype idea from sketch to print-ready in a day.',
  },
  {
    title: 'Growth Marketer',
    team: 'Marketing',
    type: 'Full-time',
    blurb:
      'Run paid, performance, and lifecycle across India. You obsess over CAC, drop hype loops, and turning first-time buyers into repeat FITBOX heads.',
  },
  {
    title: 'Community Manager',
    team: 'Brand',
    type: 'Full-time',
    blurb:
      'Be the voice of FITBOX online. Rally our designer marketplace, run drops in the comments, and keep our community louder and tighter than anyone else in the game.',
  },
]

export default function CareersPage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-[760px] mb-12">
        <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)' }}>
          Careers
        </p>
        <h1
          className="font-heading font-extrabold tracking-tight mb-5"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--text-primary)', lineHeight: 1.05 }}
        >
          Build the loudest fits in India with us.
        </h1>
        <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          We&apos;re a small, fast crew turning custom apparel, drops, mystery boxes, and a designer marketplace
          into one unstoppable brand. If you want real ownership and zero corporate filler, scroll down — one of
          these might have your name on it.
        </p>
      </div>

      {/* Roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
        {roles.map((r) => (
          <div
            key={r.title}
            className="rounded-card p-7 flex flex-col"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[11px] font-bold uppercase tracking-wide px-2 py-1 rounded-badge"
                style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
              >
                {r.team}
              </span>
              <span className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                {r.type}
              </span>
            </div>
            <h2 className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--text-primary)' }}>
              {r.title}
            </h2>
            <p className="flex items-center gap-1.5 text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
              <MapPin size={13} /> Chennai / Remote
            </p>
            <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: 'var(--text-secondary)' }}>
              {r.blurb}
            </p>
            <a
              href={`mailto:careers@fitbox.example?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
              className="inline-flex items-center gap-2 h-10 px-5 text-sm font-bold rounded-btn text-white self-start transition-colors"
              style={{ background: 'var(--accent)' }}
            >
              Apply now <ArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* No fit callout */}
      <div
        className="rounded-card p-8 text-center"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
      >
        <h2 className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
          Don&apos;t see your role?
        </h2>
        <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>
          If you think you can make FITBOX better, pitch us. We hire for hunger over checklists.
        </p>
        <a
          href="mailto:careers@fitbox.example?subject=Open%20application"
          className="inline-flex items-center gap-2 h-10 px-6 text-sm font-bold rounded-btn"
          style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          Send an open application
        </a>
      </div>
    </div>
  )
}
