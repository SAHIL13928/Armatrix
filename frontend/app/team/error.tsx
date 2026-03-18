"use client";

export default function TeamError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm tracking-widest text-text-muted">
        /ERR
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-text-muted">
        We couldn&apos;t load the team data. The server may be starting up.
      </p>
      <button
        onClick={reset}
        className="mt-8 rounded-full border border-border px-6 py-3 text-sm font-medium tracking-wider transition-colors hover:border-accent/50 hover:bg-surface-hover"
      >
        Try again
      </button>
    </div>
  );
}
