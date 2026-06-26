"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Play, Box, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SafeBoundary } from "@/components/three/SafeBoundary";
import { useScrollRef } from "@/lib/useScrollRef";
import { media } from "@/lib/assets";

const BottleShowcase = dynamic(
  () => import("@/components/three/BottleShowcase"),
  { ssr: false }
);

export function Showcase() {
  const scroll = useScrollRef();
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute right-1/4 top-0 h-80 w-80 rounded-full bg-aqua/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-600 uppercase tracking-[0.2em] text-teal-light">
            See it in motion
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-white sm:text-5xl">
            Detail you can{" "}
            <span className="text-gradient">practically feel.</span>
          </h2>
          <p className="mt-5 text-lg text-slate-400">
            Spin the bottle. Watch the room breathe. Every Reliable visit is
            built on the same obsessive attention to detail.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          {/* Ambient video */}
          <Reveal>
            <div className="group relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-deep to-ink-950 shadow-2xl">
              {!videoFailed ? (
                <video
                  src={media.heroVideo}
                  poster={media.heroOffice}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setVideoFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.heroOffice}
                  alt="Pristine office interior"
                  className="h-full w-full object-cover"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 to-transparent" />
              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs font-600 text-white backdrop-blur">
                <Play className="h-3.5 w-3.5 text-teal-light" />
                Spaces we&rsquo;ve transformed
              </div>
            </div>
          </Reveal>

          {/* 3D model */}
          <Reveal delay={0.1}>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(ellipse_at_center,_#0d2440_0%,_#060d18_70%)] shadow-2xl">
              <div className="absolute inset-0 bg-grid-faint bg-[size:40px_40px] opacity-30" />
              <SafeBoundary
                fallback={
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-slate-400">
                    <Box className="h-10 w-10 text-teal-light" />
                    <p className="text-sm">Interactive 3D model</p>
                  </div>
                }
              >
                <BottleShowcase scroll={scroll} />
              </SafeBoundary>
              <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/30 px-3 py-1.5 text-xs font-600 text-white backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-teal-light" />
                Real-time 3D · rotates as you scroll
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
