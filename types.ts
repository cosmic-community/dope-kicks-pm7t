export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    cover_image?: CosmicImage
  }
}

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pre-Order' | string

export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    name?: string
    description?: string
    price?: number
    compare_at_price?: number
    featured_image?: CosmicImage
    gallery?: CosmicImage[]
    inventory_status?: InventoryStatus | { key: string; value: string }
    category?: Category
  }
}

export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    reviewer_name?: string
    rating?: number
    review_text?: string
    product?: Product
  }
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}