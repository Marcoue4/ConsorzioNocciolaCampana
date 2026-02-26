import SectionHeader from '@/components/ui/SectionHeader'

export default function ProductIntro() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20 md:px-10 md:py-24">
      <SectionHeader
        label="La nostra offerta"
        heading="Prodotti di filiera, qualità garantita."
        centered
      />
      <p className="mt-7 leading-relaxed text-hazel-700">
        Ogni prodotto del consorzio nasce da una filiera controllata e
        certificata. Dalla raccolta alla trasformazione, ogni fase è orientata
        alla massima qualità e al rispetto della tradizione agricola campana.
      </p>
    </section>
  )
}
