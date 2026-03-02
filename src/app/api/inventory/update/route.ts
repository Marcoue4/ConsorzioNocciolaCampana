import { NextRequest, NextResponse } from 'next/server'
import { writeClient } from '@/sanity/writeClient'

/**
 * POST /api/inventory/update
 *
 * Receives the confirmed preview payload and runs a Sanity
 * transaction to bulk-update products + create an inventory log.
 */

interface Change {
  field: string
  oldValue: string
  newValue: string
}

interface UpdateRow {
  sku: string
  productTitle: string | null
  productId: string | null
  changes: Change[]
  errors: string[]
}

interface UpdatePayload {
  fileName: string
  totalRows: number
  rows: UpdateRow[]
}

export async function POST(req: NextRequest) {
  try {
    // ── Auth check ────────────────────────────────────────────
    const authHeader = req.headers.get('authorization')
    const expectedToken = process.env.VENDOR_DASHBOARD_TOKEN
    if (!expectedToken || authHeader !== `Bearer ${expectedToken}`) {
      return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 })
    }

    const body = (await req.json()) as UpdatePayload
    const { fileName, totalRows, rows } = body

    if (!rows?.length) {
      return NextResponse.json(
        { error: 'Nessuna riga da aggiornare' },
        { status: 400 }
      )
    }

    // Filter only rows with actual changes and no errors
    const validRows = rows.filter(
      (r) => r.productId && r.changes.length > 0 && r.errors.length === 0
    )

    if (validRows.length === 0) {
      return NextResponse.json(
        { error: 'Nessuna modifica valida da applicare' },
        { status: 400 }
      )
    }

    // ── Build Sanity transaction ──────────────────────────────
    const tx = writeClient.transaction()
    const logChanges: {
      _type: 'object'
      sku: string
      productTitle: string
      field: string
      oldValue: string
      newValue: string
    }[] = []

    for (const row of validRows) {
      const patch: Record<string, unknown> = {}

      for (const change of row.changes) {
        if (change.field === 'stock') {
          patch.stock = parseInt(change.newValue, 10)
        }
        if (change.field === 'price') {
          patch.price = change.newValue
        }

        logChanges.push({
          _type: 'object',
          _key: `${row.sku}-${change.field}-${Date.now()}`,
          sku: row.sku,
          productTitle: row.productTitle ?? '',
          field: change.field,
          oldValue: change.oldValue,
          newValue: change.newValue,
        } as any)
      }

      tx.patch(row.productId!, { set: patch })
    }

    // ── Create inventory log ──────────────────────────────────
    tx.create({
      _type: 'inventoryLog',
      timestamp: new Date().toISOString(),
      fileName: fileName || 'import.csv',
      totalRows,
      updatedCount: validRows.length,
      errorCount: rows.filter((r) => r.errors.length > 0).length,
      changes: logChanges,
    })

    // ── Commit transaction ────────────────────────────────────
    await tx.commit()

    return NextResponse.json({
      success: true,
      updatedCount: validRows.length,
      message: `${validRows.length} prodotti aggiornati con successo.`,
    })
  } catch (err) {
    console.error('[inventory/update]', err)
    return NextResponse.json(
      { error: 'Errore durante l\'aggiornamento. Nessuna modifica applicata.' },
      { status: 500 }
    )
  }
}
