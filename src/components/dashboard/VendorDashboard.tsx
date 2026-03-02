'use client'

import { useState, useCallback, useRef } from 'react'

/* ──────────────────────────── Types ──────────────────────────── */
interface Change {
  field: string
  oldValue: string
  newValue: string
}

interface PreviewRow {
  row: number
  sku: string
  productTitle: string | null
  productId: string | null
  changes: Change[]
  errors: string[]
}

interface ParseResult {
  fileName: string
  totalRows: number
  errorCount: number
  changeCount: number
  preview: PreviewRow[]
}

type Step = 'login' | 'upload' | 'preview' | 'updating' | 'done'

/* ──────────────────────────── Component ──────────────────────── */
export default function VendorDashboard() {
  const [step, setStep] = useState<Step>('login')
  const [token, setToken] = useState('')
  const [loginError, setLoginError] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [updateResult, setUpdateResult] = useState<{
    updatedCount: number
    message: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  /* ── Auth helper (stored in memory only) ── */
  const authHeaders = useCallback(
    () => ({ Authorization: `Bearer ${token}` }),
    [token]
  )

  /* ── Step 1 — Login ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    if (!token.trim()) {
      setLoginError('Inserisci il token di accesso')
      return
    }
    // Validate token by calling parse with no file — expect 400 not 401
    try {
      const fd = new FormData()
      const res = await fetch('/api/inventory/parse', {
        method: 'POST',
        headers: authHeaders(),
        body: fd,
      })
      if (res.status === 401) {
        setLoginError('Token non valido')
        return
      }
      // 400 = token valid but no file, which is expected
      setStep('upload')
    } catch {
      setLoginError('Errore di connessione')
    }
  }

  /* ── Step 2 — Upload & Parse ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setError('')
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/inventory/parse', {
        method: 'POST',
        headers: authHeaders(),
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Errore nel parsing')
        return
      }
      setParseResult(data)
      setStep('preview')
    } catch {
      setError('Errore di connessione')
    } finally {
      setLoading(false)
    }
  }

  /* ── Step 3 — Confirm & Update ── */
  const handleConfirm = async () => {
    if (!parseResult) return
    setStep('updating')
    setError('')
    try {
      const res = await fetch('/api/inventory/update', {
        method: 'POST',
        headers: {
          ...authHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: parseResult.fileName,
          totalRows: parseResult.totalRows,
          rows: parseResult.preview,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Errore nell\'aggiornamento')
        setStep('preview')
        return
      }
      setUpdateResult(data)
      setStep('done')
    } catch {
      setError('Errore di connessione')
      setStep('preview')
    }
  }

  /* ── Reset ── */
  const handleReset = () => {
    setFile(null)
    setParseResult(null)
    setError('')
    setUpdateResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    setStep('upload')
  }

  /* ──────────────────────── Render ──────────────────────────── */
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold text-hazel-900 sm:text-4xl">
          Dashboard Inventario
        </h1>
        <p className="mt-2 text-hazel-600">
          Carica un file CSV per aggiornare prezzi e giacenze dei prodotti.
        </p>
      </div>

      {/* ── Step indicator ── */}
      {step !== 'login' && (
        <div className="mb-8 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-hazel-500">
          <StepBadge label="1. Carica" active={step === 'upload'} done={step === 'preview' || step === 'updating' || step === 'done'} />
          <Chevron />
          <StepBadge label="2. Anteprima" active={step === 'preview'} done={step === 'updating' || step === 'done'} />
          <Chevron />
          <StepBadge label="3. Conferma" active={step === 'updating' || step === 'done'} done={step === 'done'} />
        </div>
      )}

      {/* ── LOGIN ── */}
      {step === 'login' && (
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-hazel-200 bg-white p-8 shadow-sm">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-forest-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <h2 className="font-serif text-xl font-bold text-hazel-900">Accesso Produttore</h2>
              <p className="mt-1 text-sm text-hazel-500">Inserisci il token di accesso per continuare</p>
            </div>
            <form onSubmit={handleLogin}>
              <label className="block text-sm font-medium text-hazel-700">
                Token di accesso
              </label>
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-hazel-300 px-4 py-2.5 text-sm text-hazel-900 outline-none transition focus:border-forest-500 focus:ring-2 focus:ring-forest-200"
                placeholder="••••••••••••"
              />
              {loginError && (
                <p className="mt-2 text-sm text-red-600">{loginError}</p>
              )}
              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-[var(--brand-green)] py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-forest-700"
              >
                Accedi
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── UPLOAD ── */}
      {step === 'upload' && (
        <div className="rounded-xl border border-hazel-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-serif text-xl font-bold text-hazel-900">
            Carica file CSV
          </h2>
          <p className="mt-1.5 text-sm text-hazel-500">
            Il file deve contenere le colonne: <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs font-semibold text-hazel-800">sku</code>,{' '}
            <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs font-semibold text-hazel-800">price</code>,{' '}
            <code className="rounded bg-cream-200 px-1.5 py-0.5 text-xs font-semibold text-hazel-800">stock</code>
          </p>

          {/* Example */}
          <div className="mt-4 overflow-x-auto rounded-lg border border-hazel-200 bg-cream-50">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-hazel-200 bg-cream-100 text-hazel-600">
                  <th className="px-3 py-2">sku</th>
                  <th className="px-3 py-2">price</th>
                  <th className="px-3 py-2">stock</th>
                </tr>
              </thead>
              <tbody className="text-hazel-700">
                <tr className="border-b border-hazel-100">
                  <td className="px-3 py-1.5 font-mono">NOC-CAM-500</td>
                  <td className="px-3 py-1.5">12.90</td>
                  <td className="px-3 py-1.5">150</td>
                </tr>
                <tr>
                  <td className="px-3 py-1.5 font-mono">TRA-CRE-250</td>
                  <td className="px-3 py-1.5">9.90</td>
                  <td className="px-3 py-1.5">80</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Upload area */}
          <div className="mt-6">
            <label
              htmlFor="csv-upload"
              className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-hazel-300 bg-cream-50 px-6 py-10 transition hover:border-forest-400 hover:bg-cream-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-hazel-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-sm font-medium text-hazel-600">
                {file ? file.name : 'Clicca o trascina il file CSV qui'}
              </span>
              <span className="text-xs text-hazel-400">Solo file .csv</span>
              <input
                ref={fileInputRef}
                id="csv-upload"
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpload}
              disabled={!file || loading}
              className="rounded-full bg-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner /> Analisi in corso…
                </span>
              ) : (
                'Analizza CSV'
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── PREVIEW ── */}
      {step === 'preview' && parseResult && (
        <div className="space-y-6">
          {/* Summary cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Righe totali" value={parseResult.totalRows} />
            <SummaryCard
              label="Modifiche da applicare"
              value={parseResult.changeCount}
              accent="green"
            />
            <SummaryCard
              label="Errori"
              value={parseResult.errorCount}
              accent={parseResult.errorCount > 0 ? 'red' : undefined}
            />
          </div>

          {/* Preview table */}
          <div className="overflow-x-auto rounded-xl border border-hazel-200 bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-hazel-200 bg-cream-100 text-xs uppercase tracking-wider text-hazel-600">
                  <th className="px-4 py-3">Riga</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Prodotto</th>
                  <th className="px-4 py-3">Modifiche</th>
                  <th className="px-4 py-3">Stato</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hazel-100">
                {parseResult.preview.map((row) => (
                  <tr
                    key={row.row}
                    className={
                      row.errors.length > 0
                        ? 'bg-red-50/60'
                        : row.changes.length > 0
                          ? 'bg-forest-50/40'
                          : ''
                    }
                  >
                    <td className="px-4 py-3 font-mono text-xs text-hazel-500">
                      {row.row}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-hazel-800">
                      {row.sku || '—'}
                    </td>
                    <td className="px-4 py-3 text-hazel-700">
                      {row.productTitle || '—'}
                    </td>
                    <td className="px-4 py-3">
                      {row.changes.length > 0 ? (
                        <div className="space-y-1">
                          {row.changes.map((c, i) => (
                            <div key={i} className="text-xs">
                              <span className="font-medium capitalize text-hazel-700">
                                {c.field}:
                              </span>{' '}
                              <span className="text-red-500 line-through">
                                {c.oldValue}
                              </span>{' '}
                              →{' '}
                              <span className="font-semibold text-forest-700">
                                {c.newValue}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : row.errors.length === 0 ? (
                        <span className="text-xs text-hazel-400">
                          Nessuna modifica
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-3">
                      {row.errors.length > 0 ? (
                        <div className="space-y-0.5">
                          {row.errors.map((e, i) => (
                            <span
                              key={i}
                              className="block text-xs font-medium text-red-600"
                            >
                              ⚠ {e}
                            </span>
                          ))}
                        </div>
                      ) : row.changes.length > 0 ? (
                        <span className="inline-block rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-semibold text-forest-700">
                          Pronto
                        </span>
                      ) : (
                        <span className="inline-block rounded-full bg-hazel-100 px-2.5 py-0.5 text-xs font-medium text-hazel-500">
                          Invariato
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              onClick={handleReset}
              className="rounded-full border border-hazel-300 bg-white px-6 py-2.5 text-sm font-medium text-hazel-700 transition hover:bg-cream-100"
            >
              Annulla
            </button>
            <button
              onClick={handleConfirm}
              disabled={parseResult.changeCount === 0}
              className="rounded-full bg-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Conferma {parseResult.changeCount} modific{parseResult.changeCount === 1 ? 'a' : 'he'}
            </button>
          </div>
        </div>
      )}

      {/* ── UPDATING ── */}
      {step === 'updating' && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <Spinner large />
          <p className="text-lg font-medium text-hazel-700">
            Aggiornamento in corso…
          </p>
          <p className="text-sm text-hazel-500">
            Non chiudere la pagina.
          </p>
        </div>
      )}

      {/* ── DONE ── */}
      {step === 'done' && updateResult && (
        <div className="mx-auto max-w-md text-center">
          <div className="rounded-xl border border-forest-200 bg-forest-50 p-8 shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-forest-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl font-bold text-hazel-900">
              Aggiornamento completato
            </h2>
            <p className="mt-2 text-hazel-600">{updateResult.message}</p>
            <button
              onClick={handleReset}
              className="mt-6 rounded-full bg-[var(--brand-green)] px-8 py-2.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-forest-700"
            >
              Nuovo aggiornamento
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

/* ──────────────────────── Sub-components ─────────────────────── */

function StepBadge({
  label,
  active,
  done,
}: {
  label: string
  active: boolean
  done: boolean
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition ${
        done
          ? 'bg-forest-100 text-forest-700'
          : active
            ? 'bg-[var(--brand-green)] text-white'
            : 'bg-hazel-100 text-hazel-500'
      }`}
    >
      {done ? '✓ ' : ''}
      {label}
    </span>
  )
}

function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 text-hazel-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string
  value: number
  accent?: 'green' | 'red'
}) {
  const colorMap = {
    green: 'border-forest-200 bg-forest-50',
    red: 'border-red-200 bg-red-50',
  }
  return (
    <div
      className={`rounded-xl border p-5 shadow-sm ${
        accent ? colorMap[accent] : 'border-hazel-200 bg-white'
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-hazel-500">
        {label}
      </p>
      <p
        className={`mt-1 font-serif text-2xl font-bold ${
          accent === 'red'
            ? 'text-red-600'
            : accent === 'green'
              ? 'text-forest-700'
              : 'text-hazel-900'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

function Spinner({ large }: { large?: boolean }) {
  const size = large ? 'h-8 w-8' : 'h-4 w-4'
  return (
    <svg
      className={`${size} animate-spin text-white`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}
