export type ProductCategory =
  | 'Tutti'
  | 'Nocciole'
  | 'Noci'
  | 'Trasformati'
  | 'Confezioni Regalo'

export interface Product {
  title: string
  sku: string
  slug: string
  description: string
  image: string
  category: ProductCategory
  price: string
  unit: string
  origin?: string
  stock?: number
  featured?: boolean
}

export const categories: ProductCategory[] = [
  'Tutti',
  'Nocciole',
  'Noci',
  'Trasformati',
  'Confezioni Regalo',
]

export const products: Product[] = [
  {
    title: 'Nocciole Campane',
    sku: 'NOC-CAM-500',
    slug: 'nocciole-campane',
    description: 'Nocciole Campane dal gusto unico, coltivate con cura nei noccioleti del territorio campano. Ideali per l\'uso in cucina o come snack naturale.',
    image: '/images/AdobeStock_142831303-kWaH--1020x533@IlSole24Ore-Web.avif',
    category: 'Nocciole',
    price: '€12.90',
    unit: '/ 500g',
    origin: 'Campania',
    featured: true,
  },
  {
    title: 'Noci Campane DOP',
    sku: 'NOC-DOP-500',
    slug: 'noci-campane-dop',
    description: 'Noci Campane DOP, dolci e delicate. Un prodotto d\'eccellenza del territorio campano, dal sapore inconfondibile.',
    image: '/images/jcr_content.jpg',
    category: 'Noci',
    price: '€14.50',
    unit: '/ 500g',
    origin: 'Campania',
    featured: true,
  },
  {
    title: 'Crema di Nocciole Artigianale',
    sku: 'TRA-CRE-250',
    slug: 'crema-di-nocciole-artigianale',
    description: 'Crema spalmabile realizzata con il 70% di nocciole piemontesi tostate. Senza olio di palma, senza conservanti. Pura bontà artigianale.',
    image: '/images/Foto-1-Crema-Spamabile-Nocciola--960x720.jpg',
    category: 'Trasformati',
    price: '€9.90',
    unit: '/ 250g',
    origin: 'Campania',
    featured: true,
  },
  {
    title: 'Confezione Regalo',
    sku: 'REG-CON-1KG',
    slug: 'confezione-regalo',
    description: 'Il regalo perfetto per gli amanti del gusto. Una selezione curata dei migliori prodotti del Consorzio in un\'elegante confezione regalo.',
    image: '/images/cesto_regalo.jpg',
    category: 'Confezioni Regalo',
    price: '€39.90',
    unit: '/ 1kg',
    origin: 'Campania',
    featured: true,
  },
  {
    title: 'Nocciole Tostate',
    sku: 'NOC-TOS-300',
    slug: 'nocciole-tostate',
    description: 'Lo snack perfetto per ogni occasione. Nocciole tostate con cura per esaltarne il gusto naturale e la croccantezza.',
    image: '/images/hazel-nuts-picture-id513077715-min.jpg',
    category: 'Nocciole',
    price: '€8.50',
    unit: '/ 300g',
    origin: 'Campania',
  },
  {
    title: 'Granella di Nocciole',
    sku: 'NOC-GRA-400',
    slug: 'granella-di-nocciole',
    description: 'Granella di nocciole pronte all\'uso. Perfetta per decorare dolci, gelati e preparazioni di pasticceria.',
    image: '/images/Granella-nocciole-tostate-3.jpg',
    category: 'Nocciole',
    price: '€16.90',
    unit: '/ 400g',
    origin: 'Campania',
  },
  {
    title: 'Olio di Nocciola Extra',
    sku: 'TRA-OLI-250',
    slug: 'olio-di-nocciola-extra',
    description: 'Olio pregiato spremuto a freddo, dal profumo intenso e dal sapore delicato. Ideale per condire piatti raffinati.',
    image: '/images/Olio-di-nocciola.jpg',
    category: 'Trasformati',
    price: '€18.00',
    unit: '/ 250ml',
    origin: 'Campania',
  },
  {
    title: 'Farina di Nocciole',
    sku: 'TRA-FAR-500',
    slug: 'farina-di-nocciole',
    description: 'Per dolci e pasticceria d\'eccellenza. Farina finissima di nocciole tostate, perfetta per torte, biscotti e impasti.',
    image: '/images/SH_farina_di_nocciole.jpg',
    category: 'Trasformati',
    price: '€11.50',
    unit: '/ 500g',
    origin: 'Campania',
  },
]
