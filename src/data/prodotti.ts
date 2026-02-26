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
    title: 'Nocciole Tonde Gentili IGP',
    description: 'Nocciole piemontesi IGP dal gusto unico',
    image: '/images/xxxx-960x720.jpeg',
    category: 'Nocciole',
    price: '€12.90',
    unit: '/ 500g',
    featured: true,
  },
  {
    title: 'Noci di Sorrento DOP',
    description: 'Noci campane DOP, dolci e delicate',
    image: '/images/7B93C52C-8AA1-471F-909A-A054FB2677EF-1-960x720.jpg',
    category: 'Noci',
    price: '€14.50',
    unit: '/ 500g',
    featured: true,
  },
  {
    title: 'Crema di Nocciole Artigianale',
    description: '70% nocciole, zero compromessi',
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
    title: 'Gheriglio di Noce Sgusciato',
    description: "Noci sgusciate pronte all'uso",
    image: '/images/filiere-frutta-in-guscio-800x445-1.jpg',
    category: 'Noci',
    price: '€16.90',
    unit: '/ 400g',
  },
  {
    title: 'Olio di Nocciola Extra',
    description: 'Olio pregiato spremuto a freddo',
    image: '/images/Facolta-Agraria-960x533.jpg',
    category: 'Trasformati',
    price: '€18.00',
    unit: '/ 250ml',
  },
  {
    title: 'Farina di Nocciole',
    description: "Per dolci e pasticceria d'eccellenza",
    image: '/images/torrone-in-festa.jpg',
    category: 'Trasformati',
    price: '€11.50',
    unit: '/ 500g',
  },
]
