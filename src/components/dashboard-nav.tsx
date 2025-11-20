
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Briefcase,
  LayoutDashboard,
  LogOut,
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
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const panchayatMenuItems = [
  { href: "/dashboard/panchayat", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/panchayat/add-profile", label: "Add Profiles", icon: UserPlus },
  { href: "/dashboard/panchayat/profiles", label: "Profiles Already Added", icon: Users },
  { href: "/dashboard/panchayat/post-job", label: "Job Post & Match", icon: Briefcase },
  { href: "/dashboard/panchayat/job-status", label: "Job Current Status", icon: BarChart },
  { href: "/dashboard/panchayat/assign-worker", label: "Assign Worker", icon: UserPlus },
];

const regularMenuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/jobs", label: "Job Search", icon: Briefcase },
    { href: "/dashboard/jobs/post", label: "Hire Talent", icon: UserSearch },
    { href: "/dashboard/assign-worker", label: "Assign Worker", icon: UserPlus },
    { href: "/dashboard/learning", label: "Learning Hub", icon: BookOpen },
    { href: "/dashboard/teams", label: "My Team", icon: Users },
    { href: "/dashboard/profile", label: "My Profile", icon: UserCircle },
    { href: "/dashboard/monetization", label: "Monetization", icon: DollarSign },
    { href: "/dashboard/membership", label: "Membership", icon: Gem },
    { href: "/dashboard/safety", label: "Safety Settings", icon: Shield },
];

const AppLogo = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
        d="M32 5C26.44 5 21.812 8.344 19.344 13.125C16.875 17.906 16.875 23.656 19.344 28.438C21.812 33.219 26.44 36.562 32 36.562C37.56 36.562 42.188 33.219 44.656 28.438C47.125 23.656 47.125 17.906 44.656 13.125C42.188 8.344 37.56 5 32 5Z"
        fill="#4A4A4A"
        />
        <path
        d="M32 36.5625C26.9688 36.5625 22.5 39.1562 20.1875 42.8125C17.875 46.4688 17.875 50.8438 20.1875 54.5C22.5 58.1562 26.9688 60.75 32 60.75C37.0312 60.75 41.5 58.1562 43.8125 54.5C46.125 50.8438 46.125 46.4688 43.8125 42.8125C41.5 39.1562 37.0312 36.5625 32 36.5625Z"
        fill="#4A4A4A"
        />
        <path
        d="M24.0938 16.5C24.0938 15.125 24.9688 14 26.0625 14C27.1562 14 28 15.125 28 16.5C28 17.875 27.1562 19 26.0625 19C24.9688 19 24.0938 17.875 24.0938 16.5Z"
        fill="white"
        />
        <path
        d="M36 16.5C36 15.125 36.875 14 37.9688 14C39.0625 14 39.9375 15.125 39.9375 16.5C39.9375 17.875 39.0625 19 37.9688 19C36.875 19 36 17.875 36 16.5Z"
        fill="white"
        />
        <path
        d="M26.9688 24.625C26.5625 24.625 26.1875 24.8125 25.9375 25.125C25.6875 25.4375 25.625 25.8438 25.75 26.2188C26.5312 28.5312 28.6562 30.125 31.125 30.3125C31.5312 30.3438 31.9375 30.1562 32.2188 29.8438C32.5 29.5312 32.625 29.125 32.5625 28.7188C32.1875 26.5938 30.7188 24.9375 28.6875 24.0312C28.1875 23.8125 27.5938 23.9062 27.1875 24.2188C26.9375 24.4062 26.75 24.5 26.9688 24.625Z"
        fill="white"
        />
        <path
        d="M29.5312 28.5C29.2812 28.75 29.3125 29.1562 29.5938 29.375C30.4375 30.0312 31.4375 30.375 32.5 30.375C33.5625 30.375 34.5625 30.0312 35.4062 29.375C35.6875 29.1562 35.7188 28.75 35.4688 28.5C35.2188 28.25 34.8125 28.2188 34.5938 28.4688C33.9688 28.9375 33.25 29.1875 32.5 29.1875C31.75 29.1875 31.0312 28.9375 30.4062 28.4688C30.1875 28.2188 29.7812 28.25 29.5312 28.5Z"
        fill="#FF6B6B"
        />
    </svg>
);


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

    const isProfilePage = pathname === '/dashboard/profile';

    if (inSheet) {
      return (
         <SheetClose asChild>
            <Link
              href="/dashboard/profile"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isProfilePage && "bg-secondary text-primary"
              )}
            >
              <UserCircle className="h-4 w-4" />
              {userName}
            </Link>
          </SheetClose>
      )
    }

    return (
      <Button asChild variant={isProfilePage ? 'secondary' : 'ghost'} size="sm">
        <Link href="/dashboard/profile" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" />
            {userName}
        </Link>
      </Button>
    );
  };

  const NavLink = ({ item, inSheet }: { item: typeof menuItems[0], inSheet?: boolean}) => {
    const isActive = pathname === item.href;
    const Component = inSheet ? SheetClose : 'div';
    const props = inSheet ? { asChild: true } : {};
    return (
       <Component {...props}>
          <Link
          href={item.href}
          className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              isActive ? "bg-primary/10 text-primary font-semibold" : ""
          )}
          >
          <item.icon className="h-4 w-4" />
          {item.label}
          </Link>
      </Component>
    );
  }

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
             <SheetHeader className="p-4 border-b">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <Link href={isPanchayatPath ? "/dashboard/panchayat" : "/dashboard"} className="flex items-center gap-2 font-semibold">
                  <AppLogo />
                  <span className="">VaSa</span>
                </Link>
             </SheetHeader>
            <nav className="flex-1 grid gap-2 p-2 text-sm font-medium lg:p-4">
              {menuItems.map((item) => <NavLink key={item.href} item={item} inSheet />)}
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
                  <AppLogo />
                  <span className="">VaSa</span>
                </Link>
            </div>
            <div className="ml-auto flex items-center gap-2 overflow-hidden">
                <div className="flex items-center gap-2">
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
