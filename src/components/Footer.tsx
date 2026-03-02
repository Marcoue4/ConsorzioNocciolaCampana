import Link from 'next/link'

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Prodotti', href: '/prodotti' },
  { label: 'Notizie', href: '/notizie' },
  { label: 'Contatti', href: '/contatti' }
]

export default function Footer() {
  return (
    <footer className="border-t border-hazel-200 bg-hazel-950 text-cream-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16 md:px-10 md:grid-cols-3">
        {/* Brand */}
        <div>
          <p className="font-serif text-xl font-semibold text-cream-100">Consorzio Nocciola Campana</p>
          <div className="separator mt-4" />
          <p className="mt-4 text-sm leading-7 text-cream-400">
            Valorizzazione della produzione corilicola campana, tra tradizione agricola e innovazione.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-500">Navigazione</p>
          <ul className="mt-5 space-y-3 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-cream-300 transition hover:text-forest-400">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-500">Contatti</p>
          <ul className="mt-5 space-y-3 text-sm text-cream-300">
            <li>
              <a href="mailto:info@consorzionocciolacampana.it" className="transition hover:text-forest-400">
                info@consorzionocciolacampana.it
              </a>
            </li>
            <li>Via Amilcare Boccio, 8 - Nola (NA), Italia</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-hazel-800/50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 sm:flex-row sm:px-10">
          <p className="text-xs text-cream-500">
            © {new Date().getFullYear()} Consorzio Nocciola Campana. Tutti i diritti riservati.
          </p>
          <Link
            href="/dashboard"
            className="text-xs text-cream-600 transition hover:text-cream-300"
          >
            Area Produttori
          </Link>
        </div>
      </div>
    </footer>
  )
}
