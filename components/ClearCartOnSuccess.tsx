'use client'

import { useEffect, useRef } from 'react'
import { useCart } from '@/context/CartContext'

export default function ClearCartOnSuccess() {
  const { clearCart } = useCart()
  const cleared = useRef(false)

  useEffect(() => {
    if (!cleared.current) {
      cleared.current = true
      clearCart()
    }
  }, [clearCart])

  return null
}