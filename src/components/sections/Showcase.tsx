"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, MoveHorizontal } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { media } from "@/lib/assets";

export function Showcase() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute right-1/4 top-0 h-72 w-72 rounded-full bg-teal/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-700 uppercase tracking-[0.2em] text-teal-dark">
            See it happen
          </span>
          <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-ink sm:text-5xl">
            From <span className="text-amber-500">dust</span> to{" "}
            <span className="text-gradient">dazzling.</span>
          </h2>
          <p className="mt-5 text-lg text-ink-500">
            Drag the slider to reveal the difference, or watch a space come back
            to life in real time.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal>
            <BeforeAfter before={media.roomDusty} after={media.roomClean} />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative h-full min-h-[18rem] overflow-hidden rounded-3xl border border-ink/8 bg-mist shadow-xl">
              <Video />
              <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-600 text-ink backdrop-blur">
                <Play className="h-3.5 w-3.5 text-teal" />
                The full transformation
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Video() {
  const [failed, setFailed] = useState(false);
  if (!media.transformVideo || failed) {
    // Graceful fallback before the render completes / if unavailable
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={media.roomClean}
        alt="A spotless, freshly cleaned office"
        className="h-full w-full object-cover"
      />
    );
  }
  return (
    <video
      src={media.transformVideo}
      poster={media.roomClean}
      autoPlay
      muted
      loop
      playsInline
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );
}

function BeforeAfter({ before, after }: { before: string; after: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative h-full min-h-[18rem] select-none overflow-hidden rounded-3xl border border-ink/8 shadow-xl">
      {/* After (full) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt="After cleaning" className="h-full w-full object-cover" draggable={false} />
      {/* Before (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={before}
          alt="Before cleaning"
          className="h-full w-full object-cover"
          style={{ width: "100vw", maxWidth: "none" }}
          draggable={false}
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
          Before
        </span>
      </div>
      <span className="absolute right-3 top-3 rounded-full bg-emerald/90 px-2.5 py-1 text-[11px] font-700 uppercase tracking-wide text-white">
        After
      </span>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_0_1px_rgba(15,34,51,0.1)]"
        style={{ left: `${pos}%` }}
      >
        <motion.div
          className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-ink/10"
          whileTap={{ scale: 0.92 }}
        >
          <MoveHorizontal className="h-5 w-5 text-teal-dark" />
        </motion.div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal before and after"
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
