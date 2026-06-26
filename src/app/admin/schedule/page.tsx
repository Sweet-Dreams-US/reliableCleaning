"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Clock, Users2, CheckCircle2, Plus } from "lucide-react";
import { useAdmin } from "@/lib/admin/store";
import { Gate } from "@/components/admin/Gate";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { jobStatusStyles } from "@/lib/admin/format";
import { Job } from "@/lib/admin/types";

export default function SchedulePage() {
  return (
    <Gate>
      <Schedule />
    </Gate>
  );
}

function dayLabel(date: string) {
  const today = new Date().toISOString().slice(0, 10);
  const tmr = new Date();
  tmr.setDate(tmr.getDate() + 1);
  const tomorrow = tmr.toISOString().slice(0, 10);
  if (date === today) return "Today";
  if (date === tomorrow) return "Tomorrow";
  return new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

function Schedule() {
  const { state, cycleJobStatus, advanceChecklist } = useAdmin();

  const groups = useMemo(() => {
    const map = new Map<string, Job[]>();
    [...state.jobs]
      .sort((a, b) => (a.date + a.start).localeCompare(b.date + b.start))
      .forEach((j) => {
        const arr = map.get(j.date) ?? [];
        arr.push(j);
        map.set(j.date, arr);
      });
    return [...map.entries()];
  }, [state.jobs]);

  const cust = (id: string) =>
    state.customers.find((c) => c.id === id)?.name ?? "Unknown";
  const staffName = (id: string) =>
    state.staff.find((m) => m.id === id)?.name ?? "—";

  return (
    <div>
      <PageHeader
        title="Schedule"
        subtitle="Dispatch board · click a status to advance it, or log a completed task"
        action={
          <button className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-600 text-white transition hover:border-teal/40">
            <Plus className="h-4 w-4 text-teal-light" /> New job
          </button>
        }
      />

      <div className="space-y-8">
        {groups.map(([date, jobs]) => (
          <div key={date}>
            <div className="mb-3 flex items-center gap-3">
              <h2 className="font-display text-lg font-700 text-white">
                {dayLabel(date)}
              </h2>
              <span className="h-px flex-1 bg-white/8" />
              <span className="text-xs text-slate-500">{jobs.length} jobs</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {jobs.map((j, i) => {
                const pct = Math.round(
                  (j.checklistDone / j.checklistTotal) * 100
                );
                return (
                  <motion.div
                    key={j.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (i % 4) * 0.05 }}
                  >
                    <Card className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-600 text-white">{cust(j.customerId)}</p>
                          <p className="text-xs text-slate-400">{j.service}</p>
                        </div>
                        <button
                          onClick={() => cycleJobStatus(j.id)}
                          title="Advance status"
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-600 capitalize ring-1 ring-inset transition hover:brightness-125 ${jobStatusStyles[j.status]}`}
                        >
                          {j.status.replace("-", " ")}
                        </button>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-teal-light" />
                          {j.start}–{j.end}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users2 className="h-4 w-4 text-teal-light" />
                          {j.crewIds.map(staffName).join(", ")}
                        </span>
                      </div>

                      <div className="mt-4">
                        <div className="mb-1.5 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Checklist</span>
                          <span className="font-600 text-white">
                            {j.checklistDone}/{j.checklistTotal} ({pct}%)
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-teal to-aqua"
                            animate={{ width: `${pct}%` }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => advanceChecklist(j.id)}
                        disabled={j.checklistDone >= j.checklistTotal}
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] py-2 text-xs font-600 text-slate-200 transition hover:border-teal/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <CheckCircle2 className="h-4 w-4 text-teal-light" />
                        {j.checklistDone >= j.checklistTotal
                          ? "All tasks complete"
                          : "Log completed task"}
                      </button>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
