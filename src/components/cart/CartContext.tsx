'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'

/* ── Types ─────────────────────────────────────────────────── */
export interface CartItem {
  slug: string
  title: string
  image: string
  price: string      // e.g. "€9.90"
  unit: string       // e.g. "/ 250g"
  quantity: number
}

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; payload: Omit<CartItem, 'quantity'> & { quantity?: number } }
  | { type: 'REMOVE'; slug: string }
  | { type: 'SET_QTY'; slug: string; quantity: number }
  | { type: 'HYDRATE'; items: CartItem[] }

/* ── Helpers ───────────────────────────────────────────────── */
/** Parse "€9.90" → 9.90 */
export function parsePrice(raw: string): number {
  return parseFloat(raw.replace(/[^0-9.,]/g, '').replace(',', '.')) || 0
}

export function formatPrice(n: number): string {
  return `€${n.toFixed(2).replace('.', ',')}`
}

const STORAGE_KEY = 'conci-cart'

function persist(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {
    // SSR or quota exceeded — ignore
  }
}

/* ── Reducer ───────────────────────────────────────────────── */
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const qty = action.payload.quantity ?? 1
      const idx = state.items.findIndex((i) => i.slug === action.payload.slug)
      let items: CartItem[]
      if (idx >= 0) {
        items = state.items.map((item, i) =>
          i === idx ? { ...item, quantity: item.quantity + qty } : item
        )
      } else {
        items = [...state.items, { ...action.payload, quantity: qty }]
      }
      persist(items)
      return { items }
    }
    case 'REMOVE': {
      const items = state.items.filter((i) => i.slug !== action.slug)
      persist(items)
      return { items }
    }
    case 'SET_QTY': {
      const items = state.items.map((i) =>
        i.slug === action.slug
          ? { ...i, quantity: Math.max(1, Math.min(99, action.quantity)) }
          : i
      )
      persist(items)
      return { items }
    }
    case 'HYDRATE':
      return { items: action.items }
    default:
      return state
  }
}

/* ── Context ───────────────────────────────────────────────── */
interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (slug: string) => void
  setQuantity: (slug: string, qty: number) => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const items = JSON.parse(raw) as CartItem[]
        dispatch({ type: 'HYDRATE', items })
      }
    } catch {
      // ignore
    }
  }, [])

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = state.items.reduce(
    (s, i) => s + parsePrice(i.price) * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        addItem: (item) => dispatch({ type: 'ADD', payload: item }),
        removeItem: (slug) => dispatch({ type: 'REMOVE', slug }),
        setQuantity: (slug, quantity) =>
          dispatch({ type: 'SET_QTY', slug, quantity }),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within <CartProvider>')
  return ctx
}
