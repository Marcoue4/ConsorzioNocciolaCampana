import { NextRequest, NextResponse } from 'next/server'
import { parse } from 'csv-parse/sync'
import { client } from '@/sanity/client'

/**
 * POST /api/inventory/parse
 *
 * Accepts a multipart form upload with a CSV file.
 * Expected CSV columns: sku, price, stock  (header row required)
 *
 * Returns a preview with matched products & validation errors.
 */

const REQUIRED_COLUMNS = ['sku']
const UPDATABLE_COLUMNS = ['price', 'stock']

interface CsvRow {
  sku?: string
  price?: string
  stock?: string
  [key: string]: string | undefined
}

export async function POST(req: NextRequest) {
  try {
    // ── Auth check (simple token) ─────────────────────────────
    const authHeader = req.headers.get('authorization')
    const expectedToken = process.env.VENDOR_DASHBOARD_TOKEN
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    // ── Read file from form data ──────────────────────────────
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json(
        { error: 'Nessun file caricato' },
        { status: 400 }
      )
    }

    const text = await file.text()

    // ── Parse CSV ─────────────────────────────────────────────
    let records: CsvRow[]
    try {
      records = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true,
        delimiter: [',', ';'],
      })
    } catch {
      return NextResponse.json(
        { error: 'Formato CSV non valido. Assicurati che il file contenga un header: sku, price, stock' },
        { status: 400 }
      )
    }

    if (records.length === 0) {
      return NextResponse.json(
        { error: 'Il file CSV è vuoto' },
        { status: 400 }
      )
    }

    // ── Validate columns ──────────────────────────────────────
    const csvColumns = Object.keys(records[0]).map((c) => c.toLowerCase())
    const missing = REQUIRED_COLUMNS.filter((c) => !csvColumns.includes(c))
    if (missing.length) {
      return NextResponse.json(
        { error: `Colonne obbligatorie mancanti: ${missing.join(', ')}` },
        { status: 400 }
      )
    }

    // ── Fetch all products from Sanity ────────────────────────
    const products: {
      _id: string
      title: string
      sku: string
      price: string
      stock: number
    }[] = await client.fetch(
      `*[_type == "product"]{ _id, title, sku, price, stock }`
    )
    const skuMap = new Map(products.map((p) => [p.sku, p]))

    // ── Build preview rows ────────────────────────────────────
    type PreviewRow = {
      row: number
      sku: string
      productTitle: string | null
      productId: string | null
      changes: { field: string; oldValue: string; newValue: string }[]
      errors: string[]
    }

    const preview: PreviewRow[] = []

    records.forEach((record, idx) => {
      // Normalise keys to lowercase
      const normalised: Record<string, string> = {}
      for (const [k, v] of Object.entries(record)) {
        normalised[k.toLowerCase()] = (v ?? '').trim()
      }

      const sku = normalised.sku ?? ''
      const errors: string[] = []
      const changes: PreviewRow['changes'] = []

      if (!sku) {
        errors.push('SKU mancante')
        preview.push({
          row: idx + 2, // +2 because header=1, 0-indexed
          sku: '',
          productTitle: null,
          productId: null,
          changes: [],
          errors,
        })
        return
      }

      const product = skuMap.get(sku)
      if (!product) {
        errors.push(`SKU "${sku}" non trovato nel catalogo`)
        preview.push({
          row: idx + 2,
          sku,
          productTitle: null,
          productId: null,
          changes: [],
          errors,
        })
        return
      }

      // Check updatable fields
      for (const col of UPDATABLE_COLUMNS) {
        const newVal = normalised[col]
        if (newVal === undefined || newVal === '') continue

        if (col === 'stock') {
          const parsed = parseInt(newVal, 10)
          if (isNaN(parsed) || parsed < 0) {
            errors.push(`Valore stock non valido: "${newVal}"`)
            continue
          }
          if (parsed !== (product.stock ?? 0)) {
            changes.push({
              field: 'stock',
              oldValue: String(product.stock ?? 0),
              newValue: String(parsed),
            })
          }
        }

        if (col === 'price') {
          // Accept "12.90", "€12.90", "12,90"
          const sanitised = newVal.replace(/[^0-9.,]/g, '').replace(',', '.')
          const parsed = parseFloat(sanitised)
          if (isNaN(parsed) || parsed < 0) {
            errors.push(`Valore prezzo non valido: "${newVal}"`)
            continue
          }
          const formatted = `€${parsed.toFixed(2)}`
          if (formatted !== product.price) {
            changes.push({
              field: 'price',
              oldValue: product.price,
              newValue: formatted,
            })
          }
        }
      }

      preview.push({
        row: idx + 2,
        sku,
        productTitle: product.title,
        productId: product._id,
        changes,
        errors,
      })
    })

    const errorCount = preview.filter((r) => r.errors.length > 0).length
    const changeCount = preview.filter((r) => r.changes.length > 0).length

    return NextResponse.json({
      fileName: file.name,
      totalRows: records.length,
      errorCount,
      changeCount,
      preview,
    })
  } catch (err) {
    console.error('[inventory/parse]', err)
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    )
  }
}
