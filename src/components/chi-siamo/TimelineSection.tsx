import { milestones } from '@/data/chi-siamo'

export default function TimelineSection() {
  return (
    <section className="bg-white py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-600">
            La nostra storia
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold text-hazel-900 sm:text-4xl">
            Un percorso che cresce ogni anno.
          </h2>
        </div>

        <div className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-cream-300 sm:left-1/2 sm:-translate-x-px" />

          {milestones.map((m, i) => (
            <div
              key={m.year}
              className={`relative mb-10 flex items-start gap-6 sm:mb-12 ${
                i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-4 top-1 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-forest-600 bg-cream-50 sm:left-1/2" />

              {/* Spacer for desktop alternating layout */}
              <div className="hidden flex-1 sm:block" />

              {/* Content card */}
              <div className="ml-10 flex-1 rounded-xl border border-cream-200 bg-cream-50 p-5 shadow-sm sm:ml-0 sm:p-6">
                <span className="font-serif text-lg font-bold text-forest-700">
                  {m.year}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-hazel-700">
                  {m.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
