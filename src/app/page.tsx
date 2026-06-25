import Hero from '@/components/home/Hero'
import ProductRail from '@/components/home/ProductRail'
import DropsSection from '@/components/home/DropsSection'
import CustomizeCTA from '@/components/home/CustomizeCTA'
import CollectionsGrid from '@/components/home/CollectionsGrid'
import InfluencerPicks from '@/components/home/InfluencerPicks'
import ReviewsSection from '@/components/home/ReviewsSection'
import Newsletter from '@/components/home/Newsletter'
import { getNewArrivals, getBestsellers, getDrops } from '@/lib/products'

export default function HomePage() {
  const newArrivals = getNewArrivals()
  const trending = getBestsellers()
  const drops = getDrops()

  return (
    <>
      <Hero />
      <ProductRail title="New arrivals" subtitle="Fresh off the press." products={newArrivals} viewAllHref="/shop?sort=newest" priority />
      <CustomizeCTA />
      <ProductRail title="Trending now" subtitle="What everyone's copping this week." products={trending} viewAllHref="/shop" />
      <DropsSection products={drops} />
      <CollectionsGrid />
      <InfluencerPicks />
      <ReviewsSection />
      <Newsletter />
    </>
  )
}
