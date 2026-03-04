// ---- Cosmic base ----
export interface CosmicObject {
  id: string
  title: string
  slug: string
  metadata: Record<string, unknown>
  created_at?: string
  modified_at?: string
  content?: string
}

// ---- Media file ----
export interface CosmicMedia {
  url: string
  imgix_url: string
  name?: string
}

// ---- Categories ----
export interface CategoryMetadata {
  name?: string
  description?: string
  cover_image?: CosmicMedia
}

export interface Category extends Omit<CosmicObject, 'metadata'> {
  metadata?: CategoryMetadata
}

// ---- Products ----
export interface ProductMetadata {
  name?: string
  description?: string
  price?: number
  compare_at_price?: number
  featured_image?: CosmicMedia
  gallery?: CosmicMedia[]
  inventory_status?: string | { key: string; value: string }
  category?: Category
}

export interface Product extends Omit<CosmicObject, 'metadata'> {
  metadata?: ProductMetadata
}

// ---- Reviews ----
export interface ReviewMetadata {
  reviewer_name?: string
  rating?: number | string | { key: string; value: string }
  review_text?: string
  product?: Product
}

export interface Review extends Omit<CosmicObject, 'metadata'> {
  metadata?: ReviewMetadata
}

// ---- Cart ----
export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  imageUrl: string
  quantity: number
}

// ---- Helpers ----
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