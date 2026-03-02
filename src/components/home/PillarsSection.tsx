import Link from 'next/link'
import { getPillars } from '@/sanity/queries'
import { pillars as staticPillars } from '@/data/home'

function PillarIcon({ name }: { name: string }) {
  const iconClassName = 'h-6 w-6 text-forest-700'

  if (name === 'leaf') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={iconClassName}
      >
        <path
          d="M21 4.5c-7.5 0-12 2.5-14.4 7.5-1.3 2.6-1.7 5.1-1.5 7.5 2.4.2 4.9-.2 7.5-1.5C17.6 15.6 20 11 20 3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4 20c2.6-3.6 6-5.9 10-7" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'award') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={iconClassName}
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M9.2 11.8 8 20l4-2 4 2-1.2-8.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'truck') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={iconClassName}
      >
        <rect x="2" y="6" width="11" height="8" rx="1.5" />
        <path d="M13 8h4l3 3v3h-7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="7" cy="17" r="1.8" />
        <circle cx="17" cy="17" r="1.8" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={iconClassName}
    >
      <path
        d="M12 20.5S4 15.6 4 9.8A4.3 4.3 0 0 1 8.3 5.5c1.7 0 2.8.8 3.7 2 1-1.2 2.1-2 3.8-2A4.3 4.3 0 0 1 20 9.8c0 5.8-8 10.7-8 10.7Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default async function PillarsSection() {
  let pillars = staticPillars
  try {
    const sanityPillars = await getPillars()
    if (sanityPillars?.length) pillars = sanityPillars
  } catch (e) {
    // Fallback to static data
  }

  return (
    <section className="bg-cream-100/70 py-20 sm:py-24 md:py-28 lg:py-32">
      <div className="mx-auto max-w-360 px-4 text-center sm:px-6 md:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-600">
          I nostri valori
        </p>
        <h2 className="mt-4 font-serif text-4xl font-bold text-hazel-900 sm:text-5xl md:text-6xl lg:text-[4.25rem]">
          Perché scegliere CO.N.C.I.
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-12 sm:mt-20 sm:grid-cols-2 sm:gap-y-14 lg:mt-24 lg:grid-cols-4 lg:gap-x-12">
          {pillars.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group flex flex-col items-center rounded-2xl p-2 transition hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest-500/60"
            >
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-cream-200/70 transition-colors group-hover:bg-forest-100">
                <PillarIcon name={item.icon} />
              </div>
              <h3 className="mt-6 font-serif text-[2.05rem] font-bold leading-tight text-hazel-900 transition-colors group-hover:text-forest-700">
                {item.title}
              </h3>
              <p className="mt-4 max-w-72 text-base leading-relaxed text-hazel-600 lg:max-w-68">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
