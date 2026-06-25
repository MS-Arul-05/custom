import Link from 'next/link'
import { Zap, Instagram, Youtube, Twitter } from 'lucide-react'

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: 'New Arrivals', href: '/shop?sort=newest' },
      { label: 'Oversized Tees', href: '/shop/category/oversized-t-shirts' },
      { label: 'Hoodies', href: '/shop/category/hoodies' },
      { label: 'Limited Drops', href: '/drops' },
      { label: 'Customize', href: '/customize' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Mystery Box', href: '/mystery-box' },
      { label: 'Collections', href: '/collections' },
      { label: 'Designer Marketplace', href: '/designer' },
      { label: 'Size Guide', href: '/size-guide' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Track Order', href: '/track' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
      { label: 'Account', href: '/account' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-24" style={{ background: 'var(--bg-dark)' }}>
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-heading font-extrabold text-2xl flex items-center gap-1.5 text-white">
              <Zap size={22} fill="var(--accent)" style={{ color: 'var(--accent)' }} />
              FITBOX
            </Link>
            <p className="text-sm mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
              India-first custom apparel. Design it, drop it, wear it loud.
            </p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Youtube, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="FITBOX social"
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.08)', color: '#fff' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-4"
                style={{ color: 'rgba(255,255,255,0.45)' }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            © 2026 FITBOX. Designed &amp; printed in India. All prices in ₹ INR.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            UPI · Cards · NetBanking · Wallets
          </p>
        </div>
      </div>
    </footer>
  )
}
