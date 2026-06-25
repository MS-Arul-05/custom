import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'FITBOX is committed to making custom apparel shopping accessible to everyone, targeting WCAG 2.1 AA.',
}

export default function AccessibilityPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-2"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Accessibility
      </h1>
      <p className="text-xs mb-8" style={{ color: 'var(--text-tertiary)' }}>
        Last updated: June 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <p>
          FITBOX is for everyone, and that includes how the site works. We&apos;re committed to making shopping,
          designing, and unboxing usable for all customers, including people with disabilities.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          Our standard
        </h2>
        <p>
          We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. We test regularly and treat
          accessibility as an ongoing build, not a one-time checkbox.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          What we&apos;ve built in
        </h2>
        <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Keyboard navigation</strong> — every interactive element
            is reachable and operable with a keyboard alone.
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Visible focus rings</strong> — a clear orange outline
            shows keyboard focus at all times.
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Semantic HTML</strong> — proper heading hierarchy and
            landmark regions (nav, main, footer).
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Colour contrast</strong> — body text meets the WCAG AA
            minimum of 4.5:1.
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Reduced motion</strong> — animations are dialled down for
            users who prefer reduced motion at the OS level.
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Descriptive alt text</strong> — meaningful images carry
            descriptive alternatives.
          </li>
        </ul>

        <div
          className="rounded-card p-5"
          style={{ background: 'var(--accent-light)', borderLeft: '3px solid var(--accent)' }}
        >
          <p className="font-heading font-bold mb-1" style={{ color: 'var(--accent)' }}>
            Hit a barrier?
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            If anything on FITBOX is hard to use, or you need content in another format, tell us at{' '}
            <a href="mailto:reach@fitbox.example" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              reach@fitbox.example
            </a>
            . We aim to respond within 2 business days.
          </p>
        </div>
      </div>
    </div>
  )
}
