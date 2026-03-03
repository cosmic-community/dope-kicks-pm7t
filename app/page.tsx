import Link from 'next/link'
import { getProducts, getCategories, getReviews } from '@/lib/cosmic'
import { getMetafieldValue } from '@/types'
import ProductCard from '@/components/ProductCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews()
  ])

  const featuredProducts = products.slice(0, 4)
  const latestReviews = reviews.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-surface-950 to-surface-950" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-4">
              Collectible Sneakers & Accessories
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Step Into{' '}
              <span className="gradient-text">Greatness</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-surface-400 max-w-2xl leading-relaxed">
              Discover rare kicks, limited drops, and exclusive accessories.
              Dope Kicks is your destination for the most coveted collectible
              sneakers on the planet.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-brand-500/25"
              >
                Shop Collection
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-8 py-4 border border-surface-700 hover:border-surface-500 text-surface-200 font-bold rounded-xl transition-all duration-300 hover:bg-surface-800"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
              What&apos;s Hot
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Featured Kicks
            </h2>
          </div>
          <Link
            href="/products"
            className="text-brand-400 hover:text-brand-300 font-semibold text-sm transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-surface-500 text-center py-12">
            No products available yet. Add some in your Cosmic dashboard!
          </p>
        )}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/products"
            className="text-brand-400 hover:text-brand-300 font-semibold text-sm transition-colors"
          >
            View All Products →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-surface-900/50 border-y border-surface-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
              Explore
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Shop by Category
            </h2>
          </div>
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const coverImg = category.metadata?.cover_image
                return (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="group relative overflow-hidden rounded-2xl aspect-[16/10] card-hover"
                  >
                    {coverImg?.imgix_url ? (
                      <img
                        src={`${coverImg.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                        alt={category.metadata?.name || category.title}
                        width={400}
                        height={250}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-700 to-brand-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-bold text-white mb-1">
                        {category.metadata?.name || category.title}
                      </h3>
                      {category.metadata?.description && (
                        <p className="text-surface-300 text-sm line-clamp-2">
                          {category.metadata.description}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <p className="text-surface-500 text-center py-12">
              No categories yet. Create them in your Cosmic dashboard!
            </p>
          )}
        </div>
      </section>

      {/* Latest Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
              Community
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Latest Reviews
            </h2>
          </div>
          <Link
            href="/reviews"
            className="text-brand-400 hover:text-brand-300 font-semibold text-sm transition-colors hidden sm:block"
          >
            View All →
          </Link>
        </div>
        {latestReviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-surface-500 text-center py-12">
            No reviews yet. Add some in your Cosmic dashboard!
          </p>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 to-brand-800 p-10 sm:p-16 text-center">
          <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Don&apos;t Sleep on These
            </h2>
            <p className="text-brand-100 text-lg max-w-xl mx-auto mb-8">
              Browse our full collection of collectible sneakers and exclusive
              accessories. New drops added regularly.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-brand-700 font-bold rounded-xl transition-all duration-300 hover:bg-surface-100 hover:shadow-lg"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}