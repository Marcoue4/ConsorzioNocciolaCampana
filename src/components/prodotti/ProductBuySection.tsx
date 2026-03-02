'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/components/cart/CartContext'

interface ProductBuySectionProps {
  product: {
    title: string
    slug: string
    description: string
    image: string
    category: string
    price: string
    unit: string
    origin?: string
  }
}

export default function ProductBuySection({ product }: ProductBuySectionProps) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger reveal on mount
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      title: product.title,
      image: product.image,
      price: product.price,
      unit: product.unit,
    quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => Math.min(99, q + 1))

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20"
    >
      {/* ── Back link ── */}
      <Link
        href="/prodotti"
        className={`group mb-8 inline-flex items-center gap-2 text-sm font-medium text-hazel-600 transition hover:text-hazel-800 sm:mb-10 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        } transition-all duration-500`}
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Torna ai prodotti
      </Link>

      {/* ── Product layout ── */}
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div
          className={`relative aspect-square overflow-hidden rounded-2xl bg-cream-100 shadow-sm ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } transition-all duration-700 ease-out`}
        >
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info & Buy */}
        <div
          className={`flex flex-col justify-center ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          } transition-all delay-200 duration-700 ease-out`}
        >
          {/* Category */}
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand-brown)]">
            {product.category}
          </p>

          {/* Title */}
          <h1 className="mt-3 font-serif text-3xl font-bold leading-tight text-hazel-900 sm:text-4xl md:text-[2.75rem]">
            {product.title}
          </h1>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-2">
            <span className="font-serif text-2xl font-bold text-hazel-800 sm:text-3xl">
              {product.price}
            </span>
            <span className="text-sm text-hazel-500">{product.unit}</span>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-lg leading-relaxed text-hazel-600">
            {product.description}
          </p>

          {/* Origin */}
          {product.origin && (
            <p className="mt-4 text-sm text-hazel-500">
              <span className="font-medium text-hazel-700">Origine:</span>{' '}
              {product.origin}
            </p>
          )}

          {/* Quantity + Add to cart */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {/* Quantity selector */}
            <div className="inline-flex items-center overflow-hidden rounded-full border border-hazel-300">
              <button
                onClick={decrease}
                aria-label="Diminuisci quantità"
                className="flex h-11 w-11 items-center justify-center text-lg text-hazel-700 transition hover:bg-cream-100"
              >
                −
              </button>
              <span className="flex h-11 w-10 items-center justify-center text-sm font-semibold text-hazel-800">
                {quantity}
              </span>
              <button
                onClick={increase}
                aria-label="Aumenta quantità"
                className="flex h-11 w-11 items-center justify-center text-lg text-hazel-700 transition hover:bg-cream-100"
              >
                +
              </button>
            </div>

            {/* Add to cart button */}
            <button
              onClick={handleAddToCart}
              className={`inline-flex items-center gap-2.5 rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:shadow-lg active:scale-[0.97] ${
                added
                  ? 'bg-forest-600'
                  : 'bg-[var(--brand-green)] hover:bg-forest-700'
              }`}
            >
              {added ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Aggiunto!
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  Aggiungi al carrello
                </>
              )}
            </button>
          </div>

          {/* ── Trust badges ── */}
          <div
            className={`mt-10 grid grid-cols-3 gap-4 border-t border-hazel-200 pt-8 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            } transition-all delay-500 duration-700 ease-out`}
          >
            {/* Fast shipping */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-hazel-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h3.375m0 0V11.25m0 3h8.25m-8.25 0V5.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.625m0 0h2.25m0 0c.621 0 1.125.504 1.125 1.125v2.25"
                />
              </svg>
              <span className="text-xs font-medium text-hazel-600">
                Spedizione rapida
              </span>
            </div>

            {/* Quality guaranteed */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-hazel-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-xs font-medium text-hazel-600">
                Qualità garantita
              </span>
            </div>

            {/* 100% Natural */}
            <div className="flex flex-col items-center gap-2 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-hazel-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
                />
              </svg>
              <span className="text-xs font-medium text-hazel-600">
                100% Naturale
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
