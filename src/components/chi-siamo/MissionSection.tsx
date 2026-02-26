import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'

export default function MissionSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:gap-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:grid-cols-2 lg:items-center">
      <div className="img-zoom relative h-[260px] overflow-hidden rounded-2xl shadow-2xl sm:h-[340px] md:rounded-3xl lg:h-[420px]">
        <Image
          src="/images/IMG_2281.jpg"
          alt="Il consorzio al lavoro"
          fill
          className="object-cover"
        />
      </div>
      <div>
        <SectionHeader
          label="La nostra missione"
          heading="Una filiera integrata al servizio del territorio."
        />
        <p className="mt-7 leading-relaxed text-hazel-700">
          Il Consorzio Nocciola Campana nasce per riunire produttori,
          trasformatori e operatori della filiera corilicola in un progetto
          comune di valorizzazione. Operiamo con l&apos;obiettivo di garantire
          qualità, tracciabilità e competitività per le aziende aderenti,
          promuovendo la nocciola campana sui mercati nazionali e
          internazionali.
        </p>
        <p className="mt-5 leading-relaxed text-hazel-700">
          Attraverso il dialogo costante con istituzioni, università e centri di
          ricerca, sviluppiamo pratiche innovative e sostenibili che rispettano
          la tradizione agricola del territorio campano.
        </p>
      </div>
    </section>
  )
}
