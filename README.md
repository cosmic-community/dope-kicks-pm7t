# Dope Kicks
![App Preview](https://imgix.cosmicjs.com/6e299f00-1750-11f1-95d6-291bc45ac05c-autopilot-photo-1491553895911-0055eca6402d-1772576963629.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A premium online store for collectible sneakers and accessories, built with Next.js 16 and powered by [Cosmic](https://www.cosmicjs.com). Browse products, explore categories, and read authentic customer reviews — all managed through the Cosmic CMS dashboard.

## Features

- 🏠 **Dynamic Homepage** — Hero section, featured products, category showcase, and latest reviews
- 👟 **Product Catalog** — Filterable grid with pricing, sale badges, and inventory status
- 📄 **Product Detail Pages** — Full gallery, descriptions, pricing breakdown, and linked reviews
- 🏷️ **Category Browsing** — Dedicated category pages with filtered product listings
- ⭐ **Customer Reviews** — Star ratings and review text linked to specific products
- 📱 **Responsive Design** — Mobile-first, dark-themed sneaker-culture-inspired UI
- 🚀 **Server-Side Rendering** — Fast load times and excellent SEO
- 🔍 **Inventory Status Badges** — Visual indicators for in-stock, low-stock, and sold-out items

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a76063971c989d2fca051f&clone_repository=69a761ca971c989d2fca0547)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews. User instructions: An online store for collectible sneakers and accessories."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'Dope Kicks'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: An online store for collectible sneakers and accessories."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router and Server Components
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first styling
- [Cosmic SDK](https://www.cosmicjs.com/docs) — Content management and delivery
- [Inter Font](https://fonts.google.com/specimen/Inter) — Modern sans-serif typography

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd dope-kicks

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables

```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

## Cosmic SDK Examples

### Fetching Products

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'air-jordan-1' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Reviews for a Product

```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content object types:

| Object Type | Fields |
|-------------|--------|
| **Products** | name, description, price, compare_at_price, featured_image, gallery, inventory_status, category |
| **Categories** | name, description, cover_image |
| **Reviews** | reviewer_name, rating, review_text, product |

All content is managed via the [Cosmic Dashboard](https://app.cosmicjs.com) and fetched server-side for optimal performance.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command to `bun run build`
4. Set publish directory to `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->