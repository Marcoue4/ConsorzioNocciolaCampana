import { ReactNode } from 'react'

interface SectionHeaderProps {
  label: string
  heading: ReactNode
  /** Show the decorative separator line (default: true) */
  separator?: boolean
  /** Center-align (default: false — left-aligned) */
  centered?: boolean
  className?: string
}

export default function SectionHeader({
  label,
  heading,
  separator = true,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? 'text-center' : ''} ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-forest-600">
        {label}
      </p>
      {separator && (
        <div className={`separator mt-4 ${centered ? 'mx-auto' : ''}`} />
      )}
      <h2
        className={`${separator ? 'mt-6' : 'mt-4'} font-serif text-3xl font-bold text-hazel-900 sm:text-4xl`}
      >
        {heading}
      </h2>
    </div>
  )
}
