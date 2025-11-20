"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Siren,
  UserPlus,
  Users,
  BookOpen,
  UserCircle,
  DollarSign,
  Gem,
  Shield,
  UserSearch,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const panchayatMenuItems = [
  { href: "/dashboard/panchayat", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/panchayat/add-profile", label: "Add Profiles", icon: UserPlus },
  { href: "/dashboard/panchayat/profiles", label: "Profiles Already Added", icon: Users },
  { href: "/dashboard/panchayat/post-job", label: "Job Post & Match", icon: Briefcase },
  { href: "/dashboard/panchayat/job-status", label: "Job Current Status", icon: BarChart },
];

const regularMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/jobs", label: "Job Search", icon: Briefcase },
    { href: "/dashboard/jobs/post", label: "Hire Talent", icon: UserSearch },
    { href: "/dashboard/learning", label: "Learning Hub", icon: BookOpen },
    { href: "/dashboard/teams", label: "My Team", icon: Users },
    { href: "/dashboard/profile", label: "My Profile", icon: UserCircle },
    { href: "/dashboard/monetization", label: "Monetization", icon: DollarSign },
    { href: "/dashboard/membership", label: "Membership", icon: Gem },
    { href: "/dashboard/safety", label: "Safety Settings", icon: Shield },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [userName, setUserName] = useState('');

  const isPanchayatPath = pathname.startsWith('/dashboard/panchayat');
  const menuItems = isPanchayatPath ? panchayatMenuItems : regularMenuItems;

  useEffect(() => {
    if (!isPanchayatPath) {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
      } else {
        setUserName('User'); // Fallback name
      }
    }
  }, [isPanchayatPath, pathname]);

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"} className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Siren className="h-6 w-6 text-primary" />
          <span className="sr-only">VaSa</span>
        </Link>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
                "transition-colors hover:text-foreground",
                pathname.startsWith(item.href) && (item.href.length === pathname.length || pathname[item.href.length] === '/') ? "text-foreground font-semibold" : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"} className="flex items-center gap-2 text-lg font-semibold">
              <Siren className="h-6 w-6 text-primary" />
              <span className="sr-only">VaSa</span>
            </Link>
             {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "hover:text-foreground",
                    pathname.startsWith(item.href) && (item.href.length === pathname.length || pathname[item.href.length] === '/') ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
             <div className="absolute bottom-4 left-4 right-4">
                 <div className="flex items-center justify-between p-2 rounded-md bg-muted">
                   <div className="flex items-center gap-2 overflow-hidden">
                     <div className="flex flex-col truncate">
                       <span className="font-semibold text-sm">{isPanchayatPath ? 'Panchayat Member' : userName}</span>
                     </div>
                   </div>
                  <Button asChild variant="ghost" size="icon">
                    <Link href="/login">
                      <LogOut className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
          </nav>
        </SheetContent>
      </Sheet>
       <div className="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="flex items-center gap-2 overflow-hidden">
             <div className="flex-col truncate hidden md:flex">
               <span className="font-semibold text-sm">{isPanchayatPath ? 'Panchayat Member' : userName}</span>
             </div>
           </div>
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex">
            <Link href="/login">
              <LogOut className="h-5 w-5" />
            </Link>
          </Button>
      </div>
    </header>
  );
}
