import PageHero from '@/components/ui/PageHero'
import ContactInfo from '@/components/contatti/ContactInfo'
import ContactForm from '@/components/contatti/ContactForm'
import MapSection from '@/components/contatti/MapSection'

export const metadata = {
  title: 'Contatti — Consorzio Nocciola Campana',
  description: 'Contatta il Consorzio Nocciola Campana per informazioni, collaborazioni o richieste commerciali.',
}

export default function Contatti() {
  return (
    <div className="bg-cream-50">
      <PageHero
        label="Contatti"
        title="Parliamo del futuro della nocciola campana."
        backgroundImage="/images/c75e00e05b140c56669d9a6a8aaa89cb-italia.jpg"
      />

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
        <div className="grid gap-10 sm:gap-16 lg:grid-cols-2">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>

      <MapSection />
    </div>
  )
}
