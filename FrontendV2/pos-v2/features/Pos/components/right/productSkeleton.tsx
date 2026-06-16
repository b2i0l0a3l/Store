import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function ProductSkeleton({length = 5} :{ length?:number}){
    return (
        <div style={{ height: '400px', overflowY: 'auto' }} className="space-y-4 p-4">
        {Array.from({ length: length }).map((_, index) => (
            <React.Fragment key={index}>
            <div key={index} className="flex items-center space-x-4 border p-3 rounded-lg">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
            </React.Fragment>
        ))}
      </div>
    )
}