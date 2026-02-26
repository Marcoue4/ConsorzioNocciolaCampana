import HeroSection from '@/components/home/HeroSection'
import PillarsSection from '@/components/home/PillarsSection'
import ShowcaseSection from '@/components/home/ShowcaseSection'
import ProductTeaser from '@/components/home/ProductTeaser'
import NewsPreview from '@/components/home/NewsPreview'
import HomeCTA from '@/components/home/HomeCTA'

export default function Home() {
  return (
    <div className="bg-cream-50">
      <HeroSection />
      <PillarsSection />
      <ShowcaseSection />
      <ProductTeaser />
      <NewsPreview />
      <HomeCTA />
    </div>
  )
}
