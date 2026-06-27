"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowRight, Phone, ShieldCheck, MousePointer2 } from "lucide-react";
import { company } from "@/lib/site";
import { media } from "@/lib/assets";

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scroll position -> target playback time of the video.
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const v = videoRef.current;
    if (v && v.duration) targetTime.current = p * (v.duration - 0.05);
  });

  // Prime the video so frames decode on seek, then drive currentTime in a rAF
  // loop, easing toward the scroll target so the scrub is buttery (never jumps).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    const prime = () => {
      v.play()
        .then(() => v.pause())
        .catch(() => {});
    };
    if (v.readyState >= 1) prime();
    else v.addEventListener("loadedmetadata", prime, { once: true });

    let raf = 0;
    const tick = () => {
      if (v.duration) {
        const cur = v.currentTime;
        const diff = targetTime.current - cur;
        if (Math.abs(diff) > 0.003) {
          v.currentTime = cur + diff * 0.18;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const introOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.2], [0, -40]);
  const outroOpacity = useTransform(scrollYProgress, [0.78, 0.9, 1], [0, 1, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="relative h-[420vh] bg-ink">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Scroll-scrubbed cinematic video */}
        <video
          ref={videoRef}
          src={media.transformVideo}
          poster={media.roomDusty}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cinematic legibility gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/45" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />

        {/* Intro copy */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-center px-6"
        >
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-600 text-white backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-teal-light" />
            {company.bbb} · Trusted since {company.founded}
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-800 leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl">
            Watch the mess
            <br />
            <span className="text-gradient">disappear.</span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-white/80">
            Fort Wayne&rsquo;s commercial cleaning standard since {company.founded}.
            Scroll, and watch a real space come back to life.
          </p>
        </motion.div>

        {/* Outro copy + CTAs */}
        <motion.div
          style={{ opacity: outroOpacity }}
          className="absolute inset-0 z-10 mx-auto flex max-w-7xl flex-col justify-center px-6"
        >
          <h2 className="max-w-3xl font-display text-4xl font-800 leading-tight tracking-tight text-white sm:text-6xl">
            Spotless. <span className="text-gradient">Every time.</span>
          </h2>
          <p className="mt-4 max-w-lg text-lg text-white/80">
            That&rsquo;s not a stock clip — it&rsquo;s the standard. Let&rsquo;s do
            it for your space.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-sky px-6 py-3.5 font-600 text-white shadow-lg shadow-teal/30 transition hover:shadow-teal/50"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={company.phoneHref}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-600 text-white backdrop-blur transition hover:bg-white/20"
            >
              <Phone className="h-4 w-4 text-teal-light" />
              {company.phone}
            </a>
          </div>
        </motion.div>

        {/* Scrub progress bar */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-1 bg-white/15">
          <motion.div
            style={{ width: barWidth }}
            className="h-full bg-gradient-to-r from-sky via-teal to-emerald"
          />
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: cueOpacity }}
          className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="flex items-center gap-1.5 text-xs font-600 uppercase tracking-[0.18em]">
              <MousePointer2 className="h-3.5 w-3.5 text-teal-light" />
              Scroll to clean
            </span>
            <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/30 p-1.5">
              <motion.span
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="h-2 w-1 rounded-full bg-teal-light"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
