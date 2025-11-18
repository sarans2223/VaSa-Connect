import { DashboardNav } from "@/components/dashboard-nav";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | VaSa",
  description: "Your personal dashboard on VaSa.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <DashboardNav />
        <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900/50">
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
