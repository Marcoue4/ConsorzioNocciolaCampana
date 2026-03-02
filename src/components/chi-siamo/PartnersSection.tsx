import Image from 'next/image'
import SectionHeader from '@/components/ui/SectionHeader'
import { getPartners } from '@/sanity/queries'
import { partners as staticPartners } from '@/data/chi-siamo'

export default async function PartnersSection() {
  let partners = staticPartners
  try {
    const sanityPartners = await getPartners()
    if (sanityPartners?.length) partners = sanityPartners.map((p: { name: string }) => p.name)
  } catch (e) {
    // Fallback to static data
  }

  return (
    <section id="partner" className="bg-white scroll-mt-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:gap-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:grid-cols-2 lg:items-center">
        <div className="img-zoom relative h-[240px] overflow-hidden rounded-2xl shadow-2xl sm:h-[320px] md:rounded-3xl lg:h-[380px]">
          <Image
            src="/images/universita_federico_sec_napoli.jpg"
            alt="Università Federico II"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <SectionHeader
            label="Partner e collaborazioni"
            heading="Al fianco di chi crede nel territorio."
          />
          <p className="mt-7 leading-relaxed text-hazel-700">
            Collaboriamo attivamente con l&apos;Università degli Studi di Napoli
            Federico II, la Facoltà di Agraria e numerosi enti locali. Queste
            partnership ci permettono di condurre ricerche applicate, organizzare
            convegni e promuovere la formazione tecnica per i nostri produttori.
          </p>
          <ul className="mt-10 space-y-4 text-sm text-hazel-700">
            {partners.map((partner) => (
              <li
                key={partner}
                className="rounded-xl border border-cream-200 bg-cream-50 px-5 py-4 shadow-sm transition hover:shadow-md"
              >
                ✓ {partner}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
