import Link from 'next/link'
import { ReactNode } from 'react'

interface CTABandProps {
  heading: ReactNode
  description: string
  /** Background Tailwind class (default: "bg-cream-100") */
  bg?: string
  /** Text color class for heading (default: "text-hazel-900") */
  headingColor?: string
  /** Text color class for description (default: "text-hazel-700") */
  descriptionColor?: string
  links: { label: string; href: string; variant: 'primary' | 'secondary' }[]
}

const variantStyles = {
  primary:
    'rounded-full bg-forest-700 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-forest-800 hover:shadow-lg sm:px-8 sm:py-3.5',
  secondary:
    'rounded-full border border-hazel-300 bg-white px-6 py-3 text-sm font-semibold text-hazel-800 shadow-sm transition hover:bg-cream-50 hover:shadow-md sm:px-8 sm:py-3.5',
}

export default function CTABand({
  heading,
  description,
  bg = 'bg-cream-100',
  headingColor = 'text-hazel-900',
  descriptionColor = 'text-hazel-700',
  links,
}: CTABandProps) {
  return (
    <section className={`${bg} py-14 sm:py-20 md:py-24`}>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 md:px-10">
        <h2 className={`font-serif text-3xl font-bold sm:text-4xl ${headingColor}`}>
          {heading}
        </h2>
        <p className={`mx-auto mt-6 max-w-2xl leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 sm:mt-10 sm:gap-5">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={variantStyles[link.variant]}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
