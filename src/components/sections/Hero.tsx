"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { useScrollRef } from "@/lib/useScrollRef";
import { company } from "@/lib/site";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
});

export function Hero() {
  const scroll = useScrollRef();
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_#0d2440_0%,_#060d18_55%)]" />
      <div className="absolute inset-0 -z-10 bg-grid-faint bg-[size:46px_46px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-teal/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-32 top-60 -z-10 h-[30rem] w-[30rem] rounded-full bg-aqua/10 blur-[140px]" />

      {/* 3D canvas layer */}
      <div className="absolute inset-0 z-0">
        <HeroScene scroll={scroll} />
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col items-center justify-center px-6 pt-28 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-xs font-500 text-teal-light backdrop-blur"
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          {company.bbb} · Trusted since {company.founded}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl font-display text-5xl font-800 leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          Spotless spaces.
          <br />
          <span className="text-gradient">Reliable people.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-slate-300"
        >
          Fort Wayne&rsquo;s commercial cleaning standard for nearly half a
          century. Janitorial, carpet, and floor care delivered by crews you can
          count on — night after night.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#contact"
            className="group relative flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-teal to-aqua px-6 py-3.5 font-600 text-ink-950 shadow-xl shadow-teal/25 transition hover:shadow-teal/50"
          >
            <span className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
            Get a free quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={company.phoneHref}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-600 text-white backdrop-blur transition hover:border-teal/40 hover:bg-white/10"
          >
            <Phone className="h-4 w-4 text-teal-light" />
            {company.phone}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-10 flex items-center gap-2 text-sm text-slate-400"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-gold text-gold" />
            ))}
          </div>
          <span>Rated A+ by the Better Business Bureau</span>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/20 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-2 w-1 rounded-full bg-teal-light"
          />
        </div>
      </motion.div>
    </section>
  );
}
