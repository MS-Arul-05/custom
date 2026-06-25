import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Size Guide',
  description:
    'FITBOX size guide and chest, length, and shoulder measurements in inches for sizes XS to XXXL. Oversized fits run 1–2 sizes large.',
}

const sizes = [
  { size: 'XS', chest: 38, length: 26, shoulder: 17 },
  { size: 'S', chest: 40, length: 27, shoulder: 18 },
  { size: 'M', chest: 42, length: 28, shoulder: 19 },
  { size: 'L', chest: 44, length: 29, shoulder: 20 },
  { size: 'XL', chest: 46, length: 30, shoulder: 21 },
  { size: 'XXL', chest: 48, length: 31, shoulder: 22 },
  { size: 'XXXL', chest: 50, length: 32, shoulder: 23 },
]

export default function SizeGuidePage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1
        className="font-heading font-extrabold tracking-tight mb-6"
        style={{ fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--text-primary)' }}
      >
        Size Guide
      </h1>

      <div className="space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        <p>
          All measurements are the actual garment dimensions in inches. To find your size, lay a tee you already
          love flat and measure it edge to edge, then match it to the chart below.
        </p>

        {/* Size chart */}
        <div className="overflow-x-auto">
          <table
            className="w-full text-center"
            style={{ borderCollapse: 'collapse', border: '1px solid var(--border)' }}
          >
            <thead>
              <tr style={{ background: 'var(--bg-dark)' }}>
                <th className="font-heading font-bold p-3" style={{ color: '#FFFFFF', border: '1px solid var(--border)' }}>
                  Size
                </th>
                <th className="font-heading font-bold p-3" style={{ color: '#FFFFFF', border: '1px solid var(--border)' }}>
                  Chest (in)
                </th>
                <th className="font-heading font-bold p-3" style={{ color: '#FFFFFF', border: '1px solid var(--border)' }}>
                  Length (in)
                </th>
                <th className="font-heading font-bold p-3" style={{ color: '#FFFFFF', border: '1px solid var(--border)' }}>
                  Shoulder (in)
                </th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((row) => (
                <tr key={row.size} style={{ background: 'var(--bg-surface)' }}>
                  <td
                    className="p-3 font-heading font-bold"
                    style={{ color: 'var(--accent)', border: '1px solid var(--border)' }}
                  >
                    {row.size}
                  </td>
                  <td className="p-3" style={{ color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                    {row.chest}
                  </td>
                  <td className="p-3" style={{ color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                    {row.length}
                  </td>
                  <td className="p-3" style={{ color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                    {row.shoulder}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Oversized note */}
        <div
          className="rounded-card p-5"
          style={{ background: 'var(--accent-light)', borderLeft: '3px solid var(--accent)' }}
        >
          <p className="font-heading font-bold mb-1" style={{ color: 'var(--accent)' }}>
            Going oversized?
          </p>
          <p style={{ color: 'var(--text-secondary)' }}>
            Our oversized and boxy fits run <strong style={{ color: 'var(--text-primary)' }}>1–2 sizes large</strong> by
            design. If you want that draped, baggy streetwear silhouette, stick to your true size. Prefer a cleaner,
            closer fit? Size down one.
          </p>
        </div>

        <h2 className="font-heading font-bold text-lg pt-2" style={{ color: 'var(--text-primary)' }}>
          How to measure
        </h2>
        <ul className="space-y-2 pl-5" style={{ listStyle: 'disc' }}>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Chest</strong> — measure straight across the garment one
            inch below the armholes, then match to the chest column.
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Length</strong> — measure from the highest point of the
            shoulder down to the bottom hem.
          </li>
          <li>
            <strong style={{ color: 'var(--text-primary)' }}>Shoulder</strong> — measure seam to seam across the back
            of the shoulders.
          </li>
        </ul>

        <p>Still unsure? DM us your usual size and we&apos;ll point you to the perfect fit.</p>
      </div>
    </div>
  )
}
