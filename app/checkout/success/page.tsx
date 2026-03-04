import Link from 'next/link'
import ClearCartOnSuccess from '@/components/ClearCartOnSuccess'

interface PageProps {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSuccessPage({ searchParams }: PageProps) {
  const { session_id } = await searchParams

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <ClearCartOnSuccess />

      <div className="text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-10 h-10 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
          Order Confirmed! 🎉
        </h1>

        <p className="text-surface-400 text-lg mb-2">
          Thank you for your purchase! Your order has been placed successfully.
        </p>

        <p className="text-surface-500 text-sm mb-8">
          You&apos;ll receive a confirmation email shortly with your order details.
        </p>

        {session_id && (
          <div className="bg-surface-900 border border-surface-800 rounded-xl p-4 mb-8 inline-block">
            <p className="text-surface-500 text-xs mb-1">Session Reference</p>
            <p className="text-surface-300 text-sm font-mono break-all">{session_id}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 border border-surface-700 hover:border-surface-500 text-surface-200 font-bold rounded-xl transition-all duration-300 hover:bg-surface-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}