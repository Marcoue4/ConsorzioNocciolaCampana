import VendorDashboard from '@/components/dashboard/VendorDashboard'

export const metadata = {
  title: 'Dashboard Inventario — Consorzio Nocciola Campana',
  description: 'Area riservata ai produttori per la gestione dell\'inventario.',
}

export default function DashboardPage() {
  return (
    <div className="bg-cream-50">
      <VendorDashboard />
    </div>
  )
}
