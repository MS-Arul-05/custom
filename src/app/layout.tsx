import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartDrawer from '@/components/cart/CartDrawer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'FITBOX — Custom T-Shirts, Streetwear & Mystery Drops',
    template: '%s | FITBOX',
  },
  description:
    'Design your own T-shirt in real time, cop limited drops, unbox mystery fits, and shop India-first streetwear. Bold fits, fast shipping, UPI checkout.',
  keywords: [
    'custom t-shirt',
    'streetwear india',
    'oversized tshirt',
    'mystery box',
    'design your own tshirt',
    'anime tshirt',
  ],
  metadataBase: new URL('https://fitbox.example.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Cabinet Grotesk — headings, via Fontshare CDN */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,700,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  )
}
