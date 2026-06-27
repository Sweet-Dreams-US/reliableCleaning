"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  Users,
  DollarSign,
  CalendarCheck,
  AlertCircle,
  ArrowRight,
  Inbox,
  Clock,
} from "lucide-react";
import { useAdmin } from "@/lib/admin/store";
import { Gate } from "@/components/admin/Gate";
import { Badge, Card, PageHeader, StatCard } from "@/components/admin/ui";
import {
  usd,
  jobStatusStyles,
  staffStatusStyles,
  monthDay,
} from "@/lib/admin/format";

export default function DashboardPage() {
  return (
    <Gate>
      <Dashboard />
    </Gate>
  );
}

function Dashboard() {
  const { state, leads, cycleJobStatus } = useAdmin();
  const { customers, staff, jobs, invoices } = state;
  const today = new Date().toISOString().slice(0, 10);

  const metrics = useMemo(() => {
    const active = customers.filter((c) => c.status === "active");
    const mrr = active.reduce((s, c) => s + c.monthlyValue, 0);
    const todays = jobs.filter((j) => j.date === today);
    const outstanding = invoices
      .filter((i) => i.status === "sent" || i.status === "overdue")
      .reduce((s, i) => s + i.amount, 0);
    const overdue = invoices.filter((i) => i.status === "overdue").length;
    return { active, mrr, todays, outstanding, overdue };
  }, [customers, jobs, invoices, today]);

  // Revenue contribution by customer type (for the bar chart)
  const byType = useMemo(() => {
    const map = new Map<string, number>();
    customers
      .filter((c) => c.status === "active")
      .forEach((c) => map.set(c.type, (map.get(c.type) ?? 0) + c.monthlyValue));
    const entries = [...map.entries()].sort((a, b) => b[1] - a[1]);
    const max = Math.max(1, ...entries.map((e) => e[1]));
    return { entries, max };
  }, [customers]);

  const cust = (id: string) =>
    customers.find((c) => c.id === id)?.name ?? "Unknown";
  const staffName = (id: string) =>
    staff.find((m) => m.id === id)?.name ?? "—";

  const onShift = staff.filter(
    (s) => s.status === "on-shift" || s.status === "en-route"
  );

  return (
    <div>
      <PageHeader
        title="Good evening, Cole"
        subtitle={`Here's how Reliable is running today · ${new Date().toLocaleDateString(
          "en-US",
          { weekday: "long", month: "long", day: "numeric" }
        )}`}
        action={
          <Badge className="bg-teal/15 text-teal-light ring-teal/30">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
            Live demo
          </Badge>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active accounts"
          value={String(metrics.active.length)}
          delta={`${customers.filter((c) => c.status === "prospect").length} prospects in pipeline`}
          icon={<Users className="h-5 w-5" />}
        />
        <StatCard
          label="Monthly recurring"
          value={usd(metrics.mrr)}
          delta="Across all active contracts"
          icon={<DollarSign className="h-5 w-5" />}
          accent="aqua"
        />
        <StatCard
          label="Jobs today"
          value={String(metrics.todays.length)}
          delta={`${metrics.todays.filter((j) => j.status === "completed").length} completed`}
          icon={<CalendarCheck className="h-5 w-5" />}
        />
        <StatCard
          label="Outstanding A/R"
          value={usd(metrics.outstanding)}
          delta={`${metrics.overdue} invoice${metrics.overdue === 1 ? "" : "s"} overdue`}
          icon={<AlertCircle className="h-5 w-5" />}
          accent={metrics.overdue ? "rose" : "teal"}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Today's schedule */}
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-700 text-white">
              Today&rsquo;s schedule
            </h2>
            <Link
              href="/admin/schedule"
              className="flex items-center gap-1 text-xs font-600 text-teal-light hover:text-white"
            >
              Full board <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="mt-4 divide-y divide-white/5">
            {metrics.todays.length === 0 && (
              <p className="py-6 text-sm text-slate-400">
                No jobs scheduled for today.
              </p>
            )}
            {metrics.todays.map((j) => (
              <div
                key={j.id}
                className="flex items-center gap-4 py-3.5 first:pt-0"
              >
                <div className="w-16 shrink-0 text-sm font-600 text-slate-300">
                  {j.start}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-600 text-white">{cust(j.customerId)}</p>
                  <p className="truncate text-xs text-slate-400">
                    {j.service} · {j.crewIds.map(staffName).join(", ")}
                  </p>
                </div>
                <div className="hidden w-28 sm:block">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal to-aqua transition-all"
                      style={{
                        width: `${(j.checklistDone / j.checklistTotal) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {j.checklistDone}/{j.checklistTotal} tasks
                  </p>
                </div>
                <button
                  onClick={() => cycleJobStatus(j.id)}
                  title="Click to advance status"
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-600 capitalize ring-1 ring-inset transition hover:brightness-125 ${jobStatusStyles[j.status]}`}
                >
                  {j.status.replace("-", " ")}
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Right column: crew + revenue mix */}
        <div className="space-y-6">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-700 text-white">
                Crew on duty
              </h2>
              <span className="text-xs text-slate-400">
                {onShift.length}/{staff.length}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {onShift.map((m) => (
                <div key={m.id} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal/30 to-deep/40 text-sm font-700 text-teal-light ring-1 ring-teal/30">
                    {m.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-600 text-white">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-400">{m.role}</p>
                  </div>
                  <Badge className={staffStatusStyles[m.status].cls}>
                    {staffStatusStyles[m.status].label}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-display text-lg font-700 text-white">
              Revenue mix
            </h2>
            <p className="text-xs text-slate-400">
              Monthly recurring by segment
            </p>
            <div className="mt-4 space-y-3">
              {byType.entries.map(([type, val]) => (
                <div key={type}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="text-slate-300">{type}</span>
                    <span className="font-600 text-white">{usd(val)}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal to-aqua"
                      style={{ width: `${(val / byType.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Inbound leads from the website */}
      <Card className="mt-6 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-teal-light" />
            <h2 className="font-display text-lg font-700 text-white">
              Website leads
            </h2>
          </div>
          <Badge className="bg-aqua/15 text-aqua ring-aqua/30">
            {leads.length} new
          </Badge>
        </div>
        {leads.length === 0 ? (
          <p className="mt-4 text-sm text-slate-400">
            New quote requests from the marketing site land here in real time.
            Submit the contact form on the{" "}
            <Link href="/" className="text-teal-light hover:underline">
              home page
            </Link>{" "}
            to see one appear.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-white/5">
            {leads.slice(0, 5).map((l, i) => (
              <div key={i} className="flex items-center gap-4 py-3 first:pt-0">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-600 text-white">
                    {l.name}
                    {l.company ? ` · ${l.company}` : ""}
                  </p>
                  <p className="truncate text-xs text-slate-400">
                    {l.service} — {l.email}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  {monthDay(l.at.slice(0, 10))}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
