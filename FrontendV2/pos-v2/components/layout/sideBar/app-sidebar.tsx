"use client"

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
} from "@/components/ui/sidebar"
import { Store, Package2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { name: "Pos", href: "/pos", icon: Store },
  { name: "Products", href: "/product", icon: Package2 },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex justify-center items-center py-4">
       <div className="flex items-center gap-2">
        <Store className="size-6 shrink-0"/>
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
              {links.map((link) => (
                <SidebarMenuItem key={link.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === link.href}
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

      <SidebarFooter />
    </Sidebar>
  )
}