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
  }, [isPanchayatPath]);

  return (
    <>
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"} className="flex items-center gap-2 font-semibold">
              <Siren className="h-6 w-6 text-primary" />
              <span className="">VaSa</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                     pathname.startsWith(item.href) && (item.href.length === pathname.length || pathname[item.href.length] === '/') ? "bg-muted text-primary" : ""
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
           <div className="mt-auto p-4 border-t">
              <div className="flex items-center justify-between">
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
        </div>
      </div>
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"}
                className="flex items-center gap-2 text-lg font-semibold mb-4"
              >
                <Siren className="h-6 w-6 text-primary" />
                <span className="">VaSa</span>
              </Link>
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                    pathname.startsWith(item.href) && (item.href.length === pathname.length || pathname[item.href.length] === '/') ? "bg-muted text-foreground" : ""
                  )}
                >
                   <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
              <div className="mt-auto p-4 border-t">
              <div className="flex items-center justify-between">
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
          </SheetContent>
        </Sheet>
        <div className="w-full flex-1">
          {/* You can add a search bar here if needed in mobile view */}
        </div>
      </header>
    </>
  );
}
