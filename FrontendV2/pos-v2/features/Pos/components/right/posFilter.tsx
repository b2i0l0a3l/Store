"use client";
import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../../actions/getCategories"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import React, { useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function PosFilter(){
    const {data,isLoading,isError} = useQuery({queryKey: ["pos-filter"],queryFn: getCategories,staleTime: 1000 * 60 * 5})
    
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    
    const currentCategory = searchParams.get("category") || "";

    const setSearchParams = React.useCallback((category:string) => {
        const params = new URLSearchParams(searchParams.toString())
        if(category){
            params.set("category", category)
        }else{
            params.delete("category")
        }
        router.push(`${pathname}?${params.toString()}`)
    }, [searchParams, pathname, router])

    useEffect(() => {
        if (isError) {
            toast.error("Error", {description: "Failed to fetch categories"})
        }
    }, [isError])

    if (isLoading) {
        return (
            <div className="w-full bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800/50">
                <div className="flex gap-3 p-4 overflow-x-hidden animate-pulse">
                    <div className="h-10 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0"></div>
                    <div className="h-10 w-28 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0"></div>
                    <div className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0"></div>
                    <div className="h-10 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-full shrink-0"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800/50 sticky top-0 z-10 transition-colors duration-300">
            <div className="flex w-full overflow-x-auto gap-3 no-scrollbar p-3 items-center">
                <Button  
                    onClick={() => setSearchParams("")}
                    className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm border flex-shrink-0 ${
                        currentCategory === "" 
                        ? "bg-primary text-primary-foreground border-primary shadow-primary/20 scale-105" 
                        : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:scale-105"
                    }`}
                >
                    All Categories
                </Button>
                {data?.value.map((category) => {
                    const isActive = currentCategory === category.name;
                    return (
                        <React.Fragment key={category.name}>
                        <Button  
                            onClick={() => setSearchParams(category.name)}
                            className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 shadow-sm border flex-shrink-0 ${
                                isActive 
                                ? "bg-primary text-primary-foreground border-primary shadow-primary/20 scale-105" 
                                : "bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:scale-105"
                            }`}
                        >
                            {category.name}
                        </Button>
                        </React.Fragment>
                    )
                })}
            </div>
        </div>
    )
}