// Central brand & business data for Reliable Cleaning Service, Fort Wayne, IN.
// Based on the real company: commercial janitorial in NE Indiana since 1976, A+ BBB.

export const company = {
  name: "Reliable Cleaning Service",
  shortName: "Reliable",
  tagline: "Spotless spaces. Reliable people.",
  founded: 1976,
  yearsInBusiness: new Date().getFullYear() - 1976,
  phone: "(260) 483-3478",
  phoneHref: "tel:+12604833478",
  email: "hello@reliable-clean.com",
  address: {
    street: "302 E Wallace St",
    city: "Fort Wayne",
    state: "IN",
    zip: "46803",
  },
  hours: "Mon–Fri · 9:00am – 6:00pm",
  serviceArea: "Fort Wayne & Northeast Indiana",
  bbb: "A+ BBB Accredited",
} as const;

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  details: string[];
  icon: string; // lucide icon name
};

export const services: Service[] = [
  {
    slug: "janitorial",
    title: "Commercial Janitorial",
    blurb:
      "Dependable nightly and recurring cleaning that keeps offices, clinics, and facilities pristine.",
    details: [
      "Customized nightly, weekly & contract schedules",
      "Trained, background-checked crews",
      "Restroom sanitation & touchpoint disinfection",
      "Quality inspections after every visit",
    ],
    icon: "Building2",
  },
  {
    slug: "carpet",
    title: "Carpet & Upholstery Care",
    blurb:
      "Deep extraction cleaning that lifts years of traffic and leaves fibers fresh and dry.",
    details: [
      "Hot-water extraction & spot treatment",
      "Odor neutralization",
      "Area rug & upholstery cleaning",
      "Fast-dry, low-disruption scheduling",
    ],
    icon: "Sparkles",
  },
  {
    slug: "floor-care",
    title: "Floor Refinishing & Waxing",
    blurb:
      "Strip, seal, and burnish hard floors to a mirror shine that protects your investment.",
    details: [
      "Strip & re-wax VCT and tile",
      "Concrete & terrazzo polishing",
      "Grout restoration",
      "High-gloss burnishing programs",
    ],
    icon: "Layers",
  },
  {
    slug: "supplies",
    title: "Managed Restroom & Breakroom Supplies",
    blurb:
      "Never run out again — we monitor, stock, and restock your consumables automatically.",
    details: [
      "Paper, soap & sanitizer programs",
      "Dispenser installation & service",
      "Inventory monitoring",
      "Single trusted invoice",
    ],
    icon: "PackageCheck",
  },
  {
    slug: "specialty",
    title: "Special & Deep Cleaning",
    blurb:
      "Post-construction, move-out, and seasonal deep cleans handled with white-glove care.",
    details: [
      "Post-construction cleanup",
      "Window & high-dusting",
      "Disinfection & day-porter service",
      "One-time & emergency response",
    ],
    icon: "ShieldCheck",
  },
  {
    slug: "residential",
    title: "Specialty Residential",
    blurb:
      "Area rug cleaning, mattress refresh, and the detail-obsessed care our name is built on.",
    details: [
      "Area rug & mattress cleaning",
      "Drop-off & pickup options",
      "Eco-conscious products",
      "Satisfaction guaranteed",
    ],
    icon: "Home",
  },
];

export const stats = [
  { value: company.yearsInBusiness, suffix: "+", label: "Years in business" },
  { value: 1200, suffix: "+", label: "Facilities served" },
  { value: 98, suffix: "%", label: "Client retention" },
  { value: 24, suffix: "/7", label: "Response & support" },
];

export const process = [
  {
    step: "01",
    title: "Walkthrough & Quote",
    body: "We tour your facility, learn your priorities, and build a transparent scope — no surprises.",
  },
  {
    step: "02",
    title: "Custom Cleaning Plan",
    body: "A tailored checklist and schedule matched to your traffic, compliance needs, and budget.",
  },
  {
    step: "03",
    title: "Trained Crews Deploy",
    body: "Vetted, uniformed teams arrive on schedule with the right equipment and a defined route.",
  },
  {
    step: "04",
    title: "Inspect & Improve",
    body: "Digital quality checks and open communication keep standards rising, visit after visit.",
  },
];

export const testimonials = [
  {
    quote:
      "Reliable has cleaned our three clinics for over a decade. The consistency is unreal — I never think about it, and that's the point.",
    name: "Dana Whitfield",
    role: "Facilities Director, Summit Health Group",
  },
  {
    quote:
      "We switched after years of revolving-door vendors. Same crew, same standards, every single night. Worth every penny.",
    name: "Marcus Lee",
    role: "Operations Manager, Allen County Logistics",
  },
  {
    quote:
      "Their floor refinishing made our 1990s showroom look brand new. Customers literally commented on it.",
    name: "Priya Raman",
    role: "Owner, Lakeside Auto",
  },
];

export const serviceAreas = [
  "Fort Wayne",
  "New Haven",
  "Huntertown",
  "Auburn",
  "Columbia City",
  "Leo-Cedarville",
  "Roanoke",
  "Decatur",
  "Bluffton",
  "Angola",
];
