"use client";

import { useEffect, useState } from "react";
import { MobileSidebar } from "./mobile-sidebar";

export const MobileHeader = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="lg:hidden px-6 h-[50px] flex items-center bg-green-500 border-b fixed top-0 w-full z-50">
      {mounted && <MobileSidebar />}
    </nav>
  );
};