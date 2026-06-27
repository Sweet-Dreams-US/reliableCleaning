"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { serviceAreas, company } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";

export function Areas() {
  return (
    <section id="areas" className="relative bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-sm font-700 uppercase tracking-[0.2em] text-teal-dark">
                Coverage
              </span>
              <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-ink sm:text-5xl">
                Proudly serving all of
                <br />
                <span className="text-gradient">Northeast Indiana.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-ink-500">
                Headquartered in {company.address.city}, our crews keep
                facilities spotless across the region. Don&rsquo;t see your town?
                Call us — we likely cover it.
              </p>
            </Reveal>

            <Stagger className="mt-8 flex flex-wrap gap-2.5">
              {serviceAreas.map((area) => (
                <StaggerItem key={area}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-sand px-4 py-2 text-sm font-600 text-ink/80 transition hover:border-teal/40 hover:text-teal-dark">
                    <MapPin className="h-3.5 w-3.5 text-teal" />
                    {area}
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Stylized coverage visual */}
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-ink/8 bg-gradient-to-br from-mist to-white shadow-xl">
              {/* Concentric radar rings */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                {[1, 2, 3].map((r) => (
                  <span
                    key={r}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal/30"
                    style={{ width: `${r * 9}rem`, height: `${r * 9}rem` }}
                  />
                ))}
                <motion.span
                  animate={{ scale: [1, 1.12, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky shadow-[0_0_40px_-6px_rgba(20,184,166,0.7)]"
                >
                  <MapPin className="h-7 w-7 text-white" />
                </motion.span>
              </div>
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
                  <span className="h-2.5 w-2.5 rounded-full bg-teal shadow-[0_0_12px_2px_rgba(20,184,166,0.5)]" />
                </motion.span>
              ))}
              <div className="absolute bottom-5 left-5 rounded-xl border border-ink/8 bg-white/90 px-4 py-3 backdrop-blur">
                <p className="font-display text-2xl font-800 text-ink">
                  {company.address.city}, {company.address.state}
                </p>
                <p className="text-xs text-teal-dark">
                  Home base since {company.founded}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
