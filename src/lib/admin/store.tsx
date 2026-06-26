"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { AdminState, Customer, Job, Staff, Invoice, Lead } from "./types";
import { buildSeed } from "./data";

const STORAGE_KEY = "rc_admin_state_v1";

type Ctx = {
  state: AdminState;
  ready: boolean;
  leads: Lead[];
  setCustomerStatus: (id: string, status: Customer["status"]) => void;
  addCustomer: (c: Omit<Customer, "id">) => void;
  setStaffStatus: (id: string, status: Staff["status"]) => void;
  cycleJobStatus: (id: string) => void;
  advanceChecklist: (id: string) => void;
  setInvoiceStatus: (id: string, status: Invoice["status"]) => void;
  reset: () => void;
};

const AdminContext = createContext<Ctx | null>(null);

const jobOrder: Job["status"][] = [
  "scheduled",
  "in-progress",
  "completed",
  "missed",
];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AdminState>(() => buildSeed());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved));
      const rawLeads = localStorage.getItem("rc_leads");
      if (rawLeads) setLeads(JSON.parse(rawLeads));
    } catch {}
    setReady(true);
  }, []);

  // Persist on change (after hydration)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const value = useMemo<Ctx>(
    () => ({
      state,
      ready,
      leads,
      setCustomerStatus: (id, status) =>
        setState((s) => ({
          ...s,
          customers: s.customers.map((c) =>
            c.id === id ? { ...c, status } : c
          ),
        })),
      addCustomer: (c) =>
        setState((s) => ({
          ...s,
          customers: [
            { ...c, id: `c${Date.now()}` },
            ...s.customers,
          ],
        })),
      setStaffStatus: (id, status) =>
        setState((s) => ({
          ...s,
          staff: s.staff.map((m) => (m.id === id ? { ...m, status } : m)),
        })),
      cycleJobStatus: (id) =>
        setState((s) => ({
          ...s,
          jobs: s.jobs.map((j) => {
            if (j.id !== id) return j;
            const next =
              jobOrder[(jobOrder.indexOf(j.status) + 1) % jobOrder.length];
            return {
              ...j,
              status: next,
              checklistDone:
                next === "completed" ? j.checklistTotal : j.checklistDone,
            };
          }),
        })),
      advanceChecklist: (id) =>
        setState((s) => ({
          ...s,
          jobs: s.jobs.map((j) => {
            if (j.id !== id) return j;
            const done = Math.min(j.checklistTotal, j.checklistDone + 1);
            return {
              ...j,
              checklistDone: done,
              status:
                done === j.checklistTotal
                  ? "completed"
                  : j.status === "scheduled"
                    ? "in-progress"
                    : j.status,
            };
          }),
        })),
      setInvoiceStatus: (id, status) =>
        setState((s) => ({
          ...s,
          invoices: s.invoices.map((inv) =>
            inv.id === id ? { ...inv, status } : inv
          ),
        })),
      reset: () => {
        const fresh = buildSeed();
        setState(fresh);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        } catch {}
      },
    }),
    [state, ready, leads]
  );

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}

// Convenience selectors
export function useCustomerName(state: AdminState) {
  return (id: string) =>
    state.customers.find((c) => c.id === id)?.name ?? "Unknown";
}
