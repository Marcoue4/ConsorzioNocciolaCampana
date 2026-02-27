import ArticleCard from '@/components/ui/ArticleCard'
import { articles } from '@/data/notizie'

export default function ArticlesGrid() {
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
