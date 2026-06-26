import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reliable Cleaning Service · Fort Wayne, IN — Commercial Janitorial Since 1976",
  description:
    "Fort Wayne's most trusted commercial cleaning company since 1976. Janitorial, carpet care, floor refinishing, and managed supplies — backed by an A+ BBB rating and a spotless reputation.",
  keywords: [
    "commercial cleaning Fort Wayne",
    "janitorial service Fort Wayne Indiana",
    "office cleaning",
    "carpet cleaning",
    "floor waxing",
    "Reliable Cleaning Service",
  ],
  openGraph: {
    title: "Reliable Cleaning Service · Fort Wayne, IN",
    description:
      "Spotless spaces, reliable people. Commercial janitorial excellence in Northeast Indiana since 1976.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
