import type { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Products — Dope Kicks',
  description: 'Browse our full collection of collectible sneakers and exclusive accessories.'
}

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
          Collection
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          All Products
        </h1>
        <p className="mt-4 text-surface-400 text-lg max-w-2xl">
          Explore our curated selection of collectible sneakers and premium
          accessories. Every pair tells a story.
        </p>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-10">
          <span className="px-5 py-2.5 bg-brand-500 text-white text-sm font-semibold rounded-full">
            All
          </span>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="px-5 py-2.5 bg-surface-800 hover:bg-surface-700 text-surface-300 hover:text-white text-sm font-semibold rounded-full transition-colors"
            >
              {cat.metadata?.name || cat.title}
            </Link>
          ))}
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">👟</p>
          <p className="text-surface-400 text-lg">
            No products found. Add some kicks in your Cosmic dashboard!
          </p>
        </div>
      )}

      {/* Product Count */}
      {products.length > 0 && (
        <p className="text-surface-500 text-sm mt-8 text-center">
          Showing {products.length} product{products.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}