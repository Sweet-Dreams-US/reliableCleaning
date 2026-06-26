"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Sparkles,
  Layers,
  PackageCheck,
  ShieldCheck,
  Home,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";
import { services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  Building2,
  Sparkles,
  Layers,
  PackageCheck,
  ShieldCheck,
  Home,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-teal/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-600 uppercase tracking-[0.2em] text-teal-light">
            What we do
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-white sm:text-5xl">
            A complete cleaning program,
            <br />
            <span className="text-gradient">one reliable partner.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            From nightly janitorial to specialty restoration, every service is
            backed by trained crews, documented checklists, and quality
            inspections.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.icon] ?? Sparkles;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 0.1}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-7"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal/20 to-deep/40 ring-1 ring-teal/30">
                    <Icon className="h-6 w-6 text-teal-light" />
                  </div>
                  <h3 className="mt-5 flex items-center justify-between font-display text-xl font-700 text-white">
                    {s.title}
                    <ArrowUpRight className="h-5 w-5 text-slate-500 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal-light" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {s.blurb}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-slate-300"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
