"use client";

import { ShoppingCartIcon, XMarkIcon } from "@heroicons/react/24/solid";

import LogoutBtn from "./LogoutButton";
import SideBarNavBar from "./SideBarNavBar";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
}

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex flex-col h-dvh w-56 bg-gradient-to-b from-[#0a1120] to-[#03060f] border-r border-white/5 shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0`}
      >
        <div className="flex items-center justify-between gap-3 px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
              <ShoppingCartIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-bold text-white">Store</h1>
          </div>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
            aria-label="Close menu"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <SideBarNavBar onClose={onClose} userRole={userRole} />

        <div className="p-3 border-t border-white/10">
          <LogoutBtn />
        </div>
      </aside>
    </>
  );
}
