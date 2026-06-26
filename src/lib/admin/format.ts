export const usd = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const shortDate = (iso: string) =>
  new Date(iso + (iso.length === 10 ? "T00:00:00" : "")).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

export const monthDay = (iso: string) =>
  new Date(iso + (iso.length === 10 ? "T00:00:00" : "")).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  );

export const customerStatusStyles: Record<string, string> = {
  active: "bg-teal/15 text-teal-light ring-teal/30",
  prospect: "bg-amber-400/15 text-amber-300 ring-amber-400/30",
  paused: "bg-slate-400/15 text-slate-300 ring-slate-400/30",
};

export const staffStatusStyles: Record<string, { label: string; cls: string }> =
  {
    "on-shift": { label: "On shift", cls: "bg-teal/15 text-teal-light ring-teal/30" },
    "en-route": { label: "En route", cls: "bg-aqua/15 text-aqua ring-aqua/30" },
    off: { label: "Off", cls: "bg-slate-500/15 text-slate-300 ring-slate-500/30" },
    pto: { label: "PTO", cls: "bg-violet-400/15 text-violet-300 ring-violet-400/30" },
  };

export const jobStatusStyles: Record<string, string> = {
  scheduled: "bg-slate-400/15 text-slate-300 ring-slate-400/30",
  "in-progress": "bg-aqua/15 text-aqua ring-aqua/30",
  completed: "bg-teal/15 text-teal-light ring-teal/30",
  missed: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
};

export const invoiceStatusStyles: Record<string, string> = {
  paid: "bg-teal/15 text-teal-light ring-teal/30",
  sent: "bg-aqua/15 text-aqua ring-aqua/30",
  overdue: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
  draft: "bg-slate-400/15 text-slate-300 ring-slate-400/30",
};
