
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

const VasaLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M17.1364 9.17143C17.1364 8.24286 16.9242 7.5 16.5 6.94286C15.8636 6.01429 14.8636 5.5 13.9773 5.5C13 5.5 12.0909 5.92857 11.4545 6.77143C11.4545 6.12857 11.2424 5.5 10.8182 4.88571C10.1818 3.95714 9.18182 3.42857 8.29545 3.42857C7.29545 3.42857 6.36364 3.9 5.68182 4.78571C5.68182 4.78571 5.5 6.17143 5.5 7.71429C5.5 11.2714 8.63636 14.0571 12.2727 15.7714C12.2727 15.9571 12.2273 17.5 11.8636 18.7286C11.7273 19.2 11.5 19.6286 11.2273 20.0143C11.1364 20.1429 11.0455 20.2714 10.9545 20.3571C11.3182 20.4571 11.7273 20.5714 12.1818 20.5714C13.6364 20.5714 14.8182 19.4571 15.4091 18.1286C15.5455 17.8143 15.6364 17.5 15.6818 17.1857C16.5909 16.2 17.1364 13.6286 17.1364 12.0429C17.1364 11.2714 17.2273 10.0286 17.1364 9.17143Z"
      fill="hsl(var(--primary))"
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
              isActive ? "bg-secondary text-secondary-foreground font-semibold" : ""
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
                  <VasaLogo />
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
                  <VasaLogo />
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
