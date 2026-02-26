import '../styles/globals.css'
import { ReactNode } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'Consorzio Nocciola Campana',
  description: 'Consorzio per la valorizzazione della nocciola campana — tradizione, qualità e territorio.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className="min-h-screen bg-cream-100 text-hazel-900 antialiased font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
