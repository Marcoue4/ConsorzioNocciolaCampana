import Image from 'next/image'
import Link from 'next/link'

interface ArticleCardProps {
  title: string
  image: string
  excerpt: string
  date?: string
  slug?: string
}

export default function ArticleCard({
  title,
  image,
  excerpt,
  date,
  slug,
}: ArticleCardProps) {
  const Wrapper = slug ? Link : 'div'
  const wrapperProps = slug ? { href: `/notizie/${slug}` } : {}

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="img-zoom group block overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden sm:h-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5 sm:p-7">
        {date && (
          <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            {date}
          </p>
        )}
        <h3 className="mt-2 font-serif text-base font-semibold text-hazel-900 sm:mt-3 sm:text-lg">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-hazel-600">
          {excerpt}
        </p>
        {slug && (
          <p className="mt-4 text-sm font-semibold text-forest-700 transition group-hover:text-forest-800">
            Leggi tutto &rarr;
          </p>
        )}
      </div>
    </Wrapper>
  )
}
