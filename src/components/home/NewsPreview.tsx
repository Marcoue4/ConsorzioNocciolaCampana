import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import ArticleCard from '@/components/ui/ArticleCard'
import { latestNews } from '@/data/home'

export default function NewsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-14 sm:gap-6">
        <SectionHeader label="Aggiornamenti" heading="Notizie dal Consorzio" />
        <Link
          href="/notizie"
          className="hidden text-sm font-semibold text-forest-700 transition hover:text-forest-800 sm:block"
        >
          Vedi tutte →
        </Link>
      </div>

      <div className="grid gap-5 sm:gap-8 md:grid-cols-3">
        {latestNews.map((item) => (
          <ArticleCard key={item.title} {...item} />
        ))}
      </div>

      <div className="mt-10 text-center sm:hidden">
        <Link
          href="/notizie"
          className="text-sm font-semibold text-forest-700"
        >
          Vedi tutte le notizie →
        </Link>
      </div>
    </section>
  )
}
