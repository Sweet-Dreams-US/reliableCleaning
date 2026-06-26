import type { Metadata } from "next";
import { AdminProvider } from "@/lib/admin/store";
import { Sidebar } from "@/components/admin/Sidebar";
import { MobileNav } from "@/components/admin/MobileNav";

export const metadata: Metadata = {
  title: "Operations Console · Reliable Cleaning Service",
  description: "Staff, customers, scheduling, and billing for Reliable Cleaning.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="flex min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#0d2440_0%,_#060d18_45%)]">
        <Sidebar />
        <main className="flex-1 px-5 pb-24 pt-6 sm:px-8 lg:pb-10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
        <MobileNav />
      </div>
    </AdminProvider>
  );
}
