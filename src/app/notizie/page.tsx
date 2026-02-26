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
        backgroundImage="/images/321843775_565221228398510_4770792309745797666_n.jpg"
      />
      <ArticlesGrid />
    </div>
  )
}
