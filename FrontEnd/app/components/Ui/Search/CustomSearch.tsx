"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";


  export default function CustomSearch({onSearch}: {onSearch: (value: string) => void}){

  return (
    <div className={`relative group w-full max-w-md`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300 z-10">
        <MagnifyingGlassIcon className="w-5 h-5" />
      </div>
      <input
        onChange={(e) => onSearch(e.target.value)}
        type="text"
        className="relative w-full bg-slate-800/40 backdrop-blur-md text-slate-200 placeholder-slate-500 text-sm rounded-2xl pl-12 pr-14 py-3.5 border border-slate-700/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all duration-300 shadow-lg shadow-slate-900/20 hover:bg-slate-800/60 hover:border-slate-600/50"
        placeholder="Search for albums..."
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 z-10 pointer-events-none">
        <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400 font-medium px-2 py-1 bg-slate-900/60 rounded border border-slate-700/50 shadow-sm">
          <span className="text-[10px]">⌘</span>
          <span>K</span>
        </div>
      </div>
      <div className="absolute -inset-0.5 bg-linear-to-r from-blue-500/0 via-blue-500/20 to-cyan-500/0 rounded-2xl opacity-0 group-focus-within:opacity-100 blur transition-opacity duration-500 -z-10"></div>
    </div>
  );
}
