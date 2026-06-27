"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, Leaf, Clock3 } from "lucide-react";
import { company } from "@/lib/site";
import { media } from "@/lib/assets";
import { Reveal } from "@/components/Reveal";

const pillars = [
  { icon: Award, title: "Earned trust", body: `${company.bbb} with a reputation built over decades.` },
  { icon: Users, title: "Career crews", body: "Low turnover means the same trained faces every visit." },
  { icon: Leaf, title: "Healthier spaces", body: "Modern, eco-conscious products and methods." },
  { icon: Clock3, title: "Always on time", body: "Routes and schedules you can set your watch by." },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bottleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" className="relative bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Visual */}
          <div ref={ref} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-ink/8 bg-mist shadow-xl">
              <motion.img
                style={{ y: imgY, scale: 1.12 }}
                src={media.roomClean}
                alt="A pristine, sunlit office cleaned by Reliable"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-700 text-teal-dark backdrop-blur">
                  Est. {company.founded}
                </div>
                <p className="mt-3 font-display text-2xl font-700 text-white drop-shadow">
                  {company.yearsInBusiness} years of spotless, on time, every
                  time.
                </p>
              </div>
            </div>

            <motion.img
              style={{ y: bottleY }}
              src={media.sprayBottle}
              alt=""
              aria-hidden
              className="absolute -right-6 -top-8 hidden h-32 w-32 rounded-2xl border border-ink/8 bg-white object-cover shadow-xl sm:block"
              loading="lazy"
            />
          </div>

          {/* Copy */}
          <div>
            <Reveal>
              <span className="text-sm font-700 uppercase tracking-[0.2em] text-teal-dark">
                Our story
              </span>
              <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-ink sm:text-5xl">
                Northeast Indiana&rsquo;s name for{" "}
                <span className="text-gradient">dependable clean.</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">
                <p>
                  Since {company.founded}, {company.name} has cleaned the
                  offices, clinics, and facilities that keep {company.serviceArea}{" "}
                  running. We started with a simple idea: do excellent work, show
                  up when we say we will, and treat every space like our own.
                </p>
                <p>
                  Nearly five decades later, that idea still drives everything —
                  from our background-checked crews to the digital checklists
                  that document every visit. The result is the rarest thing in
                  this industry: a cleaning company you never have to worry
                  about.
                </p>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <div className="flex gap-3 rounded-xl border border-ink/8 bg-white p-4 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal/10 ring-1 ring-teal/20">
                      <p.icon className="h-5 w-5 text-teal-dark" />
                    </div>
                    <div>
                      <h3 className="font-700 text-ink">{p.title}</h3>
                      <p className="mt-1 text-sm text-ink-500">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
