import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-bold tracking-widest text-text">
          ARMATRIX
        </Link>
        <Link
          href="/team"
          className="text-sm font-medium tracking-wider text-text-muted transition-colors hover:text-text"
        >
          Team
        </Link>
      </div>
    </nav>
  );
}
