import Link from 'next/link'
import type { Product } from '@/types'
import { getMetafieldValue } from '@/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const featuredImage = product.metadata?.featured_image
  const price = product.metadata?.price
  const comparePrice = product.metadata?.compare_at_price
  const isOnSale = comparePrice && price && comparePrice > price
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status)
  const category = product.metadata?.category

  const statusLower = inventoryStatus.toLowerCase()
  let statusBgColor = 'bg-emerald-500/20 text-emerald-400'
  if (statusLower.includes('low')) {
    statusBgColor = 'bg-amber-500/20 text-amber-400'
  } else if (statusLower.includes('out') || statusLower.includes('sold')) {
    statusBgColor = 'bg-red-500/20 text-red-400'
  } else if (statusLower.includes('pre')) {
    statusBgColor = 'bg-blue-500/20 text-blue-400'
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-surface-900 rounded-2xl overflow-hidden border border-surface-800 hover:border-surface-700 card-hover"
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface-800 overflow-hidden">
        {featuredImage?.imgix_url ? (
          <img
            src={`${featuredImage.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={product.metadata?.name || product.title}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-5xl">
            👟
          </div>
        )}

        {/* Sale Badge */}
        {isOnSale && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">
            Sale
          </div>
        )}

        {/* Inventory Status Badge */}
        {inventoryStatus && (
          <div
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-xs font-semibold ${statusBgColor}`}
          >
            {inventoryStatus}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        {/* Category */}
        {category && (
          <p className="text-brand-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
            {category.metadata?.name || category.title}
          </p>
        )}

        {/* Title */}
        <h3 className="text-white font-bold text-sm leading-snug group-hover:text-brand-300 transition-colors line-clamp-2 mb-3">
          {product.metadata?.name || product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {price !== undefined && price !== null ? (
            <span className="text-lg font-black text-white">
              ${Number(price).toFixed(2)}
            </span>
          ) : (
            <span className="text-lg font-black text-surface-500">
              Price TBD
            </span>
          )}
          {isOnSale && (
            <span className="text-sm text-surface-500 line-through">
              ${Number(comparePrice).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}