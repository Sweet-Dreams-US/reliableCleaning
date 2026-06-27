"use client";

import { ReactNode } from "react";

export function Badge({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-600 ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/8 bg-white/[0.03] ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-2xl font-800 tracking-tight text-white sm:text-3xl">
          {title}
        </h1>
        {subtitle && <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  delta,
  icon,
  accent = "teal",
}: {
  label: string;
  value: string;
  delta?: string;
  icon: ReactNode;
  accent?: "teal" | "aqua" | "amber" | "rose";
}) {
  const accents: Record<string, string> = {
    teal: "from-teal/20 text-teal-light",
    aqua: "from-aqua/20 text-aqua",
    amber: "from-amber-400/20 text-amber-300",
    rose: "from-rose-500/20 text-rose-300",
  };
  return (
    <Card className="relative overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-500 uppercase tracking-wide text-slate-400">
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-800 text-white">
            {value}
          </p>
          {delta && (
            <p className="mt-1.5 text-xs font-500 text-teal-light">{delta}</p>
          )}
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br to-transparent ring-1 ring-white/10 ${accents[accent]}`}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function Stars({ n }: { n: number }) {
  return (
    <span className="text-gold">
      {n > 0 ? "★".repeat(n) + "☆".repeat(5 - n) : "—"}
    </span>
  );
}
