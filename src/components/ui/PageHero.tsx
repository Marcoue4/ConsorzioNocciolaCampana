import Image from 'next/image'
import { ReactNode } from 'react'

interface PageHeroProps {
  label: string
  title: string | ReactNode
  backgroundImage: string
  /** Background image opacity (default: 0.2 → "opacity-20") */
  backgroundOpacity?: string
}

export default function PageHero({
  label,
  title,
  backgroundImage,
  backgroundOpacity = 'opacity-20',
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-hazel-950">
      <div className={`absolute inset-0 ${backgroundOpacity}`}>
        <Image src={backgroundImage} alt="" fill className="object-cover" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 md:px-10 md:py-32">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream-400">
          {label}
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-3xl font-bold leading-tight text-white sm:mt-5 sm:text-4xl md:text-5xl">
          {title}
        </h1>
      </div>
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 50" fill="none" className="w-full">
          <path
            d="M0,50 L0,18 Q360,0 720,18 Q1080,36 1440,18 L1440,50 Z"
            fill="#fefcf9"
          />
        </svg>
      </div>
    </section>
  )
}
