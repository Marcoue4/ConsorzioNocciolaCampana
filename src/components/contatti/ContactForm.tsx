export default function ContactForm() {
  return (
    <div className="rounded-2xl border border-cream-200 bg-white p-6 shadow-lg sm:rounded-3xl sm:p-9 md:p-12">
      <h3 className="font-serif text-2xl font-bold text-hazel-900">
        Invia un messaggio
      </h3>
      <p className="mt-3 text-sm text-hazel-600">
        Compila il modulo e ti risponderemo al più presto.
      </p>

      <form className="mt-10 space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-hazel-800"
          >
            Nome e cognome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-2 w-full rounded-xl border border-cream-300 bg-cream-50 px-5 py-3.5 text-sm text-hazel-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
            placeholder="Il tuo nome"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-hazel-800"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="mt-2 w-full rounded-xl border border-cream-300 bg-cream-50 px-5 py-3.5 text-sm text-hazel-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
            placeholder="La tua email"
          />
        </div>
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-hazel-800"
          >
            Oggetto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="mt-2 w-full rounded-xl border border-cream-300 bg-cream-50 px-5 py-3.5 text-sm text-hazel-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
            placeholder="Oggetto del messaggio"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-hazel-800"
          >
            Messaggio
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-2 w-full resize-none rounded-xl border border-cream-300 bg-cream-50 px-5 py-3.5 text-sm text-hazel-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-500/20"
            placeholder="Scrivi il tuo messaggio..."
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-forest-700 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-forest-800 hover:shadow-lg"
        >
          Invia messaggio
        </button>
      </form>
    </div>
  )
}
