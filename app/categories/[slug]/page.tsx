// app/categories/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    return { title: 'Category Not Found — Dope Kicks' }
  }

  return {
    title: `${category.metadata?.name || category.title} — Dope Kicks`,
    description:
      category.metadata?.description ||
      `Browse ${category.title} at Dope Kicks`
  }
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const coverImg = category.metadata?.cover_image

  return (
    <div>
      {/* Category Hero */}
      <section className="relative overflow-hidden">
        {coverImg?.imgix_url ? (
          <img
            src={`${coverImg.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
            alt={category.metadata?.name || category.title}
            width={960}
            height={300}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/70 to-surface-950/30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <nav className="flex items-center gap-2 text-sm text-surface-400 mb-6">
            <Link
              href="/"
              className="hover:text-surface-200 transition-colors"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              href="/categories"
              className="hover:text-surface-200 transition-colors"
            >
              Categories
            </Link>
            <span>/</span>
            <span className="text-surface-200">
              {category.metadata?.name || category.title}
            </span>
          </nav>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            {category.metadata?.name || category.title}
          </h1>
          {category.metadata?.description && (
            <p className="mt-4 text-lg text-surface-300 max-w-2xl">
              {category.metadata.description}
            </p>
          )}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold">
            {products.length} Product{products.length !== 1 ? 's' : ''}
          </h2>
          <Link
            href="/products"
            className="text-brand-400 hover:text-brand-300 text-sm font-semibold transition-colors"
          >
            ← All Products
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-surface-900/50 rounded-2xl border border-surface-800">
            <p className="text-5xl mb-4">👟</p>
            <p className="text-surface-400 text-lg">
              No products in this category yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center mt-6 text-brand-400 hover:text-brand-300 font-semibold transition-colors"
            >
              Browse All Products →
            </Link>
          </div>
        )}
      </section>
    </div>
  )
}