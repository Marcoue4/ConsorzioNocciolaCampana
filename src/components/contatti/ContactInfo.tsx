import SectionHeader from '@/components/ui/SectionHeader'

export default function ContactInfo() {
  return (
    <div>
      <SectionHeader label="Scrivici" heading="Come contattarci" />
      <p className="mt-7 leading-relaxed text-hazel-700">
        Per informazioni sul consorzio, sulle attività in corso, sulle
        opportunità di adesione o per richieste commerciali, non esitare a
        contattarci. Saremo lieti di rispondere nel più breve tempo possibile.
      </p>

      <div className="mt-12 space-y-6">
        <div className="rounded-2xl border border-cream-200 bg-white p-7 shadow-sm transition hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            Email
          </p>
          <a
            href="mailto:info@consorzionocciolacampana.it"
            className="mt-2 block break-all font-serif text-base font-medium text-hazel-900 transition hover:text-forest-700 sm:text-lg"
          >
            info@consorzionocciolacampana.it
          </a>
        </div>

        <div className="rounded-2xl border border-cream-200 bg-white p-7 shadow-sm transition hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            Telefono
          </p>
          <a
            href="tel:+390000000000"
            className="mt-2 block font-serif text-lg font-medium text-hazel-900 transition hover:text-forest-700"
          >
            +39 000 000 0000
          </a>
        </div>

        <div className="rounded-2xl border border-cream-200 bg-white p-7 shadow-sm transition hover:shadow-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest-600">
            Sede
          </p>
          <p className="mt-2 font-serif text-lg font-medium text-hazel-900">
            Campania, Italia
          </p>
          <p className="mt-1 text-sm text-hazel-600">
            Indirizzo completo da confermare
          </p>
        </div>
      </div>
    </div>
  )
}
