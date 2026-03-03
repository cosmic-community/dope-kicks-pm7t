import Link from 'next/link'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const rating = review.metadata?.rating || 0
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous'
  const reviewText = review.metadata?.review_text || ''
  const product = review.metadata?.product

  return (
    <div className="bg-surface-900 rounded-2xl border border-surface-800 p-6 flex flex-col">
      {/* Stars */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4.5 h-4.5 ${i < rating ? 'text-amber-400' : 'text-surface-700'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Review Text */}
      {reviewText && (
        <p className="text-surface-300 text-sm leading-relaxed flex-1 mb-4 line-clamp-4">
          &ldquo;{reviewText}&rdquo;
        </p>
      )}

      {/* Reviewer */}
      <div className="mt-auto pt-4 border-t border-surface-800">
        <p className="text-white text-sm font-semibold">{reviewerName}</p>
        {showProduct && product && (
          <Link
            href={`/products/${product.slug}`}
            className="text-brand-400 hover:text-brand-300 text-xs font-medium transition-colors mt-0.5 inline-block"
          >
            Re: {product.metadata?.name || product.title}
          </Link>
        )}
      </div>
    </div>
  )
}