import type { Metadata } from 'next'
import { getReviews } from '@/lib/cosmic'
import ReviewCard from '@/components/ReviewCard'

export const metadata: Metadata = {
  title: 'Customer Reviews — Dope Kicks',
  description: 'Read authentic reviews from Dope Kicks customers on collectible sneakers and accessories.'
}

export default async function ReviewsPage() {
  const reviews = await getReviews()

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : '0'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
          Community
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Customer Reviews
        </h1>
        <p className="mt-4 text-surface-400 text-lg max-w-2xl">
          Hear what our community has to say about their favorite kicks and
          gear.
        </p>
      </div>

      {/* Stats Bar */}
      {reviews.length > 0 && (
        <div className="flex flex-wrap items-center gap-6 mb-10 p-6 bg-surface-900/50 rounded-2xl border border-surface-800">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-white">{avgRating}</span>
            <div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'text-amber-400' : 'text-surface-700'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-surface-500 text-xs mt-0.5">Average rating</p>
            </div>
          </div>
          <div className="h-8 w-px bg-surface-700 hidden sm:block" />
          <div>
            <span className="text-xl font-bold text-white">{reviews.length}</span>
            <p className="text-surface-500 text-xs">Total reviews</p>
          </div>
        </div>
      )}

      {/* Reviews Grid */}
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} showProduct />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">⭐</p>
          <p className="text-surface-400 text-lg">
            No reviews yet. Add some in your Cosmic dashboard!
          </p>
        </div>
      )}
    </div>
  )
}