"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Phone, Mail, MapPin, Plus, Building2 } from "lucide-react";
import { useAdmin } from "@/lib/admin/store";
import { Gate } from "@/components/admin/Gate";
import { Badge, Card, PageHeader, Stars } from "@/components/admin/ui";
import { usd, shortDate, customerStatusStyles } from "@/lib/admin/format";
import { Customer, CustomerStatus } from "@/lib/admin/types";

const filters: (CustomerStatus | "all")[] = [
  "all",
  "active",
  "prospect",
  "paused",
];

export default function CustomersPage() {
  return (
    <Gate>
      <Customers />
    </Gate>
  );
}

function Customers() {
  const { state, setCustomerStatus, addCustomer } = useAdmin();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const [selected, setSelected] = useState<Customer | null>(null);
  const [adding, setAdding] = useState(false);

  const list = useMemo(() => {
    return state.customers.filter((c) => {
      const matchesFilter = filter === "all" || c.status === filter;
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.contact.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [state.customers, filter, query]);

  // keep the selected drawer in sync with latest state
  const live = selected
    ? state.customers.find((c) => c.id === selected.id) ?? null
    : null;

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle={`${state.customers.length} accounts · ${state.customers.filter((c) => c.status === "active").length} active`}
        action={
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal to-aqua px-4 py-2.5 text-sm font-600 text-ink-950 shadow-lg shadow-teal/20 transition hover:shadow-teal/40"
          >
            <Plus className="h-4 w-4" /> Add customer
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 pl-9 pr-3 text-sm text-white outline-none transition focus:border-teal/50"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-lg px-3 py-1.5 text-xs font-600 capitalize transition ${
                filter === f
                  ? "bg-teal/20 text-teal-light"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="hidden grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 border-b border-white/8 px-5 py-3 text-xs font-600 uppercase tracking-wide text-slate-500 lg:grid">
          <span>Account</span>
          <span>Type</span>
          <span>Frequency</span>
          <span>Monthly</span>
          <span>Status</span>
        </div>
        <div className="divide-y divide-white/5">
          {list.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="grid w-full grid-cols-2 items-center gap-4 px-5 py-4 text-left transition hover:bg-white/[0.03] lg:grid-cols-[2fr_1fr_1fr_1fr_auto]"
            >
              <div className="col-span-2 lg:col-span-1">
                <p className="font-600 text-white">{c.name}</p>
                <p className="text-xs text-slate-400">{c.contact}</p>
              </div>
              <span className="hidden text-sm text-slate-300 lg:block">
                {c.type}
              </span>
              <span className="hidden text-sm text-slate-300 lg:block">
                {c.frequency}
              </span>
              <span className="hidden text-sm font-600 text-white lg:block">
                {c.monthlyValue ? usd(c.monthlyValue) : "—"}
              </span>
              <Badge className={`${customerStatusStyles[c.status]} justify-self-start lg:justify-self-auto`}>
                {c.status}
              </Badge>
            </button>
          ))}
          {list.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-slate-400">
              No customers match your search.
            </p>
          )}
        </div>
      </Card>

      {/* Detail drawer */}
      <AnimatePresence>
        {live && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 32 }}
              className="fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-ink-950 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal/30 to-deep/40 ring-1 ring-teal/30">
                    <Building2 className="h-6 w-6 text-teal-light" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-700 text-white">
                      {live.name}
                    </h3>
                    <Badge className={customerStatusStyles[live.status]}>
                      {live.status}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Info label="Type" value={live.type} />
                <Info label="Frequency" value={live.frequency} />
                <Info
                  label="Monthly value"
                  value={live.monthlyValue ? usd(live.monthlyValue) : "—"}
                />
                <Info label="Customer since" value={shortDate(live.since)} />
              </div>

              <div className="mt-5 space-y-3 rounded-xl border border-white/8 bg-white/[0.03] p-4 text-sm">
                <p className="flex items-center gap-3 text-slate-300">
                  <Phone className="h-4 w-4 text-teal-light" /> {live.phone}
                </p>
                <p className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-teal-light" /> {live.email}
                </p>
                <p className="flex items-start gap-3 text-slate-300">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal-light" />{" "}
                  {live.address}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-xs font-600 uppercase tracking-wide text-slate-500">
                  Satisfaction
                </p>
                <p className="mt-1 text-lg">
                  <Stars n={live.rating} />
                </p>
              </div>

              {live.notes && (
                <div className="mt-5">
                  <p className="text-xs font-600 uppercase tracking-wide text-slate-500">
                    Notes
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
                    {live.notes}
                  </p>
                </div>
              )}

              <div className="mt-7">
                <p className="mb-2 text-xs font-600 uppercase tracking-wide text-slate-500">
                  Update status
                </p>
                <div className="flex gap-2">
                  {(["active", "prospect", "paused"] as CustomerStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => setCustomerStatus(live.id, st)}
                        className={`flex-1 rounded-lg px-3 py-2 text-xs font-600 capitalize ring-1 ring-inset transition ${
                          live.status === st
                            ? customerStatusStyles[st]
                            : "text-slate-400 ring-white/10 hover:text-white"
                        }`}
                      >
                        {st}
                      </button>
                    )
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Add customer modal */}
      <AnimatePresence>
        {adding && (
          <AddCustomer
            onClose={() => setAdding(false)}
            onAdd={(c) => {
              addCustomer(c);
              setAdding(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3">
      <p className="text-[11px] font-500 uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-0.5 font-600 text-white">{value}</p>
    </div>
  );
}

function AddCustomer({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (c: Omit<Customer, "id">) => void;
}) {
  const [f, setF] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    type: "Commercial" as Customer["type"],
    address: "",
    frequency: "Weekly" as Customer["frequency"],
    monthlyValue: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...f,
      monthlyValue: Number(f.monthlyValue) || 0,
      status: "prospect",
      since: new Date().toISOString().slice(0, 10),
      rating: 0,
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-ink-950/70 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-ink-950 p-6"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-700 text-white">
            New customer
          </h3>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={submit} className="mt-5 grid gap-3 sm:grid-cols-2">
          <FormInput label="Account name" required value={f.name} onChange={(v) => setF({ ...f, name: v })} />
          <FormInput label="Contact" value={f.contact} onChange={(v) => setF({ ...f, contact: v })} />
          <FormInput label="Email" type="email" value={f.email} onChange={(v) => setF({ ...f, email: v })} />
          <FormInput label="Phone" value={f.phone} onChange={(v) => setF({ ...f, phone: v })} />
          <label className="block">
            <span className="mb-1 block text-xs font-500 uppercase tracking-wide text-slate-400">
              Type
            </span>
            <select
              value={f.type}
              onChange={(e) => setF({ ...f, type: e.target.value as Customer["type"] })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-teal/50"
            >
              {["Commercial", "Medical", "Industrial", "Residential"].map((t) => (
                <option key={t} className="bg-ink-950">{t}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-500 uppercase tracking-wide text-slate-400">
              Frequency
            </span>
            <select
              value={f.frequency}
              onChange={(e) => setF({ ...f, frequency: e.target.value as Customer["frequency"] })}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none focus:border-teal/50"
            >
              {["Daily", "Weekly", "Bi-weekly", "Monthly", "One-time"].map((t) => (
                <option key={t} className="bg-ink-950">{t}</option>
              ))}
            </select>
          </label>
          <div className="sm:col-span-2">
            <FormInput label="Address" value={f.address} onChange={(v) => setF({ ...f, address: v })} />
          </div>
          <FormInput label="Monthly value ($)" type="number" value={f.monthlyValue} onChange={(v) => setF({ ...f, monthlyValue: v })} />
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-teal to-aqua px-4 py-2.5 text-sm font-600 text-ink-950 transition hover:brightness-110"
            >
              Create account
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-500 uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 text-sm text-white outline-none transition focus:border-teal/50"
      />
    </label>
  );
}
