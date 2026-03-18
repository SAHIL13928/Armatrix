import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm tracking-widest text-text-muted">/001</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-7xl">
        ARMATRIX
      </h1>
      <p className="mt-4 max-w-md text-lg text-text-muted">
        Building the future of industrial robotics. Snake-arm robots that go
        where humans can&apos;t.
      </p>
      <Link
        href="/team"
        className="mt-8 inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium tracking-wider transition-colors hover:border-accent/50 hover:bg-surface-hover"
      >
        Meet the Team
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
