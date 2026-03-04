import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

interface CartItemPayload {
  productId: string
  slug: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

function isValidCartItem(item: unknown): item is CartItemPayload {
  if (typeof item !== 'object' || item === null) return false
  const obj = item as Record<string, unknown>
  return (
    typeof obj.productId === 'string' &&
    typeof obj.slug === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.price === 'number' &&
    obj.price > 0 &&
    typeof obj.quantity === 'number' &&
    obj.quantity > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is not configured')
      return NextResponse.json(
        { error: 'Payment service is not configured.' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-05-28.basil',
    })

    const body: unknown = await request.json()

    if (!body || typeof body !== 'object' || !('items' in body)) {
      return NextResponse.json(
        { error: 'Invalid request body.' },
        { status: 400 }
      )
    }

    const { items } = body as { items: unknown }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty.' },
        { status: 400 }
      )
    }

    // Validate each item
    for (const item of items) {
      if (!isValidCartItem(item)) {
        return NextResponse.json(
          { error: 'Invalid cart item data.' },
          { status: 400 }
        )
      }
    }

    const validItems = items as CartItemPayload[]

    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = validItems.map(
      (item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            ...(item.imageUrl ? { images: [item.imageUrl] } : {}),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })
    )

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
      metadata: {
        cart_items: JSON.stringify(
          validItems.map((i) => ({
            productId: i.productId,
            slug: i.slug,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          }))
        ),
      },
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json(
      { error: 'Failed to create checkout session.' },
      { status: 500 }
    )
  }
}