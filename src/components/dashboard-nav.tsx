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
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";

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
    { href: "/dashboard/learning", label: "Learning Hub", icon: BookOpen },
    { href: "/dashboard/teams", label: "My Team", icon: Users },
    { href: "/dashboard/profile", label: "My Profile", icon: UserCircle },
    { href: "/dashboard/monetization", label: "Monetization", icon: DollarSign },
    { href: "/dashboard/membership", label: "Membership", icon: Gem },
];

export function DashboardNav() {
  const pathname = usePathname();
  const [userName, setUserName] = useState('');

  const isPanchayatPath = pathname.startsWith('/dashboard/panchayat');

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
  
  if (isPanchayatPath) {
      return (
        <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r"
          style={{
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "3.5rem",
          } as React.CSSProperties}
        >
          <SidebarHeader>
            <Link href="/dashboard/panchayat" className="flex items-center gap-2.5">
              <Siren className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E0BBE4] via-[#957DAD] to-[#D291BC] group-data-[collapsible=icon]:hidden">
                VaSa Panchayat
              </h1>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {panchayatMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href) && (item.href !== '/dashboard/panchayat' || pathname === '/dashboard/panchayat')}
                    tooltip={{ children: item.label, side: "right" }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="group-data-[collapsible=icon]:-mt-2">
            <div className="flex items-center justify-between p-2">
               <div className="flex items-center gap-2 overflow-hidden">
                <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                  <span className="font-semibold text-sm">Panchayat Member</span>
                </div>
               </div>

              <SidebarMenuButton
                asChild
                className="h-8 w-8 !p-0 group-data-[collapsible=icon]:w-full"
                tooltip={{ children: "Log Out", side: "right" }}
              >
                <Link href="/login">
                  <LogOut />
                </Link>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
      );
  }

  // Regular user navigation
  return (
       <Sidebar
          variant="sidebar"
          collapsible="icon"
          className="border-r"
          style={{
            "--sidebar-width": "16rem",
            "--sidebar-width-icon": "3.5rem",
          } as React.CSSProperties}
        >
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2.5">
              <Siren className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#E0BBE4] via-[#957DAD] to-[#D291BC] group-data-[collapsible=icon]:hidden">
                VaSa
              </h1>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              {regularMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))}
                    tooltip={{ children: item.label, side: "right" }}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="group-data-[collapsible=icon]:-mt-2">
             <div className="flex items-center justify-between p-2">
               <div className="flex items-center gap-2 overflow-hidden">
                 <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
                   {userName && <span className="font-semibold text-sm">{userName}</span>}
                 </div>
               </div>

              <SidebarMenuButton
                asChild
                className="h-8 w-8 !p-0 group-data-[collapsible=icon]:w-full"
                tooltip={{ children: "Log Out", side: "right" }}
              >
                <Link href="/login">
                  <LogOut />
                </Link>
              </SidebarMenuButton>
            </div>
          </SidebarFooter>
        </Sidebar>
  )
}
