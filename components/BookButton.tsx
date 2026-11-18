"use client";
import type { ReactNode } from "react";
import { pickTour } from "@/lib/pick";

export default function BookButton({ tour, note, className, children }: { tour: string; note?: string; className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => pickTour({ tour, note })}>
      {children}
    </button>
  );
}
