import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { articles } from '@/data/notizie'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: `${article.title} — Consorzio Nocciola Campana`,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  return (
    <div className="bg-cream-50">
      {/* Hero banner */}
      <section className="relative h-[40vh] min-h-[280px] sm:h-[50vh]">
        <Image
          src={article.image}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hazel-950/80 via-hazel-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-300 sm:text-sm">
            {article.date}
          </p>
          <h1 className="mt-2 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {article.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
        <div className="space-y-5 text-base leading-relaxed text-hazel-700 sm:text-lg">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 border-t border-cream-200 pt-8">
          <Link
            href="/notizie"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest-700 transition hover:text-forest-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Tutte le notizie
          </Link>
        </div>
      </article>
    </div>
  )
}
