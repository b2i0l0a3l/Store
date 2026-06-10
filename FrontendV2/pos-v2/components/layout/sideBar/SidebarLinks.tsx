"use client";
import {
  Home,
  ShoppingCart,
  Package,
  Users,
  Receipt,
  CreditCard,
  Tags,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Point of Sale",
    href: "/Pos",
    icon: ShoppingCart,
  },
  {
    title: "Products",
    href: "/products",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: Receipt,
  },
  {
    title: "Payments",
    href: "/payments",
    icon: CreditCard,
  },
  {
    title: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];
export default function SidebarLinks() {
  const pathname = usePathname();
    return (
       <>
        <ul className="flex flex-col">

        {links.map((link) => (
            <li
              key={link.title} 
              className="flex items-center gap-4 p-4 rounded cursor-pointer hover:text-primary hover:bg-primary/10"
            >
              <Link
                href={link.href}
                className={`flex items-center gap-4 w-full ${pathname === link.href ? " text-primary" : "text-muted-foreground"}`}
              >
                <link.icon className="size-5 " />
                <span className="text-sm font-medium">{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        </>
    )
} 