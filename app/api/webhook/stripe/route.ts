import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createOrder } from '@/lib/cosmic'

export async function POST(request: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeSecretKey || !webhookSecret) {
    console.error('Stripe keys not configured')
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
  }

  // Changed: Removed explicit apiVersion to use the SDK default and avoid TS2322
  const stripe = new Stripe(stripeSecretKey)

  const rawBody = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email || 'unknown@email.com'
    const shippingName = session.shipping_details?.name || session.customer_details?.name || 'N/A'
    const shippingAddress = session.shipping_details?.address
      ? [
            session.shipping_details.address.line1,
            session.shipping_details.address.line2,
            session.shipping_details.address.city,
            session.shipping_details.address.state,
            session.shipping_details.address.postal_code,
            session.shipping_details.address.country,
          ]
            .filter(Boolean)
            .join(', ')
      : 'N/A'

    const totalAmount = session.amount_total ? session.amount_total / 100 : 0
    const cartItems = session.metadata?.cart_items || '[]'
    const orderNumber = `ORD-${Date.now()}`

    try {
      await createOrder({
        title: orderNumber,
        metadata: {
          customer_email: customerEmail,
          stripe_session_id: session.id,
          order_items: cartItems,
          total_amount: totalAmount,
          order_status: 'Paid',
          shipping_name: shippingName,
          shipping_address: shippingAddress,
        },
      })
      console.log(`Order ${orderNumber} created successfully`)
    } catch (err) {
      console.error('Failed to create order in Cosmic:', err)
    }
  }

  return NextResponse.json({ received: true })
}