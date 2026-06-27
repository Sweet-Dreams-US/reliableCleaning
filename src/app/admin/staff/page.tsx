"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Phone, Star, Award, Briefcase } from "lucide-react";
import { useAdmin } from "@/lib/admin/store";
import { Gate } from "@/components/admin/Gate";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { staffStatusStyles, shortDate, usd } from "@/lib/admin/format";
import { StaffStatus } from "@/lib/admin/types";

const statuses: StaffStatus[] = ["on-shift", "en-route", "off", "pto"];

export default function StaffPage() {
  return (
    <Gate>
      <StaffBoard />
    </Gate>
  );
}

function StaffBoard() {
  const { state, setStaffStatus } = useAdmin();
  const [filter, setFilter] = useState<StaffStatus | "all">("all");

  const summary = useMemo(() => {
    const onDuty = state.staff.filter(
      (s) => s.status === "on-shift" || s.status === "en-route"
    ).length;
    const avgRating =
      state.staff.reduce((a, s) => a + s.rating, 0) / state.staff.length;
    const weeklyLabor = state.staff.reduce(
      (a, s) => a + s.hourlyRate * 40,
      0
    );
    return { onDuty, avgRating, weeklyLabor };
  }, [state.staff]);

  const cust = (id: string) =>
    state.customers.find((c) => c.id === id)?.name ?? "—";

  const list =
    filter === "all"
      ? state.staff
      : state.staff.filter((s) => s.status === filter);

  return (
    <div>
      <PageHeader
        title="Staff"
        subtitle={`${state.staff.length} team members · ${summary.onDuty} on duty now`}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">On duty</p>
          <p className="mt-1 font-display text-2xl font-800 text-white">
            {summary.onDuty}/{state.staff.length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Avg. crew rating
          </p>
          <p className="mt-1 font-display text-2xl font-800 text-white">
            {summary.avgRating.toFixed(1)}
            <span className="text-gold"> ★</span>
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Est. weekly labor
          </p>
          <p className="mt-1 font-display text-2xl font-800 text-white">
            {usd(summary.weeklyLabor)}
          </p>
        </Card>
      </div>

      <div className="mb-5 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 w-fit">
        {(["all", ...statuses] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-600 capitalize transition ${
              filter === f
                ? "bg-teal/20 text-teal-light"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {f === "all" ? "All" : staffStatusStyles[f].label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (i % 6) * 0.05 }}
          >
            <Card className="h-full p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal/30 to-deep/40 font-700 text-teal-light ring-1 ring-teal/30">
                  {m.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-600 text-white">{m.name}</p>
                  <p className="text-xs text-slate-400">{m.role}</p>
                </div>
                <Badge className={staffStatusStyles[m.status].cls}>
                  {staffStatusStyles[m.status].label}
                </Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="h-4 w-4 text-teal-light" />
                  <span className="truncate">{m.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Star className="h-4 w-4 text-gold" />
                  {m.rating.toFixed(1)} rating
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Briefcase className="h-4 w-4 text-teal-light" />
                  {usd(m.hourlyRate)}/hr
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Award className="h-4 w-4 text-teal-light" />
                  Since {shortDate(m.hireDate).split(",")[1]?.trim()}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-600 uppercase tracking-wide text-slate-500">
                  Certifications
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {m.certifications.map((c) => (
                    <span
                      key={c}
                      className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-slate-300 ring-1 ring-white/10"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-[11px] font-600 uppercase tracking-wide text-slate-500">
                  Assigned accounts
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {m.assignedCustomerIds.map(cust).join(" · ")}
                </p>
              </div>

              <div className="mt-4 border-t border-white/8 pt-3">
                <p className="mb-2 text-[11px] font-600 uppercase tracking-wide text-slate-500">
                  Set status
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((st) => (
                    <button
                      key={st}
                      onClick={() => setStaffStatus(m.id, st)}
                      className={`rounded-lg px-2.5 py-1 text-[11px] font-600 ring-1 ring-inset transition ${
                        m.status === st
                          ? staffStatusStyles[st].cls
                          : "text-slate-400 ring-white/10 hover:text-white"
                      }`}
                    >
                      {staffStatusStyles[st].label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
