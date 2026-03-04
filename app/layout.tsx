import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Dope Kicks — Collectible Sneakers & Accessories',
  description:
    'Shop the freshest collectible sneakers and exclusive accessories at Dope Kicks. Premium kicks for true collectors.'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>👟</text></svg>"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="min-h-screen bg-surface-950 text-surface-50 font-sans antialiased">
        {/* Changed: Wrapped entire app in CartProvider */}
        <CartProvider>
          <Header />
          <main className="min-h-[calc(100vh-160px)]">{children}</main>
          <Footer />
          <CosmicBadge bucketSlug={bucketSlug} />
        </CartProvider>
      </body>
    </html>
  )
}