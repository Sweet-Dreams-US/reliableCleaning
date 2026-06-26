"use client";

import { useMemo, useState } from "react";
import { Download, CheckCircle2, Send } from "lucide-react";
import { useAdmin } from "@/lib/admin/store";
import { Gate } from "@/components/admin/Gate";
import { Badge, Card, PageHeader, StatCard } from "@/components/admin/ui";
import { usd, shortDate, invoiceStatusStyles } from "@/lib/admin/format";
import { InvoiceStatus } from "@/lib/admin/types";

const tabs: (InvoiceStatus | "all")[] = [
  "all",
  "sent",
  "overdue",
  "paid",
  "draft",
];

export default function InvoicesPage() {
  return (
    <Gate>
      <Invoices />
    </Gate>
  );
}

function Invoices() {
  const { state, setInvoiceStatus } = useAdmin();
  const [tab, setTab] = useState<(typeof tabs)[number]>("all");

  const totals = useMemo(() => {
    const paid = state.invoices
      .filter((i) => i.status === "paid")
      .reduce((s, i) => s + i.amount, 0);
    const outstanding = state.invoices
      .filter((i) => i.status === "sent" || i.status === "overdue")
      .reduce((s, i) => s + i.amount, 0);
    const overdue = state.invoices
      .filter((i) => i.status === "overdue")
      .reduce((s, i) => s + i.amount, 0);
    return { paid, outstanding, overdue };
  }, [state.invoices]);

  const cust = (id: string) =>
    state.customers.find((c) => c.id === id)?.name ?? "Unknown";

  const list =
    tab === "all"
      ? state.invoices
      : state.invoices.filter((i) => i.status === tab);

  return (
    <div>
      <PageHeader
        title="Invoices"
        subtitle="Billing overview · mark invoices as sent or paid"
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Collected (period)"
          value={usd(totals.paid)}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
        <StatCard
          label="Outstanding"
          value={usd(totals.outstanding)}
          icon={<Send className="h-5 w-5" />}
          accent="aqua"
        />
        <StatCard
          label="Overdue"
          value={usd(totals.overdue)}
          icon={<Download className="h-5 w-5" />}
          accent={totals.overdue ? "rose" : "teal"}
        />
      </div>

      <div className="mb-5 flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1 w-fit">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-lg px-3 py-1.5 text-xs font-600 capitalize transition ${
              tab === t
                ? "bg-teal/20 text-teal-light"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[1fr_2fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/8 px-5 py-3 text-xs font-600 uppercase tracking-wide text-slate-500 md:grid">
          <span>Invoice</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Due</span>
          <span>Status</span>
          <span className="text-right">Action</span>
        </div>
        <div className="divide-y divide-white/5">
          {list.map((inv) => (
            <div
              key={inv.id}
              className="grid grid-cols-2 items-center gap-4 px-5 py-4 md:grid-cols-[1fr_2fr_1fr_1fr_1fr_auto]"
            >
              <span className="font-mono text-sm font-600 text-white">
                {inv.number}
              </span>
              <span className="hidden truncate text-sm text-slate-300 md:block">
                {cust(inv.customerId)}
              </span>
              <span className="text-sm font-600 text-white">
                {usd(inv.amount)}
              </span>
              <span className="hidden text-sm text-slate-400 md:block">
                {shortDate(inv.due)}
              </span>
              <Badge className={`${invoiceStatusStyles[inv.status]} w-fit`}>
                {inv.status}
              </Badge>
              <div className="flex justify-end">
                {inv.status !== "paid" ? (
                  <button
                    onClick={() => setInvoiceStatus(inv.id, "paid")}
                    className="rounded-lg bg-teal/15 px-3 py-1.5 text-xs font-600 text-teal-light ring-1 ring-inset ring-teal/30 transition hover:bg-teal/25"
                  >
                    Mark paid
                  </button>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-teal-light">
                    <CheckCircle2 className="h-4 w-4" /> Paid
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
