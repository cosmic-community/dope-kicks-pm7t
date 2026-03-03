export default function CategoriesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="animate-pulse">
        <div className="h-4 w-16 bg-surface-800 rounded mb-2" />
        <div className="h-12 w-56 bg-surface-800 rounded-lg mb-4" />
        <div className="h-6 w-80 bg-surface-800 rounded mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-surface-800 rounded-2xl shimmer-bg animate-shimmer" />
          ))}
        </div>
      </div>
    </div>
  )
}