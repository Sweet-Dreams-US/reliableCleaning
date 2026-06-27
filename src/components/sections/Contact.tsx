"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Send, Phone, Mail, CalendarClock } from "lucide-react";
import { company, services } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: services[0].title,
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const leads = JSON.parse(localStorage.getItem("rc_leads") || "[]");
      leads.unshift({ ...form, at: new Date().toISOString() });
      localStorage.setItem("rc_leads", JSON.stringify(leads));
    } catch {}
    setSent(true);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-sand py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-20 bottom-0 h-96 w-96 rounded-full bg-teal/10 blur-[130px]" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="text-sm font-700 uppercase tracking-[0.2em] text-teal-dark">
                Get started
              </span>
              <h2 className="mt-4 font-display text-4xl font-800 tracking-tight text-ink sm:text-5xl">
                Let&rsquo;s build your
                <br />
                <span className="text-gradient">spotless space.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg text-ink-500">
                Tell us about your facility and we&rsquo;ll prepare a free,
                no-pressure walkthrough and quote — usually within one business
                day.
              </p>
            </Reveal>

            <div className="mt-9 space-y-4">
              {[
                { icon: Phone, label: "Call us", value: company.phone, href: company.phoneHref },
                { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
                { icon: CalendarClock, label: "Hours", value: company.hours },
              ].map((c) => (
                <div
                  key={c.label}
                  className="flex items-center gap-4 rounded-xl border border-ink/8 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 ring-1 ring-teal/20">
                    <c.icon className="h-5 w-5 text-teal-dark" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-ink/40">
                      {c.label}
                    </p>
                    {c.href ? (
                      <a href={c.href} className="font-700 text-ink hover:text-teal-dark">
                        {c.value}
                      </a>
                    ) : (
                      <p className="font-700 text-ink">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form card */}
          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-ink/8 bg-white p-7 shadow-xl sm:p-9">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 14 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-teal to-sky"
                    >
                      <Check className="h-10 w-10 text-white" />
                    </motion.div>
                    <h3 className="mt-6 font-display text-2xl font-700 text-ink">
                      Request received!
                    </h3>
                    <p className="mt-3 max-w-sm text-ink-500">
                      Thanks, {form.name || "there"}. A Reliable team member will
                      reach out within one business day to schedule your free
                      walkthrough.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({
                          name: "",
                          company: "",
                          email: "",
                          phone: "",
                          service: services[0].title,
                          message: "",
                        });
                      }}
                      className="mt-7 text-sm font-700 text-teal-dark hover:text-ink"
                    >
                      Submit another request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Full name" required>
                        <input required value={form.name} onChange={update("name")} className="rc-input" placeholder="Jordan Smith" />
                      </Field>
                      <Field label="Company">
                        <input value={form.company} onChange={update("company")} className="rc-input" placeholder="Acme Clinic" />
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Email" required>
                        <input required type="email" value={form.email} onChange={update("email")} className="rc-input" placeholder="you@company.com" />
                      </Field>
                      <Field label="Phone">
                        <input value={form.phone} onChange={update("phone")} className="rc-input" placeholder="(260) 000-0000" />
                      </Field>
                    </div>
                    <Field label="Service needed">
                      <select value={form.service} onChange={update("service")} className="rc-input">
                        {services.map((s) => (
                          <option key={s.slug}>{s.title}</option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Tell us about your space">
                      <textarea value={form.message} onChange={update("message")} rows={3} className="rc-input resize-none" placeholder="Square footage, frequency, special needs…" />
                    </Field>
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal to-sky px-6 py-3.5 font-600 text-white shadow-lg shadow-teal/25 transition hover:shadow-teal/40"
                    >
                      Request free quote
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        .rc-input {
          width: 100%;
          border-radius: 0.7rem;
          border: 1px solid rgba(15, 34, 51, 0.12);
          background: #fbfdfd;
          padding: 0.7rem 0.9rem;
          font-size: 0.95rem;
          color: #0f2233;
          outline: none;
          transition: all 0.2s;
        }
        .rc-input::placeholder {
          color: rgba(15, 34, 51, 0.4);
        }
        .rc-input:focus {
          border-color: rgba(20, 184, 166, 0.6);
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.12);
        }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-600 uppercase tracking-wide text-ink/50">
        {label} {required && <span className="text-teal-dark">*</span>}
      </span>
      {children}
    </label>
  );
}
