# Reliable Cleaning Service — Brand Site + Operations Console

A premium, animation-rich marketing website **and** a working admin/operations
panel for **Reliable Cleaning Service**, the commercial janitorial company that
has served Fort Wayne & Northeast Indiana since 1976 (A+ BBB accredited).

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**,
**Framer Motion**, and **React Three Fiber**. Brand imagery, the ambient hero
video, and the interactive 3D model were generated with **Higgsfield**.

---

## ✨ What's inside

### Marketing front-end (`/`)
A cinematic, scroll-driven single page designed to make the brand feel modern,
trustworthy, and unmistakably professional:

- **Procedural 3D hero** — glass orbs + sparkles rendered in real time with
  React Three Fiber that **rotate, drift and react to scroll and pointer**.
- **Scroll-animated 3D product model** — the spray bottle (a real Higgsfield
  image-to-3D GLB) spins as you scroll.
- **Ambient brand video** — a Higgsfield image-to-video clip of a pristine
  office, autoplaying in the media showcase.
- Animated stats counters, marquee, magnetic CTAs, reveal-on-scroll sections,
  parallax imagery, a process timeline with a scroll-filled progress rail,
  a rotating testimonial carousel, an animated service-area radar, and a
  working quote-request form.

### Operations console (`/admin`)
A fully interactive **demo** of the back-office a cleaning company actually
needs (no backend required — state lives in the browser via `localStorage`):

| Screen | What it does |
| --- | --- |
| **Dashboard** | Live KPIs (active accounts, MRR, jobs today, A/R), today's schedule, crew-on-duty, revenue mix, and inbound website leads. |
| **Customers** | Searchable, filterable CRM with a detail drawer, satisfaction ratings, status management, and an "add customer" flow. |
| **Staff** | Crew roster with live status, certifications, assigned accounts, ratings, labor cost, and status controls. |
| **Schedule** | Dispatch board grouped by day — advance job status and log completed checklist tasks in real time. |
| **Invoices** | Billing overview with collected / outstanding / overdue totals and one-click "mark paid". |

> The website quote form writes leads to `localStorage`, and they appear on the
> admin **Dashboard → Website leads** — a small end-to-end loop you can demo.

---

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000  ·  admin at /admin
npm run build    # production build
```

Requires Node 18+.

---

## 🎨 Brand system

- **Palette:** deep navy (`#0d2440`) + ink (`#060d18`), teal (`#14b8a6`) and
  aqua (`#22d3ee`) accents, warm gold for ratings.
- **Type:** Sora (display) + Inter (body).
- Tokens live in `tailwind.config.ts`; business data in `src/lib/site.ts`.

## 🗂️ Structure

```
src/
  app/
    page.tsx              # marketing home (composes all sections)
    admin/                # operations console (layout + 5 screens)
  components/
    sections/             # hero, services, showcase, process, about, …
    three/                # React Three Fiber scenes (hero + 3D model)
    admin/                # sidebar, mobile nav, cards, gate
  lib/
    site.ts               # company + services + content
    assets.ts             # Higgsfield media URLs
    admin/                # demo data, types, store, formatters
```

## 🤖 Generated media

The hero image, product shot, water-droplet, the ambient **video**, and the
**3D GLB** model were produced with Higgsfield and are referenced from its CDN
in `src/lib/assets.ts`. Every usage has a CSS/gradient or image fallback so the
design holds up even if a remote asset is unavailable.

---

*Demo build. Business details are based on the real Reliable Cleaning Service,
Fort Wayne IN; customer/staff/invoice records are illustrative sample data.*
