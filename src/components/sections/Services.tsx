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
    <section id="services" className="relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-700 uppercase tracking-[0.2em] text-teal-dark">
            What we do
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-ink sm:text-5xl">
            A complete cleaning program,
            <br />
            <span className="text-gradient">one reliable partner.</span>
          </h2>
          <p className="mt-5 text-lg text-ink-500">
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
                  className="group relative h-full overflow-hidden rounded-2xl border border-ink/8 bg-white p-7 shadow-[0_1px_2px_rgba(15,34,51,0.04),0_18px_40px_-24px_rgba(15,34,51,0.18)]"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-teal/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal/15 to-sky/15 ring-1 ring-teal/20">
                    <Icon className="h-6 w-6 text-teal-dark" />
                  </div>
                  <h3 className="mt-5 flex items-center justify-between font-display text-xl font-700 text-ink">
                    {s.title}
                    <ArrowUpRight className="h-5 w-5 text-ink/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-teal" />
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {s.blurb}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.details.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2.5 text-sm text-ink/80"
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
