import CTABand from '@/components/ui/CTABand'

export default function HomeCTA() {
  return (
    <CTABand
      heading="Collaboriamo per far crescere il territorio."
      description="Scrivici per ricevere informazioni sul consorzio, sulle attività in corso o sulle opportunità per produttori e partner."
      links={[
        { label: 'Vai ai contatti', href: '/contatti', variant: 'primary' },
        { label: 'Scopri i prodotti', href: '/prodotti', variant: 'secondary' },
      ]}
    />
  )
}
