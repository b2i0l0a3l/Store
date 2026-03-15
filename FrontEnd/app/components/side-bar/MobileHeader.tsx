"use client";

import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/solid";

interface MobileHeaderProps {
  onToggle: () => void;
}

export default function MobileHeader({ onToggle }: MobileHeaderProps) {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg">
          <ShoppingCartIcon className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-lg font-bold text-white">Store</h1>
      </div>
      <button
        onClick={onToggle}
        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors"
        aria-label="Toggle menu"
      >
        <Bars3Icon className="w-6 h-6" />
      </button>
    </header>
  );
}
