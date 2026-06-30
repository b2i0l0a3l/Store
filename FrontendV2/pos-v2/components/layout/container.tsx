import { cn } from "@/lib/utils"

export default function Container({ children ,className}: { children: React.ReactNode,className?:string }) {
    return (
        <div className={cn("w-full mx-auto px-5 py-3 max-sm:px-2 max-sm:py-1",className || "")}>
            {children}
        </div>
    );
}
