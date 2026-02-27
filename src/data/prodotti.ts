export type ProductCategory =
  | 'Tutti'
  | 'Nocciole'
  | 'Noci'
  | 'Trasformati'
  | 'Confezioni Regalo'

export interface Product {
  title: string
  description: string
  image: string
  category: ProductCategory
  price: string
  unit: string
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
    description: 'Nocciole Campane dal gusto unico',
    image: '/images/AdobeStock_142831303-kWaH--1020x533@IlSole24Ore-Web.avif',
    category: 'Nocciole',
    price: '€12.90',
    unit: '/ 500g',
    featured: true,
  },
  {
    title: 'Noci Campane DOP',
    description: 'Noci Campane DOP, dolci e delicate',
    image: '/images/jcr_content.jpg',
    category: 'Noci',
    price: '€14.50',
    unit: '/ 500g',
    featured: true,
  },
  {
    title: 'Crema di Nocciole Artigianale',
    description: '45% nocciole, zero compromessi',
    image: '/images/Foto-1-Crema-Spamabile-Nocciola--960x720.jpg',
    category: 'Trasformati',
    price: '€9.90',
    unit: '/ 250g',
    featured: true,
  },
  {
    title: 'Confezione Regalo Premium',
    description: 'Il regalo perfetto per gli amanti del gusto',
    image: '/images/IMG_2281.jpg',
    category: 'Confezioni Regalo',
    price: '€39.90',
    unit: '/ 1kg',
    featured: true,
  },
  {
    title: 'Nocciole Tostate e Salate',
    description: 'Lo snack perfetto per ogni occasione',
    image: '/images/WhatsApp-Image-2023-04-21-at-11.22.47-960x720.jpeg',
    category: 'Nocciole',
    price: '€8.50',
    unit: '/ 300g',
  },
  {
    title: 'Granella di Nocciole',
    description: "Granella di nocciole pronte all'uso",
    image: '/images/Granella-nocciole-tostate-3.jpg',
    category: 'Nocciole',
    price: '€16.90',
    unit: '/ 400g',
  },
  {
    title: 'Olio di Nocciola Extra',
    description: 'Olio pregiato spremuto a freddo',
    image: '/images/Olio-di-nocciola.jpg',
    category: 'Trasformati',
    price: '€18.00',
    unit: '/ 250ml',
  },
  {
    title: 'Farina di Nocciole',
    description: "Per dolci e pasticceria d'eccellenza",
    image: '/images/IMG_2282.jpg',
    category: 'Trasformati',
    price: '€11.50',
    unit: '/ 500g',
  },
]
