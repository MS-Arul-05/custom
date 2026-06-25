import type { Metadata } from 'next'
import CustomizeClient from './CustomizeClient'

export const metadata: Metadata = {
  title: 'Customize — Design Your Own T-Shirt',
  description:
    'Design your own tee, hoodie or polo in real time. Pick a style and colour, add art or AI-generated graphics, drop in text, preview front/back/360°, and add to cart.',
}

export default function CustomizePage() {
  return <CustomizeClient />
}
