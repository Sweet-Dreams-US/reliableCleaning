"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  HardHat,
  CalendarDays,
  FileText,
  Sparkles,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";
import { useAdmin } from "@/lib/admin/store";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/staff", label: "Staff", icon: HardHat },
  { href: "/admin/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/admin/invoices", label: "Invoices", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();
  const { reset } = useAdmin();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/8 bg-ink-950/80 px-4 py-6 lg:flex">
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-deep">
          <Sparkles className="h-5 w-5 text-white" />
        </span>
        <div className="leading-none">
          <p className="font-display text-sm font-700 text-white">Reliable</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-teal-light/80">
            Ops Console
          </p>
        </div>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {nav.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-500 transition ${
                active
                  ? "bg-gradient-to-r from-teal/20 to-transparent text-white ring-1 ring-teal/30"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon
                className={`h-[18px] w-[18px] ${active ? "text-teal-light" : ""}`}
              />
              {item.label}
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-white/8 pt-4">
        <button
          onClick={reset}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-500 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <RotateCcw className="h-[18px] w-[18px]" />
          Reset demo data
        </button>
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-500 text-slate-400 transition hover:bg-white/5 hover:text-white"
        >
          <ArrowLeft className="h-[18px] w-[18px]" />
          Back to site
        </Link>
      </div>
    </aside>
  );
}
