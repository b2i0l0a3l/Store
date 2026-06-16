"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Bell } from "lucide-react";

export default function Notifictaion() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all " />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-w-2xs" align="end">
        <DropdownMenuItem>Hello</DropdownMenuItem> 
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
