import Image from 'next/image'
import { getProducts } from '@/sanity/queries'
import { products as staticProducts } from '@/data/prodotti'

/**
 * Legacy alternating-row product layout.
 * Kept for reference — the active page now uses ProductGrid instead.
 */
export default async function ProductCards() {
  let products = staticProducts
  try {
    const sanityProducts = await getProducts()
    if (sanityProducts?.length) products = sanityProducts
  } catch (e) {
    // Fallback to static data
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 md:px-10 md:pb-24">
      <div className="space-y-14 sm:space-y-20">
        {products.map((product, idx) => (
          <div
            key={product.title}
            className={`grid gap-8 sm:gap-14 lg:grid-cols-2 lg:items-center ${
              idx % 2 === 1 ? 'lg:direction-rtl' : ''
            }`}
          >
            <div className={`${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="img-zoom relative h-[240px] overflow-hidden rounded-2xl shadow-2xl sm:h-[320px] md:rounded-3xl lg:h-[400px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className={`${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
              <h3 className="font-serif text-2xl font-bold text-hazel-900 sm:text-3xl">
                {product.title}
              </h3>
              <p className="mt-5 leading-relaxed text-hazel-700">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
