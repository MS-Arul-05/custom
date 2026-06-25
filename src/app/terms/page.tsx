import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms and conditions governing your use of FITBOX and your orders.',
}

export default function TermsPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-2"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Terms of Service
      </h1>
      <p className="text-xs mb-8" style={{ color: 'var(--text-tertiary)' }}>
        Last updated: June 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <p>
          By using FITBOX (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) or placing an order, you agree to
          these terms. If you don&apos;t agree, please don&apos;t use the site.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          1. Use of the site
        </h2>
        <p>
          You may use FITBOX to browse, design, and order apparel for lawful, personal use. You agree not to misuse
          the site, scrape it, disrupt it, or upload designs you don&apos;t have the rights to.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          2. Orders &amp; pricing
        </h2>
        <p>
          All prices are listed in Indian Rupees (₹ INR) and include applicable taxes unless stated otherwise.
          Placing an order is an offer to purchase, which we may accept or decline — including in cases of pricing
          errors, stock issues, or suspected fraud. We may update prices at any time, but changes won&apos;t affect
          orders already confirmed.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          3. Custom orders &amp; mystery boxes
        </h2>
        <p>
          Custom-printed pieces and mystery boxes are made or curated specifically for you and are{' '}
          <strong style={{ color: 'var(--text-primary)' }}>final sale</strong> — they can&apos;t be returned or
          exchanged unless they arrive damaged or defective. By submitting a custom design, you confirm you own or
          have permission to use every element of it, and you grant us the rights needed to produce your order.
          Mystery box contents are curated at our discretion; exact items are not guaranteed.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          4. Intellectual property
        </h2>
        <p>
          All site content — text, graphics, logos, original designs, and the FITBOX name — is owned by or licensed
          to us and may not be reproduced or used without written permission. Designs uploaded by users remain the
          responsibility of the user; we accept no liability for infringing content you submit.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          5. Limitation of liability
        </h2>
        <p>
          To the fullest extent permitted by law, FITBOX is not liable for any indirect, incidental, or
          consequential damages arising from your use of our products or services. Our total liability shall not
          exceed the value of your most recent order.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          6. Governing law &amp; contact
        </h2>
        <p>
          These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Chennai, Tamil
          Nadu. Questions? Email us at{' '}
          <a href="mailto:reach@fitbox.example" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            reach@fitbox.example
          </a>
          .
        </p>
      </div>
    </div>
  )
}
