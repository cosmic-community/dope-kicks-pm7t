'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCheckout = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })

      const data: unknown = await response.json()
      const parsed = data as { url?: string; error?: string }

      if (!response.ok) {
        setError(parsed.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      if (parsed.url) {
        window.location.href = parsed.url
      }
    } catch {
      setError('Failed to connect to checkout. Please try again.')
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <p className="text-6xl mb-6">🛒</p>
          <h1 className="text-3xl font-black tracking-tight mb-4">Your Cart is Empty</h1>
          <p className="text-surface-400 mb-8">
            Looks like you haven&apos;t added any kicks to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Browse Products
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-10">
        Shopping Cart
        <span className="text-surface-500 text-lg font-normal ml-3">
          ({totalItems} {totalItems === 1 ? 'item' : 'items'})
        </span>
      </h1>

      <div className="space-y-4 mb-10">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 sm:gap-6 bg-surface-900 border border-surface-800 rounded-2xl p-4 sm:p-6"
          >
            {/* Image */}
            <Link href={`/products/${item.slug}`} className="shrink-0">
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-xl object-cover bg-surface-800"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-surface-800 flex items-center justify-center text-3xl">
                  👟
                </div>
              )}
            </Link>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.slug}`}
                className="text-white font-bold text-sm sm:text-base hover:text-brand-400 transition-colors line-clamp-1"
              >
                {item.name}
              </Link>
              <p className="text-brand-400 font-bold text-lg mt-1">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white transition-colors text-sm font-bold"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-white font-semibold text-sm">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white transition-colors text-sm font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Line Total */}
            <div className="hidden sm:block text-right min-w-[80px]">
              <p className="text-white font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>

            {/* Remove */}
            <button
              onClick={() => removeItem(item.productId)}
              className="p-2 text-surface-500 hover:text-red-400 transition-colors"
              aria-label="Remove item"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-surface-400">Subtotal</span>
          <span className="text-white font-bold text-lg">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-surface-800">
          <span className="text-surface-400">Shipping</span>
          <span className="text-surface-300 text-sm">Calculated at checkout</span>
        </div>
        <div className="flex items-center justify-between mb-8">
          <span className="text-white font-bold text-lg">Total</span>
          <span className="text-white font-black text-2xl">${totalPrice.toFixed(2)}</span>
        </div>

        {error && (
          <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
            loading
              ? 'bg-surface-700 text-surface-400 cursor-wait'
              : 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/25'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Checkout with Stripe
            </>
          )}
        </button>

        <p className="text-center text-surface-500 text-xs mt-4">
          Secure checkout powered by Stripe
        </p>
      </div>
    </div>
  )
}