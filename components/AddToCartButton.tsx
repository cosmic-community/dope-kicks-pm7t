'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'

interface AddToCartButtonProps {
  productId: string
  slug: string
  name: string
  price: number
  imageUrl: string
  disabled?: boolean
}

export default function AddToCartButton({
  productId,
  slug,
  name,
  price,
  imageUrl,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    if (disabled) return
    addItem({ productId, slug, name, price, imageUrl })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 ${
        disabled
          ? 'bg-surface-800 text-surface-500 cursor-not-allowed'
          : added
            ? 'bg-emerald-600 text-white'
            : 'bg-brand-500 hover:bg-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/25'
      }`}
    >
      {disabled ? (
        'Out of Stock'
      ) : added ? (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Cart
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          Add to Cart
        </>
      )}
    </button>
  )
}