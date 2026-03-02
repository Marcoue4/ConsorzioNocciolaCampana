import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getArticleBySlug, getArticleSlugs } from '@/sanity/queries'
import { articles as staticArticles } from '@/data/notizie'

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const sanity = await getArticleSlugs()
    if (sanity?.length) return sanity
  } catch (e) {
    // Fallback
  }
  return staticArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  let article: Record<string, unknown> | null = null

  try {
    article = await getArticleBySlug(slug)
  } catch (e) {
    // Fallback
  }
  if (!article) {
    const found = staticArticles.find((a) => a.slug === slug)
    if (!found) return {}
    return {
      title: `${found.title} — Consorzio Nocciola Campana`,
      description: found.excerpt,
    }
  }
  return {
    title: `${article.title} — Consorzio Nocciola Campana`,
    description: article.excerpt,
  }
}

function formatDate(raw: string): string {
  if (raw.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return new Date(raw).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }
  return raw
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params

  // Try Sanity first
  let article: Record<string, unknown> | null = null
  let isSanity = false
  try {
    article = await getArticleBySlug(slug)
    if (article) isSanity = true
  } catch (e) {
    // Fallback
  }

  // Fallback to static
  const staticArticle = !article
    ? staticArticles.find((a) => a.slug === slug) ?? null
    : null

  if (!article && !staticArticle) notFound()

  const title = (article?.title ?? staticArticle?.title) as string
  const image = (article?.image ?? staticArticle?.image) as string
  const date = formatDate((article?.date ?? staticArticle?.date) as string)

  return (
    <div className="bg-cream-50">
      {/* Hero banner */}
      <section className="relative h-[40vh] min-h-[280px] sm:h-[50vh]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hazel-950/80 via-hazel-900/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-3xl px-4 pb-8 sm:px-6 sm:pb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-300 sm:text-sm">
            {date}
          </p>
          <h1 className="mt-2 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
            {title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 md:py-20">
        <div className="space-y-5 text-base leading-relaxed text-hazel-700 sm:text-lg">
          {isSanity && article?.body ? (
            <PortableText value={article.body as any} />
          ) : (
            staticArticle?.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))
          )}
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
