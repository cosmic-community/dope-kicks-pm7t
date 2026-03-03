import ContactForm from '@/components/ContactForm'

export const metadata = {
  title: 'Contact Us — Dope Kicks',
  description:
    'Get in touch with Dope Kicks. Questions about our collectible sneakers, orders, or anything else? Drop us a message.',
}

export default function ContactPage() {
  return (
    <div>
      {/* Page Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-surface-950 to-surface-950" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-brand-400 font-semibold text-sm uppercase tracking-widest mb-2">
            Get in Touch
          </p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-surface-400 max-w-2xl">
            Have a question about an order, a product, or just want to say hi?
            Fill out the form below and we&apos;ll get back to you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form */}
          <div>
            <div className="bg-surface-900/60 border border-surface-800 rounded-2xl p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Other Ways to Reach Us
              </h2>
              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-500/15 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:tony@cosmicjs.com"
                      className="text-surface-400 hover:text-brand-400 transition-colors text-sm"
                    >
                      tony@cosmicjs.com
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-500/15 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Response Time
                    </h3>
                    <p className="text-surface-400 text-sm">
                      We typically respond within 24 hours during business days.
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-brand-500/15 rounded-xl flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-brand-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Location</h3>
                    <p className="text-surface-400 text-sm">
                      Shipping worldwide from the US.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ callout */}
            <div className="bg-surface-900/60 border border-surface-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-2">
                Frequently Asked Questions
              </h3>
              <p className="text-surface-400 text-sm mb-4">
                Before reaching out, here are answers to some common questions:
              </p>
              <ul className="space-y-3 text-sm text-surface-400">
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span>
                  <span>
                    <strong className="text-surface-200">Shipping:</strong> All
                    orders ship within 2–5 business days.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span>
                  <span>
                    <strong className="text-surface-200">Returns:</strong> We
                    accept returns within 14 days of delivery.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-brand-400 mt-0.5">•</span>
                  <span>
                    <strong className="text-surface-200">Authenticity:</strong>{' '}
                    Every pair is verified authentic before shipping.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}