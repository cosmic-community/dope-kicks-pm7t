export default function ProductsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="animate-pulse">
        <div className="h-4 w-20 bg-surface-800 rounded mb-2" />
        <div className="h-12 w-72 bg-surface-800 rounded-lg mb-4" />
        <div className="h-6 w-96 bg-surface-800 rounded mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-surface-900 rounded-2xl overflow-hidden">
              <div className="aspect-square bg-surface-800 shimmer-bg animate-shimmer" />
              <div className="p-5 space-y-3">
                <div className="h-4 w-20 bg-surface-800 rounded" />
                <div className="h-5 w-full bg-surface-800 rounded" />
                <div className="h-6 w-24 bg-surface-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}