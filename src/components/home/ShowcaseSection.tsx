import Image from 'next/image'
import Link from 'next/link'

export default function ShowcaseSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/WhatsApp-Image-2023-04-21-at-11.22.47-960x720.jpeg"
          alt="Noccioleti campani"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/85 via-forest-900/60 to-forest-950/40" />
      </div>
      <div className="relative mx-auto flex min-h-[50vh] max-w-4xl flex-col items-center justify-center px-4 py-16 text-center sm:min-h-[55vh] sm:px-6 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream-300">
          Il nostro territorio
        </p>
        <h2 className="mt-5 font-serif text-2xl font-bold leading-snug text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Dove la terra incontra la qualità.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-cream-200 sm:text-base">
          Tra le colline dell&apos;Irpinia e dell&apos;Avellinese, i nostri
          noccioleti crescono in un ecosistema unico che conferisce alla
          nocciola campana il suo carattere inconfondibile.
        </p>
        <Link
          href="/chi-siamo"
          className="mt-8 rounded-full border border-cream-300/40 bg-white/15 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/25 sm:mt-10 sm:px-9 sm:py-3.5"
        >
          La nostra storia →
        </Link>
      </div>
    </section>
  )
}
