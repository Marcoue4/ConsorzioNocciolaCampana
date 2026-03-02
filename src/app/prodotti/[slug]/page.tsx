import { notFound } from 'next/navigation'
import { getProductBySlug, getProductSlugs } from '@/sanity/queries'
import { products as staticProducts } from '@/data/prodotti'
import ProductBuySection from '@/components/prodotti/ProductBuySection'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const sanity = await getProductSlugs()
    if (sanity?.length) return sanity
  } catch (e) {
    // Fallback
  }
  return staticProducts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { slug } = await params
  let product: Record<string, unknown> | null = null

  try {
    product = await getProductBySlug(slug)
  } catch (e) {
    // Fallback
  }

  if (!product) {
    const found = staticProducts.find((p) => p.slug === slug)
    if (!found) return {}
    return {
      title: `${found.title} — Consorzio Nocciola Campana`,
      description: found.description,
    }
  }

  return {
    title: `${product.title} — Consorzio Nocciola Campana`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  // Try Sanity first
  let product: Record<string, unknown> | null = null
  try {
    product = await getProductBySlug(slug)
  } catch (e) {
    // Fallback to static
  }

  // Fallback to static data
  if (!product) {
    const found = staticProducts.find((p) => p.slug === slug)
    if (!found) notFound()
    product = found as unknown as Record<string, unknown>
  }

  return (
    <div className="bg-cream-50">
      <ProductBuySection
        product={{
          title: product.title as string,
          slug: product.slug as string,
          description: product.description as string,
          image: product.image as string,
          category: product.category as string,
          price: product.price as string,
          unit: product.unit as string,
          origin: (product.origin as string) || undefined,
        }}
      />
    </div>
  )
}
