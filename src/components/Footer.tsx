import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin, Clock, ShieldCheck } from "lucide-react";
import { company, services } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-ink-950">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[60rem] -translate-x-1/2 rounded-full bg-teal/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal to-deep">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-lg font-700 text-white">
                {company.name}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {company.tagline} Commercial janitorial excellence across{" "}
              {company.serviceArea} since {company.founded}.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5 text-xs font-500 text-teal-light">
              <ShieldCheck className="h-4 w-4" />
              {company.bbb}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-600 uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="mt-4 space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <a
                    href="#services"
                    className="text-sm text-slate-400 transition hover:text-teal-light"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-600 uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3.5 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-teal-light" />
                <a href={company.phoneHref} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-teal-light" />
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-teal-light" />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.city}, {company.address.state}{" "}
                  {company.address.zip}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 text-teal-light" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-600 uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#about" className="transition hover:text-teal-light">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#process" className="transition hover:text-teal-light">
                  How We Work
                </a>
              </li>
              <li>
                <a href="#areas" className="transition hover:text-teal-light">
                  Service Area
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="transition hover:text-teal-light"
                >
                  Client &amp; Staff Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Proudly serving {company.serviceArea} · {company.yearsInBusiness}{" "}
            years strong
          </p>
        </div>
      </div>
    </footer>
  );
}
