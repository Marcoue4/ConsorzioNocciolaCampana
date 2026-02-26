import ChiSiamoHero from '@/components/chi-siamo/ChiSiamoHero'
import MissionSection from '@/components/chi-siamo/MissionSection'
import TimelineSection from '@/components/chi-siamo/TimelineSection'
import ValuesSection from '@/components/chi-siamo/ValuesSection'
import PartnersSection from '@/components/chi-siamo/PartnersSection'
import ClosingQuote from '@/components/chi-siamo/ClosingQuote'

export const metadata = {
  title: 'Chi Siamo — Consorzio Nocciola Campana',
  description: 'La storia, la missione e i valori del Consorzio Nocciola Campana.',
}

export default function ChiSiamo() {
  return (
    <div className="bg-cream-50">
      <ChiSiamoHero />
      <MissionSection />
      <TimelineSection />
      <ValuesSection />
      <PartnersSection />
      <ClosingQuote />
    </div>
  )
}
