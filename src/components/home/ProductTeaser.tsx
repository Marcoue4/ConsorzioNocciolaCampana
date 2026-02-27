import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'

export default function ProductTeaser() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 md:px-10 md:py-24">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-5 lg:items-center">
          <div className="lg:col-span-2">
            <SectionHeader
              label="I prodotti"
              heading="Dalla nocciola al prodotto di eccellenza."
            />
            <p className="mt-5 leading-relaxed text-hazel-700">
              Crema spalmabile, granella, noci e olio di nocciola: ogni
              trasformazione nasce dal rispetto della materia prima e della
              tradizione.
            </p>
            <Link
              href="/prodotti"
              className="mt-8 inline-block rounded-full bg-hazel-800 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-hazel-900 hover:shadow-lg sm:mt-10 sm:px-8 sm:py-3.5"
            >
              Esplora i prodotti
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-3">
            <div className="img-zoom relative h-44 overflow-hidden rounded-2xl shadow-lg sm:h-64">
              <Image
                src="/images/Foto-1-Crema-Spamabile-Nocciola--960x720.jpg"
                alt="Crema spalmabile"
                fill
                className="object-cover"
              />
            </div>
            <div className="img-zoom relative mt-8 h-44 overflow-hidden rounded-2xl shadow-lg sm:mt-12 sm:h-64">
              <Image
                src="/images/olio-di-nocciola.jpg"
                alt="Olio di nocciola"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
