'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart, formatPrice } from '@/components/cart/CartContext'

const SHIPPING_COST = 5
const FREE_SHIPPING_THRESHOLD = 50

export default function CartPage() {
  const { items, subtotal, removeItem, setQuantity } = useCart()
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <Link
          href="/prodotti"
          className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-hazel-600 transition hover:text-hazel-800"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          Continua lo shopping
        </Link>
        <h1 className="font-serif text-3xl font-bold text-hazel-900 sm:text-4xl">
          Il tuo carrello
        </h1>
        <p className="mt-6 text-hazel-600">Il carrello è vuoto.</p>
        <Link
          href="/prodotti"
          className="mt-8 inline-block rounded-full bg-[var(--brand-green)] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-forest-700"
        >
          Scopri i prodotti
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16">
      {/* Back link */}
      <Link
        href="/prodotti"
        className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-hazel-600 transition hover:text-hazel-800"
      >
        <span className="transition-transform group-hover:-translate-x-1">←</span>
        Continua lo shopping
      </Link>

      <h1 className="mb-10 font-serif text-3xl font-bold text-hazel-900 sm:text-4xl">
        Il tuo carrello
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        {/* ── Cart items ── */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-start gap-4 rounded-xl border border-hazel-200 bg-white p-4 shadow-sm sm:items-center sm:gap-6 sm:p-5"
            >
              {/* Thumbnail */}
              <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-cream-100 sm:h-20 sm:w-20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-sm font-bold text-hazel-900 sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-sm font-semibold text-hazel-700">
                  {item.price}
                </p>

                {/* Quantity */}
                <div className="mt-2 inline-flex items-center overflow-hidden rounded-md border border-hazel-300">
                  <button
                    onClick={() => setQuantity(item.slug, item.quantity - 1)}
                    aria-label="Diminuisci"
                    className="flex h-8 w-8 items-center justify-center text-sm text-hazel-700 transition hover:bg-cream-100"
                  >
                    −
                  </button>
                  <span className="flex h-8 w-8 items-center justify-center text-xs font-semibold text-hazel-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(item.slug, item.quantity + 1)}
                    aria-label="Aumenta"
                    className="flex h-8 w-8 items-center justify-center text-sm text-hazel-700 transition hover:bg-cream-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeItem(item.slug)}
                aria-label="Rimuovi dal carrello"
                className="flex-shrink-0 p-2 text-hazel-400 transition hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* ── Order summary ── */}
        <div className="h-fit rounded-xl border border-hazel-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <h2 className="font-serif text-lg font-bold text-hazel-900">
            Riepilogo ordine
          </h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-hazel-600">
              <span>Subtotale</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-hazel-600">
              <span>Spedizione</span>
              <span>{shipping === 0 ? 'Gratuita' : formatPrice(shipping)}</span>
            </div>
          </div>

          <div className="mt-4 flex justify-between border-t border-hazel-200 pt-4">
            <span className="font-bold text-hazel-900">Totale</span>
            <span className="font-serif text-lg font-bold text-hazel-900">
              {formatPrice(total)}
            </span>
          </div>

          <button className="mt-6 w-full rounded-full bg-[var(--brand-green)] py-3 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-forest-700 hover:shadow-lg active:scale-[0.98]">
            Procedi all&apos;ordine
          </button>

          <p className="mt-3 text-center text-xs text-hazel-500">
            Spedizione gratuita per ordini superiori a{' '}
            <span className="underline">{formatPrice(FREE_SHIPPING_THRESHOLD)}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
