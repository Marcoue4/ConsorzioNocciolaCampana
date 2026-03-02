'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { type ProductCategory } from '@/data/prodotti'

interface ProductGridProps {
  products: {
    title: string
    slug: string
    description: string
    image: string
    category: ProductCategory
    price: string
    unit: string
    origin?: string
    featured?: boolean
  }[]
  categories: ProductCategory[]
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [active, setActive] = useState<ProductCategory>('Tutti')

  const filtered =
    active === 'Tutti'
      ? products
      : products.filter((p) => p.category === active)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16">
      {/* ── Category filter pills ── */}
      <div className="mb-8 flex flex-wrap gap-2.5 sm:mb-10 sm:gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              active === cat
                ? 'border-[var(--brand-green)] bg-[var(--brand-green)] text-white shadow-sm'
                : 'border-hazel-300 bg-white text-hazel-700 hover:border-hazel-500 hover:bg-cream-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Product grid ── */}
      <div className="grid gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <Link
            key={product.title}
            href={`/prodotti/${product.slug}`}
            className="group block"
          >
            <article>
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-100">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.featured && (
                <span className="absolute left-3 top-3 rounded-full bg-hazel-700/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                  In evidenza
                </span>
              )}
            </div>

            {/* Info */}
            <div className="mt-4 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-hazel-500">
                {product.category}
              </p>
              <h3 className="font-serif text-base font-bold leading-tight text-hazel-900 sm:text-[1.35rem]">
                {product.title}
              </h3>
              <p className="min-h-[2.75rem] text-sm leading-relaxed text-hazel-600">
                {product.description}
              </p>
              <p className="pt-0.5">
                <span className="font-serif text-lg font-bold text-hazel-800">
                  {product.price}
                </span>
                <span className="ml-1.5 text-sm text-hazel-500">
                  {product.unit}
                </span>
              </p>
            </div>
          </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
