import type { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Categories — Dope Kicks',
  description: 'Browse sneaker and accessory categories at Dope Kicks.'
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      {/* Page Header */}
      <div className="mb-12">
        <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
          Browse
        </p>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
          Categories
        </h1>
        <p className="mt-4 text-surface-400 text-lg max-w-2xl">
          Find exactly what you&apos;re looking for. Browse our curated
          categories of collectible sneakers and accessories.
        </p>
      </div>

      {/* Categories Grid */}
      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            const coverImg = category.metadata?.cover_image
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] card-hover"
              >
                {coverImg?.imgix_url ? (
                  <img
                    src={`${coverImg.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={category.metadata?.name || category.title}
                    width={400}
                    height={300}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {category.metadata?.name || category.title}
                  </h2>
                  {category.metadata?.description && (
                    <p className="text-surface-300 text-sm line-clamp-2 leading-relaxed">
                      {category.metadata.description}
                    </p>
                  )}
                  <span className="inline-flex items-center mt-4 text-brand-300 text-sm font-semibold group-hover:text-brand-200 transition-colors">
                    Explore Collection
                    <svg
                      className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🏷️</p>
          <p className="text-surface-400 text-lg">
            No categories found. Add some in your Cosmic dashboard!
          </p>
        </div>
      )}
    </div>
  )
}