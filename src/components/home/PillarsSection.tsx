import Link from 'next/link'
import { pillars } from '@/data/home'

export default function PillarsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
      <div className="mb-10 max-w-2xl sm:mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-600">
          Cosa facciamo
        </p>
        <h2 className="mt-4 font-serif text-3xl font-bold text-hazel-900 sm:text-4xl">
          I pilastri del nostro impegno.
        </h2>
      </div>
      <div className="divide-y divide-cream-200">
        {pillars.map((item) => (
          <Link key={item.num} href={item.href} className="group block">
            <div className="flex items-start gap-5 py-7 sm:gap-8 sm:py-10 md:items-center">
              <span className="shrink-0 font-serif text-3xl font-bold text-forest-600/30 transition-colors group-hover:text-forest-600 sm:text-5xl">
                {item.num}
              </span>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-semibold text-hazel-800 transition-colors group-hover:text-forest-700 sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-hazel-600">
                  {item.description}
                </p>
              </div>
              <span className="hidden text-lg text-hazel-300 transition-transform group-hover:translate-x-1 group-hover:text-forest-600 sm:block">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
