import Link from 'next/link'

export default function ChiSiamoHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-forest-900 via-forest-800 to-forest-950">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.12) 0%, transparent 50%), radial-gradient(circle at 75% 30%, rgba(255,255,255,0.08) 0%, transparent 45%)',
          }}
        />
      </div>
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32 md:py-40">
        <span className="rounded-full border border-cream-400/30 bg-white/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-cream-300 backdrop-blur-sm">
          Chi siamo
        </span>
        <h1 className="mt-7 font-serif text-3xl font-bold leading-tight text-white sm:mt-8 sm:text-4xl md:text-5xl lg:text-[3.5rem] lg:leading-[1.15]">
          Costruiamo il futuro
          <br className="hidden sm:inline" /> della nocciola campana.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-cream-200 sm:text-base">
          Il Consorzio Nocciola Campana riunisce produttori, trasformatori e
          operatori in un progetto comune di valorizzazione del territorio.
        </p>
      </div>
      {/* Angled bottom edge */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          preserveAspectRatio="none"
          className="h-10 w-full sm:h-16"
        >
          <path d="M0,80 L0,40 L720,80 L1440,40 L1440,80 Z" fill="#fefcf9" />
        </svg>
      </div>
    </section>
  )
}
