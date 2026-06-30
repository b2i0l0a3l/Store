"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Store,
  Package2,
  LayoutDashboard,
  ClipboardList,
  Users,
  CreditCard,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

const allLinks = [
  { name: "POS", href: "/pos", icon: Store },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, adminOnly: true },
  { name: "Products", href: "/product", icon: Package2 },
  { name: "Orders", href: "/orders", icon: ClipboardList, adminOnly: true },
  { name: "Clients", href: "/clients", icon: Users, adminOnly: true },
  { name: "Debts", href: "/debts", icon: CreditCard, adminOnly: true },
  { name: "Payments", href: "/payments", icon: Wallet, adminOnly: true },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: userRole } = useQuery({
    queryKey: ["user-role"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/token");
        if (!res.ok) return null;
        const data = await res.json();
        if (!data.token) return null;
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        return payload.role || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const isAdmin = userRole === "Admin";
  const visibleLinks = allLinks.filter((link) => !link.adminOnly || isAdmin);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/sign-in");
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center items-center py-4">
        <div className="flex items-center gap-2">
          <Store className="size-6 shrink-0" />
          <h1 className="font-bold text-2xl group-data-[state=collapsed]:hidden overflow-hidden">
            My<span className="text-blue-600">Store</span>
          </h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleLinks.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))}
                    tooltip={link.name}
                  >
                    <Link href={link.href}>
                      <link.icon />
                      <span>{link.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign Out" onClick={handleSignOut}>
              <Button variant="destructive" type="button" className="cursor-pointer flex items-center gap-2 w-full">
                <LogOut className="size-4" />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
