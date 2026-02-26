import ProductHero from '@/components/prodotti/ProductHero'
import ProductGrid from '@/components/prodotti/ProductGrid'
import ProductCTA from '@/components/prodotti/ProductCTA'

export const metadata = {
  title: 'Prodotti — Consorzio Nocciola Campana',
  description: 'La nocciola campana e i prodotti della filiera: qualità, varietà e trasformazione.',
}

export default function Prodotti() {
  return (
    <div className="bg-cream-50">
      <ProductHero />
      <ProductGrid />
      <ProductCTA />
    </div>
  )
}
