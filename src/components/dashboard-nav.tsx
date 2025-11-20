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
  SheetClose,
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

  const UserNameDisplay = ({ inSheet }: { inSheet?: boolean }) => {
    if (isPanchayatPath) {
      return <span className="font-semibold text-sm">Panchayat Member</span>;
    }
    return (
      <Link href="/dashboard/profile" className="font-semibold text-sm hover:underline">
        {userName}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6 z-30">
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
          <SheetContent side="left" className="flex flex-col p-0">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                <Link href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"} className="flex items-center gap-2 font-semibold">
                  <Siren className="h-6 w-6 text-primary" />
                  <span className="">VaSa</span>
                </Link>
            </div>
            <nav className="flex-1 grid gap-2 p-2 text-sm font-medium lg:p-4">
              {menuItems.map((item) => (
                 <SheetClose asChild key={item.href}>
                    <Link
                    href={item.href}
                    className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                        pathname.startsWith(item.href) && (item.href.length === pathname.length || pathname[item.href.length] === '/') ? "bg-muted text-primary" : ""
                    )}
                    >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                    </Link>
                </SheetClose>
              ))}
            </nav>
              <div className="mt-auto p-4 border-t">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 overflow-hidden">
                    <div className="flex flex-col truncate">
                        <UserNameDisplay inSheet />
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
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="w-full flex-1">
                <Link href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"} className="flex items-center gap-2 font-semibold">
                  <Siren className="h-6 w-6 text-primary" />
                  <span className="">VaSa</span>
                </Link>
            </div>
            <div className="ml-auto flex items-center gap-2 overflow-hidden">
                <div className="flex flex-col truncate text-right">
                    <UserNameDisplay />
                </div>
                 <Button asChild variant="ghost" size="icon">
                  <Link href="/login">
                    <LogOut className="h-5 w-5" />
                  </Link>
                </Button>
            </div>
        </div>
      </header>
  );
}
