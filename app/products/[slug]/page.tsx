// app/products/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProductBySlug, getReviewsForProduct } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'
import ReviewCard from '@/components/ReviewCard'
import AddToCartButton from '@/components/AddToCartButton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found — Dope Kicks' }
  }

  return {
    title: `${product.metadata?.name || product.title} — Dope Kicks`,
    description: product.metadata?.description || `Check out ${product.title} at Dope Kicks`
  }
}

function InventoryBadge({ status }: { status: string }) {
  const statusLower = status.toLowerCase()
  let bgColor = 'bg-emerald-500/20 text-emerald-400'
  let dotColor = 'bg-emerald-400'

  if (statusLower.includes('low')) {
    bgColor = 'bg-amber-500/20 text-amber-400'
    dotColor = 'bg-amber-400'
  } else if (statusLower.includes('out') || statusLower.includes('sold')) {
    bgColor = 'bg-red-500/20 text-red-400'
    dotColor = 'bg-red-400'
  } else if (statusLower.includes('pre')) {
    bgColor = 'bg-blue-500/20 text-blue-400'
    dotColor = 'bg-blue-400'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${bgColor}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  )
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-surface-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Changed: Helper to extract numeric rating from select-dropdown object or plain number
function getRatingValue(rating: unknown): number {
  if (rating === null || rating === undefined) return 0
  if (typeof rating === 'number') return rating
  if (typeof rating === 'string') return parseInt(rating, 10) || 0
  if (typeof rating === 'object' && rating !== null) {
    if ('value' in rating) return parseInt(String((rating as { value: unknown }).value), 10) || 0
    if ('key' in rating) return parseInt(String((rating as { key: unknown }).key), 10) || 0
  }
  return 0
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsForProduct(product.id)
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const category = product.metadata?.category
  const featuredImage = product.metadata?.featured_image
  const gallery = product.metadata?.gallery || []
  const price = product.metadata?.price
  const comparePrice = product.metadata?.compare_at_price
  const isOnSale = comparePrice && price && comparePrice > price

  // Changed: use getRatingValue to properly extract numeric rating from select-dropdown objects
  const avgRating =
    reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + getRatingValue(r.metadata?.rating), 0) /
            reviews.length
        )
      : 0

  const isOutOfStock =
    inventoryStatus.toLowerCase().includes('out') ||
    inventoryStatus.toLowerCase().includes('sold')

  const cartImageUrl = featuredImage?.imgix_url
    ? `${featuredImage.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`
    : ''

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-surface-500 mb-8">
        <Link href="/" className="hover:text-surface-300 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/products"
          className="hover:text-surface-300 transition-colors"
        >
          Products
        </Link>
        <span>/</span>
        <span className="text-surface-300">
          {product.metadata?.name || product.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface-900 border border-surface-800">
            {featuredImage?.imgix_url ? (
              <img
                src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.metadata?.name || product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-6xl">
                👟
              </div>
            )}
            {isOnSale && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider">
                Sale
              </div>
            )}
          </div>
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.slice(0, 4).map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-xl overflow-hidden bg-surface-900 border border-surface-800"
                >
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`Gallery image ${idx + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-flex items-center text-brand-400 hover:text-brand-300 text-sm font-semibold uppercase tracking-widest mb-3 transition-colors"
            >
              {category.metadata?.name || category.title}
            </Link>
          )}

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            {product.metadata?.name || product.title}
          </h1>

          {/* Rating Summary */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={avgRating} />
              <span className="text-surface-400 text-sm">
                {avgRating}/5 ({reviews.length} review
                {reviews.length !== 1 ? 's' : ''})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            {price !== undefined && price !== null ? (
              <span className="text-3xl font-black text-white">
                ${Number(price).toFixed(2)}
              </span>
            ) : (
              <span className="text-3xl font-black text-surface-500">
                Price TBD
              </span>
            )}
            {isOnSale && (
              <span className="text-lg text-surface-500 line-through">
                ${Number(comparePrice).toFixed(2)}
              </span>
            )}
            {isOnSale && price && comparePrice && (
              <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-md uppercase">
                Save ${(comparePrice - price).toFixed(2)}
              </span>
            )}
          </div>

          {/* Inventory Status */}
          {inventoryStatus && (
            <div className="mb-6">
              <InventoryBadge status={inventoryStatus} />
            </div>
          )}

          {/* Changed: Add to Cart Button */}
          {price !== undefined && price !== null && (
            <div className="mb-8">
              <AddToCartButton
                productId={product.id}
                slug={product.slug}
                name={product.metadata?.name || product.title}
                price={Number(price)}
                imageUrl={cartImageUrl}
                disabled={isOutOfStock}
              />
            </div>
          )}

          {/* Description */}
          {product.metadata?.description && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-3">
                Description
              </h3>
              <p className="text-surface-400 leading-relaxed whitespace-pre-wrap">
                {product.metadata.description}
              </p>
            </div>
          )}

          {/* Divider */}
          <div className="border-t border-surface-800 my-8" />

          {/* Quick Details */}
          <div className="space-y-3 text-sm">
            {category && (
              <div className="flex justify-between">
                <span className="text-surface-500">Category</span>
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-brand-400 hover:text-brand-300 font-medium transition-colors"
                >
                  {category.metadata?.name || category.title}
                </Link>
              </div>
            )}
            {inventoryStatus && (
              <div className="flex justify-between">
                <span className="text-surface-500">Availability</span>
                <span className="text-surface-200 font-medium">
                  {inventoryStatus}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="mt-20">
        <div className="border-t border-surface-800 pt-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Customer Reviews
            {reviews.length > 0 && (
              <span className="text-surface-500 text-lg font-normal ml-2">
                ({reviews.length})
              </span>
            )}
          </h2>
          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-surface-900/50 rounded-2xl border border-surface-800">
              <p className="text-4xl mb-3">💬</p>
              <p className="text-surface-400">
                No reviews yet for this product.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}