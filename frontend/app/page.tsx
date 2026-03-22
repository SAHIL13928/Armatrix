"use client";

import Link from "next/link";
import { useRef } from "react";
import VariableProximity from "@/components/VariableProximity";

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      
      <p className="font-mono text-sm tracking-widest text-text-muted">/001</p>

      {/* 🔥 Variable Proximity Text */}
     <div
  ref={containerRef}
  className="relative mt-4 w-full h-[150px] flex items-center justify-center"
>
        <VariableProximity
          label="ARMATRIX"
          className="text-5xl md:text-7xl font-bold tracking-tight text-white"
          fromFontVariationSettings="'wght' 400, 'opsz' 9"
          toFontVariationSettings="'wght' 1000, 'opsz' 40"
          containerRef={containerRef}
          radius={120}
          falloff="linear"
        />
      </div>

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