import ProductHero from '@/components/prodotti/ProductHero'
import ProductGrid from '@/components/prodotti/ProductGrid'
import ProductCTA from '@/components/prodotti/ProductCTA'
import { getProducts } from '@/sanity/queries'
import { products as staticProducts, categories } from '@/data/prodotti'

export const metadata = {
  title: 'Prodotti — Consorzio Nocciola Campana',
  description: 'La nocciola campana e i prodotti della filiera: qualità, varietà e trasformazione.',
}

export default async function Prodotti() {
  let products = staticProducts
  try {
    const sanityProducts = await getProducts()
    if (sanityProducts?.length) products = sanityProducts
  } catch (e) {
    // Fallback to static data
  }

  return (
    <div className="bg-cream-50">
      <ProductHero />
      <ProductGrid products={products} categories={categories} />
      <ProductCTA />
    </div>
  )
}
