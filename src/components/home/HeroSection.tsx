import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/BackgroundNocciole.jpeg"
          alt="Nocciole Campane"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-hazel-950/90 via-hazel-900/75 to-hazel-950/50" />
      </div>

      <div className="relative mx-auto flex min-h-[60vh] max-w-7xl items-center px-4 py-20 sm:min-h-[80vh] sm:px-6 md:px-10 md:py-28">
        <div className="max-w-2xl text-white animate-fade-up">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-cream-300 sm:mb-5 sm:text-sm">
            Consorzio Nocciola Campana
          </p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
            Tradizione agricola,
            <br />
            visione moderna.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-cream-200 sm:mt-7 sm:text-base md:text-lg">
            Promuoviamo la cultura della nocciola campana con una filiera
            integrata che unisce territorio, qualità e innovazione.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 sm:mt-12 sm:gap-5">
            <Link
              href="/chi-siamo"
              className="rounded-full bg-cream-100 px-6 py-3 text-sm font-semibold text-hazel-900 shadow-lg transition hover:bg-white hover:shadow-xl sm:px-8 sm:py-3.5"
            >
              Scopri chi siamo
            </Link>
            <Link
              href="/contatti"
              className="rounded-full border border-cream-300/50 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 sm:px-8 sm:py-3.5"
            >
              Contattaci
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path
            d="M0,60 L0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,60 Z"
            fill="#fefcf9"
          />
        </svg>
      </div>
    </section>
  )
}
