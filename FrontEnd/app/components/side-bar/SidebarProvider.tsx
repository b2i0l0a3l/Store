"use client";

import { useState, useCallback } from "react";
import Sidebar from "./sidebar";
import MobileHeader from "./MobileHeader";

export default function SidebarProvider({
  children,
  topBar,
  userRole,
}: {
  children: React.ReactNode;
  topBar?: React.ReactNode;
  userRole?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <MobileHeader onToggle={handleToggle} />
      <Sidebar isOpen={isOpen} onClose={handleClose} userRole={userRole} />
      <main className="pt-14 md:pt-0 md:ml-64 transition-[margin] duration-300">
        {topBar}
        {children}
      </main>
    </>
  );
}
