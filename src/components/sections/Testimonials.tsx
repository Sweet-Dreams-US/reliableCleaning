"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: number) => {
    setDir(d);
    setIndex((i) => (i + d + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[140px]" />
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <span className="text-sm font-600 uppercase tracking-[0.2em] text-teal-light">
            Client voices
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-white sm:text-5xl">
            Trusted by the people who
            <br />
            <span className="text-gradient">can&rsquo;t afford a mess.</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 min-h-[20rem]">
          <Quote className="mx-auto h-12 w-12 text-teal/40" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6"
            >
              <div className="mb-5 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                ))}
              </div>
              <p className="mx-auto max-w-2xl text-balance font-display text-2xl font-600 leading-snug text-white sm:text-3xl">
                &ldquo;{active.quote}&rdquo;
              </p>
              <div className="mt-7">
                <p className="font-600 text-teal-light">{active.name}</p>
                <p className="text-sm text-slate-400">{active.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-teal/40 hover:bg-white/5"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => {
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-teal" : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-teal/40 hover:bg-white/5"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
