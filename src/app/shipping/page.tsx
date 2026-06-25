import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shipping',
  description:
    'FITBOX shipping info — free shipping over ₹1,499, 24–48 hour dispatch, 3–5 day standard delivery, express options, and India-wide plus international shipping.',
}

const rates = [
  { method: 'Standard (India)', time: '3–5 business days', cost: '₹79 — Free over ₹1,499' },
  { method: 'Express (India)', time: '1–2 business days', cost: '₹149' },
  { method: 'Metro same-day', time: 'Order before 12 PM', cost: '₹199 (select pincodes)' },
  { method: 'International', time: '7–14 business days', cost: 'Calculated at checkout' },
]

export default function ShippingPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-6"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Shipping
      </h1>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <p>
          We print every fit on demand in our Chennai studio and ship across India and worldwide. Get{' '}
          <strong style={{ color: 'var(--text-primary)' }}>free standard shipping on orders over ₹1,499</strong>{' '}
          — otherwise standard shipping is a flat <strong style={{ color: 'var(--text-primary)' }}>₹79</strong>.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          Dispatch &amp; delivery
        </h2>
        <p>
          Orders are processed and dispatched within <strong style={{ color: 'var(--text-primary)' }}>24–48 hours</strong>.
          Standard delivery lands in <strong style={{ color: 'var(--text-primary)' }}>3–5 business days</strong> once
          shipped. Need it faster? Express and metro same-day options are available at checkout. Custom-printed pieces
          and mystery boxes ship on the same timeline — no extra wait for going custom.
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          Rates &amp; timelines
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  className="font-heading font-bold p-3 text-sm"
                  style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--border)' }}
                >
                  Method
                </th>
                <th
                  className="font-heading font-bold p-3 text-sm"
                  style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--border)' }}
                >
                  Delivery time
                </th>
                <th
                  className="font-heading font-bold p-3 text-sm"
                  style={{ color: 'var(--text-primary)', borderBottom: '2px solid var(--border)' }}
                >
                  Cost
                </th>
              </tr>
            </thead>
            <tbody>
              {rates.map((r) => (
                <tr key={r.method}>
                  <td
                    className="p-3"
                    style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border)', fontWeight: 600 }}
                  >
                    {r.method}
                  </td>
                  <td className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    {r.time}
                  </td>
                  <td className="p-3" style={{ borderBottom: '1px solid var(--border)' }}>
                    {r.cost}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          Tracking
        </h2>
        <p>
          The moment your order ships, we&apos;ll email you a tracking link. You can also track any order live on our{' '}
          <a href="/track" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
            order tracking page
          </a>{' '}
          using your FITBOX order ID (e.g. FB123456).
        </p>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          International orders
        </h2>
        <p>
          We ship worldwide. International duties, taxes, and customs fees are determined by the destination country
          and are the responsibility of the customer. Delivery typically takes 7–14 business days depending on your
          location and local customs processing.
        </p>
      </div>
    </div>
  )
}
