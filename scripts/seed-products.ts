/**
 * Seed Sanity with product documents from static data.
 *
 * Usage:  npx tsx scripts/seed-products.ts
 *
 * - Reads .env.local for Sanity credentials
 * - Uploads local images to the Sanity asset pipeline
 * - Creates product documents in a single transaction
 */

import { config } from 'dotenv'
config({ path: '.env.local' })

import { createClient } from '@sanity/client'
import { createReadStream } from 'fs'
import path from 'path'

/* ── Env ─────────────────────────────────────────────────────── */
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const token = process.env.SANITY_API_WRITE_TOKEN!

if (!projectId || !dataset || !token) {
  console.error('❌  Missing env vars. Make sure .env.local has:')
  console.error('    NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

/* ── Static product data ─────────────────────────────────────── */
const products = [
  {
    title: 'Nocciole Campane',
    sku: 'NOC-CAM-500',
    slug: 'nocciole-campane',
    description:
      "Nocciole Campane dal gusto unico, coltivate con cura nei noccioleti del territorio campano. Ideali per l'uso in cucina o come snack naturale.",
    image: 'AdobeStock_142831303-kWaH--1020x533@IlSole24Ore-Web.avif',
    category: 'Nocciole',
    price: '€12.90',
    unit: '/ 500g',
    origin: 'Campania',
    stock: 150,
    featured: true,
    order: 1,
  },
  {
    title: 'Noci Campane DOP',
    sku: 'NOC-DOP-500',
    slug: 'noci-campane-dop',
    description:
      "Noci Campane DOP, dolci e delicate. Un prodotto d'eccellenza del territorio campano, dal sapore inconfondibile.",
    image: 'jcr_content.jpg',
    category: 'Noci',
    price: '€14.50',
    unit: '/ 500g',
    origin: 'Campania',
    stock: 120,
    featured: true,
    order: 2,
  },
  {
    title: 'Crema di Nocciole Artigianale',
    sku: 'TRA-CRE-250',
    slug: 'crema-di-nocciole-artigianale',
    description:
      'Crema spalmabile realizzata con il 70% di nocciole piemontesi tostate. Senza olio di palma, senza conservanti. Pura bontà artigianale.',
    image: 'Foto-1-Crema-Spamabile-Nocciola--960x720.jpg',
    category: 'Trasformati',
    price: '€9.90',
    unit: '/ 250g',
    origin: 'Campania',
    stock: 80,
    featured: true,
    order: 3,
  },
  {
    title: 'Confezione Regalo',
    sku: 'REG-CON-1KG',
    slug: 'confezione-regalo',
    description:
      "Il regalo perfetto per gli amanti del gusto. Una selezione curata dei migliori prodotti del Consorzio in un'elegante confezione regalo.",
    image: 'cesto_regalo.jpg',
    category: 'Confezioni Regalo',
    price: '€39.90',
    unit: '/ 1kg',
    origin: 'Campania',
    stock: 25,
    featured: true,
    order: 4,
  },
  {
    title: 'Nocciole Tostate',
    sku: 'NOC-TOS-300',
    slug: 'nocciole-tostate',
    description:
      'Lo snack perfetto per ogni occasione. Nocciole tostate con cura per esaltarne il gusto naturale e la croccantezza.',
    image: 'hazel-nuts-picture-id513077715-min.jpg',
    category: 'Nocciole',
    price: '€8.50',
    unit: '/ 300g',
    origin: 'Campania',
    stock: 200,
    featured: false,
    order: 5,
  },
  {
    title: 'Granella di Nocciole',
    sku: 'NOC-GRA-400',
    slug: 'granella-di-nocciole',
    description:
      "Granella di nocciole pronte all'uso. Perfetta per decorare dolci, gelati e preparazioni di pasticceria.",
    image: 'Granella-nocciole-tostate-3.jpg',
    category: 'Nocciole',
    price: '€16.90',
    unit: '/ 400g',
    origin: 'Campania',
    stock: 60,
    featured: false,
    order: 6,
  },
  {
    title: 'Olio di Nocciola Extra',
    sku: 'TRA-OLI-250',
    slug: 'olio-di-nocciola-extra',
    description:
      'Olio pregiato spremuto a freddo, dal profumo intenso e dal sapore delicato. Ideale per condire piatti raffinati.',
    image: 'Olio-di-nocciola.jpg',
    category: 'Trasformati',
    price: '€18.00',
    unit: '/ 250ml',
    origin: 'Campania',
    stock: 40,
    featured: false,
    order: 7,
  },
  {
    title: 'Farina di Nocciole',
    sku: 'TRA-FAR-500',
    slug: 'farina-di-nocciole',
    description:
      "Per dolci e pasticceria d'eccellenza. Farina finissima di nocciole tostate, perfetta per torte, biscotti e impasti.",
    image: 'SH_farina_di_nocciole.jpg',
    category: 'Trasformati',
    price: '€11.50',
    unit: '/ 500g',
    origin: 'Campania',
    stock: 90,
    featured: false,
    order: 8,
  },
]

/* ── Upload image helper ─────────────────────────────────────── */
async function uploadImage(filename: string) {
  const filePath = path.resolve(__dirname, '..', 'public', 'images', filename)
  const ext = path.extname(filename).slice(1).toLowerCase()
  const contentType =
    ext === 'avif'
      ? 'image/avif'
      : ext === 'png'
        ? 'image/png'
        : ext === 'webp'
          ? 'image/webp'
          : 'image/jpeg'

  console.log(`  📸  Uploading ${filename}…`)
  const asset = await client.assets.upload('image', createReadStream(filePath), {
    filename,
    contentType,
  })
  return asset._id
}

/* ── Main ────────────────────────────────────────────────────── */
async function main() {
  console.log('🌰  Sanity Product Seeder')
  console.log(`    Project: ${projectId}  Dataset: ${dataset}\n`)

  // 1. Check for existing products to avoid duplicates
  const existing: { sku: string }[] = await client.fetch(
    `*[_type == "product"]{ sku }`
  )
  const existingSkus = new Set(existing.map((p) => p.sku))

  const toCreate = products.filter((p) => !existingSkus.has(p.sku))

  if (toCreate.length === 0) {
    console.log('✅  All products already exist in Sanity. Nothing to do.')
    return
  }

  console.log(
    `📦  ${toCreate.length} product(s) to create (${existing.length} already in Sanity)\n`
  )

  // 2. Upload images and build documents
  const tx = client.transaction()

  for (const product of toCreate) {
    const imageId = await uploadImage(product.image)

    tx.create({
      _type: 'product',
      title: product.title,
      sku: product.sku,
      slug: { _type: 'slug', current: product.slug },
      description: product.description,
      image: {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId },
      },
      category: product.category,
      price: product.price,
      unit: product.unit,
      origin: product.origin,
      stock: product.stock,
      featured: product.featured,
      order: product.order,
    })

    console.log(`  ✓  ${product.title} (${product.sku})`)
  }

  // 3. Commit transaction
  console.log('\n⏳  Committing transaction…')
  await tx.commit()
  console.log(`\n✅  Done! ${toCreate.length} products created in Sanity.`)
}

main().catch((err) => {
  console.error('❌  Seed failed:', err.message)
  process.exit(1)
})
