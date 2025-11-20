import { DashboardNav } from "@/components/dashboard-nav";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | VaSa",
  description: "Her Dreams, Our Mission!",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardNav />
      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}
