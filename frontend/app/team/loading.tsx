export default function TeamLoading() {
  return (
    <div>
      <section className="px-6 py-16 text-center md:py-24">
        <div className="mx-auto h-10 w-64 animate-pulse rounded bg-surface" />
        <div className="mx-auto mt-4 h-6 w-80 animate-pulse rounded bg-surface" />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="h-3 w-10 animate-pulse rounded bg-surface-hover" />
              <div className="mt-4 aspect-square w-full animate-pulse rounded-lg bg-surface-hover" />
              <div className="mt-4 space-y-2">
                <div className="h-6 w-3/4 animate-pulse rounded bg-surface-hover" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-surface-hover" />
                <div className="h-4 w-full animate-pulse rounded bg-surface-hover" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
