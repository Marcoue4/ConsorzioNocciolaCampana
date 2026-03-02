import ArticleCard from '@/components/ui/ArticleCard'
import { getArticles } from '@/sanity/queries'
import { articles as staticArticles } from '@/data/notizie'

export default async function ArticlesGrid() {
  let articles = staticArticles
  try {
    const sanityArticles = await getArticles()
    if (sanityArticles?.length) {
      articles = sanityArticles.map((a: Record<string, unknown>) => ({
        ...a,
        date:
          typeof a.date === 'string' && a.date.match(/^\d{4}-\d{2}-\d{2}$/)
            ? new Date(a.date as string).toLocaleDateString('it-IT', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })
            : a.date,
      }))
    }
  } catch (e) {
    // Fallback to static data
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
      <div className="grid gap-5 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard
            key={article.slug}
            title={article.title}
            image={article.image}
            excerpt={article.excerpt}
            date={article.date}
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  )
}
