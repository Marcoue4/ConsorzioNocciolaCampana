import PageHero from '@/components/ui/PageHero'
import ProductIntro from '@/components/prodotti/ProductIntro'
import ProductCards from '@/components/prodotti/ProductCards'
import ProductCTA from '@/components/prodotti/ProductCTA'

export const metadata = {
  title: 'Prodotti — Consorzio Nocciola Campana',
  description: 'La nocciola campana e i prodotti della filiera: qualità, varietà e trasformazione.',
}

export default function Prodotti() {
  return (
    <div className="bg-cream-50">
      <PageHero
        label="Prodotti"
        title="Dalla terra campana alla vostra tavola."
        backgroundImage="/images/filiere-frutta-in-guscio-800x445-1.jpg"
        backgroundOpacity="opacity-25"
      />
      <ProductIntro />
      <ProductCards />
      <ProductCTA />
    </div>
  )
}
