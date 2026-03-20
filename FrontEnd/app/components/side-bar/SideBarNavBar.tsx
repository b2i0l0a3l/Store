"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  ShoppingBagIcon,
  HomeIcon,
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


export default  function SideBarNavBar() {
  const CurrentPath = usePathname();

  const links: NavLink[] = [  
    { name: "Dashboard", Path: "/", icon: HomeIcon ,allowedRoles:["Admin"]},
    { name: "Products", Path: "/Products", icon: ShoppingBagIcon ,allowedRoles:["Admin","Staff","Viewer"]},
    { name: "Clients", Path: "/Clients", icon: UsersIcon ,allowedRoles:["Admin","Staff"]},
    { name: "Categories", Path: "/Categories", icon: TagIcon ,allowedRoles:["Admin","Staff","Viewer"]},
    { name: "Orders", Path: "/Orders", icon: ShoppingCartIcon ,allowedRoles:["Admin","Staff"]},
    { name: "Debts", Path: "/Debts", icon: CurrencyDollarIcon ,allowedRoles:["Admin","Staff"]},
    { name: "Payments", Path: "/Payments", icon: BanknotesIcon ,allowedRoles:["Admin","Staff"]},
  ];

  return (
    <nav className="flex-1 px-4 py-8">
      <ul className="flex flex-col gap-3 w-full">
        {links.map((link) => {
          const isActive = CurrentPath === link.Path;
          const IconComponent = link.icon || HomeIcon;   
          return (
            <li key={link.name}>
              <Link href={link.Path}>
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
