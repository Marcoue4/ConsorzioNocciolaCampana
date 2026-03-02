import CartPageContent from '@/components/cart/CartPageContent'

export const metadata = {
  title: 'Carrello — Consorzio Nocciola Campana',
  description: 'Il tuo carrello della spesa.',
}

export default function CarrelloPage() {
  return (
    <div className="bg-cream-50">
      <CartPageContent />
    </div>
  )
}
