"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { serviceAreas, company } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export function Areas() {
  return (
    <section id="areas" className="relative bg-ink-950/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-teal-light">
                Coverage
              </span>
              <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-white sm:text-5xl">
                Proudly serving all of
                <br />
                <span className="text-gradient">Northeast Indiana.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-slate-400">
                Headquartered in {company.address.city}, our crews keep
                facilities spotless across the region. Don&rsquo;t see your town?
                Call us — we likely cover it.
              </p>
            </Reveal>

            <Stagger className="mt-8 flex flex-wrap gap-2.5">
              {serviceAreas.map((area) => (
                <StaggerItem key={area}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-500 text-slate-200 transition hover:border-teal/40 hover:text-white">
                    <MapPin className="h-3.5 w-3.5 text-teal-light" />
                    {area}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Stylized coverage visual */}
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-deep/60 to-ink-950">
              <div className="absolute inset-0 bg-grid-faint bg-[size:32px_32px] opacity-30" />
              {/* Concentric radar rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {[1, 2, 3].map((r) => (
                  <span
                    key={r}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-teal/40"
                    style={{
                      width: `${r * 9}rem`,
                      height: `${r * 9}rem`,
                      animationDelay: `${r * 0.8}s`,
                    }}
                  />
                ))}
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal to-aqua shadow-[0_0_40px_-4px_rgba(20,184,166,0.8)]"
                >
                  <MapPin className="h-7 w-7 text-ink-950" />
                </motion.span>
              </div>
              {/* Floating town pins */}
              {[
                { top: "18%", left: "28%" },
                { top: "30%", left: "72%" },
                { top: "68%", left: "22%" },
                { top: "74%", left: "66%" },
                { top: "50%", left: "85%" },
              ].map((pos, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3 + i, repeat: Infinity }}
                  className="absolute flex h-3 w-3 items-center justify-center"
                  style={pos}
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-teal-light shadow-[0_0_12px_2px_rgba(94,234,212,0.6)]" />
                </motion.span>
              ))}
              <div className="absolute bottom-5 left-5 rounded-xl glass px-4 py-3">
                <p className="font-display text-2xl font-800 text-white">
                  {company.address.city}, {company.address.state}
                </p>
                <p className="text-xs text-teal-light">Home base since {company.founded}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
