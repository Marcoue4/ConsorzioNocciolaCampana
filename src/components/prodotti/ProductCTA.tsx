export default function ProductCTA() {
  return (
    <section className="bg-hazel-950 py-14 text-center text-white sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 md:px-10">
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          Interessato ai nostri prodotti?
        </h2>
        <p className="mt-5 leading-relaxed text-cream-300">
          Contattaci per informazioni commerciali, ordini o per diventare
          partner del consorzio.
        </p>
        <a
          href="/contatti"
          className="mt-10 inline-block rounded-full bg-cream-100 px-9 py-3.5 text-sm font-semibold text-hazel-900 shadow-lg transition hover:bg-white hover:shadow-xl"
        >
          Contattaci ora
        </a>
      </div>
    </section>
  )
}
