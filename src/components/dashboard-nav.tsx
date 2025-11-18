"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Siren,
  UserCircle,
  Users,
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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { mockUser } from "@/lib/data";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/jobs", label: "Job Search", icon: Briefcase },
  { href: "/dashboard/learning", label: "Learning Hub", icon: BookOpen },
  { href: "/dashboard/teams", label: "My Team", icon: Users },
  { href: "/dashboard/profile", label: "My Profile", icon: UserCircle },
];

export function DashboardNav() {
  const pathname = usePathname();

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
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
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
             <Avatar className="size-8">
              <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
              <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col truncate group-data-[collapsible=icon]:hidden">
              <span className="font-semibold text-sm">{mockUser.name}</span>
              <span className="text-xs text-muted-foreground">{mockUser.email}</span>
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
