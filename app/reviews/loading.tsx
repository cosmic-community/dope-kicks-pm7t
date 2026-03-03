export default function ReviewsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="animate-pulse">
        <div className="h-4 w-24 bg-surface-800 rounded mb-2" />
        <div className="h-12 w-80 bg-surface-800 rounded-lg mb-4" />
        <div className="h-6 w-96 bg-surface-800 rounded mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-surface-900 rounded-2xl p-6 space-y-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="w-4 h-4 bg-surface-800 rounded" />
                ))}
              </div>
              <div className="h-4 w-full bg-surface-800 rounded" />
              <div className="h-4 w-3/4 bg-surface-800 rounded" />
              <div className="h-3 w-32 bg-surface-800 rounded mt-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}