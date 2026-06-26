"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { process } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-ink-950/40 py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-deep/40 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <Reveal>
              <span className="text-sm font-600 uppercase tracking-[0.2em] text-teal-light">
                How we work
              </span>
              <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-white sm:text-5xl">
                A proven process,
                <br />
                <span className="text-gradient">repeated flawlessly.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-slate-400">
                Consistency is a system, not a promise. Here&rsquo;s exactly how
                we turn a first walkthrough into spotless results you never have
                to think about.
              </p>
            </Reveal>
          </div>

          <div ref={ref} className="relative">
            {/* Progress rail */}
            <div className="absolute left-[27px] top-2 h-full w-px bg-white/10">
              <motion.div
                style={{ height: lineHeight }}
                className="w-full bg-gradient-to-b from-teal-light to-teal"
              />
            </div>

            <div className="space-y-10">
              {process.map((p, i) => (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-15%" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  className="relative flex gap-6 pl-1"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-teal/30 bg-ink-950 font-display text-lg font-700 text-teal-light shadow-[0_0_24px_-6px_rgba(20,184,166,0.6)]">
                    {p.step}
                  </div>
                  <div className="pt-1.5">
                    <h3 className="font-display text-2xl font-700 text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg leading-relaxed text-slate-400">
                      {p.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
