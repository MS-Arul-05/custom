export default function Loading() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Wordmark */}
      <div className="flex flex-col items-center justify-center mb-12">
        <p
          className="font-heading font-extrabold tracking-tight animate-pulse"
          style={{ fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text-primary)' }}
        >
          FIT<span style={{ color: 'var(--accent)' }}>BOX</span>
        </p>
        <p className="text-xs mt-2 animate-pulse" style={{ color: 'var(--text-tertiary)' }}>
          Loading the heat…
        </p>
      </div>

      {/* Skeleton grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div
              className="w-full rounded-card mb-3"
              style={{ background: 'var(--bg-surface)', aspectRatio: '4 / 5', border: '1px solid var(--border)' }}
            />
            <div
              className="h-4 rounded-badge mb-2"
              style={{ background: 'var(--bg-surface)', width: '70%', border: '1px solid var(--border)' }}
            />
            <div
              className="h-4 rounded-badge"
              style={{ background: 'var(--bg-surface)', width: '40%', border: '1px solid var(--border)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
