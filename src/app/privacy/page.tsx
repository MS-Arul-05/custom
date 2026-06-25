import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How FITBOX collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-2"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Privacy Policy
      </h1>
      <p className="text-xs mb-8" style={{ color: 'var(--text-tertiary)' }}>
        Last updated: June 2026
      </p>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <p>
          At FITBOX, your trust matters as much as your fits. This policy explains what we collect when you shop,
          design, and unbox with us, and how we keep it safe.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          1. Information we collect
        </h2>
        <p>
          We collect what you give us directly — name, email, phone, shipping address, and order details — plus the
          designs you build in our customizer. We also collect data automatically as you browse, such as IP address,
          device and browser type, and the pages you view. Payment details are handled by our payment partners and
          are never stored on our servers.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          2. How we use it
        </h2>
        <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
          <li>Process, print, and ship your orders, including custom and mystery-box items</li>
          <li>Send order confirmations, dispatch alerts, and tracking updates</li>
          <li>Provide support and answer your questions</li>
          <li>Send drops and offers if you&apos;ve opted in (you can opt out anytime)</li>
          <li>Detect fraud and keep FITBOX secure</li>
        </ul>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          3. Sharing your information
        </h2>
        <p>
          We do not sell your personal data. We share it only with trusted partners who help us run the store —
          payment processors, print and logistics partners, and email providers — all contractually bound to protect
          it. We may also disclose information where required by law.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          4. Cookies
        </h2>
        <p>
          We use essential cookies to keep your cart and session working, functional cookies to remember your
          preferences, and analytics cookies to understand how the site is used. You can manage cookies in your
          browser settings, though disabling essential cookies may break checkout.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          5. Your rights
        </h2>
        <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
          <li>Access the personal data we hold about you</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data, subject to legal requirements</li>
          <li>Withdraw consent for marketing at any time</li>
        </ul>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          6. Contact
        </h2>
        <p>
          Questions about your privacy? Reach us at{' '}
          <a href="mailto:reach@fitbox.example" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            reach@fitbox.example
          </a>
          .
        </p>
      </div>
    </div>
  )
}
