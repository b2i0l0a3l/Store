"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react";

export function HeaderSearch() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();

  const [searchType,setSearchType] = useState<string>("");
  const [query, setQuery] = useState("");

  const urlQuery = useMemo(
    ()=>{
      switch (pathname) {
        case "/pos":
          setSearchType("productName")
          return searchParams.get("productName") || "";
        case "/product":
          setSearchType("productName")
          return searchParams.get("productName") || "";
        case "/category":
          setSearchType("category")
          return searchParams.get("category") || ""; 
        default: 
          return "";
    }},[pathname])
  
  
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query !== urlQuery) {
        startTransition(() => {
          const params = new URLSearchParams(searchParams.toString());
          if (query) {
            params.set(searchType, query);
          } else {
            params.delete(searchType);
          }
          router.push(`${pathname}?${params.toString()}`);
        });
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, urlQuery, pathname, router, searchParams]);

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete(searchType);
    router.push(`${pathname}?${params.toString()}`);
  }; 

  const isSearchablePage = pathname.includes("/pos") || pathname.includes("/product");

  if (!isSearchablePage) return null;

  return (
    <div className="relative w-full max-w-sm flex items-center">
      <Search className="absolute left-3 size-4 text-zinc-400 dark:text-zinc-500 pointer-events-none transition-colors group-focus-within:text-primary" />
      <Input
        type="text"
        placeholder="search..." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 pr-9 h-10 w-full rounded-full bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 focus-visible:ring-primary/20 focus-visible:border-primary transition-all duration-300 text-sm"
      />
      {query && (
        <Button
          onClick={handleClear} 
          className="absolute right-3 p-1 rounded-full cursor-pointer bg-transparent"
        >
          <X className="size-3.5" />
        </Button>
      )}
    </div>
  );
}
