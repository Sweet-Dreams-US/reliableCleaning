"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { company } from "@/lib/site";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "Our Story" },
  { href: "#areas", label: "Service Area" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled
            ? "glass-strong mx-3 shadow-[0_8px_40px_-12px_rgba(20,184,166,0.35)]"
            : "bg-transparent"
        }`}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-deep">
            <Sparkles className="h-5 w-5 text-white" />
            <span className="absolute inset-0 animate-pulse-ring rounded-xl border border-teal-light/60" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-700 tracking-tight text-white">
              {company.shortName}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-teal-light/80">
              Cleaning Service
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-sm font-500 text-slate-200/80 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden rounded-lg px-3 py-2 text-sm font-500 text-teal-light transition hover:text-white sm:block"
          >
            Admin
          </Link>
          <a
            href={company.phoneHref}
            className="group hidden items-center gap-2 rounded-xl bg-gradient-to-r from-teal to-aqua px-4 py-2.5 text-sm font-600 text-ink-950 shadow-lg shadow-teal/20 transition hover:shadow-teal/40 md:flex"
          >
            <Phone className="h-4 w-4" />
            {company.phone}
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mx-3 mt-2 overflow-hidden rounded-2xl glass-strong lg:hidden"
          >
            <div className="flex flex-col p-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-500 text-slate-200 transition hover:bg-white/5"
                >
                  {l.label}
                </a>
              ))}
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-500 text-teal-light"
              >
                Admin Panel
              </Link>
              <a
                href={company.phoneHref}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-aqua px-4 py-3 font-600 text-ink-950"
              >
                <Phone className="h-4 w-4" /> {company.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
