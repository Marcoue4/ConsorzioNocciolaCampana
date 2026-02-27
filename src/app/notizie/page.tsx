import PageHero from '@/components/ui/PageHero'
import ArticlesGrid from '@/components/notizie/ArticlesGrid'

export const metadata = {
  title: 'Notizie — Consorzio Nocciola Campana',
  description: 'Ultime notizie, eventi e attività del Consorzio Nocciola Campana.',
}

export default function Notizie() {
  return (
    <div className="bg-cream-50">
      <PageHero
        label="Notizie"
        title="Aggiornamenti dal consorzio."
        backgroundImage="/images/jackmac34-hazelnuts-1707601_1920.jpg"
      />
      <ArticlesGrid />
    </div>
  )
}
