'use client'

import { useState } from 'react'
import Image from 'next/image'
import { products, categories, type ProductCategory } from '@/data/prodotti'

export default function ProductGrid() {
  const [active, setActive] = useState<ProductCategory>('Tutti')

  const filtered =
    active === 'Tutti'
      ? products
      : products.filter((p) => p.category === active)

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
      {/* ── Category filter pills ── */}
      <div className="mb-10 flex flex-wrap gap-3 sm:mb-14">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition ${
              active === cat
                ? 'border-hazel-800 bg-hazel-800 text-white shadow-sm'
                : 'border-hazel-300 bg-white text-hazel-700 hover:border-hazel-500 hover:bg-cream-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Product grid ── */}
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <article key={product.title} className="group">
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
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-hazel-500">
                {product.category}
              </p>
              <h3 className="mt-1 font-serif text-base font-bold text-hazel-900 sm:text-lg">
                {product.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-hazel-600">
                {product.description}
              </p>
              <p className="mt-2">
                <span className="font-serif text-lg font-bold text-hazel-800">
                  {product.price}
                </span>
                <span className="ml-1.5 text-sm text-hazel-500">
                  {product.unit}
                </span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
