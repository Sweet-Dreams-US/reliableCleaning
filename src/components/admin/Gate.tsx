"use client";

import { ReactNode } from "react";
import { useAdmin } from "@/lib/admin/store";

/**
 * Renders children only once the client store has hydrated. This keeps the
 * server-rendered markup and the first client render identical (a skeleton),
 * sidestepping hydration mismatches from date-derived demo data + localStorage.
 */
export function Gate({ children }: { children: ReactNode }) {
  const { ready } = useAdmin();

  if (!ready) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-9 w-64 rounded-lg bg-white/5" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-white/5" />
          ))}
        </div>
        <div className="h-72 rounded-2xl bg-white/5" />
      </div>
    );
  }

  return <>{children}</>;
}
