import { values } from '@/data/chi-siamo'

export default function ValuesSection() {
  return (
    <section id="valori" className="scroll-mt-28 py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-forest-600">
          I nostri valori
        </p>
        <h2 className="mt-4 text-center font-serif text-3xl font-bold text-hazel-900 sm:text-4xl">
          I principi che ci guidano.
        </h2>

        <div className="mt-12 space-y-6 sm:mt-16 sm:space-y-8">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex items-stretch overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <div className={`w-1.5 shrink-0 ${v.accent}`} />
              <div className="flex-1 px-6 py-6 sm:px-9 sm:py-8">
                <h3 className="font-serif text-lg font-semibold text-hazel-800 sm:text-xl">
                  {v.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-hazel-600 sm:text-base">
                  {v.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
