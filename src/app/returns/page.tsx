import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Returns & Exchanges',
  description:
    '7-day easy returns and exchanges on FITBOX orders. Custom-printed and mystery-box items are final sale. Here is how to start a return.',
}

const steps = [
  {
    n: '1',
    title: 'Start your request',
    body: 'Head to your account, open the order, and hit “Return or exchange” within 7 days of delivery. Tell us what went wrong and pick a refund or a swap.',
  },
  {
    n: '2',
    title: 'Pack it back up',
    body: 'Keep the fit unworn, unwashed, and with tags on, in its original packaging. We’ll email you a prepaid return label for eligible items.',
  },
  {
    n: '3',
    title: 'Drop & ship',
    body: 'Stick on the label and hand it to the courier or drop it at the nearest pickup point. You’ll get a confirmation the moment it’s scanned.',
  },
  {
    n: '4',
    title: 'Refund or swap',
    body: 'Once we inspect your return, refunds hit your original payment method in 5–7 business days. Exchanges ship out as soon as the return is approved.',
  },
]

export default function ReturnsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-6"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Returns &amp; Exchanges
      </h1>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <p>
          Didn&apos;t vibe with your fit? No stress. We offer{' '}
          <strong style={{ color: 'var(--text-primary)' }}>7-day easy returns and exchanges</strong> on eligible
          orders. Items must come back unworn, unwashed, and with original tags and packaging intact.
        </p>

        {/* Final sale callout */}
        <div
          className="rounded-card p-5"
          style={{ background: 'var(--accent-light)', borderLeft: '3px solid var(--accent)' }}
        >
          <p className="font-heading font-bold mb-1" style={{ color: 'var(--accent)' }}>
            Heads up: some items are final sale
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Custom-printed pieces from the builder and mystery boxes are made or curated just for you, so they
            <strong style={{ color: 'var(--text-primary)' }}> can&apos;t be returned or exchanged</strong> unless they
            arrive damaged or defective. If something&apos;s off, reach out within 48 hours and we&apos;ll sort it.
          </p>
        </div>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          How to return or exchange
        </h2>
        <div className="space-y-4">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex gap-4 rounded-card p-5"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-btn font-heading font-bold text-white"
                style={{ background: 'var(--accent)' }}
              >
                {s.n}
              </div>
              <div>
                <h3 className="font-heading font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                  {s.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          Damaged or wrong item?
        </h2>
        <p>
          If your order arrives damaged, defective, or just plain wrong, email us at{' '}
          <a href="mailto:support@fitbox.example" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            support@fitbox.example
          </a>{' '}
          within 48 hours of delivery with your order ID and a photo. We&apos;ll make it right with a free
          replacement or full refund — no return shipping on us required.
        </p>
      </div>
    </div>
  )
}
