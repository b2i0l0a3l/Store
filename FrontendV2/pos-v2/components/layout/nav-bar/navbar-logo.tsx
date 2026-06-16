"use client";
import { StoreIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export function NavbarLogo({isAuth}: {isAuth?: boolean}) {
    const pathname = usePathname();

    return ( 
        <>
        {isAuth && pathname === "/" && 
           <div className="flex justify-between items-center gap-2.5">
            <h1 className={`flex items-center gap-2.5 font-bold text-2xl cursor-pointer ${pathname === "/" ? "text-primary" : "hover:text-primary/50 transition-colors"}`}>
                <StoreIcon className="size-7" />
                <span className="bg-linear-to-r from-fuchsia-500 to-purple-500 text-transparent bg-clip-text">Store</span>
            </h1>
        </div>
        
        }
        </>
    );
}   