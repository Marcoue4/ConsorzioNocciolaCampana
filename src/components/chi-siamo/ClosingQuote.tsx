import Link from 'next/link'

export default function ClosingQuote() {
  return (
    <section className="bg-forest-900 py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <svg
          className="mx-auto h-8 w-8 text-forest-400 sm:h-10 sm:w-10"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
        </svg>
        <blockquote className="mt-6 font-serif text-xl font-medium leading-relaxed text-cream-100 sm:mt-8 sm:text-2xl md:text-3xl">
          La forza del consorzio è la forza del territorio: cresciamo insieme,
          produciamo meglio.
        </blockquote>
        <p className="mt-6 text-sm text-cream-400">
          — Consorzio Nocciola Campana
        </p>
        <Link
          href="/contatti"
          className="mt-10 inline-block rounded-full border border-cream-400/30 bg-white/10 px-8 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:mt-12"
        >
          Unisciti al consorzio →
        </Link>
      </div>
    </section>
  )
}
