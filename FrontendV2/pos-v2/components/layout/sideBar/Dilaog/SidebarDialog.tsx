"use client";
import { Menu } from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import SidebarLinks from "../SidebarLinks";
import { DialogContent } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function SidebarDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
      setIsOpen(false);
    }, [pathname]);

    return (
       <Dialog  open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden" >
             <Menu className="h-5 w-5" /> 
         </Button>
         </DialogTrigger>
         <DialogContent className="min-w-[80vw] p-0 h-[90vh] flex flex-col border-r border-border bg-background">
           <div className="px-6 py-5 flex items-center gap-3 border-b">
             <h1 className="text-lg font-bold">My Store</h1>
           </div>
           <div className="p-4 space-y-6 flex-1">
             <SidebarLinks />
           </div>
           <div className="border-t p-4">
             <UserButton/>
           </div>
         </DialogContent>
       </Dialog>
    )
}