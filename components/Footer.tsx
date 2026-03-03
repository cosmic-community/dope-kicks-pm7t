import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-surface-800/50 bg-surface-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <span className="text-2xl">👟</span>
              <span className="text-xl font-black tracking-tight text-white">
                Dope Kicks
              </span>
            </Link>
            <p className="text-surface-500 text-sm leading-relaxed max-w-xs">
              Your destination for the most coveted collectible sneakers and
              exclusive accessories. Premium kicks for true collectors.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {/* Changed: Added Contact link */}
              {[
                { href: '/products', label: 'All Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/reviews', label: 'Reviews' },
                { href: '/contact', label: 'Contact Us' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-surface-500 hover:text-brand-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h3 className="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-4">
              Powered By
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-500 hover:text-brand-400 text-sm transition-colors"
                >
                  Cosmic CMS
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-500 hover:text-brand-400 text-sm transition-colors"
                >
                  Next.js
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-surface-500 hover:text-brand-400 text-sm transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-surface-800/50 text-center">
          <p className="text-surface-600 text-sm">
            © {currentYear} Dope Kicks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}