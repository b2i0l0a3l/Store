"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  ShoppingBagIcon,
  HomeIcon,
  Squares2X2Icon,
  UsersIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  TagIcon,
  BanknotesIcon,
} from "@heroicons/react/24/solid";

interface NavLink {
  name: string;
  Path: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  allowedRoles?: string[];
}


export default function SideBarNavBar({ onClose, userRole }: { onClose?: () => void; userRole?: string }) {
  const CurrentPath = usePathname();

  const allLinks: NavLink[] = [  
    { name: "Selling", Path: "/", icon: HomeIcon ,allowedRoles:["Admin"]},
    { name: "Dashboard", Path: "/Dashboard", icon: Squares2X2Icon ,allowedRoles:["Admin"]},
    { name: "Products", Path: "/Products", icon: ShoppingBagIcon ,allowedRoles:["Admin","Staff"]},
    { name: "Clients", Path: "/Clients", icon: UsersIcon ,allowedRoles:["Admin"]},
    { name: "Categories", Path: "/Categories", icon: TagIcon ,allowedRoles:["Admin"]},
    { name: "Orders", Path: "/Orders", icon: ShoppingCartIcon ,allowedRoles:["Admin"]},
    { name: "Debts", Path: "/Debts", icon: CurrencyDollarIcon ,allowedRoles:["Admin"]},
    { name: "Payments", Path: "/Payments", icon: BanknotesIcon ,allowedRoles:["Admin"]},
  ];

  const links = allLinks.filter((link) => {
    if (!link.allowedRoles || link.allowedRoles.length === 0) return true;
    if (!userRole) return false;
    return link.allowedRoles.includes(userRole);
  });

  return (
    <nav className="flex-1 px-4 py-8 overflow-y-auto custom-scrollbar">
      <ul className="flex flex-col gap-3 w-full">
        {links.map((link) => {
          const isActive = CurrentPath === link.Path;
          const IconComponent = link.icon || HomeIcon;   
          return (
            <li key={link.name}>
              <Link href={link.Path} onClick={onClose}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out
                    ${
                    isActive
                      ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <span className="font-medium text-sm">{link.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
