'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Prodotti', href: '/prodotti' },
  { label: 'Notizie', href: '/notizie' },
  { label: 'Contatti', href: '/contatti' }
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hazel-200/60 bg-cream-50/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-4">
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <Image src="/images/LOgo.png" alt="Logo" width={40} height={40} className="rounded-full shadow-sm transition group-hover:shadow-md md:h-11 md:w-11" />
            <span className={`font-serif text-base font-semibold tracking-wide text-hazel-800 transition-opacity duration-300 sm:text-lg md:text-xl md:opacity-100 ${open ? 'opacity-0' : 'opacity-100'}`}>
              Consorzio Nocciola Campana
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-hazel-700 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative py-1 transition hover:text-forest-700 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-forest-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="relative z-[80] flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-hazel-100 md:hidden"
            aria-label="Menu"
          >
            <div className="flex w-5 flex-col gap-1.5">
              <span className={`block h-0.5 w-full rounded-full bg-hazel-800 transition-all duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
              <span className={`block h-0.5 w-full rounded-full bg-hazel-800 transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full rounded-full bg-hazel-800 transition-all duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile slide-out backdrop — outside header so fixed positioning works */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile slide-out panel — outside header so fixed positioning works */}
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-72 flex-col bg-hazel-950 shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-hazel-800/50 px-6 py-4">
          <span className="font-serif text-sm font-semibold tracking-wide text-cream-200">Menu</span>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-cream-400 transition hover:bg-hazel-800 hover:text-cream-100"
            aria-label="Chiudi menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col px-4 pt-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-hazel-800/40 px-3 py-3.5 text-sm font-medium text-cream-200 transition hover:bg-hazel-900 hover:text-cream-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Panel footer */}
        <div className="mt-auto border-t border-hazel-800/50 px-6 py-5">
          <p className="text-xs leading-relaxed text-cream-500">
            © {new Date().getFullYear()} Consorzio Nocciola Campana
          </p>
        </div>
      </aside>
    </>
  )
}
