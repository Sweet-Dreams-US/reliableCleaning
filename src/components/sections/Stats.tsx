"use client";

import { Counter } from "@/components/Counter";
import { stats } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

const marqueeWords = [
  "Office Janitorial",
  "Carpet Extraction",
  "Floor Refinishing",
  "Disinfection",
  "Window Care",
  "Restroom Supplies",
  "Post-Construction",
  "Day Porter",
];

export function Stats() {
  return (
    <section className="relative border-y border-ink/5 bg-sand">
      {/* Marquee */}
      <div className="relative flex overflow-hidden border-b border-ink/5 bg-white py-5">
        <div className="flex animate-[marquee_28s_linear_infinite] whitespace-nowrap">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span
              key={i}
              className="mx-8 flex items-center gap-8 text-sm font-600 uppercase tracking-[0.18em] text-ink-500"
            >
              {w}
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-ink/5 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="bg-sand px-6 py-10 text-center">
              <div className="font-display text-4xl font-800 text-gradient sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm font-600 text-ink-500">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
