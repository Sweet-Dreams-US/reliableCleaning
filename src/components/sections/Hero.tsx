"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { ArrowRight, Phone, Sparkles, ShieldCheck } from "lucide-react";
import { company } from "@/lib/site";
import { heroFrames } from "@/lib/assets";

function Frame({
  src,
  opacity,
  scale,
}: {
  src: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
}) {
  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 will-change-[opacity]"
    >
      <motion.img
        src={src}
        alt=""
        style={{ scale }}
        className="h-full w-full object-cover"
        loading="eager"
      />
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Crossfade the three frames across the scroll of this tall section.
  const o1 = useTransform(scrollYProgress, [0, 0.32, 0.46], [1, 1, 0]);
  const o2 = useTransform(scrollYProgress, [0.34, 0.5, 0.66], [0, 1, 0]);
  const o3 = useTransform(scrollYProgress, [0.6, 0.78, 1], [0, 1, 1]);
  const s1 = useTransform(scrollYProgress, [0, 0.5], [1.08, 1.16]);
  const s2 = useTransform(scrollYProgress, [0.3, 0.8], [1.12, 1.04]);
  const s3 = useTransform(scrollYProgress, [0.6, 1], [1.12, 1]);

  // Progress bar + active stage
  const barWidth = useTransform(scrollYProgress, [0, 1], ["8%", "100%"]);
  const [stage, setStage] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStage(p < 0.4 ? 0 : p < 0.72 ? 1 : 2);
  });

  return (
    <section ref={ref} className="relative h-[280vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Transforming room */}
        <Frame src={heroFrames[0].src} opacity={o1} scale={s1} />
        <Frame src={heroFrames[1].src} opacity={o2} scale={s2} />
        <Frame src={heroFrames[2].src} opacity={o3} scale={s3} />

        {/* Light, airy legibility washes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/10 to-white/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/70 via-transparent to-transparent" />

        {/* Stage indicator */}
        <div className="absolute right-5 top-24 z-20 sm:right-8">
          <div className="flex flex-col items-end gap-1.5">
            {heroFrames.map((f, i) => (
              <div
                key={f.label}
                style={{ opacity: stage === i ? 1 : 0.35 }}
                className="flex items-center gap-2 rounded-full border border-ink/5 bg-white/85 px-3 py-1.5 text-xs font-600 text-ink backdrop-blur transition-opacity"
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    i === 0 ? "bg-amber-400" : i === 1 ? "bg-sky" : "bg-emerald"
                  }`}
                />
                {f.label}
              </div>
            ))}
          </div>
        </div>

        {/* Hero copy */}
        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-16 sm:justify-center sm:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/80 px-4 py-1.5 text-xs font-600 text-teal-dark backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 text-teal" />
              {company.bbb} · Trusted since {company.founded}
            </div>

            <h1 className="mt-5 font-display text-5xl font-800 leading-[1.03] tracking-tight text-ink sm:text-6xl md:text-7xl">
              Watch your space
              <br />
              <span className="text-gradient">transform.</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              Fort Wayne&rsquo;s commercial cleaning standard for nearly half a
              century. Scroll to see what dependable, detail-obsessed cleaning
              actually looks like.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contact"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-sky px-6 py-3.5 font-600 text-white shadow-lg shadow-teal/25 transition hover:shadow-teal/40"
              >
                Get a free quote
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={company.phoneHref}
                className="flex items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white/80 px-6 py-3.5 font-600 text-ink backdrop-blur transition hover:border-teal/40 hover:bg-white"
              >
                <Phone className="h-4 w-4 text-teal" />
                {company.phone}
              </a>
            </div>

            {/* Scroll progress rail */}
            <div className="mt-10 max-w-sm">
              <div className="mb-2 flex items-center justify-between text-xs font-600 text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-teal" />
                  Keep scrolling
                </span>
                <span className="text-teal-dark">{heroFrames[stage].caption}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  style={{ width: barWidth }}
                  className="h-full rounded-full bg-gradient-to-r from-sky via-teal to-emerald"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

