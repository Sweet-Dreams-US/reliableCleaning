"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, MousePointer2 } from "lucide-react";
import { company } from "@/lib/site";

const FlyThrough = dynamic(() => import("@/components/three/FlyThrough"), {
  ssr: false,
});

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useRef(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Feed scroll into a ref the 3D loop damps toward — smooth, no skips.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    progress.current = p;
  });

  const introOpacity = useTransform(scrollYProgress, [0, 0.12, 0.22], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.22], [0, -40]);
  const outroOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.86, 1],
    [0, 1, 1]
  );
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section ref={ref} className="relative h-[440vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Airy backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_#ffffff_0%,_#eef8f8_45%,_#dceef0_100%)]" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-teal/15 blur-[150px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-sky/15 blur-[150px]" />

        {/* 3D fly-through */}
        <div className="absolute inset-0">
          <FlyThrough progress={progress} />
        </div>

        {/* Intro copy */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-white/80 px-4 py-1.5 text-xs font-600 text-teal-dark backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-teal" />
            {company.bbb} · Trusted since {company.founded}
          </div>
          <h1 className="mt-6 max-w-4xl font-display text-5xl font-800 leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl">
            Spotless spaces.
            <br />
            <span className="text-gradient">Reliable people.</span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink-500">
            Fort Wayne&rsquo;s commercial cleaning standard for nearly half a
            century. Scroll to drift through the freshness.
          </p>
        </motion.div>

        {/* Outro copy + CTAs (revealed after the fly-through) */}
        <motion.div
          style={{ opacity: outroOpacity }}
          className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="max-w-3xl font-display text-4xl font-800 leading-tight tracking-tight text-ink sm:text-6xl">
            Clean you can <span className="text-gradient">count on.</span>
          </h2>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal to-sky px-6 py-3.5 font-600 text-white shadow-lg shadow-teal/25 transition hover:shadow-teal/40"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={company.phoneHref}
              className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white/80 px-6 py-3.5 font-600 text-ink backdrop-blur transition hover:border-teal/40 hover:bg-white"
            >
              <Phone className="h-4 w-4 text-teal" />
              {company.phone}
            </a>
          </div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-ink-500">
            <span className="flex items-center gap-1.5 text-xs font-600 uppercase tracking-[0.18em]">
              <MousePointer2 className="h-3.5 w-3.5 text-teal" />
              Scroll to explore
            </span>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-ink/20 p-1.5">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-2 w-1 rounded-full bg-teal"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
